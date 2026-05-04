import { Link, useLocation } from 'react-router-dom'
import { Sprout, LayoutDashboard, FileText, Map, MessageSquare } from 'lucide-react'

export function Layout({ children }) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/applications', label: 'Applications', icon: FileText },
    { path: '/map', label: 'Map View', icon: Map },
    { path: '/grievances', label: 'Grievances', icon: MessageSquare },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-green-800 text-white">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8" />
            <h1 className="text-xl font-bold">KrishiNetra</h1>
          </div>
          <p className="text-xs text-green-200 mt-1">GeoAI + AI Administration</p>
        </div>

        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-green-700 border-r-4 border-yellow-400'
                    : 'hover:bg-green-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
