import { Bell, Search, ShieldCheck } from 'lucide-react'
import Logo from '../common/Logo.jsx'

function DashboardHeader({ search, onSearchChange }) {
  return (
    <header className="-mx-4 -mt-4 sticky top-0 z-20 flex flex-row items-center justify-between gap-2 border-b border-alpha-border bg-alpha-white px-4 py-3 sm:-mx-8 sm:-mt-5 sm:px-8 md:static md:mx-0 md:mt-0 md:gap-4 md:rounded-xl md:border md:px-8 md:py-4">
      <div className="flex items-center justify-between gap-6">
        <Logo />
        <label className="hidden h-10 w-72 items-center gap-2 rounded-lg border border-alpha-border px-3 text-alpha-navy/70 md:flex">
          <Search aria-hidden="true" className="size-5 shrink-0" />
          <span className="sr-only">Search strategies or traders</span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search strategies or traders"
            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-alpha-black outline-none placeholder:text-alpha-navy/60 focus:ring-0"
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 lg:justify-end lg:gap-7">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-10 items-center justify-center rounded-lg border border-alpha-border transition-colors hover:bg-alpha-border/30"
          >
            <Bell aria-hidden="true" className="size-5 text-alpha-navy" />
          </button>
          <button
            type="button"
            aria-label="Account verification"
            className="hidden size-10 items-center justify-center rounded-lg border border-alpha-border transition-colors hover:bg-alpha-border/30 md:flex"
          >
            <ShieldCheck aria-hidden="true" className="size-5 text-alpha-navy" />
          </button>
          <button
            type="button"
            aria-label="Account profile for Julian Davis"
            className="flex size-10 items-center justify-center rounded-full border border-alpha-border bg-alpha-border/50 text-xs font-semibold tracking-wider text-alpha-navy"
          >
            <span className="md:hidden">A</span>
            <span className="hidden md:inline">JD</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
