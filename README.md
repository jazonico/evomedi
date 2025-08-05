# 🩺 EvoMedi - Sistema Médico Hospitalario

## 📋 Descripción

EvoMedi es una aplicación web avanzada diseñada para médicos que trabajan en diferentes unidades clínicas hospitalarias (UCI, UTI, UCM, unidades coronarias, etc.). La aplicación permite digitalizar y optimizar el flujo de trabajo clínico diario de forma intuitiva, escalable y segura.

## 🎯 Características Principales

### 🏥 Gestión Multi-Unidad
- Soporte para múltiples unidades clínicas configurables
- Cada usuario puede trabajar en diferentes unidades
- Configuración personalizada de nombres y colores por unidad

### 🛏️ Gestión de Camas
- 12 camas virtuales por defecto, expandible hasta 30
- Camas renombrables y configurables
- Estados de cama (disponible, ocupada, mantenimiento, bloqueada)

### 👥 Gestión de Pacientes
- Datos demográficos completos
- Diagnósticos activos con códigos CIE-10
- Estados clínicos configurables
- Historial de evoluciones
- Sistema de tareas y seguimiento

### 🤖 IA Médica Integrada
- Generación automática de evoluciones médicas
- Análisis de laboratorios
- Planes por sistema médico
- Resúmenes para entrega de turno
- Adaptado al lenguaje clínico chileno

### 📝 Gestión Clínica
- Evoluciones médicas estructuradas (SOAP)
- Planes por sistema médico
- Tareas con prioridades y seguimiento
- Notas rápidas por cama con autoguardado
- Laboratorios e imágenes

### 🔄 Entrega de Turno
- Resúmenes automáticos por IA
- Historial de turnos
- Notas de entrega personalizables

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 14** con App Router
- **React Server Components**
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **shadcn/ui** y **Radix UI** para componentes
- **Lucide React** para iconografía

### Backend
- **Next.js API Routes** para endpoints
- **PostgreSQL** como base de datos principal
- **Prisma** como ORM
- **NextAuth.js** para autenticación

### IA y Servicios
- **OpenAI GPT-4 Turbo** para generación de contenido médico
- **Prompts médicos especializados** para contexto chileno

### Seguridad
- **Row Level Security** en base de datos
- **Roles de usuario** (Admin, Médico, Residente, Enfermero, Viewer)
- **Multi-tenancy** por hospital/unidad
- **Validación de entrada** con Zod

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticación
│   └── dashboard/         # Dashboard principal
├── components/            # Componentes UI globales
│   └── ui/               # shadcn/ui components
├── modules/              # Módulos de la aplicación
│   ├── auth/             # Autenticación y autorización
│   ├── units/            # Gestión de unidades
│   ├── beds/             # Gestión de camas
│   ├── patients/         # Gestión de pacientes
│   ├── evolutions/       # Evoluciones médicas
│   ├── ai/               # Integración con IA
│   ├── tasks/            # Sistema de tareas
│   ├── shifts/           # Entrega de turnos
│   └── admin/            # Panel de administración
├── lib/                  # Utilidades y configuraciones
├── types/                # Tipos TypeScript globales
├── hooks/                # Custom React hooks
├── utils/                # Funciones utilitarias
├── stores/               # Estado global (Zustand)
└── providers/            # Context providers
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- PostgreSQL 14+
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd evomedi
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copiar `.env.example` a `.env` y configurar:

```env
# Base de datos
DATABASE_URL="postgresql://usuario:password@localhost:5432/evomedi_db"

# NextAuth.js
NEXTAUTH_SECRET="tu-secreto-super-seguro"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI API
OPENAI_API_KEY="tu-api-key-de-openai"

# Configuración de la aplicación
APP_NAME="EvoMedi"
DEFAULT_HOSPITAL_NAME="Hospital General"
DEFAULT_UNIT_NAME="Unidad de Cuidados Intensivos"
```

### 4. Configurar base de datos
```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# (Opcional) Seed con datos de ejemplo
npx prisma db seed
```

### 5. Ejecutar en desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📊 Modelos de Base de Datos

### Entidades Principales

- **Hospital**: Multi-tenancy por institución
- **Unit**: Unidades clínicas (UCI, UTI, UCM, etc.)
- **User**: Usuarios con roles y acceso por unidad
- **Bed**: Camas con estado y configuración
- **Patient**: Pacientes con datos demográficos
- **Diagnosis**: Diagnósticos con códigos CIE-10
- **Evolution**: Evoluciones médicas estructuradas
- **SystemPlan**: Planes por sistema médico
- **Task**: Tareas con prioridades y seguimiento
- **Laboratory**: Resultados de laboratorio
- **Shift**: Turnos y entregas
- **QuickNote**: Notas rápidas por cama

## 🔐 Roles y Permisos

### Roles de Usuario
- **ADMIN**: Administración completa del sistema
- **MEDICO**: Acceso completo a unidades asignadas
- **RESIDENTE**: Acceso limitado con supervisión
- **ENFERMERO**: Acceso a tareas y seguimiento
- **VIEWER**: Solo lectura

### Permisos por Módulo
- **Pacientes**: Crear, editar, ver según rol
- **Evoluciones**: Crear/editar propias, ver todas
- **Tareas**: Asignar, completar, gestionar
- **IA**: Generar contenido (según configuración)
- **Administración**: Solo ADMIN

## 🤖 Integración con IA

### Funcionalidades de IA
1. **Generación de Evoluciones**: A partir de datos clínicos
2. **Análisis de Laboratorios**: Interpretación automática
3. **Planes por Sistema**: Sugerencias terapéuticas
4. **Resúmenes de Turno**: Síntesis automática

### Prompts Especializados
- Adaptados al lenguaje médico chileno
- Contexto hospitalario específico
- Terminología clínica apropiada
- Formatos estándar de evolución

## 📱 Características de UI/UX

### Diseño Responsivo
- Optimizado para desktop y tablet
- Interfaz intuitiva para personal médico
- Acceso rápido a funciones críticas

### Tema Médico
- Colores apropiados para entorno hospitalario
- Iconografía médica clara
- Estados visuales para urgencias

### Accesibilidad
- Cumple estándares WCAG 2.1
- Navegación por teclado
- Contraste apropiado

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint

# Base de datos
npm run db:migrate   # Ejecutar migraciones
npm run db:seed      # Poblar con datos de ejemplo
npm run db:studio    # Abrir Prisma Studio
npm run db:reset     # Resetear base de datos

# Testing
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Coverage de tests
```

## 🌐 API Endpoints

### Pacientes
- `GET /api/patients` - Listar pacientes
- `POST /api/patients` - Crear paciente
- `GET /api/patients/[id]` - Obtener paciente
- `PUT /api/patients/[id]` - Actualizar paciente
- `DELETE /api/patients/[id]` - Eliminar paciente

### Evoluciones
- `GET /api/evolutions` - Listar evoluciones
- `POST /api/evolutions` - Crear evolución
- `POST /api/evolutions/generate` - Generar con IA

### Tareas
- `GET /api/tasks` - Listar tareas
- `POST /api/tasks` - Crear tarea
- `PUT /api/tasks/[id]` - Actualizar tarea

### IA
- `POST /api/ai/evolution` - Generar evolución
- `POST /api/ai/analyze-labs` - Analizar laboratorios
- `POST /api/ai/shift-summary` - Resumen de turno

## 🚀 Despliegue

### Variables de Producción
```env
NODE_ENV=production
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="secreto-produccion"
OPENAI_API_KEY="..."
```

### Plataformas Recomendadas
- **Vercel**: Despliegue automático desde Git
- **Railway**: Base de datos PostgreSQL
- **PlanetScale**: Base de datos escalable
- **Supabase**: Backend completo

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte técnico o consultas:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo
- Revisar la documentación en `/docs`

## 🗺️ Roadmap

### Versión 1.0 (Actual)
- ✅ Gestión básica de pacientes
- ✅ Sistema de camas y unidades
- ✅ Evoluciones médicas
- ✅ Integración con IA
- ✅ Sistema de tareas

### Versión 1.1 (Próxima)
- 📋 Integración con laboratorios
- 📋 Reportes y analytics
- 📋 Notificaciones push
- 📋 App móvil (PWA)

### Versión 2.0 (Futuro)
- 📋 Integración con HIS/RIS
- 📋 Telemedicina
- 📋 BI y dashboards avanzados
- 📋 API pública

---

**EvoMedi** - Evoluciona la medicina, simplifica el cuidado. 🩺✨ 