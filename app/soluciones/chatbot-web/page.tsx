import { FaComments, FaRobot, FaClock, FaGlobe, FaCode, FaCheckCircle, FaChartLine, FaBolt, FaHeadset, FaDatabase, FaLaptopCode, FaUserFriends } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Chatbot Web con IA | Asistente Virtual para tu Sitio Web | NexGent',
  description: 'Asistente virtual inteligente para tu sitio web. Atiende visitantes 24/7, responde preguntas, califica leads y convierte más. Instalación en minutos.',
}

export default function ChatbotWebPage() {
  const features = [
    { icon: FaRobot, title: 'IA Conversacional Avanzada', description: 'Respuestas naturales, contextuales y personalizadas que se adaptan a cada visitante. Aprende de cada conversación.' },
    { icon: FaClock, title: 'Disponible 24/7/365', description: 'Nunca pierdas un lead. Tu chatbot atiende a cualquier hora, incluso cuando tú duermes. Sin vacaciones ni descansos.' },
    { icon: FaGlobe, title: 'Multi-idioma automático', description: 'Detecta el idioma del visitante y responde en más de 50 idiomas. Expande tu negocio sin barreras.' },
    { icon: FaCode, title: 'Integración en minutos', description: 'Instala con un solo código en tu web. Compatible con WordPress, Shopify, Wix y cualquier plataforma.' },
    { icon: FaChartLine, title: 'Analytics detallado', description: 'Dashboard completo con métricas: visitantes, conversaciones, leads generados, tasa de conversión y más.' },
    { icon: FaBolt, title: 'Respuestas instantáneas', description: 'Tiempo de respuesta < 1 segundo. Experiencia de usuario excepcional que mejora la retención.' },
    { icon: FaDatabase, title: 'Base de conocimiento personalizada', description: 'Entrena el chatbot con tu contenido: FAQs, productos, servicios, políticas. Respuestas 100% alineadas con tu negocio.' },
    { icon: FaHeadset, title: 'Transferencia a humano inteligente', description: 'Cuando sea necesario, transfiere la conversación a tu equipo con todo el contexto recopilado.' },
  ]

  const benefits = [
    'Conversión de visitantes en leads aumenta hasta un 300%',
    'Reducción del 85% en consultas repetitivas a tu equipo',
    'Coste 15 veces menor que un chat en vivo con operadores',
    'Captura de información de leads de forma automática y natural',
    'Integración con CRM, email marketing y herramientas de gestión',
    'Personalización total de diseño, colores y posición en tu web',
    'A/B testing automático para optimizar conversaciones',
    'Detección de intenciones y enrutamiento inteligente',
    'Generación automática de tickets de soporte',
    'Seguimiento de clientes potenciales que no convierten',
    'Proactive chat para visitantes en páginas clave',
    'Compatibilidad total con móviles, tablets y desktop',
  ]

  const useCases = [
    { title: 'Ecommerce y Tiendas Online', description: 'Ayuda con la navegación, recomienda productos, resuelve dudas sobre envíos y pagos. Recupera carritos abandonados.', impact: '+180% en conversión' },
    { title: 'SaaS y Software', description: 'Onboarding de nuevos usuarios, resolución de problemas técnicos, demos interactivas y calificación de leads.', impact: '70% menos support tickets' },
    { title: 'Servicios Profesionales', description: 'Agenda reuniones, responde FAQs sobre servicios, recopila información de proyectos y cualifica clientes potenciales.', impact: '+250% leads cualificados' },
    { title: 'Educación y Formación', description: 'Información sobre cursos, matrículas, precios, certificaciones. Guía a estudiantes potenciales en el proceso.', impact: '+60% inscripciones' },
    { title: 'Inmobiliarias', description: 'Información sobre propiedades, tours virtuales, agendamiento de visitas y pre-cualificación de compradores.', impact: '+45% visitas agendadas' },
    { title: 'Turismo y Hostelería', description: 'Reservas, información de servicios, recomendaciones personalizadas y atención al huésped 24/7.', impact: '+120% satisfacción' },
  ]

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 rounded-full px-4 py-2 mb-6">
                  <FaComments className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">Chatbot Web con IA</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Convierte <span className="text-blue-600">más visitantes</span> en clientes
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Integra un <strong>asistente virtual inteligente</strong> en tu sitio web que atiende visitantes 24/7, responde preguntas, califica leads y multiplica tus conversiones automáticamente.
                </p>
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    <strong className="text-blue-600">El 70%</strong> de los visitantes abandonan tu web porque no encuentran lo que buscan. Un chatbot soluciona esto.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Agenda tu demo
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver demos en vivo
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Instalación en 5 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Sin código requerido</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-t-2xl px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <FaRobot className="text-blue-600 text-xl" />
                      </div>
                      <div className="text-white">
                        <p className="font-bold">Asistente Virtual</p>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                          <p className="text-xs opacity-90">Online • Responde al instante</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-b-2xl space-y-4 max-h-96 overflow-y-auto">
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-sm">
                        <p className="text-sm text-gray-800">¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm">Quiero saber sobre vuestros precios</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-sm">
                        <p className="text-sm text-gray-800">¡Perfecto! Tenemos 3 planes adaptados a diferentes necesidades:</p>
                        <div className="mt-2 space-y-1 text-xs text-gray-700">
                          <p>• <strong>Starter:</strong> €99/mes - Ideal para pequeños negocios</p>
                          <p>• <strong>Professional:</strong> €249/mes - Lo más popular</p>
                          <p>• <strong>Enterprise:</strong> Personalizado - Para grandes empresas</p>
                        </div>
                        <p className="text-sm text-gray-800 mt-2">¿Te gustaría más información sobre alguno en particular?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm">Me interesa el Professional</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-sm">
                        <p className="text-sm text-gray-800">Excelente elección! 🎯 El plan Professional incluye:</p>
                        <ul className="text-xs text-gray-700 mt-2 space-y-1">
                          <li>✓ Conversaciones ilimitadas</li>
                          <li>✓ Integración con CRM</li>
                          <li>✓ Analytics avanzado</li>
                          <li>✓ Soporte prioritario 24/7</li>
                        </ul>
                        <p className="text-sm text-gray-800 mt-2">¿Quieres agendar una demo gratuita para verlo en acción?</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">+300% conversión</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">300%</p>
                <p className="text-gray-300 text-sm md:text-base">Más leads generados</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">&lt;1s</p>
                <p className="text-gray-300 text-sm md:text-base">Tiempo de respuesta</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">85%</p>
                <p className="text-gray-300 text-sm md:text-base">Menos consultas manuales</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">24/7</p>
                <p className="text-gray-300 text-sm md:text-base">Siempre disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Características principales</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Todo lo que necesitas para transformar tu web en una máquina de generar leads</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <feature.icon />
                  </div>
                  <h3 className="font-monda text-lg font-bold text-black mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Casos de uso que generan resultados</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Descubre cómo empresas están usando chatbots con IA para multiplicar conversiones</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500 transition-all">
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

      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye nuestro chatbot con IA?</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">Una solución <strong>completa y lista para usar</strong> que transforma tu web en una máquina de generar leads y ventas.</p>
                <div className="space-y-3">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-blue-300 transition-all">
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
                    <p className="text-5xl font-bold text-blue-400 mb-2">320%</p>
                    <p className="text-gray-300">Aumento en leads generados</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-blue-400 mb-2">85%</p>
                    <p className="text-gray-300">Reducción en consultas al soporte</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-blue-400 mb-2">€4.5K</p>
                    <p className="text-gray-300">Ahorro mensual vs chat en vivo</p>
                  </div>
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Implementamos el chatbot y los resultados fueron inmediatos. Las conversiones subieron un 280% y nuestro equipo se liberó de responder preguntas repetitivas. Mejor decisión del año."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Roberto Díaz, CEO de TechSolutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        <div className="container-custom px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-monda text-4xl md:text-6xl font-bold mb-6">
              Empieza a convertir más visitantes hoy
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Únete a las <strong className="text-blue-400">+1,200 empresas</strong> que ya usan nuestro chatbot con IA. Instalación en 5 minutos, sin código necesario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Agenda tu demo
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver demos en vivo
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-400" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-400" />
                <span>Instalación en 5 min</span>
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
