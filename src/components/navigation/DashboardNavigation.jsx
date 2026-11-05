import { NavLink } from 'react-router-dom'

function NavigationItem({ item, variant }) {
  const Icon = item.icon
  const icon =
    Icon && variant !== 'top' ? (
      <Icon aria-hidden="true" className="size-5 shrink-0" />
    ) : null
  const className =
    variant === 'top'
      ? `whitespace-nowrap py-2 text-sm transition-colors hover:text-alpha-navy ${
          item.active
            ? 'font-bold text-alpha-navy'
            : 'font-medium text-alpha-navy/70'
        }`
      : 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-alpha-navy/70 transition-colors hover:bg-alpha-border/50 hover:text-alpha-navy'

  if (item.disabled || (!item.href && !item.to)) {
    return (
      <span
        key={item.label}
        aria-disabled="true"
        title={`${item.label} is not available yet`}
        className={`${className} cursor-not-allowed opacity-45`}
      >
        {icon}
        {item.label}
      </span>
    )
  }

  if (item.to) {
    return (
      <NavLink
        key={item.label}
        to={item.to}
        end={item.end}
        className={({ isActive }) =>
          `${className} ${
            isActive
              ? variant === 'top'
                ? 'font-bold text-alpha-navy'
                : 'bg-alpha-navy font-semibold text-alpha-white'
              : ''
          }`
        }
      >
        {icon}
        {item.label}
      </NavLink>
    )
  }

  return (
    <a
      key={item.label}
      href={item.href}
      aria-current={item.active ? 'page' : undefined}
      className={`${className} ${
        item.active && variant !== 'top'
          ? 'bg-alpha-navy font-semibold text-alpha-white'
          : ''
      }`}
    >
      {icon}
      {item.label}
    </a>
  )
}

function DashboardNavigation({ items, label, variant = 'sidebar' }) {
  const variantClasses = {
    top: 'flex flex-wrap items-center gap-4 lg:gap-7',
    sidebar: 'flex flex-col gap-1',
    mobile: 'flex min-w-max items-center gap-1',
  }

  return (
    <nav aria-label={label} className={variantClasses[variant]}>
      {items.map((item) => (
        <NavigationItem key={item.label} item={item} variant={variant} />
      ))}
    </nav>
  )
}

export default DashboardNavigation
