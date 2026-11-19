import { useMemo, useRef, useState } from 'react'
import {
  AlertTriangle,
  Bell,
  CandlestickChart,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  ListFilter,
  UserRound,
  Wallet,
  X,
} from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import Logo from '../../components/common/Logo.jsx'
import Modal from '../../components/ui/Modal.jsx'

const initialPositions = [
  {
    id: 'xauusd-94821049',
    symbol: 'XAUUSD',
    instrument: 'Gold Spot',
    strategy: 'Atlas FX',
    trader: 'Julian Vance',
    direction: 'BUY',
    lots: '0.10',
    entry: '2,345.20',
    current: '2,352.40',
    pnl: 182,
    movement: '+7.20 pts',
    copied: '24m ago',
    stopLoss: '2,332.00',
    takeProfit: '2,370.00',
  },
  {
    id: 'eurusd-94821106',
    symbol: 'EURUSD',
    instrument: 'Euro / US Dollar',
    strategy: 'Apex Momentum',
    trader: 'Elena Rostova',
    direction: 'SELL',
    lots: '0.05',
    entry: '1.0840',
    current: '1.0821',
    pnl: 96.5,
    movement: '+19 pips',
    copied: '1h ago',
    stopLoss: '1.0900',
    takeProfit: '1.0750',
  },
  {
    id: 'gbpusd-94821142',
    symbol: 'GBPUSD',
    instrument: 'Pound Sterling / US Dollar',
    strategy: 'Atlas FX',
    trader: 'Julian Vance',
    direction: 'BUY',
    lots: '0.03',
    entry: '1.2710',
    current: '1.2712',
    pnl: 6,
    movement: '+2 pips',
    copied: '3h ago',
    stopLoss: '1.2650',
    takeProfit: '1.2820',
  },
]

const pendingPositions = [
  {
    id: 'audusd-pending-94821207',
    symbol: 'AUDUSD',
    instrument: 'Australian Dollar / US Dollar',
    strategy: 'Apex Momentum',
    trader: 'Elena Rostova',
    direction: 'SELL',
    lots: '0.08',
    entry: '0.6570',
    current: 'Pending',
    pnl: 0,
    movement: 'Limit order',
    copied: '12m ago',
    stopLoss: '0.6620',
    takeProfit: '0.6480',
  },
]

function formatMoney(value) {
  const absoluteValue = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${value < 0 ? '-$' : '+$'}${absoluteValue}`
}

function PositionCard({
  onClose,
  onSelect,
  onSwipeChange,
  pending = false,
  position,
  swiped,
}) {
  const isProfit = position.pnl >= 0
  const pointerStart = useRef(null)
  const suppressClick = useRef(false)

  function handlePointerDown(event) {
    if (pending || event.pointerType !== 'touch') return
    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
      moved: false,
    }
  }

  function handlePointerMove(event) {
    const start = pointerStart.current
    if (!start) return

    const deltaX = event.clientX - start.x
    const deltaY = event.clientY - start.y
    if (Math.abs(deltaY) > 12 && Math.abs(deltaY) > Math.abs(deltaX)) {
      pointerStart.current = null
      return
    }

    if (Math.abs(deltaX) > 24 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      start.moved = true
      if (deltaX < 0) onSwipeChange(position.id)
      else if (swiped) onSwipeChange(null)
    }
  }

  function handlePointerUp() {
    if (pointerStart.current?.moved) {
      suppressClick.current = true
      window.setTimeout(() => {
        suppressClick.current = false
      }, 0)
    }
    pointerStart.current = null
  }

  function handleSelect() {
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
    if (swiped) {
      onSwipeChange(null)
      return
    }
    onSelect(position)
  }

  return (
    <article className="relative overflow-hidden rounded-xl border border-alpha-border bg-alpha-white transition-colors hover:border-alpha-navy/30">
      {!pending && (
        <div
          className={`absolute inset-y-0 right-0 z-0 flex w-28 md:hidden ${
            swiped ? '' : 'pointer-events-none'
          }`}
        >
          <button
            type="button"
            aria-label={`Close ${position.symbol} position (revealed swipe action)`}
            aria-hidden={!swiped}
            tabIndex={swiped ? 0 : -1}
            disabled={!swiped}
            onClick={() => onClose(position)}
            className="flex h-full w-full flex-col items-center justify-center gap-1 bg-red-700 text-[10px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white disabled:cursor-default"
          >
            <X aria-hidden="true" className="size-5" />
            Close Position
          </button>
        </div>
      )}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative z-10 flex min-w-0 items-stretch bg-alpha-white transition-transform duration-200 ease-out touch-pan-y ${
          swiped ? '-translate-x-28' : 'translate-x-0'
        } md:translate-x-0`}
      >
        <button
          type="button"
          onClick={handleSelect}
          aria-label={`View ${position.symbol} ${position.direction} position details`}
          className="group min-w-0 flex-1 p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-alpha-navy sm:p-5"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-alpha-border/50 text-alpha-navy transition-colors group-hover:bg-alpha-navy group-hover:text-alpha-white">
                <CandlestickChart aria-hidden="true" className="size-5" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-base font-bold tracking-tight text-alpha-navy">
                    {position.symbol}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      position.direction === 'BUY'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {position.direction}
                  </span>
                  {pending && (
                    <span className="rounded bg-alpha-orange/20 px-2 py-0.5 text-[10px] font-semibold text-alpha-navy">
                      PENDING
                    </span>
                  )}
                  <span className="text-xs text-alpha-navy/70">{position.lots} lots</span>
                </span>
                <span className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-alpha-navy/70">
                  <span>{position.trader}</span>
                  <span aria-hidden="true" className="text-alpha-border">•</span>
                  <span>Copied {position.copied}</span>
                  <span className="hidden text-alpha-border md:inline" aria-hidden="true">•</span>
                  <span className="hidden md:inline">
                    Entry: <strong className="font-medium text-alpha-black">{position.entry}</strong>
                  </span>
                  <span className="hidden text-alpha-border md:inline" aria-hidden="true">·</span>
                  <span className="hidden md:inline">
                    Current: <strong className="font-medium text-alpha-black">{position.current}</strong>
                  </span>
                </span>
              </span>
            </div>
            <span className="flex items-center justify-between gap-4 pl-[52px] md:justify-end md:pl-0">
              <span className="flex items-center gap-3 text-xs text-alpha-navy/70 md:hidden">
                <span>Entry: <strong className="font-medium text-alpha-black">{position.entry}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Current: <strong className="font-medium text-alpha-black">{position.current}</strong></span>
              </span>
              <span className="flex shrink-0 items-center gap-1">
                <span className={`text-sm font-bold ${isProfit ? 'text-emerald-700' : 'text-red-700'}`}>
                  {formatMoney(position.pnl)}
                </span>
                <ChevronRight aria-hidden="true" className="size-5 text-alpha-navy/40 transition-colors group-hover:text-alpha-navy" />
              </span>
            </span>
            <span className="hidden text-right md:block">
              <span className="block text-xs text-alpha-navy/60">{position.movement}</span>
            </span>
          </div>
        </button>
        {!pending && (
          <>
            <button
              type="button"
              onClick={() => onClose(position)}
              aria-label={`Close ${position.symbol} position`}
              title="Close Position"
              className="mr-3 flex size-10 shrink-0 flex-col items-center justify-center self-center rounded-lg border border-red-200 text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 md:hidden"
            >
              <X aria-hidden="true" className="size-4" />
              <span className="text-[9px] font-semibold">Close</span>
            </button>
            <button
              type="button"
              onClick={() => onClose(position)}
              aria-label={`Close ${position.symbol} position`}
              className="mr-4 hidden shrink-0 items-center gap-1.5 self-center rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 md:inline-flex"
            >
              <X aria-hidden="true" className="size-4" />
              Close Position
            </button>
          </>
        )}
      </div>
    </article>
  )
}

function Metric({ label, value, detail, positive }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-alpha-navy/60">
        {label}
      </p>
      <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
        <span className={`text-2xl font-bold tracking-tight ${positive ? 'text-emerald-700' : 'text-alpha-navy'}`}>
          {value}
        </span>
        {detail && <span className="text-xs font-medium text-alpha-navy/65">{detail}</span>}
      </div>
    </div>
  )
}

function EmptyPositions() {
  return (
    <section className="mt-2 flex flex-col items-center rounded-xl border border-alpha-border bg-alpha-white px-5 py-12 text-center sm:py-16">
      <span className="mb-4 flex size-16 items-center justify-center rounded-full bg-alpha-border/50 text-alpha-navy/70">
        <CandlestickChart aria-hidden="true" className="size-8" />
      </span>
      <h2 className="text-base font-bold text-alpha-navy">No open positions</h2>
      <p className="mt-1 max-w-[320px] text-sm leading-relaxed text-alpha-navy/70">
        When Atlas FX opens its next trade, your copied positions will appear here automatically.
      </p>
      <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-alpha-border/50 px-3 py-1.5 text-xs font-medium text-alpha-navy">
        <span className="size-2 animate-pulse rounded-full bg-alpha-orange motion-reduce:animate-none" />
        Listening for master signals
      </span>
    </section>
  )
}

function CopierPositionsPage() {
  const [positions, setPositions] = useState(initialPositions)
  const [filter, setFilter] = useState('all')
  const [sortByProfit, setSortByProfit] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [closeAllOpen, setCloseAllOpen] = useState(false)
  const [closePositionTarget, setClosePositionTarget] = useState(null)
  const [swipedPositionId, setSwipedPositionId] = useState(null)

  const floatingPnl = positions.reduce((total, position) => total + position.pnl, 0)
  const visiblePositions = useMemo(() => {
    const list = filter === 'pending' ? pendingPositions : positions
    return sortByProfit ? [...list].sort((a, b) => b.pnl - a.pnl) : list
  }, [filter, positions, sortByProfit])

  const isEmpty = positions.length === 0
  const isPending = filter === 'pending'
  const handleClosePosition = (position) => {
    setSwipedPositionId(null)
    setClosePositionTarget(position)
  }
  const confirmClosePosition = () => {
    if (!closePositionTarget) return
    setPositions((current) =>
      current.filter((position) => position.id !== closePositionTarget.id),
    )
    setClosePositionTarget(null)
  }

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[#f9f9f9] text-alpha-black">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-alpha-border bg-alpha-white/95 px-4 backdrop-blur md:hidden">
        <Logo className="text-base uppercase" />
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-10 items-center justify-center rounded-lg text-alpha-navy/70 transition-colors hover:bg-alpha-border/30"
          >
            <Bell aria-hidden="true" className="size-5" />
          </button>
          <span className="flex size-8 items-center justify-center rounded-full bg-alpha-navy text-alpha-white">
            <UserRound aria-hidden="true" className="size-4" />
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1024px] px-4 pb-8 pt-5 sm:px-6 md:px-8 md:py-8">
        <header className="mb-5 flex flex-col justify-between gap-4 border-b border-alpha-border pb-5 sm:flex-row sm:items-start md:mb-6 md:pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-alpha-navy md:text-[2rem]">
              Positions
            </h1>
            <p className="mt-1 text-sm text-alpha-navy/70">
              Monitor your active copied trades.
            </p>
          </div>
          <span className="hidden items-center rounded-lg border border-alpha-border bg-alpha-border/40 p-1 text-xs font-medium text-alpha-navy/65 sm:inline-flex">
            <span className="rounded bg-alpha-navy px-3 py-1.5 text-alpha-white">
              Active ({positions.length})
            </span>
          </span>
        </header>

        <section
          aria-label="Connected trading account"
          className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-alpha-border bg-alpha-white p-3.5 sm:p-4"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-alpha-border/50 text-alpha-navy">
              <Wallet aria-hidden="true" className="size-5" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="flex flex-wrap items-center gap-x-2">
                <strong className="text-sm text-alpha-navy">Exness MT5</strong>
                <span className="text-[10px] font-semibold tracking-wider text-alpha-navy/60">•••• 4821</span>
              </span>
              <span className="text-xs text-alpha-navy/65">Standard ECN Account</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-alpha-border/50 px-2.5 py-1 text-[9px] font-bold tracking-wider text-alpha-navy">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-600 motion-reduce:animate-none" />
              CONNECTED
            </span>
            <span className="rounded bg-alpha-navy px-2.5 py-1 text-[9px] font-bold tracking-wider text-alpha-white">
              COPYING
            </span>
          </div>
        </section>

        <section aria-label="Position summary" className="mb-6 rounded-xl border border-alpha-border bg-alpha-white p-4 sm:p-5">
          <div className="grid grid-cols-2 divide-x divide-alpha-border">
            <Metric label="Open Positions" value={positions.length} detail="active" />
            <div className="pl-4 sm:pl-5">
              <Metric
                label="Floating P/L"
                value={positions.length ? formatMoney(floatingPnl) : '$0.00'}
                detail="Unrealized"
                positive={positions.length > 0 && floatingPnl >= 0}
              />
            </div>
          </div>
        </section>

        <div className="mb-3 flex items-center justify-between gap-3 md:hidden">
          <div className="flex min-w-0 items-center gap-2" role="group" aria-label="Filter positions">
            <button
              type="button"
              aria-pressed={!isPending}
              onClick={() => {
                setFilter('all')
                setSwipedPositionId(null)
              }}
              className={`min-h-10 rounded-lg px-3 text-xs font-semibold transition-colors sm:text-sm ${
                !isPending
                  ? 'bg-alpha-navy text-alpha-white shadow-sm'
                  : 'bg-alpha-border/60 text-alpha-navy/70 hover:text-alpha-navy'
              }`}
            >
              All positions ({positions.length})
            </button>
            <button
              type="button"
              aria-pressed={isPending}
              onClick={() => {
                setFilter('pending')
                setSwipedPositionId(null)
              }}
              className={`min-h-10 rounded-lg px-3 text-xs font-semibold transition-colors sm:text-sm ${
                isPending
                  ? 'bg-alpha-navy text-alpha-white shadow-sm'
                  : 'bg-alpha-border/60 text-alpha-navy/70 hover:text-alpha-navy'
              }`}
            >
              Pending
            </button>
          </div>
          <button
            type="button"
            aria-label={sortByProfit ? 'Show positions in original order' : 'Sort positions by profit'}
            aria-pressed={sortByProfit}
            onClick={() => setSortByProfit((current) => !current)}
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg border border-alpha-border transition-colors ${
              sortByProfit ? 'bg-alpha-navy text-alpha-white' : 'bg-alpha-white text-alpha-navy/70 hover:text-alpha-navy'
            }`}
          >
            <ListFilter aria-hidden="true" className="size-4" />
          </button>
        </div>

        {isEmpty ? (
          <EmptyPositions />
        ) : (
          <section aria-labelledby="positions-list-title" className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-0.5">
              <h2 id="positions-list-title" className="text-sm font-semibold text-alpha-navy">
                {isPending ? 'Pending trades' : 'Open Positions'}
              </h2>
              <span className="text-xs text-alpha-navy/60 md:hidden">
                {isPending ? 'Awaiting entry' : 'Live feed'}
              </span>
              <span className="hidden rounded bg-alpha-border/60 px-3 py-1 text-[10px] font-semibold tracking-wide text-alpha-navy md:inline-flex">
                {isPending
                  ? `Pending orders (${visiblePositions.length})`
                  : `All positions (${positions.length})`}
              </span>
            </div>

            {visiblePositions.length > 0 ? (
              <div className="flex flex-col gap-3">
                {visiblePositions.map((position) => (
                  <PositionCard
                    key={position.id}
                    position={position}
                    pending={isPending}
                    onSelect={setSelectedPosition}
                    onClose={handleClosePosition}
                    onSwipeChange={setSwipedPositionId}
                    swiped={swipedPositionId === position.id}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-alpha-border bg-alpha-white px-4 py-8 text-center text-sm text-alpha-navy/70">
                No pending trades.
              </div>
            )}

            {!isPending && positions.length > 0 && (
              <div className="mt-3 flex flex-col items-center border-t border-alpha-border pt-5 text-center">
                <Button
                  variant="secondary"
                  className="w-full border-alpha-border text-alpha-navy sm:w-auto"
                  onClick={() => setCloseAllOpen(true)}
                >
                  <CircleDollarSign aria-hidden="true" className="size-4" />
                  Close All Positions
                </Button>
                <p className="mt-2 text-xs text-alpha-navy/65">
                  Close all currently copied open trades immediately.
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      <Modal
        open={Boolean(selectedPosition)}
        onClose={() => setSelectedPosition(null)}
        title={selectedPosition ? `${selectedPosition.symbol} position` : 'Position details'}
        mobileSheet
        className="max-w-[420px] p-5 sm:p-6"
      >
        {selectedPosition && (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                    selectedPosition.direction === 'BUY'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedPosition.direction}
                </span>
                <span className="text-xs text-alpha-navy/65">{selectedPosition.lots} lots</span>
              </div>
              <span className="text-xs text-alpha-navy/65">{selectedPosition.strategy} · {selectedPosition.trader}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['Floating P/L', formatMoney(selectedPosition.pnl), selectedPosition.pnl >= 0],
                ['Instrument', selectedPosition.instrument],
                ['Entry Price', selectedPosition.entry],
                ['Current Price', selectedPosition.current],
                ['Stop Loss', selectedPosition.stopLoss],
                ['Take Profit', selectedPosition.takeProfit],
              ].map(([label, value, positive]) => (
                <div key={label} className="flex min-w-0 flex-col gap-1 rounded-lg bg-alpha-border/40 p-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-alpha-navy/60">{label}</span>
                  <span className={`break-words text-sm font-semibold ${positive === undefined ? 'text-alpha-black' : positive ? 'text-emerald-700' : 'text-red-700'}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="my-4 flex flex-wrap items-center justify-between gap-2 text-xs text-alpha-navy/65">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 aria-hidden="true" className="size-3.5" />
                Copied {selectedPosition.copied}
              </span>
              <span>Order #{selectedPosition.id.split('-').at(-1)}</span>
            </div>
            <p className="mb-4 rounded-lg bg-alpha-border/40 p-3 text-xs leading-relaxed text-alpha-navy/70">
              Position details are shown for preview. Trade management will be available here in a future release.
            </p>
            <Button className="w-full" variant="primary" onClick={() => setSelectedPosition(null)}>
              Done
            </Button>
          </>
        )}
      </Modal>

      <Modal
        open={Boolean(closePositionTarget)}
        onClose={() => setClosePositionTarget(null)}
        title={
          closePositionTarget
            ? `Close ${closePositionTarget.symbol} position?`
            : 'Close position?'
        }
        mobileSheet
        className="max-w-[420px] p-5 sm:p-6"
      >
        {closePositionTarget && (
          <>
            <div className="mb-4 flex items-start gap-3 rounded-lg bg-red-50 p-3 text-red-900">
              <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <p className="text-sm leading-relaxed">
                Closing this position will end the currently open{' '}
                <strong>
                  {closePositionTarget.symbol} {closePositionTarget.direction}
                </strong>{' '}
                trade. This confirmation only updates the mock positions in this preview.
              </p>
            </div>
            <dl className="mb-5 grid grid-cols-2 gap-2 rounded-lg bg-alpha-border/40 p-3 text-sm">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-alpha-navy/60">
                  Instrument
                </dt>
                <dd className="mt-1 font-semibold text-alpha-navy">
                  {closePositionTarget.instrument} ({closePositionTarget.symbol})
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-alpha-navy/60">
                  Direction
                </dt>
                <dd
                  className={`mt-1 font-semibold ${
                    closePositionTarget.direction === 'BUY'
                      ? 'text-emerald-800'
                      : 'text-red-800'
                  }`}
                >
                  {closePositionTarget.direction}
                </dd>
              </div>
              <div className="col-span-2 border-t border-alpha-border pt-2">
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-alpha-navy/60">
                  Floating P/L
                </dt>
                <dd
                  className={`mt-1 font-semibold ${
                    closePositionTarget.pnl >= 0
                      ? 'text-emerald-800'
                      : 'text-red-800'
                  }`}
                >
                  {formatMoney(closePositionTarget.pnl)}
                </dd>
              </div>
            </dl>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="secondary"
                onClick={() => setClosePositionTarget(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="bg-red-700 hover:bg-red-800"
                onClick={confirmClosePosition}
              >
                Confirm Close
              </Button>
            </div>
          </>
        )}
      </Modal>

      <Modal
        open={closeAllOpen}
        onClose={() => setCloseAllOpen(false)}
        title="Close all open positions?"
        mobileSheet
        className="max-w-md p-5 sm:p-6"
      >
        <p className="mb-3 text-sm leading-relaxed text-alpha-navy/75">
          This preview will clear all {positions.length} open positions from the mock data.
        </p>
        <ul className="space-y-2 rounded-lg bg-alpha-border/40 p-3 text-xs">
          {positions.map((position) => (
            <li key={position.id} className="flex justify-between gap-3">
              <span>{position.symbol} ({position.lots} lots)</span>
              <span className={`font-semibold ${position.pnl >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                {formatMoney(position.pnl)}
              </span>
            </li>
          ))}
        </ul>
        <p className="my-4 text-sm text-alpha-navy/70">
          Floating total: <strong className="text-alpha-navy">{formatMoney(floatingPnl)}</strong>
        </p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={() => setCloseAllOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setPositions([])
              setFilter('all')
              setCloseAllOpen(false)
            }}
          >
            <CheckCircle2 aria-hidden="true" className="size-4" />
            Confirm Close All
          </Button>
        </div>
      </Modal>

    </div>
  )
}

export default CopierPositionsPage
