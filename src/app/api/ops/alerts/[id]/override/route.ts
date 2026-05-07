import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Create or Update Alert Override (Analyst Role Required)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: alertId } = await params;
    const { newLevel, reason } = await request.json();

    // In a real app, we would verify the user role from the session here
    // For now, we rely on Supabase RLS which checks the public.users table

    const { data, error } = await supabase
      .from('alert_overrides')
      .insert([
        { 
          alert_id: alertId, 
          new_level: newLevel, 
          reason: reason,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Approve Alert Override (Reviewer/Publisher Role Required)
 */
export async function PUT(
  request: NextRequest,
  { params: _params }: { params: Promise<{ id: string }> }
) {
  try {
    const { overrideId, status } = await request.json();

    const { data, error } = await supabase
      .from('alert_overrides')
      .update({ 
        status: status,
        approved_at: status === 'approved' ? new Date().toISOString() : null
      })
      .eq('id', overrideId)
      .select()
      .single();

    if (error) throw error;

    // If approved, we should also update the main 'alerts' table
    if (status === 'approved' && data.alert_id) {
      await supabase
        .from('alerts')
        .update({ severity: data.new_level })
        .eq('id', data.alert_id);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
