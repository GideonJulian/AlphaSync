import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from '../../components/copier-dashboard/DashboardHeader.jsx'
import TraderStrategyCard from '../../components/copier-dashboard/TraderStrategyCard.jsx'
import copierStrategies from '../../constants/copierStrategies.js'

const sortOptions = [
  { value: 'return30d', label: 'Highest 30-day return' },
  { value: 'winRate', label: 'Highest win rate' },
  { value: 'drawdown', label: 'Lowest drawdown' },
  { value: 'profitFactor', label: 'Highest profit factor' },
]

function CopierMarketplace() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('return30d')
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const sortMenuRef = useRef(null)

  useEffect(() => {
    if (!sortMenuOpen) return undefined

    function handlePointerDown(event) {
      if (!sortMenuRef.current?.contains(event.target)) {
        setSortMenuOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') setSortMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [sortMenuOpen])

  const visibleStrategies = useMemo(() => {
    const query = search.trim().toLowerCase()
    return copierStrategies
      .filter((strategy) => strategy.verified && strategy.approved)
      .filter(
        (strategy) =>
          !query ||
          `${strategy.trader} ${strategy.strategy}`.toLowerCase().includes(query),
      )
      .sort((left, right) => {
        const difference = left[sortBy] - right[sortBy]
        return sortBy === 'drawdown' ? difference : -difference
      })
  }, [search, sortBy])

  const featuredStrategies = visibleStrategies.filter(
    (strategy) => strategy.featured,
  )
  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ?? sortOptions[0].label
  const handleViewStrategy = (strategy) => {
    navigate(`/copier/marketplace/${strategy.id}`)
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-alpha-border/30 text-alpha-black">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 sm:px-8 sm:py-5 lg:px-10">
        <div className="flex flex-1 flex-col gap-5 sm:gap-8">
          <DashboardHeader search={search} onSearchChange={setSearch} />

          <main className="space-y-6 pb-8 md:space-y-8">
            <div className="hidden items-start gap-3 rounded-lg border border-alpha-border bg-alpha-white px-4 py-3 md:flex">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-alpha-navy" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <p className="text-sm text-alpha-navy/80">
                  <strong className="text-alpha-navy">Verified and approved traders only.</strong>{' '}
                  Compare trader strategies using historical performance.
                </p>
                <p className="text-xs text-alpha-navy/60">
                  Past performance is not indicative of future results.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-alpha-border bg-alpha-white px-3 py-2 md:hidden">
              <ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-alpha-navy" />
              <p className="text-xs font-semibold text-alpha-navy">
                Verified &amp; approved traders only
              </p>
              <p className="w-full pl-6 text-[11px] leading-snug text-alpha-navy/60">
                Past performance is not indicative of future results.
              </p>
            </div>

            <section aria-labelledby="marketplace-title" className="space-y-5 md:space-y-6">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end md:gap-4">
                <div>
                  <p className="mb-1 hidden text-xs font-bold uppercase tracking-[0.12em] text-alpha-navy/60 md:block">
                    Strategy marketplace
                  </p>
                  <h1 id="marketplace-title" className="text-[1.75rem] font-bold leading-tight tracking-tight text-alpha-navy md:text-3xl">
                    Discover Traders
                  </h1>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-alpha-navy/70 md:mt-2">
                    Compare approved traders and the strategies they offer.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-alpha-border bg-alpha-white p-3 shadow-sm sm:p-4 md:flex-row md:items-center md:justify-between md:gap-4">
                <label className="flex min-w-0 min-h-11 items-center gap-2 rounded-lg border border-alpha-border bg-alpha-border/20 px-3 py-2.5 transition-colors focus-within:border-alpha-navy md:w-96">
                  <Search aria-hidden="true" className="size-5 shrink-0 text-alpha-navy/60" />
                  <span className="sr-only">Search by trader or strategy name</span>
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search trader or strategy..."
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-alpha-navy/50"
                  />
                </label>
                <div className="flex items-center justify-between gap-3 md:justify-end">
                  <div className="relative md:hidden" ref={sortMenuRef}>
                    <button
                      type="button"
                      aria-expanded={sortMenuOpen}
                      aria-controls="mobile-marketplace-sort-options"
                      onClick={() => setSortMenuOpen((open) => !open)}
                      className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-lg border border-alpha-border bg-alpha-white px-3 text-sm font-semibold text-alpha-navy transition-colors hover:bg-alpha-border/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy"
                    >
                      <SlidersHorizontal aria-hidden="true" className="size-4 shrink-0" />
                      <span className="truncate">{selectedSortLabel.replace('Highest ', '').replace('Lowest ', '')}</span>
                      <ChevronDown aria-hidden="true" className={`size-4 shrink-0 transition-transform ${sortMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {sortMenuOpen && (
                      <div
                        id="mobile-marketplace-sort-options"
                        role="group"
                        aria-label="Sort strategy options"
                        className="absolute left-0 top-[calc(100%+0.5rem)] z-40 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-alpha-border bg-alpha-white p-2 shadow-xl"
                      >
                        <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wide text-alpha-navy/55">
                          Sort strategies
                        </p>
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            aria-pressed={sortBy === option.value}
                            onClick={() => {
                              setSortBy(option.value)
                              setSortMenuOpen(false)
                            }}
                            className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 text-left text-sm transition-colors ${
                              sortBy === option.value
                                ? 'bg-alpha-navy text-alpha-white'
                                : 'text-alpha-navy hover:bg-alpha-border/40'
                            }`}
                          >
                            <span>{option.label}</span>
                            {sortBy === option.value && (
                              <Check aria-hidden="true" className="size-4 shrink-0 text-alpha-orange" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="hidden items-center gap-2 md:flex">
                    <label htmlFor="marketplace-sort" className="text-xs font-semibold uppercase tracking-wide text-alpha-navy/60">
                      Sort by:
                    </label>
                    <select
                      id="marketplace-sort"
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="rounded-lg border border-alpha-border bg-alpha-white px-3 py-2.5 text-sm font-medium text-alpha-navy outline-none focus:border-alpha-navy"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className="whitespace-nowrap text-xs font-medium text-alpha-navy/60 md:ml-2">
                    <span className="md:hidden">
                      {visibleStrategies.length} {visibleStrategies.length === 1 ? 'trader' : 'traders'}
                    </span>
                    <span className="hidden md:inline">
                      Showing {visibleStrategies.length} verified {visibleStrategies.length === 1 ? 'trader' : 'traders'}
                    </span>
                  </span>
                </div>
              </div>

              <section aria-labelledby="featured-strategies-title" className="space-y-3 md:space-y-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <h2 id="featured-strategies-title" className="text-lg font-bold tracking-tight text-alpha-navy md:text-xl">
                      Featured Strategies
                    </h2>
                    <p className="mt-1 hidden text-sm text-alpha-navy/70 sm:block">
                      Selected strategies from the approved trader listings.
                    </p>
                  </div>
                  <a
                    href="#all-strategies"
                    className="inline-flex min-h-10 w-fit items-center gap-1 text-sm font-semibold text-alpha-navy transition-colors hover:text-alpha-orange"
                  >
                    View all {visibleStrategies.length}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </div>
                {featuredStrategies.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
                    {featuredStrategies.map((strategy) => (
                      <TraderStrategyCard
                        key={strategy.id}
                        featured
                        onView={handleViewStrategy}
                        strategy={strategy}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState query={search} section="featured strategies" />
                )}
              </section>

              <section id="all-strategies" aria-labelledby="all-strategies-title" className="space-y-3 pt-1 md:space-y-4 md:pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 id="all-strategies-title" className="text-lg font-bold tracking-tight text-alpha-navy md:text-xl">
                    All Strategies
                  </h2>
                  <span className="rounded-full bg-alpha-white px-3 py-1 text-xs font-semibold text-alpha-navy/70">
                    {visibleStrategies.length} {visibleStrategies.length === 1 ? 'strategy/trader' : 'strategies/trader'}
                  </span>
                </div>
                {visibleStrategies.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
                    {visibleStrategies.map((strategy) => (
                      <TraderStrategyCard
                        key={strategy.id}
                        onView={handleViewStrategy}
                        strategy={strategy}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState query={search} section="strategies" />
                )}
              </section>
            </section>
          </main>
        </div>
      </div>

    </div>
  )
}

function EmptyState({ query, section }) {
  return (
    <div className="rounded-xl border border-dashed border-alpha-border bg-alpha-white px-4 py-7 text-center md:px-5 md:py-10">
      <h3 className="text-base font-semibold text-alpha-navy">No matching traders found</h3>
      <p className="mt-1 text-sm text-alpha-navy/70">
        {query
          ? `Try another trader or strategy name to find ${section}.`
          : `There are no ${section} to show right now.`}
      </p>
    </div>
  )
}

export default CopierMarketplace
