const variants = {
  neutral: 'border-alpha-border bg-alpha-white text-alpha-navy',
  navy: 'border-alpha-navy bg-alpha-navy text-alpha-white',
  accent: 'border-alpha-orange bg-alpha-orange text-alpha-black',
}

function Badge({ children, className = '', variant = 'neutral' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
