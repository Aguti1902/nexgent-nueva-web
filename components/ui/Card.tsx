import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: 'default' | 'glass' | 'gradient'
}

export default function Card({ children, className = '', hover = true, variant = 'default' }: CardProps) {
  const variantClasses = {
    default: 'bg-white border-gray-100',
    glass: 'bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border-primary/10',
  }

  return (
    <div 
      className={`
        relative rounded-2xl p-8 shadow-lg border overflow-hidden
        ${variantClasses[variant]}
        ${hover ? 'hover-lift hover:shadow-2xl hover:border-primary/30 transition-all duration-500 group' : ''}
        ${className}
      `}
    >
      {/* Efecto shimmer en hover */}
      {hover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      )}
      
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

