import { useId } from 'react'

function Input({
  className = '',
  description,
  error,
  id,
  label,
  ...props
}) {
  const generatedId = useId()
  const inputId = id || generatedId
  const descriptionId = `${inputId}-description`
  const errorId = `${inputId}-error`
  const describedBy = [
    description ? descriptionId : null,
    error ? errorId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined

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
        aria-describedby={describedBy}
        className={`w-full rounded-lg border bg-alpha-white px-3 py-2 text-alpha-black outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          error
            ? 'border-red-700 focus:border-red-700 focus:ring-red-700/10'
            : 'border-alpha-border focus:border-alpha-navy focus:ring-alpha-navy/10'
        } ${className}`}
        {...props}
      />
      {description && (
        <p id={descriptionId} className="text-xs leading-relaxed text-alpha-navy/70">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs leading-relaxed text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
