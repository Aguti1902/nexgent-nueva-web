import { FaQuestionCircle, FaSearch, FaBook, FaVideo, FaComments, FaCheckCircle, FaHeadset, FaClock, FaRocket, FaBolt, FaCog, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Centro de Ayuda y Soporte | NexGent',
  description: 'Guías completas, tutoriales paso a paso y respuestas a preguntas frecuentes sobre nuestros servicios de IA para negocios.',
}

export default function CentroAyudaPage() {
  const categories = [
    {
      icon: FaRocket,
      title: 'Primeros pasos',
      description: 'Todo lo que necesitas para empezar',
      articles: 12,
      topics: ['Creación de cuenta', 'Configuración inicial', 'Primera automatización'],
    },
    {
      icon: FaVideo,
      title: 'Tutoriales en vídeo',
      description: 'Aprende visualmente paso a paso',
      articles: 24,
      topics: ['WhatsApp Business', 'Gestión de reservas', 'CRM con IA'],
    },
    {
      icon: FaComments,
      title: 'Preguntas frecuentes',
      description: 'Respuestas rápidas a dudas comunes',
      articles: 48,
      topics: ['Precios y planes', 'Integraciones', 'Seguridad'],
    },
    {
      icon: FaCog,
      title: 'Configuración avanzada',
      description: 'Personaliza al máximo tu solución',
      articles: 18,
      topics: ['Flujos personalizados', 'APIs', 'Webhooks'],
    },
    {
      icon: FaBolt,
      title: 'Resolución de problemas',
      description: 'Soluciona cualquier inconveniente',
      articles: 15,
      topics: ['Errores comunes', 'Debugging', 'Performance'],
    },
    {
      icon: FaChartLine,
      title: 'Mejores prácticas',
      description: 'Optimiza tus resultados',
      articles: 20,
      topics: ['Optimización', 'Casos de uso', 'ROI'],
    },
  ]

  const popularArticles = [
    {title: 'Cómo configurar WhatsApp Business en 5 minutos', views: '12.4K'},
    {title: 'Integración con CRM: Guía completa', views: '8.9K'},
    {title: 'Crear flujos de conversación efectivos', views: '7.2K'},
    {title: 'Troubleshooting: Problemas comunes', views: '6.8K'},
    {title: 'Cómo medir el ROI de tu automatización', views: '5.4K'},
  ]

  const faqs = [
    {
      question: '¿Cuánto tiempo tarda la implementación completa?',
      answer: 'La implementación básica toma entre 24-48 horas desde la contratación. Esto incluye configuración de plataforma, integración con tus sistemas y entrenamiento del agente IA. Para configuraciones avanzadas o integraciones custom, el tiempo puede extenderse a 3-5 días laborables.',
    },
    {
      question: '¿Necesito conocimientos técnicos para usar NexGent?',
      answer: 'No, en absoluto. Nosotros nos encargamos de todo el setup, configuración e integración. Tú solo necesitas usar una interfaz intuitiva tipo dashboard. Sin embargo, si tienes equipo técnico, ofrecemos APIs y webhooks para integraciones avanzadas.',
    },
    {
      question: '¿Puedo cancelar mi suscripción en cualquier momento?',
      answer: 'Sí, no hay permanencia ni penalización por cancelación. Puedes cancelar cuando quieras desde tu panel de control o contactando con soporte. Si cancelas, tendrás acceso hasta el final del período pagado y podrás exportar todos tus datos.',
    },
    {
      question: '¿Se integra con mi software actual (CRM, ERP, etc)?',
      answer: 'Sí, nos integramos con la mayoría de CRMs, ERPs y herramientas de gestión populares: Salesforce, HubSpot, Pipedrive, Zoho, Monday, etc. También ofrecemos integración vía API para software personalizado. Si tienes dudas sobre alguna herramienta específica, contáctanos.',
    },
    {
      question: '¿Qué nivel de personalización puedo hacer del agente IA?',
      answer: 'Personalización completa: tono de voz, personalidad, flujos de conversación, respuestas específicas, integraciones, triggers automáticos, etc. El agente se entrena con tu información específica y se comporta según tus necesidades exactas.',
    },
    {
      question: '¿Los datos de mis clientes están seguros?',
      answer: 'Absolutamente. Cumplimos con RGPD al 100%, todos los datos están encriptados end-to-end, servidores en Europa, auditorías de seguridad regulares, y no compartimos ningún dato con terceros. Puedes solicitar certificados de cumplimiento en cualquier momento.',
    },
    {
      question: '¿Qué soporte técnico ofrecen?',
      answer: 'Soporte técnico 24/7 vía WhatsApp, email y chat. Tiempo de respuesta promedio: 8 minutos. Para clientes Enterprise, ofrecemos gestor de cuenta dedicado y soporte telefónico prioritario. También tenemos este centro de ayuda con +100 artículos y tutoriales.',
    },
    {
      question: '¿Puedo probar antes de contratar?',
      answer: 'Sí, ofrecemos demo personalizada gratuita donde te mostramos la plataforma funcionando con ejemplos de tu industria. También puedes solicitar un trial de 14 días sin compromiso para probar con tu negocio real antes de decidir.',
    },
  ]

  const supportChannels = [
    {
      icon: FaHeadset,
      title: 'Chat en vivo',
      description: 'Respuesta en menos de 8 minutos',
      availability: '24/7',
      cta: 'Abrir chat',
    },
    {
      icon: FaComments,
      title: 'WhatsApp',
      description: 'Contacta directamente con soporte',
      availability: '24/7',
      cta: '+34 XXX XXX XXX',
    },
    {
      icon: FaBook,
      title: 'Documentación',
      description: 'Guías técnicas completas',
      availability: 'Siempre disponible',
      cta: 'Ver docs',
    },
    {
      icon: FaVideo,
      title: 'Video tutoriales',
      description: 'Aprende visualmente',
      availability: '24 videos disponibles',
      cta: 'Ver videos',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-300 rounded-full px-4 py-2 mb-6">
                <FaQuestionCircle className="text-purple-600" />
                <span className="text-sm font-semibold text-purple-800">Centro de Ayuda</span>
              </div>
              
              <h1 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                ¿En qué podemos ayudarte?
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Busca en +120 artículos, guías y tutoriales. Si no encuentras lo que buscas, nuestro equipo está disponible 24/7.
              </p>

              <div className="max-w-2xl mx-auto relative mb-8">
                <input
                  type="text"
                  placeholder="Busca guías, tutoriales, preguntas frecuentes..."
                  className="w-full px-6 py-4 pr-14 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none text-lg shadow-lg"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-500 text-white p-2 rounded-lg">
                  <FaSearch className="text-xl" />
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
                {['+120 artículos', 'Actualizado diariamente', 'Soporte 24/7'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-monda text-3xl font-bold text-black mb-3">Artículos más visitados</h2>
              <p className="text-gray-600">Las guías que más ayudan a nuestros usuarios</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {popularArticles.map((article, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer group flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold group-hover:bg-purple-500 group-hover:text-white transition-all">
                      {idx + 1}
                    </div>
                    <h3 className="font-semibold text-black group-hover:text-purple-600 transition-all">{article.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{article.views} vistas</span>
                    <FaBook className="text-gray-400 group-hover:text-purple-500 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl font-bold text-black mb-4">Explora por categoría</h2>
              <p className="text-lg text-gray-600">Encuentra rápidamente lo que necesitas</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all group cursor-pointer">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-3xl mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <category.icon />
                  </div>
                  <h3 className="font-monda text-xl font-bold text-black mb-3 group-hover:text-purple-600 transition-all">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">{category.articles} artículos</p>
                  <div className="space-y-2">
                    {category.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-4">
                Preguntas frecuentes
              </h2>
              <p className="text-lg text-gray-600">Respuestas detalladas a las dudas más comunes</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:border-purple-500 transition-all">
                  <h3 className="font-bold text-lg text-black mb-4 flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm flex-shrink-0 mt-0.5">
                      <FaQuestionCircle />
                    </div>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-9">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl font-bold text-black mb-4">Canales de soporte</h2>
              <p className="text-lg text-gray-600">Elige cómo quieres que te ayudemos</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {supportChannels.map((channel, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 border border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all text-center group">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-3xl mx-auto mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <channel.icon />
                  </div>
                  <h3 className="font-bold text-lg text-black mb-2">{channel.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                  <p className="text-xs text-gray-500 mb-6">{channel.availability}</p>
                  <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all">
                    {channel.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                {icon: FaClock, value: '8 min', label: 'Tiempo respuesta promedio'},
                {icon: FaUsers, value: '98%', label: 'Satisfacción de soporte'},
                {icon: FaShieldAlt, value: '24/7', label: 'Disponibilidad'},
                {icon: FaBook, value: '+120', label: 'Artículos de ayuda'},
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-3xl mx-auto mb-4">
                    <stat.icon />
                  </div>
                  <p className="text-4xl font-bold text-black mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-monda text-4xl md:text-5xl font-bold mb-6">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier duda o problema. Respuesta garantizada en menos de 8 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="white" size="lg" href="/contacto">
                Contactar soporte
              </Button>
              <Button variant="outline" size="lg" href="/demo" className="border-white text-white hover:bg-white hover:text-black">
                Agendar demo personalizada
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
