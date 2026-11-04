import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function FinalCTA() {
  return (
    <section id="get-started" className="bg-alpha-white pb-16 pt-4 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-alpha-navy px-6 py-12 text-center shadow-lg sm:px-12 sm:py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <span className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-alpha-orange">
              Start Without Capital Transfer
            </span>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-alpha-white sm:text-[40px] sm:leading-[48px]">
              Ready to get started?
            </h2>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-alpha-white/70">
              Join AlphaSync today and experience institutional copy trading
              precision with complete brokerage autonomy.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-lg bg-alpha-orange px-7 py-3.5 text-sm font-semibold text-alpha-navy shadow-sm transition-colors hover:bg-alpha-orange/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-white"
            >
              Create your account
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
