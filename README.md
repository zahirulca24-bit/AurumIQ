# AurumIQ — Metals & Energy Demo Trading Terminal

AurumIQ is a Windows desktop and web trading terminal focused exclusively on:

- **Gold — XAU/USD**
- **Silver — XAG/USD**
- **WTI Crude Oil — USOIL**

The current release provides a responsive React frontend, an Electron Windows desktop application, a one-click installer, cached/delayed market previews, scanner and signal screens, charts, risk controls, journal UI, and demo backtest screens.

The next implementation track expands AurumIQ into a complete **broker-demo trading platform** with a FastAPI backend, historical data, explainable strategy scanners, strict risk controls, demo-order execution, position management, reconciliation, persistent journaling, real backtesting, and performance analytics.

> **Environment boundary:** Demo trading only. Live-money execution is not approved or implemented.

---

## Current Status

### Implemented

- React + Vite + TypeScript frontend
- Responsive desktop, tablet, and mobile layouts
- Electron Windows desktop application
- NSIS one-click installer with Desktop and Start Menu shortcuts
- Dashboard
- Market Watch
- Scanner
- Signal Detail
- Charts
- Risk Dashboard
- Journal
- Backtest
- Settings
- Locked instrument scope: XAU/USD, XAG/USD, USOIL
- Transitional server-side Alpha Vantage market-preview adapter
- Cached, delayed, unavailable, and demo data states
- No-Trade Gate UI
- Instrument-specific risk multipliers
- Demo-data integrity labels
- Local production server bundled with the desktop app

### Not implemented yet

- Production FastAPI backend
- Historical candle warehouse
- Real strategy scanner engine
- Broker demo-account connection
- Demo-order placement
- Position management and broker reconciliation
- Real economic-calendar feed
- Real backtesting engine
- Persistent journal and analytics database
- Authentication and operator controls
- Notifications

---

## Locked Product Scope

### Supported instruments

| Instrument | Symbol | Role |
|---|---|---|
| Gold | `XAU/USD` | Primary metals instrument |
| Silver | `XAG/USD` | Higher-volatility instrument with reduced risk |
| WTI Crude Oil | `USOIL` | Energy instrument with separate volatility and event rules |

### Explicitly excluded

- General Forex pairs
- Stocks and ETFs
- Brent crude
- Crypto assets
- Unapproved live broker trading
- Real-money automatic execution
- Martingale or uncontrolled averaging-down logic

---

## Product Workflow

```text
Market Data
    ↓
Historical Data Warehouse
    ↓
Indicator & Market Structure Engine
    ↓
Independent Strategy Scanners
    ↓
Signal Validation & Conflict Resolution
    ↓
No-Trade Gate
    ↓
Risk Engine
    ↓
Broker Demo Execution
    ↓
Position Management
    ↓
Broker Reconciliation
    ↓
Journal, Backtest & Performance Analytics
```

A scanner result must never go directly to the broker. Every candidate must pass data-quality checks, closed-candle validation, market-regime checks, event-risk checks, multi-timeframe validation, conflict resolution, and the risk engine.

---

## Target Architecture

```text
React Web Frontend / Electron Desktop App
                    │
             REST + WebSocket/SSE
                    │
               FastAPI Backend
                    │
 ┌──────────────────┼────────────────────┐
 │                  │                    │
Market Data      Analysis             Risk Engine
 │                  │                    │
 └──────────────────┼────────────────────┘
                    │
          Broker Demo Execution
                    │
        Position Management & Reconciliation
                    │
        PostgreSQL / Supabase Database
```

### Recommended backend stack

- Python 3.12
- FastAPI
- PostgreSQL / Supabase
- SQLAlchemy 2
- Alembic
- Pydantic v2
- APScheduler initially
- Redis-compatible cache when required
- WebSocket or Server-Sent Events
- pytest + HTTPX
- Docker
- GitHub Actions
- Railway or an equivalent always-on container host

---

## Current Frontend Routes

| Route | Screen |
|---|---|
| `/` | Dashboard |
| `/market-watch` | Market Watch |
| `/scanner` | Scanner |
| `/signals/:id` | Signal Detail |
| `/charts` | Charts |
| `/charts/:symbol` | Instrument Chart |
| `/risk` | Risk Dashboard |
| `/journal` | Journal |
| `/backtest` | Backtest |
| `/settings` | Settings |

---

## Windows Desktop Installer

Build the installer by double-clicking:

```text
BUILD-WINDOWS-INSTALLER.bat
```

The installer is generated inside:

```text
release/
```

Startup logs are stored at:

```text
%APPDATA%\AurumIQ\logs\startup.log
```

The desktop package includes:

- Electron desktop shell
- Local server auto-start
- Startup diagnostics
- React Router fallback
- Packaged frontend assets
- Desktop shortcut
- Start Menu shortcut

---

## Transitional Market Preview API

Current endpoints:

```text
GET /api/market/status
GET /api/market/quotes?symbols=XAU/USD,XAG/USD,USOIL
```

Current rules:

- Provider keys remain server-side
- XAU/USD and XAG/USD use a metals endpoint
- USOIL uses WTI observations
- WTI daily observations are marked delayed, not live
- Missing credentials return an explicit error
- Requests must not hang
- Demo values must never be silently presented as current market facts

The future FastAPI backend will replace this transitional service only after equivalent behavior is independently tested.

---

# Backend Master Roadmap

## Phase 1 — Production Foundation

- Modular FastAPI structure
- `/api/v1` versioning
- Environment validation
- Health and readiness endpoints
- Structured JSON logging
- Request and correlation IDs
- Central error handling
- CORS allowlist
- Rate limiting
- PostgreSQL connection
- Alembic migrations
- Instrument allowlist
- Docker and CI pipeline

Initial endpoints:

```text
GET /health
GET /ready
GET /api/v1/status
GET /api/v1/instruments
```

## Phase 2 — Authentication and Governance

- Operator login/logout
- Secure sessions
- Role-based access
- CSRF protection where required
- Login throttling
- Session expiry and revocation
- Mutation audit logs
- Read-only mode
- Emergency trading pause
- Demo/live environment separation
- Secret encryption and rotation policy

## Phase 3 — Market Data Framework

Provider-independent interface:

```text
get_quote()
get_candles()
get_instrument_metadata()
get_market_status()
health_check()
normalize_error()
```

Required capabilities:

- Primary and secondary providers
- Broker market-feed adapter
- Quote and OHLCV normalization
- Closed-candle enforcement
- Cache and stale-data policy
- Retry and backoff
- Timeout and rate-limit handling
- In-flight request deduplication
- Provider failover
- Source timestamps
- Feed-health scoring
- Price reconciliation

Target timeframes:

- 1m
- 5m
- 15m
- 1h
- 4h
- Daily where provider limitations require it

## Phase 4 — Historical Data Warehouse

Core tables:

- instruments
- market_quotes
- market_candles
- provider_health
- candle_gaps
- economic_events
- scan_runs
- scanner_results
- signals
- signal_rejections
- risk_decisions
- broker_accounts
- demo_orders
- demo_fills
- demo_positions
- trade_events
- journal_entries
- performance_snapshots
- audit_logs

Data rules:

- Store timestamps in UTC
- Display BDT in the UI
- Closed candles only for analysis
- Duplicate prevention
- Missing-candle detection
- Data lineage and source timestamps

## Phase 5 — Indicator and Market Structure Engine

Initial calculations:

- EMA 20, 50, 200
- RSI 14
- MACD 12-26-9
- ATR 14
- ADX
- Bollinger Band width
- Swing highs and lows
- Support and resistance
- Session range
- Trend slope
- Volatility percentile
- Break of structure
- Change of character
- Liquidity sweep
- Fair value gap
- Order block

## Phase 6 — Independent Strategy Scanners

Initial scanners:

1. Trend Pullback
2. Breakout Retest
3. Liquidity Sweep Reversal
4. Session Momentum

Each scanner remains isolated and produces its own explainable candidate. Scanner logic must not be silently mixed.

## Phase 7 — Signal Validation and Conflict Resolution

Validation pipeline:

```text
Scanner Candidate
→ Data Quality
→ Closed Candle
→ Market Regime
→ Economic Event Risk
→ Multi-Timeframe Check
→ Conflict Resolver
→ No-Trade Gate
→ Risk Engine
→ Execution Eligibility
```

Grades:

- A+
- A
- B+
- Reject

Only A+ and A candidates may become demo-execution eligible. B+ remains watchlist-only.

## Phase 8 — No-Trade Gate

Block conditions include:

- Unavailable or stale data
- Candle gaps
- Incomplete candle
- Insufficient history
- Low risk/reward
- Excessive volatility
- Excessive spread
- Event-risk window
- Timeframe conflict
- Daily risk lock
- Disabled instrument or strategy

## Phase 9 — Risk Engine

Controls:

- Account capital
- Risk per trade
- Daily loss limit
- Weekly drawdown limit
- Maximum concurrent trades
- Maximum open risk
- Correlation exposure
- Consecutive-loss pause
- Instrument exposure
- Session exposure

Initial risk multipliers:

- Gold: `1.00`
- Silver: `0.60`
- WTI: `0.75`

Broker lot size must not be calculated until contract size, tick size, tick value, minimum quantity, and quantity step are available from the broker.

## Phase 10 — Broker Demo Adapter

Adapter interface:

```text
connect()
account_status()
instruments()
quote()
place_order()
modify_order()
cancel_order()
close_position()
list_orders()
list_positions()
list_fills()
disconnect()
```

Delivery sequence:

1. Read-only demo-account connectivity
2. Instrument mapping and quote comparison
3. Manual demo-order placement
4. Semi-automatic order execution after user approval
5. Automatic demo execution only after explicit audit approval

## Phase 11 — Execution Engine

Supported order types:

- Market
- Limit
- Stop
- Stop-loss
- Take-profit

Safeguards:

- Client order ID
- Idempotency key
- Duplicate-order prevention
- Price-deviation check
- Spread check
- Slippage ceiling
- Quantity validation
- Broker symbol mapping
- Acknowledgement timeout
- Safe retry
- Full audit trail

Order states:

```text
CREATED
→ VALIDATED
→ SUBMITTED
→ ACKNOWLEDGED
→ PARTIALLY_FILLED
→ FILLED
→ MANAGED
→ CLOSED

REJECTED | CANCELLED | EXPIRED | ERROR
```

## Phase 12 — Position Management

- Initial stop-loss
- TP1 partial close
- Break-even adjustment
- TP2 partial close
- Runner position
- ATR trailing stop
- Structure trailing stop
- Time-based exit
- Session-end exit
- Early invalidation
- Manual close
- Emergency close

## Phase 13 — Broker Reconciliation

The reconciliation worker compares internal state with the broker demo account:

- Open orders
- Open positions
- Partial fills
- Completed fills
- Cancelled orders
- Stop and target changes
- Manual broker-side changes
- Account connectivity

Any unresolved mismatch pauses new demo execution and creates an audit event.

## Phase 14 — Economic Event Risk Engine

Gold and Silver events:

- CPI
- NFP
- FOMC
- Federal Reserve speeches
- PCE
- GDP

WTI events:

- EIA inventories
- API inventories
- OPEC/OPEC+ decisions
- Supply disruptions
- Relevant geopolitical events

Controls include pre-event blocking, post-event stabilization windows, volatility checks, and spread-expansion blocks.

## Phase 15 — Persistent Journal and Analytics

Automatic journal content:

- Signal snapshot
- Strategy version
- Entry rationale
- Risk decision
- Broker acknowledgement
- Fill price and slippage
- Position-management events
- Exit rationale
- P&L
- R multiple
- Session and regime
- Rule violations

Analytics:

- Win rate
- Expectancy
- Profit factor
- Average R
- Maximum drawdown
- Strategy performance
- Instrument performance
- Session performance
- Grade performance
- Slippage analysis
- Rejection analysis

## Phase 16 — Real Backtesting and Replay

- Historical replay
- Closed-candle decisions
- Spread and slippage
- Fees where applicable
- Partial exits
- Break-even logic
- Trailing stops
- Session filters
- Event exclusions
- Out-of-sample testing
- Walk-forward testing
- Parameter-stability analysis

## Phase 17 — Internal Paper Portfolio

A separate internal paper engine will run beside broker demo execution to compare:

```text
Theoretical paper result
Broker demo execution result
```

This is used for slippage measurement, broker comparison, and strategy validation.

## Phase 18 — Notifications

Initial channels:

- In-app
- Telegram
- Email

Events:

- Qualified signal
- Demo order submitted
- Order rejected
- Partial fill
- TP or stop reached
- Position closed
- Risk lock
- Broker disconnected
- Stale data
- Reconciliation mismatch

## Phase 19 — Deployment and Operations

Target deployment:

```text
Web frontend      → Netlify or Vercel
Windows desktop   → Electron NSIS installer
FastAPI backend   → Railway or equivalent
PostgreSQL        → Supabase
Workers           → Dedicated backend worker service
Source and CI/CD  → GitHub
Broker connection → Approved demo API only
```

Operational requirements:

- Environment-specific configuration
- Demo/live secrets physically separated
- Health and readiness monitoring
- Database backups
- Migration rollback plan
- Structured logs
- Failure alerts
- Graceful shutdown
- Restart-safe execution state

---

## Security Principles

- Provider and broker keys remain server-side
- No secret appears in the browser bundle
- Mutation endpoints require authenticated operator sessions
- Every order mutation is audited
- Demo and live environments remain isolated
- Live trading cannot be enabled through a frontend toggle
- Emergency pause and read-only mode are available
- Duplicate execution is prevented through idempotency
- Broker and internal positions are continuously reconciled

---

## Demo-Data Integrity

Until the relevant backend phases are complete, these values remain illustrative:

- Static prices when provider data is unavailable
- Scanner entries, stops, targets, and R:R
- Signal confluences and bias labels
- Chart candles
- Journal entries
- Backtest statistics
- Win-rate and performance cards

Required labels:

- `Illustrative demo setup`
- `Demo value`
- `Cached/delayed preview`
- `Not for trading decisions`

---

## Current Environment Variables

| Variable | Required | Default | Purpose |
|---|---:|---:|---|
| `ALPHA_VANTAGE_API_KEY` | For provider data | — | Transitional market-preview provider key |
| `PORT` | No | `3000` | Local or hosted server port |
| `CORS_ALLOWLIST` | No | localhost origins | Allowed origins |
| `CACHE_TTL_MS` | No | `60000` | Quote cache TTL |
| `REQUEST_SPACING_MS` | No | `15000` | Provider request spacing |
| `UPSTREAM_TIMEOUT_MS` | No | `8000` | Provider timeout |
| `RATE_LIMIT_CAPACITY` | No | `20` | Per-IP token-bucket capacity |
| `RATE_LIMIT_REFILL_PER_SEC` | No | `5` | Token refill rate |

---

## Current Development Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm start
```

Windows installer:

```text
BUILD-WINDOWS-INSTALLER.bat
```

---

## Release Gates

### Frontend gate

- All routes load
- Responsive layouts pass
- No console-breaking errors
- Demo labels remain visible
- Windows installer opens successfully

### Backend foundation gate

- Tests and migrations pass
- Health and readiness pass
- Authentication protects mutations
- Logging and audit IDs work

### Broker demo gate

- Read-only connectivity verified
- Instrument mapping verified
- Tick size and quantity rules verified
- Manual demo order works
- Duplicate prevention works
- Reconciliation works
- Emergency pause works

### Automatic demo-execution gate

Automatic demo execution remains disabled until:

- Strategy backtests pass approved criteria
- Out-of-sample and walk-forward tests are complete
- Demo forward testing is complete
- Risk locks are validated
- Reconciliation has no unresolved critical defects
- Explicit user approval is recorded

### Live-trading gate

Live-money trading remains outside the approved scope and requires a separate architecture, security, legal, operational, and risk review.

---

## Immediate Next Milestone

> **Backend Phase 1 — FastAPI foundation, PostgreSQL schema, authentication boundary, health/readiness, instrument registry, structured logging, Docker, CI, and provider interfaces.**

Broker demo execution is part of the approved master direction, but it will be implemented only after the foundation, data, validation, and risk layers are tested.

---

## Product Goal

AurumIQ is intended to become a professional Gold, Silver, and WTI demo-trading terminal that collects traceable market data, generates explainable strategy candidates, applies strict risk and event controls, executes approved orders through a broker demo API, reconciles positions, manages exits, and records complete backtest and trading performance.
