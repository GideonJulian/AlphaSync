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
      
      </div>
    </header>
  )
}

export default AuthHeader
