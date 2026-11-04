import Loader from './Loader.jsx'

const variants = {
  primary: 'bg-alpha-navy text-alpha-white hover:bg-alpha-navy/90',
  secondary:
    'border border-alpha-border bg-alpha-white text-alpha-navy hover:bg-alpha-border/30',
  accent: 'bg-alpha-orange text-alpha-black hover:bg-alpha-orange/90',
  ghost: 'text-alpha-navy hover:bg-alpha-border/30',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
}

function Button({
  children,
  className = '',
  disabled = false,
  loading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader className="size-4" />}
      {children}
    </button>
  )
}

export default Button
