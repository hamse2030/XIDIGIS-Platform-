import { NextRequest, NextResponse } from 'next/server';
import { calculateRegionalRisk } from '@/lib/intelligence';

export async function GET(
  request: NextRequest,
  { params }: { params: { regionId: string } }
) {
  try {
    const regionId = params.regionId;
    const riskData = await calculateRegionalRisk(regionId);

    return NextResponse.json({
      regionId,
      ...riskData
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
