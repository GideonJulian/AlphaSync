import { useId } from 'react'

function Input({
  className = '',
  error,
  id,
  label,
  ...props
}) {
  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-alpha-navy">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-lg border border-alpha-border bg-alpha-white px-3 py-2 text-alpha-black outline-none transition focus:border-alpha-navy focus:ring-2 focus:ring-alpha-navy/10 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-alpha-navy">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
