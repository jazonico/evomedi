import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de base de datos...')

  // Crear hospital principal
  const hospital = await prisma.hospital.upsert({
    where: { code: 'HG001' },
    update: {},
    create: {
      name: 'Hospital General EvoMedi',
      code: 'HG001',
      address: 'Av. Providencia 1234, Santiago',
      phone: '+56-2-1234-5678',
      email: 'contacto@hospitalgeneralevomedi.cl',
    },
  })

  console.log('🏥 Hospital creado:', hospital.name)

  // Crear unidades clínicas
  const uci = await prisma.unit.upsert({
    where: { hospitalId_code: { hospitalId: hospital.id, code: 'UCI' } },
    update: {},
    create: {
      name: 'Unidad de Cuidados Intensivos',
      code: 'UCI',
      color: '#DC2626',
      description: 'Unidad de cuidados críticos para pacientes en estado grave',
      maxBeds: 15,
      hospitalId: hospital.id,
    },
  })

  const ucm = await prisma.unit.upsert({
    where: { hospitalId_code: { hospitalId: hospital.id, code: 'UCM' } },
    update: {},
    create: {
      name: 'Unidad de Cuidados Medios',
      code: 'UCM',
      color: '#EA580C',
      description: 'Unidad de cuidados intermedios',
      maxBeds: 20,
      hospitalId: hospital.id,
    },
  })

  const uti = await prisma.unit.upsert({
    where: { hospitalId_code: { hospitalId: hospital.id, code: 'UTI' } },
    update: {},
    create: {
      name: 'Unidad de Tratamiento Intensivo',
      code: 'UTI',
      color: '#7C2D12',
      description: 'Unidad de tratamiento intensivo especializada',
      maxBeds: 12,
      hospitalId: hospital.id,
    },
  })

  console.log('🏨 Unidades creadas: UCI, UCM, UTI')

  // Crear camas para UCI
  const uciBedsData = Array.from({ length: 12 }, (_, i) => ({
    number: (i + 1).toString(),
    name: `Cama ${i + 1}`,
    position: i + 1,
    unitId: uci.id,
  }))

  for (const bedData of uciBedsData) {
    await prisma.bed.upsert({
      where: { unitId_number: { unitId: bedData.unitId, number: bedData.number } },
      update: {},
      create: bedData,
    })
  }

  // Crear camas para UCM
  const ucmBedsData = Array.from({ length: 15 }, (_, i) => ({
    number: (i + 1).toString(),
    name: `Cama ${i + 1}`,
    position: i + 1,
    unitId: ucm.id,
  }))

  for (const bedData of ucmBedsData) {
    await prisma.bed.upsert({
      where: { unitId_number: { unitId: bedData.unitId, number: bedData.number } },
      update: {},
      create: bedData,
    })
  }

  console.log('🛏️ Camas creadas para todas las unidades')

  // Crear usuarios
  const hashedPassword = await bcrypt.hash('password123', 12)

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@evomedi.cl' },
    update: {},
    create: {
      email: 'admin@evomedi.cl',
      name: 'Administrador',
      password: hashedPassword,
      role: 'ADMIN',
      hospitalId: hospital.id,
    },
  })

  const doctorUser = await prisma.user.upsert({
    where: { email: 'doctor@evomedi.cl' },
    update: {},
    create: {
      email: 'doctor@evomedi.cl',
      name: 'Dr. Carlos Mendoza',
      password: hashedPassword,
      role: 'MEDICO',
      hospitalId: hospital.id,
    },
  })

  const residentUser = await prisma.user.upsert({
    where: { email: 'residente@evomedi.cl' },
    update: {},
    create: {
      email: 'residente@evomedi.cl',
      name: 'Dra. Ana Martínez',
      password: hashedPassword,
      role: 'RESIDENTE',
      hospitalId: hospital.id,
    },
  })

  console.log('👥 Usuarios creados: Admin, Doctor, Residente')

  // Asignar acceso a unidades
  const userUnitAccess = [
    { userId: doctorUser.id, unitId: uci.id },
    { userId: doctorUser.id, unitId: ucm.id },
    { userId: residentUser.id, unitId: uci.id },
  ]

  for (const access of userUnitAccess) {
    await prisma.userUnitAccess.upsert({
      where: { userId_unitId: access },
      update: {},
      create: access,
    })
  }

  // Obtener algunas camas para crear pacientes
  const beds = await prisma.bed.findMany({
    where: { unitId: uci.id },
    take: 5,
  })

  // Crear pacientes de ejemplo
  const patientsData = [
    {
      name: 'Juan Carlos',
      lastName: 'Pérez González',
      rut: '12345678-9',
      birthDate: new Date('1980-05-15'),
      gender: 'MASCULINO' as const,
      phone: '+56-9-8765-4321',
      address: 'Las Condes 1234, Santiago',
      emergency: 'María Pérez - Esposa - +56-9-1234-5678',
      status: 'UCI' as const,
      bedId: beds[0]?.id,
    },
    {
      name: 'María Elena',
      lastName: 'González Rodríguez',
      rut: '98765432-1',
      birthDate: new Date('1975-08-22'),
      gender: 'FEMENINO' as const,
      phone: '+56-9-2345-6789',
      address: 'Providencia 5678, Santiago',
      emergency: 'Carlos González - Hermano - +56-9-9876-5432',
      status: 'UCI' as const,
      bedId: beds[1]?.id,
    },
    {
      name: 'Roberto',
      lastName: 'Silva Morales',
      rut: '15975348-6',
      birthDate: new Date('1965-12-10'),
      gender: 'MASCULINO' as const,
      phone: '+56-9-3456-7890',
      address: 'Ñuñoa 9876, Santiago',
      emergency: 'Ana Silva - Hija - +56-9-5432-1098',
      status: 'UCI' as const,
      bedId: beds[2]?.id,
    },
  ]

  for (const patientData of patientsData) {
    if (patientData.bedId) {
      const patient = await prisma.patient.create({
        data: patientData,
      })

      // Actualizar estado de la cama
      await prisma.bed.update({
        where: { id: patientData.bedId },
        data: { status: 'OCCUPIED' },
      })

      console.log(`👤 Paciente creado: ${patient.name} ${patient.lastName}`)
    }
  }

  // Crear diagnósticos para los pacientes
  const patients = await prisma.patient.findMany()

  const diagnosesData = [
    {
      patientId: patients[0]?.id,
      code: 'J44.1',
      description: 'Enfermedad pulmonar obstructiva crónica con exacerbación aguda',
      isPrimary: true,
    },
    {
      patientId: patients[0]?.id,
      code: 'I50.9',
      description: 'Insuficiencia cardíaca no especificada',
      isPrimary: false,
    },
    {
      patientId: patients[1]?.id,
      code: 'J18.9',
      description: 'Neumonía no especificada',
      isPrimary: true,
    },
    {
      patientId: patients[2]?.id,
      code: 'I21.9',
      description: 'Infarto agudo del miocardio no especificado',
      isPrimary: true,
    },
  ]

  for (const diagnosisData of diagnosesData) {
    if (diagnosisData.patientId) {
      await prisma.diagnosis.create({
        data: diagnosisData,
      })
    }
  }

  console.log('🏥 Diagnósticos creados')

  // Crear tareas de ejemplo
  const tasksData = [
    {
      title: 'Control de signos vitales cada 2 horas',
      description: 'Monitorear presión arterial, frecuencia cardíaca, temperatura y saturación',
      priority: 'ALTA' as const,
      status: 'PENDIENTE' as const,
      patientId: patients[0]?.id,
      createdById: doctorUser.id,
      assignedToId: residentUser.id,
    },
    {
      title: 'Administrar broncodilatador',
      description: 'Salbutamol 2.5mg nebulizado cada 6 horas',
      priority: 'URGENTE' as const,
      status: 'PENDIENTE' as const,
      patientId: patients[0]?.id,
      createdById: doctorUser.id,
    },
    {
      title: 'Radiografía de tórax control',
      description: 'Evaluar evolución de infiltrado pulmonar',
      priority: 'NORMAL' as const,
      status: 'PENDIENTE' as const,
      patientId: patients[1]?.id,
      createdById: doctorUser.id,
    },
    {
      title: 'Electrocardiograma seriado',
      description: 'ECG cada 8 horas por 24 horas',
      priority: 'ALTA' as const,
      status: 'EN_PROGRESO' as const,
      patientId: patients[2]?.id,
      createdById: doctorUser.id,
      assignedToId: residentUser.id,
    },
  ]

  for (const taskData of tasksData) {
    if (taskData.patientId) {
      await prisma.task.create({
        data: taskData,
      })
    }
  }

  console.log('📋 Tareas creadas')

  // Crear evoluciones de ejemplo
  const evolutionsData = [
    {
      subjective: 'Paciente refiere disnea de moderados esfuerzos, sin dolor torácico. Tos productiva con expectoración amarillenta.',
      objective: 'PA: 140/90 mmHg, FC: 95 lpm, FR: 22 rpm, SatO2: 92% con O2 2L/min. Murmullo pulmonar disminuido en bases bilaterales, roncus y sibilancias difusas.',
      assessment: 'EPOC reagudizado en contexto de probable sobreinfección bronquial. Estable hemodinámicamente.',
      plan: 'Continuar broncodilatadores, iniciar antibioticoterapia empírica, kinesioterapia respiratoria.',
      patientId: patients[0]?.id,
      createdById: doctorUser.id,
    },
    {
      subjective: 'Paciente febril, refiere malestar general y disnea de reposo que ha empeorado en las últimas 12 horas.',
      objective: 'PA: 110/70 mmHg, FC: 110 lpm, FR: 28 rpm, T°: 38.5°C, SatO2: 88% con O2 4L/min. Crepitaciones en lóbulo inferior derecho.',
      assessment: 'Neumonía adquirida en la comunidad con criterios de gravedad. Requiere monitorización estrecha.',
      plan: 'Antibioticoterapia según protocolo, soporte ventilatorio, control de signos vitales cada 2 horas.',
      patientId: patients[1]?.id,
      createdById: residentUser.id,
    },
  ]

  for (const evolutionData of evolutionsData) {
    if (evolutionData.patientId) {
      await prisma.evolution.create({
        data: evolutionData,
      })
    }
  }

  console.log('📝 Evoluciones creadas')

  console.log('✅ Seed completado exitosamente!')
  console.log('\n📧 Credenciales de acceso:')
  console.log('Admin: admin@evomedi.cl / password123')
  console.log('Doctor: doctor@evomedi.cl / password123')
  console.log('Residente: residente@evomedi.cl / password123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error en seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  }) 