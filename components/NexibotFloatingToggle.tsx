'use client'

import { useNexibot } from '@/contexts/NexibotContext'
import Image from 'next/image'

export default function NexibotFloatingToggle() {
  const { isNexibotMode, toggleNexibotMode } = useNexibot()

  return (
    <button
      onClick={toggleNexibotMode}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full border-2 transition-all duration-300 hover:scale-105 shadow-2xl"
      style={{
        borderColor: isNexibotMode ? '#FFD700' : '#e5e7eb',
        backgroundColor: isNexibotMode ? '#000' : '#fff',
        color: isNexibotMode ? '#FFD700' : '#000',
      }}
    >
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={isNexibotMode ? "/images/NEXIBOTBLANCO.png" : "/images/NEXIBOT.png"}
          alt="NEXIBOT"
          fill
          className="object-contain"
        />
      </div>
      
      {/* Toggle Switch */}
      <div 
        className="relative w-12 h-6 rounded-full transition-colors duration-300"
        style={{
          backgroundColor: isNexibotMode ? '#FFD700' : '#e5e7eb',
        }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300"
          style={{
            left: isNexibotMode ? '26px' : '2px',
          }}
        />
      </div>

      {isNexibotMode && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
      )}
    </button>
  )
}

