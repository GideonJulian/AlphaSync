import { Outlet } from 'react-router-dom'
import CopierBottomNavigation from '../components/navigation/CopierBottomNavigation.jsx'
import CopierSidebar from '../components/navigation/CopierSidebar.jsx'

function CopierLayout() {
  return (
    <div className="min-h-screen bg-alpha-border/30">
      <CopierSidebar />
      <div className="min-h-screen min-w-0 pb-[calc(4rem+env(safe-area-inset-bottom))] md:ml-64 md:pb-0">
        <Outlet />
      </div>
      <CopierBottomNavigation />
    </div>
  )
}

export default CopierLayout
