import { FaBell, FaClock, FaCalendarCheck, FaMobile, FaCheckCircle, FaWhatsapp, FaSms, FaEnvelope, FaChartLine, FaUserClock, FaBolt, FaSync } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Recordatorios Inteligentes con IA | Sistema Automático | NexGent',
  description: 'Sistema automático de recordatorios personalizados que reduce ausencias un 75%. WhatsApp, SMS y email en el momento perfecto.',
}

export default function RecordatoriosPage() {
  const features = [
    { icon: FaBell, title: 'Multi-canal automático', description: 'Envía recordatorios por WhatsApp, SMS y email. La IA elige el canal óptimo según preferencias del cliente.' },
    { icon: FaClock, title: 'Timing perfecto', description: 'IA que determina el momento ideal para enviar recordatorios basándose en comportamiento histórico de cada cliente.' },
    { icon: FaBolt, title: 'Personalización inteligente', description: 'Cada recordatorio se personaliza automáticamente con nombre, servicio, ubicación y detalles relevantes.' },
    { icon: FaSync, title: 'Secuencias automáticas', description: 'Crea múltiples recordatorios escalonados (72h, 24h, 2h antes) que se ajustan automáticamente.' },
  ]

  const benefits = [
    'Reducción del 75% en no-shows y ausencias',
    'Aumento del 45% en satisfacción del cliente',
    'Ahorro de 12+ horas semanales en llamadas manuales',
    'Recordatorios por WhatsApp, SMS y email',
    'Confirmación automática de asistencia',
    'Reprogramación fácil directamente desde el mensaje',
    'Recordatorios de seguimiento post-servicio',
    'Encuestas de satisfacción automatizadas',
    'Integración total con tu calendario y CRM',
    'Estadísticas detalladas de tasas de respuesta',
    'Reducción de costes operativos en 60%',
    'ROI positivo desde el primer mes',
  ]

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-yellow-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 rounded-full px-4 py-2 mb-6">
                  <FaBell className="text-yellow-600" />
                  <span className="text-sm font-semibold text-yellow-800">Recordatorios Inteligentes</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Reduce <span className="text-yellow-600">no-shows</span> un 75%
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Sistema de <strong>recordatorios automáticos e inteligentes</strong> que envía notificaciones personalizadas por WhatsApp, SMS y email en el momento perfecto. Nunca más pierdas dinero por ausencias.
                </p>
                <div className="bg-white border-l-4 border-yellow-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Cada no-show te cuesta un promedio de <strong className="text-yellow-600">€85</strong>. Los recordatorios automáticos recuperan ese dinero.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Solicita una demo
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver resultados
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Setup en 15 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Sin permanencia</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <FaWhatsapp className="text-3xl" />
                        <div>
                          <p className="font-bold">WhatsApp</p>
                          <p className="text-xs text-green-100">Enviado 24h antes</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-gray-900">
                        <p className="text-sm">Hola María! 👋</p>
                        <p className="text-sm mt-2">Te recordamos tu cita de mañana:</p>
                        <div className="bg-gray-50 rounded-lg p-3 mt-2 text-xs">
                          <p><strong>📅 Día:</strong> Martes 28 de Octubre</p>
                          <p><strong>🕐 Hora:</strong> 16:30</p>
                          <p><strong>💇 Servicio:</strong> Corte y color</p>
                          <p><strong>📍 Lugar:</strong> Calle Mayor 15</p>
                        </div>
                        <p className="text-sm mt-2">¿Confirmas tu asistencia?</p>
                        <div className="flex gap-2 mt-2">
                          <button className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-xs font-bold">✓ Confirmo</button>
                          <button className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded text-xs">Reprogramar</button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-sm">Estadísticas del mes</h4>
                        <span className="text-xs text-gray-500">Octubre 2024</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-2xl font-bold text-yellow-600">92%</p>
                          <p className="text-xs text-gray-600">Tasa de confirmación</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-2xl font-bold text-green-600">-73%</p>
                          <p className="text-xs text-gray-600">Reducción no-shows</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">€4.2K ahorrados/mes</p>
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
                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">-75%</p>
                <p className="text-gray-300 text-sm md:text-base">Reducción no-shows</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">+45%</p>
                <p className="text-gray-300 text-sm md:text-base">Satisfacción cliente</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">12h</p>
                <p className="text-gray-300 text-sm md:text-base">Ahorradas por semana</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">100%</p>
                <p className="text-gray-300 text-sm md:text-base">Automatización</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Recordatorios que realmente funcionan</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Sistema completo con inteligencia artificial para eliminar ausencias</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-yellow-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 text-2xl mb-4 group-hover:bg-yellow-500 group-hover:text-white transition-all">
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

      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye el sistema?</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">Todo lo que necesitas para eliminar ausencias y optimizar tu agenda.</p>
                <div className="space-y-3">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-yellow-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Caso de éxito</h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-5xl font-bold text-yellow-400 mb-2">€5.8K</p>
                    <p className="text-gray-300">Recuperados mensualmente</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-yellow-400 mb-2">78%</p>
                    <p className="text-gray-300">Reducción en ausencias</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-yellow-400 mb-2">14h</p>
                    <p className="text-gray-300">Ahorradas semanalmente</p>
                  </div>
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Antes perdíamos un 35% de citas por no-shows. Con los recordatorios automáticos de NexGent, bajamos al 8%. Eso se traduce en casi €6K más al mes. Increíble."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Patricia González, Propietaria de Wellness Spa</p>
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
              Nunca más pierdas dinero por ausencias
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Únete a las <strong className="text-yellow-400">+900 empresas</strong> que ya recuperan miles de euros mensuales con recordatorios automáticos y ve los resultados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Agenda tu demo
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver más casos
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-yellow-400" />
                <span>Sin permanencia</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-yellow-400" />
                <span>Setup en 15 min</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-yellow-400" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
