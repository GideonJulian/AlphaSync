import { Layers3, LineChart } from 'lucide-react'

const roles = [
  {
    id: 'copier',
    label: 'Copier',
    description: 'I want to follow and copy traders.',
    Icon: Layers3,
  },
  {
    id: 'trader',
    label: 'Trader',
    description: 'I want to share my trading strategy.',
    Icon: LineChart,
  },
]

function RoleSelector({ onSelect, selectedRole }) {
  return (
    <fieldset className="mb-5 transition-all duration-200 lg:mb-6 motion-reduce:transition-none">
      <legend className="mb-2 text-xs font-medium text-alpha-navy/70">
        <span className="lg:hidden">Select your execution profile</span>
        <span className="hidden text-[11px] font-semibold uppercase tracking-wider lg:inline">
          Account Function
        </span>
      </legend>
      <div className="grid grid-cols-2 gap-2 lg:gap-3">
        {roles.map(({ description, Icon, id, label }) => {
          const selected = selectedRole === id

          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(id)}
              className={`relative flex min-h-[110px] flex-col justify-between rounded-lg bg-alpha-white p-3 text-left shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange motion-reduce:transition-none lg:h-28 lg:min-h-0 lg:rounded-xl lg:p-3.5 ${
                selected
                  ? 'outline outline-2 outline-alpha-navy lg:border-2 lg:bg-alpha-border/30 lg:outline-none'
                  : 'outline outline-1 outline-alpha-border hover:bg-alpha-border/30 lg:border lg:hover:bg-alpha-white lg:outline-none'
              }`}
            >
              <span className="flex w-full items-start justify-between">
                <span
                  className={`flex size-7 items-center justify-center rounded ${
                    selected
                      ? 'rounded-lg bg-alpha-navy text-alpha-white lg:rounded lg:bg-alpha-navy'
                      : 'rounded-lg bg-alpha-border/60 text-alpha-navy lg:rounded lg:bg-alpha-border/60'
                  }`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span
                  aria-hidden="true"
                  className={`flex size-4 items-center justify-center rounded-full ${
                    selected
                      ? 'border-0 bg-alpha-navy lg:border-2 lg:border-alpha-navy lg:bg-alpha-white'
                      : 'border-0 bg-alpha-border lg:border lg:border-alpha-border lg:bg-alpha-white'
                  }`}
                >
                  {selected && (
                    <span className="size-1.5 rounded-full bg-alpha-white lg:size-2 lg:bg-alpha-navy" />
                  )}
                </span>
              </span>
              <span>
                <span className="mb-1 block text-sm font-semibold leading-none text-alpha-black">
                  {label}
                </span>
                <span className="block text-xs leading-tight text-alpha-navy/70">
                  {description}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default RoleSelector
