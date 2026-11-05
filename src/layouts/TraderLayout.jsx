import {
  Activity,
  Bell,
  ChartNoAxesCombined,
  CircleDollarSign,
  Grid2X2,
  History,
  Settings,
  UsersRound,
} from 'lucide-react'
import { Outlet } from 'react-router-dom'
import DashboardNavigation from '../components/navigation/DashboardNavigation.jsx'
import Logo from '../components/common/Logo.jsx'

const navigationItems = [
  {
    label: 'Overview',
    to: '/trader/dashboard',
    end: true,
    icon: Grid2X2,
  },
  { label: 'My Strategy', icon: Activity },
  { label: 'Performance', icon: ChartNoAxesCombined },
  { label: 'Subscribers', icon: UsersRound },
  { label: 'Trade History', icon: History },
  { label: 'Earnings', icon: CircleDollarSign },
  { label: 'Notifications', icon: Bell },
  { label: 'Settings', icon: Settings },
]

function TraderLayout() {
  return (
    <div className="flex min-h-screen bg-alpha-white">
      <aside className="hidden w-64 shrink-0 flex-col gap-8 border-r border-alpha-border bg-alpha-white p-6 md:flex">
        <Logo />
        <DashboardNavigation
          items={navigationItems}
          label="Trader navigation"
          variant="sidebar"
        />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 pb-24 sm:px-6 md:pb-8">
          <Outlet />
        </main>
        <div className="fixed inset-x-0 bottom-0 z-10 overflow-x-auto border-t border-alpha-border bg-alpha-white px-4 py-2 md:hidden">
          <DashboardNavigation
            items={navigationItems}
            label="Mobile Trader navigation"
            variant="mobile"
          />
        </div>
      </div>
    </div>
  )
}

export default TraderLayout
