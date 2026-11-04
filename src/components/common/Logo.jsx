import { Link } from 'react-router-dom'

function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="AlphaSync home"
      className={`inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-alpha-navy ${className}`}
    >
      <span aria-hidden="true" className="size-2.5 rounded-full bg-alpha-orange" />
      AlphaSync
    </Link>
  )
}

export default Logo
