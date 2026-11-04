import { useEffect, useId } from 'react'
import { X } from 'lucide-react'

function Modal({ children, onClose, open, title }) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose?.()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-alpha-black/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : 'Dialog'}
        className="w-full max-w-lg rounded-xl border border-alpha-border bg-alpha-white p-6 text-alpha-black shadow-xl"
      >
        {(title || onClose) && (
          <div className="mb-4 flex items-center justify-between gap-4">
            {title && (
              <h2 id={titleId} className="text-lg font-semibold text-alpha-navy">
                {title}
              </h2>
            )}
            {onClose && (
              <button
                type="button"
                aria-label="Close dialog"
                onClick={onClose}
                className="ml-auto rounded-md p-1 text-alpha-navy transition hover:bg-alpha-border/30"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            )}
          </div>
        )}
        {children}
      </section>
    </div>
  )
}

export default Modal
