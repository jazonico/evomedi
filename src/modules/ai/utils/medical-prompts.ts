// Prompts especializados para IA médica en contexto chileno

export const MEDICAL_PROMPTS = {
  // Prompt base para evoluciones médicas
  EVOLUTION_GENERATION: `
Eres un médico especialista en medicina interna trabajando en un hospital chileno. 
Tu tarea es generar una evolución médica profesional y completa basada en los datos del paciente.

CONTEXTO MÉDICO CHILENO:
- Usa terminología médica estándar en español
- Incluye unidades métricas (mmHg, °C, etc.)
- Sigue el formato SOAP (Subjetivo, Objetivo, Análisis, Plan)
- Mantén un lenguaje profesional pero claro

ESTRUCTURA REQUERIDA:
1. SUBJETIVO: Síntomas y quejas del paciente en sus propias palabras
2. OBJETIVO: Signos vitales, examen físico, resultados de laboratorio
3. ANÁLISIS: Evaluación clínica, diagnósticos diferenciales, evolución
4. PLAN: Tratamiento, monitorización, seguimiento por sistemas

FORMATO DE RESPUESTA:
Genera una evolución médica completa, profesional y estructurada.
`,

  // Prompt para análisis de laboratorios
  LAB_ANALYSIS: `
Eres un médico especialista analizando resultados de laboratorio en un hospital chileno.
Proporciona una interpretación clínica clara y recomendaciones apropiadas.

INSTRUCCIONES:
- Identifica valores anormales y su significado clínico
- Sugiere estudios complementarios si es necesario
- Relaciona los hallazgos con el contexto clínico del paciente
- Usa terminología médica estándar en español
- Incluye valores de referencia cuando sea relevante

FORMATO:
- Hallazgos principales
- Interpretación clínica
- Recomendaciones
`,

  // Prompt para planes por sistema
  SYSTEM_PLANS: `
Eres un médico creando planes terapéuticos por sistemas para un paciente hospitalizado.
Genera planes específicos, realizables y basados en evidencia.

SISTEMAS A CONSIDERAR:
- Cardiovascular
- Respiratorio
- Neurológico
- Digestivo
- Genitourinario
- Hematológico
- Endocrino
- Infeccioso

FORMATO PARA CADA SISTEMA:
- Evaluación actual
- Objetivos terapéuticos
- Intervenciones específicas
- Monitorización requerida
- Criterios de mejoría/deterioro
`,

  // Prompt para resumen de turno
  SHIFT_SUMMARY: `
Eres un médico preparando la entrega de turno en una unidad hospitalaria chilena.
Crea un resumen conciso pero completo para el médico entrante.

INCLUIR:
- Pacientes críticos o inestables
- Cambios significativos en las últimas horas
- Procedimientos realizados o pendientes
- Alertas y precauciones especiales
- Tareas urgentes para el próximo turno

FORMATO:
- Resumen ejecutivo
- Pacientes por prioridad
- Tareas pendientes críticas
- Observaciones especiales
`,

  // Prompt para notas de evolución rápida
  QUICK_NOTE: `
Genera una nota de evolución breve y concisa para documentación rápida.
Mantén el formato profesional pero conciso.

INCLUIR:
- Estado general del paciente
- Cambios desde la última evaluación
- Intervenciones realizadas
- Plan inmediato

FORMATO: Nota breve, profesional, máximo 200 palabras.
`,

  // Prompt para interpretación de signos vitales
  VITAL_SIGNS_INTERPRETATION: `
Analiza los signos vitales proporcionados y proporciona una interpretación clínica.

CONSIDERAR:
- Valores normales para la edad del paciente
- Tendencias y cambios
- Correlación con el cuadro clínico
- Necesidad de intervención inmediata

FORMATO:
- Interpretación de cada signo vital
- Evaluación global
- Recomendaciones de manejo
`,

  // Prompt para planes de medicación
  MEDICATION_PLAN: `
Eres un médico revisando y optimizando el plan farmacológico de un paciente.
Considera interacciones, contraindicaciones y eficacia.

INCLUIR:
- Medicamentos actuales y su justificación
- Posibles interacciones
- Ajustes de dosis necesarios
- Monitorización requerida
- Medicamentos a suspender o agregar

FORMATO:
- Lista de medicamentos con dosis y frecuencia
- Justificación clínica
- Precauciones y monitorización
`,
}

// Configuración de parámetros para OpenAI
export const AI_CONFIG = {
  model: 'gpt-4-turbo-preview',
  temperature: 0.3,
  max_tokens: 2000,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
}

// Función para generar prompt contextualizado
export function generateContextualPrompt(
  basePrompt: string,
  patientContext: {
    name?: string
    age?: number
    gender?: string
    diagnosis?: string
    unit?: string
    daysHospitalized?: number
  }
): string {
  const context = `
CONTEXTO DEL PACIENTE:
- Nombre: ${patientContext.name || 'Paciente'}
- Edad: ${patientContext.age || 'No especificada'}
- Género: ${patientContext.gender || 'No especificado'}
- Diagnóstico principal: ${patientContext.diagnosis || 'No especificado'}
- Unidad: ${patientContext.unit || 'No especificada'}
- Días hospitalizado: ${patientContext.daysHospitalized || 'No especificado'}

${basePrompt}
`
  
  return context
}

// Validación de respuestas de IA
export function validateMedicalResponse(response: any): boolean {
  // Validaciones básicas para respuestas médicas
  if (!response || typeof response !== 'object') return false
  
  // Para evoluciones, verificar estructura SOAP
  if (response.subjective !== undefined) {
    return !!(response.subjective && response.objective && response.assessment && response.plan)
  }
  
  return true
}

// Funciones de utilidad para formateo médico
export const MEDICAL_FORMATTERS = {
  // Formatear signos vitales
  formatVitalSigns: (vitals: any) => {
    return `PA: ${vitals.bloodPressure || 'No registrada'} mmHg, FC: ${vitals.heartRate || 'No registrada'} lpm, FR: ${vitals.respiratoryRate || 'No registrada'} rpm, T°: ${vitals.temperature || 'No registrada'}°C, SatO2: ${vitals.oxygenSaturation || 'No registrada'}%`
  },
  
  // Formatear fecha médica
  formatMedicalDate: (date: Date) => {
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  },
  
  // Formatear edad
  calculateAge: (birthDate: Date) => {
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1
    }
    return age
  }
} 