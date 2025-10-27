import { FaGraduationCap, FaUsers, FaCalendarCheck, FaEnvelope, FaCheckCircle, FaBell, FaClipboardList, FaChartLine, FaWhatsapp, FaComments, FaMobileAlt, FaFileAlt } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'IA para Centros Educativos | Automatización Educativa | NexGent',
  description: 'Automatiza tu centro educativo con IA. Matrículas, comunicación con padres y gestión administrativa. -80% carga admin, +60% satisfacción padres.',
}

export default function EducacionPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-violet-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-violet-100 border border-violet-300 rounded-full px-4 py-2 mb-6">
                  <FaGraduationCap className="text-violet-600" />
                  <span className="text-sm font-semibold text-violet-800">Centros Educativos</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Más tiempo para <span className="text-violet-600">educar</span>, no administrar
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  IA que gestiona matrículas, comunica con padres y automatiza tareas administrativas. <strong>-80% carga admin</strong>, +60% satisfacción padres, comunicación perfecta.
                </p>
                <div className="bg-white border-l-4 border-violet-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Centros educativos gastan <strong className="text-violet-600">35+ horas semanales</strong> en tareas admin que la IA puede hacer mejor y más rápido.
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
                  {['Setup en 48h', 'RGPD educativo', 'Soporte 24/7'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-violet-500 to-violet-600 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Gestión del Centro - Hoy</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {label: 'Alumnos activos', value: '487'},
                        {label: 'Nuevas matrículas', value: '28'},
                        {label: 'Mensajes enviados', value: '142'},
                        {label: 'Satisfacción', value: '4.7⭐'},
                      ].map((metric, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-violet-100">{metric.label}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaClipboardList className="text-green-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Matrícula completada</p>
                          <p className="text-xs text-gray-700 mt-1">Familia García - Documentación verificada automáticamente</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaWhatsapp className="text-blue-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Aviso enviado</p>
                          <p className="text-xs text-gray-700 mt-1">142 padres notificados sobre reunión trimestral</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaBell className="text-purple-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Recordatorio automático</p>
                          <p className="text-xs text-gray-700 mt-1">Pago de actividades extraescolares pendientes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-violet-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">-80% carga admin</p>
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
                {value: '-80%', label: 'Carga administrativa'},
                {value: '+60%', label: 'Satisfacción de padres'},
                {value: '100%', label: 'Comunicación efectiva'},
                {value: '35h', label: 'Ahorradas semanalmente'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-violet-400 mb-2">{stat.value}</p>
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Automatización completa para centros educativos</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">IA diseñada específicamente para el sector educativo</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaClipboardList, title: 'Gestión de matrículas', description: 'Proceso automatizado: solicitud online, verificación de documentos, pagos y confirmación sin intervención manual.'},
                {icon: FaWhatsapp, title: 'Comunicación con padres', description: 'Avisos automáticos sobre eventos, ausencias, pagos, reuniones y notas directamente por WhatsApp.'},
                {icon: FaBell, title: 'Recordatorios inteligentes', description: 'Sistema que recuerda pagos, reuniones, autorizaciones pendientes y fechas importantes automáticamente.'},
                {icon: FaUsers, title: 'Gestión de consultas', description: 'IA que responde dudas frecuentes de padres sobre horarios, actividades, menú, calendario, etc.'},
                {icon: FaCalendarCheck, title: 'Reserva de tutorías', description: 'Padres agendan tutorías con profesores automáticamente según disponibilidad, sin llamadas ni emails.'},
                {icon: FaMobileAlt, title: 'App para padres', description: 'Aplicación donde padres acceden a notas, asistencia, avisos, calendario y pueden comunicarse con el centro.'},
                {icon: FaFileAlt, title: 'Documentación automática', description: 'Generación automática de autorizaciones, informes, certificados y envío personalizado a cada familia.'},
                {icon: FaChartLine, title: 'Analytics educativo', description: 'Dashboard con métricas de asistencia, rendimiento por grupo, satisfacción de familias y alertas tempranas.'},
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-violet-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 text-2xl mb-4 group-hover:bg-violet-500 group-hover:text-white transition-all">
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Impacto en educación</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {title: 'Menos administración', description: 'Matrículas, pagos, avisos y documentación gestionados automáticamente. Equipo se enfoca en educación, no en papeles.', impact: '35h semanales ahorradas'},
                {title: 'Familias más felices', description: 'Comunicación instantánea, transparencia total, gestiones desde el móvil. Satisfacción de padres sube de 72% a 92%.', impact: '+60% satisfacción'},
                {title: 'Más matrículas', description: 'Proceso de matriculación sin fricciones, respuesta inmediata a consultas y mejor reputación online atrae más familias.', impact: '+45% nuevas matrículas'},
              ].map((result, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-violet-500 transition-all">
                  <h3 className="font-monda text-2xl font-bold text-black mb-4">{result.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{result.description}</p>
                  <div className="bg-violet-50 border border-violet-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-violet-800">{result.impact}</p>
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye para tu centro?</h2>
                <p className="text-lg text-gray-600 mb-8">Plataforma completa para gestión educativa</p>
                <div className="space-y-3">
                  {[
                    'Sistema de matrículas online automatizado',
                    'WhatsApp Business para comunicación con padres',
                    'App móvil personalizada para familias',
                    'Gestión automática de pagos y recordatorios',
                    'Reserva de tutorías sin intervención manual',
                    'Generación automática de documentos',
                    'Integración con tu sistema de gestión escolar',
                    'Avisos y notificaciones multicanal',
                    'Dashboard con analytics en tiempo real',
                    'Gestión de autorizaciones digitales',
                    'Cumplimiento RGPD sector educativo',
                    'Soporte técnico especializado 24/7',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-violet-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Colegio Innovación</h3>
                <div className="space-y-8">
                  {[
                    {value: '-85%', label: 'Reducción carga admin'},
                    {value: '92%', label: 'Satisfacción de familias'},
                    {value: '+52%', label: 'Aumento matrículas'},
                    {value: '38h', label: 'Tiempo ahorrado semanalmente'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-violet-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Antes gastábamos 38 horas semanales en matrículas, avisos y consultas de padres. Ahora todo es automático: matrículas online, avisos por WhatsApp, tutorías que se agendan solas. El equipo se enfoca en educar. La satisfacción de familias subió de 72% a 92%."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Marta Jiménez, Directora Colegio Innovación</p>
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
              Moderniza tu centro educativo
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-violet-400">+270 centros educativos</strong> ya automatizan su gestión con IA. Menos admin, más educación, familias más felices.
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
              {['Sin permanencia', 'Setup en 48h', 'Cumplimiento RGPD'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-violet-400" />
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
