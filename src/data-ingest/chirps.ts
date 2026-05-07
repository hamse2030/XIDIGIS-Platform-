import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

/**
 * XIDIGIS CHIRPS Ingestion Script
 * 
 * This script simulates the ingestion of CHIRPS precipitation data,
 * aggregates rolling sums, computes anomalies, and pushes to Supabase.
 */

// --- 1. CONFIGURATION & SETUP ---

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    });
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const REGION_ID = '78864125-30cd-4909-a8ae-10401405a1a6'; // Somaliland
const SOURCE_ID = 'a0b1d325-b449-4f93-a50d-7fa7b9b6fec9'; // CHIRPS

// --- 2. DATA SIMULATION / FETCHING ---

/**
 * Generates mock daily precipitation data for the last 120 days.
 */
function generateMockChirpsData() {
  const data = [];
  const today = new Date();
  
  for (let i = 120; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Simulate seasonal rainfall (higher in April/May and Oct/Nov)
    const month = date.getMonth();
    let baseRain = 0.5;
    if (month === 3 || month === 4) baseRain = 5.0; // Gu season
    if (month === 9 || month === 10) baseRain = 3.0; // Deyr season
    
    const value = Math.max(0, baseRain + (Math.random() * 10 - 5));
    data.push({ date: date.toISOString(), value });
  }
  return data;
}

// --- 3. PROCESSING & AGGREGATION ---

async function runIngestion() {
  console.log('🚀 Starting CHIRPS Ingestion Pipeline...');
  
  // A. Fetch / Generate Data
  const dailyData = generateMockChirpsData();
  console.log(`✅ Generated ${dailyData.length} days of daily observations.`);

  // B. Ingest Raw Observations
  console.log('📦 Uploading raw observations...');
  const observations = dailyData.map(d => ({
    region_id: REGION_ID,
    source_id: SOURCE_ID,
    variable: 'precipitation',
    value: d.value,
    observed_at: d.date
  }));

  const { error: obsError } = await supabase.from('observations').upsert(observations, { onConflict: 'region_id,source_id,variable,observed_at' });
  if (obsError) console.error('❌ Error uploading observations:', obsError.message);
  else console.log('✅ Raw observations synced.');

  // C. Compute Rolling Sums & Anomalies
  console.log('📊 Computing indices...');
  const rollingWindows = [30, 60, 90];
  const indices = [];

  for (const window of rollingWindows) {
    // Current Period Sum (last X days)
    const currentPeriod = dailyData.slice(-window);
    const currentSum = currentPeriod.reduce((acc, curr) => acc + curr.value, 0);

    // Mock Historical Baseline (for demo purposes)
    // In production, this would be queried from a 'baselines' table
    const historicalMean = window * 1.5; // Example: 1.5mm per day avg
    const anomalyPercent = ((currentSum - historicalMean) / historicalMean) * 100;

    indices.push({
      region_id: REGION_ID,
      name: `CHIRPS_${window}D_SUM`,
      value: currentSum,
      metadata: { window, type: 'rolling_sum', unit: 'mm' }
    });

    indices.push({
      region_id: REGION_ID,
      name: `CHIRPS_${window}D_ANOMALY`,
      value: anomalyPercent,
      metadata: { window, type: 'percentile_anomaly', unit: '%' }
    });
  }

  // D. Ingest Indices
  const { error: idxError } = await supabase.from('indices').insert(indices);
  if (idxError) console.error('❌ Error uploading indices:', idxError.message);
  else console.log(`✅ ${indices.length} indices calculated and synced.`);

  console.log('🏁 Ingestion complete.');
}

runIngestion().catch(console.error);
