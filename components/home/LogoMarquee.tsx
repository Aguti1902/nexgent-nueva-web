'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const partners = [
  { name: 'Nova Dental', logo: '/images/logos/NOVA DENTAL.png' },
  { name: 'Agutidesigns', logo: '/images/logos/Agutidesigns.png' },
  { name: 'IQ Mind', logo: '/images/logos/IQMIND.svg' },
  { name: 'Spa Deluxe', logo: '/images/logos/SPADELUXE.png' },
  { name: 'Teresa Messia', logo: '/images/logos/TERESA.png' },
  { name: 'NMY', logo: '/images/logos/NMY.png' },
  { name: 'Spa Organic', logo: '/images/logos/SPAORGANIC.png' },
]

export default function LogoMarquee() {
  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-x-hidden w-full max-w-full">
      <div className="container-custom mb-12">
        <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
          Confían en NexGent
        </p>
      </div>
      
      <div className="relative overflow-hidden w-full" style={{ maxWidth: '100vw' }}>
        {/* Gradientes de fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Marquee */}
        <div className="flex overflow-hidden w-full">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            className="flex gap-12 pr-12 flex-shrink-0"
            style={{ willChange: 'transform' }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-4 whitespace-nowrap flex items-center justify-center"
              >
                {partner.logo ? (
                  <div className="relative h-12 w-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="font-monda text-xl font-bold text-gray-300 hover:text-black transition-colors duration-300">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
