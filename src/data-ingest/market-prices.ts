import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

/**
 * Market Price Ingestion Script
 * Simulates fetching grain and livestock prices across regions.
 */

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) process.env[key.trim()] = valueParts.join('=').trim();
    });
  }
}
loadEnv();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function ingestMarketPrices() {
  console.log('📈 Starting Market Price Ingestion...');

  // 1. Get Metadata
  const { data: regions } = await (supabase.from('regions').select('id, name') as any);
  const { data: source } = await (supabase.from('sources').select('id').eq('name', 'Local Market Feed').single() as any);

  if (!regions || !source) {
    console.error('❌ Metadata missing (Regions or Source)');
    return;
  }

  const variables = ['price_maize', 'price_sorghum', 'price_goat_export'];
  const observations = [];

  for (const region of regions) {
    for (const variable of variables) {
      // Simulation: Price + small random fluctuation
      const basePrice = variable === 'price_goat_export' ? 85 : 1200;
      const value = basePrice + (Math.random() - 0.5) * (basePrice * 0.1);

      observations.push({
        region_id: region.id,
        source_id: source.id,
        variable,
        value,
        observed_at: new Date().toISOString()
      });
    }
  }

  // 2. Insert Observations
  const { error } = await supabase.from('observations').insert(observations);
  if (error) {
    console.error('❌ Ingestion failed:', error.message);
  } else {
    console.log(`✅ Successfully ingested ${observations.length} market observations.`);
    
    // 3. Trigger Index Calculation (Simplified for demo)
    await calculateMarketIndices(regions);
  }
}

async function calculateMarketIndices(regions: any[]) {
  console.log('🔄 Calculating Market Indices...');
  
  const indices = regions.map(region => ({
    region_id: region.id,
    name: 'MARKET_PRICE_VOLATILITY',
    value: 15 + Math.random() * 20, // Simulated z-score/volatility
    metadata: { type: 'market_volatility', window: '30d' }
  }));

  const { error } = await supabase.from('indices').insert(indices);
  if (error) console.error('❌ Index calculation failed:', error.message);
  else console.log('✅ Market indices updated.');
}

ingestMarketPrices().catch(console.error);
