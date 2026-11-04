import { Compass, KeyRound, RefreshCw } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Find a verified trading strategy that matches your return targets, historical drawdown limits, and preferred asset classes.',
    detail: 'Audited Track Records',
    Icon: Compass,
  },
  {
    number: '02',
    title: 'Connect',
    description:
      'Connect your MT5 account securely via low-latency API without depositing capital. We never hold your funds.',
    detail: 'Read-Write API Direct',
    Icon: KeyRound,
  },
  {
    number: '03',
    title: 'Copy',
    description:
      'Set risk multipliers, maximum drawdown bounds, and let AlphaSync execute orders simultaneously on your terminal.',
    detail: 'Multi-Account Syncing',
    Icon: RefreshCw,
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-alpha-border/50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-alpha-navy/70">
            Architecture
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-alpha-navy">
            Get started in three steps.
          </h2>
          <p className="mt-2 text-sm leading-6 text-alpha-navy/70">
            An uncompromised execution pipeline built to synchronize
            high-frequency strategies within milliseconds.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map(({ description, detail, Icon, number, title }) => (
            <article
              key={number}
              className="flex flex-col justify-between rounded-xl border border-alpha-border bg-alpha-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
            >
              <div>
                <p className="mb-6 text-3xl font-bold tracking-tight text-alpha-navy">
                  {number}
                </p>
                <h3 className="mb-2 text-xl font-semibold text-alpha-navy">{title}</h3>
                <p className="text-sm leading-relaxed text-alpha-navy/70">
                  {description}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 pt-4 text-sm font-semibold text-alpha-navy">
                <Icon aria-hidden="true" className="size-[18px]" />
                {detail}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
