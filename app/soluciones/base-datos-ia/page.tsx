import { FaDatabase, FaChartBar, FaBrain, FaSync, FaCheckCircle, FaSearch, FaLightbulb, FaBolt, FaShieldAlt, FaChartLine, FaCogs, FaUserFriends } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Base de Datos con IA | Análisis Inteligente de Datos | NexGent',
  description: 'Análisis y gestión inteligente de datos con IA. Insights automáticos, predicciones precisas y decisiones data-driven en tiempo real.',
}

export default function BaseDatosIAPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-indigo-100 border border-indigo-300 rounded-full px-4 py-2 mb-6">
                  <FaDatabase className="text-indigo-600" />
                  <span className="text-sm font-semibold text-indigo-800">Base de Datos Inteligente</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Tus datos <span className="text-indigo-600">hablan</span>, la IA traduce
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Transforma tus datos en <strong>decisiones inteligentes</strong> con IA que analiza automáticamente, predice tendencias y te proporciona insights accionables en tiempo real.
                </p>
                <div className="bg-white border-l-4 border-indigo-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Las empresas que usan análisis de datos con IA toman decisiones <strong className="text-indigo-600">5x más rápido</strong> y con 89% de precisión.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Comienza ahora
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver casos de éxito
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  {['Análisis en tiempo real', 'Predicciones IA', 'Sin código'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Dashboard IA - Vista General</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {label: 'Revenue', value: '€487K', change: '+24%'},
                        {label: 'Clientes', value: '2,847', change: '+18%'},
                        {label: 'Conversión', value: '34.2%', change: '+12%'},
                        {label: 'LTV', value: '€2.8K', change: '+29%'},
                      ].map((metric, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-indigo-100">{metric.label}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                          <p className="text-xs text-green-300">{metric.change} vs mes anterior</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaLightbulb className="text-green-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Oportunidad detectada</p>
                          <p className="text-xs text-gray-700 mt-1">Los clientes que compran el producto A tienen 78% de probabilidad de comprar el producto B. Recomendación: crear bundle.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaBrain className="text-yellow-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Predicción IA</p>
                          <p className="text-xs text-gray-700 mt-1">Revenue del próximo trimestre: €142K (±5%). Probabilidad de alcanzar objetivo: 87%.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaChartLine className="text-blue-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Tendencia identificada</p>
                          <p className="text-xs text-gray-700 mt-1">Aumento de 45% en conversión los martes entre 14-16h. Optimiza campañas para ese horario.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-indigo-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">95% precisión</p>
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
                {value: '+300%', label: 'Velocidad de análisis'},
                {value: '95%', label: 'Precisión predicciones'},
                {value: '-85%', label: 'Tiempo reporting'},
                {value: '5x', label: 'Decisiones más rápidas'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">{stat.value}</p>
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">IA que entiende tus datos</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Análisis avanzado sin necesidad de equipo técnico especializado</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaBrain, title: 'Análisis predictivo', description: 'IA que predice ventas, churn, tendencias y comportamientos con 95% de precisión basándose en datos históricos.'},
                {icon: FaSearch, title: 'Detección de patrones', description: 'Identifica automáticamente correlaciones, anomalías y oportunidades ocultas en tus datos.'},
                {icon: FaBolt, title: 'Insights en tiempo real', description: 'Dashboard actualizado constantemente con métricas clave y alertas automáticas de cambios importantes.'},
                {icon: FaLightbulb, title: 'Recomendaciones accionables', description: 'IA que no solo analiza sino que sugiere acciones concretas para optimizar resultados.'},
                {icon: FaChartBar, title: 'Visualizaciones inteligentes', description: 'Gráficos y reportes que se generan automáticamente según el tipo de datos y audiencia.'},
                {icon: FaCogs, title: 'Automatización completa', description: 'Reportes programados, alertas automáticas y distribución inteligente a stakeholders.'},
                {icon: FaShieldAlt, title: 'Seguridad y privacidad', description: 'Cumplimiento RGPD, encriptación de datos y control total de permisos y accesos.'},
                {icon: FaSync, title: 'Integración universal', description: 'Conecta con cualquier fuente: CRM, ERP, Analytics, bases de datos, APIs y más.'},
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-2xl mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all">
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
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Casos de uso que impulsan crecimiento</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {title: 'Predicción de Ventas', description: 'Forecasting preciso de revenue, identificación de mejores clientes potenciales y optimización de estrategia comercial.', impact: '+42% precisión forecasts'},
                {title: 'Análisis de Churn', description: 'Detección temprana de clientes en riesgo, análisis de causas y recomendaciones automáticas de retención.', impact: '-68% tasa de abandono'},
                {title: 'Optimización de Marketing', description: 'ROI por canal, mejores horarios de campaña, segmentación automática y predicción de conversión.', impact: '+180% ROI marketing'},
                {title: 'Gestión de Inventario', description: 'Predicción de demanda, optimización de stock, identificación de productos de mayor rotación.', impact: '-45% costes stock'},
                {title: 'Análisis de Operaciones', description: 'Identificación de cuellos de botella, optimización de procesos y predicción de necesidades de recursos.', impact: '+85% eficiencia'},
                {title: 'Customer Analytics', description: 'Comportamiento de compra, lifetime value, propensión a upsell y personalización de experiencia.', impact: '+220% LTV'},
              ].map((useCase, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-500 transition-all">
                  <h3 className="font-monda text-xl font-bold text-black mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{useCase.description}</p>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-indigo-800">{useCase.impact}</p>
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
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye la plataforma?</h2>
                <p className="text-lg text-gray-600 mb-8">Todo lo que necesitas para convertir datos en ventaja competitiva</p>
                <div className="space-y-3">
                  {[
                    'Análisis predictivo con machine learning avanzado',
                    'Detección automática de patrones y anomalías',
                    'Dashboard personalizable con métricas clave',
                    'Alertas inteligentes de cambios importantes',
                    'Reportes automatizados y programables',
                    'Integración con todas tus fuentes de datos',
                    'Visualizaciones intuitivas y profesionales',
                    'Recomendaciones accionables basadas en IA',
                    'Acceso seguro multi-usuario con permisos',
                    'API para integraciones personalizadas',
                    'Soporte técnico especializado 24/7',
                    'Actualizaciones y mejoras continuas',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-indigo-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Impacto medible</h3>
                <div className="space-y-8">
                  {[
                    {value: '€250K', label: 'Revenue adicional identificado'},
                    {value: '5x', label: 'Más rápido en tomar decisiones'},
                    {value: '95%', label: 'Precisión en predicciones'},
                    {value: '85%', label: 'Reducción tiempo análisis'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-indigo-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Pasamos de tardar días en analizar datos a tener insights en minutos. La IA detectó oportunidades que nos generaron €250K adicionales. Mejor herramienta de análisis que hemos usado."</p>
                    <p className="text-sm text-gray-400 font-semibold">— David Fernández, CFO de GrowthTech</p>
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
              Toma decisiones con datos, no intuición
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-indigo-400">+800 empresas</strong> ya usan nuestra plataforma de análisis con IA. Descubre insights ocultos en tus datos y crece más rápido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Comienza análisis gratis
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver demos en vivo
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              {['Sin tarjeta de crédito', 'Setup en 24h', 'Soporte especializado'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-indigo-400" />
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
