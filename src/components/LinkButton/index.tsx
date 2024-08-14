import { cloneElement } from 'react'
import Link, { LinkProps } from 'next/link'

interface LinkButtonProps
  extends LinkProps,
    Partial<Pick<HTMLAnchorElement, 'target'>> {
  icon?: React.ReactElement
  children: React.ReactNode
}

export function LinkButton({
  target,
  icon,
  children,
  ...props
}: LinkButtonProps): React.ReactElement {
  return (
    <Link
      className="flex items-center gap-3 w-fit px-4 py-3 text-base bg-neutral-900/60 backdrop-blur text-neutral-50 border-1 border-neutral-400/10 rounded-lg transition-colors hover:bg-neutral-900/40"
      target={target ?? '_blank'}
      {...props}
    >
      {children}

      {icon &&
        cloneElement(icon, {
          size: 16,
          className: icon.props.className ?? ''
        })}
    </Link>
  )
}
