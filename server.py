"""
NOURISH Diet Program — Flask backend with dual-DB support.

- If POSTGRES_URL / DATABASE_URL is set  -> Neon Postgres (production / Vercel)
- Otherwise                              -> local SQLite (dev)

Schema stays identical across both dialects; a tiny adapter translates the
`?` placeholders used in code to `%s` for Postgres.
"""

import os
import secrets
import hashlib
from datetime import datetime, timedelta
from functools import wraps

from flask import Flask, request, jsonify, send_from_directory, g
from flask_cors import CORS

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# ─── DB Selection ───────────────────────────────────────────────────

POSTGRES_URL = (
    os.environ.get('POSTGRES_URL')
    or os.environ.get('POSTGRES_PRISMA_URL')
    or os.environ.get('DATABASE_URL')
)
USE_POSTGRES = bool(POSTGRES_URL)

if USE_POSTGRES:
    import psycopg
    from psycopg.rows import dict_row
    PLACEHOLDER = '%s'
    ID_COL = 'SERIAL PRIMARY KEY'
else:
    import sqlite3
    if os.environ.get('VERCEL'):
        SQLITE_PATH = '/tmp/nourish.db'
    else:
        SQLITE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'nourish.db')
    PLACEHOLDER = '?'
    ID_COL = 'INTEGER PRIMARY KEY AUTOINCREMENT'

SECRET_KEY = os.environ.get('NOURISH_SECRET') or secrets.token_hex(32)
STATIC_DIR = os.path.dirname(os.path.abspath(__file__))
_db_initialized = False


def _q(sql):
    """Translate ? placeholders to the active dialect."""
    return sql.replace('?', PLACEHOLDER) if PLACEHOLDER != '?' else sql


def _connect():
    if USE_POSTGRES:
        return psycopg.connect(POSTGRES_URL, row_factory=dict_row, autocommit=False)
    conn = sqlite3.connect(SQLITE_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute('PRAGMA journal_mode=WAL')
    conn.execute('PRAGMA foreign_keys=ON')
    return conn


class Db:
    def __init__(self):
        self.conn = _connect()

    def execute(self, sql, params=()):
        cur = self.conn.cursor()
        cur.execute(_q(sql), params)
        return cur

    def commit(self):
        self.conn.commit()

    def close(self):
        try:
            self.conn.close()
        except Exception:
            pass


def get_db():
    global _db_initialized
    if not _db_initialized:
        init_db()
        _db_initialized = True
    if 'db' not in g:
        g.db = Db()
    return g.db


@app.teardown_appcontext
def close_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db():
    conn = _connect()
    cur = conn.cursor()
    statements = [
        f'''CREATE TABLE IF NOT EXISTS users (
            id {ID_COL},
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT,
            provider TEXT NOT NULL DEFAULT 'email',
            avatar TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''',
        f'''CREATE TABLE IF NOT EXISTS sessions (
            id {ID_COL},
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            token TEXT UNIQUE NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''',
        f'''CREATE TABLE IF NOT EXISTS calorie_profiles (
            id {ID_COL},
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            gender TEXT NOT NULL,
            age INTEGER NOT NULL,
            height REAL NOT NULL,
            weight REAL NOT NULL,
            target_weight REAL,
            activity REAL NOT NULL,
            goal TEXT NOT NULL,
            bmr REAL,
            tdee REAL,
            daily_calories INTEGER,
            bmi REAL,
            protein_g INTEGER,
            carbs_g INTEGER,
            fats_g INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''',
        f'''CREATE TABLE IF NOT EXISTS food_logs (
            id {ID_COL},
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            calories INTEGER NOT NULL,
            label TEXT,
            logged_date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''',
        f'''CREATE TABLE IF NOT EXISTS water_logs (
            id {ID_COL},
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            glasses INTEGER NOT NULL DEFAULT 0,
            logged_date DATE NOT NULL,
            UNIQUE(user_id, logged_date)
        )''',
        f'''CREATE TABLE IF NOT EXISTS workout_logs (
            id {ID_COL},
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            exercise_name TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0,
            logged_date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''',
        f'''CREATE TABLE IF NOT EXISTS favorite_menus (
            id {ID_COL},
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            menu_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, menu_id)
        )''',
        'CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token)',
        'CREATE INDEX IF NOT EXISTS idx_food_logs_user_date ON food_logs(user_id, logged_date)',
        'CREATE INDEX IF NOT EXISTS idx_water_logs_user_date ON water_logs(user_id, logged_date)',
        'CREATE INDEX IF NOT EXISTS idx_workout_logs_user_date ON workout_logs(user_id, logged_date)',
    ]
    for s in statements:
        cur.execute(s)
    conn.commit()
    conn.close()


# ─── Auth Helpers ───────────────────────────────────────────────────

def hash_password(password):
    salt = secrets.token_hex(16)
    hashed = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    return f"{salt}:{hashed.hex()}"


def verify_password(password, stored):
    try:
        salt, hashed = stored.split(':')
        check = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
        return check.hex() == hashed
    except Exception:
        return False


def create_session(user_id):
    token = secrets.token_urlsafe(48)
    expires = datetime.utcnow() + timedelta(days=30)
    db = get_db()
    db.execute('INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
               (user_id, token, expires))
    db.commit()
    return token


def get_current_user():
    auth = request.headers.get('Authorization', '')
    if not auth.startswith('Bearer '):
        return None
    token = auth[7:]
    db = get_db()
    row = db.execute('''
        SELECT u.id, u.name, u.email, u.avatar, u.provider
        FROM sessions s JOIN users u ON s.user_id = u.id
        WHERE s.token = ? AND s.expires_at > ?
    ''', (token, datetime.utcnow())).fetchone()
    return dict(row) if row else None


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user = get_current_user()
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        g.user = user
        return f(*args, **kwargs)
    return decorated


# ─── Static File Serving ────────────────────────────────────────────

@app.route('/')
def serve_index():
    return send_from_directory(STATIC_DIR, 'index.html')


@app.route('/<path:path>')
def serve_static(path):
    full = os.path.join(STATIC_DIR, path)
    if os.path.isfile(full):
        return send_from_directory(STATIC_DIR, path)
    return send_from_directory(STATIC_DIR, 'index.html')


# ─── Auth API ───────────────────────────────────────────────────────

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    if not name or not email or not password:
        return jsonify({'error': 'Semua field harus diisi.'}), 400
    if len(password) < 8:
        return jsonify({'error': 'Password minimal 8 karakter.'}), 400

    db = get_db()
    existing = db.execute('SELECT id FROM users WHERE email = ?', (email,)).fetchone()
    if existing:
        return jsonify({'error': 'Email sudah terdaftar. Silakan masuk.'}), 409

    pw_hash = hash_password(password)
    row = db.execute(
        'INSERT INTO users (name, email, password_hash, provider) VALUES (?, ?, ?, ?) RETURNING id',
        (name, email, pw_hash, 'email')).fetchone()
    db.commit()
    user_id = row['id'] if isinstance(row, dict) else row[0]

    token = create_session(user_id)

    return jsonify({
        'token': token,
        'user': {'name': name, 'email': email, 'avatar': None, 'provider': 'email'}
    }), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    db = get_db()
    user = db.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()

    if not user:
        return jsonify({'error': 'Email tidak ditemukan. Silakan daftar terlebih dahulu.'}), 404
    if not user['password_hash'] or not verify_password(password, user['password_hash']):
        return jsonify({'error': 'Password salah. Silakan coba lagi.'}), 401

    token = create_session(user['id'])

    return jsonify({
        'token': token,
        'user': {
            'name': user['name'],
            'email': user['email'],
            'avatar': user['avatar'],
            'provider': user['provider']
        }
    })


@app.route('/api/google-login', methods=['POST'])
def google_login():
    data = request.get_json() or {}
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip().lower()
    avatar = data.get('avatar')

    if not email:
        return jsonify({'error': 'Data Google tidak valid.'}), 400

    db = get_db()
    user = db.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()

    if user:
        user_id = user['id']
        db.execute('UPDATE users SET name = ?, avatar = ? WHERE id = ?', (name, avatar, user_id))
        db.commit()
    else:
        row = db.execute(
            'INSERT INTO users (name, email, avatar, provider) VALUES (?, ?, ?, ?) RETURNING id',
            (name, email, avatar, 'google')).fetchone()
        db.commit()
        user_id = row['id'] if isinstance(row, dict) else row[0]

    token = create_session(user_id)

    return jsonify({
        'token': token,
        'user': {'name': name, 'email': email, 'avatar': avatar, 'provider': 'google'}
    })


@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    token = request.headers.get('Authorization', '')[7:]
    db = get_db()
    db.execute('DELETE FROM sessions WHERE token = ?', (token,))
    db.commit()
    return jsonify({'message': 'Logged out'})


@app.route('/api/me', methods=['GET'])
@login_required
def get_me():
    return jsonify({'user': g.user})


# ─── Calorie Profile API ───────────────────────────────────────────

@app.route('/api/calorie-profile', methods=['POST'])
@login_required
def save_calorie_profile():
    data = request.get_json() or {}
    db = get_db()
    db.execute('''
        INSERT INTO calorie_profiles
        (user_id, gender, age, height, weight, target_weight, activity, goal,
         bmr, tdee, daily_calories, bmi, protein_g, carbs_g, fats_g)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        g.user['id'], data['gender'], data['age'], data['height'],
        data['weight'], data.get('target_weight'), data['activity'], data['goal'],
        data.get('bmr'), data.get('tdee'), data.get('daily_calories'),
        data.get('bmi'), data.get('protein_g'), data.get('carbs_g'), data.get('fats_g')
    ))
    db.commit()
    return jsonify({'message': 'Profile saved'})


@app.route('/api/calorie-profile', methods=['GET'])
@login_required
def get_calorie_profile():
    db = get_db()
    row = db.execute('''
        SELECT * FROM calorie_profiles WHERE user_id = ? ORDER BY created_at DESC LIMIT 1
    ''', (g.user['id'],)).fetchone()
    return jsonify(dict(row) if row else None, default=str) if False else (
        jsonify(_serialize(row)) if row else jsonify(None)
    )


def _serialize(row):
    """Convert row to JSON-safe dict (handle datetimes)."""
    if row is None:
        return None
    d = dict(row)
    for k, v in d.items():
        if isinstance(v, (datetime,)) or hasattr(v, 'isoformat'):
            d[k] = v.isoformat() if hasattr(v, 'isoformat') else str(v)
    return d


# ─── Food Log API ──────────────────────────────────────────────────

@app.route('/api/food-logs', methods=['GET'])
@login_required
def get_food_logs():
    date = request.args.get('date', datetime.utcnow().strftime('%Y-%m-%d'))
    db = get_db()
    rows = db.execute(
        'SELECT * FROM food_logs WHERE user_id = ? AND logged_date = ? ORDER BY created_at',
        (g.user['id'], date)).fetchall()
    return jsonify([_serialize(r) for r in rows])


@app.route('/api/food-logs', methods=['POST'])
@login_required
def add_food_log():
    data = request.get_json() or {}
    calories = data.get('calories')
    label = data.get('label', '')
    date = data.get('date', datetime.utcnow().strftime('%Y-%m-%d'))

    if not calories or not isinstance(calories, (int, float)):
        return jsonify({'error': 'Kalori harus berupa angka.'}), 400

    db = get_db()
    row = db.execute(
        'INSERT INTO food_logs (user_id, calories, label, logged_date) VALUES (?, ?, ?, ?) RETURNING id',
        (g.user['id'], int(calories), label, date)).fetchone()
    db.commit()
    log_id = row['id'] if isinstance(row, dict) else row[0]

    return jsonify({'id': log_id, 'calories': int(calories), 'label': label, 'logged_date': date}), 201


@app.route('/api/food-logs/<int:log_id>', methods=['DELETE'])
@login_required
def delete_food_log(log_id):
    db = get_db()
    db.execute('DELETE FROM food_logs WHERE id = ? AND user_id = ?', (log_id, g.user['id']))
    db.commit()
    return jsonify({'message': 'Deleted'})


# ─── Water Log API ─────────────────────────────────────────────────

@app.route('/api/water-logs', methods=['GET'])
@login_required
def get_water_log():
    date = request.args.get('date', datetime.utcnow().strftime('%Y-%m-%d'))
    db = get_db()
    row = db.execute(
        'SELECT * FROM water_logs WHERE user_id = ? AND logged_date = ?',
        (g.user['id'], date)).fetchone()
    return jsonify(_serialize(row) if row else {'glasses': 0})


@app.route('/api/water-logs', methods=['POST'])
@login_required
def update_water_log():
    data = request.get_json() or {}
    glasses = int(data.get('glasses', 0))
    date = data.get('date', datetime.utcnow().strftime('%Y-%m-%d'))

    db = get_db()
    db.execute('''
        INSERT INTO water_logs (user_id, glasses, logged_date) VALUES (?, ?, ?)
        ON CONFLICT(user_id, logged_date) DO UPDATE SET glasses = EXCLUDED.glasses
    ''', (g.user['id'], glasses, date))
    db.commit()
    return jsonify({'glasses': glasses, 'logged_date': date})


# ─── Workout Log API ──────────────────────────────────────────────

@app.route('/api/workout-logs', methods=['GET'])
@login_required
def get_workout_logs():
    date = request.args.get('date', datetime.utcnow().strftime('%Y-%m-%d'))
    db = get_db()
    rows = db.execute(
        'SELECT * FROM workout_logs WHERE user_id = ? AND logged_date = ?',
        (g.user['id'], date)).fetchall()
    return jsonify([_serialize(r) for r in rows])


@app.route('/api/workout-logs', methods=['POST'])
@login_required
def save_workout_log():
    data = request.get_json() or {}
    exercise_name = data.get('exercise_name', '')
    completed = 1 if data.get('completed') else 0
    date = data.get('date', datetime.utcnow().strftime('%Y-%m-%d'))

    db = get_db()
    existing = db.execute(
        'SELECT id FROM workout_logs WHERE user_id = ? AND exercise_name = ? AND logged_date = ?',
        (g.user['id'], exercise_name, date)).fetchone()

    if existing:
        existing_id = existing['id'] if isinstance(existing, dict) else existing[0]
        db.execute('UPDATE workout_logs SET completed = ? WHERE id = ?', (completed, existing_id))
    else:
        db.execute(
            'INSERT INTO workout_logs (user_id, exercise_name, completed, logged_date) VALUES (?, ?, ?, ?)',
            (g.user['id'], exercise_name, completed, date))
    db.commit()
    return jsonify({'message': 'Saved'})


# ─── Favorite Menus API ───────────────────────────────────────────

@app.route('/api/favorites', methods=['GET'])
@login_required
def get_favorites():
    db = get_db()
    rows = db.execute(
        'SELECT menu_id FROM favorite_menus WHERE user_id = ?', (g.user['id'],)).fetchall()
    return jsonify([r['menu_id'] for r in rows])


@app.route('/api/favorites', methods=['POST'])
@login_required
def toggle_favorite():
    data = request.get_json() or {}
    menu_id = data.get('menu_id')

    db = get_db()
    existing = db.execute(
        'SELECT id FROM favorite_menus WHERE user_id = ? AND menu_id = ?',
        (g.user['id'], menu_id)).fetchone()

    if existing:
        existing_id = existing['id'] if isinstance(existing, dict) else existing[0]
        db.execute('DELETE FROM favorite_menus WHERE id = ?', (existing_id,))
        db.commit()
        return jsonify({'favorited': False})
    else:
        db.execute(
            'INSERT INTO favorite_menus (user_id, menu_id) VALUES (?, ?)',
            (g.user['id'], menu_id))
        db.commit()
        return jsonify({'favorited': True})


# ─── Progress Summary API ─────────────────────────────────────────

@app.route('/api/progress', methods=['GET'])
@login_required
def get_progress():
    days = int(request.args.get('days', 7))
    cutoff = (datetime.utcnow() - timedelta(days=days)).strftime('%Y-%m-%d')
    db = get_db()
    user_id = g.user['id']

    food = db.execute('''
        SELECT logged_date, SUM(calories) AS total_cal, COUNT(*) AS meal_count
        FROM food_logs WHERE user_id = ? AND logged_date >= ?
        GROUP BY logged_date ORDER BY logged_date
    ''', (user_id, cutoff)).fetchall()

    water = db.execute('''
        SELECT logged_date, glasses FROM water_logs
        WHERE user_id = ? AND logged_date >= ?
        ORDER BY logged_date
    ''', (user_id, cutoff)).fetchall()

    workouts = db.execute('''
        SELECT logged_date, COUNT(*) AS total, SUM(completed) AS done
        FROM workout_logs WHERE user_id = ? AND logged_date >= ?
        GROUP BY logged_date ORDER BY logged_date
    ''', (user_id, cutoff)).fetchall()

    return jsonify({
        'food': [_serialize(r) for r in food],
        'water': [_serialize(r) for r in water],
        'workouts': [_serialize(r) for r in workouts],
    })


# ─── Entry Point ─────────────────────────────────────────────────

if __name__ == '__main__':
    init_db()
    _db_initialized = True
    backend = 'Postgres' if USE_POSTGRES else 'SQLite'
    print(f"[OK] Database initialized ({backend})")
    print("[OK] NOURISH server running at http://localhost:8080")
    app.run(host='0.0.0.0', port=8080, debug=True)
