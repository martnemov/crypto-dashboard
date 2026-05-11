import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/coingecko';
import type { ChartPoint, Period } from '../types';

interface UseChartDataReturn {
  points: ChartPoint[];
  loading: boolean;
  error: string | null;
}

export function useChartData(coinId: string, days: Period): UseChartDataReturn {
  const [points, setPoints] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getMarketChart(coinId, days);
      setPoints(
        result.prices.map(([timestamp, price]) => ({ timestamp, price }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chart data');
    } finally {
      setLoading(false);
    }
  }, [coinId, days]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { points, loading, error };
}
