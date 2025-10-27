import { FaTooth, FaCalendarAlt, FaWhatsapp, FaBell, FaChartLine, FaCheckCircle, FaClock, FaUserMd, FaHeartbeat, FaStar, FaClipboardList, FaComments } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'IA para Clínicas Dentales | Automatización Dental | NexGent',
  description: 'Automatiza tu clínica dental con agentes de IA. Reservas, recordatorios y atención 24/7. Reduce no-shows un 70% y aumenta la satisfacción del paciente.',
}

export default function ClinicasDentalesPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 rounded-full px-4 py-2 mb-6">
                  <FaTooth className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">Clínicas Dentales</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Tu clínica dental, <span className="text-blue-600">más eficiente</span> con IA
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Automatiza citas, recordatorios y atención al paciente. <strong>Reduce no-shows un 70%</strong>, libera tiempo de tu equipo y mejora la experiencia de tus pacientes con tecnología inteligente.
                </p>
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Las clínicas dentales pierden hasta <strong className="text-blue-600">€2,800/mes</strong> por citas perdidas. La IA puede reducir esto en un 70%.
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
                  {['Implementación en 48h', 'Integración GDPR', 'Soporte 24/7'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Panel de Gestión - Hoy</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {label: 'Citas de hoy', value: '18'},
                        {label: 'Confirmadas', value: '17'},
                        {label: 'Tasa ocupación', value: '94%'},
                        {label: 'No-shows', value: '0'},
                      ].map((metric, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-blue-100">{metric.label}</p>
                          <p className="text-3xl font-bold">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      {time: '09:00', name: 'María García', type: 'Limpieza', status: 'Confirmado'},
                      {time: '10:30', name: 'Juan López', type: 'Ortodoncia', status: 'Confirmado'},
                      {time: '12:00', name: 'Ana Martínez', type: 'Revisión', status: 'Recordatorio enviado'},
                      {time: '14:30', name: 'Pedro Sánchez', type: 'Implante', status: 'Confirmado'},
                    ].map((appt, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
                            {appt.time}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{appt.name}</p>
                            <p className="text-xs text-gray-600">{appt.type}</p>
                          </div>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">{appt.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">-70% no-shows</p>
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
                {value: '-70%', label: 'Reducción de no-shows'},
                {value: '+50%', label: 'Más citas gestionadas'},
                {value: '24/7', label: 'Atención continua'},
                {value: '€2.8K', label: 'Ahorro mensual'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stat.value}</p>
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Soluciones completas para clínicas dentales</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Automatización inteligente diseñada específicamente para el sector dental</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaCalendarAlt, title: 'Gestión de citas 24/7', description: 'Reservas automáticas por WhatsApp, web o teléfono. Los pacientes agendan cuando quieran, sin esperar.'},
                {icon: FaBell, title: 'Recordatorios inteligentes', description: 'Confirmaciones y recordatorios automáticos por WhatsApp, SMS y email que reducen no-shows un 70%.'},
                {icon: FaUserMd, title: 'Información pre-consulta', description: 'Envío automático de formularios, consentimientos y preparaciones antes de cada cita.'},
                {icon: FaClipboardList, title: 'Historial y seguimiento', description: 'Registro automático de citas, tratamientos y próximas revisiones para cada paciente.'},
                {icon: FaComments, title: 'Atención al paciente IA', description: 'Responde dudas sobre tratamientos, precios, ubicación y horarios automáticamente.'},
                {icon: FaStar, title: 'Solicitud de valoraciones', description: 'Pide reviews automáticamente a pacientes satisfechos para mejorar tu reputación online.'},
                {icon: FaHeartbeat, title: 'Recordatorios revisión', description: 'Notificaciones automáticas de revisiones semestrales y limpiezas para fidelizar pacientes.'},
                {icon: FaChartLine, title: 'Analytics y reportes', description: 'Dashboard con métricas de ocupación, no-shows, tipos de tratamiento y rendimiento de la clínica.'},
              ].map((feature, idx) => (
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Beneficios medibles para tu clínica</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {title: 'Ahorro de tiempo', description: 'Tu equipo deja de gestionar citas manualmente. El sistema gestiona reservas, confirmaciones y cambios automáticamente, liberando 15+ horas semanales.', impact: '15h semanales ahorradas'},
                {title: 'Más ingresos', description: 'Reduce no-shows de 30% a 9%, optimiza huecos en agenda y aumenta ocupación. Esto se traduce en €2,800+ mensuales adicionales.', impact: '+€2.8K ingresos/mes'},
                {title: 'Mejor experiencia paciente', description: 'Reservas instantáneas 24/7, recordatorios oportunos, respuestas rápidas. Aumenta satisfacción un 85% y genera más referencias.', impact: '+85% satisfacción'},
              ].map((benefit, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500 transition-all">
                  <h3 className="font-monda text-2xl font-bold text-black mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-blue-800">{benefit.impact}</p>
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye para tu clínica?</h2>
                <p className="text-lg text-gray-600 mb-8">Sistema completo diseñado para el sector dental</p>
                <div className="space-y-3">
                  {[
                    'Agente IA que gestiona citas por WhatsApp, web y llamadas',
                    'Sistema de recordatorios multi-canal automático',
                    'Envío de formularios y consentimientos pre-consulta',
                    'Gestión de lista de espera inteligente',
                    'Integración con tu software de gestión dental',
                    'Respuestas automáticas a preguntas frecuentes',
                    'Solicitud automática de valoraciones Google',
                    'Dashboard con métricas y reportes en tiempo real',
                    'Recordatorios de revisiones semestrales',
                    'Gestión de múltiples dentistas y especialidades',
                    'Cumplimiento GDPR y protección de datos sanitarios',
                    'Soporte técnico especializado 24/7',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-blue-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Clínica Dental Pro</h3>
                <div className="space-y-8">
                  {[
                    {value: '-72%', label: 'Reducción en no-shows'},
                    {value: '+54', label: 'Citas adicionales/mes'},
                    {value: '€3.2K', label: 'Ingresos extra mensuales'},
                    {value: '18h', label: 'Tiempo ahorrado semanalmente'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-blue-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Pasamos de perder 30% de las citas por no-shows a solo un 8%. El sistema gestiona todo automáticamente y nuestro equipo puede enfocarse en los pacientes. Los ingresos aumentaron €3,200 mensuales solo optimizando la agenda."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Dra. Laura Sánchez, Directora Clínica Dental Pro</p>
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
              Optimiza tu clínica hoy
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-blue-400">+350 clínicas dentales</strong> ya automatizan su gestión con IA. Reduce no-shows, aumenta ingresos y mejora la experiencia de tus pacientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Agenda tu demo gratuita
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver casos de éxito
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              {['Sin permanencia', 'Setup en 48h', 'Cumplimiento GDPR'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-400" />
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
