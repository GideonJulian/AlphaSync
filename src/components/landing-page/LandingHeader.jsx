import { Link } from 'react-router-dom'
import { UserRound } from 'lucide-react'
import LandingBrand from './LandingBrand.jsx'

const navigation = [
  { label: 'Explore Traders', href: '#user-types' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Security', href: '#security' },
  { label: 'Get started', href: '#get-started' },
]

function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-alpha-border bg-alpha-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <LandingBrand />
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navigation.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="py-2 text-sm text-alpha-navy/70 transition-colors hover:text-alpha-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpha-orange"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link
            to="/auth"
            className="px-2 py-2 text-sm font-medium text-alpha-navy/70 transition-colors hover:text-alpha-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange sm:px-3"
          >
            Sign in
          </Link>
          <Link
            to="/auth"
            className="rounded-lg bg-alpha-orange px-3 py-2 text-sm font-semibold text-alpha-navy transition-colors hover:bg-alpha-orange/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy sm:px-5"
          >
            Get Started
          </Link>
          <span className="hidden size-8 items-center justify-center rounded-full bg-alpha-navy text-alpha-white sm:flex">
            <UserRound aria-hidden="true" className="size-[18px]" />
          </span>
        </div>
      </div>
    </header>
  )
}

export default LandingHeader
