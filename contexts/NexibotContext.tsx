'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface NexibotContextType {
  isNexibotMode: boolean
  toggleNexibotMode: () => void
}

const NexibotContext = createContext<NexibotContextType | undefined>(undefined)

export function NexibotProvider({ children }: { children: ReactNode }) {
  const [isNexibotMode, setIsNexibotMode] = useState(false)

  const toggleNexibotMode = () => {
    setIsNexibotMode(!isNexibotMode)
  }

  return (
    <NexibotContext.Provider value={{ isNexibotMode, toggleNexibotMode }}>
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

