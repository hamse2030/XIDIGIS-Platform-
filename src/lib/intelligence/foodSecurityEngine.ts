/**
 * Food Security Engine (Placeholder)
 * Currently returns mock data.
 */
export async function getFoodSecurityScore(regionId: string) {
  // TODO: Implement logic to read IPC Phase from Supabase
  const mockIpcPhase = 3; 
  const score = (mockIpcPhase - 1) * 25; // Phase 1=0, Phase 5=100

  return {
    score: Math.min(100, score),
    value: mockIpcPhase,
    status: (mockIpcPhase >= 3 ? 'Warning' : 'Normal') as 'Normal' | 'Warning' | 'Alert'
  };
}
