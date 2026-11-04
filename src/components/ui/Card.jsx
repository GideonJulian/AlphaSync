function Card({ as: Element = 'div', children, className = '', ...props }) {
  return (
    <Element
      className={`rounded-xl border border-alpha-border bg-alpha-white p-5 ${className}`}
      {...props}
    >
      {children}
    </Element>
  )
}

export default Card
