import type { CoinConfig } from '../types';

export const COINS: CoinConfig[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    color: '#f7931a',
    bgColor: 'rgba(247,147,26,0.12)',
    textColor: '#7a4800',
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    color: '#627eea',
    bgColor: 'rgba(98,126,234,0.12)',
    textColor: '#2a3f8a',
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    color: '#9945ff',
    bgColor: 'rgba(153,69,255,0.12)',
    textColor: '#5a0fb8',
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    color: '#f3ba2f',
    bgColor: 'rgba(243,186,47,0.12)',
    textColor: '#7a5800',
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    color: '#00aae4',
    bgColor: 'rgba(0,170,228,0.12)',
    textColor: '#004f7a',
  },
];

export const COIN_IDS = COINS.map((c) => c.id);

export const DOMINANCE_COLORS = [
  '#f7931a',
  '#627eea',
  '#9945ff',
  '#f3ba2f',
  '#00aae4',
  '#8b8b8b',
];
