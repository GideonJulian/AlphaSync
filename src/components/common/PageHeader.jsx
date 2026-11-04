function PageHeader({ actions, description, title }) {
  return (
    <header className="flex flex-col gap-4 border-b border-alpha-border pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-alpha-navy">
          {title}
        </h1>
        {description && <p className="text-sm text-alpha-navy">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
}

export default PageHeader
