# XIDIGIS Early Warning System (EWS)

## Overview
The XIDIGIS Early Warning System is a data-driven infrastructure designed to monitor and predict regional risks (Drought, Food Security, Security) in the Horn of Africa.

## Data Schema

### 1. `observations`
Raw daily data points from external sources.
- `region_id`: UUID (FK to regions)
- `source_id`: UUID (FK to sources)
- `variable`: string (e.g., 'precipitation')
- `value`: numeric
- `observed_at`: timestamp

### 2. `indices`
Aggregated and normalized metrics used for risk assessment.
- `name`: string (e.g., 'CHIRPS_90D_ANOMALY')
- `value`: numeric (percentage or sum)
- `metadata`: JSONB (window size, type)

## Ingestion Pipeline

The ingestion process runs daily via the `src/data-ingest/chirps.ts` script.
1. **Download**: Fetches daily precipitation from CHIRPS.
2. **Aggregation**: Computes 30/60/90 day rolling sums.
3. **Normalization**: Calculates anomalies against a historical baseline.
4. **Persistence**: Syncs data to Supabase.

## Risk Algorithm
The composite risk score is calculated using weighted sub-engines:
- **Climate Score (40%)**: Derived from 90-day rainfall anomalies.
- **Food Security (40%)**: Derived from IPC Phase classifications.
- **Security (20%)**: Derived from security incident frequency.

### Tuning Weights
Weights can be adjusted in `src/config/risk-weights.json`:
```json
{
  "weights": {
    "climate": 0.4,
    "foodSecurity": 0.4,
    "security": 0.2
  }
}
```

## Deployment & Cron
To automate ingestion, set up a cron job (Vercel Cron or GitHub Actions) to call the ingestion endpoint or run the script daily at 00:00 UTC.
