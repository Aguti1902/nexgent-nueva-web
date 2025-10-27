# 🚀 INSTRUCCIONES DE INSTALACIÓN Y USO - NexGent

## ✅ ¿Qué se ha creado?

Se ha desarrollado una **web corporativa completa y profesional** para NexGent con:

### 📄 Páginas creadas:
1. **Inicio** (`/`) - Hero impactante con todos los CTAs
2. **Servicios** (`/servicios`) - Detalle completo de los 7 servicios principales
3. **Casos de Éxito** (`/casos-exito`) - Historias reales con resultados medibles
4. **Sobre Nosotros** (`/nosotros`) - Historia, misión, valores y diferenciadores
5. **Contacto** (`/contacto`) - Formulario completo + FAQ
6. **Aviso Legal** (`/aviso-legal`)
7. **Política de Privacidad** (`/politica-privacidad`)
8. **Política de Cookies** (`/cookies`)

### 🎨 Características:
- ✨ Diseño minimalista y elegante con los colores corporativos
- 📱 Totalmente responsive (móvil, tablet, desktop)
- 🎭 Animaciones sutiles con Framer Motion
- ⚡ Rendimiento optimizado
- 🔍 SEO completo en todas las páginas
- 🎯 CTAs estratégicos en cada sección
- 💼 Profesional y con autoridad empresarial

---

## 📦 PASO 1: Instalar Dependencias

Abre la terminal en esta carpeta y ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- React Icons
- TypeScript

---

## 🚀 PASO 2: Ejecutar el Proyecto en Desarrollo

Una vez instaladas las dependencias:

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

---

## 🎯 PASO 3: Personalización

### A. Logos e Imágenes

Los logos ya están en `/images/`. Si necesitas actualizarlos:

1. Reemplaza los archivos en la carpeta `/images/`
2. Mantén los mismos nombres de archivo
3. Formatos recomendados: PNG con fondo transparente

### B. Información de Contacto

Edita estos archivos para añadir tu información real:

**`components/Footer.tsx`** - línea ~17
- Añade enlaces reales a redes sociales

**`components/contact/ContactInfo.tsx`** - línea ~5-30
- Actualiza teléfono, email, dirección

### C. Formulario de Contacto

**`components/contact/ContactForm.tsx`** - línea ~35

Actualmente el formulario simula el envío. Para conectarlo:

1. **Opción A - EmailJS** (más fácil):
```bash
npm install @emailjs/browser
```

2. **Opción B - API propia**:
Crea un endpoint en `/app/api/contact/route.ts`

3. **Opción C - Servicios externos**:
- Formspree
- Basin
- Web3Forms

### D. Google Analytics

**`app/layout.tsx`** - añade antes del `</head>`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=TU-ID-AQUI`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'TU-ID-AQUI');
  `}
</Script>
```

### E. Meta Pixel (Facebook)

Similar al punto anterior, añade tu píxel de Facebook.

---

## 🌐 PASO 4: Deploy en Producción

### Opción 1: Vercel (Recomendado - Gratis)

1. Crea cuenta en [vercel.com](https://vercel.com)
2. Instala Vercel CLI:
```bash
npm install -g vercel
```
3. Deploy:
```bash
vercel
```
4. Sigue las instrucciones

### Opción 2: Netlify

1. Build del proyecto:
```bash
npm run build
```
2. Sube la carpeta `.next` a Netlify

### Opción 3: Servidor propio

```bash
npm run build
npm start
```

---

## 🎨 PASO 5: Personalización Avanzada

### Cambiar Colores

**`tailwind.config.js`** - línea 9-13:

```js
colors: {
  primary: '#82cbd4',    // Color principal
  secondary: '#151610',  // Color secundario
  accent: '#6ba5ae',     // Color de acento
}
```

### Cambiar Fuentes

**`app/layout.tsx`** - línea 9:

Cambia 'Poppins' por la fuente que prefieras de Google Fonts.

### Añadir más idiomas

Los componentes están preparados para i18n. Usa next-i18next o similar.

---

## 📝 PASO 6: Contenido Legal (IMPORTANTE)

### ⚠️ DEBES ACTUALIZAR:

1. **`app/aviso-legal/page.tsx`**
   - Añade razón social real
   - NIF de la empresa
   - Dirección completa

2. **`app/politica-privacidad/page.tsx`**
   - Verifica que se ajusta a tu operativa real
   - Actualiza datos de contacto

3. **`app/cookies/page.tsx`**
   - Añade las cookies que realmente uses
   - Actualiza según tus herramientas de analytics

💡 **Recomendación**: Consulta con un abogado para validar estos documentos.

---

## 🔧 PASO 7: Optimizaciones Adicionales

### Mejorar Rendimiento

1. **Optimizar imágenes**:
```bash
npm install sharp
```

2. **Comprimir assets**:
```bash
npm install next-optimized-images
```

### Añadir Blog

Crea `/app/blog/page.tsx` siguiendo la estructura actual.

### Integrar CRM

- HubSpot
- Salesforce
- Pipedrive

Todos tienen SDKs de JavaScript.

---

## 🐛 Solución de Problemas

### Error: Module not found

```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto 3000 en uso

```bash
npm run dev -- -p 3001
```

### Build falla

Revisa errores de TypeScript:
```bash
npm run lint
```

---

## 📱 Testing

### Desktop
- Chrome (recomendado)
- Firefox
- Safari
- Edge

### Mobile
- iOS Safari
- Chrome Android
- Samsung Internet

---

## 🎯 Checklist Pre-Launch

- [ ] Logos actualizados
- [ ] Información de contacto correcta
- [ ] Formulario funcionando
- [ ] Google Analytics configurado
- [ ] Meta Pixel (opcional) configurado
- [ ] Documentos legales revisados
- [ ] Links de redes sociales actualizados
- [ ] SEO: Todas las páginas tienen metadatos
- [ ] Responsive: Probado en móvil y tablet
- [ ] Rendimiento: Lighthouse score > 90
- [ ] Dominio configurado
- [ ] SSL activo (HTTPS)

---

## 🆘 Soporte

Si tienes dudas:

1. Revisa los comentarios en el código
2. Consulta la documentación de Next.js: [nextjs.org/docs](https://nextjs.org/docs)
3. Tailwind CSS docs: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## 🎉 ¡Listo!

Tu web de NexGent está lista para conquistar el mercado de agentes de IA.

**Próximos pasos sugeridos**:
1. Configurar campañas de Google Ads
2. Optimizar landing pages para conversión
3. Implementar sistema de chat en vivo
4. Crear contenido de blog para SEO
5. Configurar email marketing

---

**Desarrollado con ❤️ para NexGent**

*¡Mucha suerte con tu lanzamiento! 🚀*

