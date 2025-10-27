import { FaFileInvoice, FaRobot, FaSync, FaChartLine, FaCheckCircle, FaBolt, FaEuroSign, FaCalendarAlt, FaClock, FaShieldAlt, FaEnvelope, FaFileExport } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Facturación Automática con IA | Sistema Inteligente | NexGent',
  description: 'Automatiza tu facturación con inteligencia artificial. Genera, envía y gestiona facturas automáticamente. Ahorra 90% del tiempo y mejora el flujo de caja.',
}

export default function FacturacionPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 rounded-full px-4 py-2 mb-6">
                  <FaFileInvoice className="text-green-600" />
                  <span className="text-sm font-semibold text-green-800">Facturación Automática</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Factura en <span className="text-green-600">automático</span>, cobra más rápido
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Sistema de <strong>facturación inteligente</strong> que genera, envía y gestiona facturas automáticamente. Reduce tiempo un 90%, mejora flujo de caja y cumple 100% con normativas fiscales.
                </p>
                <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Las empresas pierden un promedio de <strong className="text-green-600">23 horas/mes</strong> en tareas de facturación manual. Automatiza y recupera ese tiempo.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Automatiza ahora
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver resultados
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  {['Generación automática', 'Cumplimiento fiscal', 'Sin permanencia'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Facturación de Octubre</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-green-100">Facturas emitidas</p>
                        <p className="text-3xl font-bold">127</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-green-100">Total facturado</p>
                        <p className="text-3xl font-bold">€48K</p>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Cobradas</span>
                        <span className="text-sm font-bold">94%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '94%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      {client: 'TechCorp SL', amount: '€1,250', status: 'Pagada', date: '15 Oct', color: 'green'},
                      {client: 'Digital Solutions', amount: '€890', status: 'Enviada', date: '18 Oct', color: 'blue'},
                      {client: 'Innovation Labs', amount: '€2,100', status: 'Vence hoy', date: '27 Oct', color: 'yellow'},
                      {client: 'StartupHub', amount: '€650', status: 'Generando...', date: '27 Oct', color: 'gray'},
                    ].map((invoice, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-900">{invoice.client}</p>
                          <p className="text-xs text-gray-600">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{invoice.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            invoice.color === 'green' ? 'bg-green-100 text-green-700' :
                            invoice.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            invoice.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">90% tiempo ahorrado</p>
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
                {value: '-90%', label: 'Tiempo en facturación'},
                {value: '+60%', label: 'Cobros a tiempo'},
                {value: '100%', label: 'Cumplimiento fiscal'},
                {value: '23h', label: 'Ahorradas por mes'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">{stat.value}</p>
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Facturación totalmente automatizada</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Todo lo que necesitas para gestionar tu facturación sin esfuerzo</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaBolt, title: 'Generación automática', description: 'Facturas que se crean automáticamente al completar servicios o ventas. Sin intervención manual.'},
                {icon: FaEnvelope, title: 'Envío inteligente', description: 'Envío automático por email con personalización, recordatorios de pago y seguimiento de lectura.'},
                {icon: FaEuroSign, title: 'Gestión de cobros', description: 'Seguimiento automático de pagos, recordatorios escalonados y detección de impagos.'},
                {icon: FaCalendarAlt, title: 'Facturación recurrente', description: 'Suscripciones y servicios recurrentes facturados automáticamente cada período.'},
                {icon: FaShieldAlt, title: 'Cumplimiento fiscal total', description: 'Actualización automática con cambios normativos, IVA correcto y todo conforme a ley.'},
                {icon: FaFileExport, title: 'Exportación contabilidad', description: 'Integración directa con tu software contable o exportación en formatos estándar.'},
                {icon: FaSync, title: 'Sincronización CRM', description: 'Actualización automática de estado de facturas en tu CRM y sistemas de gestión.'},
                {icon: FaClock, title: 'Historial completo', description: 'Acceso inmediato a todas las facturas, búsqueda avanzada y reportes personalizados.'},
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-2xl mb-4 group-hover:bg-green-500 group-hover:text-white transition-all">
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Solución perfecta para cualquier negocio</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {title: 'Servicios Profesionales', description: 'Facturación por horas, proyectos o retainer. Tracking de tiempo integrado y facturación automática al completar.', impact: '92% menos tiempo admin'},
                {title: 'Ecommerce y Retail', description: 'Facturas generadas automáticamente con cada venta. Integración con plataformas de ecommerce y pasarelas de pago.', impact: '100% automatización'},
                {title: 'SaaS y Suscripciones', description: 'Facturación recurrente automática, gestión de upgrades/downgrades y recuperación de pagos fallidos.', impact: '+85% cobros exitosos'},
                {title: 'Agencias y Consultorías', description: 'Facturación multi-cliente, gestión de retenciones, anticipos y facturación por hitos de proyecto.', impact: '20h ahorradas/mes'},
                {title: 'Manufactura y Distribución', description: 'Facturas masivas, albaranes automáticos, gestión de descuentos por volumen y facturación internacional.', impact: '+60% eficiencia'},
                {title: 'Salud y Wellness', description: 'Facturación por sesión, copagos, reembolsos de seguros y documentación fiscal automática.', impact: '95% cumplimiento'},
              ].map((useCase, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-green-500 transition-all">
                  <h3 className="font-monda text-xl font-bold text-black mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{useCase.description}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-green-800">{useCase.impact}</p>
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
                <p className="text-lg text-gray-600 mb-8">Todo lo que necesitas para una facturación profesional y sin complicaciones</p>
                <div className="space-y-3">
                  {[
                    'Generación automática de facturas profesionales',
                    'Envío automático por email con seguimiento',
                    'Recordatorios de pago escalonados',
                    'Facturación recurrente para suscripciones',
                    'Plantillas personalizables con tu marca',
                    'Gestión de múltiples series de facturación',
                    'Cálculo automático de IVA y retenciones',
                    'Cumplimiento total con normativas fiscales',
                    'Integración con software contable',
                    'Reportes de facturación y cobros',
                    'Historial completo y búsqueda avanzada',
                    'Soporte técnico especializado 24/7',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-green-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Ahorro real</h3>
                <div className="space-y-8">
                  {[
                    {value: '€4.8K', label: 'Ahorro anual en costes admin'},
                    {value: '23h', label: 'Ahorradas mensualmente'},
                    {value: '+65%', label: 'Mejora en flujo de caja'},
                    {value: '100%', label: 'Cumplimiento normativa'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-green-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Antes gastábamos casi un día entero al mes en facturación. Ahora todo es automático: se generan, envían y gestionan solas. Recuperamos 23 horas mensuales y el flujo de caja mejoró un 65%. Inversión totalmente recuperada."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Carmen López, CFO de Consulting Plus</p>
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
              Olvídate de la facturación manual
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-green-400">+1,200 empresas</strong> ya automatizan su facturación. Descubre cómo puedes ahorrar 90% del tiempo y mejorar tu flujo de caja.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Automatiza ahora gratis
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver casos de éxito
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              {['Sin permanencia', 'Setup en 30 min', 'Soporte fiscal 24/7'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
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
