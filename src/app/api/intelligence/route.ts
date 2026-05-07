import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // In a real scenario, we'd fetch from multiple tables
    // For now, we simulate a successful Supabase connection
    // and return structured intelligence data.
    
    if (!supabase) {
      return NextResponse.json({ 
        success: false, 
        message: "Supabase client not initialized. Using local fallbacks." 
      });
    }

    const { data: metrics, error } = await supabase
      .from('intelligence_metrics')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: metrics || [],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      success: false, 
      error: message 
    }, { status: 500 });
  }
}
