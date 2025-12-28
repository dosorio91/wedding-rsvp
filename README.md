# Sistema RSVP Matrimonio 💒

Sistema completo de RSVP (confirmación de asistencia) para matrimonio desarrollado con Next.js 14+, TypeScript, Tailwind CSS, SQLite y Prisma.

## ✨ Características

- **Landing Page**: Buscador elegante para encontrar invitados
- **Sistema RSVP Multi-Step**: Confirmación paso a paso con validaciones
- **Panel Admin**: Gestión completa de invitados con autenticación
- **100% Gratuito**: Solo herramientas y servicios gratuitos
- **Responsive**: Funciona en desktop y móvil
- **Base de datos local**: SQLite para desarrollo, fácil de migrar

## 🚀 Tecnologías

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Base de datos**: SQLite + Prisma ORM
- **Validación**: Zod
- **Hosting**: Vercel (plan gratuito)

## 📁 Estructura del Proyecto

```
wedding-rsvp/
├── prisma/
│   ├── schema.prisma          # Esquema de base de datos
│   ├── migrations/            # Migraciones
│   └── seed.ts               # Datos de prueba
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page principal
│   │   ├── gracias/page.tsx  # Página de confirmación
│   │   ├── admin/page.tsx    # Panel de administración
│   │   └── api/              # Endpoints API
│   │       ├── guests/search/route.ts
│   │       ├── rsvp/confirm/route.ts
│   │       └── admin/guests/route.ts
│   ├── components/
│   │   ├── guest-search.tsx  # Buscador de invitados
│   │   ├── rsvp-dialog.tsx   # Dialog multi-step
│   │   └── ui/               # Componentes shadcn/ui
│   └── lib/
│       ├── db.ts             # Cliente Prisma
│       ├── validations.ts    # Esquemas Zod
│       └── utils.ts          # Utilidades
└── README.md
```

## 🏗️ Instalación y Configuración Local

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### 1. Clonar e instalar dependencias

```bash
# Si estás clonando desde un repo
git clone <tu-repo>
cd wedding-rsvp

# Instalar dependencias
npm install
```

### 2. Configurar base de datos

```bash
# Generar base de datos SQLite
npx prisma migrate dev --name init

# Generar cliente Prisma
npx prisma generate
```

### 3. Configurar variables de entorno

El archivo `.env` ya incluye la configuración básica:

```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="matrimonio2025"
```

**⚠️ IMPORTANTE**: Cambia la contraseña de admin antes de hacer deploy a producción.

### 4. Agregar invitados

Usa el panel de administración en `/admin` para agregar invitados.

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🌐 Despliegue en Vercel (GRATIS)

### 1. Preparar para producción

```bash
# Compilar el proyecto
npm run build
```

### 2. Deploy en Vercel

#### Opción A: Desde GitHub
1. Sube tu código a GitHub
2. Conecta tu repositorio en [vercel.com](https://vercel.com)
3. Configura las variables de entorno en Vercel:
   - `DATABASE_URL`: `file:./prod.db`
   - `ADMIN_PASSWORD`: `TuContraseñaSegura123`

#### Opción B: Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configurar variables de entorno
vercel env add DATABASE_URL
vercel env add ADMIN_PASSWORD
```

## 📖 Guía de Uso

### Para Invitados (Ruta: `/`)

1. **Buscar nombre**: Escribe tu nombre o apellido en el buscador
2. **Seleccionar de la lista**: Click en tu nombre cuando aparezca
3. **Confirmar asistencia**: Click en "Sí" para confirmar
4. **Ingresar email**: Proporciona tu email para recibir información
5. **Restricciones alimentarias**: Selecciona las que correspondan
6. **Confirmación final**: Click en "Confirmar participación"
7. **¡Listo!**: Serás redirigido a la página de agradecimiento

### Para Administradores (Ruta: `/admin`)

**Contraseña por defecto**: `matrimonio2025`

1. **Ingresar contraseña**: Usa la contraseña de admin configurada
2. **Ver estadísticas**: Total de invitados, confirmados y pendientes
3. **Agregar invitados**: Click en "+" para agregar nuevos invitados
4. **Ver lista completa**: Tabla con todos los invitados y su estado
5. **Eliminar invitados**: Click en el icono de basura para eliminar

## 🔧 Configuración Avanzada

### Cambiar textos del sitio

**Título principal** (`src/app/page.tsx`):
```tsx
<h1 className="text-6xl font-bold text-gray-900 mb-4">
  Cocó & Dani  {/* Cambia aquí */}
</h1>
```

**Fecha del matrimonio** (`src/components/rsvp-dialog.tsx`):
```tsx
<DialogDescription className="text-center">
  El matrimonio es el 20 de febrero. {/* Cambia aquí */}
</DialogDescription>
```

**Mensaje final** (`src/app/gracias/page.tsx`):
```tsx
<p className="text-2xl font-semibold text-rose-600">
  Cocó y Dani  {/* Cambia aquí */}
</p>
```

## 🎉 ¡Disfruta tu matrimonio!

Este sistema fue diseñado con amor para hacer más fácil la organización de tu día especial. ¡Felicidades por tu matrimonio! 💐✨

---

**Desarrollado con ❤️ usando herramientas 100% gratuitas**
