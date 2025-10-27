import { FaCut, FaCalendarAlt, FaWhatsapp, FaStar, FaChartLine, FaCheckCircle, FaBell, FaUsers, FaClipboardList, FaMobileAlt, FaHeart, FaGem } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'IA para Salones de Belleza | Automatización Peluquerías | NexGent',
  description: 'Automatiza tu salón de belleza con agentes de IA. Reservas automáticas, recordatorios y atención 24/7 en WhatsApp. +40% reservas, -65% no-shows.',
}

export default function SalonesBellezaPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-pink-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-pink-100 border border-pink-300 rounded-full px-4 py-2 mb-6">
                  <FaCut className="text-pink-600" />
                  <span className="text-sm font-semibold text-pink-800">Salones de Belleza</span>
                </div>
                
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Tu salón <span className="text-pink-600">siempre lleno</span> con IA
                </h1>
                
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  IA que gestiona reservas, envía recordatorios y fideliza clientes automáticamente. <strong>+40% más reservas</strong>, -65% ausencias, atención 24/7 mientras tú te enfocas en lo que mejor haces: embellecer.
                </p>

                <div className="bg-white border-l-4 border-pink-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Salones de belleza pierden hasta <strong className="text-pink-600">€1,800/mes</strong> por no-shows y huecos sin llenar. La IA puede recuperar el 70% de estos ingresos.
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
                  {['Setup en 48h', 'Sin permanencia', 'Soporte 24/7'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Agenda de Hoy</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {label: 'Citas de hoy', value: '24'},
                        {label: 'Confirmadas', value: '23'},
                        {label: 'Ocupación', value: '96%'},
                        {label: 'Nuevos clientes', value: '5'},
                      ].map((metric, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-pink-100">{metric.label}</p>
                          <p className="text-3xl font-bold">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      {time: '10:00', client: 'María S.', service: 'Manicura', status: 'Confirmado'},
                      {time: '11:30', client: 'Laura G.', service: 'Corte + Color', status: 'Confirmado'},
                      {time: '13:00', client: 'Ana M.', service: 'Pedicura', status: 'Recordatorio enviado'},
                      {time: '16:00', client: 'Carmen R.', service: 'Tratamiento', status: 'Nueva reserva'},
                    ].map((appt, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center font-bold text-pink-600 text-sm">
                            {appt.time}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{appt.client}</p>
                            <p className="text-xs text-gray-600">{appt.service}</p>
                          </div>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">{appt.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-pink-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">+40% reservas</p>
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
                {value: '+40%', label: 'Aumento en reservas'},
                {value: '-65%', label: 'Reducción de no-shows'},
                {value: '24/7', label: 'Atención continua'},
                {value: '€1.9K', label: 'Ingresos extra/mes'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-pink-400 mb-2">{stat.value}</p>
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Solución completa para salones de belleza</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Automatización diseñada específicamente para peluquerías y centros de estética</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaCalendarAlt, title: 'Reservas automáticas 24/7', description: 'Tus clientes reservan desde WhatsApp en cualquier momento. Sin llamadas, sin esperas, sin perder reservas fuera de horario.'},
                {icon: FaBell, title: 'Recordatorios inteligentes', description: 'Sistema automático de confirmaciones y recordatorios por WhatsApp que reduce no-shows de 30% a 9%.'},
                {icon: FaWhatsapp, title: 'Atención WhatsApp', description: 'IA que responde consultas sobre servicios, precios, disponibilidad y productos 24/7 automáticamente.'},
                {icon: FaUsers, title: 'Gestión multi-profesional', description: 'Coordina agendas de múltiples profesionales, especialidades y salas automáticamente.'},
                {icon: FaGem, title: 'Upselling automático', description: 'Sugiere tratamientos complementarios y productos basándose en historial y preferencias del cliente.'},
                {icon: FaClipboardList, title: 'Historial de clientes', description: 'Base de datos inteligente con preferencias, historial de servicios y recordatorios de mantenimiento.'},
                {icon: FaMobileAlt, title: 'App para clientes', description: 'Aplicación donde clientes gestionan sus reservas, ven su historial y reciben promociones personalizadas.'},
                {icon: FaChartLine, title: 'Analytics detallado', description: 'Dashboard con ocupación por día/hora, servicios más solicitados, ingresos y oportunidades de mejora.'},
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-pink-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 text-2xl mb-4 group-hover:bg-pink-500 group-hover:text-white transition-all">
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
                {title: 'Agenda siempre llena', description: 'Disponibilidad 24/7 y recordatorios automáticos eliminan huecos. Ocupación pasa de 68% a 94%, maximizando ingresos diarios.', impact: '+40% más reservas'},
                {title: 'Menos no-shows', description: 'Confirmaciones y recordatorios por WhatsApp reducen ausencias de 30% a solo 9%, recuperando €1,900 mensuales en citas perdidas.', impact: '-68% ausencias'},
                {title: 'Clientes más fieles', description: 'Recordatorios de mantenimiento, promociones personalizadas y atención perfecta aumentan frecuencia de visita un 35%.', impact: '+35% retención'},
              ].map((result, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-pink-500 transition-all">
                  <h3 className="font-monda text-2xl font-bold text-black mb-4">{result.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{result.description}</p>
                  <div className="bg-pink-50 border border-pink-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-pink-800">{result.impact}</p>
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye para tu salón?</h2>
                <p className="text-lg text-gray-600 mb-8">Sistema completo para salones de belleza</p>
                <div className="space-y-3">
                  {[
                    'Sistema de reservas automático por WhatsApp',
                    'Recordatorios y confirmaciones personalizadas',
                    'Gestión de múltiples profesionales y servicios',
                    'App móvil para tus clientes',
                    'Base de datos de clientes con historial',
                    'Sugerencias automáticas de servicios complementarios',
                    'Integración con tu software de gestión',
                    'Campañas de fidelización automatizadas',
                    'Solicitud automática de valoraciones Google',
                    'Dashboard con analytics en tiempo real',
                    'Gestión de lista de espera inteligente',
                    'Soporte técnico especializado 24/7',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-pink-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Hello Nails Beauty Salon</h3>
                <div className="space-y-8">
                  {[
                    {value: '+42%', label: 'Aumento en reservas'},
                    {value: '-68%', label: 'Reducción no-shows'},
                    {value: '€2.1K', label: 'Ingresos extra mensuales'},
                    {value: '95%', label: 'Ocupación promedio'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-pink-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Antes perdíamos el 30% de citas por no-shows y teníamos huecos sin llenar. Ahora el sistema gestiona todo automáticamente: reservas, confirmaciones, recordatorios. Pasamos de 68% a 95% de ocupación. €2,100 más por mes solo optimizando la agenda. Increíble."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Teresa Messía, Propietaria Hello Nails</p>
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
              Lleva tu salón al siguiente nivel
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-pink-400">+640 salones de belleza</strong> ya automatizan su gestión con IA. Agenda siempre llena, menos no-shows, clientes más fieles.
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
              {['Sin permanencia', 'Setup en 48h', 'ROI en 3 semanas'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-pink-400" />
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
