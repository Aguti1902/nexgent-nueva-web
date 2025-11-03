import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 60

// POST - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { email, source } = await request.json()

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    const { data: existingSubscriber, error: checkError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('email, is_active')
      .eq('email', email.toLowerCase())
      .single()

    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return NextResponse.json(
          { error: 'Este email ya está suscrito' },
          { status: 400 }
        )
      } else {
        // Reactivar suscripción si estaba inactiva
        const { data, error } = await supabaseAdmin
          .from('newsletter_subscribers')
          .update({ is_active: true, updated_at: new Date().toISOString() })
          .eq('email', email.toLowerCase())
          .select()

        if (error) {
          console.error('Error reactivating subscription:', error)
          return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(
          { message: 'Suscripción reactivada exitosamente', data },
          { status: 200 }
        )
      }
    }

    // Insertar nuevo suscriptor
    const { data, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert([
        {
          email: email.toLowerCase(),
          source: source || 'blog',
          is_active: true,
        },
      ])
      .select()

    if (error) {
      console.error('Error inserting newsletter subscription:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { message: 'Suscripción exitosa', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// GET - Get all subscribers (for admin purposes)
export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    
    // Check if requesting active subscribers only
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'

    let query = supabaseAdmin
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false })

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching subscribers:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ subscribers: data, count: data?.length || 0 }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// DELETE - Unsubscribe (using unsubscribe token)
export async function DELETE(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    if (!token && !email) {
      return NextResponse.json(
        { error: 'Token o email requerido' },
        { status: 400 }
      )
    }

    let query = supabaseAdmin.from('newsletter_subscribers')

    if (token) {
      query = query.eq('unsubscribe_token', token)
    } else if (email) {
      query = query.eq('email', email.toLowerCase())
    }

    const { data, error } = await query
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .select()

    if (error) {
      console.error('Error unsubscribing:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Suscripción no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Desuscripción exitosa', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

