import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ 
        success: false, 
        message: "Supabase client not initialized. Using local fallbacks." 
      });
    }

    const { data: publications, error } = await supabase
      .from('publications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: publications || [],
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
