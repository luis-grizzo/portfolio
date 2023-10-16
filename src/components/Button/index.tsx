import { useColor } from '@/hooks/useColor'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost'
}

export const Button = ({
  variant,
  children,
  className,
  ...props
}: ButtonProps): React.ReactElement => {
  const { color } = useColor()

  const variants = {
    primary: `px-5 py-3 bg-contrast_color_lightTheme text-background_color_lightTheme dark:bg-contrast_color_darkTheme dark:text-background_color_darkTheme hover:bg-${color}-600`,
    secondary: `px-5 py-3 text-contrast_color_lightTheme border-contrast_color_lightTheme dark:text-contrast_color_darkTheme dark:border-contrast_color_darkTheme bg-shape_color_lightTheme dark:bg-shape_color_darkTheme border-2 hover:border-${color}-600 hover:text-${color}-600 hover:bg-${color}-600/20`,
    ghost: `px-2.5 py-1.5 -mx-2.5 -my-1.5 xsm:px-3 xsm:py-2 xsm:-mx-3 xsm:my-2 text-contrast_color_lightTheme dark:text-contrast_color_darkTheme bg-transparent hover:text-${color}-600 hover:bg-${color}-600/20`
  }

  return (
    <button
      type="button"
      className={`rounded-xl font-bold text-sm uppercase tracking-widest transition-colors ${
        variants[variant]
      } ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
