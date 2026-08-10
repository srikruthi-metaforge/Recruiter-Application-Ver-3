import React from 'react'

interface MetaforgeLogoProps {
  variant?: 'light' | 'dark' // light = for dark backgrounds (white text), dark = for light backgrounds (navy text)
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function MetaforgeLogo({
  variant = 'light',
  size = 'md',
  className = '',
}: MetaforgeLogoProps) {
  // Size classes
  const sizeMap = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  }

  const dotSizeMap = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
    xl: 'w-3 h-3',
  }

  const textColor = variant === 'light' ? 'text-white' : 'text-[#060A44]'

  return (
    <div
      className={`inline-flex items-baseline font-extrabold tracking-tight font-sans select-none ${className}`}
    >
      <span className={`${sizeMap[size]} ${textColor} font-sans`}>
        metafor
      </span>
      {/* Position 'g' and the two dots underneath its descender */}
      <span className="relative inline-block">
        <span className={`${sizeMap[size]} ${textColor}`}>g</span>
        {/* Two dots under the tail of 'g' matching exact logo */}
        <span className="absolute -bottom-1.5 left-[10%] flex items-center gap-[3px]">
          <span
            className={`${dotSizeMap[size]} rounded-full bg-[#00AEEF] inline-block shadow-sm`}
          />
          <span
            className={`${dotSizeMap[size]} rounded-full bg-[#EC008C] inline-block shadow-sm`}
          />
        </span>
      </span>
      <span className={`${sizeMap[size]} ${textColor} font-sans`}>
        e
      </span>
    </div>
  )
}
