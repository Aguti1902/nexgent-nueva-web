import { createClient } from '@supabase/supabase-js'

// Cliente de Supabase para el navegador (client-side)
// Lazy initialization para evitar errores durante el build
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

// Para compatibilidad con código existente
export const supabase = typeof window !== 'undefined' ? getSupabase() : null as any

// Cliente de Supabase para el servidor (server-side) con service_role key
// Solo usar en API routes
let supabaseAdminInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseAdmin = () => {
  if (!supabaseAdminInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables for admin')
    }
    
    supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  return supabaseAdminInstance
}

// Tipos para la base de datos
export interface BlogArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  read_time: string
  image_url: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  created_at: string
}

