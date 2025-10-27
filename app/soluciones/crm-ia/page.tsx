import { FaChartLine, FaUsers, FaRobot, FaSync, FaCheckCircle, FaBrain, FaChartBar, FaLightbulb, FaDatabase, FaUserCheck, FaBolt, FaHandshake } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'CRM con IA | Gestión Inteligente de Clientes | NexGent',
  description: 'Sistema CRM potenciado con inteligencia artificial. Predicción de ventas, automatización inteligente, lead scoring y gestión optimizada de clientes.',
}

export default function CRMIAPage() {
  const features = [
    { icon: FaBrain, title: 'Predicción de ventas con IA', description: 'Algoritmos de machine learning que predicen qué leads tienen más probabilidad de convertir y cuándo cerrarán.' },
    { icon: FaUserCheck, title: 'Lead scoring automático', description: 'Calificación inteligente de leads basada en comportamiento, engagement, perfil y probabilidad de compra.' },
    { icon: FaBolt, title: 'Automatización inteligente', description: 'Workflows que se activan automáticamente según acciones del cliente, optimizados constantemente por IA.' },
    { icon: FaLightbulb, title: 'Recomendaciones inteligentes', description: 'IA que sugiere próximas acciones, momento óptimo de contacto y mejores estrategias de venta.' },
    { icon: FaDatabase, title: 'Enriquecimiento de datos', description: 'Recopilación automática de información de clientes desde múltiples fuentes y actualización continua.' },
    { icon: FaChartBar, title: 'Analytics predictivo avanzado', description: 'Dashboards con predicciones de revenue, análisis de tendencias y detección de oportunidades ocultas.' },
    { icon: FaSync, title: 'Integración omnicanal', description: 'Unifica todos los canales: email, WhatsApp, llamadas, web, redes sociales en una única vista del cliente.' },
    { icon: FaHandshake, title: 'Gestión de pipeline optimizada', description: 'Visualización clara del pipeline con recomendaciones de IA para mover deals más rápido al cierre.' },
  ]

  const benefits = [
    'Aumento del 200% en productividad del equipo de ventas',
    'Reducción del 70% en tareas administrativas manuales',
    'Predicciones de cierre con 95% de precisión',
    'Lead scoring automático que prioriza oportunidades reales',
    'Detección temprana de clientes en riesgo de churn',
    'Recomendaciones personalizadas para cada prospecto',
    'Seguimiento automático de interacciones en todos los canales',
    'Automatización de emails de seguimiento y recordatorios',
    'Segmentación inteligente de clientes por IA',
    'Reportes personalizados y exportables en tiempo real',
    'Integración con herramientas que ya usas',
    'ROI visible en menos de 30 días',
  ]

  const useCases = [
    { title: 'Equipos de Ventas B2B', description: 'Gestión de ciclos de venta largos, múltiples stakeholders, seguimiento de propuestas y automatización de nurturing.', impact: '+250% cierre deals' },
    { title: 'Ecommerce y Retail', description: 'Segmentación de clientes, campañas personalizadas, recuperación de carritos y programas de fidelización automatizados.', impact: '+180% repeat customers' },
    { title: 'Servicios Profesionales', description: 'Gestión de proyectos, facturación, seguimiento de clientes y oportunidades de upselling identificadas por IA.', impact: '+320% upsells' },
    { title: 'SaaS y Software', description: 'Onboarding automatizado, seguimiento de uso, detección de churn risk y expansión de cuentas.', impact: '92% retención' },
    { title: 'Inmobiliaria', description: 'Gestión de propiedades, seguimiento de visitas, matching automático cliente-propiedad y cierre de ventas.', impact: '+160% conversión' },
    { title: 'Educación y Formación', description: 'Gestión de leads, seguimiento de estudiantes, campañas de matrícula y programas de referidos.', impact: '+210% matrículas' },
  ]

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 rounded-full px-4 py-2 mb-6">
                  <FaChartLine className="text-green-600" />
                  <span className="text-sm font-semibold text-green-800">CRM Inteligente con IA</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  CRM que <span className="text-green-600">predice y vende</span> por ti
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Gestiona tus clientes con un <strong>CRM potenciado por IA</strong> que predice ventas, automatiza seguimientos, prioriza leads y optimiza cada interacción para maximizar conversiones.
                </p>
                <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    <strong className="text-green-600">El 79%</strong> de las empresas que usan CRM con IA reportan un aumento significativo en ventas en el primer trimestre.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Agenda tu demo
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver demo en vivo
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Setup en 30 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Sin tarjeta de crédito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Migración gratuita</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-bold text-xl mb-6">Pipeline de Ventas</h3>
                    <div className="space-y-4">
                      {[
                        { stage: 'Prospecto', count: 45, value: '€125K', color: 'bg-gray-200' },
                        { stage: 'Cualificado', count: 28, value: '€98K', color: 'bg-blue-200' },
                        { stage: 'Propuesta', count: 15, value: '€67K', color: 'bg-yellow-200' },
                        { stage: 'Negociación', count: 8, value: '€42K', color: 'bg-orange-200' },
                        { stage: 'Ganado', count: 12, value: '€89K', color: 'bg-green-200' },
                      ].map((stage, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">{stage.stage}</span>
                            <span className="text-sm text-gray-600">{stage.count} deals</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex-1 mr-4">
                              <div className={`h-2 ${stage.color} rounded-full`} style={{width: `${(stage.count / 45) * 100}%`}}></div>
                            </div>
                            <span className="font-bold text-green-600">{stage.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Revenue proyectado:</span>
                        <span className="text-2xl font-bold text-green-600">€421K</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Predicción IA con 95% precisión</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">+200% productividad</p>
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
                <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">200%</p>
                <p className="text-gray-300 text-sm md:text-base">Más productividad</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">70%</p>
                <p className="text-gray-300 text-sm md:text-base">Menos tareas manuales</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">95%</p>
                <p className="text-gray-300 text-sm md:text-base">Precisión predicciones</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">30d</p>
                <p className="text-gray-300 text-sm md:text-base">ROI visible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Inteligencia artificial que vende por ti</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Todo lo que necesitas para gestionar clientes, automatizar ventas y predecir resultados</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-2xl mb-4 group-hover:bg-green-500 group-hover:text-white transition-all">
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Perfecto para cualquier equipo de ventas</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Empresas de todos los tamaños están usando CRM con IA para multiplicar ventas</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-green-500 transition-all">
                  <h3 className="font-monda text-xl font-bold text-black mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{useCase.description}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-green-800">{useCase.impact}</p>
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye nuestro CRM con IA?</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">Una plataforma completa que transforma tu equipo de ventas en una máquina de cerrar deals.</p>
                <div className="space-y-3">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-green-300 transition-all">
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
                    <p className="text-5xl font-bold text-green-400 mb-2">€340K</p>
                    <p className="text-gray-300">Revenue adicional en 6 meses</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-green-400 mb-2">220%</p>
                    <p className="text-gray-300">Aumento en productividad del equipo</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-green-400 mb-2">68%</p>
                    <p className="text-gray-300">Reducción en ciclo de venta</p>
                  </div>
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Pasamos de un CRM básico al CRM con IA de NexGent y fue un cambio total. Las predicciones son increíblemente precisas, el equipo es mucho más productivo y cerramos deals que antes se nos escapaban. Revenue up 180%."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Miguel Ángel Torres, Director de Ventas en TechCorp</p>
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
              Vende más con inteligencia artificial
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Únete a las <strong className="text-green-400">+1,800 empresas</strong> que ya usan nuestro CRM con IA y descubre cómo IA puede transformar tu equipo de ventas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Agenda tu demo
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver demo completa
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Migración gratuita</span>
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
