'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'

export default function NexibotInterface() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98])
  
  const features = [
    { title: 'Sin código necesario', description: 'Describe lo que necesitas en lenguaje natural' },
    { title: 'Deploy en minutos', description: 'De la idea al agente funcionando instantáneamente' },
    { title: 'Integraciones ilimitadas', description: 'WhatsApp, Web, Email, CRM y más' },
    { title: 'IA conversacional', description: 'Contexto, memoria y personalidad adaptable' },
  ]

  const process = [
    { number: '01', title: 'Describe', text: 'Explica qué quieres automatizar' },
    { number: '02', title: 'Genera', text: 'NEXIBOT crea tu agente de IA' },
    { number: '03', title: 'Despliega', text: 'Conecta y comienza a operar' },
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid ultra sutil */}
      <div className="fixed inset-0 opacity-[0.015]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,1)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(255,215,0,1)_0.5px,transparent_0.5px)] bg-[size:80px_80px]" />
      </div>

      {/* Gradient minimalista */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-yellow-400/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* HERO SECTION */}
      <motion.section 
        style={{ opacity, y, scale }}
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative w-24 h-24 mx-auto mb-8">
              <Image
                src="/images/LOGONEXIBOT.png"
                alt="NEXIBOT"
                fill
                className="object-contain opacity-90"
              />
            </div>
          </motion.div>

          {/* Título minimalista */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-monda text-[120px] md:text-[180px] font-bold leading-none mb-8 tracking-tighter"
          >
            <span className="text-white">NEX</span>
            <span className="text-yellow-400">IBOT</span>
          </motion.h1>

          {/* Subtítulo elegante */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl text-gray-400 font-light mb-16 tracking-wide max-w-3xl mx-auto"
          >
            El creador automático de agentes de IA
          </motion.p>

          {/* Badge premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="inline-flex items-center gap-4 px-8 py-3 border border-yellow-400/30 rounded-full backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-yellow-400 text-sm font-light tracking-widest uppercase">En desarrollo</span>
          </motion.div>

          {/* Stats minimalistas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-32 grid grid-cols-3 gap-16 max-w-3xl mx-auto"
          >
            {[
              { value: '<5min', label: 'Para crear' },
              { value: '0', label: 'Código' },
              { value: '24/7', label: 'Operativo' },
            ].map((stat, index) => (
              <div key={index} className="border-l border-gray-800 pl-6 text-left">
                <div className="text-5xl font-light text-yellow-400 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-xs text-gray-600 uppercase tracking-widest">Scroll</div>
            <div className="w-px h-16 bg-gradient-to-b from-gray-600 to-transparent" />
          </div>
        </motion.div>
      </motion.section>

      {/* FEATURES SECTION - Minimalista */}
      <section className="relative py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-900/20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black p-16 group hover:bg-gray-900/20 transition-colors duration-500"
              >
                <div className="text-5xl font-light text-yellow-400/20 mb-6 group-hover:text-yellow-400/40 transition-colors duration-500">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <h3 className="text-3xl font-light mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-500 text-lg font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS SECTION - Premium */}
      <section className="relative py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-light text-center mb-32"
          >
            <span className="text-gray-600">Cómo</span>{' '}
            <span className="text-yellow-400">funciona</span>
          </motion.h2>

          <div className="space-y-32">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex items-center gap-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1 text-right" style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                  <div className="text-8xl font-light text-yellow-400/10 mb-4">{step.number}</div>
                  <h3 className="text-4xl font-light mb-4 text-white">{step.title}</h3>
                  <p className="text-xl text-gray-500 font-light">{step.text}</p>
                </div>
                <div className="w-px h-32 bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - Elegante */}
      <section className="relative py-40 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-6xl md:text-7xl font-light mb-12">
            <span className="text-white">Acceso</span>{' '}
            <span className="text-yellow-400">anticipado</span>
          </h2>
          
          <p className="text-xl text-gray-500 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
            Únete a la lista de espera y sé el primero en crear agentes de IA sin límites
          </p>

          <a
            href="/contacto"
            className="inline-flex items-center gap-4 px-12 py-6 border border-yellow-400/50 hover:bg-yellow-400/5 rounded-full transition-all duration-300 group"
          >
            <span className="text-yellow-400 font-light tracking-wider">Solicitar acceso</span>
            <div className="w-8 h-px bg-yellow-400/50 group-hover:w-12 transition-all duration-300" />
          </a>
        </motion.div>
      </section>

      {/* Footer minimalista */}
      <footer className="relative py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-600 font-light tracking-widest">
            POWERED BY NEXGENT AI
          </p>
        </div>
      </footer>
    </div>
  )
}
