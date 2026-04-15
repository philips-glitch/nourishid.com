# NOURISH — Professional Diet Program

A complete web app for diet management with calorie calculator, 91+ meal menus with recipes, home workout scheduler, and progress tracking — backed by a Flask + SQLite database.

## Features

- **Calorie Calculator** using the Mifflin-St Jeor equation (BMR, TDEE, BMI, macros, water needs, time estimates)
- **Menu Diet Lengkap** — 91 Indonesian diet menus across 4 categories (Sarapan, Makan Siang, Makan Malam, Snack) with full recipes, ingredients, steps, and macro info
- **Meal Plans** for 1500 / 1800 / 2100 / 2400 kcal targets
- **Home Workout Scheduler** — 28-day programs (beginner / intermediate / advanced)
- **Progress Tracker** — daily food log, water intake (1–8 glasses), workout checklist
- **Authentication** — email/password (PBKDF2-SHA256) + Google Sign-In
- **Session persistence** — 30-day bearer tokens

## Tech Stack

- **Frontend:** Single-file HTML/CSS/JS with NOURISH design system (Playfair Display + DM Sans + Caveat)
- **Backend:** Flask 3 + SQLite
- **Auth:** PBKDF2-SHA256 password hashing, token-based sessions
- **Google Auth:** Google Identity Services (GIS)

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server (creates nourish.db on first run)
python server.py
```

Open http://localhost:8080

## Database Schema

7 tables: `users`, `sessions`, `calorie_profiles`, `food_logs`, `water_logs`, `workout_logs`, `favorite_menus`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Create account |
| POST | `/api/login` | Email/password login |
| POST | `/api/google-login` | Google Sign-In |
| POST | `/api/logout` | End session |
| GET | `/api/me` | Current user |
| GET/POST | `/api/calorie-profile` | Save/read calorie profile |
| GET/POST/DELETE | `/api/food-logs` | Daily food log |
| GET/POST | `/api/water-logs` | Daily water log |
| GET/POST | `/api/workout-logs` | Workout checklist |
| GET/POST | `/api/favorites` | Favorite menus |
| GET | `/api/progress` | Multi-day progress summary |

## Vercel Deployment with Neon Postgres (Persistent)

The backend supports **two database modes**:
- If `POSTGRES_URL` (or `DATABASE_URL`) env var is set → Neon / Postgres (persistent)
- Otherwise → local SQLite (dev only)

### Setup on Vercel

1. **Import the repo** into Vercel (`vercel.com/new` → pick this repo).
2. **Add Neon Postgres:**
   - Open your project → **Storage** tab → **Create Database** → **Neon Postgres**
   - Vercel auto-injects `POSTGRES_URL`, `DATABASE_URL`, and related env vars into your deployment.
3. **(Optional)** Set `NOURISH_SECRET` env var for a stable session signing key.
4. **Redeploy** — schema auto-creates on first request.

### How it works
- `server.py` picks Postgres when `POSTGRES_URL` / `DATABASE_URL` is present, else falls back to SQLite.
- Schema is dialect-aware: `SERIAL PRIMARY KEY` for Postgres, `INTEGER PRIMARY KEY AUTOINCREMENT` for SQLite.
- `RETURNING id` + `ON CONFLICT … DO UPDATE` portable across both dialects.
- A tiny adapter translates `?` placeholders to `%s` for `psycopg`.

## Google Sign-In Setup

Replace `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com` in `index.html` with your real client ID from [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
