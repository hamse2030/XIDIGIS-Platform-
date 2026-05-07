import { supabase } from '../../supabase';
import { RiskLevel } from '../index';

/**
 * XIDIGIS Alert Engine
 * Automatically generates alerts based on EWS risk thresholds.
 */

export async function processAlerts(regionId: string, riskScore: number, level: RiskLevel) {
  if (riskScore < 50) return; // Only process elevated risks

  const { data: existingAlert } = await supabase
    .from('alerts')
    .select('*')
    .eq('region_id', regionId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // If no active alert for this region exists, or if the severity has increased
  if (!existingAlert || isSeverityHigher(level, existingAlert.severity)) {
    const { error } = await supabase
      .from('alerts')
      .insert([{
        region_id: regionId,
        severity: level,
        title: `${level} Risk Warning: ${regionId}`,
        description: `Early Warning System has detected ${level.toLowerCase()} risk levels (Score: ${riskScore}). Acceleration in indicators detected.`,
        status: 'active',
        created_at: new Date().toISOString()
      }]);

    if (error) console.error('Alert Engine Error:', error.message);
    else console.log(`🚀 Automated alert generated for ${regionId}: ${level}`);
  }
}

function isSeverityHigher(current: RiskLevel, existing: string): boolean {
  const levels: RiskLevel[] = ['Low', 'Moderate', 'High', 'Severe', 'Critical'];
  return levels.indexOf(current) > levels.indexOf(existing as RiskLevel);
}
