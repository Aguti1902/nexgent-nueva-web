import { FaDumbbell, FaCalendarCheck, FaUsers, FaChartLine, FaCheckCircle, FaBell, FaHeartbeat, FaMobileAlt, FaStar, FaClock, FaTrophy, FaUserFriends } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'IA para Gimnasios | Automatización Fitness | NexGent',
  description: 'Automatiza tu gimnasio con IA. Reservas de clases, seguimiento de miembros y atención 24/7. +90% ocupación, -60% no-shows, +45% retención.',
}

export default function GimnasiosPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-red-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-red-100 border border-red-300 rounded-full px-4 py-2 mb-6">
                  <FaDumbbell className="text-red-600" />
                  <span className="text-sm font-semibold text-red-800">Gimnasios & Fitness</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Tu gimnasio <span className="text-red-600">siempre lleno</span> con IA
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  IA que gestiona reservas de clases, envía recordatorios y motiva a tus socios automáticamente. <strong>+90% ocupación</strong>, -60% no-shows, +45% retención.
                </p>
                <div className="bg-white border-l-4 border-red-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Gimnasios pierden <strong className="text-red-600">€3.2K/mes</strong> por clases vacías y baja retención. IA puede recuperar el 80% de estos ingresos.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Solicita una demo
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver casos de éxito
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  {['Setup en 24h', 'App móvil incluida', 'Soporte 24/7'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Clases de Hoy</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-red-100">Total clases</p>
                        <p className="text-3xl font-bold">14</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-red-100">Asistentes</p>
                        <p className="text-3xl font-bold">287</p>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Ocupación media</span>
                        <span className="text-sm font-bold">92%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      {time: '10:00', class: 'Spinning', capacity: '20/20', status: 'Lleno', color: 'red'},
                      {time: '18:00', class: 'Yoga', capacity: '15/18', status: '3 plazas', color: 'yellow'},
                      {time: '19:00', class: 'CrossFit', capacity: '18/20', status: '2 plazas', color: 'yellow'},
                      {time: '20:00', class: 'Zumba', capacity: '22/25', status: '3 plazas', color: 'green'},
                    ].map((classItem, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-600 text-sm">
                            {classItem.time}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{classItem.class}</p>
                            <p className="text-xs text-gray-600">{classItem.capacity}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          classItem.color === 'red' ? 'bg-red-100 text-red-700' :
                          classItem.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>{classItem.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-red-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">92% ocupación</p>
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
              {[
                {value: '+90%', label: 'Ocupación de clases'},
                {value: '-60%', label: 'No-shows'},
                {value: '+45%', label: 'Retención de socios'},
                {value: '€3.8K', label: 'Ingresos extra/mes'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-red-400 mb-2">{stat.value}</p>
                  <p className="text-gray-300 text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Solución completa para gimnasios</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Automatización diseñada para centros fitness</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaCalendarCheck, title: 'Reservas automáticas', description: 'Tus socios reservan clases desde WhatsApp, app o web en cualquier momento. Sin límite de horario.'},
                {icon: FaBell, title: 'Recordatorios inteligentes', description: 'Sistema automático que recuerda clases 2h antes y reduce no-shows de 38% a 12%.'},
                {icon: FaMobileAlt, title: 'App personalizada', description: 'App móvil con tu marca donde socios gestionan reservas, ven horarios y reciben notificaciones.'},
                {icon: FaUsers, title: 'Gestión de listas de espera', description: 'Si una clase se llena, sistema gestiona lista de espera y notifica cuando hay cancelaciones.'},
                {icon: FaHeartbeat, title: 'Seguimiento de asistencia', description: 'Tracking automático de asistencia, patrones de uso y alertas de socios inactivos.'},
                {icon: FaTrophy, title: 'Programas de motivación', description: 'Mensajes automáticos de logros, recordatorios de objetivos y felicitaciones por constancia.'},
                {icon: FaStar, title: 'Encuestas automáticas', description: 'Solicitud automática de feedback tras clases y valoraciones para mejorar experiencia.'},
                {icon: FaChartLine, title: 'Analytics en tiempo real', description: 'Dashboard con ocupación por clase, horarios más populares, retención y predicciones.'},
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-red-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center text-red-600 text-2xl mb-4 group-hover:bg-red-500 group-hover:text-white transition-all">
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Beneficios medibles</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {title: 'Clases siempre llenas', description: 'Recordatorios automáticos reducen no-shows. Lista de espera inteligente llena plazas vacías al instante. Ocupación pasa de 62% a 90%+.', impact: '+90% ocupación clases'},
                {title: 'Retención mejorada', description: 'Sistema detecta socios inactivos y envía mensajes motivacionales automáticos. Reduce churn de 35% a 19%.', impact: '+45% retención socios'},
                {title: 'Gestión automatizada', description: 'Tu equipo deja de gestionar reservas manualmente. Sistema lo hace 24/7 automáticamente, liberando 20h/semana.', impact: '20h semanales ahorradas'},
              ].map((benefit, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-red-500 transition-all">
                  <h3 className="font-monda text-2xl font-bold text-black mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-red-800">{benefit.impact}</p>
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye el sistema?</h2>
                <p className="text-lg text-gray-600 mb-8">Solución completa para tu gimnasio</p>
                <div className="space-y-3">
                  {[
                    'Sistema de reservas automático 24/7',
                    'App móvil personalizada con tu marca',
                    'Recordatorios automáticos por WhatsApp/SMS',
                    'Gestión inteligente de listas de espera',
                    'Tracking automático de asistencia',
                    'Detección de socios inactivos con alertas',
                    'Mensajes motivacionales automatizados',
                    'Integración con tu sistema de gestión',
                    'Dashboard con analytics en tiempo real',
                    'Encuestas de satisfacción automáticas',
                    'Sistema de notificaciones push',
                    'Soporte técnico prioritario 24/7',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-red-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">FitPro Gym</h3>
                <div className="space-y-8">
                  {[
                    {value: '94%', label: 'Ocupación de clases'},
                    {value: '-65%', label: 'Reducción no-shows'},
                    {value: '+52%', label: 'Mejora en retención'},
                    {value: '€4.2K', label: 'Ingresos extra mensuales'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-red-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Teníamos 62% de ocupación en clases y 35% de churn anual. Con la IA llegamos a 94% de ocupación, el churn bajó a 18% y los socios están más comprometidos. Recuperamos €4.2K mensuales en plazas que antes quedaban vacías. ROI en 3 semanas."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Sandra Morales, Directora FitPro Gym</p>
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
              Optimiza tu gimnasio hoy
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-red-400">+410 gimnasios</strong> ya maximizan ocupación y retención con IA. Clases llenas, socios motivados, gestión automatizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Agenda tu demo gratuita
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver casos reales
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              {['Sin permanencia', 'Setup en 24h', 'App incluida'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-red-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
