import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/auth/AuthForm.jsx'
import AuthHeader from '../../components/auth/AuthHeader.jsx'
import AuthMarketingPanel from '../../components/auth/AuthMarketingPanel.jsx'
import RoleSelector from '../../components/auth/RoleSelector.jsx'

function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('register')
  const [role, setRole] = useState('copier')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [notice, setNotice] = useState('')

  function toggleMode() {
    setMode((currentMode) =>
      currentMode === 'register' ? 'login' : 'register',
    )
    
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (mode === 'register') {
      navigate(role === 'copier' ? '/copier/dashboard' : '/trader/dashboard')
      return
    }

    setNotice('Login is not connected yet.')
  }

  return (
    <div className="flex min-h-screen flex-col bg-alpha-white text-alpha-black lg:flex-row">
      <AuthMarketingPanel />

      <section className="flex min-h-screen w-full flex-col justify-between bg-alpha-white px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(3.5rem+env(safe-area-inset-top))] sm:px-8 lg:w-[54%] lg:p-14 xl:w-[56%] xl:p-16">
        <AuthHeader />

        <div
          key={mode}
          className="mx-auto my-auto w-full max-w-[440px] py-4 motion-safe:animate-[auth-enter_250ms_ease-out] motion-reduce:animate-none sm:py-8"
        >
          <div className="mb-5 lg:mb-6">
            <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-alpha-border/50 px-2 py-1 lg:hidden">
              <span className="size-1.5 rounded-full bg-alpha-orange" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-alpha-navy/70">
                Institutional Grade Sync
              </span>
            </div>
            <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-alpha-black">
              {mode === 'register' ? (
                'Get started with AlphaSync'
              ) : (
                <>
                  <span className="lg:hidden">Welcome back to AlphaSync</span>
                  <span className="hidden lg:inline">Sign in to AlphaSync</span>
                </>
              )}
            </h2>
            <p className="text-sm leading-5 text-alpha-navy/70">
              {mode === 'register' ? (
                'Choose how you want to use AlphaSync.'
              ) : (
                <>
                  <span className="lg:hidden">
                    Sign in to monitor your portfolio and positions.
                  </span>
                  <span className="hidden lg:inline">
                    Welcome back. Enter your credentials to access your terminal.
                  </span>
                </>
              )}
            </p>
          </div>

          {mode === 'register' && (
            <RoleSelector selectedRole={role} onSelect={setRole} />
          )}

          <AuthForm
            mode={mode}
            role={role}
            passwordVisible={passwordVisible}
            onPasswordVisibilityChange={() =>
              setPasswordVisible((visible) => !visible)
            }
            onSubmit={handleSubmit}
            onForgotPassword={() =>
              setNotice('Password reset is not connected yet.')
            }
          />
          {notice && (
            <p role="status" className="mt-3 text-center text-xs text-alpha-navy/70">
              {notice}
            </p>
          )}
{/* 
          <SocialAuth
            notice={notice}
            onContinue={() =>
              setNotice('Google sign-in is not connected yet.')
            }
          /> */}

          <p className="pt-5 text-center text-sm leading-5 text-alpha-navy/70 lg:pt-6 lg:text-[13px]">
            {mode === 'register'
              ? 'Already have an account?'
              : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="ml-1 font-semibold text-alpha-black underline decoration-alpha-border underline-offset-2 transition-colors hover:text-alpha-navy focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange motion-reduce:transition-none"
            >
              {mode === 'register' ? 'Sign in' : 'Create an account'}
            </button>
          </p>

          <p className="mt-6 border-t border-alpha-border pt-4 text-center text-xs leading-relaxed text-alpha-navy/60 lg:mt-8 lg:border-0 lg:pt-0">
            By continuing, you agree to AlphaSync’s{' '}
            <a
              href="#terms"
              className="underline hover:text-alpha-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="#privacy"
              className="underline hover:text-alpha-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <div aria-hidden="true" className="hidden h-6 lg:block" />
      </section>
    </div>
  )
}

export default AuthPage
