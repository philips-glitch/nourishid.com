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

## Vercel Deployment

`vercel.json` is configured for `@vercel/python` with Flask. On Vercel:
- SQLite DB is written to `/tmp/nourish.db` (only writable path in serverless)
- **IMPORTANT:** `/tmp` is ephemeral — data will be lost between cold starts. For persistent data on Vercel, swap SQLite for Vercel Postgres, Turso, Supabase, or Neon.
- Set env var `NOURISH_SECRET` for a stable session signing key.

## Google Sign-In Setup

Replace `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com` in `index.html` with your real client ID from [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
