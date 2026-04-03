# LynkAI — AI Stock Analysis Agent

An AI-powered stock research tool that generates institutional-quality investment briefs for any ticker in seconds. Built with Claude (Anthropic) and deployable on Vercel.

![LynkAI Screenshot](https://i.imgur.com/placeholder.png)

## Features

- **Instant analysis** — enter any ticker and get a full brief in ~5 seconds
- **Bull & Bear case** — balanced, specific arguments for both sides
- **4-dimension scoring** — Growth, Value, Momentum, Risk (1–10)
- **Key catalysts** — upcoming events that could move the stock
- **Risk factors** — rated High / Medium / Low
- **Analyst take** — a closing thesis with real metrics

## Tech Stack

- **Frontend** — Vanilla HTML/CSS/JS (zero dependencies)
- **Backend** — Vercel Serverless Function (Node.js)
- **AI** — Claude claude-sonnet-4-20250514 via Anthropic API

## Project Structure

```
lynkai/
├── api/
│   └── analyze.js      # Serverless function — keeps API key safe
├── public/
│   └── index.html      # Frontend
├── .env.example        # Environment variable template
├── .gitignore
├── package.json
├── vercel.json         # Routing config
└── README.md
```

## Local Development

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/lynkai.git
cd lynkai
```

### 2. Install Vercel CLI

```bash
npm install -g vercel
```

### 3. Set up your API key

```bash
cp .env.example .env.local
# Edit .env.local and add your Anthropic API key
# Get one at https://console.anthropic.com
```

### 4. Run locally

```bash
vercel dev
# Open http://localhost:3000
```

## Deploy to Vercel

### Option A — CLI (fastest)

```bash
vercel
# Follow the prompts — it'll ask you to log in and create a project
# Then add your env variable:
vercel env add ANTHROPIC_API_KEY
```

### Option B — GitHub + Vercel Dashboard (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. In **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
4. Click **Deploy** — you'll get a live URL instantly

Every `git push` to `main` will auto-deploy. 🚀

## Customization Ideas

- Add real-time price data via Yahoo Finance or Alpha Vantage API
- Add a portfolio watchlist (saved to localStorage)
- Add a news feed per ticker using web search
- Email digest of your watchlist every morning
- Dark mode toggle

## Disclaimer

For educational purposes only. Not financial advice. Always do your own research before making investment decisions.

## License

MIT
