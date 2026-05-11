# FALAG Data Ingestion Pipeline

This directory contains scripts for ingesting and processing regional intelligence data.

## Scripts

### 1. CHIRPS Ingestion (`chirps.ts`)
Ingests precipitation data from the Climate Hazards Group InfraRed Precipitation with Station data (CHIRPS) source.

**Functionality:**
- Downloads daily precipitation data.
- Aggregates rolling sums (30, 60, 90 days).
- Computes anomalies against historical baselines.
- Persists raw data to `observations` table.
- Persists computed metrics to `indices` table.

## Usage

Run the script using `tsx` or `node` (if compiled):

```bash
npx tsx src/data-ingest/chirps.ts
```

## Requirements
- Supabase credentials in `.env.local`
- Access to CHIRPS data endpoints
