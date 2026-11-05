import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  Cloud,
  ExternalLink,
  Flag,
  LockKeyhole,
  Search,
  Server,
  ShieldCheck,
  BadgeCheck,
  Clock3,
  RefreshCw,
  Shield,
  SlidersHorizontal,
  Store,
  Wallet
} from 'lucide-react'
import Logo from '../../components/common/Logo.jsx'

const newUserStrategies = [
  {
    initials: 'AF',
    name: 'Atlas FX Macro',
    lead: 'Julian Vance',
    tags: ['Algorithmic', 'G10 Currencies', 'Low Drawdown Focus'],
    execution: 'Automated',
  },
  {
    initials: 'AM',
    name: 'Apex Momentum',
    lead: 'Elena Rostova',
    tags: ['Multi-Asset', 'Trend Following', 'Equities & Indices'],
    execution: 'Hybrid Discretionary',
  },
]

const setupSteps = [
  {
    number: '01',
    title: 'Connect MT5',
    description:
      'Securely link your broker account via MT5 protocol to enable read/replicate access.',
    status: 'Action Required',
    footer: 'Current Task',
    active: true,
  },
  {
    number: '02',
    title: 'Discover Traders',
    description:
      'Explore verified trading strategies and inspect transparent historical trade logs.',
    status: 'Next Step',
    footer: 'Available after account link',
  },
  {
    number: '03',
    title: 'Start Copying',
    description:
      'Choose strategy allocations, set hard drawdown stop-limits, and begin auto-execution.',
    status: 'Final Step',
    footer: 'Awaiting MT5 link & trader choice',
  },
]

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

function ConnectionDiagram() {
  return (
    <div className="rounded-xl border border-alpha-border bg-alpha-white p-5 sm:p-6">
      <div className="relative flex w-full items-center justify-between gap-2">
        <div className="z-10 flex min-w-[92px] flex-col items-center text-center">
          <div className="mb-2 flex size-14 items-center justify-center rounded-lg border-2 border-alpha-navy">
            <Server aria-hidden="true" className="size-7 text-alpha-navy" />
          </div>
          <span className="text-xs font-bold text-alpha-navy">Broker MT5</span>
          <span className="text-[11px] text-alpha-navy/70">Server Host</span>
        </div>
        <div className="relative mx-1 flex min-w-0 flex-1 flex-col items-center justify-center">
          <div className="absolute top-1/2 w-full -translate-y-1/2 border-t-2 border-dashed border-alpha-border" />
          <span className="relative z-10 inline-flex items-center gap-1 rounded border border-alpha-border bg-alpha-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/70">
            <span className="size-1.5 animate-pulse rounded-full bg-alpha-orange motion-reduce:animate-none" />
            256-bit Bridge
          </span>
        </div>
        <div className="z-10 flex min-w-[98px] flex-col items-center text-center">
          <div className="mb-2 flex size-14 items-center justify-center rounded-lg bg-alpha-navy">
            <Cloud aria-hidden="true" className="size-7 text-alpha-white" />
          </div>
          <span className="text-xs font-bold text-alpha-navy">AlphaSync Cloud</span>
          <span className="text-[11px] text-alpha-navy/70">Execution Engine</span>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-alpha-border pt-4 text-xs">
        <span className="font-medium text-alpha-navy/70">Bridge Status</span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-alpha-navy">
          <span className="size-2 rounded-full bg-alpha-orange" />
          Ready to Pair
        </span>
      </div>
    </div>
  )
}

function SetupStep({ number, title, description, status, footer, active }) {
  return (
    <article
      className={`flex flex-col justify-between gap-4 rounded-xl bg-alpha-white p-5 ${
        active ? 'border-2 border-alpha-navy' : 'border border-alpha-border opacity-80'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`flex size-8 items-center justify-center rounded-lg text-sm font-bold ${
            active ? 'bg-alpha-navy text-alpha-white' : 'bg-alpha-border text-alpha-navy/70'
          }`}
        >
          {number}
        </span>
        <span
          className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
            active ? 'bg-alpha-orange text-alpha-navy' : 'bg-alpha-border text-alpha-navy/70'
          }`}
        >
          {status}
        </span>
      </div>
      <div>
        <h3 className={`text-base ${active ? 'font-bold' : 'font-semibold'} text-alpha-navy`}>
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-alpha-navy/70">{description}</p>
      </div>
      <div
        className={`flex items-center gap-1.5 border-t border-alpha-border pt-2 text-xs ${
          active ? 'font-semibold text-alpha-navy' : 'text-alpha-navy/70'
        }`}
      >
        {footer}
        {active && <ArrowRight aria-hidden="true" className="size-4" />}
      </div>
    </article>
  )
}

function StrategyPreview({ strategy }) {
  return (
    <article className="flex flex-col justify-between gap-4 rounded-lg border border-alpha-border bg-alpha-white p-5 transition-colors hover:border-alpha-navy">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-alpha-border bg-alpha-border/50 text-xs font-bold text-alpha-navy">
            {strategy.initials}
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-alpha-navy">{strategy.name}</h3>
            <p className="text-xs text-alpha-navy/70">
              Lead: {strategy.lead} · Verified Provider
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded bg-alpha-border px-2 py-0.5 text-[10px] font-semibold text-alpha-navy/70">
          Verified MT5
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {strategy.tags.map((tag) => (
          <span key={tag} className="rounded bg-alpha-border px-2 py-1 text-xs font-medium text-alpha-navy/70">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-alpha-border pt-3 text-xs">
        <span className="font-medium text-alpha-navy/70">
          Execution: {strategy.execution}
        </span>
        <a
          href="#strategies"
          className="inline-flex shrink-0 items-center gap-1 font-bold text-alpha-navy transition-colors hover:text-alpha-orange"
        >
          Preview Strategy
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </a>
      </div>
    </article>
  )
}



const existingUserStrategies = [
  {
    initials: 'AF',
    name: 'Atlas FX',
    price: '$39 / month',
    return: '+18.4%',
    drawdown: '7.8%',
    winRate: '68%',
    track: '120d track',
  },
  {
    initials: 'AM',
    name: 'Apex Momentum',
    price: '$49 / month',
    return: '+24.1%',
    drawdown: '6.2%',
    winRate: '71%',
    track: '240d track',
  },
  {
    initials: 'KQ',
    name: 'Kaufman Quant',
    price: '$59 / month',
    return: '+31.5%',
    drawdown: '5.1%',
    winRate: '76%',
    track: '380d track',
  },
]

const positions = [
  {
    initials: 'AU',
    symbol: 'XAUUSD',
    name: 'Gold Spot',
    strategy: 'Atlas FX',
    direction: 'BUY',
    lots: '0.05',
    open: '2,654.12',
    current: '2,662.80',
    pnl: '+$142.50',
  },
  {
    initials: 'EU',
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    strategy: 'Apex Momentum',
    direction: 'SELL',
    lots: '0.30',
    open: '1.08420',
    current: '1.08310',
    pnl: '+$57.50',
  },
  {
    initials: 'UJ',
    symbol: 'USDJPY',
    name: 'US Dollar / Yen',
    strategy: 'Kaufman Quant',
    direction: 'BUY',
    lots: '0.20',
    open: '152.14',
    current: '152.02',
    pnl: '-$18.20',
  },
]

function PerformanceChart({ period, onPeriodChange }) {
  const periods = ['7D', '30D', '90D', '1Y']

  return (
    <section
      id="performance"
      aria-labelledby="performance-title"
      className="flex flex-col gap-6 rounded-xl border border-alpha-border bg-alpha-white p-5 sm:p-6"
    >
      <div className="flex flex-col justify-between gap-4 border-b border-alpha-border pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 id="performance-title" className="text-base font-semibold tracking-tight text-alpha-black">
            Performance Trajectory
          </h2>
          <p className="text-xs text-alpha-navy/70">
            Aggregated equity balance net of subscription and execution costs
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Performance period"
          className="inline-flex w-fit rounded-lg border border-alpha-border bg-alpha-border/40 p-1"
        >
          {periods.map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={period === option}
              onClick={() => onPeriodChange(option)}
              className={`rounded px-3 py-1 text-xs transition-colors ${
                period === option
                  ? 'bg-alpha-white font-semibold text-alpha-black shadow-sm'
                  : 'text-alpha-navy/70 hover:text-alpha-black'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64 min-w-[560px] select-none">
        <svg
          aria-label={`Equity balance performance chart for ${period}`}
          role="img"
          className="size-full overflow-visible"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1000 240"
        >
          <line stroke="#E5E5E5" strokeDasharray="3 3" x1="0" x2="1000" y1="20" y2="20" />
          <line stroke="#E5E5E5" strokeDasharray="3 3" x1="0" x2="1000" y1="80" y2="80" />
          <line stroke="#E5E5E5" strokeDasharray="3 3" x1="0" x2="1000" y1="140" y2="140" />
          <line stroke="#E5E5E5" x1="0" x2="1000" y1="200" y2="200" />
          <path
            d="M 0 200 C 100 190, 160 175, 250 160 C 340 145, 420 165, 520 120 C 620 75, 710 110, 800 65 C 880 25, 940 35, 1000 20 L 1000 200 L 0 200 Z"
            fill="#14213D"
            fillOpacity="0.06"
          />
          <path
            d="M 0 200 C 100 190, 160 175, 250 160 C 340 145, 420 165, 520 120 C 620 75, 710 110, 800 65 C 880 25, 940 35, 1000 20"
            stroke="#14213D"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
          <circle cx="1000" cy="20" fill="#FCA311" r="5" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="520" cy="120" fill="#14213D" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
        <div className="absolute right-4 top-2 flex items-center gap-2 rounded-lg bg-alpha-navy px-3 py-1.5 text-alpha-white">
          <span className="size-1.5 rounded-full bg-alpha-orange" />
          <span className="text-sm font-semibold">$28,450.00</span>
          <span className="text-[11px] font-medium text-alpha-orange">+13.7%</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-alpha-navy/70">
          {['Oct 01', 'Oct 08', 'Oct 15', 'Oct 22', 'Oct 29'].map((date) => (
            <span key={date}>{date}</span>
          ))}
          <span className="font-semibold text-alpha-black">Today</span>
        </div>
      </div>
    </section>
  )
}

function MetricCard({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`flex flex-col justify-between rounded-xl border border-alpha-border bg-alpha-white p-5 sm:p-6 ${className}`}
    >
      {children}
    </section>
  )
}

function StrategyCard({ strategy, onView }) {
  return (
    <article className="flex flex-col justify-between gap-4 rounded-xl border border-alpha-border bg-alpha-white p-5 transition-colors hover:border-alpha-navy/40 sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-alpha-border bg-alpha-border/40 text-sm font-bold text-alpha-navy">
              {strategy.initials}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate text-sm font-semibold text-alpha-black">{strategy.name}</h3>
                <BadgeCheck aria-label="Verified provider" className="size-4 shrink-0 text-alpha-navy" />
              </div>
              <span className="text-xs text-alpha-navy/70">{strategy.price}</span>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-alpha-border/50 px-2 py-0.5 text-[10px] font-medium text-alpha-navy">
            <span className="size-1.5 rounded-full bg-alpha-orange" />
            Active
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 border-y border-alpha-border py-3">
          {[
            ['Net Return', strategy.return, true],
            ['Max DD', strategy.drawdown],
            ['Win Rate', strategy.winRate],
          ].map(([label, value, highlighted]) => (
            <div key={label} className="flex min-w-0 flex-col">
              <span className="text-[10px] text-alpha-navy/70">{label}</span>
              <span className={`mt-0.5 text-sm font-semibold ${highlighted ? 'text-alpha-navy' : 'text-alpha-black'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 pt-1">
        <span className="inline-flex items-center gap-1 text-xs text-alpha-navy/70">
          <Clock3 aria-hidden="true" className="size-4" />
          {strategy.track}
        </span>
        <button
          type="button"
          onClick={() => onView(strategy.name)}
          className="rounded-lg border border-alpha-border px-3.5 py-1.5 text-xs font-semibold text-alpha-black transition-colors hover:bg-alpha-border/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy"
        >
          View Strategy
        </button>
      </div>
    </article>
  )
}

function renderNewUserDashboard({
  search,
  setSearch,
  notice,
  setNotice,
  visibleStrategies,
}) {
  const mobileSetupSteps = [
    { number: '1', title: 'Connect MT5', description: 'Connect your trading account', action: 'Connect' },
    { number: '2', title: 'Choose a strategy', description: 'Explore verified traders', action: 'Explore' },
    { number: '3', title: 'Set your risk', description: 'Choose risk preferences', action: 'Set risk' },
  ]
  const handleConnect = () =>
    setNotice('MT5 connection is not available in this preview.')

  return (
    <div id="dashboard" className="min-h-screen overflow-x-hidden bg-alpha-border/30 text-alpha-black">
      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-4 py-4 sm:px-8 sm:py-5 lg:px-12">
        <div className="flex flex-1 flex-col gap-6 sm:gap-8">
          <DashboardHeader search={search} onSearchChange={setSearch} />

          <section className="flex flex-col justify-between gap-4 pt-1 md:flex-row md:items-end">
            <div className="hidden max-w-2xl flex-col gap-1.5 md:flex">
              <h1 className="text-3xl font-black tracking-tight text-alpha-navy md:text-4xl">
                Welcome to AlphaSync
              </h1>
              <p className="text-base leading-relaxed text-alpha-navy/70">
                Your copy trading journey starts here. Connect your MT5 account
                to start following verified traders and copying their
                strategies.
              </p>
            </div>
            <div
              id="account-status"
              className="hidden shrink-0 items-center gap-2.5 rounded-lg border border-alpha-border bg-alpha-white px-3.5 py-2 md:inline-flex md:self-auto"
            >
              <span className="size-2 rounded-full bg-alpha-orange" />
              <span className="text-xs font-semibold uppercase tracking-wider text-alpha-black">
                Account Status: MT5 Not Connected
              </span>
            </div>
            <div className="space-y-2 md:hidden">
              <h1 className="text-2xl font-bold tracking-tight text-alpha-navy">
                Good morning, Alex
              </h1>
              <p className="text-sm text-alpha-navy/70">
                Let&apos;s get your account ready.
              </p>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-alpha-border bg-alpha-white px-3 py-1 text-xs font-medium text-alpha-navy">
                <span className="size-2 rounded-full bg-alpha-orange" />
                Account Ready to Connect
              </div>
            </div>
          </section>

          <section className="hidden rounded-xl border border-alpha-border bg-alpha-white p-5 sm:p-8 lg:p-10 md:block">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="flex flex-col gap-6 lg:col-span-7">
                <div className="flex flex-col gap-2.5">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded bg-alpha-border px-2.5 py-1 text-xs font-bold tracking-wide text-alpha-navy">
                    <Flag aria-hidden="true" className="size-3.5" />
                    STEP 1 OF 3 · ACTION REQUIRED
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-alpha-navy md:text-3xl">
                    Connect your MT5 account
                  </h2>
                  <p className="max-w-xl text-base leading-relaxed text-alpha-navy/70">
                    Link your trading account securely to AlphaSync. Your funds
                    remain with your broker, and you stay in control of your
                    account.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-4 pt-1 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleConnect}
                    className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-alpha-orange px-6 py-3.5 text-sm font-bold tracking-wide text-alpha-navy transition-colors hover:bg-alpha-orange/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy"
                  >
                    Connect MT5 Account
                    <ArrowRight aria-hidden="true" className="size-[18px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotice('Contact your broker to confirm the MT5 server name.')}
                    className="text-left text-xs font-semibold text-alpha-navy/70 underline decoration-alpha-border underline-offset-4 transition-colors hover:text-alpha-navy"
                  >
                    Need help finding broker server?
                  </button>
                </div>
                {notice && (
                  <p role="status" className="text-xs text-alpha-navy/70">
                    {notice}
                  </p>
                )}
                <div className="flex max-w-xl items-start gap-3 rounded-lg border border-alpha-border bg-alpha-white p-3.5">
                  <LockKeyhole aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-alpha-navy" />
                  <p className="text-xs leading-relaxed text-alpha-navy/70">
                    <strong className="font-semibold text-alpha-navy">
                      Strict read &amp; execute protocol:
                    </strong>{' '}
                    Your trading credentials are encrypted. AlphaSync cannot
                    withdraw funds from your broker account.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <ConnectionDiagram />
              </div>
            </div>
          </section>

          <section aria-labelledby="mobile-getting-started-title" className="space-y-4 rounded-xl border border-alpha-border bg-alpha-white p-4 md:hidden">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h2 id="mobile-getting-started-title" className="text-base font-bold text-alpha-navy">
                  Get started
                </h2>
                <span className="text-xs font-medium text-alpha-navy/70">
                  0 of 3 completed
                </span>
              </div>
              <p className="text-xs leading-relaxed text-alpha-navy/70">
                Complete these steps to start copying strategies.
              </p>
              <div className="grid grid-cols-3 gap-1.5 pt-1" aria-hidden="true">
                {mobileSetupSteps.map((step) => (
                  <span key={step.number} className="h-1.5 rounded-full bg-alpha-border" />
                ))}
              </div>
            </div>
            <div className="space-y-3 pt-1">
              {mobileSetupSteps.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex items-center justify-between gap-3 rounded-lg border p-3 ${
                    index === 0
                      ? 'border-alpha-border bg-alpha-border/30'
                      : 'border-alpha-border bg-alpha-white'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        index === 0
                          ? 'bg-alpha-navy text-alpha-white'
                          : 'border border-alpha-border bg-alpha-border/50 text-alpha-navy/70'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-alpha-navy">
                        {step.title}
                      </p>
                      <p className="truncate text-xs text-alpha-navy/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index === 1 ? (
                    <a
                      href="#strategies"
                      className="flex h-9 shrink-0 items-center justify-center rounded-lg border border-alpha-border px-4 text-xs font-medium text-alpha-navy transition-colors hover:bg-alpha-border/30"
                    >
                      {step.action}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={
                        index === 0
                          ? handleConnect
                          : () => setNotice('Risk settings will be available after you connect MT5.')
                      }
                      className={`flex h-9 shrink-0 items-center justify-center rounded-lg px-4 text-xs font-semibold transition-colors ${
                        index === 0
                          ? 'bg-alpha-orange text-alpha-navy hover:bg-alpha-orange/85'
                          : 'border border-alpha-border bg-alpha-white text-alpha-navy hover:bg-alpha-border/30'
                      }`}
                    >
                      {step.action}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="getting-started-title"
            className="hidden flex-col gap-4 md:flex"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 id="getting-started-title" className="text-xl font-bold tracking-tight text-alpha-navy">
                Getting started
              </h2>
              <span className="text-xs font-medium text-alpha-navy/70">
                3 straightforward setup stages
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {setupSteps.map((step) => (
                <SetupStep key={step.number} {...step} />
              ))}
            </div>
          </section>

          <section className="space-y-3.5 rounded-xl border border-alpha-border bg-alpha-white p-4 md:hidden">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-alpha-navy">
                Connect your MT5 account
              </h2>
              <p className="text-xs leading-relaxed text-alpha-navy/70">
                Your account stays with your broker. AlphaSync connects to it
                only to execute your selected strategies.
              </p>
            </div>
            <button
              type="button"
              onClick={handleConnect}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-alpha-orange text-sm font-bold text-alpha-navy transition-colors hover:bg-alpha-orange/85 active:scale-[0.99]"
            >
              Connect MT5
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </button>
            {notice && (
              <p role="status" className="text-xs text-alpha-navy/70">
                {notice}
              </p>
            )}
            <div className="flex items-center justify-center gap-1.5 pt-0.5 text-[11px] font-medium leading-none text-alpha-navy/70">
              <LockKeyhole aria-hidden="true" className="size-3.5 shrink-0" />
              <span>Non-custodial MT5 bridge • Read &amp; execute only</span>
            </div>
          </section>

          <section
            id="strategies"
            className="flex flex-col gap-3 md:gap-6 md:rounded-xl md:border md:border-alpha-border md:bg-alpha-white md:p-8"
          >
            <div className="flex items-end justify-between gap-2 md:hidden">
              <div>
                <h2 className="text-base font-bold text-alpha-navy">
                  Explore strategies
                </h2>
                <p className="text-xs text-alpha-navy/70">
                  See verified traders before you connect.
                </p>
              </div>
            </div>
            <div className="hidden flex-col justify-between gap-4 border-b border-alpha-border pb-4 sm:flex-row sm:items-center md:flex">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-alpha-navy">
                  Explore trading strategies
                </h2>
                <p className="mt-0.5 text-xs text-alpha-navy/70 md:text-sm">
                  Discover traders and strategies available on AlphaSync while
                  you set up your account.
                </p>
              </div>
              <a
                href="#strategies"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-alpha-navy px-4 py-2 text-xs font-bold text-alpha-navy transition-colors hover:bg-alpha-border/50"
              >
                Explore Marketplace
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-4">
              {visibleStrategies.map((strategy) => (
                <StrategyPreview key={strategy.name} strategy={strategy} />
              ))}
              {visibleStrategies.length === 0 && (
                <p className="text-sm text-alpha-navy/70">
                  No strategies match your search.
                </p>
              )}
            </div>
            <div className="pt-1 text-center md:hidden">
              <a
                href="#strategies"
                className="inline-flex items-center justify-center gap-1 py-2 text-xs font-semibold text-alpha-navy transition-colors hover:text-alpha-navy/70"
              >
                View all strategies
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </section>

          <footer className="border-t border-alpha-border pb-8 pt-2 text-center text-xs text-alpha-navy/70">
            AlphaSync acts solely as a technological copy bridge. Trading
            involves risk. All trading operations run in your broker account.
          </footer>
        </div>
      </div>
    </div>
  )
}

function renderExistingUserDashboard({
  period,
  setPeriod,
  buyOnly,
  setBuyOnly,
  updatedAt,
  setUpdatedAt,
  notice,
  setNotice,
  visiblePositions,
}) {
  return (
    <div id="dashboard" className="min-h-screen overflow-x-hidden bg-alpha-border/30 text-alpha-black">
      <main className="min-h-screen min-w-0 px-4 py-6 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium text-alpha-navy/70">Copier Dashboard</p>
              <h1 className="text-2xl font-bold tracking-tight text-alpha-navy">
                Portfolio Overview
              </h1>
              <p className="mt-1 text-sm text-alpha-navy/70">
                Monitor your account, copied strategies, and open positions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                aria-label="Notifications"
                className="flex size-10 items-center justify-center rounded-lg border border-alpha-border bg-alpha-white transition-colors hover:bg-alpha-border/40"
              >
                <Bell aria-hidden="true" className="size-5 text-alpha-navy" />
              </button>
              <button
                type="button"
                onClick={() => setNotice('Deposits will be available when your account is connected to a broker.')}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-alpha-border bg-alpha-white px-4 text-sm font-semibold text-alpha-navy transition-colors hover:bg-alpha-border/40"
              >
                <Wallet aria-hidden="true" className="size-4" />
                Deposit Funds
              </button>
              <a
                href="#strategies"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-alpha-orange px-4 text-sm font-semibold text-alpha-navy transition-colors hover:bg-alpha-orange/85"
              >
                <Store aria-hidden="true" className="size-4" />
                Discover Traders
              </a>
            </div>
          </header>

          {notice && (
            <p role="status" className="rounded-lg border border-alpha-border bg-alpha-white px-4 py-2 text-sm text-alpha-navy">
              {notice}
            </p>
          )}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <MetricCard className="xl:col-span-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-alpha-navy/70">
                    Total Equity
                  </span>
                  <Wallet aria-hidden="true" className="size-5 text-alpha-navy/50" />
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-alpha-navy">$28,450.00</span>
                  <span className="text-xs text-alpha-navy/70">USD</span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-alpha-border pt-5">
                <div className="flex flex-col">
                  <span className="text-xs text-alpha-navy/70">Today&apos;s P&amp;L</span>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1">
                    <span className="text-sm font-semibold text-alpha-navy">+$670.40</span>
                    <span className="rounded bg-alpha-border px-1 py-0.5 text-[10px] font-medium text-alpha-navy">
                      +2.4%
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-alpha-navy/70">Overall Return</span>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1">
                    <span className="text-sm font-semibold text-alpha-navy">+$3,420.50</span>
                    <span className="rounded bg-alpha-border px-1 py-0.5 text-[10px] font-medium text-alpha-navy">
                      +13.7%
                    </span>
                  </div>
                </div>
              </div>
            </MetricCard>

            <MetricCard className="xl:col-span-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-alpha-navy/70">
                    Portfolio Deployment
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-alpha-border px-2 py-0.5 text-[10px] font-semibold text-alpha-navy">
                    <span className="size-1.5 rounded-full bg-alpha-orange" />
                    Synchronized
                  </span>
                </div>
                <div>
                  <div className="text-base font-semibold text-alpha-black">3 Active Strategies</div>
                  <p className="mt-0.5 text-xs text-alpha-navy/70">
                    Copied Capital: <strong className="font-semibold text-alpha-black">$18,500.00</strong>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-4">
                <div className="flex items-center justify-between text-xs text-alpha-navy/70">
                  <span>Capital Utilization</span>
                  <span className="font-semibold text-alpha-black">65% Allocated</span>
                </div>
                <div
                  role="progressbar"
                  aria-label="Capital utilization"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow="65"
                  className="h-2 w-full overflow-hidden rounded-full bg-alpha-border"
                >
                  <div className="h-full w-[65%] rounded-full bg-alpha-navy transition-[width] duration-500 motion-reduce:transition-none" />
                </div>
                <span className="text-right text-xs text-alpha-navy/70">$9,950.00 unallocated reserve</span>
              </div>
            </MetricCard>

            <MetricCard id="risk" className="xl:col-span-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-alpha-navy/70">
                    Safety Shield
                  </span>
                  <Shield aria-hidden="true" className="size-5 text-alpha-navy" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-alpha-black">Risk Level: Moderate</div>
                  <span className="text-xs text-alpha-navy/70">Automated protective drawdown</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-t border-alpha-border pt-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-alpha-navy/70">Emergency Stop</span>
                  <span className="font-semibold text-alpha-black">$8,000.00</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-alpha-navy/70">Max Open Trades</span>
                  <span className="font-semibold text-alpha-black">
                    5 <span className="font-normal text-alpha-navy/70">(2 Active)</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setNotice('Risk settings are displayed for preview only.')}
                  className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-alpha-navy transition-colors hover:text-alpha-orange"
                >
                  Manage Risk
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            </MetricCard>
          </div>

          <div className="overflow-x-auto">
            <PerformanceChart period={period} onPeriodChange={setPeriod} />
          </div>

          <section id="strategies" className="flex flex-col gap-4">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-semibold tracking-tight text-alpha-black">
                  Active Copied Strategies
                </h2>
                <p className="text-xs text-alpha-navy/70">
                  Live quantitative signals currently mirrored to your primary account
                </p>
              </div>
              <a
                href="#strategies"
                className="inline-flex items-center gap-1 text-sm font-medium text-alpha-black transition-colors hover:text-alpha-orange"
              >
                Explore Marketplace
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {existingUserStrategies.map((strategy) => (
                <StrategyCard
                  key={strategy.name}
                  strategy={strategy}
                  onView={(name) => setNotice(`${name} details are not available in this preview.`)}
                />
              ))}
            </div>
          </section>

          <section
            id="positions"
            aria-labelledby="positions-title"
            className="mb-4 flex flex-col overflow-hidden rounded-xl border border-alpha-border bg-alpha-white"
          >
            <div className="flex items-center justify-between gap-3 border-b border-alpha-border px-4 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <h2 id="positions-title" className="text-base font-semibold text-alpha-black">
                  Open Positions
                </h2>
                <span className="rounded-full bg-alpha-border px-2 py-0.5 text-[10px] font-semibold text-alpha-navy/70">
                  3 Live
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-pressed={buyOnly}
                  onClick={() => setBuyOnly((current) => !current)}
                  className={`inline-flex items-center gap-1 text-xs transition-colors ${
                    buyOnly ? 'font-semibold text-alpha-navy' : 'text-alpha-navy/70 hover:text-alpha-navy'
                  }`}
                >
                  <SlidersHorizontal aria-hidden="true" className="size-4" />
                  {buyOnly ? 'Show all' : 'Filter'}
                </button>
                <button
                  type="button"
                  aria-label="Refresh open positions"
                  onClick={() => setUpdatedAt(new Date().toLocaleTimeString())}
                  className="inline-flex items-center gap-1 text-xs text-alpha-navy/70 transition-colors hover:text-alpha-navy"
                  title={updatedAt ? `Refreshed at ${updatedAt}` : undefined}
                >
                  <RefreshCw aria-hidden="true" className="size-4" />
                  Refresh
                </button>
              </div>
            </div>
            {updatedAt && (
              <p role="status" className="sr-only">
                Positions refreshed at {updatedAt}.
              </p>
            )}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-alpha-border bg-alpha-border/30">
                    {['Symbol', 'Strategy', 'Direction', 'Lots', 'Open Price', 'Current Price', 'Unrealized P/L'].map(
                      (heading, index) => (
                        <th
                          key={heading}
                          scope="col"
                          className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/70 ${
                            index > 2 ? 'text-right' : ''
                          }`}
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-alpha-border">
                  {visiblePositions.map((position) => (
                    <tr key={position.symbol} className="transition-colors hover:bg-alpha-border/20">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="flex size-7 items-center justify-center rounded bg-alpha-border text-[10px] font-semibold text-alpha-navy">
                            {position.initials}
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-semibold text-alpha-black">{position.symbol}</span>
                            <span className="text-[10px] text-alpha-navy/70">{position.name}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-alpha-black">{position.strategy}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                            position.direction === 'SELL'
                              ? 'bg-alpha-border text-alpha-navy'
                              : 'bg-alpha-orange/30 text-alpha-navy'
                          }`}
                        >
                          {position.direction}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right text-sm text-alpha-black">{position.lots}</td>
                      <td className="px-5 py-4 text-right text-sm text-alpha-navy/70">{position.open}</td>
                      <td className="px-5 py-4 text-right text-sm font-medium text-alpha-black">{position.current}</td>
                      <td className="px-5 py-4 text-right text-sm font-semibold text-alpha-navy">{position.pnl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col justify-between gap-1 border-t border-alpha-border bg-alpha-border/20 px-4 py-3 text-xs text-alpha-navy/70 sm:flex-row sm:px-6">
              <span>Execution mode: Direct STP/ECN mirror</span>
              <span>
                Aggregated Net Open P/L:{' '}
                <strong className="font-semibold text-alpha-navy">+$181.80</strong>
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function CopierDashboard() {
  const mockCopierAccount = {
    hasConnectedMT5: false,
    hasActiveSubscription: false,
  }
  const [search, setSearch] = useState('')
  const [newUserNotice, setNewUserNotice] = useState('')
  const [period, setPeriod] = useState('30D')
  const [buyOnly, setBuyOnly] = useState(false)
  const [updatedAt, setUpdatedAt] = useState('')
  const [existingUserNotice, setExistingUserNotice] = useState('')
  const visibleStrategies = useMemo(
    () =>
      newUserStrategies.filter((strategy) =>
        `${strategy.name} ${strategy.lead} ${strategy.tags.join(' ')}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  )
  const visiblePositions = buyOnly
    ? positions.filter((position) => position.direction === 'BUY')
    : positions

  return mockCopierAccount.hasConnectedMT5 ? (
    renderExistingUserDashboard({
      period,
      setPeriod,
      buyOnly,
      setBuyOnly,
      updatedAt,
      setUpdatedAt,
      notice: existingUserNotice,
      setNotice: setExistingUserNotice,
      visiblePositions,
    })
  ) : (
    renderNewUserDashboard({
      search,
      setSearch,
      notice: newUserNotice,
      setNotice: setNewUserNotice,
      visibleStrategies,
    })
  )
}

export default CopierDashboard
