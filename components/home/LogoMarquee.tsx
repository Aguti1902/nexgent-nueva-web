'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const partners = [
  { name: 'Hello Nails', logo: '/images/logos/HELLO NAILS.png' },
  { name: 'Nova Dental', logo: '/images/logos/NOVA DENTAL.png' },
  { name: 'Urban Fitness', logo: '/images/logos/URBAN FITNESS2.png' },
  { name: 'Agutidesigns', logo: '/images/logos/Agutidesigns.png' },
  { name: 'IQ Mind', logo: '/images/logos/IQMIND.svg' },
  { name: 'Spa Deluxe', logo: '/images/logos/SPADELUXE.png' },
  { name: 'Teresa Messia', logo: '/images/logos/TERESA.png' },
  { name: 'NMY', logo: '/images/logos/NMY.png' },
]

export default function LogoMarquee() {
  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-x-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Confían en NexGent
        </p>
      </div>

      <div className="relative overflow-hidden w-full">
        {/* Gradientes fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden w-full">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{
              x: { repeat: Infinity, repeatType: 'loop', duration: 30, ease: 'linear' },
            }}
            className="flex gap-12 pr-12 flex-shrink-0"
            style={{ willChange: 'transform' }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-4 flex items-center justify-center"
              >
                <div className="relative h-10 w-28 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
                  <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
