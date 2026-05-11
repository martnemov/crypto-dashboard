import React, { useState } from 'react';
import { MetricCard } from './components/MetricCard';
import { PriceChart } from './components/PriceChart';
import { DominanceChart } from './components/DominanceChart';
import { CoinTable } from './components/CoinTable';
import { useGlobalData } from './hooks/useGlobalData';
import { useMarketData } from './hooks/useMarketData';
import { formatLargeNumber, formatPercent, isPositive } from './utils/format';
import { COINS } from './utils/coins';
import type { CoinConfig, Period } from './types';
import './App.css';

const PERIODS: { label: string; value: Period }[] = [
  { label: '24h', value: 1 },
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
];

function App() {
  const [selectedCoin, setSelectedCoin] = useState<CoinConfig>(COINS[0]);
  const [period, setPeriod] = useState<Period>(1);

  const { data: globalData } = useGlobalData();
  const { coins, loading: coinsLoading, lastUpdated } = useMarketData();

  const gd = globalData?.data;
  const btcDom = gd?.market_cap_percentage?.btc ?? 0;
  const capChange = gd?.market_cap_change_percentage_24h_usd ?? 0;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">₿</div>
          <div>
            <h1 className="title">CryptoBoard</h1>
            <p className="subtitle">Live market data powered by CoinGecko</p>
          </div>
        </div>
        {lastUpdated && (
          <div className="last-updated">
            <span className="live-dot" />
            Updated at {lastUpdated.getHours()}:
            {String(lastUpdated.getMinutes()).padStart(2, '0')}
          </div>
        )}
      </header>

      {/* Metrics row */}
      <div className="metrics-grid">
        <MetricCard
          label="Market Cap"
          value={gd ? formatLargeNumber(gd.total_market_cap.usd) : '—'}
          change={
            gd ? (
              <span className={isPositive(capChange) ? 'up' : 'down'}>
                {isPositive(capChange) ? '▲' : '▼'} {Math.abs(capChange).toFixed(2)}% 24h
              </span>
            ) : undefined
          }
        />
        <MetricCard
          label="24h Volume"
          value={gd ? formatLargeNumber(gd.total_volume.usd) : '—'}
          change={<span className="muted">total traded today</span>}
        />
        <MetricCard
          label="BTC Dominance"
          value={gd ? btcDom.toFixed(1) + '%' : '—'}
          change={<span className="muted">of total market cap</span>}
        />
        <MetricCard
          label="Active Coins"
          value={gd ? gd.active_cryptocurrencies.toLocaleString() : '—'}
          change={<span className="muted">tracked assets</span>}
        />
      </div>

      {/* Chart + Dominance */}
      <div className="main-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Price Chart</h2>
            </div>
            <div className="controls">
              {/* Coin selector */}
              <div className="coin-select">
                {COINS.map((coin) => (
                  <button
                    key={coin.id}
                    className={`coin-btn ${selectedCoin.id === coin.id ? 'active' : ''}`}
                    onClick={() => setSelectedCoin(coin)}
                  >
                    <span
                      className="coin-dot"
                      style={{ background: coin.color }}
                    />
                    {coin.symbol}
                  </button>
                ))}
              </div>
              {/* Period selector */}
              <div className="tabs">
                {PERIODS.map((p) => (
                  <button
                    key={p.value}
                    className={`tab ${period === p.value ? 'active' : ''}`}
                    onClick={() => setPeriod(p.value)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <PriceChart coin={selectedCoin} period={period} />
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Dominance</h2>
          </div>
          <DominanceChart globalData={globalData} />
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Top Coins</h2>
          <span className="muted" style={{ fontSize: 12 }}>by market capitalization</span>
        </div>
        <CoinTable coins={coins} loading={coinsLoading} />
      </div>
    </div>
  );
}

export default App;
