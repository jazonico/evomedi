/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removemos output: 'export' para permitir API routes
  // Solo usaremos export estático para páginas específicas
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configuración para desarrollo y producción
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig 