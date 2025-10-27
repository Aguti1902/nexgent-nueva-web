# 🤖 Configuración del Chat de IA

## 📋 Resumen

Se ha añadido un chat flotante de IA en la esquina inferior derecha de todas las páginas web. Este chat se conecta con ChatGPT para responder preguntas sobre NexGent y los agentes de IA.

## 🔑 Configuración de la API Key

Para que el chat funcione, necesitas una API key de OpenAI:

### 1. Obtener tu API Key

1. Ve a [OpenAI Platform](https://platform.openai.com/api-keys)
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys"
4. Crea una nueva API key
5. Copia la key (solo se mostrará una vez)

### 2. Configurar la Variable de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
OPENAI_API_KEY=tu_api_key_aqui
```

**⚠️ IMPORTANTE:** 
- Nunca compartas tu API key públicamente
- No subas el archivo `.env.local` a Git (ya está en `.gitignore`)
- Mantén tu API key segura

### 3. Reiniciar el Servidor

Después de añadir la API key, reinicia el servidor de desarrollo:

```bash
npm run dev
```

## 🎨 Características del Chat

### Diseño
- **Botón flotante** en la esquina inferior derecha
- **Indicador verde** de estado "en línea"
- **Animaciones suaves** al abrir/cerrar
- **Diseño minimalista** coherente con el resto de la web
- **Responsive** - se adapta a dispositivos móviles

### Funcionalidad
- **Respuestas inteligentes** sobre NexGent y agentes de IA
- **Contexto personalizado** con información de la empresa
- **Historial de conversación** dentro de la sesión
- **Indicador de escritura** mientras la IA genera respuestas
- **Scroll automático** a nuevos mensajes

### Información que puede responder
- ✅ Qué son los agentes de IA
- ✅ Servicios de NexGent
- ✅ Beneficios de la automatización
- ✅ Industrias que servimos
- ✅ Proceso de trabajo
- ✅ Casos de éxito
- ✅ Información sobre demos

## 🔧 Archivos Creados/Modificados

### Nuevos archivos:
1. **`/components/ChatWidget.tsx`**
   - Componente principal del chat flotante
   - Maneja la UI y la lógica del chat
   - Animaciones con Framer Motion

2. **`/app/api/chat/route.ts`**
   - API route para conectar con OpenAI
   - Prompt del sistema con información de NexGent
   - Manejo de errores

3. **`/CONFIGURACION-CHAT-IA.md`**
   - Este archivo de documentación

### Archivos modificados:
1. **`/app/layout.tsx`**
   - Importado y añadido `<ChatWidget />`
   - Ahora el chat aparece en todas las páginas

2. **`/package.json`**
   - Añadida dependencia `openai`

## 💰 Costes de OpenAI

El chat utiliza el modelo **GPT-4** que tiene los siguientes costes aproximados:

- Input: $0.03 por 1K tokens
- Output: $0.06 por 1K tokens

**Estimación**: Una conversación típica de 10 mensajes cuesta aproximadamente $0.01-0.02

### Optimizaciones implementadas:
- Límite de 500 tokens por respuesta
- Temperatura configurada en 0.7 para respuestas coherentes
- Prompt del sistema optimizado

## 🎯 Personalización

### Modificar el prompt del sistema

Edita `/app/api/chat/route.ts` y modifica la variable `systemPrompt` para:
- Añadir más información sobre servicios
- Cambiar el tono de las respuestas
- Actualizar datos de la empresa

### Cambiar el modelo de IA

En `/app/api/chat/route.ts`, línea 73:
```typescript
model: 'gpt-4', // Puedes cambiar a 'gpt-3.5-turbo' para ahorrar costes
```

**Alternativas:**
- `gpt-3.5-turbo` - Más económico, respuestas más rápidas
- `gpt-4` - Mejor calidad, más costoso (actual)
- `gpt-4-turbo` - Balance entre calidad y velocidad

### Modificar el diseño

Edita `/components/ChatWidget.tsx`:
- Cambiar colores
- Ajustar tamaños
- Modificar animaciones
- Personalizar mensajes

## 🚀 Despliegue en Producción

Al desplegar en Vercel, Netlify u otro servicio:

1. Ve a la configuración de variables de entorno
2. Añade: `OPENAI_API_KEY` con tu API key
3. Redespliega la aplicación

## 📝 Notas

- El chat guarda el historial solo durante la sesión actual
- No se guarda información en base de datos (para próxima versión)
- El prompt del sistema está optimizado para información de NexGent
- Las respuestas se generan en tiempo real

## 🐛 Solución de Problemas

### El chat no responde
- Verifica que la API key esté configurada correctamente
- Revisa la consola del navegador para errores
- Asegúrate de haber reiniciado el servidor después de añadir la API key

### Errores en la consola
- Verifica que tengas créditos en tu cuenta de OpenAI
- Comprueba que la API key sea válida
- Revisa los límites de uso de tu plan de OpenAI

### El botón no aparece
- Limpia la caché del navegador
- Verifica que `<ChatWidget />` esté en `layout.tsx`
- Revisa la consola para errores de JavaScript

## 📚 Próximas Mejoras

Ideas para futuras versiones:
- [ ] Guardar historial de conversaciones en base de datos
- [ ] Panel de administración para ver conversaciones
- [ ] Análisis de preguntas frecuentes
- [ ] Integración con CRM
- [ ] Notificaciones por email de conversaciones
- [ ] Formulario de captura de leads dentro del chat
- [ ] Modo offline con respuestas predefinidas

