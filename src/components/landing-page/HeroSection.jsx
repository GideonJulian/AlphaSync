import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  ChartNoAxesCombined,
  CircleCheck,
  House,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import LandingBrand from './LandingBrand.jsx'

const copiedPositions = [
  { market: 'EUR / USD', direction: 'Buy', amount: '+$42.80', initials: 'EU' },
  { market: 'Gold · XAU', direction: 'Sell', amount: '+$18.25', initials: 'AU' },
]

function PhonePosition({ amount, direction, initials, market }) {
  const isPositive = amount.startsWith('+')

  return (
    <div className="flex items-center justify-between gap-2 border-b border-alpha-border py-3 last:border-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-alpha-border/60 text-[10px] font-bold text-alpha-navy">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-alpha-navy">{market}</p>
          <p className="flex items-center gap-1 text-[10px] text-alpha-navy/60">
            {direction === 'Buy' ? (
              <ArrowUpRight aria-hidden="true" className="size-3" />
            ) : (
              <ArrowDownLeft aria-hidden="true" className="size-3" />
            )}
            {direction} · Copied
          </p>
        </div>
      </div>
      <span
        className={`shrink-0 text-xs font-semibold ${
          isPositive ? 'text-alpha-navy' : 'text-alpha-black'
        }`}
      >
        {amount}
      </span>
    </div>
  )
}

function MobileDashboardMockup() {
  return (
    <div className="relative flex w-full max-w-[390px] items-center justify-center px-6 pb-8 pt-5 sm:pb-10">
      <div
        role="group"
        aria-label="AlphaSync mobile dashboard preview"
        className="relative z-10 w-[min(100%,290px)] rounded-[2.6rem] border-[7px] border-alpha-black bg-alpha-black p-1.5 shadow-[0_28px_70px_-24px_rgba(20,33,61,0.42)] motion-safe:animate-[phone-float_7s_ease-in-out_infinite] motion-reduce:transform-none"
      >
        <div className="overflow-hidden rounded-[2rem] bg-alpha-white">
          <div className="relative flex h-7 items-center justify-center bg-alpha-white">
            <span className="h-1.5 w-14 rounded-full bg-alpha-black" />
          </div>
          <div className="px-4 pb-3">
            <header className="flex items-center justify-between border-b border-alpha-border pb-3">
              <LandingBrand compact />
              <span
                aria-hidden="true"
                className="relative flex size-8 items-center justify-center rounded-full text-alpha-navy"
              >
                <Bell aria-hidden="true" className="size-[17px]" />
                <span className="absolute right-1 top-1 size-1.5 rounded-full bg-alpha-orange" />
              </span>
            </header>

            <section aria-label="Account overview" className="pt-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-alpha-navy text-xs font-bold text-alpha-white">
                    AF
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-alpha-navy">
                      Atlas FX
                    </p>
                    <p className="text-[10px] text-alpha-navy/60">
                      Master trader
                    </p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-alpha-border px-2 py-1 text-[9px] font-semibold text-alpha-navy">
                  <span className="size-1.5 rounded-full bg-alpha-orange motion-safe:animate-[live-pulse_2s_ease-in-out_infinite]" />
                  Copying Active
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-alpha-border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-alpha-navy/60">
                      Copy account balance
                    </p>
                    <p className="mt-1 text-xl font-bold tracking-tight text-alpha-navy">
                      $12,840<span className="text-sm">.50</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-0.5 rounded-md bg-alpha-border/50 px-1.5 py-1 text-[10px] font-semibold text-alpha-navy motion-safe:animate-[balance-refresh_6s_ease-in-out_infinite]">
                    <ArrowUpRight aria-hidden="true" className="size-3" />
                    4.82%
                  </span>
                </div>
                <div className="mt-3 flex items-end gap-1" aria-hidden="true">
                  {[8, 12, 10, 16, 13, 19, 16, 23, 18, 27, 24, 31].map(
                    (height, index) => (
                      <span
                        key={`${height}-${index}`}
                        className={`flex-1 rounded-sm ${
                          index === 11 ? 'bg-alpha-orange' : 'bg-alpha-navy/15'
                        }`}
                        style={{ height: `${height}px` }}
                      />
                    ),
                  )}
                  <span className="ml-1 text-[9px] text-alpha-navy/50">7D</span>
                </div>
              </div>
            </section>

            <section aria-labelledby="copied-positions-title" className="pt-4">
              <div className="flex items-center justify-between">
                <h2
                  id="copied-positions-title"
                  className="text-xs font-bold text-alpha-navy"
                >
                  Active positions
                </h2>
                <span className="text-[10px] font-medium text-alpha-navy/60">
                  2 open
                </span>
              </div>
              <div className="mt-1">
                {copiedPositions.map((position) => (
                  <PhonePosition key={position.market} {...position} />
                ))}
              </div>
            </section>
          </div>

          <nav
            aria-label="Dashboard preview navigation"
            className="grid grid-cols-4 border-t border-alpha-border bg-alpha-white px-2 py-2"
          >
            {[
              { label: 'Home', Icon: House, active: true },
              { label: 'Explore', Icon: ChartNoAxesCombined },
              { label: 'Activity', Icon: CircleCheck },
              { label: 'Profile', Icon: UserRound },
            ].map(({ active, Icon, label }) => (
              <span
                key={label}
                className={`flex flex-col items-center gap-1 py-1 text-[9px] ${
                  active ? 'font-semibold text-alpha-navy' : 'text-alpha-navy/45'
                }`}
              >
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </span>
            ))}
          </nav>
          <div className="flex h-5 items-center justify-center bg-alpha-white">
            <span className="h-1 w-24 rounded-full bg-alpha-black" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-14 left-0 z-20 hidden items-center gap-2.5 rounded-xl border border-alpha-border bg-alpha-white px-3 py-2.5 shadow-lg motion-safe:animate-[trade-toast_7s_ease-in-out_infinite] sm:flex">
        <span className="flex size-8 items-center justify-center rounded-full bg-alpha-border/60 text-alpha-navy">
          <CircleCheck aria-hidden="true" className="size-4" />
        </span>
        <span>
          <span className="block text-[11px] font-semibold text-alpha-navy">
            Position copied
          </span>
          <span className="block text-[10px] text-alpha-navy/60">
            XAU / USD · Buy
          </span>
        </span>
      </div>
      <div className="pointer-events-none absolute right-0 top-16 z-20 hidden items-center gap-2 rounded-xl border border-alpha-border bg-alpha-white px-3 py-2 shadow-lg sm:flex">
        <ShieldCheck aria-hidden="true" className="size-4 text-alpha-navy" />
        <span className="text-[10px] font-medium text-alpha-navy">
          Your account. Your control.
        </span>
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="overflow-hidden bg-alpha-white pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="flex flex-col justify-center lg:py-12">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-alpha-border bg-alpha-white px-3 py-1.5">
              <span className="size-2 rounded-full bg-alpha-orange" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-alpha-navy">
                One platform. Two ways to trade.
              </span>
            </div>
            <h1 className="mb-5 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-alpha-black sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
              Trade smarter.
              <br />
              Copy with confidence.
            </h1>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-alpha-navy/75 sm:text-lg">
              Discover verified trading strategies, automate your MT5 trading,
              or share your expertise with a growing community of traders.
            </p>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <Link
                to="/auth"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-alpha-orange px-6 py-3 text-sm font-semibold text-alpha-navy transition-colors hover:bg-alpha-orange/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy"
              >
                Start Copying
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                to="/auth"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-alpha-border bg-alpha-white px-6 py-3 text-sm font-semibold text-alpha-navy transition-colors hover:bg-alpha-border/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange"
              >
                Become a Trader
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div
              id="security"
              className="flex max-w-lg items-start gap-3 border-t border-alpha-border pt-5"
            >
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-[22px] shrink-0 text-alpha-navy"
              />
              <p className="text-[13px] leading-relaxed text-alpha-navy/75">
                <span className="font-semibold text-alpha-navy">
                  Your capital stays with your broker. You stay in control.
                </span>{' '}
                Connect your broker account with your MT5 account details and
                set your copy preferences.
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center lg:justify-end">
            <MobileDashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
