export function formatPrice(value: number): string {
  if (value >= 1000) {
    return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }
  if (value >= 1) {
    return '$' + value.toFixed(2);
  }
  return '$' + value.toFixed(6);
}

export function formatLargeNumber(value: number): string {
  if (value >= 1e12) return '$' + (value / 1e12).toFixed(2) + 'T';
  if (value >= 1e9) return '$' + (value / 1e9).toFixed(1) + 'B';
  if (value >= 1e6) return '$' + (value / 1e6).toFixed(1) + 'M';
  return '$' + value.toLocaleString('en-US');
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

export function formatDate(timestamp: number, days: number): string {
  const date = new Date(timestamp);
  if (days === 1) {
    return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
  }
  return (date.getMonth() + 1) + '/' + date.getDate();
}

export function getChangeColor(value: number): string {
  return value >= 0 ? '#22c55e' : '#ef4444';
}

export function isPositive(value: number): boolean {
  return value >= 0;
}
