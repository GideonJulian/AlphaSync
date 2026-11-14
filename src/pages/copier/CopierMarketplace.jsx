import { useMemo, useState } from 'react'
import { ArrowRight, Search, ShieldCheck } from 'lucide-react'
import DashboardHeader from '../../components/copier-dashboard/DashboardHeader.jsx'
import TraderStrategyCard from '../../components/copier-dashboard/TraderStrategyCard.jsx'
import Modal from '../../components/ui/Modal.jsx'
import copierStrategies from '../../constants/copierStrategies.js'

const sortOptions = [
  { value: 'return30d', label: 'Highest 30-day return' },
  { value: 'winRate', label: 'Highest win rate' },
  { value: 'drawdown', label: 'Lowest drawdown' },
  { value: 'profitFactor', label: 'Highest profit factor' },
]

function CopierMarketplace() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('return30d')
  const [selectedStrategy, setSelectedStrategy] = useState(null)

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

  return (
    <div className="min-h-screen overflow-x-hidden bg-alpha-border/30 text-alpha-black">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 sm:px-8 sm:py-5 lg:px-10">
        <div className="flex flex-1 flex-col gap-6 sm:gap-8">
          <DashboardHeader search={search} onSearchChange={setSearch} />

          <main className="space-y-8 pb-8">
            <div className="flex items-start gap-3 rounded-lg border border-alpha-border bg-alpha-white px-4 py-3">
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

            <section aria-labelledby="marketplace-title" className="space-y-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-alpha-navy/60">
                    Strategy marketplace
                  </p>
                  <h1 id="marketplace-title" className="text-3xl font-bold tracking-tight text-alpha-navy">
                    Discover Traders
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-alpha-navy/70">
                    Explore approved traders and compare the strategies they offer.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-xl border border-alpha-border bg-alpha-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
                <label className="flex min-w-0 items-center gap-2 rounded-lg border border-alpha-border bg-alpha-border/20 px-3 py-2.5 focus-within:border-alpha-navy md:w-96">
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
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label htmlFor="marketplace-sort" className="text-xs font-semibold uppercase tracking-wide text-alpha-navy/60">
                    Sort by
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
                  <span className="text-xs font-medium text-alpha-navy/60 sm:ml-2">
                    Showing {visibleStrategies.length} verified {visibleStrategies.length === 1 ? 'trader' : 'traders'}
                  </span>
                </div>
              </div>

              <section aria-labelledby="featured-strategies-title" className="space-y-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <h2 id="featured-strategies-title" className="text-xl font-bold tracking-tight text-alpha-navy">
                      Featured Strategies
                    </h2>
                    <p className="mt-1 text-sm text-alpha-navy/70">
                      Selected strategies from the approved trader listings.
                    </p>
                  </div>
                  <a
                    href="#all-strategies"
                    className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-alpha-navy hover:text-alpha-orange"
                  >
                    View all {visibleStrategies.length}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </div>
                {featuredStrategies.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {featuredStrategies.map((strategy) => (
                      <TraderStrategyCard
                        key={strategy.id}
                        featured
                        onView={setSelectedStrategy}
                        strategy={strategy}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState query={search} section="featured strategies" />
                )}
              </section>

              <section id="all-strategies" aria-labelledby="all-strategies-title" className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 id="all-strategies-title" className="text-xl font-bold tracking-tight text-alpha-navy">
                    All Strategies
                  </h2>
                  <span className="rounded-full bg-alpha-white px-3 py-1 text-xs font-semibold text-alpha-navy/70">
                    {visibleStrategies.length} {visibleStrategies.length === 1 ? 'strategy' : 'strategies'}
                  </span>
                </div>
                {visibleStrategies.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {visibleStrategies.map((strategy) => (
                      <TraderStrategyCard
                        key={strategy.id}
                        onView={setSelectedStrategy}
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

      <Modal
        open={Boolean(selectedStrategy)}
        onClose={() => setSelectedStrategy(null)}
        title={selectedStrategy?.strategy}
      >
        {selectedStrategy && (
          <div className="space-y-4">
            <p className="text-sm text-alpha-navy/70">
              Trader: <strong className="text-alpha-navy">{selectedStrategy.trader}</strong>
            </p>
            <div className="grid grid-cols-2 gap-3 rounded-lg bg-alpha-border/30 p-4">
              <Detail label="30-day return" value={`+${selectedStrategy.return30d}%`} />
              <Detail label="Win rate" value={`${selectedStrategy.winRate}%`} />
              <Detail label="Profit factor" value={selectedStrategy.profitFactor.toFixed(2)} />
              <Detail label="Max drawdown" value={`${selectedStrategy.drawdown}%`} />
            </div>
            <p className="text-xs leading-relaxed text-alpha-navy/60">
              Historical performance is provided for comparison only and does not guarantee future results.
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}

function EmptyState({ query, section }) {
  return (
    <div className="rounded-xl border border-dashed border-alpha-border bg-alpha-white px-5 py-10 text-center">
      <h3 className="text-base font-semibold text-alpha-navy">No matching traders found</h3>
      <p className="mt-1 text-sm text-alpha-navy/70">
        {query
          ? `Try another trader or strategy name to find ${section}.`
          : `There are no ${section} to show right now.`}
      </p>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-alpha-navy/60">{label}</p>
      <p className="mt-1 font-semibold text-alpha-navy">{value}</p>
    </div>
  )
}

export default CopierMarketplace
