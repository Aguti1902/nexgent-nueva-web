# NexGent - Agentes de IA para Empresas

Web corporativa moderna y elegante para NexGent, empresa especializada en el desarrollo de agentes de inteligencia artificial para empresas.

## 🚀 Características

- **Diseño Minimalista y Elegante**: Interfaz limpia con los colores corporativos de NexGent
- **Chat de IA Integrado**: Asistente virtual con ChatGPT para responder preguntas sobre NexGent 🤖
- **Totalmente Responsive**: Optimizada para todos los dispositivos
- **Animaciones Sutiles**: Efectos de scroll y hover usando Framer Motion
- **SEO Optimizado**: Metadatos completos en todas las páginas
- **Rendimiento Óptimo**: Construida con Next.js 14 y optimización de imágenes

## 🛠️ Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: React Icons
- **Fuentes**: Poppins (principal), Monda (títulos)
- **IA**: OpenAI GPT-4 (Chat inteligente)

## 📋 Estructura del Proyecto

```
NEXGENT/
├── app/                          # Rutas de Next.js
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio
│   ├── servicios/               # Página de servicios
│   ├── casos-exito/             # Casos de éxito
│   ├── nosotros/                # Sobre nosotros
│   ├── contacto/                # Formulario de contacto
│   ├── aviso-legal/             # Aviso legal
│   ├── politica-privacidad/     # Política de privacidad
│   └── cookies/                 # Política de cookies
├── components/                   # Componentes React
│   ├── Header.tsx               # Navegación principal
│   ├── Footer.tsx               # Pie de página
│   ├── ui/                      # Componentes UI reutilizables
│   ├── home/                    # Componentes de la home
│   ├── services/                # Componentes de servicios
│   ├── cases/                   # Componentes de casos
│   ├── about/                   # Componentes sobre nosotros
│   └── contact/                 # Componentes de contacto
├── images/                       # Logos e imágenes
└── public/                       # Archivos públicos
```

## 🎨 Paleta de Colores

- **Primary**: `#82cbd4` (Azul celeste suave)
- **Secondary**: `#151610` (Negro grisáceo profundo)
- **Accent**: `#6ba5ae` (Azul verdoso)

## 📱 Páginas

1. **Inicio**: Hero impactante, servicios, beneficios, casos de éxito
2. **Servicios**: Detalle completo de todos los servicios de IA
3. **Casos de Éxito**: Historias reales con resultados medibles
4. **Nosotros**: Historia, misión, valores y diferenciadores
5. **Contacto**: Formulario de contacto y FAQ
6. **Legales**: Aviso legal, privacidad y cookies

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Crea el build de producción
- `npm start`: Inicia el servidor en modo producción
- `npm run lint`: Ejecuta el linter

## 🌐 Deployment

Esta aplicación está optimizada para ser desplegada en:

- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS Amplify**
- Cualquier hosting que soporte Node.js

### Deploy en Vercel

```bash
npm install -g vercel
vercel
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SITE_URL=https://nexgent.ai
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
NEXT_PUBLIC_CONTACT_EMAIL=hola@nexgent.ai
```

### Integración con Servicios

Para integrar con servicios externos:

- **Analytics**: Google Analytics ya configurado
- **CRM**: Integración lista para HubSpot/Salesforce
- **Email**: Preparado para SendGrid/Mailchimp
- **Forms**: Backend de formularios pendiente de configurar

## 🎯 Optimizaciones SEO

- Metadatos completos en cada página
- Open Graph tags para redes sociales
- Sitemap generado automáticamente
- robots.txt configurado
- Estructura semántica HTML5
- Velocidad de carga optimizada

## 🔐 Seguridad

- Headers de seguridad configurados
- Validación de formularios
- Protección CSRF
- Rate limiting en APIs
- Cumplimiento RGPD

## 📝 Próximos Pasos

- [ ] Integrar backend para formulario de contacto
- [ ] Configurar Google Analytics / Tag Manager
- [ ] Añadir Meta Pixel para remarketing
- [ ] Implementar sistema de blog
- [ ] Configurar email marketing
- [ ] A/B testing de conversión

## 🤝 Contribuir

Este es un proyecto privado de NexGent. Para sugerencias o mejoras, contacta con el equipo de desarrollo.

## 📄 Licencia

© 2024 NexGent. Todos los derechos reservados.

---

Desarrollado con ❤️ por el equipo de NexGent

