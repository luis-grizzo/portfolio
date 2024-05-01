import { cloneElement } from 'react'

interface TagProps {
  icon?: React.ReactElement
  className?: string
  children: React.ReactNode
}

export function Tag({
  icon,
  className,
  children
}: TagProps): React.ReactElement {
  return (
    <span
      className={`flex items-center gap-2.5 px-2.5 py-1.5 text-sm font-bold bg-neutral-800/60 backdrop-blur text-neutral-50 border-1 border-neutral-400/10 rounded-lg ${className}`}
    >
      {icon && cloneElement(icon, { size: 14 })}

      {children}
    </span>
  )
}
