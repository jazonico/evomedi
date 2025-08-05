// Middleware deshabilitado para export estático
// import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { NextResponse, type NextRequest } from 'next/server'

// export async function middleware(request: NextRequest) {
//   // Middleware code commented out for static export
// }

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }

// Para export estático, la autenticación se maneja en el cliente
export function middleware() {
  // No-op for static export
}

export const config = {
  matcher: [],
} 