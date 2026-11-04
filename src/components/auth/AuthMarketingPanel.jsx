import { ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

function AuthBrand() {
  return (
    <Link to="/" aria-label="AlphaSync home" className="flex w-fit items-center gap-3">
      <span className="flex size-8 items-center justify-center rounded bg-alpha-navy font-serif text-xl font-bold italic text-alpha-white">
        α
      </span>
      <span className="flex flex-col">
        <span className="text-xl font-semibold leading-none tracking-tight text-alpha-navy">
          AlphaSync
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-alpha-navy/60">
          Execution Engine
        </span>
      </span>
    </Link>
  )
}

function SignalFeed() {
  return (
    <div className="flex items-center justify-between gap-2 py-3 text-xs text-alpha-navy/60">
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider">
        Signal Feed
      </span>
      <div className="mx-1 flex h-4 min-w-0 flex-1 items-center">
        <svg
          aria-label="Trade signal feed visualization"
          className="h-full w-full overflow-visible"
          preserveAspectRatio="none"
          role="img"
          viewBox="0 0 200 16"
        >
          <path
            d="M0,8 L40,8 L50,2 L60,14 L70,8 L120,8 L130,4 L138,12 L146,8 L200,8"
            fill="none"
            stroke="#E5E5E5"
            strokeWidth="1.5"
          />
          <path
            d="M0,8 L40,8 L50,2 L60,14 L70,8 L120,8 L130,4 L138,12 L146,8"
            fill="none"
            stroke="#14213D"
            strokeDasharray="4 2"
            strokeWidth="1.5"
          />
          <circle cx="146" cy="8" fill="#FCA311" r="3" />
        </svg>
      </div>
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-alpha-black">
        Zero Slippage
      </span>
    </div>
  )
}

function ExecutionRow({ market, side, latency, profit }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded border border-alpha-border bg-alpha-border/30 p-2.5 text-xs">
      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0 rounded bg-alpha-navy px-1.5 py-0.5 font-mono text-[10px] font-bold text-alpha-white">
          {market}
        </span>
        <span className="truncate font-medium text-alpha-black">
          {side} · {market === 'XAUUSD' ? '0.10' : '0.05'} lots
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="text-alpha-navy/60">{latency}</span>
        <span className="font-semibold text-alpha-navy">{profit}</span>
      </div>
    </div>
  )
}

function ActivityCard() {
  return (
    <section
      aria-label="Live trading activity"
      className="mb-6 rounded-xl border border-alpha-border bg-alpha-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-center justify-between gap-2 border-b border-alpha-border pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-2 shrink-0 rounded-full bg-alpha-orange" />
          <span className="truncate text-sm font-semibold text-alpha-black">
            Atlas FX Master
          </span>
          <span className="shrink-0 rounded bg-alpha-border/60 px-2 py-0.5 text-[11px] font-semibold text-alpha-navy">
            Active Sync
          </span>
        </div>
        <span className="shrink-0 text-xs text-alpha-navy/70">18ms latency</span>
      </div>

      <SignalFeed />

      <div className="space-y-2 pt-1">
        <ExecutionRow
          market="XAUUSD"
          side="BUY"
          latency="18ms"
          profit="+$182.00"
        />
        <ExecutionRow
          market="EURUSD"
          side="SELL"
          latency="14ms"
          profit="+$96.50"
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-alpha-border pt-3 text-[11px] text-alpha-navy/65">
        <span className="flex min-w-0 items-center gap-1.5">
          <SlidersHorizontal aria-hidden="true" className="size-3.5 shrink-0 text-alpha-navy" />
          <span className="truncate">Equinix NY4 Data Highway</span>
        </span>
        <span className="shrink-0 font-mono">16.4ms avg delay</span>
      </div>
    </section>
  )
}

function AuthMarketingPanel() {
  return (
    <section className="hidden w-full flex-col justify-between border-alpha-border bg-alpha-white p-8 sm:p-12 lg:flex lg:min-h-screen lg:w-[46%] lg:border-r lg:p-14 xl:w-[44%] xl:p-16">
      <AuthBrand />

      <div className="my-10 max-w-lg lg:my-auto">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-alpha-border bg-alpha-border/30 px-3 py-1 text-xs font-semibold text-alpha-navy">
          <span className="size-2 animate-pulse rounded-full bg-alpha-orange motion-reduce:animate-none" />
          <span className="text-[11px] uppercase tracking-wider">
            Institutional Grade Sync
          </span>
        </div>
        <h1 className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-alpha-black sm:text-4xl lg:text-[42px] lg:leading-[48px]">
          Trade smarter.
          <br />
          Copy with confidence.
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-alpha-navy/70">
          Discover verified trading strategies and automate your MT5 execution
          pipeline with microsecond precision and absolute risk custody.
        </p>

        <ActivityCard />

        <div className="flex items-start gap-3 rounded-lg border border-alpha-border bg-alpha-white p-3.5">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-[18px] shrink-0 text-alpha-navy"
          />
          <p className="text-[13px] leading-normal text-alpha-navy/80">
            <strong className="font-semibold text-alpha-black">
              Non-custodial architecture:
            </strong>{' '}
            Capital remains securely in your MT5 broker account. You retain full
            revoke permissions and equity stops at all times.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 border-t border-alpha-border pt-6 text-xs text-alpha-navy/60 sm:flex-row sm:items-center">
        <span>© 2026 AlphaSync Institutional Financial Technologies Inc.</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-alpha-orange" />
          API Cluster v3.4.1 Online
        </span>
      </div>
    </section>
  )
}

export default AuthMarketingPanel
