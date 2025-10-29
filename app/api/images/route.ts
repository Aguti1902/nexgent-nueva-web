import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const BUCKET_NAME = 'blog-images'

// GET - Listar todas las imágenes
export async function GET() {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list()

    if (error) {
      console.error('Error listing images:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Obtener URLs públicas de todas las imágenes
    const imagesWithUrls = data.map(file => {
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(file.name)

      return {
        name: file.name,
        url: urlData.publicUrl,
        size: file.metadata?.size || 0,
        createdAt: file.created_at,
        updatedAt: file.updated_at
      }
    })

    return NextResponse.json({ images: imagesWithUrls })
  } catch (error) {
    console.error('Error in GET /api/images:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// POST - Subir nueva imagen
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó ningún archivo' }, { status: 400 })
    }

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Tipo de archivo no válido. Solo se permiten imágenes (JPG, PNG, GIF, WEBP)' 
      }, { status: 400 })
    }

    // Validar tamaño (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'El archivo es demasiado grande. Tamaño máximo: 5MB' 
      }, { status: 400 })
    }

    // Generar nombre único
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    // Convertir File a ArrayBuffer y luego a Uint8Array
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    // Subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, uint8Array, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading to Supabase:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName)

    return NextResponse.json({
      success: true,
      image: {
        name: fileName,
        url: urlData.publicUrl,
        size: file.size
      }
    })
  } catch (error) {
    console.error('Error in POST /api/images:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// DELETE - Eliminar imagen
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fileName = searchParams.get('name')

    if (!fileName) {
      return NextResponse.json({ error: 'No se proporcionó el nombre del archivo' }, { status: 400 })
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName])

    if (error) {
      console.error('Error deleting from Supabase:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Imagen eliminada correctamente' })
  } catch (error) {
    console.error('Error in DELETE /api/images:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

