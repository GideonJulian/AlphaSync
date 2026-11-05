import { ArrowRight, Check, Compass, RadioTower } from 'lucide-react'
import { Link } from 'react-router-dom'

const audiences = [
  {
    category: 'For Copiers',
    title: 'Follow the traders. Keep control.',
    description:
      'Find a trading approach that fits you, then decide how it runs in your broker trading account.',
    action: 'Explore Strategies',
    Icon: Compass,
    benefits: [
      'Discover verified master traders.',
      'Compare strategies and performance.',
      'Connect your broker trading account using the required MT5 account details.',
      'Configure risk and copying preferences.',
      'Monitor copied positions and performance.',
    ],
  },
  {
    category: 'For Master Traders',
    title: 'Turn your trading into an opportunity.',
    description:
      'Share your strategy with a wider community and build a subscriber base around your track record.',
    action: 'Become a Trader',
    Icon: RadioTower,
    benefits: [
      'Share your trading strategies.',
      'Connect and verify your broker trading account.',
      'Publish strategies on the marketplace.',
      'Attract subscribers.',
      'Earn revenue from paid subscriptions.',
      'Monitor subscriber activity and performance.',
    ],
  },
]

function UserTypesSection() {
  return (
    <section
      id="user-types"
      className="scroll-mt-20 bg-alpha-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-alpha-navy/70">
            One platform, two ways to grow
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-alpha-navy sm:text-4xl">
            Built for the whole trading community.
          </h2>
          <p className="mt-3 text-sm leading-6 text-alpha-navy/70 sm:text-base">
            Follow strategies as a Copier, or bring your expertise to the
            marketplace as a Master Trader.
          </p>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-6">
          {audiences.map(
            ({ action, benefits, category, description, Icon, title }) => (
              <article
                key={category}
                className="flex h-full flex-col rounded-2xl border border-alpha-border bg-alpha-white p-6 sm:p-8 lg:p-9"
              >
                <div className="mb-6 flex size-12 items-center justify-center rounded-xl border border-alpha-border bg-alpha-border/30 text-alpha-navy">
                  <Icon aria-hidden="true" className="size-6" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-alpha-navy/60">
                  {category}
                </span>
                <h3 className="mb-3 mt-2 max-w-md text-2xl font-semibold leading-tight tracking-tight text-alpha-navy sm:text-[28px]">
                  {title}
                </h3>
                <p className="mb-6 max-w-lg text-sm leading-relaxed text-alpha-navy/70">
                  {description}
                </p>
                <ul className="mb-8 space-y-3">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-alpha-navy/80"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-alpha-navy"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/auth"
                  className="mt-auto inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-lg bg-alpha-navy px-4 py-2.5 text-sm font-semibold text-alpha-white transition-colors hover:bg-alpha-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange"
                >
                  {action}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export default UserTypesSection
