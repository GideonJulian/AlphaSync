import { NavLink } from 'react-router-dom'
import Logo from '../common/Logo.jsx'

const links = [
  { label: 'Copier', to: '/dashboard', end: true },
  { label: 'Trader', to: '/dashboard/trader', end: false },
]

function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-alpha-border bg-alpha-white p-6 md:flex md:flex-col md:gap-8">
      <Logo />
      <nav aria-label="Dashboard navigation" className="flex flex-col gap-1">
        {links.map(({ end, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-alpha-navy text-alpha-white' : 'text-alpha-navy hover:bg-alpha-border/30'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
