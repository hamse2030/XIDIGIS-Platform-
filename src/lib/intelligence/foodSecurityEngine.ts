import { supabase } from '../supabase';

/**
 * Food Security Engine
 * Pulls latest IPC-based risk metrics from the database.
 */
export async function getFoodSecurityScore(regionId: string) {
  if (!supabase) return { score: 0, value: 0, status: 'Normal' };

  // Try to fetch latest FOOD_SECURITY_INDEX
  const { data: idx } = await supabase
    .from('indices')
    .select('value, metadata')
    .eq('region_id', regionId)
    .eq('name', 'FOOD_SECURITY_INDEX')
    .order('calculated_at', { ascending: false })
    .limit(1)
    .single();

  const score = Number(idx?.value || 0);
  const phase = Number((idx?.metadata as any)?.phase || 1);

  return {
    score,
    value: phase,
    status: (score >= 60 ? 'Alert' : (score >= 30 ? 'Warning' : 'Normal')) as 'Normal' | 'Warning' | 'Alert'
  };
}
