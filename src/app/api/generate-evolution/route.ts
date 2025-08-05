import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key no configurada' },
        { status: 500 }
      )
    }

    const { patientData } = await request.json()

    // Construir el prompt médico especializado
    const medicalPrompt = `
Eres un médico especialista en medicina interna trabajando en Chile. Genera una evolución médica profesional en formato SOAP basada en los siguientes datos del paciente:

DATOS DEL PACIENTE:
- Nombre: ${patientData.name}
- Edad: ${patientData.age} años
- Sexo: ${patientData.gender}
- Diagnóstico: ${patientData.diagnosis}

SIGNOS VITALES:
- Presión Arterial: ${patientData.vitals.bp}
- Frecuencia Cardíaca: ${patientData.vitals.hr}
- Frecuencia Respiratoria: ${patientData.vitals.rr}
- Temperatura: ${patientData.vitals.temp}
- Saturación O2: ${patientData.vitals.sat}

DATOS SUBJETIVOS:
${patientData.subjective}

DATOS OBJETIVOS:
${patientData.objective}

LABORATORIOS E IMÁGENES:
${patientData.labs}

MEDICAMENTOS:
${patientData.medications}

NOTAS ADICIONALES:
${patientData.notes}

INSTRUCCIONES:
1. Genera una evolución médica completa en formato SOAP (Subjetivo, Objetivo, Análisis, Plan)
2. Usa terminología médica chilena apropiada
3. Incluye interpretación de signos vitales y laboratorios
4. Proporciona un plan de manejo específico
5. Mantén un tono profesional y clínico
6. Si faltan datos importantes, menciona la necesidad de evaluación adicional
7. Incluye recomendaciones de seguimiento

Formato requerido:
SUBJETIVO:
[Síntomas y quejas del paciente]

OBJETIVO:
[Hallazgos del examen físico y signos vitales]

ANÁLISIS:
[Interpretación clínica y diagnóstico diferencial]

PLAN:
[Plan de tratamiento y seguimiento]
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Eres un médico especialista experimentado que trabaja en Chile. Generas evoluciones médicas profesionales, precisas y completas usando terminología médica apropiada."
        },
        {
          role: "user",
          content: medicalPrompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.3,
    })

    const evolution = completion.choices[0]?.message?.content

    if (!evolution) {
      return NextResponse.json(
        { error: 'No se pudo generar la evolución' },
        { status: 500 }
      )
    }

    return NextResponse.json({ evolution })

  } catch (error) {
    console.error('Error generating evolution:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 