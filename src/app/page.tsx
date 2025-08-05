'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Tipos para los datos del paciente
interface PatientData {
  id: number
  name: string
  age: string
  gender: string
  diagnosis: string
  subjective: string
  objective: string
  vitals: {
    bp: string
    hr: string
    rr: string
    temp: string
    sat: string
  }
  labs: string
  medications: string
  notes: string
  isComplete: boolean
  evolution?: string
}

// Estado inicial de un paciente vacío
const emptyPatient: Omit<PatientData, 'id'> = {
  name: '',
  age: '',
  gender: '',
  diagnosis: '',
  subjective: '',
  objective: '',
  vitals: { bp: '', hr: '', rr: '', temp: '', sat: '' },
  labs: '',
  medications: '',
  notes: '',
  isComplete: false
}

export default function MedicalDashboard() {
  const [patients, setPatients] = useState<PatientData[]>(
    Array.from({ length: 12 }, (_, i) => ({ id: i + 1, ...emptyPatient }))
  )
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState<number | null>(null)

  // Función para actualizar datos del paciente
  const updatePatient = (id: number, field: keyof PatientData, value: any) => {
    setPatients(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  // Función para actualizar signos vitales
  const updateVitals = (id: number, vital: keyof PatientData['vitals'], value: string) => {
    setPatients(prev => prev.map(p => 
      p.id === id ? { ...p, vitals: { ...p.vitals, [vital]: value } } : p
    ))
  }

  // Función para generar evolución con OpenAI
  const generateEvolution = async (patientId: number) => {
    const patient = patients.find(p => p.id === patientId)
    if (!patient) return

    setIsGenerating(patientId)

    try {
      const response = await fetch('/api/generate-evolution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientData: {
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            diagnosis: patient.diagnosis,
            subjective: patient.subjective,
            objective: patient.objective,
            vitals: patient.vitals,
            labs: patient.labs,
            medications: patient.medications,
            notes: patient.notes
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        updatePatient(patientId, 'evolution', data.evolution)
        updatePatient(patientId, 'isComplete', true)
      } else {
        alert('Error al generar evolución. Verifica tu API key de OpenAI.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión al generar evolución.')
    } finally {
      setIsGenerating(null)
    }
  }

  // Función para resetear paciente
  const resetPatient = (id: number) => {
    setPatients(prev => prev.map(p => 
      p.id === id ? { id, ...emptyPatient } : p
    ))
  }

  // Componente de casilla de paciente
  const PatientCard = ({ patient }: { patient: PatientData }) => {
    const hasData = patient.name || patient.diagnosis || patient.subjective || patient.objective
    const isSelected = selectedPatient === patient.id

    return (
      <Card 
        className={`cursor-pointer transition-all duration-300 ${
          isSelected 
            ? 'ring-2 ring-blue-500 shadow-lg' 
            : hasData 
              ? 'border-green-200 bg-green-50 hover:shadow-md' 
              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
        } ${patient.isComplete ? 'bg-blue-50 border-blue-300' : ''}`}
        onClick={() => setSelectedPatient(patient.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">
              Cama {patient.id}
            </CardTitle>
            <div className="flex gap-2">
              {patient.isComplete && (
                <Badge className="bg-blue-500 text-white">Completo</Badge>
              )}
              {hasData && !patient.isComplete && (
                <Badge variant="outline" className="border-green-500 text-green-700">
                  En progreso
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {patient.name ? (
            <div className="space-y-2">
              <p className="font-medium text-gray-900">{patient.name}</p>
              <p className="text-sm text-gray-600">{patient.age} años, {patient.gender}</p>
              {patient.diagnosis && (
                <p className="text-sm text-blue-600 font-medium">{patient.diagnosis}</p>
              )}
              {patient.vitals.bp && (
                <div className="text-xs text-gray-500">
                  PA: {patient.vitals.bp} | FC: {patient.vitals.hr}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Cama disponible</p>
          )}
        </CardContent>
      </Card>
    )
  }

  // Componente del formulario de paciente
  const PatientForm = ({ patient }: { patient: PatientData }) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Paciente - Cama {patient.id}
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => resetPatient(patient.id)}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            Limpiar
          </Button>
          <Button 
            onClick={() => generateEvolution(patient.id)}
            disabled={!patient.name || !patient.diagnosis || isGenerating === patient.id}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating === patient.id ? 'Generando...' : 'Generar Evolución'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos Básicos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datos del Paciente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                value={patient.name}
                onChange={(e) => updatePatient(patient.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Juan Pérez González"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Edad
                </label>
                <input
                  type="text"
                  value={patient.age}
                  onChange={(e) => updatePatient(patient.id, 'age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="65"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sexo
                </label>
                <select
                  value={patient.gender}
                  onChange={(e) => updatePatient(patient.id, 'gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diagnóstico Principal
              </label>
              <input
                type="text"
                value={patient.diagnosis}
                onChange={(e) => updatePatient(patient.id, 'diagnosis', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Neumonía adquirida en la comunidad"
              />
            </div>
          </CardContent>
        </Card>

        {/* Signos Vitales */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Signos Vitales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Presión Arterial
                </label>
                <input
                  type="text"
                  value={patient.vitals.bp}
                  onChange={(e) => updateVitals(patient.id, 'bp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="120/80"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frecuencia Cardíaca
                </label>
                <input
                  type="text"
                  value={patient.vitals.hr}
                  onChange={(e) => updateVitals(patient.id, 'hr', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="80 lpm"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Freq. Respiratoria
                </label>
                <input
                  type="text"
                  value={patient.vitals.rr}
                  onChange={(e) => updateVitals(patient.id, 'rr', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="16 rpm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperatura
                </label>
                <input
                  type="text"
                  value={patient.vitals.temp}
                  onChange={(e) => updateVitals(patient.id, 'temp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="36.5°C"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Saturación O2
                </label>
                <input
                  type="text"
                  value={patient.vitals.sat}
                  onChange={(e) => updateVitals(patient.id, 'sat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="98%"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Datos Subjetivos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datos Subjetivos</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={patient.subjective}
              onChange={(e) => updatePatient(patient.id, 'subjective', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
              placeholder="Síntomas que refiere el paciente, dolor, malestar, etc."
            />
          </CardContent>
        </Card>

        {/* Datos Objetivos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datos Objetivos</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={patient.objective}
              onChange={(e) => updatePatient(patient.id, 'objective', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
              placeholder="Hallazgos al examen físico, auscultación, palpación, etc."
            />
          </CardContent>
        </Card>

        {/* Laboratorios */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Laboratorios e Imágenes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={patient.labs}
              onChange={(e) => updatePatient(patient.id, 'labs', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              placeholder="Resultados de laboratorio, radiografías, etc."
            />
          </CardContent>
        </Card>

        {/* Medicamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Medicamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={patient.medications}
              onChange={(e) => updatePatient(patient.id, 'medications', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              placeholder="Medicamentos actuales, dosis, frecuencia"
            />
          </CardContent>
        </Card>
      </div>

      {/* Notas Adicionales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notas Adicionales</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={patient.notes}
            onChange={(e) => updatePatient(patient.id, 'notes', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            placeholder="Observaciones adicionales, planes, etc."
          />
        </CardContent>
      </Card>

      {/* Evolución Generada */}
      {patient.evolution && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">Evolución Médica Generada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {patient.evolution}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-xl font-bold">🏥</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EvoMedi</h1>
                <p className="text-sm text-gray-500">Dashboard Médico UCI</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                12 Camas Activas
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {patients.filter(p => p.isComplete).length} Evoluciones Completas
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedPatient ? (
          // Vista detallada del paciente
          <div>
            <Button 
              variant="outline" 
              onClick={() => setSelectedPatient(null)}
              className="mb-6"
            >
              ← Volver al Dashboard
            </Button>
            <PatientForm patient={patients.find(p => p.id === selectedPatient)!} />
          </div>
        ) : (
          // Vista del dashboard con las 12 casillas
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Dashboard de Pacientes
              </h2>
              <p className="text-gray-600">
                Selecciona una cama para gestionar la información del paciente
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {patients.map(patient => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 