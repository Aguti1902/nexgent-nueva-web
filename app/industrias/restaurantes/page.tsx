import { FaUtensils, FaCalendarAlt, FaWhatsapp, FaPhoneAlt, FaChartLine, FaCheckCircle, FaClipboardCheck, FaUsers, FaStar, FaClock, FaConciergeBell, FaBell } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'IA para Restaurantes | Automatización Hostelería | NexGent',
  description: 'Automatiza reservas y pedidos en tu restaurante con agentes de IA. Atención 24/7, gestión inteligente. +60% más reservas, -80% tiempo de gestión.',
}

export default function RestaurantesPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-orange-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-300 rounded-full px-4 py-2 mb-6">
                  <FaUtensils className="text-orange-600" />
                  <span className="text-sm font-semibold text-orange-800">Restaurantes</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Tu restaurante, <span className="text-orange-600">siempre lleno</span> con IA
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Automatiza reservas, pedidos y consultas con IA. <strong>+60% más reservas mensuales</strong>, reduce tiempo de gestión un 80% y ofrece atención 24/7 sin aumentar personal.
                </p>
                <div className="bg-white border-l-4 border-orange-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Los restaurantes con gestión automatizada aumentan reservas un <strong className="text-orange-600">+62%</strong> y reducen cancelaciones un 48%.
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
                  {['Integración inmediata', 'Multi-idioma', 'Soporte 24/7'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Reservas de Hoy</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-orange-100">Total reservas</p>
                        <p className="text-3xl font-bold">47</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-orange-100">Comensales</p>
                        <p className="text-3xl font-bold">168</p>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Ocupación</span>
                        <span className="text-sm font-bold">93%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '93%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      {time: '13:30', name: 'Carlos M.', guests: '4 personas', status: 'Confirmado'},
                      {time: '14:00', name: 'Laura G.', guests: '2 personas', status: 'Confirmado'},
                      {time: '20:30', name: 'Antonio R.', guests: '6 personas', status: 'Nueva reserva'},
                      {time: '21:00', name: 'Isabel P.', guests: '3 personas', status: 'Recordatorio enviado'},
                    ].map((reservation, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600 text-sm">
                            {reservation.time}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{reservation.name}</p>
                            <p className="text-xs text-gray-600">{reservation.guests}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          reservation.status === 'Nueva reserva' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>{reservation.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">+60% reservas</p>
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
                {value: '+60%', label: 'Más reservas mensuales'},
                {value: '-80%', label: 'Tiempo en gestión'},
                {value: '24/7', label: 'Disponibilidad total'},
                {value: '-48%', label: 'Cancelaciones'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">{stat.value}</p>
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Solución completa para hostelería</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Automatización diseñada específicamente para restaurantes</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaCalendarAlt, title: 'Reservas automáticas 24/7', description: 'Tus clientes reservan por WhatsApp, web, Google o llamada en cualquier momento, sin esperas.'},
                {icon: FaBell, title: 'Recordatorios y confirmaciones', description: 'Sistema automático de confirmaciones y recordatorios que reduce cancelaciones un 48%.'},
                {icon: FaPhoneAlt, title: 'Atención telefónica IA', description: 'Agente de voz que gestiona llamadas, responde dudas y toma reservas mientras tu equipo atiende mesas.'},
                {icon: FaConciergeBell, title: 'Gestión de pedidos', description: 'Acepta pedidos a domicilio o para llevar directamente por WhatsApp con menú digital interactivo.'},
                {icon: FaUsers, title: 'Gestión de capacidad', description: 'Optimización automática de mesas, turnos y ocupación para maximizar comensales diarios.'},
                {icon: FaClipboardCheck, title: 'Lista de espera inteligente', description: 'Gestiona automáticamente la lista de espera y notifica cuando hay mesas disponibles.'},
                {icon: FaStar, title: 'Reseñas automáticas', description: 'Solicitud automática de valoraciones en Google y TripAdvisor a clientes satisfechos.'},
                {icon: FaChartLine, title: 'Analytics detallado', description: 'Dashboard con métricas de ocupación, reservas, horarios pico, clientes recurrentes y más.'},
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 text-2xl mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all">
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Resultados comprobados</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {title: 'Más reservas', description: 'Disponibilidad 24/7 significa que nunca pierdes una reserva. Clientes reservan desde WhatsApp, Google o web en cualquier momento, incluso fuera de horario.', impact: '+62% reservas mensuales'},
                {title: 'Menos cancelaciones', description: 'Recordatorios automáticos 24h antes reducen no-shows. Si alguien cancela, el sistema notifica a la lista de espera inmediatamente.', impact: '-48% cancelaciones'},
                {title: 'Equipo liberado', description: 'Tu equipo deja de gestionar reservas por teléfono y puede enfocarse en la experiencia del cliente en el local. Ahorra 15+ horas semanales.', impact: '15h semanales ahorradas'},
              ].map((result, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-orange-500 transition-all">
                  <h3 className="font-monda text-2xl font-bold text-black mb-4">{result.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{result.description}</p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-orange-800">{result.impact}</p>
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
                <p className="text-lg text-gray-600 mb-8">Solución completa para la gestión de tu restaurante</p>
                <div className="space-y-3">
                  {[
                    'Agente IA para WhatsApp, web, Google y llamadas',
                    'Gestión automática de reservas y modificaciones',
                    'Sistema de confirmaciones y recordatorios',
                    'Gestión inteligente de mesas y capacidad',
                    'Lista de espera automática con notificaciones',
                    'Menú digital para pedidos a domicilio',
                    'Integración con Google My Business',
                    'Multi-idioma para turistas',
                    'Solicitud automática de reseñas',
                    'Dashboard con métricas en tiempo real',
                    'Gestión de eventos y grupos grandes',
                    'Soporte prioritario 24/7',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-orange-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Restaurante La Terrazza</h3>
                <div className="space-y-8">
                  {[
                    {value: '+68%', label: 'Aumento en reservas'},
                    {value: '€8.4K', label: 'Ingresos extra mensuales'},
                    {value: '-52%', label: 'Menos cancelaciones'},
                    {value: '18h', label: 'Tiempo ahorrado semanalmente'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-orange-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Antes perdíamos reservas por no contestar el teléfono en hora pico. Ahora todo es automático: WhatsApp, web, Google. Las reservas subieron 68%, ocupación al 90% y mi equipo puede enfocarse en el servicio. ROI en 3 semanas."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Miguel Ángel Torres, Propietario La Terrazza</p>
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
              Llena tu restaurante cada día
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-orange-400">+570 restaurantes</strong> ya automatizan su gestión con IA. Más reservas, menos cancelaciones, equipo liberado.
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
              {['Sin permanencia', 'Setup en 24h', 'Soporte 24/7'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-orange-400" />
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
