import { supabase } from '../supabase';

/**
 * Security Engine
 * Processes conflict and incident data to measure instability pressure.
 */
export async function getSecurityScore(regionId: string) {
  if (!supabase) return { score: 0, value: 0, status: 'Normal' };

  // Fetch latest SECURITY_INDEX
  const { data: idx } = await supabase
    .from('indices')
    .select('value, metadata')
    .eq('region_id', regionId)
    .eq('name', 'SECURITY_INDEX')
    .order('calculated_at', { ascending: false })
    .limit(1)
    .single();

  const score = Number(idx?.value || 0);
  const incidents = Number((idx?.metadata as any)?.incident_count || 0);

  return {
    score,
    value: incidents,
    status: (score >= 70 ? 'Alert' : (score >= 40 ? 'Warning' : 'Normal')) as 'Normal' | 'Warning' | 'Alert'
  };
}
