interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost'
}

export const Button = ({
  variant,
  children,
  ...props
}: ButtonProps): React.ReactElement => {
  const variants = {
    primary: 'bg-neutral-800 text-neutral-200 hover:bg-pink-600',
    secondary:
      'bg-transparent text-neutral-800 border-2 border-neutral-800 hover:border-pink-600 hover:text-pink-600',
    ghost:
      '-mx-5 -my-3 bg-transparent text-neutral-800 hover:text-pink-600 hover:bg-pink-600/10'
  }

  return (
    <button
      type="button"
      className={`px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-colors ${variants[variant]} ${props.className}`}
      {...props}
    >
      {children}
    </button>
  )
}
