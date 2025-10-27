import { FaBuilding, FaCalendarCheck, FaChartLine, FaUsers, FaCheckCircle, FaUserCheck, FaPhoneAlt, FaBrain, FaHandshake, FaClock, FaBell, FaStar } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'IA para Consultoría | Automatización Consultoras | NexGent',
  description: 'Automatiza tu consultoría con agentes de IA. Calificación de leads, agendamiento y seguimiento automático. +250% leads cualificados, -85% tiempo admin.',
}

export default function ConsultoriaPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-300 rounded-full px-4 py-2 mb-6">
                  <FaBuilding className="text-slate-700" />
                  <span className="text-sm font-semibold text-slate-800">Consultoría</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  <span className="text-slate-700">Enfócate</span> en cerrar, no en admin
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  IA que califica leads automáticamente, agenda reuniones inteligentemente y hace seguimiento perfecto. <strong>+250% leads cualificados</strong>, -85% tiempo admin, +160% reuniones.
                </p>
                <div className="bg-white border-l-4 border-slate-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Consultores gastan <strong className="text-slate-700">70% de su tiempo</strong> en tareas admin que la IA hace mejor, más rápido y sin descanso.
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
                  {['Setup en 24h', 'Integración CRM', 'ROI inmediato'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Pipeline - Esta Semana</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {label: 'Leads entrantes', value: '87'},
                        {label: 'Cualificados IA', value: '42'},
                        {label: 'Reuniones agendadas', value: '28'},
                        {label: 'Tasa conversión', value: '68%'},
                      ].map((metric, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-slate-100">{metric.label}</p>
                          <p className="text-3xl font-bold">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      {company: 'TechCorp SL', value: '€45K', status: 'Reunión agendada', color: 'green'},
                      {company: 'Innovation Labs', value: '€78K', status: 'Cualificado - Alto', color: 'blue'},
                      {company: 'Digital Partners', value: '€32K', status: 'Seguimiento IA', color: 'purple'},
                      {company: 'StartupHub', value: '€12K', status: 'No cualificado', color: 'gray'},
                    ].map((lead, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-sm text-gray-900">{lead.company}</p>
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            lead.color === 'green' ? 'bg-green-100 text-green-700' :
                            lead.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            lead.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>{lead.status}</span>
                        </div>
                        <p className="text-xs text-gray-600">Valor potencial: {lead.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-slate-700 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">+250% leads</p>
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
                {value: '+250%', label: 'Leads cualificados'},
                {value: '-85%', label: 'Tiempo administrativo'},
                {value: '+160%', label: 'Reuniones agendadas'},
                {value: '72%', label: 'Tasa de cierre'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-slate-400 mb-2">{stat.value}</p>
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">IA para consultorías de alto rendimiento</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Automatización que libera a tu equipo para lo que importa: cerrar deals</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaUserCheck, title: 'Cualificación automática', description: 'IA evalúa leads en 30 segundos: presupuesto, urgencia, fit con tu servicio, decisores involucrados.'},
                {icon: FaCalendarCheck, title: 'Agendamiento inteligente', description: 'Coordinación automática de reuniones considerando disponibilidad, zona horaria y prioridad del lead.'},
                {icon: FaPhoneAlt, title: 'Llamadas con IA', description: 'Agente de voz que contacta leads, hace discovery calls y agenda reuniones con consultores senior.'},
                {icon: FaBell, title: 'Seguimiento perfecto', description: 'Sistema que hace follow-up en el momento óptimo, nunca olvida un lead y personaliza cada mensaje.'},
                {icon: FaBrain, title: 'Propuestas automáticas', description: 'IA genera propuestas comerciales personalizadas basándose en necesidades detectadas del cliente.'},
                {icon: FaHandshake, title: 'Gestión de pipeline', description: 'Actualización automática de CRM, predicción de cierre y alertas de oportunidades que requieren acción.'},
                {icon: FaClock, title: 'Respuesta inmediata', description: 'Primer contacto en menos de 2 minutos, 24/7. El 78% de leads elige quien responde primero.'},
                {icon: FaChartLine, title: 'Analytics predictivo', description: 'Dashboard con predicción de revenue, mejores fuentes de leads y optimización de proceso comercial.'},
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-slate-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 text-2xl mb-4 group-hover:bg-slate-700 group-hover:text-white transition-all">
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Impacto en consultorías</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {title: 'Solo leads cualificados', description: 'IA filtra leads sin presupuesto, urgencia o fit. Tu equipo solo habla con clientes potenciales reales, optimizando tiempo.', impact: '+280% productividad ventas'},
                {title: 'Pipeline siempre lleno', description: 'Respuesta instantánea 24/7 y seguimiento perfecto capturan más leads y los maduran automáticamente hasta estar listos para cerrar.', impact: '+160% reuniones agendadas'},
                {title: 'Cierres más rápidos', description: 'Proceso automatizado acelera el ciclo de venta. Leads avanzan en pipeline sin fricción y consultores cierran más deals.', impact: '45% menos tiempo ciclo'},
              ].map((result, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-slate-500 transition-all">
                  <h3 className="font-monda text-2xl font-bold text-black mb-4">{result.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{result.description}</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-slate-800">{result.impact}</p>
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye para tu consultoría?</h2>
                <p className="text-lg text-gray-600 mb-8">Sistema completo para consultoras</p>
                <div className="space-y-3">
                  {[
                    'Cualificación automática de leads con IA',
                    'Agente de voz para discovery calls',
                    'Agendamiento inteligente de reuniones',
                    'Sistema de seguimiento personalizado',
                    'Integración con tu CRM',
                    'Generación automática de propuestas',
                    'Respuesta instantánea 24/7',
                    'Actualización automática de pipeline',
                    'Recordatorios de follow-ups',
                    'Dashboard con predicción de revenue',
                    'Analytics de fuentes y conversión',
                    'Soporte técnico especializado',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-slate-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Strategy Consulting Group</h3>
                <div className="space-y-8">
                  {[
                    {value: '+320%', label: 'Aumento en leads cualificados'},
                    {value: '€280K', label: 'Revenue adicional anual'},
                    {value: '-88%', label: 'Tiempo en tareas admin'},
                    {value: '75%', label: 'Tasa de cierre'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-slate-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Pasamos de perder 70% del tiempo en admin y seguimientos a que la IA lo haga todo. Solo hablamos con leads cualificados. Las reuniones subieron 180%, cierre pasó de 42% a 75%. Facturamos €280K más este año. El mejor salto que dimos como firma."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Alberto Navarro, Senior Partner SCG</p>
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
              Multiplica tus resultados hoy
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-slate-400">+460 consultorías</strong> ya cierran más deals con IA. Enfócate en consultar, no en admin.
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
              {['Sin permanencia', 'Setup en 24h', 'Integración CRM'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-slate-400" />
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
