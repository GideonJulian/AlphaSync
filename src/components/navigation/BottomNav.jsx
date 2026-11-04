import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Copier', to: '/dashboard', end: true },
  { label: 'Trader', to: '/dashboard/trader', end: false },
]

function BottomNav() {
  return (
    <nav
      aria-label="Mobile dashboard navigation"
      className="fixed inset-x-0 bottom-0 z-10 flex border-t border-alpha-border bg-alpha-white px-4 py-2 md:hidden"
    >
      {links.map(({ end, label, to }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 justify-center rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'text-alpha-navy' : 'text-alpha-navy/70'}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
