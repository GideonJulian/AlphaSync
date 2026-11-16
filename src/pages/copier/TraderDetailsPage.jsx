import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Info,
  LockKeyhole,
  Share2,
  ShieldCheck,
  Star,
  TrendingUp,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import Logo from '../../components/common/Logo.jsx'
import Modal from '../../components/ui/Modal.jsx'
import copierStrategies from '../../constants/copierStrategies.js'
import copierTraderDetails from '../../constants/copierTraderDetails.js'

const desktopPeriods = ['1M', '3M', '1Y', 'ALL']
const mobilePeriods = ['1M', '3M', '6M', '1Y']
const periodScale = {
  '1M': 0.3,
  '3M': 0.55,
  '6M': 0.72,
  '1Y': 0.9,
  ALL: 1,
}

function createChartPaths(values, period) {
  const scale = periodScale[period]
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 740
    const y = 214 - value * scale * 180
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const line = `M ${points.join(' L ')}`
  const area = `M 0,220 L ${points.join(' L ')} L 740,220 Z`
  const [lastX, lastY] = points[points.length - 1].split(',')

  return { area, line, lastX, lastY }
}

function Stat({ label, value, note, emphasis = false, tone = 'default' }) {
  const valueTone = {
    default: 'text-alpha-navy',
    positive: 'text-alpha-navy',
    warning: 'text-alpha-navy',
  }[tone]

  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/60">
        {label}
      </p>
      <p
        className={`mt-1 truncate font-bold tracking-tight ${valueTone} ${
          emphasis ? 'text-2xl sm:text-3xl' : 'text-base sm:text-lg'
        }`}
      >
        {value}
      </p>
      {note && <p className="mt-1 text-[11px] leading-snug text-alpha-navy/60">{note}</p>}
    </div>
  )
}

function ChartPeriodButtons({ periods, period, onChange, label }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex max-w-full items-center gap-0.5 rounded-lg bg-alpha-border/40 p-1"
    >
      {periods.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={period === option}
          onClick={() => onChange(option)}
          className={`min-h-8 rounded px-2.5 text-xs transition-colors sm:px-3 ${
            period === option
              ? 'bg-alpha-navy font-semibold text-alpha-white shadow-sm'
              : 'text-alpha-navy/70 hover:bg-alpha-border/60 hover:text-alpha-navy'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function PerformanceChart({ period, onPeriodChange, strategy, details }) {
  const paths = createChartPaths(details.chartTrend, period)

  return (
    <Card className="rounded-xl p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
        <div>
          <h2 className="text-base font-semibold text-alpha-black">Performance</h2>
          <p className="mt-0.5 text-xs text-alpha-navy/70">
            Mock cumulative equity curve · {period}
          </p>
        </div>
        <div className="hidden lg:block">
          <ChartPeriodButtons
            label="Desktop chart timeframe"
            onChange={onPeriodChange}
            period={period}
            periods={desktopPeriods}
          />
        </div>
        <div className="lg:hidden">
          <ChartPeriodButtons
            label="Mobile chart timeframe"
            onChange={onPeriodChange}
            period={period}
            periods={mobilePeriods}
          />
        </div>
      </div>

      <div className="relative h-40 min-w-0 sm:h-56 lg:h-64">
        <svg
          role="img"
          aria-label={`${strategy.strategy} illustrative performance chart for ${period}`}
          className="size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 760 240"
        >
          {[30, 90, 150, 210].map((y) => (
            <line
              key={y}
              stroke="#E5E5E5"
              strokeDasharray={y === 210 ? undefined : '4 4'}
              strokeWidth="1"
              x1="0"
              x2="760"
              y1={y}
              y2={y}
            />
          ))}
          <path d={paths.area} fill="#E5E5E5" fillOpacity="0.55" />
          <path
            d={paths.line}
            stroke="#14213D"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <circle cx={paths.lastX} cy={paths.lastY} fill="#FCA311" r="5" />
          <circle
            cx={paths.lastX}
            cy={paths.lastY}
            fill="none"
            r="9"
            stroke="#14213D"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-alpha-navy/60 sm:text-xs">
        <span>Start</span>
        <span>Midpoint</span>
        <span>Today · mock figures</span>
      </div>
    </Card>
  )
}

function AboutStrategy({ strategy, details }) {
  return (
    <Card className="flex flex-col gap-5 rounded-xl p-4 shadow-sm sm:gap-6 sm:p-6">
      <div>
        <h2 className="text-base font-semibold text-alpha-black">About {strategy.strategy}</h2>
        <p className="mt-2 text-sm leading-relaxed text-alpha-navy/75">{details.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          ...details.markets,
          details.riskLevel,
          'Defined risk limits',
          'MT5 compatible',
        ].map((tag) => (
          <span
            key={tag}
            className="rounded bg-alpha-border/40 px-3 py-1.5 text-xs font-medium text-alpha-navy"
          >
            {tag}
          </span>
        ))}
      </div>

      <dl className="grid grid-cols-2 gap-4 border-t border-alpha-border pt-4 sm:grid-cols-4">
        <Detail label="Average holding time" value={details.typicalHold} />
        <Detail label="Sharpe ratio" value={details.sharpeRatio.toFixed(2)} />
        <Detail label="Profit factor" value={strategy.profitFactor.toFixed(2)} />
        <Detail label="Active copiers" value={`${details.activeCopiers.toLocaleString()} traders`} />
      </dl>

      <div className="grid grid-cols-1 gap-2 border-t border-alpha-border pt-4 sm:grid-cols-2">
        <Detail label="Trading style" value={details.tradingStyle} />
        <Detail label="Markets" value={details.markets.join(' · ')} />
        <Detail label="Broker" value={details.broker} />
        <Detail label="Risk level" value={details.riskLevel} />
        <Detail label="Typical hold" value={details.typicalHold} />
        <Detail label="Minimum capital" value={`$${details.minCapital.toLocaleString()}`} />
      </div>
    </Card>
  )
}

function Detail({ label, value }) {
  return (
    <div className="min-w-0 rounded-lg bg-alpha-border/20 px-3 py-2">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/60">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-semibold text-alpha-navy">{value}</dd>
    </div>
  )
}

function RiskGuardrails({ details }) {
  return (
    <Card className="rounded-xl bg-alpha-border/30 p-4 shadow-sm sm:p-6 lg:hidden">
      <div className="flex items-center gap-2">
        <ShieldCheck aria-hidden="true" className="size-5 text-alpha-navy" />
        <h2 className="text-base font-semibold text-alpha-navy">Risk Guardrails</h2>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-alpha-navy/75">
        {details.guardrails.description}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Guardrail label="Max drawdown" value={`${details.guardrails.maxDrawdownStop} stop`} />
        <Guardrail label="Lot multiplier" value={details.guardrails.lotMultiplier} />
        <Guardrail
          label="Max open"
          value={`${details.guardrails.maxOpenPositions} positions`}
        />
      </div>
    </Card>
  )
}

function Guardrail({ label, value }) {
  return (
    <div className="rounded-lg bg-alpha-white p-2">
      <span className="block text-[9px] font-semibold uppercase tracking-wide text-alpha-navy/60 sm:text-[10px]">
        {label}
      </span>
      <span className="mt-1 block text-xs font-bold text-alpha-navy sm:text-sm">{value}</span>
    </div>
  )
}

function RecentTrades({ trades, showAll, onToggle, isWide }) {
  const visibleTrades = showAll ? trades : trades.slice(0, isWide ? 3 : 4)

  return (
    <Card
      id="recent-trades"
      className="rounded-xl p-4 shadow-sm sm:p-6"
      aria-labelledby="recent-trades-title"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 id="recent-trades-title" className="text-base font-semibold text-alpha-black">
            Recent Trades
          </h2>
          <p className="mt-0.5 text-xs text-alpha-navy/70">Sample closed activity · mock ledger</p>
        </div>
        <button
          type="button"
          aria-expanded={showAll}
          onClick={onToggle}
          className="hidden min-h-10 items-center gap-1 text-xs font-semibold text-alpha-navy hover:text-alpha-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy lg:inline-flex"
        >
          {showAll ? 'Show recent only' : 'View full ledger'}
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </button>
      </div>

      <div className="hidden overflow-x-auto xl:block">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-alpha-border/30 text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/70">
              <th scope="col" className="rounded-l px-3 py-3">Symbol</th>
              <th scope="col" className="px-3 py-3">Direction</th>
              <th scope="col" className="px-3 py-3">Entry / Exit</th>
              <th scope="col" className="px-3 py-3">Duration</th>
              <th scope="col" className="rounded-r px-3 py-3 text-right">Net P/L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-alpha-border text-sm">
            {visibleTrades.map((trade) => (
              <tr key={`${trade.symbol}-${trade.entry}`} className="hover:bg-alpha-border/20">
                <td className="whitespace-nowrap px-3 py-3 font-semibold text-alpha-black">
                  <span className="mr-2 inline-block size-2 rounded-full bg-alpha-orange" />
                  {trade.symbol}
                </td>
                <td className="px-3 py-3">
                  <span className="rounded bg-alpha-border/40 px-2 py-1 text-[10px] font-semibold text-alpha-navy">
                    {trade.direction}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-xs text-alpha-navy/70">
                  {trade.entry} → {trade.exit}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-xs text-alpha-navy/70">
                  {trade.duration}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-right text-sm font-semibold text-alpha-navy">
                  +${trade.pnl.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 xl:hidden">
        {visibleTrades.map((trade) => (
          <article
            key={`${trade.symbol}-${trade.entry}`}
            className="flex items-center justify-between gap-3 rounded-lg bg-alpha-border/25 p-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-alpha-navy">{trade.symbol}</h3>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                    trade.direction === 'BUY'
                      ? 'bg-alpha-orange/20 text-alpha-navy'
                      : 'bg-alpha-border text-alpha-navy'
                  }`}
                >
                  {trade.direction}
                </span>
              </div>
              <p className="mt-1 truncate text-xs text-alpha-navy/70">
                {trade.entry} → {trade.exit} · {trade.duration}
              </p>
            </div>
            <span className="shrink-0 text-sm font-bold text-alpha-navy">
              +${trade.pnl.toFixed(2)}
            </span>
          </article>
        ))}
      </div>
    </Card>
  )
}

function SubscriptionCard({ strategy, details, onSubscribe }) {
  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col gap-5 rounded-xl p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/60">
              Strategy tier
            </p>
            <h2 className="mt-1 text-base font-semibold text-alpha-black">{details.tier}</h2>
          </div>
          <span className="rounded bg-alpha-border/40 px-2 py-1 text-[10px] font-semibold text-alpha-navy">
            MT5 SYNC
          </span>
        </div>

        <div className="flex items-baseline gap-1 border-b border-alpha-border pb-4">
          <span className="text-3xl font-bold tracking-tight text-alpha-navy">
            ${details.monthlyPrice}
          </span>
          <span className="text-sm text-alpha-navy/70">/ month</span>
          <span className="ml-auto text-[10px] text-alpha-navy/70">Cancel anytime</span>
        </div>

        <ul className="flex flex-col gap-3">
          {[
            ['Automated trade copying', 'Mock strategy details; no execution is connected.'],
            ['Configurable risk controls', 'Review the sample guardrails before subscribing.'],
            ['Performance monitoring', 'Illustrative statistics for frontend preview only.'],
            ['Non-custodial setup', 'No broker credentials are requested here.'],
          ].map(([title, description]) => (
            <li key={title} className="flex items-start gap-2">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-alpha-navy" />
              <span>
                <span className="block text-sm font-semibold text-alpha-black">{title}</span>
                <span className="block text-xs leading-relaxed text-alpha-navy/70">
                  {description}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <Button
          onClick={onSubscribe}
          variant="accent"
          className="min-h-12 w-full font-semibold"
        >
          Subscribe to {strategy.strategy}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
        <p className="text-center text-[11px] text-alpha-navy/70">
          Prototype pricing · no subscription will be created
        </p>
      </Card>

      <div className="flex items-start gap-3 rounded-xl bg-alpha-border/40 p-4">
        <LockKeyhole aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-alpha-navy" />
        <div>
          <h3 className="text-sm font-semibold text-alpha-navy">Account security</h3>
          <p className="mt-1 text-xs leading-relaxed text-alpha-navy/70">
            This page is a frontend preview. It does not connect to a broker or execute trades.
          </p>
        </div>
      </div>
    </div>
  )
}

function CommunityReviews({ details }) {
  return (
    <Card className="rounded-xl p-4 shadow-sm sm:p-6 lg:hidden">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-alpha-navy">Community &amp; Reviews</h2>
          <p className="mt-0.5 text-xs text-alpha-navy/70">
            {details.activeCopiers.toLocaleString()} sample copiers
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-lg bg-alpha-border/30 px-2 py-1 text-sm font-bold text-alpha-navy">
          <Star aria-hidden="true" className="size-4 fill-alpha-orange text-alpha-orange" />
          {details.rating.toFixed(1)}
          <span className="text-xs font-medium text-alpha-navy/60">/ 5.0</span>
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {details.reviews.map((review, index) => (
          <blockquote key={review} className="rounded-lg bg-alpha-border/25 p-3">
            <p className="text-sm italic leading-relaxed text-alpha-navy/80">“{review}”</p>
            <footer className="mt-2 text-[10px] font-semibold text-alpha-navy/60">
              Sample review {index + 1}
            </footer>
          </blockquote>
        ))}
      </div>
    </Card>
  )
}

function TraderDetailsPage() {
  const { strategyId } = useParams()
  const strategy = copierStrategies.find((item) => item.id === strategyId)
  const details = copierTraderDetails[strategyId]
  const startsWide = window.matchMedia('(min-width: 1024px)').matches
  const [isWide, setIsWide] = useState(startsWide)
  const [period, setPeriod] = useState(startsWide ? '3M' : '6M')
  const [showAllTrades, setShowAllTrades] = useState(false)
  const [shareStatus, setShareStatus] = useState('')
  const [subscribeOpen, setSubscribeOpen] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState('')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    function handleLayoutChange(event) {
      setIsWide(event.matches)
      setPeriod((current) => {
        const validPeriods = event.matches ? desktopPeriods : mobilePeriods
        return validPeriods.includes(current) ? current : event.matches ? '3M' : '6M'
      })
    }

    mediaQuery.addEventListener('change', handleLayoutChange)
    return () => mediaQuery.removeEventListener('change', handleLayoutChange)
  }, [])

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/copier/marketplace/${strategyId}`,
      )
      setShareStatus('Strategy link copied.')
    } catch {
      setShareStatus('Clipboard is unavailable. Copy the strategy URL from your address bar.')
    }
  }

  function openSubscriptionPreview() {
    setSubscriptionStatus('')
    setSubscribeOpen(true)
  }

  function closeSubscriptionPreview() {
    setSubscribeOpen(false)
    setSubscriptionStatus('')
  }

  if (!strategy || !details) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-10">
        <Card className="w-full p-6 text-center sm:p-10">
          <Info aria-hidden="true" className="mx-auto size-8 text-alpha-navy/70" />
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-alpha-navy">
            Trader details unavailable
          </h1>
          <p className="mt-2 text-sm text-alpha-navy/70">
            This strategy may have been removed or its mock profile is not available.
          </p>
          <Link
            to="/copier/marketplace"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-alpha-navy px-4 py-2 text-sm font-semibold text-alpha-white transition-colors hover:bg-alpha-navy/90"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Discover
          </Link>
        </Card>
      </main>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-alpha-border/30 text-alpha-black">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 sm:px-8 sm:py-5 lg:px-10">
        <header className="-mx-4 -mt-4 mb-4 flex items-center justify-between border-b border-alpha-border bg-alpha-white px-4 py-3 sm:-mx-8 sm:-mt-5 sm:px-8 md:hidden">
          <Logo className="text-base" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/60">
            Copier preview
          </span>
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 pb-36 sm:gap-6 sm:pb-40 lg:gap-8 lg:pb-8">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <Link
              to="/copier/marketplace"
              className="inline-flex min-h-11 w-fit items-center gap-1.5 rounded-lg pr-2 text-sm font-semibold text-alpha-navy/70 transition-colors hover:text-alpha-navy"
            >
              <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
              <span className="hidden sm:inline">Back to Discover</span>
              <span className="sm:hidden">Discover</span>
            </Link>
            <span className="max-w-[35vw] truncate text-center text-sm font-semibold text-alpha-navy sm:hidden">
              {strategy.strategy}
            </span>
            <div className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/60 sm:flex">
              <span>Strategy ID</span>
              <span className="text-alpha-border">/</span>
              <span className="text-alpha-navy">{details.strategyCode}</span>
            </div>
            <button
              type="button"
              onClick={handleShare}
              className="col-start-3 inline-flex size-10 min-h-10 items-center justify-center justify-self-end rounded-lg text-alpha-navy transition-colors hover:bg-alpha-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy lg:hidden"
              aria-label="Copy strategy link"
            >
              <Share2 aria-hidden="true" className="size-5" />
            </button>
            <span className="hidden text-right text-[10px] text-alpha-navy/60 lg:block">
              Mock performance profile
            </span>
          </div>

          {shareStatus && (
            <p role="status" className="rounded-lg bg-alpha-white px-3 py-2 text-xs text-alpha-navy">
              {shareStatus}
            </p>
          )}

          <Card className="rounded-xl p-4 shadow-sm sm:p-6 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-alpha-navy text-base font-bold tracking-tight text-alpha-white sm:size-14 sm:text-lg">
                  {strategy.initials}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-bold tracking-tight text-alpha-navy sm:text-2xl">
                      {strategy.strategy}
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded bg-alpha-border/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-alpha-navy">
                      <BadgeCheck aria-hidden="true" className="size-3.5" />
                      Verified
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-alpha-navy/70 sm:text-sm">
                    Master Trader: <strong className="font-semibold text-alpha-black">{strategy.trader}</strong>
                    <span className="mx-1.5 text-alpha-border">·</span>
                    {details.auditedMonths} months of sample history
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-alpha-navy/75">
                    {details.summary}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 border-t border-alpha-border pt-4 lg:items-end lg:border-0 lg:pt-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-alpha-navy">
                    ${details.monthlyPrice}
                  </span>
                  <span className="text-sm text-alpha-navy/70">/ month</span>
                </div>
                <span className="text-[11px] text-alpha-navy/70">Cancel anytime · mock pricing</span>
                <Button
                  onClick={openSubscriptionPreview}
                  variant="accent"
                  className="hidden min-h-11 px-6 font-semibold lg:inline-flex"
                >
                  Subscribe to {strategy.strategy}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-alpha-border pt-4">
              {details.markets.map((market) => (
                <span
                  key={market}
                  className="rounded bg-alpha-border/30 px-2.5 py-1 text-xs font-medium text-alpha-navy"
                >
                  {market}
                </span>
              ))}
              <span className="rounded bg-alpha-border/30 px-2.5 py-1 text-xs font-medium text-alpha-navy">
                MT5 compatible
              </span>
              <span className="text-[10px] font-medium text-alpha-navy/60">
                All figures and prices are mock prototype data.
              </span>
            </div>
          </Card>

          <div className="grid min-w-0 grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="flex min-w-0 flex-col gap-5 sm:gap-6 lg:col-span-8 lg:gap-8">
              <Card className="rounded-xl p-4 shadow-sm sm:p-6">
                <div className="hidden grid-cols-3 gap-5 lg:grid">
                  <Stat
                    emphasis
                    label="Total Return"
                    note="All-time · mock data"
                    value={`+${details.totalReturn.toFixed(1)}%`}
                  />
                  <Stat
                    emphasis
                    label="Win Rate"
                    note={`${strategy.trades.toLocaleString()} total trades`}
                    value={`${strategy.winRate.toFixed(1)}%`}
                  />
                  <Stat
                    emphasis
                    label="Max Drawdown"
                    note="Sample historical drawdown"
                    value={`${strategy.drawdown}%`}
                  />
                </div>
                <div className="lg:hidden">
                  <div className="flex items-center justify-between gap-3 border-b border-alpha-border pb-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/60">
                        Total Return
                      </p>
                      <p className="mt-1 text-3xl font-bold tracking-tight text-alpha-navy">
                        +{details.totalReturn.toFixed(1)}%
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-alpha-navy">
                      <TrendingUp aria-hidden="true" className="size-4" />
                      All-time
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Stat label="Win Rate" value={`${strategy.winRate.toFixed(1)}%`} />
                    <Stat label="Max Drawdown" value={`${strategy.drawdown}%`} tone="warning" />
                    <Stat label="Profit Factor" value={strategy.profitFactor.toFixed(2)} />
                    <Stat label="Total Trades" value={strategy.trades.toLocaleString()} />
                  </div>
                </div>
              </Card>

              <PerformanceChart
                details={details}
                onPeriodChange={setPeriod}
                period={period}
                strategy={strategy}
              />

              <AboutStrategy details={details} strategy={strategy} />

              <RiskGuardrails details={details} />

              <RecentTrades
                isWide={isWide}
                onToggle={() => setShowAllTrades((current) => !current)}
                showAll={showAllTrades}
                trades={details.trades}
              />

              <CommunityReviews details={details} />
            </div>

            <aside className="hidden min-w-0 lg:sticky lg:top-6 lg:col-span-4 lg:block">
              <SubscriptionCard
                details={details}
                onSubscribe={openSubscriptionPreview}
                strategy={strategy}
              />
            </aside>
          </div>

          <p className="text-center text-[11px] leading-relaxed text-alpha-navy/60">
            Prototype preview only. Performance and reviews are mock examples, not investment advice
            or a guarantee of future results.
          </p>
        </main>

        <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-20 border-t border-alpha-border bg-alpha-white/95 px-4 py-2.5 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="flex min-w-0 flex-col">
              <span className="text-base font-bold text-alpha-navy">
                ${details.monthlyPrice}
                <span className="ml-1 text-xs font-medium text-alpha-navy/70">/ month</span>
              </span>
              <span className="text-[10px] text-alpha-navy/70">Mock pricing · cancel anytime</span>
            </div>
            <Button
              onClick={openSubscriptionPreview}
              variant="accent"
              className="min-h-11 shrink-0 px-5 font-semibold"
            >
              Subscribe
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>

        <Modal
          open={subscribeOpen}
          onClose={closeSubscriptionPreview}
          title={`Subscribe to ${strategy.strategy}`}
        >
          <div className="space-y-4">
            <div className="rounded-lg bg-alpha-border/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-alpha-navy/60">
                Prototype subscription
              </p>
              <p className="mt-1 text-2xl font-bold text-alpha-navy">
                ${details.monthlyPrice}
                <span className="ml-1 text-sm font-medium text-alpha-navy/70">/ month</span>
              </p>
            </div>
            <p className="text-sm leading-relaxed text-alpha-navy/75">
              This subscription flow is a frontend preview only. No payment, wallet reservation, or
              trade copying will be started.
            </p>
            {subscriptionStatus && (
              <p role="status" className="rounded-lg border border-alpha-border bg-alpha-border/30 p-3 text-sm text-alpha-navy">
                {subscriptionStatus}
              </p>
            )}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button onClick={closeSubscriptionPreview} variant="secondary">
                Close
              </Button>
              <Button
                onClick={() =>
                  setSubscriptionStatus(
                    'No subscription was created. Account and payment setup are not connected in this preview.',
                  )
                }
                variant="accent"
              >
                Continue preview
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default TraderDetailsPage
