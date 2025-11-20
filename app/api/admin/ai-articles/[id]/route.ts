import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

// GET - Obtener un artículo específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: article, error } = await supabase
      .from('ai_generated_articles')
      .select('*')
      .eq('id', params.id)
      .single()
    
    if (error) throw error
    
    if (!article) {
      return NextResponse.json(
        { error: 'Artículo no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ article })
  } catch (error: any) {
    console.error('Error obteniendo artículo:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

