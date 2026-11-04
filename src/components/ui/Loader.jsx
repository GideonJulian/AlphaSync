import { LoaderCircle } from 'lucide-react'

function Loader({ label = 'Loading', className = '' }) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export default Loader
