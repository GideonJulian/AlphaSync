import { Link } from 'react-router-dom'

function LandingBrand({ compact = false }) {
  return (
    <Link
      to="/"
      aria-label="AlphaSync home"
      className="inline-flex shrink-0 items-center gap-2"
    >
      <span
        aria-hidden="true"
        className={`flex items-center justify-center rounded-lg bg-alpha-navy font-semibold text-alpha-white ${compact ? 'size-7 text-sm' : 'size-8 text-base'}`}
      >
        A
      </span>
      <span className="text-base font-semibold tracking-tight text-alpha-navy">
        AlphaSync
      </span>
    </Link>
  )
}

export default LandingBrand
