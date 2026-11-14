import { ArrowRight, BadgeCheck, ChartNoAxesCombined } from 'lucide-react'
import Button from '../ui/Button.jsx'

function TraderStrategyCard({ onView, strategy, featured = false }) {
  return (
    <article className="flex h-full flex-col justify-between gap-5 rounded-xl border border-alpha-border bg-alpha-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div>
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-alpha-navy text-sm font-bold tracking-wider text-alpha-white">
              {strategy.initials}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wide text-alpha-navy/60">
                Trader
              </p>
              <h3 className="truncate text-base font-bold text-alpha-black">
                {strategy.trader}
              </h3>
              <p className="truncate text-sm text-alpha-navy/70">
                Strategy: <span className="font-semibold text-alpha-navy">{strategy.strategy}</span>
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-alpha-orange/20 px-2.5 py-1 text-[11px] font-semibold text-alpha-navy">
            <BadgeCheck aria-hidden="true" className="size-3.5" />
            Verified
          </span>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3 rounded-lg bg-alpha-border/30 p-3">
          <Metric label="30-day return" value={`+${strategy.return30d}%`} highlighted />
          <Metric label="Win rate" value={`${strategy.winRate}%`} />
          <Metric label="Profit factor" value={strategy.profitFactor.toFixed(2)} />
          <Metric label="Max drawdown" value={`${strategy.drawdown}%`} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-alpha-border pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-alpha-navy/70">
          <ChartNoAxesCombined aria-hidden="true" className="size-4" />
          {strategy.trades.toLocaleString()} historical trades
        </span>
        <Button
          onClick={() => onView(strategy)}
          size="sm"
          variant={featured ? 'primary' : 'secondary'}
        >
          View Strategy
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </article>
  )
}

function Metric({ highlighted = false, label, value }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-alpha-navy/60">
        {label}
      </p>
      <p className={`mt-1 text-base font-bold ${highlighted ? 'text-alpha-navy' : 'text-alpha-black'}`}>
        {value}
      </p>
    </div>
  )
}

export default TraderStrategyCard
