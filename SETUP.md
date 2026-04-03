# LynkAI v4 — Setup Guide

## What's new in this version
- User sign up / sign in (via Supabase Auth)
- Save stocks to a personal watchlist
- Watchlist cards showing ticker, company, scores, and rating
- Buy / Hold / Sell rating on every analysis

---

## Step 1 — Create a Supabase project (free)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click **New Project**
3. Give it a name (e.g. `lynkai`) and set a database password
4. Wait ~1 minute for it to spin up

---

## Step 2 — Create the database table

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy everything from `SUPABASE_SCHEMA.sql` and paste it in
4. Click **Run**

You should see "Success" — your `watchlist` table is ready.

---

## Step 3 — Get your Supabase credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (looks like `https://xxxx.supabase.co`)
   - **anon / public key** (long string starting with `eyJ...`)

---

## Step 4 — Add credentials to index.html

Open `public/index.html` and find these two lines near the bottom:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Replace with your actual values:

```javascript
const SUPABASE_URL = 'https://xxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGci...your-full-key';
```

---

## Step 5 — Deploy to Vercel

Make sure your Vercel project still has `ANTHROPIC_API_KEY` set.
No new environment variables needed — Supabase keys go in the HTML (they're safe to expose).

```bash
git add .
git commit -m "add auth and watchlist"
git push
```

Vercel auto-deploys in ~30 seconds.

---

## Step 6 — Enable Email Auth in Supabase

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (it is by default)
3. Optional: turn off **Confirm email** during testing so users can sign in immediately without verifying their email

---

## You're live!

Users can now:
- Sign up with email + password
- Analyze any stock
- Save it to their personal watchlist
- View watchlist cards with ticker, scores, and Buy/Hold/Sell rating
- Re-analyze any saved stock
- Remove stocks from their watchlist
