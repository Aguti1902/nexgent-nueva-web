import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

// GET - Obtener todos los artículos o uno específico por ID
export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const id = searchParams.get('id')

    // Si se proporciona ID, obtener un artículo específico
    if (id) {
      // @ts-ignore - Supabase types not generated yet
      const { data, error } = await supabaseAdmin
        .from('blog_articles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching article:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ article: data })
    }

    // Si no hay ID, obtener todos los artículos
    // @ts-ignore - Supabase types not generated yet
    let query = supabaseAdmin
      .from('blog_articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (published === 'true') {
      query = query.eq('published', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching articles:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ articles: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Crear nuevo artículo
export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const body = await request.json()

    const insertData = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      author: body.author || 'Equipo NexGent',
      date: body.date,
      read_time: body.read_time || '5 min',
      image_url: body.image_url,
      published: body.published !== false,
    }

    // @ts-ignore - Supabase types not generated yet
    const { data, error } = await supabaseAdmin
      .from('blog_articles')
      .insert([insertData])
      .select()
      .single()

    if (error) {
      console.error('Error creating article:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ article: data }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Actualizar artículo existente
export async function PUT(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const body = await request.json()

    const updateData = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      author: body.author,
      read_time: body.read_time,
      image_url: body.image_url,
      published: body.published,
    }

    // @ts-ignore - Supabase types not generated yet
    const { data, error } = await supabaseAdmin
      .from('blog_articles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating article:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ article: data }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

