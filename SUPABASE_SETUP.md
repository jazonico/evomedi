# 🚀 Configuración de Supabase para EvoMedi

## 📋 Guía Paso a Paso

### 1. Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "New Project"
4. Completa los datos:
   - **Name**: `evomedi-hospital`
   - **Database Password**: Genera una contraseña segura (guárdala)
   - **Region**: Selecciona la más cercana (ej: South America)
5. Haz clic en "Create new project"

### 2. Configurar Variables de Entorno

Una vez creado el proyecto, ve a **Settings > API** y copia:

```env
# Reemplaza en tu archivo .env
NEXT_PUBLIC_SUPABASE_URL="https://tu-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-anon-key-aqui"
SUPABASE_SERVICE_ROLE_KEY="tu-service-role-key-aqui"

# Base de datos - Ve a Settings > Database
DATABASE_URL="postgresql://postgres:[tu-password]@db.tu-project-id.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[tu-password]@db.tu-project-id.supabase.co:5432/postgres"
```

### 3. Configurar Autenticación

En el panel de Supabase:

1. Ve a **Authentication > Settings**
2. Configura **Site URL**: `http://localhost:3000`
3. Agrega **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/dashboard`
4. Habilita **Email confirmations** si deseas
5. Configura **SMTP** (opcional para emails)

### 4. Ejecutar Migraciones de Prisma

```bash
# Generar cliente de Prisma
npm run db:generate

# Crear y aplicar migraciones
npm run db:migrate

# Poblar base de datos con datos de ejemplo
npm run db:seed
```

### 5. Configurar Row Level Security (RLS)

En **SQL Editor** de Supabase, ejecuta:

```sql
-- Habilitar RLS para todas las tablas médicas
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE evolutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE laboratories ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;

-- Política para usuarios autenticados
CREATE POLICY "Usuarios pueden ver su hospital" ON hospitals
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.hospital_id = hospitals.id 
    AND users.auth_id = auth.uid()
  )
);

CREATE POLICY "Usuarios pueden ver sus unidades" ON units
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.hospital_id = units.hospital_id 
    AND users.auth_id = auth.uid()
  )
);

-- Política para pacientes (solo usuarios del mismo hospital)
CREATE POLICY "Ver pacientes del hospital" ON patients
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users u
    JOIN beds b ON b.unit_id IN (
      SELECT unit_id FROM user_unit_access WHERE user_id = u.id
    )
    WHERE u.auth_id = auth.uid()
    AND patients.bed_id = b.id
  )
);
```

### 6. Crear Función para Sincronizar Usuarios

```sql
-- Función para crear usuario en nuestra tabla cuando se registra en Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (auth_id, email, name, role, hospital_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'MEDICO',
    (SELECT id FROM hospitals LIMIT 1) -- Asignar al primer hospital por defecto
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 7. Configurar Storage (Opcional)

Para subir archivos médicos:

1. Ve a **Storage**
2. Crea un bucket llamado `medical-files`
3. Configura políticas de acceso:

```sql
-- Política para archivos médicos
CREATE POLICY "Usuarios pueden subir archivos" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'medical-files' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Usuarios pueden ver archivos de su hospital" ON storage.objects
FOR SELECT USING (
  bucket_id = 'medical-files' AND
  auth.role() = 'authenticated'
);
```

### 8. Configurar Webhooks (Opcional)

Para notificaciones en tiempo real:

1. Ve a **Database > Webhooks**
2. Crea webhook para tabla `patients`:
   - **Events**: INSERT, UPDATE
   - **URL**: `https://tu-app.com/api/webhooks/patients`

### 9. Configurar Edge Functions (Opcional)

Para IA médica con mayor seguridad:

```bash
# Instalar Supabase CLI
npm install -g supabase

# Inicializar funciones
supabase functions new medical-ai

# Desplegar función
supabase functions deploy medical-ai
```

## 🔧 Scripts de Desarrollo

Agrega estos scripts a tu `package.json`:

```json
{
  "scripts": {
    "supabase:start": "supabase start",
    "supabase:stop": "supabase stop",
    "supabase:status": "supabase status",
    "supabase:reset": "supabase db reset",
    "supabase:migration": "supabase db diff -f",
    "supabase:types": "supabase gen types typescript --local > src/types/supabase.ts"
  }
}
```

## 🧪 Testing de la Configuración

### Verificar Conexión

```bash
# Ejecutar en desarrollo
npm run dev

# Verificar en consola del navegador
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Test de Autenticación

1. Ve a `http://localhost:3000`
2. Haz clic en "Registrarse"
3. Usa un email válido
4. Verifica que se cree el usuario en **Authentication > Users**
5. Verifica que se cree en la tabla `users`

### Test de Base de Datos

```sql
-- En SQL Editor de Supabase
SELECT 
  h.name as hospital,
  u.name as unidad,
  COUNT(b.id) as total_camas,
  COUNT(p.id) as pacientes_activos
FROM hospitals h
LEFT JOIN units u ON u.hospital_id = h.id
LEFT JOIN beds b ON b.unit_id = u.id
LEFT JOIN patients p ON p.bed_id = b.id
GROUP BY h.id, u.id;
```

## 🔒 Seguridad

### Variables de Entorno en Producción

```env
# Producción
NEXT_PUBLIC_SUPABASE_URL="https://tu-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-anon-key-prod"
SUPABASE_SERVICE_ROLE_KEY="tu-service-role-key-prod"
DATABASE_URL="postgresql://postgres:[password]@db.tu-project-id.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[password]@db.tu-project-id.supabase.co:5432/postgres"
```

### Configuración de CORS

En **Settings > API**:
- **CORS origins**: `https://tu-dominio.com`
- **Additional CORS origins**: `http://localhost:3000` (solo desarrollo)

## 📊 Monitoreo

### Métricas Importantes

1. **Database > Reports**: Uso de CPU y memoria
2. **Auth > Users**: Usuarios activos
3. **API > Logs**: Errores de API
4. **Storage**: Uso de almacenamiento

### Alertas

Configura alertas en **Settings > Billing**:
- Límite de requests por mes
- Uso de base de datos
- Transferencia de datos

## 🚀 Despliegue

### Variables para Vercel

```bash
# Configurar en Vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add DATABASE_URL
vercel env add DIRECT_URL
```

### Configurar Dominio

1. En Supabase **Settings > API**
2. Actualiza **Site URL** a tu dominio de producción
3. Agrega **Redirect URLs** de producción

## 🆘 Solución de Problemas

### Error de Conexión

```bash
# Verificar variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $DATABASE_URL

# Testear conexión
npm run db:generate
```

### Error de Autenticación

1. Verifica que las URLs estén configuradas
2. Revisa que RLS esté configurado correctamente
3. Verifica que el trigger de usuarios funcione

### Error de Migraciones

```bash
# Resetear migraciones
npm run db:reset

# Aplicar nuevamente
npm run db:migrate
```

## ✅ Checklist Final

- [ ] Proyecto Supabase creado
- [ ] Variables de entorno configuradas
- [ ] Migraciones ejecutadas
- [ ] RLS configurado
- [ ] Función de usuarios creada
- [ ] Autenticación funcionando
- [ ] Datos de seed cargados
- [ ] Dashboard accesible
- [ ] Tests de conexión pasando

---

**¡EvoMedi está listo para funcionar con Supabase!** 🎉

Para soporte adicional, revisa la [documentación de Supabase](https://supabase.com/docs) o crea un issue en el repositorio. 