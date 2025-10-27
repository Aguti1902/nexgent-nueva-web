import { FaPhoneAlt, FaMicrophone, FaClock, FaChartBar, FaLanguage, FaCheckCircle, FaRobot, FaUserTie, FaHeadset, FaBrain, FaVolumeUp, FaFileAlt } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Llamadas con IA | Agentes de Voz Inteligentes 24/7 | NexGent',
  description: 'Agentes de voz con IA que gestionan llamadas telefónicas de forma natural y humana. Atención al cliente, ventas y reservas 24/7 sin tiempos de espera.',
}

export default function LlamadasIAPage() {
  const features = [
    {
      icon: FaMicrophone,
      title: 'Voz 100% natural e indistinguible',
      description: 'Conversaciones fluidas que suenan completamente humanas. Tus clientes no notarán la diferencia. Entonación, pausas y emociones realistas.',
    },
    {
      icon: FaClock,
      title: 'Cero tiempos de espera',
      description: 'Atiende miles de llamadas simultáneas sin colas ni tiempos de espera. Cada cliente recibe atención inmediata, sin excepciones.',
    },
    {
      icon: FaLanguage,
      title: 'Más de 50 idiomas disponibles',
      description: 'Soporte nativo en más de 50 idiomas con detección automática. Expande tu negocio a mercados internacionales sin barreras lingüísticas.',
    },
    {
      icon: FaChartBar,
      title: 'Analítica y transcripciones completas',
      description: 'Transcripciones automáticas de cada llamada, análisis de sentimientos, palabras clave y métricas detalladas para optimizar tu estrategia.',
    },
    {
      icon: FaBrain,
      title: 'Comprensión contextual avanzada',
      description: 'Entiende el contexto, las intenciones y las emociones del cliente. Adapta las respuestas según el historial y preferencias de cada persona.',
    },
    {
      icon: FaUserTie,
      title: 'Transferencia inteligente a humanos',
      description: 'Si es necesario, transfiere la llamada a tu equipo con todo el contexto y resumen de la conversación. Continuidad perfecta.',
    },
    {
      icon: FaVolumeUp,
      title: 'Personalización de voz y tono',
      description: 'Elige entre múltiples voces, acentos y tonos. Configura la personalidad del agente para que se alinee perfectamente con tu marca.',
    },
    {
      icon: FaFileAlt,
      title: 'Integración con CRM y sistemas',
      description: 'Conecta con tu CRM, calendario, base de datos y sistemas de gestión. Automatización completa del flujo de trabajo.',
    },
  ]

  const useCases = [
    {
      title: 'Atención al Cliente 24/7',
      description: 'Resuelve consultas, gestiona incidencias, proporciona información de productos y servicios. Tu agente nunca se cansa ni necesita descansos.',
      impact: '92% de satisfacción del cliente',
    },
    {
      title: 'Cualificación de Leads',
      description: 'Realiza llamadas salientes para cualificar leads, detectar oportunidades de venta y programar reuniones con tu equipo comercial.',
      impact: '+250% en leads cualificados',
    },
    {
      title: 'Gestión de Citas y Reservas',
      description: 'Agenda, confirma, reprograma y cancela citas automáticamente. Envía recordatorios y reduce no-shows al mínimo.',
      impact: '75% menos no-shows',
    },
    {
      title: 'Encuestas y Feedback',
      description: 'Realiza encuestas de satisfacción, recopila feedback y genera informes detallados. Mejora continua basada en datos reales.',
      impact: '10x más respuestas que email',
    },
    {
      title: 'Ventas y Upselling',
      description: 'Detecta oportunidades de venta cruzada y upselling. Cierra ventas directamente por teléfono con scripts optimizados.',
      impact: '+180% en ventas telefónicas',
    },
    {
      title: 'Soporte Técnico',
      description: 'Diagnóstico de problemas, guías paso a paso y resolución de incidencias técnicas comunes. Escalamiento automático si es necesario.',
      impact: '80% de casos resueltos sin humanos',
    },
  ]

  const benefits = [
    'Reducción del 70% en costes operativos de call center',
    'Aumento del 300% en capacidad de atención simultánea',
    'Tiempo de respuesta de 0 segundos, sin colas ni esperas',
    'Disponibilidad 24/7/365 sin costes adicionales',
    'Transcripciones y grabaciones de todas las llamadas',
    'Análisis de sentimientos y detección de intenciones',
    'Integración con CRM, ERP y herramientas de gestión',
    'Personalización completa de scripts y flujos',
    'Escalabilidad infinita sin contratar personal',
    'Métricas en tiempo real y reportes automáticos',
    'Sin días de baja, vacaciones ni rotación de personal',
    'ROI positivo en menos de 2 meses',
  ]

  const comparisonData = [
    { aspect: 'Disponibilidad', traditional: 'Lunes a Viernes 9:00-18:00', withAI: '24/7/365 sin excepciones' },
    { aspect: 'Capacidad', traditional: '1 agente = 20-30 llamadas/día', withAI: 'Llamadas simultáneas ilimitadas' },
    { aspect: 'Tiempo de espera', traditional: '2-10 minutos de media', withAI: '0 segundos' },
    { aspect: 'Coste mensual', traditional: '€2,000-€3,000 por agente', withAI: 'Desde €299/mes ilimitado' },
    { aspect: 'Formación', traditional: '2-4 semanas + reciclajes', withAI: 'Configuración en 24h, listo para usar' },
    { aspect: 'Consistencia', traditional: 'Variable según agente y estado', withAI: 'Perfecta en el 100% de llamadas' },
    { aspect: 'Escalabilidad', traditional: 'Contratar y formar personal', withAI: 'Instantánea y sin coste adicional' },
    { aspect: 'Idiomas', traditional: 'Limitado a idiomas del equipo', withAI: '+50 idiomas sin coste extra' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 rounded-full px-4 py-2 mb-6">
                  <FaPhoneAlt className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">Agentes de Voz con IA</span>
                </div>
                
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Llamadas telefónicas <span className="text-blue-600">100% automáticas</span> y naturales
                </h1>
                
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Atiende <strong>todas tus llamadas</strong> con agentes de voz inteligentes que suenan humanos. Gestión de consultas, agendamiento de citas, cualificación de leads y ventas. Todo de forma automática, 24/7, sin tiempos de espera.
                </p>

                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    <strong className="text-blue-600">El 85%</strong> de tus clientes prefiere hablar por teléfono. ¿Estás disponible cuando te llaman?
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Prueba una llamada demo ahora
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver casos de éxito
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Configuración en 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Llamadas ilimitadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Sin permanencia</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8 text-white">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                        <FaPhoneAlt className="text-2xl" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Llamada en curso</p>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <p className="text-sm text-gray-400">Agente IA - 2:34 min</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-800 rounded-xl p-4">
                        <p className="text-xs text-gray-400 mb-1">🎙️ Cliente:</p>
                        <p className="text-white">"Hola, quiero agendar una cita para el viernes"</p>
                      </div>
                      
                      <div className="bg-blue-600 rounded-xl p-4">
                        <p className="text-xs text-blue-200 mb-1">🤖 Agente IA:</p>
                        <p className="text-white">"¡Perfecto! Tengo disponibilidad el viernes a las 10:00 y a las 16:00. ¿Cuál prefieres?"</p>
                      </div>

                      <div className="bg-gray-800 rounded-xl p-4">
                        <p className="text-xs text-gray-400 mb-1">🎙️ Cliente:</p>
                        <p className="text-white">"A las 10:00 está bien"</p>
                      </div>

                      <div className="bg-blue-600 rounded-xl p-4">
                        <p className="text-xs text-blue-200 mb-1">🤖 Agente IA:</p>
                        <p className="text-white">"Genial! Te he agendado para el viernes 10:00. Te enviaré un recordatorio 24h antes. ¿Necesitas algo más?"</p>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 py-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">95% tasa de éxito</p>
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
                <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">0s</p>
                <p className="text-gray-300 text-sm md:text-base">Tiempo de espera</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">95%</p>
                <p className="text-gray-300 text-sm md:text-base">Tasa de resolución</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">24/7</p>
                <p className="text-gray-300 text-sm md:text-base">Siempre disponible</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">50+</p>
                <p className="text-gray-300 text-sm md:text-base">Idiomas soportados</p>
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
                Tecnología de voz más avanzada del mercado
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Utilizamos los modelos de IA más potentes para crear conversaciones telefónicas indistinguibles de un humano real
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all">
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
                Casos de uso que generan resultados inmediatos
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubre cómo las empresas están usando agentes de voz con IA para automatizar procesos y aumentar ingresos
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500 transition-all duration-300">
                  <h3 className="font-monda text-xl font-bold text-black mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{useCase.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-blue-800">{useCase.impact}</p>
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
                  ¿Qué incluye nuestro agente de voz con IA?
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Una solución <strong>completa y lista para usar</strong> que transforma tu atención telefónica. Sin hardware, sin instalaciones complejas, sin complicaciones.
                </p>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-blue-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Resultados reales</h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-5xl font-bold text-blue-400 mb-2">250%</p>
                    <p className="text-gray-300">Más leads cualificados mensualmente</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-blue-400 mb-2">70%</p>
                    <p className="text-gray-300">Reducción en costes operativos</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-blue-400 mb-2">0s</p>
                    <p className="text-gray-300">Tiempo de espera para los clientes</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-blue-400 mb-2">€4.5K</p>
                    <p className="text-gray-300">Ahorro mensual vs call center tradicional</p>
                  </div>
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">
                      "Implementamos los agentes de voz con IA y los resultados han sido increíbles. Nuestros clientes reciben atención inmediata a cualquier hora, y hemos aumentado nuestras ventas telefónicas un 180%. La inversión se recuperó en menos de un mes."
                    </p>
                    <p className="text-sm text-gray-400 font-semibold">
                      — Carlos Rodríguez, Director Comercial en AutoSpain (Concesionario)
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
                Call Center tradicional vs. Agente de Voz con IA
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compara y descubre por qué las empresas más innovadoras están migrando a la IA
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="bg-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 text-lg">Aspecto</h3>
                </div>
                <div className="bg-red-50 p-6">
                  <h3 className="font-bold text-red-900 text-lg">Call Center Tradicional</h3>
                </div>
                <div className="bg-blue-50 p-6">
                  <h3 className="font-bold text-blue-900 text-lg">Con IA de NexGent</h3>
                </div>
              </div>
              
              {comparisonData.map((item, index) => (
                <div key={index} className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-t border-gray-200">
                  <div className="p-6 bg-white font-semibold text-gray-900">
                    {item.aspect}
                  </div>
                  <div className="p-6 bg-red-50/30">
                    <p className="text-gray-700">{item.traditional}</p>
                  </div>
                  <div className="p-6 bg-blue-50/30">
                    <p className="text-gray-900 font-medium">{item.withAI}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-gray-800 text-lg">
                <strong className="text-blue-700">ROI garantizado:</strong> Con Agentes de Voz IA ahorras un promedio de <strong>€4,500/mes</strong> en costes operativos mientras multiplicas tu capacidad de atención. El retorno de inversión se alcanza en menos de 1 mes.
              </p>
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
              Experimenta el futuro de las llamadas telefónicas
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-blue-400">+800 empresas</strong> ya confían en nuestros agentes de voz con IA. Agenda una demo y habla con nuestro agente en vivo. Te sorprenderá lo natural que suena.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Prueba una llamada demo ahora
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver más casos de éxito
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-400" />
                <span>Configuración en 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-400" />
                <span>Sin permanencia</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-400" />
                <span>Llamadas ilimitadas</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-400" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
