import { ArrowRight, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

function AuthHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-alpha-border bg-alpha-white/95 pt-[env(safe-area-inset-top)] shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-md lg:static lg:border-0 lg:bg-transparent lg:pt-0 lg:shadow-none lg:backdrop-blur-none">
      <div className="flex h-14 items-center justify-between px-4 lg:h-auto lg:justify-end lg:px-0">
        <Link
          to="/"
          aria-label="AlphaSync home"
          className="text-base font-semibold tracking-tight text-alpha-navy lg:hidden"
        >
          AlphaSync
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm font-semibold text-alpha-navy/70 transition-colors hover:text-alpha-black focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange motion-reduce:transition-none lg:min-h-0 lg:px-0"
          >
            Back to Home
            <ArrowRight aria-hidden="true" className="size-[18px] lg:size-4" />
          </Link>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-alpha-navy text-alpha-white lg:hidden">
            <UserRound aria-hidden="true" className="size-[18px]" />
          </span>
        </div>
      </div>
    </header>
  )
}

export default AuthHeader
