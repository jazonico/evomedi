import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🏥 EvoMedi
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sistema médico hospitalario avanzado para digitalizar y optimizar los flujos de trabajo clínicos diarios
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Link 
              href="/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link 
              href="/dashboard"
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Ver Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏥</div>
            <h3 className="text-lg font-semibold mb-2">Gestión Hospitalaria</h3>
            <p className="text-gray-600">Control completo de hospitales, unidades y camas en tiempo real</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">👨‍⚕️</div>
            <h3 className="text-lg font-semibold mb-2">Herramientas Médicas</h3>
            <p className="text-gray-600">Evoluciones SOAP, planes por sistemas y gestión de tareas clínicas</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold mb-2">Inteligencia Artificial</h3>
            <p className="text-gray-600">Generación automática de evoluciones con lenguaje clínico chileno</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Dashboard Interactivo</h3>
            <p className="text-gray-600">Métricas en tiempo real y resúmenes automáticos de turno</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-lg font-semibold mb-2">Seguridad Avanzada</h3>
            <p className="text-gray-600">Autenticación robusta y protección de datos médicos</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Responsive Design</h3>
            <p className="text-gray-600">Interfaz optimizada para desktop, tablet y móvil</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Tecnologías</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Next.js 15</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">React 18</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">TypeScript</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Supabase</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Prisma</span>
          </div>
        </div>
      </div>
    </div>
  )
} 