import type { CoinMarket, GlobalData, MarketChartResponse, Period } from '../types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  getGlobalData(): Promise<GlobalData> {
    return fetchJSON<GlobalData>(`${BASE_URL}/global`);
  },

  getMarkets(coinIds: string[]): Promise<CoinMarket[]> {
    const ids = coinIds.join(',');
    return fetchJSON<CoinMarket[]>(
      `${BASE_URL}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`
    );
  },

  getMarketChart(coinId: string, days: Period): Promise<MarketChartResponse> {
    const interval = days === 1 ? 'hourly' : 'daily';
    return fetchJSON<MarketChartResponse>(
      `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`
    );
  },
};
