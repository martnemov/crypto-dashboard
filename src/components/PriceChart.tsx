import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useChartData } from '../hooks/useChartData';
import { formatDate, formatPrice, getChangeColor } from '../utils/format';
import type { CoinConfig, Period } from '../types';
import styles from './PriceChart.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface PriceChartProps {
  coin: CoinConfig;
  period: Period;
}

export const PriceChart: React.FC<PriceChartProps> = ({ coin, period }) => {
  const { points, loading, error } = useChartData(coin.id, period);

  const { labels, values, isUp, color } = useMemo(() => {
    if (!points.length) return { labels: [], values: [], isUp: true, color: '#22c55e' };
    const labels = points.map((p) => formatDate(p.timestamp, period));
    const values = points.map((p) => p.price);
    const isUp = values[values.length - 1] >= values[0];
    const color = getChangeColor(isUp ? 1 : -1);
    return { labels, values, isUp, color };
  }, [points, period]);

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: values,
          borderColor: color,
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
          backgroundColor: isUp
            ? 'rgba(34,197,94,0.07)'
            : 'rgba(239,68,68,0.07)',
          tension: 0.3,
        },
      ],
    }),
    [labels, values, color, isUp]
  );

  const options: ChartOptions<'line'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 400 },
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (ctx) => ' ' + formatPrice(ctx.raw as number),
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#888',
            maxTicksLimit: 8,
            font: { size: 11 },
          },
          grid: { display: false },
          border: { display: false },
        },
        y: {
          ticks: {
            color: '#888',
            callback: (v) => formatPrice(Number(v)),
            font: { size: 11 },
          },
          grid: { color: 'rgba(128,128,128,0.1)' },
          border: { display: false },
        },
      },
    }),
    []
  );

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <span>Loading chart data…</span>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <Line data={chartData} options={options} />
    </div>
  );
};
