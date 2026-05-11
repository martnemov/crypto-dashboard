import React from 'react';
import { Sparkline } from './Sparkline';
import { formatPrice, formatLargeNumber, formatPercent, isPositive } from '../utils/format';
import { COINS } from '../utils/coins';
import type { CoinMarket } from '../types';
import styles from './CoinTable.module.css';

interface CoinTableProps {
  coins: CoinMarket[];
  loading: boolean;
}

export const CoinTable: React.FC<CoinTableProps> = ({ coins, loading }) => {
  if (loading && !coins.length) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <span>Loading market data…</span>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.thLeft}># Coin</th>
            <th>Price</th>
            <th>24h %</th>
            <th>Market Cap</th>
            <th>Volume 24h</th>
            <th>7d Chart</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => {
            const config = COINS.find((c) => c.id === coin.id);
            const pct = coin.price_change_percentage_24h ?? 0;
            const up = isPositive(pct);
            return (
              <tr key={coin.id} className={styles.row}>
                <td>
                  <div className={styles.coinCell}>
                    <span className={styles.rank}>{index + 1}</span>
                    <div
                      className={styles.icon}
                      style={{
                        background: config?.bgColor ?? '#eee',
                        color: config?.textColor ?? '#333',
                      }}
                    >
                      {coin.symbol.toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <div className={styles.coinName}>{coin.name}</div>
                      <div className={styles.coinSymbol}>{coin.symbol.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className={styles.price}>{formatPrice(coin.current_price)}</td>
                <td>
                  <span className={`${styles.badge} ${up ? styles.badgeUp : styles.badgeDown}`}>
                    {up ? '▲' : '▼'} {Math.abs(pct).toFixed(2)}%
                  </span>
                </td>
                <td className={styles.muted}>{formatLargeNumber(coin.market_cap)}</td>
                <td className={styles.muted}>{formatLargeNumber(coin.total_volume)}</td>
                <td>
                  <div className={styles.sparkWrap}>
                    <Sparkline prices={coin.sparkline_in_7d?.price ?? []} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
