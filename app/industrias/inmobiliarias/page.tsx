import { FaHome, FaCalendarCheck, FaWhatsapp, FaKey, FaCheckCircle, FaUserCheck, FaSearch, FaChartLine, FaPhoneAlt, FaClipboardList, FaBell, FaStar } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'IA para Inmobiliarias | Automatización Inmobiliaria | NexGent',
  description: 'Automatiza tu agencia inmobiliaria con IA. Gestión de visitas, cualificación de leads y atención 24/7. +180% más visitas, -75% tiempo de gestión.',
}

export default function InmobiliariasPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-teal-100 border border-teal-300 rounded-full px-4 py-2 mb-6">
                  <FaHome className="text-teal-600" />
                  <span className="text-sm font-semibold text-teal-800">Inmobiliarias</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  <span className="text-teal-600">Cierra</span> más operaciones con IA
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  IA que califica leads automáticamente, coordina visitas 24/7 y hace seguimiento inteligente. <strong>+180% más visitas gestionadas</strong>, -75% tiempo en tareas admin.
                </p>
                <div className="bg-white border-l-4 border-teal-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Agentes inmobiliarios gastan <strong className="text-teal-600">60% de su tiempo</strong> en tareas que puede hacer la IA: coordinación, seguimiento y cualificación.
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
                  {['Setup en 48h', 'Integración CRM', 'Soporte 24/7'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Gestión de Leads - Hoy</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {label: 'Nuevos leads', value: '24'},
                        {label: 'Cualificados', value: '18'},
                        {label: 'Visitas agendadas', value: '12'},
                        {label: 'Tasa conversión', value: '75%'},
                      ].map((metric, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-teal-100">{metric.label}</p>
                          <p className="text-3xl font-bold">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      {name: 'Carlos M.', property: 'Piso Centro', budget: '€280K', status: 'Visita agendada', color: 'green'},
                      {name: 'Laura G.', property: 'Chalet Afueras', budget: '€450K', status: 'Cualificado', color: 'blue'},
                      {name: 'Antonio R.', property: 'Ático Mar', budget: '€380K', status: 'Interés alto', color: 'purple'},
                      {name: 'Isabel P.', property: 'Estudio Universitario', budget: '€140K', status: 'Descartado', color: 'gray'},
                    ].map((lead, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-sm text-gray-900">{lead.name}</p>
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            lead.color === 'green' ? 'bg-green-100 text-green-700' :
                            lead.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            lead.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>{lead.status}</span>
                        </div>
                        <p className="text-xs text-gray-600">{lead.property} • {lead.budget}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-teal-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">+180% visitas</p>
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
                {value: '+180%', label: 'Más visitas gestionadas'},
                {value: '-75%', label: 'Tiempo de gestión'},
                {value: '100%', label: 'Leads cualificados'},
                {value: '+65%', label: 'Cierres exitosos'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">{stat.value}</p>
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Automatización completa para inmobiliarias</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">IA diseñada específicamente para el sector inmobiliario</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaUserCheck, title: 'Cualificación automática', description: 'IA que evalúa leads en segundos: presupuesto, urgencia, preferencias y probabilidad de cierre.'},
                {icon: FaCalendarCheck, title: 'Coordinación de visitas', description: 'Agenda visitas 24/7 coordinando disponibilidad de cliente, agente y propietario automáticamente.'},
                {icon: FaWhatsapp, title: 'Atención inmediata', description: 'Responde consultas sobre propiedades, ubicación, precio y características por WhatsApp al instante.'},
                {icon: FaPhoneAlt, title: 'Llamadas automáticas', description: 'Agente de voz IA que contacta leads, califica interés y agenda visitas por teléfono.'},
                {icon: FaBell, title: 'Seguimiento inteligente', description: 'Sistema automático de follow-ups por WhatsApp y email basado en comportamiento del lead.'},
                {icon: FaSearch, title: 'Búsqueda personalizada', description: 'IA que recomienda propiedades basándose en preferencias y presupuesto del cliente.'},
                {icon: FaClipboardList, title: 'Gestión documental', description: 'Automatiza envío de contratos, documentación y formularios con recordatorios de firma.'},
                {icon: FaChartLine, title: 'Analytics de rendimiento', description: 'Dashboard con métricas de conversión por agente, fuente de leads y tipo de propiedad.'},
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-teal-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 text-2xl mb-4 group-hover:bg-teal-500 group-hover:text-white transition-all">
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Impacto real en tu agencia</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {title: 'Más visitas efectivas', description: 'Cualificación automática filtra leads sin interés real. Tu equipo solo atiende clientes con alta probabilidad de cierre, optimizando tiempo.', impact: '+180% visitas cualificadas'},
                {title: 'Respuesta instantánea', description: 'El 78% de leads contacta a múltiples agencias. El primero en responder tiene 238% más probabilidad de cerrar. IA responde en 8 segundos.', impact: '238% ventaja competitiva'},
                {title: 'Seguimiento perfecto', description: 'Ningún lead se olvida. IA hace seguimiento automático en el momento óptimo según comportamiento e interés del cliente.', impact: '+65% tasa de cierre'},
              ].map((result, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-teal-500 transition-all">
                  <h3 className="font-monda text-2xl font-bold text-black mb-4">{result.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{result.description}</p>
                  <div className="bg-teal-50 border border-teal-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-teal-800">{result.impact}</p>
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye para tu agencia?</h2>
                <p className="text-lg text-gray-600 mb-8">Sistema completo para inmobiliarias</p>
                <div className="space-y-3">
                  {[
                    'Agente IA para WhatsApp y web 24/7',
                    'Cualificación automática de leads',
                    'Coordinación de visitas inteligente',
                    'Agente de voz para llamadas automáticas',
                    'Sistema de seguimiento personalizado',
                    'Integración con tu CRM inmobiliario',
                    'Recomendaciones de propiedades IA',
                    'Gestión documental automatizada',
                    'Base de datos de clientes inteligente',
                    'Dashboard con analytics en tiempo real',
                    'Campañas automáticas de remarketing',
                    'Soporte técnico especializado 24/7',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-teal-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Inmobiliaria Premium</h3>
                <div className="space-y-8">
                  {[
                    {value: '+220%', label: 'Aumento en visitas'},
                    {value: '€45K', label: 'Comisiones adicionales/mes'},
                    {value: '-80%', label: 'Tiempo en admin'},
                    {value: '72%', label: 'Tasa de cierre'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-teal-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Antes coordinaba visitas manualmente todo el día. Ahora la IA cualifica, agenda y hace seguimiento. Visitas subieron 220%, solo atiendo clientes cualificados. Cerramos 72% de visitas vs 38% antes. La mejor inversión que hicimos."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Javier Martínez, Director Inmobiliaria Premium</p>
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
              Cierra más operaciones cada mes
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-teal-400">+280 inmobiliarias</strong> ya automatizan su gestión con IA. Más visitas cualificadas, menos admin, más cierres.
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
              {['Sin permanencia', 'Setup en 48h', 'Integración CRM'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-teal-400" />
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
