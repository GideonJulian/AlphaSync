import {
  ChartNoAxesCombined,
  Clock3,
  House,
  Search,
  UserRound,
} from 'lucide-react'

const items = [
  { label: 'Home', href: '#dashboard', icon: House, active: true },
  { label: 'Discover', href: '#strategies', icon: Search },
  { label: 'Positions', href: '#positions', icon: ChartNoAxesCombined },
  { label: 'History', disabled: true, icon: Clock3 },
  { label: 'Profile', disabled: true, icon: UserRound },
]

function CopierBottomNavigation() {
  return (
    <nav
      aria-label="Mobile Copier navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-alpha-border bg-alpha-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="flex gap-1 px-3 py-1.5">
        {items.map(({ active, disabled, href, icon: Icon, label }) => {
          const className = `flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 transition-colors ${
            active
              ? 'text-alpha-navy'
              : 'text-alpha-navy/70 hover:text-alpha-navy'
          }`
          const content = (
            <>
              <span className="flex h-6 items-center justify-center">
                <Icon
                  aria-hidden="true"
                  className="size-5"
                  fill={active && label === 'Home' ? 'currentColor' : 'none'}
                  strokeWidth={active ? 2 : 1.75}
                />
              </span>
              <span
                className={`text-[10px] leading-normal tracking-[0.015em] ${
                  active ? 'font-semibold' : 'font-medium'
                }`}
              >
                {label}
              </span>
            </>
          )

          if (disabled) {
            return (
              <span
                key={label}
                aria-disabled="true"
                title={`${label} is not available yet`}
                className={`${className} cursor-not-allowed opacity-45`}
              >
                {content}
              </span>
            )
          }

          return (
            <a
              key={label}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={className}
            >
              {content}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export default CopierBottomNavigation
