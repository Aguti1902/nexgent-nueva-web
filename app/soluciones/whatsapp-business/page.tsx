import Image from 'next/image'
import { FaWhatsapp, FaClock, FaChartLine, FaUsers, FaRobot, FaCheckCircle, FaBolt, FaLock, FaGlobe, FaHeadset, FaChartBar, FaHandshake } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'WhatsApp Business con IA | Automatización Inteligente | NexGent',
  description: 'Automatiza tu atención al cliente en WhatsApp con agentes de IA. Respuestas 24/7, gestión de consultas, conversiones automáticas y aumento del 300% en ventas.',
}

export default function WhatsAppBusinessPage() {
  const features = [
    {
      icon: FaClock,
      title: 'Atención 24/7 sin descanso',
      description: 'Tu agente de IA nunca duerme. Atiende a tus clientes a cualquier hora del día, los 365 días del año. Sin vacaciones, sin días libres, sin límites.',
    },
    {
      icon: FaUsers,
      title: 'Conversaciones ilimitadas simultáneas',
      description: 'Gestiona cientos o miles de chats al mismo tiempo sin perder calidad. Cada cliente recibe atención personalizada e instantánea.',
    },
    {
      icon: FaRobot,
      title: 'IA conversacional avanzada',
      description: 'Respuestas naturales y contextuales que se adaptan a cada cliente. Tu bot aprende de cada interacción para mejorar constantemente.',
    },
    {
      icon: FaChartLine,
      title: 'Analytics y métricas en tiempo real',
      description: 'Dashboard completo con métricas de todas tus conversaciones: tasa de respuesta, conversión, satisfacción y más.',
    },
    {
      icon: FaBolt,
      title: 'Respuesta instantánea',
      description: 'Tiempo de respuesta de menos de 1 segundo. Tus clientes nunca esperarán y la experiencia será excepcional.',
    },
    {
      icon: FaLock,
      title: 'Seguridad y privacidad garantizada',
      description: 'Cumplimiento total con RGPD. Tus datos y los de tus clientes están protegidos con encriptación de extremo a extremo.',
    },
    {
      icon: FaGlobe,
      title: 'Multiidioma inteligente',
      description: 'Detecta automáticamente el idioma del cliente y responde en más de 50 idiomas. Expande tu negocio sin barreras.',
    },
    {
      icon: FaHandshake,
      title: 'Transferencia inteligente a humano',
      description: 'Cuando sea necesario, el bot transfiere la conversación a tu equipo con todo el contexto y la información recopilada.',
    },
  ]

  const benefits = [
    'Respuesta instantánea a consultas frecuentes y resolución del 85% sin intervención humana',
    'Calificación automática de leads con scoring inteligente basado en el comportamiento del usuario',
    'Integración directa con tu CRM, ERP y herramientas de gestión favoritas (Zapier, Make, API propia)',
    'Transferencia a humano cuando sea necesario con todo el contexto de la conversación',
    'Soporte para más de 50 idiomas con detección automática y traducción en tiempo real',
    'Personalización total por cliente: historial, preferencias, compras anteriores y más',
    'Sistema de seguimiento automático de leads no convertidos',
    'Envío programado de mensajes promocionales y recordatorios',
    'Gestión de carritos abandonados con recuperación automática',
    'Base de conocimiento personalizable con tu información de productos y servicios',
    'Integración con catálogo de WhatsApp para ventas directas',
    'Reportes detallados y exportables en Excel/PDF',
  ]

  const useCases = [
    {
      title: 'Atención al Cliente',
      description: 'Resuelve dudas, gestiona incidencias y proporciona soporte técnico 24/7 sin necesidad de aumentar tu equipo.',
      metrics: '90% de consultas resueltas sin intervención humana',
    },
    {
      title: 'Generación de Leads',
      description: 'Califica automáticamente a tus potenciales clientes, recopila información relevante y programa citas con tu equipo de ventas.',
      metrics: '300% más leads cualificados',
    },
    {
      title: 'Ventas y Conversión',
      description: 'Guía a tus clientes en el proceso de compra, resuelve objeciones y cierra ventas directamente desde WhatsApp.',
      metrics: '45% de aumento en conversión',
    },
    {
      title: 'Gestión de Reservas',
      description: 'Automatiza la reserva de citas, mesas, servicios o productos. Confirmaciones, recordatorios y reprogramaciones sin esfuerzo.',
      metrics: '80% menos no-shows',
    },
    {
      title: 'Soporte Post-Venta',
      description: 'Seguimiento automático de pedidos, encuestas de satisfacción y gestión de devoluciones o cambios.',
      metrics: '95% de satisfacción del cliente',
    },
    {
      title: 'Marketing y Promociones',
      description: 'Envía campañas personalizadas, ofertas especiales y contenido relevante basado en los intereses de cada cliente.',
      metrics: '60% de tasa de apertura',
    },
  ]

  const comparisonPoints = [
    { traditional: 'Horario limitado 9:00-18:00', withAI: 'Disponibilidad 24/7 los 365 días', },
    { traditional: '1 agente = 10-15 chats/día', withAI: '1 IA = conversaciones ilimitadas simultáneas', },
    { traditional: 'Tiempo de respuesta: 5-30 min', withAI: 'Tiempo de respuesta: < 1 segundo', },
    { traditional: 'Coste: €1,500-€2,500/mes por agente', withAI: 'Coste: desde €149/mes todo incluido', },
    { traditional: 'Errores humanos frecuentes', withAI: 'Consistencia perfecta en cada respuesta', },
    { traditional: 'Sin métricas detalladas', withAI: 'Analytics completo en tiempo real', },
    { traditional: 'Formación y rotación de personal', withAI: 'Sin formación, actualización instantánea', },
    { traditional: 'Escalabilidad limitada y costosa', withAI: 'Escalabilidad infinita sin coste adicional', },
  ]

  const faqs = [
    {
      q: '¿Qué tan rápido puedo implementar el agente de WhatsApp?',
      a: 'La implementación completa toma entre 24-48 horas. Nuestro equipo configura todo por ti: conecta tu número de WhatsApp Business, personaliza las respuestas según tu negocio y realiza pruebas exhaustivas antes del lanzamiento.',
    },
    {
      q: '¿Necesito conocimientos técnicos para usar el sistema?',
      a: 'No necesitas ningún conocimiento técnico. Nuestro sistema es completamente intuitivo y nuestro equipo te proporciona formación completa. Además, puedes actualizar respuestas y configuraciones desde un panel muy fácil de usar.',
    },
    {
      q: '¿Puedo personalizar las respuestas del bot?',
      a: 'Sí, totalmente. Puedes personalizar cada aspecto: el tono de las respuestas, la información que proporciona, los flujos de conversación, las preguntas que hace y mucho más. El bot se adapta 100% a tu marca y forma de comunicar.',
    },
    {
      q: '¿Qué pasa si el bot no sabe responder algo?',
      a: 'El sistema tiene un mecanismo inteligente de escalamiento. Si detecta que no puede resolver la consulta, transfiere automáticamente la conversación a tu equipo humano con todo el contexto recopilado. También aprende de estas situaciones para mejorar.',
    },
    {
      q: '¿Puedo integrar el bot con mis sistemas actuales?',
      a: 'Sí. Ofrecemos integraciones nativas con los principales CRM (Salesforce, HubSpot, Pipedrive), herramientas de gestión (Monday, Asana), plataformas de ecommerce (Shopify, WooCommerce) y más. También tenemos API propia para integraciones personalizadas.',
    },
    {
      q: '¿Cómo garantizan la seguridad de los datos?',
      a: 'Cumplimos con todos los estándares de seguridad y privacidad (RGPD, ISO 27001). Todos los datos están encriptados de extremo a extremo, almacenados en servidores seguros en la UE y nunca compartidos con terceros. Tienes control total sobre tus datos.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 rounded-full px-4 py-2 mb-6">
                  <FaWhatsapp className="text-green-600" />
                  <span className="text-sm font-semibold text-green-800">WhatsApp Business API</span>
                </div>
                
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Automatiza WhatsApp con IA y <span className="text-green-600">multiplica tus ventas</span>
                </h1>
                
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Transforma WhatsApp en tu <strong>canal de ventas más rentable</strong>. Nuestro agente de IA gestiona conversaciones, califica leads, resuelve dudas y cierra ventas automáticamente mientras tú te enfocas en hacer crecer tu negocio.
                </p>

                <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    <strong className="text-green-600">+2.000 millones</strong> de usuarios activos en WhatsApp cada día. ¿Estás aprovechando este canal al máximo?
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Solicita una demo gratuita
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver casos de éxito
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Implementación en 48h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Sin permanencia</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl px-6 py-4 flex items-center gap-3">
                    <FaWhatsapp className="text-white text-2xl" />
                    <div className="text-white flex-1">
                      <p className="font-bold">NexGent Bot</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse"></div>
                        <p className="text-xs opacity-90">En línea • Responde en &lt;1s</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-b-2xl space-y-4 max-h-96 overflow-y-auto">
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-sm">
                        <p className="text-sm text-gray-800">¡Hola! Soy el asistente virtual de NexGent 👋</p>
                        <p className="text-sm text-gray-800 mt-1">¿En qué puedo ayudarte hoy?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm">Quiero información sobre vuestros precios</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-sm">
                        <p className="text-sm text-gray-800">¡Perfecto! Tenemos planes desde €149/mes con todo incluido:</p>
                        <ul className="text-sm text-gray-700 mt-2 space-y-1">
                          <li>✓ Respuestas ilimitadas</li>
                          <li>✓ Configuración personalizada</li>
                          <li>✓ Soporte prioritario 24/7</li>
                        </ul>
                        <p className="text-sm text-gray-800 mt-2">¿Te gustaría agendar una demo para ver cómo funciona?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm">Sí, me interesa!</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-sm">
                        <p className="text-sm text-gray-800">Genial! 🎉 ¿Qué día y hora te viene mejor? Tengo disponibilidad esta semana.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">Conversión: 45%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">300%</p>
                <p className="text-gray-300 text-sm md:text-base">Aumento en conversiones</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">&lt;1s</p>
                <p className="text-gray-300 text-sm md:text-base">Tiempo de respuesta</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">24/7</p>
                <p className="text-gray-300 text-sm md:text-base">Disponibilidad total</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">90%</p>
                <p className="text-gray-300 text-sm md:text-base">Consultas auto-resueltas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">
                Todo lo que necesitas para dominar WhatsApp
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Una plataforma completa con todas las funcionalidades que necesitas para automatizar, optimizar y escalar tu atención al cliente en WhatsApp
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-2xl mb-4 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <feature.icon />
                  </div>
                  <h3 className="font-monda text-lg font-bold text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">
                Casos de uso que transforman negocios
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubre cómo empresas como la tuya están usando WhatsApp con IA para multiplicar sus resultados
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-green-500 transition-all duration-300">
                  <h3 className="font-monda text-xl font-bold text-black mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{useCase.description}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-green-800">{useCase.metrics}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">
                  ¿Qué incluye nuestro agente de WhatsApp?
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Una solución <strong>todo en uno</strong> que se adapta perfectamente a las necesidades específicas de tu negocio. Sin sorpresas, sin costes ocultos, sin complicaciones.
                </p>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-green-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Caso de éxito real</h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-5xl font-bold text-green-400 mb-2">300%</p>
                    <p className="text-gray-300">Aumento en conversiones de WhatsApp</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-green-400 mb-2">90%</p>
                    <p className="text-gray-300">Consultas resueltas automáticamente sin humanos</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-green-400 mb-2">24/7</p>
                    <p className="text-gray-300">Disponibilidad completa todos los días del año</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-green-400 mb-2">€3.2K</p>
                    <p className="text-gray-300">Ahorro mensual en costes de atención al cliente</p>
                  </div>
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">
                      "El impacto ha sido increíble. Pasamos de perder el 40% de consultas por WhatsApp a responder el 100% en menos de 2 minutos. Las ventas subieron un 185% y nuestro equipo está liberado de tareas repetitivas. El ROI se vio en la primera semana."
                    </p>
                    <p className="text-sm text-gray-400 font-semibold">
                      — Carlos Mendoza, CEO de Urban Fitness (Cadena de 8 gimnasios)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">
                WhatsApp tradicional vs. WhatsApp con IA
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compara y descubre por qué miles de empresas están migrando a la automatización inteligente
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="bg-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 text-lg">Aspecto</h3>
                </div>
                <div className="bg-red-50 p-6">
                  <h3 className="font-bold text-red-900 text-lg">Método Tradicional</h3>
                </div>
                <div className="bg-green-50 p-6">
                  <h3 className="font-bold text-green-900 text-lg">Con IA de NexGent</h3>
                </div>
              </div>
              
              {comparisonPoints.map((point, index) => (
                <div key={index} className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-t border-gray-200">
                  <div className="p-6 bg-white">
                    <p className="font-semibold text-gray-900">Comparación {index + 1}</p>
                  </div>
                  <div className="p-6 bg-red-50/30">
                    <p className="text-gray-700">{point.traditional}</p>
                  </div>
                  <div className="p-6 bg-green-50/30">
                    <p className="text-gray-900 font-medium">{point.withAI}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <p className="text-gray-800 text-lg">
                <strong className="text-green-700">Conclusión:</strong> Con WhatsApp + IA ahorras un promedio de <strong>€3,500/mes</strong> en costes operativos mientras aumentas la satisfacción del cliente y las ventas. El ROI se alcanza en menos de 2 meses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">
                Preguntas frecuentes
              </h2>
              <p className="text-xl text-gray-600">
                Resolvemos las dudas más comunes sobre nuestro agente de WhatsApp con IA
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-8 border border-gray-200 hover:border-green-300 transition-all">
                  <h3 className="font-bold text-xl text-black mb-3">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        
        <div className="container-custom px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-monda text-4xl md:text-6xl font-bold mb-6">
              ¿Listo para multiplicar tus ventas con WhatsApp?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Únete a las <strong className="text-green-400">+500 empresas</strong> que ya están automatizando WhatsApp con IA. Agenda una demo gratuita y descubre cómo nuestro agente puede transformar tu negocio en menos de 48 horas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Solicita tu demo gratuita ahora
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver más casos de éxito
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Sin permanencia</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Implementación en 48h</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
