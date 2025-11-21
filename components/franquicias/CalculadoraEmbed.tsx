'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaPhone, FaWhatsapp, FaCheck, FaArrowRight, FaCalculator } from 'react-icons/fa'

export default function CalculadoraEmbed() {
  const [numFranquicias, setNumFranquicias] = useState(50)
  const [agenteWhatsApp, setAgenteWhatsApp] = useState(true)
  const [agenteLlamadas, setAgenteLlamadas] = useState(false)
  const [mensajesPorFranquicia, setMensajesPorFranquicia] = useState(500)
  const [llamadasPorFranquicia, setLlamadasPorFranquicia] = useState(100)
  const [minutosPorLlamada, setMinutosPorLlamada] = useState(3)

  const PRECIO_BASE_FRANQUICIA = 29
  const PRECIO_MENSAJE = 0.02
  const PRECIO_LLAMADA_BASE = 0.15
  const PRECIO_MINUTO = 0.08

  const getDescuentoVolumen = (num: number) => {
    if (num >= 500) return 0.30
    if (num >= 200) return 0.20
    if (num >= 100) return 0.15
    if (num >= 50) return 0.10
    return 0
  }

  const [costes, setCostes] = useState({
    totalPorFranquicia: 0,
    totalConDescuento: 0,
    ahorroAnual: 0
  })

  useEffect(() => {
    const base = agenteWhatsApp || agenteLlamadas ? PRECIO_BASE_FRANQUICIA : 0
    const whatsapp = agenteWhatsApp ? mensajesPorFranquicia * PRECIO_MENSAJE : 0
    const llamadas = agenteLlamadas 
      ? (llamadasPorFranquicia * PRECIO_LLAMADA_BASE) + (llamadasPorFranquicia * minutosPorLlamada * PRECIO_MINUTO)
      : 0
    const totalPorFranquicia = base + whatsapp + llamadas
    const totalMensual = totalPorFranquicia * numFranquicias
    const porcentajeDescuento = getDescuentoVolumen(numFranquicias)
    const descuento = totalMensual * porcentajeDescuento
    const totalConDescuento = totalMensual - descuento
    const ahorroAnual = descuento * 12

    setCostes({ totalPorFranquicia, totalConDescuento, ahorroAnual })
  }, [numFranquicias, agenteWhatsApp, agenteLlamadas, mensajesPorFranquicia, llamadasPorFranquicia, minutosPorLlamada])

  const descuentoPorcentaje = getDescuentoVolumen(numFranquicias) * 100

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 shadow-2xl text-white">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
          <FaCalculator className="text-2xl" />
        </div>
        <div>
          <h3 className="font-monda text-2xl font-bold">Calcula tu inversión</h3>
          <p className="text-white/80 text-sm">Presupuesto personalizado en tiempo real</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Config */}
        <div className="space-y-6">
          {/* Franquicias */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Número de franquicias</span>
              <span className="text-2xl font-bold">{numFranquicias}</span>
            </div>
            <input type="range" min="20" max="2000" step="10" value={numFranquicias} onChange={(e) => setNumFranquicias(parseInt(e.target.value))} className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer" />
            {descuentoPorcentaje > 0 && (
              <p className="text-xs text-green-300 mt-2">🎉 Descuento por volumen: {descuentoPorcentaje}%</p>
            )}
          </div>

          {/* Agentes */}
          <div className="space-y-3">
            <div onClick={() => setAgenteWhatsApp(!agenteWhatsApp)} className={`p-4 rounded-xl cursor-pointer transition-all ${agenteWhatsApp ? 'bg-white/20 border-2 border-white' : 'bg-white/5 border-2 border-white/20'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaWhatsapp className="text-xl" />
                  <span className="font-semibold">WhatsApp</span>
                </div>
                {agenteWhatsApp && <FaCheck />}
              </div>
            </div>
            <div onClick={() => setAgenteLlamadas(!agenteLlamadas)} className={`p-4 rounded-xl cursor-pointer transition-all ${agenteLlamadas ? 'bg-white/20 border-2 border-white' : 'bg-white/5 border-2 border-white/20'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaPhone className="text-xl" />
                  <span className="font-semibold">Llamadas IA</span>
                </div>
                {agenteLlamadas && <FaCheck />}
              </div>
            </div>
          </div>

          {/* WhatsApp config */}
          {agenteWhatsApp && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Mensajes/franquicia/mes</span>
                <span className="font-bold">{mensajesPorFranquicia.toLocaleString()}</span>
              </div>
              <input type="range" min="100" max="5000" step="100" value={mensajesPorFranquicia} onChange={(e) => setMensajesPorFranquicia(parseInt(e.target.value))} className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer" />
            </div>
          )}

          {/* Llamadas config */}
          {agenteLlamadas && (
            <>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm">Llamadas/franquicia/mes</span>
                  <span className="font-bold">{llamadasPorFranquicia}</span>
                </div>
                <input type="range" min="10" max="1000" step="10" value={llamadasPorFranquicia} onChange={(e) => setLlamadasPorFranquicia(parseInt(e.target.value))} className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm">Minutos por llamada</span>
                  <span className="font-bold">{minutosPorLlamada} min</span>
                </div>
                <input type="range" min="1" max="15" step="1" value={minutosPorLlamada} onChange={(e) => setMinutosPorLlamada(parseInt(e.target.value))} className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer" />
              </div>
            </>
          )}
        </div>

        {/* Resultado */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <p className="text-white/80 text-sm mb-4">Tu inversión mensual:</p>
            <p className="text-5xl font-bold mb-2">{costes.totalConDescuento.toLocaleString('es-ES', { minimumFractionDigits: 0 })}€</p>
            <p className="text-white/80 text-sm mb-6">{costes.totalPorFranquicia.toFixed(2)}€ por franquicia/mes</p>
            {descuentoPorcentaje > 0 && (
              <p className="text-green-300 text-sm mb-4">
                Ahorro anual: {costes.ahorroAnual.toLocaleString('es-ES', { minimumFractionDigits: 0 })}€
              </p>
            )}
          </div>
          <Link href="/demo" className="block w-full bg-white text-blue-600 px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all text-center">
            Ver presupuesto detallado
          </Link>
        </div>
      </div>

      <p className="text-xs text-white/60 text-center mt-6">* Precio orientativo. Solicita presupuesto definitivo sin compromiso.</p>
    </div>
  )
}

