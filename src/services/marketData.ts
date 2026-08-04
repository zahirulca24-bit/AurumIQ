export interface MarketQuote {
  symbol: string;
  name?: string;
  assetClass?: string;
  price: number | null;
  change: number | null;
  changePercent: number | null;
  currency?: string;
  status: 'ok' | 'empty' | 'error' | 'unsupported';
  source?: string;
  updatedAt?: string;
  message?: string;
}

export interface MarketQuotesResponse {
  provider: string;
  cachedForMs: number;
  updatedAt: string;
  quotes: MarketQuote[];
}

export async function fetchMarketQuotes(symbols: string[]): Promise<MarketQuotesResponse> {
  const query = encodeURIComponent(symbols.join(','));
  const response = await fetch(`/api/market/quotes?symbols=${query}`);
  if (!response.ok) {
    throw new Error(`Market data request failed with HTTP ${response.status}`);
  }
  return response.json();
}

export function formatPrice(value: number | null, digits = 2) {
  if (value === null || value === undefined || Number.isNaN(value)) return '--';
  return value.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatSigned(value: number | null, suffix = '') {
  if (value === null || value === undefined || Number.isNaN(value)) return '--';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}${suffix}`;
}

