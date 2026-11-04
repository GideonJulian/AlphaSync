import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

function AuthForm({
  mode,
  onForgotPassword,
  onPasswordVisibilityChange,
  onSubmit,
  passwordVisible,
  role,
}) {
  const [password, setPassword] = useState('')
  const registering = mode === 'register'
  const submitLabel = registering
    ? `Create ${role === 'copier' ? 'Copier' : 'Trader'} Account`
    : 'Sign In'
  const strength = password.length === 0
    ? 0
    : password.length < 6
      ? 1
      : password.length < 10
        ? 2
        : password.length < 12
          ? 3
          : /[A-Z]/.test(password) && /[0-9]/.test(password)
            ? 4
            : 3
  const strengthLabel =
    password.length === 0
      ? 'Standard Security'
      : password.length < 6
        ? 'Too Short'
        : password.length < 10
          ? 'Moderate'
          : password.length < 12
            ? 'Strong'
            : strength === 4
              ? 'Institutional Grade'
              : 'Strong'

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {registering && (
        <div>
          <label
            htmlFor="auth-full-name"
            className="mb-1.5 block text-sm font-semibold text-alpha-black"
          >
            Full name
          </label>
          <input
            id="auth-full-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            className="h-11 w-full rounded-lg border border-alpha-border bg-alpha-white px-3 text-sm text-alpha-black shadow-sm outline-none transition-all placeholder:text-alpha-navy/40 focus:border-alpha-navy focus:ring-1 focus:ring-alpha-navy disabled:opacity-50 motion-reduce:transition-none sm:px-4"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="auth-email"
          className="mb-1.5 block text-sm font-semibold text-alpha-black"
        >
          Email address
        </label>
        <input
          id="auth-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="alex.morgan@example.com"
          required
          className="h-11 w-full rounded-lg border border-alpha-border bg-alpha-white px-3 text-sm text-alpha-black shadow-sm outline-none transition-all placeholder:text-alpha-navy/40 focus:border-alpha-navy focus:ring-1 focus:ring-alpha-navy disabled:opacity-50 motion-reduce:transition-none sm:px-4"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label
            htmlFor="auth-password"
            className="text-sm font-semibold text-alpha-black"
          >
            Password
          </label>
          {!registering && (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-medium text-alpha-navy underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange"
            >
              Forgot password?
            </button>
          )}
        </div>
        <div className="relative">
          <input
            id="auth-password"
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            autoComplete={registering ? 'new-password' : 'current-password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={registering ? 'At least 10 characters' : '••••••••••••'}
            minLength={registering ? 10 : undefined}
            required
            className="h-11 w-full rounded-lg border border-alpha-border bg-alpha-white pl-3 pr-11 font-mono text-sm text-alpha-black shadow-sm outline-none transition-all placeholder:font-sans placeholder:text-alpha-navy/40 focus:border-alpha-navy focus:ring-1 focus:ring-alpha-navy motion-reduce:transition-none sm:pl-4"
          />
          <button
            type="button"
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={passwordVisible}
            onClick={onPasswordVisibilityChange}
            className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded p-1 text-alpha-navy/60 transition-colors hover:text-alpha-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange motion-reduce:transition-none"
          >
            {passwordVisible ? (
              <EyeOff aria-hidden="true" className="size-[18px]" />
            ) : (
              <Eye aria-hidden="true" className="size-[18px]" />
            )}
          </button>
        </div>
        {registering && (
          <>
            <div className="mt-2 flex flex-col gap-1 pt-1 md:hidden">
              <div className="flex w-full items-center gap-1.5">
                {[1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors motion-reduce:transition-none ${
                      strength >= level ? 'bg-alpha-navy' : 'bg-alpha-border'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/50">
                  Entropy Score
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/70">
                  {strengthLabel}
                </span>
              </div>
            </div>
            <div className="mt-2 hidden items-center justify-between gap-3 text-xs text-alpha-navy/70 md:flex">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-alpha-orange" />
              Entropy: Standard Security
            </span>
            <span className="font-mono text-[11px] text-alpha-navy/50">
              Min 10 chars
            </span>
            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        className="mt-1 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-alpha-orange px-6 py-3 text-base font-semibold text-alpha-navy shadow-sm transition-colors hover:bg-alpha-orange/90 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-navy disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
      >
        {submitLabel}
        <ArrowRight aria-hidden="true" className="size-4" />
      </button>
    </form>
  )
}

export default AuthForm
