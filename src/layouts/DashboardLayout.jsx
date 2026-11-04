import { Outlet } from 'react-router-dom'
import BottomNav from '../components/navigation/BottomNav.jsx'
import Sidebar from '../components/navigation/Sidebar.jsx'

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-alpha-white">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 pb-24 sm:px-6 md:pb-8">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}

export default DashboardLayout
