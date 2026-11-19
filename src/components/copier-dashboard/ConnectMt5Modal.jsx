import { useEffect, useId, useRef, useState } from 'react'
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
} from 'lucide-react'
import Input from '../ui/Input.jsx'
import Modal from '../ui/Modal.jsx'

const initialForm = {
  broker: 'Exness Global Ltd',
  server: '',
  login: '',
  password: '',
}

const brokerOptions = ['Exness Global Ltd', 'IC Markets', 'Pepperstone', 'XM']

function ConnectMt5Modal({ open, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [connectionState, setConnectionState] = useState('form')
  const [errors, setErrors] = useState({})
  const [brokerMenuOpen, setBrokerMenuOpen] = useState(false)
  const [brokerFilter, setBrokerFilter] = useState('')
  const [activeBrokerIndex, setActiveBrokerIndex] = useState(-1)
  const brokerFieldRef = useRef(null)
  const brokerInputId = useId()
  const brokerListboxId = useId()
  const brokerDescriptionId = useId()
  const brokerErrorId = useId()
  const filteredBrokers = brokerOptions.filter((broker) =>
    broker.toLowerCase().includes(brokerFilter.trim().toLowerCase()),
  )

  useEffect(() => {
    if (!brokerMenuOpen) return undefined

    function handlePointerDown(event) {
      if (!brokerFieldRef.current?.contains(event.target)) {
        setBrokerMenuOpen(false)
        setBrokerFilter('')
        setActiveBrokerIndex(-1)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [brokerMenuOpen])

  useEffect(() => {
    if (!open || connectionState !== 'connecting') return undefined

    const timer = window.setTimeout(() => {
      setForm((current) => ({ ...current, password: '' }))
      setPasswordVisible(false)
      setConnectionState('success')
    }, 700)

    return () => window.clearTimeout(timer)
  }, [connectionState, open])

  const closeModal = () => {
    setForm(initialForm)
    setErrors({})
    setPasswordVisible(false)
    setConnectionState('form')
    setBrokerMenuOpen(false)
    setBrokerFilter('')
    setActiveBrokerIndex(-1)
    onClose()
  }

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[field]
      return next
    })
    setConnectionState('form')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setBrokerMenuOpen(false)
    setBrokerFilter('')
    setActiveBrokerIndex(-1)

    const nextErrors = {}
    if (!form.broker.trim()) nextErrors.broker = 'Select a broker or enter its name.'
    if (!form.server.trim()) nextErrors.server = 'Enter the server name shown in MT5.'
    if (!form.login.trim()) {
      nextErrors.login = 'Enter your MT5 login ID.'
    } else if (!/^\d+$/.test(form.login.trim())) {
      nextErrors.login = 'Use the numeric login ID provided by your broker.'
    }
    if (!form.password) nextErrors.password = 'Enter your MT5 trading password.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setConnectionState('error')
      return
    }

    setConnectionState('connecting')
  }

  const selectBroker = (broker) => {
    updateField('broker', broker)
    setBrokerMenuOpen(false)
    setBrokerFilter('')
    setActiveBrokerIndex(-1)
  }

  const handleBrokerKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setBrokerMenuOpen(true)
      setActiveBrokerIndex((current) =>
        Math.min(current + 1, filteredBrokers.length - 1),
      )
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setBrokerMenuOpen(true)
      setActiveBrokerIndex((current) => Math.max(current - 1, 0))
    } else if (
      event.key === 'Enter' &&
      brokerMenuOpen &&
      activeBrokerIndex >= 0 &&
      filteredBrokers[activeBrokerIndex]
    ) {
      event.preventDefault()
      selectBroker(filteredBrokers[activeBrokerIndex])
    } else if (event.key === 'Escape' && brokerMenuOpen) {
      event.preventDefault()
      event.stopPropagation()
      setBrokerMenuOpen(false)
      setBrokerFilter('')
      setActiveBrokerIndex(-1)
    } else if (event.key === 'Tab') {
      setBrokerMenuOpen(false)
      setBrokerFilter('')
      setActiveBrokerIndex(-1)
    }
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title="Connect MT5 account"
      className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-2xl"
    >
      {connectionState === 'success' ? (
        <div className="flex flex-col items-center py-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-alpha-orange/20 text-alpha-navy">
            <CheckCircle2 aria-hidden="true" className="size-8" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-alpha-navy">
            Connection preview complete
          </h3>
          <p className="mt-2 text-sm text-alpha-navy">
            Broker entered: <span className="font-semibold">{form.broker}</span>
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-alpha-navy/70">
            The form flow completed successfully. This frontend preview did not contact your
            broker, so your account is not connected or verified and copying is not active.
          </p>
          <button
            type="button"
            onClick={closeModal}
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-alpha-orange px-5 text-sm font-bold text-alpha-navy transition-colors hover:bg-alpha-orange/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy sm:w-auto"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          <p className="-mt-2 mb-5 text-sm leading-relaxed text-alpha-navy/70">
            Enter the account details provided by your broker to preview the connection flow.
          </p>

          {connectionState === 'error' && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-800"
            >
              Check the highlighted details and try again.
            </div>
          )}

          {connectionState === 'connecting' ? (
            <div
              role="status"
              aria-live="polite"
              className="flex min-h-52 flex-col items-center justify-center gap-3 text-center"
            >
              <LoaderCircle aria-hidden="true" className="size-8 animate-spin text-alpha-navy motion-reduce:animate-none" />
              <p className="font-semibold text-alpha-navy">Preparing connection preview…</p>
              <p className="text-sm text-alpha-navy/70">Your details are staying in this page.</p>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-alpha-navy">
                  Account environment
                </span>
                <span className="inline-flex min-h-9 items-center rounded-lg bg-alpha-navy px-3 text-xs font-semibold uppercase tracking-wide text-alpha-white">
                  Live account
                </span>
              </div>

              <div ref={brokerFieldRef} className="relative">
                <label htmlFor={brokerInputId} className="mb-1.5 block text-sm font-medium text-alpha-navy">
                  Broker
                </label>
                <div className="relative">
                  <Building2
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-alpha-navy/60"
                  />
                  <input
                    id={brokerInputId}
                    type="text"
                    role="combobox"
                    value={form.broker}
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    aria-autocomplete="list"
                    aria-expanded={brokerMenuOpen}
                    aria-controls={brokerMenuOpen ? brokerListboxId : undefined}
                    aria-activedescendant={
                      activeBrokerIndex >= 0
                        ? `${brokerListboxId}-${activeBrokerIndex}`
                        : undefined
                    }
                    aria-invalid={Boolean(errors.broker)}
                    aria-describedby={
                      errors.broker
                        ? `${brokerDescriptionId} ${brokerErrorId}`
                        : brokerDescriptionId
                    }
                    onFocus={() => {
                      setBrokerFilter('')
                      setActiveBrokerIndex(-1)
                      setBrokerMenuOpen(true)
                    }}
                    onChange={(event) => {
                      updateField('broker', event.target.value)
                      setBrokerFilter(event.target.value)
                      setActiveBrokerIndex(-1)
                      setBrokerMenuOpen(true)
                    }}
                    onKeyDown={handleBrokerKeyDown}
                    placeholder="Type or paste your broker name"
                    className={`min-h-11 w-full rounded-lg border bg-alpha-white py-2 pl-10 pr-12 text-sm text-alpha-black outline-none transition focus:ring-2 ${
                      errors.broker
                        ? 'border-red-700 focus:border-red-700 focus:ring-red-700/10'
                        : 'border-alpha-border focus:border-alpha-navy focus:ring-alpha-navy/10'
                    }`}
                  />
                  <button
                    type="button"
                    aria-label={brokerMenuOpen ? 'Hide broker options' : 'Show broker options'}
                    aria-haspopup="listbox"
                    aria-expanded={brokerMenuOpen}
                    onClick={() => {
                      if (brokerMenuOpen) {
                        setBrokerMenuOpen(false)
                        setBrokerFilter('')
                        setActiveBrokerIndex(-1)
                      } else {
                        setBrokerFilter('')
                        setActiveBrokerIndex(-1)
                        setBrokerMenuOpen(true)
                      }
                    }}
                    className="absolute right-1 top-1 flex size-9 items-center justify-center rounded-md text-alpha-navy/60 transition-colors hover:bg-alpha-border/40 hover:text-alpha-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 transition-transform ${brokerMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
                <p id={brokerDescriptionId} className="mt-1.5 text-xs text-alpha-navy/70">
                  Choose a suggestion or type/paste your broker&apos;s name.
                </p>
                {errors.broker && (
                  <p id={brokerErrorId} className="mt-1 text-xs text-red-700">
                    {errors.broker}
                  </p>
                )}
                {brokerMenuOpen && (
                  <div
                    id={brokerListboxId}
                    role="listbox"
                    aria-label="Broker suggestions"
                    className="absolute left-0 right-0 top-full z-30 mt-2 max-h-52 overflow-y-auto rounded-xl border border-alpha-border bg-alpha-white p-1.5 shadow-lg"
                  >
                    {filteredBrokers.length > 0 ? (
                      filteredBrokers.map((broker, index) => (
                        <div
                          key={broker}
                          id={`${brokerListboxId}-${index}`}
                          role="option"
                          aria-selected={form.broker === broker}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => selectBroker(broker)}
                          className={`flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 text-sm transition-colors ${
                            activeBrokerIndex === index
                              ? 'bg-alpha-border/60 text-alpha-navy'
                              : 'text-alpha-black hover:bg-alpha-border/40'
                          }`}
                        >
                          <span>{broker}</span>
                          {form.broker === broker && (
                            <Check aria-hidden="true" className="size-4 shrink-0 text-alpha-navy" />
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="px-3 py-2.5 text-xs leading-relaxed text-alpha-navy/70">
                        No suggestions found. Your broker name will be used as entered.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <Input
                id="mt5-server"
                label="Trade server"
                description="Use the exact server name shown on your broker's MT5 sign-in screen."
                placeholder="e.g. Exness-MT5Real9"
                value={form.server}
                onChange={(event) => updateField('server', event.target.value)}
                error={errors.server}
                autoComplete="off"
                spellCheck="false"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="mt5-login"
                  label="MT5 login ID"
                  description="Your numeric account identifier."
                  placeholder="e.g. 52084920"
                  value={form.login}
                  onChange={(event) => updateField('login', event.target.value)}
                  error={errors.login}
                  inputMode="numeric"
                  autoComplete="username"
                />
                <div className="relative">
                  <Input
                    id="mt5-password"
                    label="Trading password"
                    description="The password for your MT5 trading account."
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Enter your MT5 password"
                    value={form.password}
                    onChange={(event) => updateField('password', event.target.value)}
                    error={errors.password}
                    autoComplete="current-password"
                    className="pr-12"
                  />
                  <button
                    type="button"
                    aria-label={passwordVisible ? 'Hide trading password' : 'Show trading password'}
                    aria-pressed={passwordVisible}
                    onClick={() => setPasswordVisible((visible) => !visible)}
                    className="absolute right-2 top-8 flex size-9 items-center justify-center rounded-md text-alpha-navy/70 transition-colors hover:bg-alpha-border/40 hover:text-alpha-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy"
                  >
                    {passwordVisible ? (
                      <EyeOff aria-hidden="true" className="size-4" />
                    ) : (
                      <Eye aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-alpha-border bg-alpha-border/30 p-3.5">
                <LockKeyhole aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-alpha-navy" />
                <p className="text-xs leading-relaxed text-alpha-navy/70">
                  This is a frontend-only preview. Credentials remain in temporary page state;
                  no broker connection or account verification is performed.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-alpha-border pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="min-h-11 rounded-lg border border-alpha-border px-5 text-sm font-semibold text-alpha-navy transition-colors hover:bg-alpha-border/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-alpha-orange px-5 text-sm font-bold text-alpha-navy transition-colors hover:bg-alpha-orange/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy"
                >
                  Connect Account
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </Modal>
  )
}

export default ConnectMt5Modal
