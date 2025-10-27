import { FaShoppingCart, FaWhatsapp, FaHeadset, FaBox, FaCheckCircle, FaRobot, FaChartLine, FaStar, FaUndo, FaEnvelope, FaBolt, FaComments } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'IA para Ecommerce | Automatización Tiendas Online | NexGent',
  description: 'Automatiza tu tienda online con agentes de IA. Atención al cliente, seguimiento de pedidos y ventas 24/7. +150% conversión, -80% carritos abandonados.',
}

export default function EcommercePage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-300 rounded-full px-4 py-2 mb-6">
                  <FaShoppingCart className="text-purple-600" />
                  <span className="text-sm font-semibold text-purple-800">Ecommerce</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Vende <span className="text-purple-600">más</span> con IA 24/7
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Agentes de IA que atienden clientes, recomiendan productos y recuperan carritos abandonados automáticamente. <strong>+150% en conversión</strong>, -80% carritos perdidos.
                </p>
                <div className="bg-white border-l-4 border-purple-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    El 69% de los carritos online se abandonan. La IA puede recuperar <strong className="text-purple-600">hasta un 35%</strong> de ellos automáticamente.
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
                  {['Integración en 24h', 'Sin código', 'ROI en 2 semanas'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Performance de Octubre</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {label: 'Conversiones', value: '842'},
                        {label: 'Carritos recuperados', value: '287'},
                        {label: 'Consultas atendidas', value: '3.2K'},
                        {label: 'Revenue', value: '€52K'},
                      ].map((metric, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-purple-100">{metric.label}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaBolt className="text-green-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Carrito recuperado</p>
                          <p className="text-xs text-gray-700 mt-1">María G. completó compra de €156 tras recordatorio IA</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaComments className="text-blue-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Consulta resuelta</p>
                          <p className="text-xs text-gray-700 mt-1">IA respondió sobre envíos a Juan en 8 segundos</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaStar className="text-purple-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Upsell exitoso</p>
                          <p className="text-xs text-gray-700 mt-1">IA recomendó producto complementario, venta +€45</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-purple-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">+150% conversión</p>
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
                {value: '+150%', label: 'Conversión de ventas'},
                {value: '-80%', label: 'Carritos abandonados'},
                {value: '24/7', label: 'Atención continua'},
                {value: '+35%', label: 'Ticket promedio'},
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">IA que vende por ti</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Automatización completa para tu tienda online</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaHeadset, title: 'Atención al cliente 24/7', description: 'IA que responde dudas sobre productos, envíos, devoluciones y más en segundos, por WhatsApp y web.'},
                {icon: FaUndo, title: 'Recuperación de carritos', description: 'Recordatorios automáticos personalizados por WhatsApp y email que recuperan hasta 35% de carritos abandonados.'},
                {icon: FaStar, title: 'Recomendaciones inteligentes', description: 'IA sugiere productos complementarios y upsells basándose en historial de compra y comportamiento.'},
                {icon: FaBox, title: 'Seguimiento de pedidos', description: 'Notificaciones automáticas de estado de pedido, envío y entrega directamente por WhatsApp.'},
                {icon: FaComments, title: 'Chat en tiempo real', description: 'Chatbot inteligente en tu web que resuelve dudas, guía compras y aumenta conversión.'},
                {icon: FaEnvelope, title: 'Email marketing automático', description: 'Secuencias de emails personalizados post-compra, recomendaciones y recuperación de clientes.'},
                {icon: FaRobot, title: 'Asistente de ventas IA', description: 'Agente que ayuda a elegir productos, compara opciones y cierra ventas como un vendedor experto.'},
                {icon: FaChartLine, title: 'Analytics avanzado', description: 'Dashboard con métricas de conversión, productos más vendidos, comportamiento y oportunidades.'},
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Resultados comprobados</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {title: 'Mayor conversión', description: 'Atención inmediata 24/7 elimina fricción en el proceso de compra. Resuelve dudas al instante y guía al cliente hasta el checkout.', impact: '+158% conversión'},
                {title: 'Recuperación de ventas', description: 'El 69% de carritos se abandonan. IA envía recordatorios personalizados por WhatsApp/email que recuperan 35% de ellos automáticamente.', impact: '€18K recuperados/mes'},
                {title: 'Más ticket promedio', description: 'Recomendaciones inteligentes de productos complementarios y upsells que aumentan el valor de cada compra.', impact: '+42% ticket medio'},
              ].map((result, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-purple-500 transition-all">
                  <h3 className="font-monda text-2xl font-bold text-black mb-4">{result.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{result.description}</p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-purple-800">{result.impact}</p>
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye la solución?</h2>
                <p className="text-lg text-gray-600 mb-8">Todo lo que necesitas para vender más en tu ecommerce</p>
                <div className="space-y-3">
                  {[
                    'Chatbot inteligente para tu web',
                    'Agente de WhatsApp Business automatizado',
                    'Recuperación automática de carritos abandonados',
                    'Recomendaciones de productos con IA',
                    'Seguimiento automático de pedidos',
                    'Integración con tu plataforma (Shopify, WooCommerce, etc)',
                    'Email marketing automatizado',
                    'Respuestas a preguntas frecuentes',
                    'Asistente de ventas conversacional',
                    'Dashboard con analytics en tiempo real',
                    'Encuestas de satisfacción automáticas',
                    'Soporte técnico 24/7',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-purple-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">TechStore Online</h3>
                <div className="space-y-8">
                  {[
                    {value: '+175%', label: 'Aumento en conversión'},
                    {value: '€24K', label: 'Carritos recuperados/mes'},
                    {value: '+48%', label: 'Incremento en ticket medio'},
                    {value: '4.8⭐', label: 'Satisfacción del cliente'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-purple-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Antes perdíamos el 72% de los carritos. Ahora la IA recupera automáticamente el 38% con mensajes por WhatsApp. Las ventas subieron 175%, el ticket medio aumentó 48% gracias a las recomendaciones. ROI en 10 días."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Roberto Díaz, CEO de TechStore Online</p>
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
              Aumenta tus ventas online hoy
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-purple-400">+920 ecommerce</strong> ya venden más con IA. Recupera carritos, atiende 24/7 y aumenta tu conversión automáticamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Agenda tu demo
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver casos de éxito
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              {['Sin tarjeta', 'Setup en 24h', 'Cancela cuando quieras'].map(item => (
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
