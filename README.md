# CryptoBoard 📈

A live cryptocurrency market dashboard built with **React**, **TypeScript**, and **Chart.js**. Data is fetched in real time from the public [CoinGecko API](https://www.coingecko.com/en/api) — no API key required.

![CryptoBoard screenshot](./screenshot.png)

## Features

- **Live market data** — auto-refreshes every 60 seconds
- **Interactive price chart** — switch between BTC, ETH, SOL, BNB, XRP and 24h / 7d / 30d periods
- **Market dominance** — doughnut chart showing BTC/ETH/others share
- **Top coins table** — price, 24h change, market cap, volume, 7-day sparkline
- **Global metrics** — total market cap, 24h volume, BTC dominance, active coins
- **Dark mode** — respects system preference via `prefers-color-scheme`
- **Fully responsive** — works on mobile, tablet and desktop

## Tech stack

| Layer | Technology |
|---|---|
| UI framework | React 18 |
| Language | TypeScript (strict mode) |
| Charts | Chart.js 4 + react-chartjs-2 |
| Styling | CSS Modules + CSS custom properties |
| Data | CoinGecko public API (no key needed) |
| Deployment | Vercel / GitHub Pages |

## Getting started

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/crypto-dashboard.git
cd crypto-dashboard

# 2. Install dependencies
npm install

# 3. Start dev server
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── api/
│   └── coingecko.ts      # All API calls, typed
├── components/
│   ├── CoinTable.tsx      # Market data table with sparklines
│   ├── DominanceChart.tsx # Doughnut chart for market share
│   ├── MetricCard.tsx     # Summary metric card
│   ├── PriceChart.tsx     # Line chart with period selector
│   └── Sparkline.tsx      # Mini 7-day chart for table rows
├── hooks/
│   ├── useChartData.ts    # Price history for a coin
│   ├── useGlobalData.ts   # Global market stats
│   └── useMarketData.ts   # Top coins list
├── types/
│   └── index.ts           # All TypeScript interfaces
├── utils/
│   ├── coins.ts           # Coin config & constants
│   └── format.ts          # Formatting helpers
├── App.tsx
└── App.css
```

## Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages

# Add to package.json:
# "homepage": "https://YOUR_USERNAME.github.io/crypto-dashboard",
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"

npm run deploy
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Notes

- CoinGecko's free API has a rate limit of ~10–30 calls/minute. The dashboard batches requests and auto-refreshes every 60 seconds to stay within limits.
- No API key is needed for the endpoints used.

## License

MIT
