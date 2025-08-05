import { createClient } from '@supabase/supabase-js'

// Cliente para uso en el navegador (funciona con export estático)
export const createSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Para export estático, solo usamos el cliente del navegador
export const supabase = createSupabaseClient()

// Tipos para la base de datos (estos se generarán automáticamente después)
export type Database = {
  public: {
    Tables: {
      // Los tipos se generarán automáticamente desde Supabase
      [key: string]: any
    }
  }
} 