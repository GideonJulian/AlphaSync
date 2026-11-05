import {
  ArrowUpRight,
  Check,
  Compass,
  Link2,
  Settings2,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'

const copierSteps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Explore verified master traders and compare their trading strategies and performance.',
    Icon: Compass,
  },
  {
    number: '02',
    title: 'Connect your broker account',
    description:
      'Connect your broker trading account to AlphaSync using your MT5 account number, broker and server details, and required investor login credentials. Never provide your broker master password or withdrawal credentials.',
    Icon: Link2,
  },
  {
    number: '03',
    title: 'Start copying',
    description:
      'Choose a strategy, configure your risk preferences and activate automated trade copying.',
    Icon: Settings2,
  },
]

const traderSteps = [
  {
    number: '01',
    title: 'Connect your broker account',
    description:
      'Link your broker trading account using the required MT5 account credentials, including broker and server details and investor login credentials where applicable. Never provide your broker master password or withdrawal credentials.',
    Icon: Link2,
  },
  {
    number: '02',
    title: 'Set up your strategy',
    description:
      'Configure your trading strategy and complete the required verification process.',
    Icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Publish and earn',
    description:
      'Publish your strategy, attract subscribers and earn revenue from your trading expertise.',
    Icon: UsersRound,
  },
]

function Journey({ Icon, label, steps, title }) {
  return (
    <article className="rounded-2xl border border-alpha-border bg-alpha-white p-5 sm:p-7 lg:p-8">
      <div className="mb-5 flex items-center gap-3 border-b border-alpha-border pb-5">
        <span className="flex size-10 items-center justify-center rounded-xl bg-alpha-border/50 text-alpha-navy">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-alpha-navy/60">
            {label}
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-alpha-navy">
            {title}
          </h3>
        </div>
      </div>

      <ol className="space-y-5">
        {steps.map(({ description, Icon, number, title: stepTitle }) => (
          <li key={number} className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-alpha-border text-[11px] font-semibold text-alpha-navy">
              {number}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Icon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-alpha-navy/60"
                />
                <h4 className="text-sm font-semibold text-alpha-navy">
                  {stepTitle}
                </h4>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-alpha-navy/70">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  )
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-alpha-border/30 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-alpha-navy/70">
            How AlphaSync works
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-alpha-navy sm:text-4xl">
            Two journeys. One platform.
          </h2>
          <p className="mt-3 text-sm leading-6 text-alpha-navy/70 sm:text-base">
            Whether you want to follow a strategy or share your own, start with
            the path that fits you.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <Journey
            Icon={Compass}
            label="For Copiers"
            title="Discover strategies and start copying."
            steps={copierSteps}
          />
          <Journey
            Icon={ArrowUpRight}
            label="For Master Traders"
            title="Publish your strategy and grow."
            steps={traderSteps}
          />
        </div>
        <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-alpha-navy/65 sm:items-center">
          <Check
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-alpha-navy sm:mt-0"
          />
          Your capital stays with your broker. You stay in control.
        </p>
      </div>
    </section>
  )
}

export default HowItWorks
