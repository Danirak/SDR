# Sistema de Reserva de Sala de Estudio

Sistema de reserva de sala de estudio con autenticación Google SSO y validación de dominios institucionales.

## Tecnologías

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **NextAuth.js** - Autenticación
- **Jest + React Testing Library** - Testing

## Requisitos

- Node.js 18+
- npm o yarn

## Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env.local

# Configurar variables de entorno en .env.local
```

## Configuración de Google OAuth

1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear un nuevo proyecto
3. Habilitar Google+ API
4. Crear credenciales OAuth 2.0
5. Agregar URIs de redirección autorizados:
   - `http://localhost:3000/api/auth/callback/google` (desarrollo)
   - `https://your-domain.com/api/auth/callback/google` (producción)
6. Copiar Client ID y Client Secret a `.env.local`

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Build para producción
npm run build

# Iniciar en producción
npm start
```

## Despliegue en Azure

Este proyecto está configurado para desplegarse en Azure App Service.

### Configuración requerida:

1. Variables de entorno en Azure:
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `ALLOWED_EMAIL_DOMAINS`

2. El proyecto usa `output: 'standalone'` en `next.config.js` para optimizar el despliegue.

## Tickets Implementados

- **SDR-5**: Inicio de sesión con Google (SSO) - Acceso con dominio permitido
- **SDR-6**: Inicio de sesión con Google (SSO) - Acceso con dominio no permitido

## Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   └── auth/         # NextAuth.js endpoints
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página principal
├── components/           # Componentes React
├── lib/                  # Utilidades y configuraciones
└── __tests__/           # Tests
```

## Testing

El proyecto utiliza TDD (Test-Driven Development). Los tests se escriben antes de la implementación.

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con coverage
npm test -- --coverage
```

## Licencia

Privado
