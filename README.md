# LynkAI — AI Stock Analysis

An AI-powered stock research tool that generates institutional-quality investment briefs for any ticker in seconds. Features user authentication, personal watchlists, and Buy/Hold/Sell ratings.

## Features

- **Buy / Hold / Sell rating** — clear, actionable recommendation on every analysis
- **Bull & Bear case** — balanced, specific arguments for both sides
- **4-dimension scoring** — Growth, Value, Momentum, Risk (1–10)
- **Key catalysts** — upcoming events that could move the stock
- **Risk factors** — rated High / Medium / Low
- **Analyst take** — a closing thesis with real metrics
- **User authentication** — sign up with email/password or Google (SSO)
- **Personal watchlist** — save stocks and track ratings in one place
- **Re-analyze** — refresh any saved stock with one click

## Tech Stack

- **Frontend** — Vanilla HTML/CSS/JS (zero dependencies)
- **Backend** — Vercel Serverless Functions (Node.js)
- **AI** — Anthropic API (claude-sonnet-4-20250514)
- **Auth & Database** — Supabase (email + Google OAuth, PostgreSQL)
- **Hosting** — Vercel

## Project Structure

```
lynkai/
├── api/
│   └── analyze.js          # Serverless function — keeps API key safe
├── public/
│   └── index.html          # Full frontend app
├── SUPABASE_SCHEMA.sql     # Database schema — run once in Supabase
├── SETUP.md                # Step-by-step Supabase setup guide
├── .env.example            # Environment variable template
├── .gitignore
├── package.json
├── vercel.json             # Routing config
└── README.md
```

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/lynkai.git
cd lynkai
```

### 2. Set up Supabase (free)

1. Go to [supabase.com](https://supabase.com) → create a free project
2. Go to **SQL Editor** → paste the contents of `SUPABASE_SCHEMA.sql` → **Run**
3. Go to **Project Settings → API** → copy your **Project URL** and **anon key**
4. Open `public/index.html` and replace:
```js
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

See `SETUP.md` for the full walkthrough.

### 3. Set up Google Sign-In (optional)

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → create a project
2. **APIs & Services** → **Credentials** → **Create OAuth Client ID** (Web application)
3. Add authorized redirect URI:
```
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```
4. Copy Client ID and Secret → paste into Supabase **Authentication → Providers → Google**

### 4. Get your Anthropic API key

Get one at [console.anthropic.com](https://console.anthropic.com)

### 5. Deploy to Vercel

**Option A — GitHub + Vercel Dashboard (recommended)**

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Add environment variable:
   - `ANTHROPIC_API_KEY` = your key
4. Click **Deploy**

Every `git push` to `main` auto-deploys. 🚀

**Option B — CLI**

```bash
npm install -g vercel
vercel
vercel env add ANTHROPIC_API_KEY
```

### 6. Run locally

```bash
npm install -g vercel
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
vercel dev
# Open http://localhost:3000
```

## Environment Variables

| Variable | Description | Where to get it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key | [console.anthropic.com](https://console.anthropic.com) |

> Supabase URL and anon key go directly in `public/index.html` — they are safe to expose in the frontend when Row Level Security is enabled.

## Database Schema

The watchlist table stores each user's saved stocks:

```sql
watchlist (
  id, user_id, ticker, company_name, sector,
  verdict, rating, growth_score, value_score,
  momentum_score, risk_score, summary, saved_at
)
```

Row Level Security ensures users can only access their own data.

## Roadmap

- [ ] Prevent duplicate tickers in watchlist
- [ ] Real-time price data (Yahoo Finance / Alpha Vantage)
- [ ] Sort/filter watchlist by rating
- [ ] Weekly email digest of watchlist
- [ ] News feed per ticker
- [ ] Dark mode

## Disclaimer

For educational purposes only. Not financial advice. Always do your own research before making investment decisions.

## License

MIT
