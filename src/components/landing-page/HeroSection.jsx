import { CheckCircle2, Gauge, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

function TelemetryCard() {
  return (
    <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-alpha-border bg-alpha-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-alpha-orange" />
          <span className="text-sm font-semibold text-alpha-navy">Atlas FX</span>
          <span className="rounded bg-alpha-border px-2 py-0.5 text-xs text-alpha-navy">
            Master
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-alpha-border/60 px-2 py-1 text-[10px] font-semibold tracking-wide text-alpha-navy">
            COPYING ACTIVE
          </span>
          <span className="flex items-center gap-1 rounded bg-alpha-border/60 px-2 py-1 text-xs text-alpha-navy">
            <span className="size-1.5 animate-pulse rounded-full bg-alpha-orange motion-reduce:animate-none" />
            18ms
          </span>
        </div>
      </div>

      <div className="mb-5 rounded-xl bg-alpha-border/50 p-4">
        <div className="mb-2 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/70">
          <span>Signal Propagation Stream</span>
          <span className="text-right text-alpha-navy">Zero-Slippage Routing</span>
        </div>
        <div className="flex h-16 items-center">
          <svg
            aria-label="Signal propagation visualization"
            className="h-full w-full text-alpha-navy"
            fill="none"
            preserveAspectRatio="none"
            role="img"
            viewBox="0 0 400 64"
          >
            <path
              d="M 0 32 Q 40 12, 80 32 T 160 32 T 240 18 T 320 44 T 400 32"
              fill="none"
              opacity="0.85"
              stroke="currentColor"
              strokeWidth="1.75"
            />
            <circle cx="80" cy="32" fill="#14213D" r="3" />
            <circle cx="160" cy="32" fill="#14213D" r="3" />
            <circle cx="240" cy="18" fill="#FCA311" r="3.5" />
            <circle cx="320" cy="44" fill="#14213D" r="3" />
            <circle cx="400" cy="32" fill="#FCA311" r="4" />
          </svg>
        </div>
        <div className="flex items-center justify-between gap-2 pt-2 text-[11px] text-alpha-navy/70">
          <span>Host: LD4 Equinix (London)</span>
          <span className="text-right font-semibold text-alpha-navy">
            Slave: NY4 Connected
          </span>
        </div>
      </div>

      <div className="mb-5 space-y-2">
        {[
          { symbol: 'XAU', market: 'XAUUSD', trade: 'BUY · 0.10 Lots', delay: '18ms' },
          { symbol: 'EUR', market: 'EURUSD', trade: 'SELL · 0.05 Lots', delay: '14ms' },
        ].map(({ delay, market, symbol, trade }) => (
          <div
            key={market}
            className="flex items-center justify-between gap-3 rounded-lg bg-alpha-border/50 p-3 transition-colors hover:bg-alpha-border"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded bg-alpha-navy text-[10px] font-semibold text-alpha-white">
                {symbol}
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight text-alpha-navy">{market}</p>
                <p className="text-xs text-alpha-navy/70">{trade}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-alpha-navy">
                <CheckCircle2 aria-hidden="true" className="size-3.5 text-alpha-orange" />
                Copied instantly
              </span>
              <p className="text-[10px] text-alpha-navy/70">Synced {delay}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-alpha-border pt-3 text-alpha-navy/70">
        <span className="flex items-center gap-2 text-xs">
          <Gauge aria-hidden="true" className="size-4 text-alpha-navy" />
          Avg. Routing Delay
        </span>
        <span className="text-right text-xs font-semibold text-alpha-navy">
          16.4 ms (99.98% Fill)
        </span>
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="bg-alpha-white pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col justify-center lg:pr-8">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-alpha-border/50 px-3 py-1.5">
              <span className="size-2 rounded-full bg-alpha-orange" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-alpha-navy">
                MT5 Execution Engine
              </span>
            </div>
            <h1 className="mb-5 text-4xl font-semibold leading-tight tracking-tight text-alpha-black sm:text-5xl lg:text-[54px] lg:leading-[60px]">
              Trade smarter.
              <br />
              Copy with confidence.
            </h1>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-alpha-navy/75 sm:text-lg">
              Follow verified traders and automatically copy their MT5 trades
              with precise control over your risk, leverage, and portfolio
              exposure.
            </p>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center rounded-lg bg-alpha-orange px-6 py-3 text-sm font-semibold text-alpha-navy shadow-sm transition-colors hover:bg-alpha-orange/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy"
              >
                Get Started
              </Link>
              <a
                href="#user-types"
                className="inline-flex items-center justify-center rounded-lg border border-alpha-border bg-alpha-white px-6 py-3 text-sm font-semibold text-alpha-navy shadow-sm transition-colors hover:bg-alpha-border/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange"
              >
                Explore Traders
              </a>
            </div>
            <div
              id="security"
              className="flex max-w-lg items-start gap-3 rounded-xl bg-alpha-border/50 p-4"
            >
              <Shield
                aria-hidden="true"
                className="mt-0.5 size-[22px] shrink-0 text-alpha-navy"
              />
              <p className="text-[13px] leading-normal text-alpha-navy/75">
                Your capital stays with your broker. You retain exclusive
                custody, direct withdrawal authority, and account access at all
                times.
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center lg:pl-2">
            <TelemetryCard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
