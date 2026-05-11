import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/coingecko';
import { COIN_IDS } from '../utils/coins';
import type { CoinMarket } from '../types';

interface UseMarketDataReturn {
  coins: CoinMarket[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => void;
}

export function useMarketData(): UseMarketDataReturn {
  const [coins, setCoins] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getMarkets(COIN_IDS);
      setCoins(result);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, 60_000);
    return () => clearInterval(interval);
  }, [fetch]);

  return { coins, loading, error, lastUpdated, refetch: fetch };
}
