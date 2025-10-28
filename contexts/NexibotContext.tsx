'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface NexibotContextType {
  isNexibotMode: boolean
  toggleNexibotMode: () => void
  isTransitioning: boolean
}

const NexibotContext = createContext<NexibotContextType | undefined>(undefined)

export function NexibotProvider({ children }: { children: ReactNode }) {
  const [isNexibotMode, setIsNexibotMode] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const toggleNexibotMode = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsNexibotMode(!isNexibotMode)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 800)
    }, 400)
  }

  return (
    <NexibotContext.Provider value={{ isNexibotMode, toggleNexibotMode, isTransitioning }}>
      {children}
    </NexibotContext.Provider>
  )
}

export function useNexibot() {
  const context = useContext(NexibotContext)
  if (context === undefined) {
    throw new Error('useNexibot must be used within a NexibotProvider')
  }
  return context
}

