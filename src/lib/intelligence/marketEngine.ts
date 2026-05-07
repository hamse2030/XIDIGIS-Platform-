import { supabase } from '../supabase';

/**
 * Market Intelligence Engine
 * Normalizes market volatility into a 0-100 risk score.
 */
export async function getMarketScore(regionId: string) {
  if (!supabase) return { score: 0, value: 0, status: 'Normal' };

  const { data, error } = await supabase
    .from('indices')
    .select('value')
    .eq('region_id', regionId)
    .eq('name', 'MARKET_PRICE_VOLATILITY')
    .order('calculated_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return { score: 0, value: 0, status: 'Normal' as const };
  }

  const volatility = Number(data.value);
  
  // Normalization: Volatility > 30% is Critical (100)
  const score = (volatility / 30) * 100;
  
  return {
    score: Math.min(100, score),
    value: volatility,
    status: (volatility > 25 ? 'Alert' : (volatility > 15 ? 'Warning' : 'Normal')) as 'Normal' | 'Warning' | 'Alert'
  };
}
