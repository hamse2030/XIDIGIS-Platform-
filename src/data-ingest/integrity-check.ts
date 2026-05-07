import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

/**
 * XIDIGIS System Integrity Check
 * 
 * Audits:
 * 1. Data Staleness: Alerts if ingestion has stalled (>36h).
 * 2. Critical Events: Aggregates active Critical alerts for escalation.
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

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const WEBHOOK_URL = process.env.MONITORING_WEBHOOK_URL || null;

async function notify(message: string, severity: 'WARNING' | 'CRITICAL') {
  console.log(`[${severity}] ${message}`);
  if (WEBHOOK_URL) {
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `*XIDIGIS ${severity}*: ${message}` })
      });
    } catch (e) {
      console.error('Failed to send webhook');
    }
  }
}

async function checkIntegrity() {
  console.log('🔍 Starting System Integrity Audit...');

  // --- Audit 1: Data Freshness ---
  const { data: stalenessData } = await supabase
    .from('indices')
    .select('region_id, calculated_at, regions(name)')
    .order('calculated_at', { ascending: false });

  const thirtySixHoursAgo = new Date(Date.now() - 36 * 60 * 60 * 1000);
  const staleRegions = stalenessData?.filter(d => new Date(d.calculated_at) < thirtySixHoursAgo);

  if (staleRegions && staleRegions.length > 0) {
    const names = Array.from(new Set((staleRegions as any[]).map(r => {
      const regionData = Array.isArray(r.regions) ? r.regions[0] : r.regions;
      return regionData?.name || 'Unknown';
    }))).join(', ');
    await notify(`Data staleness detected in regions: ${names}. Ingestion may be failing.`, 'CRITICAL');
  } else {
    console.log('✅ All region data is fresh (<36h).');
  }

  // --- Audit 2: Critical Alert Escalation ---
  const { data: criticalData } = await supabase
    .from('indices')
    .select('*, regions(name)')
    .gt('value', 75) // Critical Threshold
    .ilike('name', '%ANOMALY%');

  if (criticalData && criticalData.length > 0) {
    const alerts = (criticalData as any[]).map(d => {
      const regionData = Array.isArray(d.regions) ? d.regions[0] : d.regions;
      return `${regionData?.name || 'Unknown'} (${d.value}%)`;
    }).join(', ');
    await notify(`Critical drought anomalies detected: ${alerts}. Immediate analyst review required.`, 'CRITICAL');
  } else {
    console.log('✅ No automated Critical alerts triggered.');
  }

  console.log('🏁 Integrity audit complete.');
}

checkIntegrity().catch(console.error);
