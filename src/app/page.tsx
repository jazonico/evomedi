'use client'

import React, { useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Stethoscope, Users, Bed, Activity, Calendar, FileText } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const supabase = createSupabaseClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/auth/login')
      }
    }

    checkAuth()
  }, [router, supabase.auth])

  // Mostrar landing page mientras se verifica la autenticación
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">EvoMedi</h1>
                <p className="text-sm text-gray-500">Sistema Médico Hospitalario</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Powered by Supabase
              </Badge>
              <Button variant="outline" size="sm" onClick={() => router.push('/auth/login')}>
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bienvenido a EvoMedi
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Sistema médico hospitalario avanzado con IA integrada
          </p>
          <div className="flex justify-center">
            <Stethoscope className="h-16 w-16 text-blue-600 animate-pulse" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Gestión de Pacientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Administra pacientes, diagnósticos y evoluciones médicas de forma eficiente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Bed className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Control de Camas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Monitorea el estado de camas y optimiza la ocupación hospitalaria
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">IA Médica</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Genera evoluciones automáticas y análisis médicos con inteligencia artificial
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Evoluciones SOAP</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Documentación médica estructurada con formato profesional
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">¿Listo para comenzar?</CardTitle>
              <CardDescription>
                Accede al sistema para gestionar tu unidad médica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                size="lg" 
                className="w-full" 
                onClick={() => router.push('/auth/login')}
              >
                Iniciar Sesión
              </Button>
              <p className="text-sm text-gray-500">
                Sistema integrado con Supabase para máxima seguridad y escalabilidad
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 