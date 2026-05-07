/**
 * Security Engine (Placeholder)
 * Currently returns mock data.
 */
export async function getSecurityScore(regionId: string) {
  // TODO: Implement logic to read security incidents from Supabase (ACLED)
  const mockIncidents = 8;
  const score = Math.min(100, mockIncidents * 10);

  return {
    score: Math.min(100, score),
    value: mockIncidents,
    status: (mockIncidents > 5 ? 'Warning' : 'Normal') as 'Normal' | 'Warning' | 'Alert'
  };
}
