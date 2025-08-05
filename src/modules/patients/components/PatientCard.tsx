'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { User, Calendar, MapPin, Phone, AlertCircle } from 'lucide-react'

interface PatientCardProps {
  patient: {
    id: string
    name: string
    lastName: string
    rut?: string
    birthDate?: Date
    gender?: 'MASCULINO' | 'FEMENINO' | 'OTRO'
    status: 'HOSPITALIZADO' | 'UCI' | 'UCM' | 'HOSDOM' | 'ALTA' | 'FALLECIDO'
    admissionDate: Date
    bed: {
      number: string
      name?: string
    }
    diagnoses: {
      description: string
      isPrimary: boolean
    }[]
    tasks: {
      id: string
      title: string
      priority: 'URGENTE' | 'ALTA' | 'NORMAL' | 'BAJA'
      status: 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA' | 'CANCELADA'
    }[]
  }
  onViewDetails?: () => void
  onCreateEvolution?: () => void
  onManageTasks?: () => void
}

const statusColors = {
  HOSPITALIZADO: 'bg-blue-100 text-blue-800',
  UCI: 'bg-red-100 text-red-800',
  UCM: 'bg-orange-100 text-orange-800',
  HOSDOM: 'bg-green-100 text-green-800',
  ALTA: 'bg-gray-100 text-gray-800',
  FALLECIDO: 'bg-black text-white',
}

const priorityColors = {
  URGENTE: 'bg-red-100 text-red-800',
  ALTA: 'bg-orange-100 text-orange-800',
  NORMAL: 'bg-blue-100 text-blue-800',
  BAJA: 'bg-gray-100 text-gray-800',
}

export default function PatientCard({ 
  patient, 
  onViewDetails, 
  onCreateEvolution, 
  onManageTasks 
}: PatientCardProps) {
  const primaryDiagnosis = patient.diagnoses.find(d => d.isPrimary)
  const pendingTasks = patient.tasks.filter(t => t.status === 'PENDIENTE')
  const urgentTasks = pendingTasks.filter(t => t.priority === 'URGENTE')

  const calculateAge = (birthDate?: Date) => {
    if (!birthDate) return null
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1
    }
    return age
  }

  const age = calculateAge(patient.birthDate)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">
                {patient.name} {patient.lastName}
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Cama {patient.bed.number}</span>
                {patient.rut && (
                  <>
                    <span>•</span>
                    <span>{patient.rut}</span>
                  </>
                )}
                {age && (
                  <>
                    <span>•</span>
                    <span>{age} años</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Badge className={statusColors[patient.status]}>
            {patient.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Diagnóstico Principal */}
        {primaryDiagnosis && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">
              Diagnóstico Principal
            </h4>
            <p className="text-sm text-gray-600">{primaryDiagnosis.description}</p>
          </div>
        )}

        {/* Información de Ingreso */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>
              Ingreso: {patient.admissionDate.toLocaleDateString('es-CL')}
            </span>
          </div>
        </div>

        {/* Tareas Pendientes */}
        {pendingTasks.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">
                Tareas Pendientes
              </h4>
              <Badge variant="outline" className="text-xs">
                {pendingTasks.length}
              </Badge>
            </div>
            <div className="space-y-1">
              {pendingTasks.slice(0, 2).map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 truncate">
                    {task.title}
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${priorityColors[task.priority]}`}
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
              {pendingTasks.length > 2 && (
                <p className="text-xs text-gray-500">
                  +{pendingTasks.length - 2} más
                </p>
              )}
            </div>
          </div>
        )}

        {/* Alertas */}
        {urgentTasks.length > 0 && (
          <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-800">
              {urgentTasks.length} tarea{urgentTasks.length > 1 ? 's' : ''} urgente{urgentTasks.length > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Acciones */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onViewDetails}
          >
            Ver Detalles
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onCreateEvolution}
          >
            Evolución
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onManageTasks}
          >
            Tareas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 