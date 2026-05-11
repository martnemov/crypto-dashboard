import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/coingecko';
import type { GlobalData } from '../types';

interface UseGlobalDataReturn {
  data: GlobalData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGlobalData(): UseGlobalDataReturn {
  const [data, setData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getGlobalData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch global data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, 60_000);
    return () => clearInterval(interval);
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
