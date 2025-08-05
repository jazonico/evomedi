# 🏥 EvoMedi - Sistema Médico Hospitalario

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://prisma.io/)

**Sistema médico hospitalario avanzado para digitalizar y optimizar los flujos de trabajo clínicos diarios.**

## ✨ **Características Principales**

### 🏥 **Gestión Hospitalaria Completa**
- **Multi-hospital**: Soporte para múltiples hospitales y unidades
- **Gestión de camas**: Control en tiempo real del estado de camas
- **Pacientes**: Registro completo con datos demográficos y clínicos
- **Diagnósticos**: Sistema CIE-10 integrado

### 👨‍⚕️ **Herramientas Médicas**
- **Evoluciones SOAP**: Formato estándar (Subjetivo, Objetivo, Evaluación, Plan)
- **Planes por sistemas**: Organización por sistemas médicos
- **Tareas clínicas**: Gestión de pendientes con prioridades
- **Laboratorios**: Integración de resultados de laboratorio

### 🤖 **Inteligencia Artificial**
- **Evoluciones automáticas**: Generación con IA usando lenguaje clínico chileno
- **Análisis de datos**: Insights automáticos de pacientes
- **Sugerencias clínicas**: Recomendaciones basadas en datos

### 📊 **Dashboard y Reportes**
- **Vista de unidad**: Estado general de la unidad
- **Métricas en tiempo real**: Ocupación, tareas pendientes, evoluciones
- **Resúmenes de turno**: Informes automáticos para cambios de turno

## 🚀 **Demo en Vivo**

🌐 **[Ver Demo](https://evomedi.netlify.app)** *(Próximamente)*

## 🛠️ **Tecnologías**

### **Frontend**
- **Next.js 15** - React Framework con App Router
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **shadcn/ui** - Componentes de UI modernos
- **Radix UI** - Primitivos de UI accesibles

### **Backend**
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Base de datos relacional
- **Prisma** - ORM moderno para TypeScript
- **Row Level Security** - Seguridad a nivel de fila

### **Herramientas**
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Jest** - Testing framework

## 📋 **Requisitos**

- Node.js 18+ 
- npm 8+
- Cuenta de Supabase
- Cuenta de OpenAI (opcional, para IA)

## 🚀 **Instalación y Configuración**

### **1. Clonar el repositorio**
```bash
git clone https://github.com/TU_USUARIO/evomedi.git
cd evomedi
```

### **2. Instalar dependencias**
```bash
npm install
```

### **3. Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# Base de datos
DATABASE_URL=tu_database_url
DIRECT_URL=tu_direct_url

# OpenAI (opcional)
OPENAI_API_KEY=tu_openai_key
```

### **4. Configurar la base de datos**
```bash
# Generar cliente Prisma
npm run db:generate

# Ejecutar el SQL en Supabase (ver supabase_schema.sql)
# Luego sincronizar con Prisma
npx prisma db pull
```

### **5. Ejecutar en desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📚 **Documentación**

- 📖 [Configuración de Supabase](./SUPABASE_SETUP.md)
- 🚀 [Guía de Despliegue en Netlify](./NETLIFY_DEPLOY.md)
- 📝 [Resumen del Backend](./BACKEND_SUPABASE_RESUMEN.md)

## 🏗️ **Arquitectura**

```
src/
├── app/                 # App Router de Next.js
│   ├── auth/           # Autenticación
│   ├── dashboard/      # Dashboard principal
│   └── layout.tsx      # Layout global
├── components/         # Componentes reutilizables
│   └── ui/            # Componentes de UI (shadcn)
├── lib/               # Utilidades y configuración
│   ├── prisma.ts      # Cliente Prisma
│   └── supabase.ts    # Cliente Supabase
├── modules/           # Módulos de funcionalidad
│   ├── ai/           # Inteligencia artificial
│   └── patients/     # Gestión de pacientes
└── types/            # Definiciones de tipos TypeScript
```

## 🧪 **Scripts Disponibles**

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build           # Build de producción
npm run start           # Servidor de producción

# Base de datos
npm run db:generate     # Generar cliente Prisma
npm run db:migrate      # Ejecutar migraciones
npm run db:studio       # Abrir Prisma Studio

# Calidad de código
npm run lint            # Ejecutar ESLint
npm run format          # Formatear con Prettier
npm run type-check      # Verificar tipos TypeScript

# Testing
npm run test            # Ejecutar tests
npm run test:watch      # Tests en modo watch
```

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 **Equipo**

- **EvoMedi Team** - Desarrollo inicial

## 🙏 **Agradecimientos**

- [Next.js](https://nextjs.org/) por el increíble framework
- [Supabase](https://supabase.com/) por el backend-as-a-service
- [shadcn/ui](https://ui.shadcn.com/) por los componentes de UI
- [Tailwind CSS](https://tailwindcss.com/) por el framework de CSS

---

**¿Encontraste un bug o tienes una sugerencia?** [Abre un issue](https://github.com/TU_USUARIO/evomedi/issues)

**¿Te gusta el proyecto?** ⭐ ¡Dale una estrella en GitHub! 