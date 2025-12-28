# 🚀 Deployment a Vercel

## Pasos para subir tu sistema RSVP a producción

### 1. 📡 Subir el código a GitHub

```bash
# Crear repositorio en GitHub (ve a github.com y crea uno nuevo)

# Agregar remote
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git

# Subir código
git push -u origin main
```

### 2. 🗄️ Configurar Base de Datos en Vercel

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Haz click en **"Storage"** → **"Create Database"**
3. Selecciona **"Postgres"** (gratuito)
4. Dale un nombre: `wedding-rsvp-db`
5. Crea la base de datos
6. Ve a **".env.local"** y copia la `DATABASE_URL`

### 3. 🚀 Desplegar en Vercel

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Importa tu repositorio de GitHub
4. **NO hagas click en Deploy todavía**

### 4. ⚙️ Configurar Variables de Entorno

Antes de hacer deploy, configura estas variables:

```
DATABASE_URL=postgresql://... (la que copiaste de la BD)
ADMIN_PASSWORD=matrimonio2025  (o el password que quieras)
```

1. En la página de proyecto en Vercel
2. Ve a **"Environment Variables"**
3. Agrega las variables de arriba

### 5. 🎯 Deploy Final

1. Haz click en **"Deploy"**
2. Espera 2-3 minutos
3. Vercel automáticamente:
   - Ejecutará `npm install`
   - Ejecutará `prisma generate`
   - Hará el build de Next.js
   - Aplicará las migraciones de BD

### 6. 👥 Agregar Invitados

Una vez deployado:

1. Ve a `tu-app.vercel.app/admin`
2. Ingresa tu `ADMIN_PASSWORD`
3. Agrega todos tus invitados

### 7. 🎉 ¡Listo!

Tu sistema RSVP está funcionando en:
- **Landing page**: `tu-app.vercel.app`
- **Panel admin**: `tu-app.vercel.app/admin`

## 🔄 Updates

Para actualizar el sitio:

```bash
# Hacer cambios en tu código local
git add .
git commit -m "Descripción del cambio"
git push

# Vercel automáticamente hace redeploy
```

## 🆘 Troubleshooting

### Error: "Prisma migration failed"
- Ve a la consola de Vercel
- Busca errores en el build log
- Verifica que `DATABASE_URL` esté configurada

### Error: "Admin password not working"
- Verifica que `ADMIN_PASSWORD` esté en las variables de entorno
- No debe tener espacios extra

### Error: "Guests not appearing"
- Ve al panel admin y agrega invitados manualmente
- La base de datos inicia vacía

## 📱 Sharing

Comparte estos links con tus invitados:
- **Para confirmar**: `tu-app.vercel.app`
- **Para ti (admin)**: `tu-app.vercel.app/admin`