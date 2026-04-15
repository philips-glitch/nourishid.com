"""
NOURISH Diet Program — Flask Backend with SQLite Database
"""

import os
import sqlite3
import hashlib
import secrets
import json
from datetime import datetime, timedelta
from functools import wraps

from flask import Flask, request, jsonify, send_from_directory, g
from flask_cors import CORS

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'nourish.db')
SECRET_KEY = secrets.token_hex(32)

# ─── Database Helpers ───────────────────────────────────────────────

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
        g.db.execute('PRAGMA journal_mode=WAL')
        g.db.execute('PRAGMA foreign_keys=ON')
    return g.db

@app.teardown_appcontext
def close_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    db = sqlite3.connect(DATABASE)
    db.execute('PRAGMA journal_mode=WAL')
    db.execute('PRAGMA foreign_keys=ON')
    db.executescript('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT,
            provider TEXT NOT NULL DEFAULT 'email',
            avatar TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT UNIQUE NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS calorie_profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
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
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS food_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            calories INTEGER NOT NULL,
            label TEXT,
            logged_date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS water_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            glasses INTEGER NOT NULL DEFAULT 0,
            logged_date DATE NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE(user_id, logged_date)
        );

        CREATE TABLE IF NOT EXISTS workout_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            exercise_name TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0,
            logged_date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS favorite_menus (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            menu_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE(user_id, menu_id)
        );

        CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
        CREATE INDEX IF NOT EXISTS idx_food_logs_user_date ON food_logs(user_id, logged_date);
        CREATE INDEX IF NOT EXISTS idx_water_logs_user_date ON water_logs(user_id, logged_date);
        CREATE INDEX IF NOT EXISTS idx_workout_logs_user_date ON workout_logs(user_id, logged_date);
    ''')
    db.commit()
    db.close()

# ─── Auth Helpers ───────────────────────────────────────────────────

def hash_password(password):
    salt = secrets.token_hex(16)
    hashed = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    return f"{salt}:{hashed.hex()}"

def verify_password(password, stored):
    salt, hashed = stored.split(':')
    check = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    return check.hex() == hashed

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
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# ─── Auth API ───────────────────────────────────────────────────────

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
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
    cursor = db.execute(
        'INSERT INTO users (name, email, password_hash, provider) VALUES (?, ?, ?, ?)',
        (name, email, pw_hash, 'email'))
    db.commit()

    user_id = cursor.lastrowid
    token = create_session(user_id)

    return jsonify({
        'token': token,
        'user': {'name': name, 'email': email, 'avatar': None, 'provider': 'email'}
    }), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
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
    data = request.get_json()
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
        cursor = db.execute(
            'INSERT INTO users (name, email, avatar, provider) VALUES (?, ?, ?, ?)',
            (name, email, avatar, 'google'))
        db.commit()
        user_id = cursor.lastrowid

    token = create_session(user_id)

    return jsonify({
        'token': token,
        'user': {'name': name, 'email': email, 'avatar': avatar, 'provider': 'google'}
    })

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    auth = request.headers.get('Authorization', '')
    token = auth[7:]
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
    data = request.get_json()
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
    if row:
        return jsonify(dict(row))
    return jsonify(None)

# ─── Food Log API ──────────────────────────────────────────────────

@app.route('/api/food-logs', methods=['GET'])
@login_required
def get_food_logs():
    date = request.args.get('date', datetime.utcnow().strftime('%Y-%m-%d'))
    db = get_db()
    rows = db.execute(
        'SELECT * FROM food_logs WHERE user_id = ? AND logged_date = ? ORDER BY created_at',
        (g.user['id'], date)).fetchall()
    return jsonify([dict(r) for r in rows])

@app.route('/api/food-logs', methods=['POST'])
@login_required
def add_food_log():
    data = request.get_json()
    calories = data.get('calories')
    label = data.get('label', '')
    date = data.get('date', datetime.utcnow().strftime('%Y-%m-%d'))

    if not calories or not isinstance(calories, (int, float)):
        return jsonify({'error': 'Kalori harus berupa angka.'}), 400

    db = get_db()
    cursor = db.execute(
        'INSERT INTO food_logs (user_id, calories, label, logged_date) VALUES (?, ?, ?, ?)',
        (g.user['id'], int(calories), label, date))
    db.commit()

    return jsonify({'id': cursor.lastrowid, 'calories': int(calories), 'label': label, 'logged_date': date}), 201

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
    return jsonify(dict(row) if row else {'glasses': 0})

@app.route('/api/water-logs', methods=['POST'])
@login_required
def update_water_log():
    data = request.get_json()
    glasses = data.get('glasses', 0)
    date = data.get('date', datetime.utcnow().strftime('%Y-%m-%d'))

    db = get_db()
    db.execute('''
        INSERT INTO water_logs (user_id, glasses, logged_date) VALUES (?, ?, ?)
        ON CONFLICT(user_id, logged_date) DO UPDATE SET glasses = excluded.glasses
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
    return jsonify([dict(r) for r in rows])

@app.route('/api/workout-logs', methods=['POST'])
@login_required
def save_workout_log():
    data = request.get_json()
    exercise_name = data.get('exercise_name', '')
    completed = 1 if data.get('completed') else 0
    date = data.get('date', datetime.utcnow().strftime('%Y-%m-%d'))

    db = get_db()
    existing = db.execute(
        'SELECT id FROM workout_logs WHERE user_id = ? AND exercise_name = ? AND logged_date = ?',
        (g.user['id'], exercise_name, date)).fetchone()

    if existing:
        db.execute('UPDATE workout_logs SET completed = ? WHERE id = ?', (completed, existing['id']))
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
    data = request.get_json()
    menu_id = data.get('menu_id')

    db = get_db()
    existing = db.execute(
        'SELECT id FROM favorite_menus WHERE user_id = ? AND menu_id = ?',
        (g.user['id'], menu_id)).fetchone()

    if existing:
        db.execute('DELETE FROM favorite_menus WHERE id = ?', (existing['id'],))
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
    db = get_db()
    user_id = g.user['id']

    # Daily calorie totals
    food_data = db.execute('''
        SELECT logged_date, SUM(calories) as total_cal, COUNT(*) as meal_count
        FROM food_logs WHERE user_id = ? AND logged_date >= date('now', ?)
        GROUP BY logged_date ORDER BY logged_date
    ''', (user_id, f'-{days} days')).fetchall()

    # Water data
    water_data = db.execute('''
        SELECT logged_date, glasses FROM water_logs
        WHERE user_id = ? AND logged_date >= date('now', ?)
        ORDER BY logged_date
    ''', (user_id, f'-{days} days')).fetchall()

    # Workout completion
    workout_data = db.execute('''
        SELECT logged_date, COUNT(*) as total, SUM(completed) as done
        FROM workout_logs WHERE user_id = ? AND logged_date >= date('now', ?)
        GROUP BY logged_date ORDER BY logged_date
    ''', (user_id, f'-{days} days')).fetchall()

    return jsonify({
        'food': [dict(r) for r in food_data],
        'water': [dict(r) for r in water_data],
        'workouts': [dict(r) for r in workout_data]
    })

# ─── Initialize & Run ─────────────────────────────────────────────

if __name__ == '__main__':
    init_db()
    print("[OK] Database initialized: nourish.db")
    print("[OK] NOURISH server running at http://localhost:8080")
    app.run(host='0.0.0.0', port=8080, debug=True)
