import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'gray'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300'
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 hover:shadow-xl',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-xl',
    outline: 'bg-white border-2 border-gray-300 text-black hover:border-black hover:bg-gray-100',
    white: 'bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl',
    gray: 'bg-gray-50 text-black border border-gray-100 hover:bg-gray-100',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const buttonContent = <>{children}</>


  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {buttonContent}
    </button>
  )
}

