import { Outlet } from 'react-router-dom'
import Logo from '../components/common/Logo.jsx'

function AuthLayout() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-alpha-white px-4 py-8">
      <div className="w-full max-w-md">
        <Logo />
        <section className="mt-10">
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default AuthLayout
