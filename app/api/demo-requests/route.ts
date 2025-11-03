import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

// POST - Crear nueva solicitud de demo
export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const body = await request.json()

    const { name, email, phone, company, industry, employees, agentType, objectives } = body

    // Validar campos requeridos
    if (!name || !email || !phone || !company || !industry || !employees || !agentType || agentType.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Insertar en Supabase
    const { data, error } = await supabaseAdmin
      .from('demo_requests')
      .insert([
        {
          name,
          email,
          phone,
          company,
          industry,
          employees,
          agent_types: agentType, // Array de tipos de agentes
          objectives: objectives || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating demo request:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET - Obtener todas las solicitudes de demo
export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    const { data, error } = await supabaseAdmin
      .from('demo_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching demo requests:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ requests: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
