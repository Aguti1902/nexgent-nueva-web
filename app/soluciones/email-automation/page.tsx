import { FaEnvelope, FaRocket, FaChartLine, FaUsers, FaClock, FaCheckCircle, FaBolt, FaDatabase, FaAd, FaMailBulk, FaUserCheck, FaChartBar } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Email Automation con IA | Marketing Email Inteligente | NexGent',
  description: 'Automatiza tus campañas de email marketing con inteligencia artificial. Segmentación inteligente, personalización automática y 3x más conversiones.',
}

export default function EmailAutomationPage() {
  const features = [
    { icon: FaBolt, title: 'Envío en el momento perfecto', description: 'IA que analiza cuándo cada contacto está más activo y envía emails en el momento óptimo para maximizar apertura y clics.' },
    { icon: FaUserCheck, title: 'Segmentación inteligente automática', description: 'Crea segmentos dinámicos basados en comportamiento, intereses, ubicación, historial de compras y más. Todo automático.' },
    { icon: FaRocket, title: 'Personalización a escala', description: 'Cada email se personaliza automáticamente con nombre, productos recomendados, contenido relevante. Como si fuera 1 a 1.' },
    { icon: FaChartLine, title: 'Optimización automática A/B', description: 'La IA prueba automáticamente asuntos, contenidos y CTAs para encontrar la combinación ganadora y aplicarla.' },
    { icon: FaDatabase, title: 'Lead scoring predictivo', description: 'Identifica automáticamente qué leads tienen más probabilidad de convertir y prioriza el seguimiento.' },
    { icon: FaClock, title: 'Flujos automatizados complejos', description: 'Crea secuencias multi-paso basadas en acciones: bienvenida, carritos abandonados, re-engagement, upsell y más.' },
    { icon: FaAd, title: 'Templates profesionales incluidos', description: 'Más de 200 plantillas diseñadas profesionalmente y optimizadas para conversión. Responsive y customizables.' },
    { icon: FaChartBar, title: 'Analytics y reportes avanzados', description: 'Dashboard completo con métricas en tiempo real: open rate, CTR, conversiones, revenue generado y más.' },
  ]

  const benefits = [
    'Aumento del 180% en tasa de apertura vs emails genéricos',
    'Incremento del 240% en conversiones gracias a personalización',
    'Reducción del 90% en tiempo de gestión manual de campañas',
    'Segmentación automática que se actualiza en tiempo real',
    'Recuperación de carritos abandonados con 45% de conversión',
    'Reactivación automática de clientes inactivos',
    'Integración con CRM, ecommerce y herramientas de marketing',
    'Compliance total con RGPD y regulaciones anti-spam',
    'Limpieza automática de lista (bounce, unsubscribe)',
    'Pruebas A/B automáticas en cada campaña',
    'Recomendaciones de productos basadas en IA',
    'ROI tracking detallado de cada campaña',
  ]

  const useCases = [
    { title: 'Ecommerce', description: 'Carritos abandonados, recomendaciones de productos, ofertas personalizadas, cross-sell y upsell automático.', impact: '+280% en revenue' },
    { title: 'SaaS', description: 'Onboarding automático, feature announcements, reactivación de usuarios inactivos y renovaciones.', impact: '+65% retención' },
    { title: 'Servicios B2B', description: 'Nurturing de leads, educación del prospecto, casos de éxito personalizados y seguimiento post-venta.', impact: '+340% leads cualificados' },
    { title: 'Educación Online', description: 'Secuencias de bienvenida, recordatorios de clases, contenido educativo personalizado y promociones.', impact: '+90% engagement' },
    { title: 'Inmobiliaria', description: 'Alertas de nuevas propiedades, seguimiento personalizado, tours virtuales y contenido de valor.', impact: '+120% visitas' },
    { title: 'Hostelería', description: 'Confirmaciones de reserva, ofertas especiales, upsell de servicios y feedback post-estancia.', impact: '+85% repetición' },
  ]

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-300 rounded-full px-4 py-2 mb-6">
                  <FaEnvelope className="text-purple-600" />
                  <span className="text-sm font-semibold text-purple-800">Email Marketing con IA</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Emails que se <span className="text-purple-600">leen y convierten</span>
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  <strong>Automatiza tu email marketing con IA</strong> que personaliza cada mensaje, encuentra el momento perfecto para enviar y optimiza constantemente para maximizar conversiones.
                </p>
                <div className="bg-white border-l-4 border-purple-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    <strong className="text-purple-600">Por cada €1</strong> invertido en email marketing, el retorno promedio es de <strong>€42</strong>. El mejor ROI de todos los canales.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Agenda tu demo
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver resultados reales
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Sin tarjeta de crédito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Setup en minutos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Sin permanencia</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">Campaña Activa</h3>
                        <span className="bg-white text-purple-600 text-xs font-bold px-3 py-1 rounded-full">EN VIVO</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-purple-100">Emails enviados:</span>
                          <span className="font-bold">12,458</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-100">Tasa de apertura:</span>
                          <span className="font-bold">68.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-100">Click rate:</span>
                          <span className="font-bold">24.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-100">Conversiones:</span>
                          <span className="font-bold">892</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-purple-400">
                          <span className="text-purple-100">Revenue generado:</span>
                          <span className="font-bold text-2xl">€18,450</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Próximos envíos automáticos</h4>
                      <div className="space-y-3">
                        {[
                          { campaign: 'Carrito abandonado', scheduled: 'Hoy, 18:00', status: 'ready' },
                          { campaign: 'Newsletter semanal', scheduled: 'Mañana, 10:00', status: 'ready' },
                          { campaign: 'Reactivación inactivos', scheduled: 'Miércoles, 16:00', status: 'optimizing' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                            <div>
                              <p className="font-medium text-sm text-gray-900">{item.campaign}</p>
                              <p className="text-xs text-gray-500">{item.scheduled}</p>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${item.status === 'ready' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-purple-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">ROI: 42x</p>
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
                <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">180%</p>
                <p className="text-gray-300 text-sm md:text-base">Más aperturas</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">240%</p>
                <p className="text-gray-300 text-sm md:text-base">Más conversiones</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">90%</p>
                <p className="text-gray-300 text-sm md:text-base">Menos tiempo de gestión</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">42x</p>
                <p className="text-gray-300 text-sm md:text-base">ROI promedio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Automatización inteligente con IA</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Todo lo que necesitas para campañas de email que realmente convierten</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-2xl mb-4 group-hover:bg-purple-500 group-hover:text-white transition-all">
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Casos de uso que multiplican resultados</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Descubre cómo empresas están usando email automation para disparar ventas</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-purple-500 transition-all">
                  <h3 className="font-monda text-xl font-bold text-black mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{useCase.description}</p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-purple-800">{useCase.impact}</p>
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye nuestra plataforma?</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">Todo lo que necesitas para crear, automatizar y optimizar campañas de email que convierten.</p>
                <div className="space-y-3">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-purple-300 transition-all">
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
                    <p className="text-5xl font-bold text-purple-400 mb-2">€127K</p>
                    <p className="text-gray-300">Revenue generado en 3 meses</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-purple-400 mb-2">68%</p>
                    <p className="text-gray-300">Tasa de apertura promedio</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-purple-400 mb-2">42x</p>
                    <p className="text-gray-300">ROI de las campañas</p>
                  </div>
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Pasamos de campañas genéricas a emails ultra-personalizados con IA. Las conversiones se multiplicaron por 3 y ahorramos 20 horas semanales. El ROI es brutal."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Ana Martínez, CMO de FashionStyle</p>
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
              Transforma tu email marketing hoy
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Únete a las <strong className="text-purple-400">+2,500 empresas</strong> que ya automatizan sus campañas con IA. Sin tarjeta de crédito para empezar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Agenda tu demo
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver casos de éxito
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-purple-400" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-purple-400" />
                <span>Setup en minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-purple-400" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
