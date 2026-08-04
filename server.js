import 'dotenv/config';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: '.env.local' });

const app = express();
const port = Number(process.env.MARKET_DATA_PORT || 8787);
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
const cacheTtlMs = Number(process.env.MARKET_DATA_CACHE_TTL_MS || 900000);
const requestDelayMs = Number(process.env.ALPHA_VANTAGE_REQUEST_DELAY_MS || 1200);
const cache = new Map();
const inFlight = new Map();
let alphaQueue = Promise.resolve();

const MARKET_MAP = {
  XAU: { label: 'XAU/USD', name: 'Gold Spot', assetClass: 'metals', type: 'metal', alphaSymbol: 'GOLD' },
  GOLD: { label: 'XAU/USD', name: 'Gold Spot', assetClass: 'metals', type: 'metal', alphaSymbol: 'GOLD' },
  XAG: { label: 'XAG/USD', name: 'Silver Spot', assetClass: 'metals', type: 'metal', alphaSymbol: 'SILVER' },
  SILVER: { label: 'XAG/USD', name: 'Silver Spot', assetClass: 'metals', type: 'metal', alphaSymbol: 'SILVER' },
  WTI: { label: 'WTI OIL', name: 'WTI Crude Oil', assetClass: 'energy', type: 'commodity', alphaFunction: 'WTI' },
  BRENT: { label: 'BRENT', name: 'Brent Crude Oil', assetClass: 'energy', type: 'commodity', alphaFunction: 'BRENT' },
  AAPL: { label: 'AAPL', name: 'Apple Inc.', assetClass: 'stocks', type: 'stock', alphaSymbol: 'AAPL' },
  MSFT: { label: 'MSFT', name: 'Microsoft Corp.', assetClass: 'stocks', type: 'stock', alphaSymbol: 'MSFT' },
  NVDA: { label: 'NVDA', name: 'NVIDIA Corp.', assetClass: 'stocks', type: 'stock', alphaSymbol: 'NVDA' },
  SPY: { label: 'SPY', name: 'SPDR S&P 500 ETF', assetClass: 'stocks', type: 'stock', alphaSymbol: 'SPY' },
};

function readNumber(value) {
  if (value === null || value === undefined) return null;
  const numeric = Number(String(value).replace(/[$,%\s,]/g, ''));
  return Number.isFinite(numeric) ? numeric : null;
}

function pickFirstNumber(object, keys) {
  for (const key of keys) {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      const numeric = readNumber(object[key]);
      if (numeric !== null) return numeric;
    }
  }
  return null;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function alphaFetchNow(params) {
  if (!apiKey) {
    throw new Error('ALPHA_VANTAGE_API_KEY is missing');
  }

  const url = new URL('https://www.alphavantage.co/query');
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set('apikey', apiKey);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Alpha Vantage returned HTTP ${response.status}`);
  }

  const data = await response.json();
  if (data.Note || data.Information) {
    throw new Error(data.Note || data.Information);
  }
  if (data['Error Message']) {
    throw new Error(data['Error Message']);
  }

  return data;
}

async function alphaFetch(params) {
  const request = alphaQueue.then(async () => {
    const data = await alphaFetchNow(params);
    await delay(requestDelayMs);
    return data;
  });
  alphaQueue = request.catch(() => {});
  return request;
}

function parseMetalQuote(data) {
  return {
    price: pickFirstNumber(data, ['price', 'spot_price', 'ask', 'bid', 'value', 'Realtime Currency Exchange Rate', '5. Exchange Rate']),
    change: pickFirstNumber(data, ['change', 'change_amount']),
    changePercent: pickFirstNumber(data, ['change_percent', 'change_percentage']),
  };
}

function parseStockQuote(data) {
  const quote = data['Global Quote'] || {};
  return {
    price: pickFirstNumber(quote, ['05. price', 'price']),
    change: pickFirstNumber(quote, ['09. change', 'change']),
    changePercent: pickFirstNumber(quote, ['10. change percent', 'change_percent']),
  };
}

function parseCommodityQuote(data) {
  const latest = Array.isArray(data.data) ? data.data.find((entry) => readNumber(entry.value) !== null) : null;
  return {
    price: readNumber(latest?.value),
    change: null,
    changePercent: null,
    updatedAt: latest?.date,
  };
}

async function fetchQuote(symbol) {
  const normalized = symbol.toUpperCase();
  const market = MARKET_MAP[normalized];
  if (!market) {
    return {
      symbol,
      status: 'unsupported',
      message: 'Symbol is not configured in the market data map',
    };
  }

  const cacheKey = normalized;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < cacheTtlMs) {
    return cached.quote;
  }
  if (inFlight.has(cacheKey)) {
    return inFlight.get(cacheKey);
  }

  const request = (async () => {
    try {
    let parsed;
    if (market.type === 'metal') {
      parsed = parseMetalQuote(await alphaFetch({
        function: 'GOLD_SILVER_SPOT',
        symbol: market.alphaSymbol,
      }));
    } else if (market.type === 'commodity') {
      parsed = parseCommodityQuote(await alphaFetch({
        function: market.alphaFunction,
        interval: 'daily',
      }));
    } else {
      parsed = parseStockQuote(await alphaFetch({
        function: 'GLOBAL_QUOTE',
        symbol: market.alphaSymbol,
      }));
    }

    const quote = {
      symbol: market.label,
      name: market.name,
      assetClass: market.assetClass,
      price: parsed.price,
      change: parsed.change,
      changePercent: parsed.changePercent,
      currency: 'USD',
      status: parsed.price === null ? 'empty' : 'ok',
      source: 'Alpha Vantage',
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };

    cache.set(cacheKey, { cachedAt: Date.now(), quote });
    return quote;
    } catch (error) {
    return {
      symbol: market.label,
      name: market.name,
      assetClass: market.assetClass,
      price: null,
      change: null,
      changePercent: null,
      currency: 'USD',
      status: 'error',
      source: 'Alpha Vantage',
      updatedAt: new Date().toISOString(),
      message: error.message,
    };
    }
  })();

  inFlight.set(cacheKey, request);
  try {
    return await request;
  } finally {
    inFlight.delete(cacheKey);
  }
}

app.get('/api/market/quotes', async (request, response) => {
  const requested = String(request.query.symbols || 'XAU,XAG,WTI,BRENT,AAPL,MSFT,NVDA,SPY')
    .split(',')
    .map((symbol) => symbol.trim())
    .filter(Boolean);

  const quotes = await Promise.all(requested.map(fetchQuote));

  response.json({
    provider: 'Alpha Vantage',
    cachedForMs: cacheTtlMs,
    updatedAt: new Date().toISOString(),
    quotes,
  });
});

app.get('/api/market/status', (_request, response) => {
  response.json({
    ok: Boolean(apiKey),
    provider: 'Alpha Vantage',
    port,
    cacheSize: cache.size,
  });
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Market data backend listening on http://127.0.0.1:${port}`);
});
