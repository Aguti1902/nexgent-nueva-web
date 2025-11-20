import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

// GET - Obtener artículos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    let query = supabase
      .from('ai_generated_articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    
    const { data: articles, error } = await query
    
    if (error) throw error
    
    return NextResponse.json({ articles })
  } catch (error: any) {
    console.error('Error obteniendo artículos:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

// PATCH - Actualizar artículo (aprobar, rechazar, editar)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      )
    }
    
    // Si se está aprobando, añadir published_at
    if (updates.status === 'published' && !updates.published_at) {
      updates.published_at = new Date().toISOString()
    }
    
    // Actualizar updated_at
    updates.updated_at = new Date().toISOString()
    
    const { data: article, error } = await supabase
      .from('ai_generated_articles')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ 
      success: true, 
      article,
      message: 'Artículo actualizado exitosamente'
    })
  } catch (error: any) {
    console.error('Error actualizando artículo:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

// POST - Crear artículo manualmente
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data: article, error } = await supabase
      .from('ai_generated_articles')
      .insert({
        ...body,
        status: body.status || 'draft',
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ 
      success: true, 
      article,
      message: 'Artículo creado exitosamente'
    })
  } catch (error: any) {
    console.error('Error creando artículo:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar artículo
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      )
    }
    
    const { error } = await supabase
      .from('ai_generated_articles')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.json({ 
      success: true,
      message: 'Artículo eliminado exitosamente'
    })
  } catch (error: any) {
    console.error('Error eliminando artículo:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

