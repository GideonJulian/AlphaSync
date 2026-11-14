import { ArrowRight, BadgeCheck, ChartNoAxesCombined } from 'lucide-react'
import Button from '../ui/Button.jsx'

function TraderStrategyCard({ onView, strategy, featured = false }) {
  return (
    <article className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-alpha-border bg-alpha-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md md:gap-5 md:rounded-xl md:p-5 sm:p-6">
      <div>
        <div className="mb-4 flex items-center justify-between gap-2 md:mb-5 md:items-start md:gap-3">
          <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-alpha-navy text-sm font-bold tracking-wider text-alpha-white md:size-11">
              {strategy.initials}
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-alpha-navy/55 md:text-[11px] md:font-medium">
                Trader
              </p>
              <h3 className="truncate text-[15px] font-bold leading-tight text-alpha-black md:text-base">
                {strategy.trader}
              </h3>
              <p className="mt-0.5 truncate text-xs text-alpha-navy/70 md:text-sm md:mt-0">
                Strategy: <span className="font-semibold text-alpha-navy">{strategy.strategy}</span>
              </p>
            </div>
          </div>
          <span className="inline-flex min-h-7 shrink-0 items-center gap-1 rounded-full bg-alpha-orange/20 px-2 py-1 text-[10px] font-semibold text-alpha-navy md:min-h-0 md:px-2.5 md:text-[11px]">
            <BadgeCheck aria-hidden="true" className="size-3.5" />
            Verified
          </span>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 md:mb-5 md:grid-cols-2 md:gap-3 md:rounded-lg md:bg-alpha-border/30 md:p-3">
          <Metric
            className="col-span-3 flex items-center justify-between rounded-xl bg-alpha-navy px-3.5 py-2.5 text-alpha-white md:col-span-1 md:block md:rounded-none md:bg-transparent md:p-0 md:text-alpha-black"
            label="30-day return"
            value={`+${strategy.return30d}%`}
            highlighted
          />
          <Metric label="Win rate" value={`${strategy.winRate}%`} />
          <Metric label="Profit factor" value={strategy.profitFactor.toFixed(2)} />
          <Metric label="Max drawdown" value={`${strategy.drawdown}%`} />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-alpha-border pt-3 md:flex-row md:items-center md:justify-between md:gap-3 md:pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-alpha-navy/70">
          <ChartNoAxesCombined aria-hidden="true" className="size-4" />
          {strategy.trades.toLocaleString()} total trades
        </span>
        <Button
          onClick={() => onView(strategy)}
          size="sm"
          variant={featured ? 'primary' : 'secondary'}
          className="min-h-11 w-full justify-center px-4 md:min-h-9 md:w-auto"
        >
          View Strategy
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </article>
  )
}

function Metric({ className = '', highlighted = false, label, value }) {
  return (
    <div className={`min-w-0 rounded-lg bg-alpha-border/20 p-2 md:rounded-none md:bg-transparent md:p-0 ${className}`}>
      <p className={`truncate text-[9px] font-semibold uppercase tracking-wide md:text-[10px] ${
        highlighted ? 'text-alpha-white/70 md:text-alpha-navy/60' : 'text-alpha-navy/60'
      }`}>
        {label}
      </p>
      <p className={`mt-0.5 truncate font-bold md:mt-1 md:text-base ${
        highlighted
          ? 'text-xl text-alpha-orange md:text-base md:text-alpha-navy'
          : 'text-sm text-alpha-black md:text-base'
      }`}>
        {value}
      </p>
    </div>
  )
}

export default TraderStrategyCard
