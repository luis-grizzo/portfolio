import { cloneElement } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement
}

export function Button({
  icon,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  return (
    <button
      className="flex items-center gap-3 w-fit px-4 py-3 text-base bg-neutral-900/60 backdrop-blur text-neutral-50 border-1 border-neutral-400/10 rounded-lg transition-colors hover:bg-neutral-900/40"
      {...props}
    >
      {children}

      {icon &&
        cloneElement(icon, {
          size: 16,
          className: icon.props.className ?? ''
        })}
    </button>
  )
}
