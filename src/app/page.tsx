import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">🏥</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">EvoMedi</h1>
              <p className="text-xs text-blue-200">Sistema Médico Hospitalario</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/auth/login"
              className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 border border-white/20"
            >
              Iniciar Sesión
            </Link>
            <Link 
              href="/dashboard"
              className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-sm text-blue-200 mb-6 border border-blue-400/30">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Sistema en producción - Disponible 24/7
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              EvoMedi
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revoluciona la atención médica con IA avanzada y gestión hospitalaria inteligente
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/auth/login"
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Comenzar Ahora
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <Link 
                href="/dashboard"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm"
              >
                Ver Demo en Vivo
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-sm text-blue-200">Disponibilidad</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-sm text-blue-200">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">AI</div>
              <div className="text-sm text-blue-200">Powered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">SOAP</div>
              <div className="text-sm text-blue-200">Compatible</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Funcionalidades Avanzadas</h2>
            <p className="text-xl text-blue-200">Todo lo que necesitas para una gestión médica moderna</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                🏥
              </div>
              <h3 className="text-xl font-bold mb-3">Gestión Hospitalaria</h3>
              <p className="text-blue-200 leading-relaxed">
                Control completo de hospitales, unidades y camas con monitoreo en tiempo real y alertas inteligentes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                🤖
              </div>
              <h3 className="text-xl font-bold mb-3">IA Médica Avanzada</h3>
              <p className="text-blue-200 leading-relaxed">
                Generación automática de evoluciones SOAP con lenguaje clínico chileno y análisis predictivo.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                👨‍⚕️
              </div>
              <h3 className="text-xl font-bold mb-3">Herramientas Clínicas</h3>
              <p className="text-blue-200 leading-relaxed">
                Evoluciones SOAP, planes por sistemas médicos y gestión avanzada de tareas clínicas prioritarias.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                📊
              </div>
              <h3 className="text-xl font-bold mb-3">Analytics en Tiempo Real</h3>
              <p className="text-blue-200 leading-relaxed">
                Dashboard interactivo con métricas en vivo, KPIs médicos y reportes automáticos de turno.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-red-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                🔐
              </div>
              <h3 className="text-xl font-bold mb-3">Seguridad Máxima</h3>
              <p className="text-blue-200 leading-relaxed">
                Autenticación robusta, encriptación end-to-end y cumplimiento total con normativas médicas.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-indigo-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                📱
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-Plataforma</h3>
              <p className="text-blue-200 leading-relaxed">
                Interfaz responsive optimizada para desktop, tablet y móvil con sincronización instantánea.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Tecnología de Vanguardia</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { name: 'Next.js 15', color: 'from-gray-700 to-gray-900' },
              { name: 'React 18', color: 'from-blue-500 to-cyan-500' },
              { name: 'TypeScript', color: 'from-blue-600 to-blue-800' },
              { name: 'Supabase', color: 'from-green-500 to-emerald-600' },
              { name: 'Tailwind CSS', color: 'from-cyan-400 to-blue-500' },
              { name: 'Prisma ORM', color: 'from-purple-500 to-purple-700' },
              { name: 'OpenAI GPT-4', color: 'from-green-400 to-blue-500' },
              { name: 'PostgreSQL', color: 'from-blue-700 to-indigo-800' }
            ].map((tech, index) => (
              <div 
                key={index}
                className={`px-6 py-3 bg-gradient-to-r ${tech.color} rounded-full text-white font-medium shadow-lg hover:scale-105 transition-transform duration-300`}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl border border-white/20 backdrop-blur-sm">
            <h2 className="text-4xl font-bold mb-6">¿Listo para revolucionar tu hospital?</h2>
            <p className="text-xl text-blue-200 mb-8">
              Únete a los hospitales que ya están transformando la atención médica con EvoMedi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/login"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
              >
                Comenzar Gratis
              </Link>
              <Link 
                href="/dashboard"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Explorar Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold">🏥</span>
            </div>
            <span className="text-xl font-bold">EvoMedi</span>
          </div>
          <p className="text-blue-200 mb-4">
            Transformando la medicina, simplificando el cuidado
          </p>
          <div className="text-sm text-blue-300">
            © 2024 EvoMedi. Hecho con ❤️ para los profesionales de la salud.
          </div>
        </div>
      </footer>
    </div>
  )
} 