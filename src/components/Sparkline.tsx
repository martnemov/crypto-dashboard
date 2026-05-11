import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

interface SparklineProps {
  prices: number[];
  width?: number;
  height?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({ prices, width = 80, height = 32 }) => {
  const isUp = useMemo(
    () => prices.length > 0 && prices[prices.length - 1] >= prices[0],
    [prices]
  );

  const chartData = useMemo(
    () => ({
      labels: prices.map((_, i) => i),
      datasets: [
        {
          data: prices,
          borderColor: isUp ? '#22c55e' : '#ef4444',
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
          tension: 0.3,
        },
      ],
    }),
    [prices, isUp]
  );

  return (
    <div style={{ width, height }}>
      <Line
        data={chartData}
        options={{
          responsive: false,
          animation: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: {
            x: { display: false },
            y: { display: false },
          },
        }}
        width={width}
        height={height}
      />
    </div>
  );
};
