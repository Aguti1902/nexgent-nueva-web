import { FaCar, FaCalendarCheck, FaWhatsapp, FaChartLine, FaCheckCircle, FaPhoneAlt, FaClipboardList, FaUserCheck, FaBell, FaStar, FaHandshake, FaClock } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'IA para Concesionarios | Automatización Automotriz | NexGent',
  description: 'Automatiza tu concesionario con agentes de IA. Gestión de test drives, seguimiento de leads y ventas 24/7. +200% test drives, +85% conversión.',
}

export default function ConcesionariosPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-cyan-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-cyan-100 border border-cyan-300 rounded-full px-4 py-2 mb-6">
                  <FaCar className="text-cyan-600" />
                  <span className="text-sm font-semibold text-cyan-800">Concesionarios</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Vende <span className="text-cyan-600">más vehículos</span> con IA
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  IA que califica leads, agenda test drives y hace seguimiento perfecto automáticamente. <strong>+200% test drives</strong>, +85% conversión, atención 24/7.
                </p>
                <div className="bg-white border-l-4 border-cyan-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Concesionarios pierden <strong className="text-cyan-600">67% de leads</strong> por respuesta lenta o seguimiento deficiente. IA recupera el 82% de ellos.
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
                  {['Setup en 48h', 'Integración DMS', 'Soporte 24/7'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Panel de Ventas - Hoy</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {label: 'Leads activos', value: '64'},
                        {label: 'Test drives', value: '18'},
                        {label: 'Propuestas', value: '12'},
                        {label: 'Conversión', value: '24%'},
                      ].map((metric, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-cyan-100">{metric.label}</p>
                          <p className="text-3xl font-bold">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      {name: 'Carlos R.', vehicle: 'SUV Premium', status: 'Test drive agendado', date: 'Mañana 11:00'},
                      {name: 'María G.', vehicle: 'Compacto Híbrido', status: 'Propuesta enviada', date: 'Pendiente respuesta'},
                      {name: 'Jorge L.', vehicle: 'Deportivo', status: 'Interés confirmado', date: 'Seguimiento IA'},
                      {name: 'Ana P.', vehicle: 'Familiar', status: 'Financiación aprobada', date: 'Cierre próximo'},
                    ].map((lead, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{lead.name}</p>
                            <p className="text-xs text-gray-600">{lead.vehicle}</p>
                          </div>
                          <span className="text-xs px-3 py-1 rounded-full bg-cyan-100 text-cyan-700">{lead.status}</span>
                        </div>
                        <p className="text-xs text-gray-500">{lead.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-cyan-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">+200% test drives</p>
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
                {value: '+200%', label: 'Test drives agendados'},
                {value: '+85%', label: 'Conversión de leads'},
                {value: '24/7', label: 'Atención continua'},
                {value: '+€42K', label: 'Ventas extra/mes'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{stat.value}</p>
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">IA para concesionarios de alto rendimiento</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Automatización que convierte leads en ventas</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaUserCheck, title: 'Cualificación instantánea', description: 'IA evalúa leads al instante: presupuesto, modelo de interés, urgencia de compra, financiación necesaria.'},
                {icon: FaCalendarCheck, title: 'Test drives automáticos', description: 'Coordinación inteligente de test drives 24/7 con disponibilidad de vehículos, vendedores y clientes.'},
                {icon: FaWhatsapp, title: 'Atención multi-canal', description: 'Responde consultas sobre modelos, precios, financiación y promociones por WhatsApp, web y llamadas.'},
                {icon: FaPhoneAlt, title: 'Llamadas con IA', description: 'Agente de voz que contacta leads, califica interés, explica modelos y agenda test drives automáticamente.'},
                {icon: FaBell, title: 'Seguimiento perfecto', description: 'Sistema que hace follow-up post test drive, envía propuestas y recuerda ofertas en el momento óptimo.'},
                {icon: FaClipboardList, title: 'Gestión de financiación', description: 'Recopila documentos, pre-aprueba financiación y coordina con entidades bancarias automáticamente.'},
                {icon: FaStar, title: 'Reseñas y referencias', description: 'Solicitud automática de valoraciones a clientes satisfechos y programa de referencias incentivado.'},
                {icon: FaChartLine, title: 'Analytics de ventas', description: 'Dashboard con conversión por modelo, fuente de leads, performance de vendedores y predicción de ventas.'},
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-cyan-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 text-2xl mb-4 group-hover:bg-cyan-500 group-hover:text-white transition-all">
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Resultados en concesionarios</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {title: 'Más test drives', description: 'Respuesta instantánea 24/7 y coordinación automática eliminan fricción. Leads pasan de consulta a test drive en minutos, no días.', impact: '+210% test drives mensuales'},
                {title: 'Conversión superior', description: 'Cualificación previa y seguimiento perfecto significa que vendedores hablan solo con compradores reales listos para cerrar.', impact: '+92% conversión a venta'},
                {title: 'Ciclo más rápido', description: 'Automatización de documentos, pre-aprobación financiera y seguimiento aceleran el proceso de decisión y compra del cliente.', impact: '40% menos tiempo cierre'},
              ].map((result, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-cyan-500 transition-all">
                  <h3 className="font-monda text-2xl font-bold text-black mb-4">{result.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{result.description}</p>
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-cyan-800">{result.impact}</p>
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye para tu concesionario?</h2>
                <p className="text-lg text-gray-600 mb-8">Sistema completo para ventas automotrices</p>
                <div className="space-y-3">
                  {[
                    'Cualificación automática de leads',
                    'Agente de voz IA para llamadas',
                    'Coordinación de test drives 24/7',
                    'WhatsApp Business automatizado',
                    'Sistema de seguimiento personalizado',
                    'Integración con tu DMS',
                    'Gestión de financiación automática',
                    'Envío automático de propuestas',
                    'Base de datos de clientes inteligente',
                    'Dashboard con analytics en tiempo real',
                    'Programa de referencias automatizado',
                    'Soporte técnico especializado',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-cyan-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">AutoElite Motors</h3>
                <div className="space-y-8">
                  {[
                    {value: '+240%', label: 'Aumento en test drives'},
                    {value: '€156K', label: 'Ventas extra mensuales'},
                    {value: '+105%', label: 'Mejora en conversión'},
                    {value: '28%', label: 'Tasa de cierre (vs 14% antes)'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-cyan-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Antes perdíamos el 70% de leads por respuesta lenta. Ahora la IA responde en 30 segundos, cualifica y agenda test drives automáticamente. Test drives subieron 240%, conversión pasó de 14% a 28%. Vendemos 18 vehículos más por mes. ROI brutal."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Ricardo Vega, Director Comercial AutoElite</p>
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
              Vende más vehículos cada mes
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-cyan-400">+320 concesionarios</strong> ya venden más con IA. Más test drives, mejor conversión, ventas récord.
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
              {['Sin permanencia', 'Setup en 48h', 'Integración DMS'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-cyan-400" />
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
