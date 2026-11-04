import { Link } from 'react-router-dom'
import Logo from '../common/Logo.jsx'

function Navbar() {
  return (
    <header className="border-b border-alpha-border bg-alpha-white">
      <nav
        aria-label="Public navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        <Logo />
        <Link
          to="/auth"
          className="rounded-lg px-3 py-2 text-sm font-medium text-alpha-navy transition hover:bg-alpha-border/30"
        >
          Sign in
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
