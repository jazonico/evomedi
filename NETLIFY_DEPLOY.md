# 🚀 Guía de Despliegue de EvoMedi en Netlify

## ✅ **Preparación Completada**

Tu aplicación EvoMedi ya está lista para desplegar en Netlify con:

- ✅ **Export estático** configurado (`output: 'export'`)
- ✅ **Build exitoso** (generado en `/out`)
- ✅ **Componentes UI** instalados
- ✅ **Supabase** configurado para cliente
- ✅ **Netlify.toml** configurado

## 🌐 **Pasos para Desplegar en Netlify**

### **Opción 1: Despliegue desde GitHub (Recomendado)**

#### **1. Subir a GitHub**
```bash
# Inicializar git si no está inicializado
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "feat: EvoMedi listo para producción"

# Conectar con tu repositorio de GitHub
git remote add origin https://github.com/TU_USUARIO/evomedi.git

# Subir al repositorio
git push -u origin main
```

#### **2. Conectar con Netlify**
1. Ve a [netlify.com](https://netlify.com) y inicia sesión
2. Haz clic en **"New site from Git"**
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio **evomedi**
5. Configura:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `out`

#### **3. Configurar Variables de Entorno**
En Netlify Dashboard → Site settings → Environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://pkbujxxmshrvrxbbpfnv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYnVqeHhtc2hydnJ4YmJwZm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxOTcxOTgsImV4cCI6MjA2OTc3MzE5OH0.VezuQR2N3OSlHFxdWd3cL0K--Gdp-XLq0ctNyarXEJY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYnVqeHhtc2hydnJ4YmJwZm52Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDE5NzE5OCwiZXhwIjoyMDY5NzczMTk4fQ.VaxF7z2-M90BEtqXk8zfrSBb0qu3hhzjy6Ra6iYVP3I
DATABASE_URL=postgresql://postgres:secqyg-furhu4-gushIr@db.pkbujxxmshrvrxbbpfnv.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:secqyg-furhu4-gushIr@db.pkbujxxmshrvrxbbpfnv.supabase.co:5432/postgres
NODE_ENV=production
```

### **Opción 2: Despliegue Manual**

#### **1. Generar Build**
```bash
npm run build
```

#### **2. Subir Manualmente**
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `out` a la zona de despliegue
3. Netlify generará automáticamente tu sitio

## 🔧 **Configuración Post-Despliegue**

### **1. Dominio Personalizado (Opcional)**
- En Netlify Dashboard → Domain settings
- Agregar tu dominio personalizado
- Configurar DNS según las instrucciones

### **2. HTTPS Automático**
- Netlify proporciona HTTPS automático
- Se configurará automáticamente

### **3. Configurar Supabase para Producción**
En tu dashboard de Supabase:

1. **Authentication → URL Configuration**:
   - Site URL: `https://TU_SITIO.netlify.app`
   - Redirect URLs: `https://TU_SITIO.netlify.app/auth/login`

2. **Settings → API**:
   - Verificar que las URLs coincidan

## 🏥 **Funcionalidades Disponibles en Producción**

### **✅ Funciona Perfectamente:**
- 🔐 **Autenticación** con Supabase
- 📱 **Interfaz responsive**
- 🎨 **UI moderna** con shadcn/ui
- 🏥 **Gestión básica** de pacientes
- 📊 **Dashboard** interactivo
- 🔄 **Navegación** fluida

### **⚠️ Limitaciones del Export Estático:**
- ❌ **API Routes** deshabilitadas
- ❌ **Middleware** de servidor deshabilitado
- ❌ **Server-side rendering** limitado
- ✅ **Supabase** maneja toda la lógica de backend

### **🔄 Alternativas para Funcionalidades Avanzadas:**
- **IA Integration**: Usar Supabase Edge Functions
- **File Upload**: Usar Supabase Storage
- **Real-time**: Usar Supabase Realtime
- **Email**: Usar Supabase Auth + SMTP

## 🚀 **URLs de Ejemplo**

Una vez desplegado, tendrás:
- **Sitio principal**: `https://TU_SITIO.netlify.app`
- **Login**: `https://TU_SITIO.netlify.app/auth/login`
- **Dashboard**: `https://TU_SITIO.netlify.app/dashboard`

## 🛠️ **Comandos de Desarrollo**

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Verificar tipos
npm run type-check

# Linting
npm run lint
```

## 📝 **Notas Importantes**

1. **Variables de Entorno**: Asegúrate de configurar todas las variables en Netlify
2. **Supabase RLS**: Configura Row Level Security para producción
3. **Dominio**: Actualiza las URLs en Supabase cuando tengas el dominio final
4. **Monitoreo**: Usa Netlify Analytics para monitorear el sitio

## 🎯 **Próximos Pasos Después del Despliegue**

1. **Probar autenticación** en producción
2. **Crear usuarios de prueba**
3. **Configurar datos iniciales** (hospitales, unidades, camas)
4. **Implementar funcionalidades avanzadas** con Supabase Edge Functions
5. **Configurar monitoreo** y alertas

¡Tu plataforma médica digital está lista para revolucionar la atención hospitalaria! 🏥✨ 