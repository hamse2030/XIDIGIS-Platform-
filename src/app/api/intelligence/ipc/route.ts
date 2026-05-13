import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // 1. Fetch latest food security indices for all regions
    const { data: foodIndices, error: idxError } = await supabase
      .from('indices')
      .select(`
        value,
        metadata,
        calculated_at,
        regions (
          name,
          code
        )
      `)
      .eq('name', 'FOOD_SECURITY_INDEX')
      .order('calculated_at', { ascending: false });

    if (idxError) throw idxError;

    // 2. Fetch historical IPC phases for trend analysis
    const { data: history, error: histError } = await supabase
      .from('observations')
      .select('value, observed_at, region_id')
      .eq('variable', 'ipc_phase')
      .order('observed_at', { ascending: true })
      .limit(100);

    if (histError) throw histError;

    // 3. Aggregate data for the Dashboard
    const dashboardData = {
      summary: {
        total_regions: foodIndices?.length || 0,
        average_risk: (foodIndices?.reduce((acc: number, curr: { value: number }) => acc + curr.value, 0) || 0) / (foodIndices?.length || 1),
        last_update: foodIndices?.[0]?.calculated_at
      },
      distribution: foodIndices?.reduce((acc: Record<string, number>, curr: { metadata: { phase?: number } | unknown }) => {
        const metadata = curr.metadata as { phase?: number };
        const phase = metadata?.phase || 0;
        acc[phase.toString()] = (acc[phase.toString()] || 0) + 1;
        return acc;
      }, {}),
      regions: foodIndices?.map(item => {
        const region = Array.isArray(item.regions) ? item.regions[0] : item.regions;
        const metadata = item.metadata as { phase?: number; population?: number; period?: string };
        return {
          name: (region as { name: string })?.name || 'Unknown',
          code: (region as { code: string })?.code || '??',
          score: item.value,
          phase: metadata?.phase,
          population: metadata?.population,
          period: metadata?.period
        };
      }),
      trends: history // Simplified for MVP
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('❌ IPC API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
