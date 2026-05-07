import { NextRequest, NextResponse } from 'next/server';
import { calculateRegionalRisk } from '@/lib/intelligence';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ regionId: string }> }
) {
  try {
    const { regionId } = await params;
    const riskData = await calculateRegionalRisk(regionId);

    return NextResponse.json({
      regionId,
      ...riskData
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
