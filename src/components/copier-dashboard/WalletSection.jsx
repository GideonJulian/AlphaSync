import { useEffect, useId, useState } from 'react'
import {
  ArrowRight,
  CreditCard,
  Info,
  Landmark,
  PlusCircle,
  ReceiptText,
  RotateCcw,
  Wallet,
  X,
} from 'lucide-react'

const walletBalance = {
  total: 1450,
  available: 1304,
  reserved: 146,
}

const quickAmounts = [25, 50, 100, 250]

const walletTransactions = [
  {
    description: 'Deposit — Card •••• 4242',
    detail: 'Wallet funding',
    type: 'Deposit',
    amount: 500,
    date: 'Today, 10:14 AM',
    status: 'Successful',
    icon: CreditCard,
  },
  {
    description: 'Subscription — Atlas FX Strategy',
    detail: 'Eligible subscription amount only',
    type: 'Subscription',
    amount: -39,
    date: 'Nov 01, 2025',
    status: 'Successful',
    icon: ReceiptText,
  },
  {
    description: 'Subscription — Apex Momentum',
    detail: 'Eligible subscription amount only',
    type: 'Subscription',
    amount: -49,
    date: 'Oct 28, 2025',
    status: 'Successful',
    icon: ReceiptText,
  },
  {
    description: 'Subscription — Kaufman Quant',
    detail: 'Eligible subscription amount only',
    type: 'Subscription',
    amount: -58,
    date: 'Oct 24, 2025',
    status: 'Successful',
    icon: ReceiptText,
  },
  {
    description: 'Refund — Trader inactivity',
    detail: 'Eligible subscription amount; funding fee excluded',
    type: 'Refund',
    amount: 45,
    date: 'Oct 15, 2025',
    status: 'Successful',
    icon: RotateCcw,
  },
]

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function WalletSummary({ onAddFunds }) {
  return (
    <section
      id="wallet"
      aria-labelledby="wallet-title"
      className="order-4 rounded-xl border border-alpha-border bg-alpha-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-alpha-navy text-alpha-orange">
              <Wallet aria-hidden="true" className="size-[18px]" />
            </span>
            <h2 id="wallet-title" className="text-base font-semibold text-alpha-navy">
              AlphaSync Wallet <span className="font-medium text-alpha-navy/70">(USD)</span>
            </h2>
          </div>
          <span className="rounded-full bg-alpha-border/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/70">
            Preview
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_2fr_auto] lg:items-center">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-alpha-navy/70">
              Total Wallet Funds
            </span>
            <span className="mt-0.5 text-2xl font-bold tracking-tight text-alpha-navy">
              {currency.format(walletBalance.total)}
              <span className="ml-1.5 text-xs font-medium text-alpha-navy/70"> USD</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-lg bg-alpha-border/30 p-3 sm:gap-4 sm:p-4">
            <div className="flex min-w-0 flex-col border-r border-alpha-border pr-3 sm:pr-4">
              <span className="text-xs text-alpha-navy/70">Available Balance</span>
              <span className="mt-0.5 text-base font-bold text-alpha-navy">
                {currency.format(walletBalance.available)}
              </span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-alpha-navy/70">
                Ready to subscribe
              </span>
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="flex items-center gap-1 text-xs text-alpha-navy/70">
                Reserved for subscriptions
                <Info
                  aria-label="Reserved funds are committed to active subscriptions."
                  className="size-3.5 shrink-0"
                  title="Reserved funds are committed to active subscriptions."
                />
              </span>
              <span className="mt-0.5 text-base font-bold text-alpha-navy">
                {currency.format(walletBalance.reserved)}
              </span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-alpha-navy/70">
                3 active strategies
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:min-w-[220px] lg:grid-cols-1">
            <button
              type="button"
              onClick={onAddFunds}
              className="inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-alpha-orange px-2 text-xs font-semibold text-alpha-navy shadow-sm transition-colors hover:bg-alpha-orange/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy sm:px-3 sm:text-sm"
            >
              <PlusCircle aria-hidden="true" className="size-[18px]" />
              Add Funds
            </button>
            <a
              href="#wallet-transactions"
              className="inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-alpha-border bg-alpha-border/30 px-2 text-xs font-medium text-alpha-navy transition-colors hover:bg-alpha-border/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy sm:px-3 sm:text-sm"
            >
              <ReceiptText aria-hidden="true" className="size-[18px]" />
              View Transactions
            </a>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-alpha-navy/70">
          Total funds equal available balance plus funds reserved for active subscriptions. Funding
          fees are separate and non-refundable under the proposed policy; eligible subscription
          refunds do not include the original funding fee.
        </p>
      </div>
    </section>
  )
}

function TransactionDetails({ transaction }) {
  const Icon = transaction.icon

  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-alpha-border/50 text-alpha-navy">
        <Icon aria-hidden="true" className="size-[18px]" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-semibold text-alpha-black">
          {transaction.description}
        </span>
        <span className="truncate text-xs text-alpha-navy/70">{transaction.detail}</span>
      </span>
    </div>
  )
}

function TransactionAmount({ amount }) {
  const positive = amount > 0

  return (
    <span className={`font-semibold ${positive ? 'text-alpha-navy' : 'text-alpha-black'}`}>
      {positive ? '+' : '−'}
      {currency.format(Math.abs(amount))}
    </span>
  )
}

function WalletTransactions() {
  return (
    <section
      id="wallet-transactions"
      aria-labelledby="wallet-transactions-title"
      className="order-10 overflow-hidden rounded-xl border border-alpha-border bg-alpha-white xl:order-7"
    >
      <div className="flex flex-col justify-between gap-3 border-b border-alpha-border px-4 py-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 id="wallet-transactions-title" className="text-base font-semibold text-alpha-black">
              Recent Wallet Transactions
            </h2>
            <span className="rounded-full bg-alpha-border/60 px-2 py-0.5 text-[10px] font-semibold text-alpha-navy/70">
              Preview
            </span>
          </div>
          <p className="mt-0.5 text-xs text-alpha-navy/70">
            Sample wallet funding, subscription, and refund activity.
          </p>
        </div>
        <span className="text-xs font-medium text-alpha-navy/70">View All Transactions</span>
      </div>

      <div className="hidden overflow-x-auto xl:block">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-alpha-border bg-alpha-border/30">
              {['Description', 'Type', 'Amount', 'Date & Time', 'Status'].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/70 ${
                    heading === 'Amount' || heading === 'Status' ? 'text-right' : ''
                  }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-alpha-border">
            {walletTransactions.map((transaction) => (
              <tr key={transaction.description} className="transition-colors hover:bg-alpha-border/20">
                <td className="px-5 py-3.5">
                  <TransactionDetails transaction={transaction} />
                </td>
                <td className="px-5 py-3.5">
                  <span className="rounded bg-alpha-border/50 px-2 py-1 text-[10px] font-semibold text-alpha-navy">
                    {transaction.type}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right text-sm">
                  <TransactionAmount amount={transaction.amount} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-xs text-alpha-navy/70">
                  {transaction.date}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-alpha-border/50 px-2 py-1 text-[10px] font-semibold text-alpha-navy">
                    <span className="size-1.5 rounded-full bg-alpha-orange" />
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-alpha-border xl:hidden">
        {walletTransactions.map((transaction) => (
          <article key={transaction.description} className="flex items-center justify-between gap-3 p-4">
            <TransactionDetails transaction={transaction} />
            <span className="shrink-0 rounded bg-alpha-border/50 px-1.5 py-0.5 text-[10px] font-semibold text-alpha-navy">
              {transaction.type}
            </span>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <TransactionAmount amount={transaction.amount} />
              <span className="text-[10px] text-alpha-navy/70">{transaction.date}</span>
              <span className="rounded bg-alpha-border/50 px-1.5 py-0.5 text-[10px] font-semibold text-alpha-navy">
                {transaction.status}
              </span>
            </div>
          </article>
        ))}
      </div>
      <p className="border-t border-alpha-border bg-alpha-border/20 px-4 py-3 text-xs leading-relaxed text-alpha-navy/70 sm:px-6">
        Sample activity only; no payment provider is connected. Where a subscription refund applies,
        only its eligible subscription amount is returned, not the original funding fee.
      </p>
    </section>
  )
}

function AddFundsModal({ open, onClose }) {
  const titleId = useId()
  const amountInputId = useId()
  const [amount, setAmount] = useState('100')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [notice, setNotice] = useState('')
  const parsedAmount = Number(amount)
  const amountIsValid = Number.isFinite(parsedAmount) && parsedAmount >= 10 && parsedAmount <= 10000
  const formattedAmount = currency.format(Number.isFinite(parsedAmount) ? parsedAmount : 0)

  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-alpha-navy/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90dvh] w-full overflow-y-auto rounded-t-2xl border border-alpha-border bg-alpha-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] text-alpha-black shadow-xl sm:max-w-lg sm:rounded-xl sm:p-6"
      >
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-alpha-border sm:hidden" />
        <div className="flex items-start justify-between gap-4 border-b border-alpha-border pb-4">
          <div>
            <h2 id={titleId} className="text-lg font-bold text-alpha-navy">
              Add Funds
            </h2>
            <p className="mt-0.5 text-xs text-alpha-navy/70">
              Add funds to your AlphaSync Wallet.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close Add Funds"
            onClick={onClose}
            className="rounded-full bg-alpha-border/50 p-2 text-alpha-navy transition-colors hover:bg-alpha-border"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor={amountInputId}
              className="text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/70"
            >
              Deposit Amount (USD)
            </label>
            <div className="relative flex items-center">
              <span aria-hidden="true" className="absolute left-4 text-lg font-semibold text-alpha-navy">
                $
              </span>
              <input
                id={amountInputId}
                type="number"
                min="10"
                max="10000"
                step="0.01"
                inputMode="decimal"
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value)
                  setNotice('')
                }}
                aria-invalid={Boolean(amount) && !amountIsValid}
                className="h-14 w-full rounded-xl border border-alpha-border bg-alpha-border/30 pl-10 pr-16 text-lg font-bold text-alpha-navy outline-none focus:border-alpha-navy focus:ring-2 focus:ring-alpha-navy/10"
              />
              <span className="absolute right-4 text-xs font-semibold text-alpha-navy/70">USD</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  aria-pressed={amount === String(quickAmount)}
                  onClick={() => {
                    setAmount(String(quickAmount))
                    setNotice('')
                  }}
                  className={`h-10 rounded-lg border text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy ${
                    amount === String(quickAmount)
                      ? 'border-alpha-navy bg-alpha-navy text-alpha-white'
                      : 'border-alpha-border bg-alpha-border/30 text-alpha-navy hover:bg-alpha-border/60'
                  }`}
                >
                  ${quickAmount}
                </button>
              ))}
            </div>
            {Boolean(amount) && !amountIsValid && (
              <p className="text-xs text-red-700">Enter an amount between $10 and $10,000.</p>
            )}
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/70">
              Payment Method
            </legend>
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-alpha-border/40 p-1">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'bank', label: 'Bank Wire', icon: Landmark },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={paymentMethod === id}
                  onClick={() => setPaymentMethod(id)}
                  className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition-colors ${
                    paymentMethod === id
                      ? 'bg-alpha-white text-alpha-navy shadow-sm'
                      : 'text-alpha-navy/70 hover:text-alpha-navy'
                  }`}
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex items-start gap-2 rounded-lg bg-alpha-border/30 p-3">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-alpha-navy/70" />
            <p className="text-xs leading-relaxed text-alpha-navy/70">
              Funding fees are separate from subscriptions and non-refundable under the proposed
              policy. Eligible subscription refunds exclude the original funding fee. This is a
              preview; no payment will be processed.
            </p>
          </div>

          {notice && (
            <p role="status" className="rounded-lg border border-alpha-border bg-alpha-border/30 p-3 text-xs text-alpha-navy">
              {notice}
            </p>
          )}
          <button
            type="button"
            disabled={!amountIsValid}
            onClick={() => {
              setNotice('Payment is not connected in this preview. No payment was initiated and your wallet balance is unchanged.')
            }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-alpha-orange px-4 text-sm font-bold text-alpha-navy shadow-sm transition-colors hover:bg-alpha-orange/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Payment — {formattedAmount}
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </section>
    </div>
  )
}

function WalletSection({ modalOpen, onAddFunds, onCloseModal }) {
  return (
    <>
      <WalletSummary onAddFunds={onAddFunds} />
      <WalletTransactions />
      <AddFundsModal open={modalOpen} onClose={onCloseModal} />
    </>
  )
}

export default WalletSection
