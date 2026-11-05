import {
  ArrowLeftRight,
  BrainCircuit,
  CandlestickChart,
  ChartNoAxesCombined,
  Grid2X2,
  History,
  Settings,
  Store,
  UserRound,
} from 'lucide-react'
import DashboardNavigation from './DashboardNavigation.jsx'

const navigationItems = [
  { label: 'Home', href: '#dashboard', icon: Grid2X2, active: true },
  { label: 'Marketplace', href: '#strategies', icon: Store },
  { label: 'My Strategies', href: '#strategies', icon: BrainCircuit },
  { label: 'Positions', href: '#positions', icon: CandlestickChart },
  { label: 'Trade History', disabled: true, icon: History },
  { label: 'Performance', href: '#performance', icon: ChartNoAxesCombined },
  { label: 'Wallet', disabled: true },
  { label: 'Settings', href: '#risk', icon: Settings },
]

function CopierSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 select-none flex-col justify-between border-r border-alpha-border bg-alpha-white md:flex">
      <div className="flex flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-alpha-border px-6">
          <span className="flex size-8 items-center justify-center rounded bg-alpha-navy text-alpha-orange">
            <ArrowLeftRight aria-hidden="true" className="size-5" />
          </span>
          <span className="text-base font-bold tracking-tight text-alpha-navy">
            AlphaSync
          </span>
        </div>
        <div className="p-3">
          <DashboardNavigation
            items={navigationItems}
            label="Copier navigation"
            variant="sidebar"
          />
        </div>
      </div>
      <div className="border-t border-alpha-border p-3">
        <div className="flex items-center justify-between gap-2 rounded-lg bg-alpha-border/40 p-2 transition-colors hover:bg-alpha-border">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-alpha-navy text-alpha-white">
              <UserRound aria-hidden="true" className="size-[18px]" />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold text-alpha-black">
                Alex
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/70">
                PRO TIER
              </span>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded border border-alpha-border bg-alpha-white px-2 py-0.5 text-xs text-alpha-navy/70">
            <span className="size-2 rounded-full bg-alpha-orange" />
            Live
          </span>
        </div>
      </div>
    </aside>
  )
}

export default CopierSidebar
