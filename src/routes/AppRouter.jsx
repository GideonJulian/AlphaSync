import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import PublicLayout from '../layouts/PublicLayout.jsx'
import AuthPage from '../pages/auth/AuthPage.jsx'
import CopierDashboard from '../pages/copier/CopierDashboard.jsx'
import LandingPage from '../pages/public/LandingPage.jsx'
import TraderDashboard from '../pages/trader/TraderDashboard.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [{ index: true, element: <AuthPage /> }],
  },
  {
    path: '/copier',
    element: <DashboardLayout />,
    children: [{ path: 'dashboard', element: <CopierDashboard /> }],
  },
  {
    path: '/trader',
    element: <DashboardLayout />,
    children: [{ path: 'dashboard', element: <TraderDashboard /> }],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter
