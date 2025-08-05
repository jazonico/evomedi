// Tipos base para la aplicación (definidos manualmente para export estático)

export type UserRole = 'ADMIN' | 'MEDICO' | 'RESIDENTE' | 'ENFERMERO' | 'VIEWER'
export type BedStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'BLOCKED'
export type Gender = 'MASCULINO' | 'FEMENINO' | 'OTRO'
export type PatientStatus = 'HOSPITALIZADO' | 'UCI' | 'UCM' | 'HOSDOM' | 'ALTA' | 'FALLECIDO'
export type MedicalSystem = 'CARDIOVASCULAR' | 'RESPIRATORIO' | 'NEUROLOGICO' | 'DIGESTIVO' | 'GENITOURINARIO' | 'HEMATOLOGICO' | 'ENDOCRINO' | 'INFECCIOSO' | 'PSIQUIATRICO' | 'DERMATOLOGICO' | 'OFTALMOLOGICO' | 'OTORRINOLARINGOLOGICO' | 'TRAUMATOLOGICO' | 'GENERAL'
export type PlanPriority = 'ALTA' | 'NORMAL' | 'BAJA'
export type TaskPriority = 'URGENTE' | 'ALTA' | 'NORMAL' | 'BAJA'
export type TaskStatus = 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA' | 'CANCELADA'
export type LabType = 'HEMOGRAMA' | 'QUIMICA_SANGUINEA' | 'GASES_ARTERIALES' | 'ELECTROLITOS' | 'COAGULACION' | 'ORINA' | 'CULTIVOS' | 'IMAGENES' | 'OTROS'

// Interfaces base
export interface User {
  id: string
  email: string
  name: string
  password?: string
  authId?: string
  role: UserRole
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  hospitalId: string
}

export interface Hospital {
  id: string
  name: string
  code: string
  address?: string
  phone?: string
  email?: string
  createdAt: Date
  updatedAt: Date
}

export interface Unit {
  id: string
  name: string
  code: string
  color: string
  description?: string
  isActive: boolean
  maxBeds: number
  createdAt: Date
  updatedAt: Date
  hospitalId: string
}

export interface Bed {
  id: string
  number: string
  name?: string
  position: number
  isActive: boolean
  status: BedStatus
  createdAt: Date
  updatedAt: Date
  unitId: string
}

export interface Patient {
  id: string
  rut?: string
  name: string
  lastName: string
  birthDate?: Date
  gender?: Gender
  phone?: string
  address?: string
  emergency?: string
  admissionDate: Date
  dischargeDate?: Date
  status: PatientStatus
  createdAt: Date
  updatedAt: Date
  bedId: string
}

export interface Diagnosis {
  id: string
  code?: string
  description: string
  isPrimary: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  patientId: string
}

export interface Evolution {
  id: string
  date: Date
  subjective?: string
  objective?: string
  assessment?: string
  plan?: string
  fullText?: string
  isGenerated: boolean
  createdAt: Date
  updatedAt: Date
  patientId: string
  createdById: string
}

export interface SystemPlan {
  id: string
  system: MedicalSystem
  description: string
  priority: PlanPriority
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
  evolutionId: string
}

export interface Task {
  id: string
  title: string
  description?: string
  priority: TaskPriority
  status: TaskStatus
  dueDate?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
  patientId: string
  createdById: string
  assignedToId?: string
}

export interface Laboratory {
  id: string
  type: LabType
  date: Date
  results: any
  notes?: string
  isUrgent: boolean
  createdAt: Date
  updatedAt: Date
  patientId: string
}

export interface Shift {
  id: string
  date: Date
  startTime: Date
  endTime: Date
  summary?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  unitId: string
  doctorId: string
}

export interface QuickNote {
  id: string
  content: string
  bedId: string
  createdAt: Date
  updatedAt: Date
}

// Tipos extendidos para la aplicación
export interface PatientWithRelations extends Patient {
  bed: Bed & {
    unit: Unit
  }
  diagnoses: Diagnosis[]
  evolutions: Evolution[]
  tasks: Task[]
  labs: Laboratory[]
}

export interface BedWithPatient extends Bed {
  unit: Unit
  patients: PatientWithRelations[]
}

export interface UnitWithBeds extends Unit {
  hospital: Hospital
  beds: BedWithPatient[]
}

export interface UserWithAccess extends User {
  hospital: Hospital
  unitAccess: {
    unit: Unit
  }[]
}

export interface EvolutionWithPlans extends Evolution {
  patient: Patient
  createdBy: User
  systemPlans: SystemPlan[]
}

// Tipos para formularios
export interface CreatePatientForm {
  rut?: string
  name: string
  lastName: string
  birthDate?: Date
  gender?: Gender
  phone?: string
  address?: string
  emergency?: string
  bedId: string
  status: PatientStatus
  diagnoses: {
    code?: string
    description: string
    isPrimary: boolean
  }[]
}

export interface CreateEvolutionForm {
  patientId: string
  subjective?: string
  objective?: string
  assessment?: string
  plan?: string
  systemPlans: {
    system: MedicalSystem
    description: string
    priority: PlanPriority
  }[]
}

export interface CreateTaskForm {
  patientId: string
  title: string
  description?: string
  priority: TaskPriority
  dueDate?: Date
  assignedToId?: string
}

// Tipos para IA
export interface AIEvolutionRequest {
  patientId: string
  subjective?: string
  objective?: string
  labResults?: any
  previousEvolutions?: Evolution[]
}

export interface AIEvolutionResponse {
  subjective: string
  objective: string
  assessment: string
  plan: string
  systemPlans: {
    system: MedicalSystem
    description: string
    priority: PlanPriority
  }[]
}

// Tipos para la UI
export interface BedOccupancy {
  total: number
  occupied: number
  available: number
  maintenance: number
  blocked: number
}

export interface UnitStats {
  totalBeds: number
  occupancy: BedOccupancy
  totalPatients: number
  pendingTasks: number
  urgentTasks: number
  evolutionsToday: number
}

// Tipos de navegación
export interface NavigationItem {
  label: string
  href: string
  icon: React.ComponentType<any>
  badge?: number
  disabled?: boolean
}

// Tipos de configuración
export interface AppConfig {
  hospital: Hospital
  currentUnit: Unit
  user: UserWithAccess
  features: {
    aiEnabled: boolean
    multiUnit: boolean
    labIntegration: boolean
  }
}

// Estados de carga
export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

export interface AsyncState<T> extends LoadingState {
  data?: T | null
}

// Tipos para notificaciones
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Tipos para filtros y búsqueda
export interface PatientFilters {
  status?: PatientStatus[]
  bedNumber?: string
  name?: string
  rut?: string
  hasEvolutionToday?: boolean
  hasPendingTasks?: boolean
}

export interface TaskFilters {
  status?: TaskStatus[]
  priority?: TaskPriority[]
  assignedToId?: string
  dueDate?: {
    from?: Date
    to?: Date
  }
}

// Tipos para el dashboard
export interface DashboardStats {
  unit: UnitStats
  myTasks: {
    pending: number
    completed: number
    overdue: number
  }
  myPatients: {
    total: number
    needsEvolution: number
    critical: number
  }
  recentActivity: {
    evolutions: number
    tasksCompleted: number
    newAdmissions: number
  }
}

// Tipos para websockets/realtime
export interface RealTimeEvent {
  type: 'patient_update' | 'task_update' | 'evolution_created' | 'bed_status_change'
  data: any
  unitId: string
  timestamp: Date
}

// Tipos para exportación de datos
export interface ExportRequest {
  type: 'patients' | 'evolutions' | 'tasks' | 'shift_summary'
  unitId: string
  dateRange?: {
    from: Date
    to: Date
  }
  format: 'pdf' | 'excel' | 'csv'
  filters?: any
} 