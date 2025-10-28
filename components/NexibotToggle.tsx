'use client'

import { useNexibot } from '@/contexts/NexibotContext'
import { FaRobot } from 'react-icons/fa'

export default function NexibotToggle() {
  const { isNexibotMode, toggleNexibotMode } = useNexibot()

  return (
    <button
      onClick={toggleNexibotMode}
      className="relative flex items-center gap-3 px-4 py-2 rounded-full border-2 transition-all duration-300 hover:scale-105"
      style={{
        borderColor: isNexibotMode ? '#FFD700' : '#e5e7eb',
        backgroundColor: isNexibotMode ? '#000' : '#fff',
        color: isNexibotMode ? '#FFD700' : '#000',
      }}
    >
      <FaRobot className="text-xl" />
      <span className="font-bold text-sm">NEXIBOT</span>
      
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

