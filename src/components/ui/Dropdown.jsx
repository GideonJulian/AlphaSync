import { useId } from 'react'
import { ChevronDown } from 'lucide-react'

function Dropdown({
  className = '',
  id,
  label,
  options = [],
  placeholder,
  ...props
}) {
  const generatedId = useId()
  const selectId = id || generatedId

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-alpha-navy">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full appearance-none rounded-lg border border-alpha-border bg-alpha-white px-3 py-2 pr-9 text-alpha-black outline-none transition focus:border-alpha-navy focus:ring-2 focus:ring-alpha-navy/10 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            const value = typeof option === 'string' ? option : option.value
            const text = typeof option === 'string' ? option : option.label

            return (
              <option key={value} value={value}>
                {text}
              </option>
            )
          })}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-alpha-navy"
        />
      </div>
    </div>
  )
}

export default Dropdown
