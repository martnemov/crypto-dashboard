import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DOMINANCE_COLORS } from '../utils/coins';
import type { GlobalData } from '../types';
import styles from './DominanceChart.module.css';

ChartJS.register(ArcElement, Tooltip);

interface DominanceChartProps {
  globalData: GlobalData | null;
}

export const DominanceChart: React.FC<DominanceChartProps> = ({ globalData }) => {
  const { labels, data, colors } = useMemo(() => {
    if (!globalData) return { labels: [], data: [], colors: [] };
    const pct = globalData.data.market_cap_percentage;
    const top = Object.keys(pct).slice(0, 5);
    const others = 100 - top.reduce((s, k) => s + pct[k], 0);
    return {
      labels: [...top.map((k) => k.toUpperCase()), 'Others'],
      data: [...top.map((k) => parseFloat(pct[k].toFixed(1))), parseFloat(others.toFixed(1))],
      colors: DOMINANCE_COLORS,
    };
  }, [globalData]);

  if (!globalData) {
    return <div className={styles.skeleton} />;
  }

  return (
    <div>
      <div className={styles.chartWrap}>
        <Doughnut
          data={{ labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 4 }] }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: { label: (c) => ` ${c.label}: ${c.raw}%` },
              },
            },
          }}
        />
      </div>
      <div className={styles.legend}>
        {labels.map((name, i) => (
          <span key={name} className={styles.legendItem}>
            <span className={styles.dot} style={{ background: colors[i] }} />
            {name} {data[i]}%
          </span>
        ))}
      </div>
    </div>
  );
};
