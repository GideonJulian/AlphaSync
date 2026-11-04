import { ArrowRight, RadioTower, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const audiences = [
  {
    category: 'For Copiers',
    title: 'Mirror Pro Portfolios',
    description:
      'Follow top-ranked institutional traders and automatically copy their positions with granular trade sizing, automated trailing stops, and independent risk caps.',
    action: 'Start copying',
    Icon: TrendingUp,
  },
  {
    category: 'For Signal Providers',
    title: 'Monetize Your Edge',
    description:
      'Broadcast your MT5 executions to a global audience. Retain full IP protection on your underlying logic while monetizing performance and subscription fees.',
    action: 'Become a trader',
    Icon: RadioTower,
  },
]

function UserTypesSection() {
  return (
    <section id="user-types" className="bg-alpha-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-alpha-navy/70">
            Flexibility
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-alpha-navy">
            Built for traders and copiers.
          </h2>
          <p className="mt-2 text-sm text-alpha-navy/70">
            Two dedicated interfaces engineered for bilateral market
            participation.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {audiences.map(({ action, category, description, Icon, title }) => (
            <article
              key={category}
              className="flex flex-col justify-between rounded-2xl border border-alpha-border bg-alpha-white p-7 shadow-sm transition-shadow hover:shadow-md sm:p-9"
            >
              <div>
                <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-alpha-border/50 text-alpha-navy">
                  <Icon aria-hidden="true" className="size-7" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-alpha-navy/70">
                  {category}
                </span>
                <h3 className="mb-2 mt-1 text-2xl font-semibold text-alpha-navy">
                  {title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-alpha-navy/70">
                  {description}
                </p>
              </div>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 text-sm font-semibold text-alpha-navy transition-colors hover:text-alpha-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpha-orange"
              >
                {action}
                <ArrowRight aria-hidden="true" className="size-[18px]" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UserTypesSection
