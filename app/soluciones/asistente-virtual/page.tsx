import { FaRobot, FaBrain, FaComments, FaChartLine, FaCheckCircle, FaBolt, FaGlobe, FaHeadset, FaTasks, FaClipboardCheck, FaUserCog, FaLightbulb } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Asistente Virtual con IA Personalizado | NexGent',
  description: 'Agente de IA personalizado para tu negocio. Automatiza tareas, aprende de tu empresa y mejora continuamente. Ahorra 20+ horas semanales.',
}

export default function AsistenteVirtualPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-300 rounded-full px-4 py-2 mb-6">
                  <FaRobot className="text-purple-600" />
                  <span className="text-sm font-semibold text-purple-800">Asistente Virtual Personalizado</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Tu asistente <span className="text-purple-600">que aprende</span> y evoluciona
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Agente de IA <strong>100% personalizado</strong> que aprende de tu negocio, automatiza tareas repetitivas y se convierte en el empleado más productivo de tu equipo.
                </p>
                <div className="bg-white border-l-4 border-purple-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Un asistente virtual puede ahorrar un promedio de <strong className="text-purple-600">22 horas semanales</strong> por empleado en tareas administrativas.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Crea tu asistente
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver ejemplos
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  {['100% personalizado', 'Aprende continuo', 'Sin permanencia'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white mb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                        <FaRobot className="text-purple-600 text-2xl" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Tu Asistente IA</p>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                          <p className="text-xs text-purple-100">Siempre activo</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>✓ Procesando 45 tareas pendientes</p>
                      <p>✓ Respondiendo 12 consultas</p>
                      <p>✓ Analizando datos de ventas</p>
                      <p>✓ Generando reporte mensual</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      {task: 'Gestión de emails', status: '28 emails procesados', progress: 90},
                      {task: 'Seguimiento clientes', status: '15 contactos realizados', progress: 75},
                      {task: 'Reportes automáticos', status: '3 informes generados', progress: 100},
                    ].map((item, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-sm">{item.task}</span>
                          <span className="text-xs text-gray-600">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: `${item.progress}%`}}></div>
                        </div>
                        <p className="text-xs text-gray-600">{item.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-purple-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">+150% productividad</p>
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
                {value: '22h', label: 'Ahorradas por semana'},
                {value: '90%', label: 'Ahorro en tareas'},
                {value: '24/7', label: 'Disponibilidad'},
                {value: '+150%', label: 'Productividad'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">{stat.value}</p>
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Capacidades de tu asistente virtual</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Un agente que se adapta perfectamente a tu negocio y evoluciona con él</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaBrain, title: 'Aprende de tu negocio', description: 'Se entrena con tu información, procesos y forma de trabajar. Mejora continuamente con cada interacción.'},
                {icon: FaTasks, title: 'Automatiza tareas repetitivas', description: 'Gestión de emails, seguimiento de clientes, generación de reportes, actualización de datos y más.'},
                {icon: FaGlobe, title: 'Multi-idioma y multi-canal', description: 'Comunica en cualquier idioma y gestiona múltiples canales: email, WhatsApp, web, llamadas.'},
                {icon: FaHeadset, title: 'Atención al cliente 24/7', description: 'Responde consultas, resuelve problemas y escala a humanos solo cuando es necesario.'},
                {icon: FaClipboardCheck, title: 'Gestión de proyectos', description: 'Seguimiento de tareas, recordatorios, deadlines y coordinación de equipo automática.'},
                {icon: FaChartLine, title: 'Análisis y reporting', description: 'Genera informes, analiza datos, detecta patrones y proporciona insights accionables.'},
                {icon: FaLightbulb, title: 'Recomendaciones inteligentes', description: 'Sugiere acciones, optimizaciones y oportunidades basadas en IA y datos históricos.'},
                {icon: FaUserCog, title: 'Personalización total', description: 'Adapta su tono, procesos y flujos a tu marca y necesidades específicas del negocio.'},
              ].map((feature, idx) => (
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Casos de uso que transforman equipos</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {title: 'Equipos de Ventas', description: 'Seguimiento automático de leads, recordatorios de follow-ups, actualización de CRM y generación de propuestas.', impact: '+280% en follow-ups'},
                {title: 'Atención al Cliente', description: 'Respuestas a consultas frecuentes, gestión de tickets, escalamiento inteligente y encuestas automáticas.', impact: '85% auto-resolución'},
                {title: 'Marketing y Contenido', description: 'Programación de publicaciones, análisis de métricas, generación de reportes y sugerencias de contenido.', impact: '+200% productividad'},
                {title: 'Recursos Humanos', description: 'Gestión de candidatos, onboarding automatizado, respuestas a empleados y organización de entrevistas.', impact: '70% menos tiempo'},
                {title: 'Finanzas y Admin', description: 'Procesamiento de facturas, recordatorios de pagos, generación de reportes financieros y conciliaciones.', impact: '90% automatización'},
                {title: 'Operaciones', description: 'Coordinación de equipo, gestión de inventario, seguimiento de pedidos y optimización de procesos.', impact: '+180% eficiencia'},
              ].map((useCase, idx) => (
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye tu asistente virtual?</h2>
                <p className="text-lg text-gray-600 mb-8">Un agente completo que se convierte en tu empleado más valioso</p>
                <div className="space-y-3">
                  {[
                    'Entrenamiento personalizado con tu información y procesos',
                    'Automatización de tareas repetitivas y administrativas',
                    'Gestión multi-canal: email, WhatsApp, llamadas, web',
                    'Aprendizaje continuo que mejora con cada interacción',
                    'Integración con tus herramientas actuales (CRM, ERP, etc)',
                    'Dashboard con métricas y análisis de productividad',
                    'Actualizaciones y mejoras automáticas',
                    'Soporte prioritario 24/7 para tu asistente',
                    'Personalización total de tono y personalidad',
                    'Escalabilidad sin límites',
                    'Cumplimiento RGPD y seguridad de datos',
                    'ROI visible en menos de 2 semanas',
                  ].map((benefit, idx) => (
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
                  {[
                    {value: '25h', label: 'Ahorradas semanalmente por empleado'},
                    {value: '€8.2K', label: 'Ahorro mensual en costes operativos'},
                    {value: '180%', label: 'Aumento en productividad del equipo'},
                    {value: '92%', label: 'Satisfacción del equipo con el asistente'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-purple-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Nuestro asistente virtual gestiona el 80% de las consultas rutinarias, el equipo se puede enfocar en tareas de alto valor. La productividad subió un 180% y el ambiente laboral mejoró notablemente."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Elena Ruiz, COO de Digital Solutions</p>
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
              Tu equipo, potenciado con IA
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-purple-400">+1,500 empresas</strong> ya tienen su asistente virtual. Agenda una demo y conoce a tu futuro empleado más productivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Crea tu asistente ahora
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver ejemplos reales
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              {['Sin permanencia', 'Setup en 48h', 'Soporte 24/7'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-purple-400" />
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
