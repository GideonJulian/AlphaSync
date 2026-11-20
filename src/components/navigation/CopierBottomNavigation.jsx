import {
  ChartNoAxesCombined,
  Clock3,
  House,
  Search,
  UserRound,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { label: 'Home', to: '/copier/dashboard', icon: House, end: true },
  { label: 'Discover', to: '/copier/marketplace', icon: Search },
  { label: 'Positions', to: '/copier/positions', icon: ChartNoAxesCombined },
  { label: 'History', disabled: true, icon: Clock3 },
  { label: 'Profile', disabled: true, icon: UserRound },
]

function NavigationContent({ active = false, icon: Icon, label }) {
  return (
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
}

function NavigationItem({ item }) {
  const { disabled, end, href, icon: Icon, label, to } = item

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        title={`${label} is not available yet`}
        className="flex min-w-0 flex-1 cursor-not-allowed flex-col items-center justify-center gap-0.5 rounded-lg py-1 text-alpha-navy/70 opacity-45"
      >
        <NavigationContent icon={Icon} label={label} />
      </span>
    )
  }

  if (to) {
    return (
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 transition-colors ${
            isActive ? 'text-alpha-navy' : 'text-alpha-navy/70 hover:text-alpha-navy'
          }`
        }
      >
        {({ isActive }) => (
          <NavigationContent active={isActive} icon={Icon} label={label} />
        )}
      </NavLink>
    )
  }

  return (
    <a
      href={href}
      className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 text-alpha-navy/70 transition-colors hover:text-alpha-navy"
    >
      <NavigationContent icon={Icon} label={label} />
    </a>
  )
}

function CopierBottomNavigation() {
  return (
    <nav
      aria-label="Mobile Copier navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-alpha-border bg-alpha-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="flex gap-1 px-3 py-1.5">
        {items.map((item) => (
          <NavigationItem key={item.label} item={item} />
        ))}
      </div>
    </nav>
  )
}

export default CopierBottomNavigation
