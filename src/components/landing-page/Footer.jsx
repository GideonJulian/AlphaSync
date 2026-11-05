import LandingBrand from './LandingBrand.jsx'

const footerLinks = [
  { label: 'Explore Traders', href: '#user-types' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Security', href: '#security' },
  { label: 'Terms', href: '#terms' },
  { label: 'Privacy', href: '#privacy' },
]

function Footer() {
  return (
    <footer className="border-t border-alpha-border bg-alpha-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-alpha-border pb-6 md:flex-row">
          <LandingBrand compact />
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {footerLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="text-[13px] text-alpha-navy/70 transition-colors hover:text-alpha-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 pt-5 text-center text-[13px] text-alpha-navy/70 sm:flex-row sm:text-left">
          <span>
            © 2025 AlphaSync Institutional Financial Technologies Inc. All
            rights reserved.
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-alpha-navy/60">
            Institutional Multi-Asset Network
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
