import { useState, useEffect } from 'react'
import { getDashboardStats, getApplications } from '../services/api'

export function Dashboard() {
  const [stats, setStats] = useState({
    total_applications: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    flagged: 0,
  })
  const [recentApps, setRecentApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, appsRes] = await Promise.all([
          getDashboardStats(),
          getApplications()
        ])
        setStats(statsRes)
        setRecentApps(appsRes.slice(0, 4))
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Maharashtra Agriculture Administration Overview</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard label="Total Applications" value={stats.total_applications} color="blue" />
        <StatCard label="Pending" value={stats.pending} color="yellow" />
        <StatCard label="Approved" value={stats.approved} color="green" />
        <StatCard label="Rejected" value={stats.rejected} color="red" />
        <StatCard label="Flagged" value={stats.flagged} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Verifications</h2>
          {recentApps.length === 0 ? (
            <p className="text-gray-500 text-sm">No applications yet</p>
          ) : (
            <div className="space-y-3">
              {recentApps.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{app.claimed_crop}</p>
                    <p className="text-sm text-gray-500">Claimed: {app.claimed_area} acres</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Actual: {app.geoai_verification?.detected_area || 'N/A'} acres</p>
                    <StatusBadge status={app.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Verification Status</h2>
          <div className="space-y-4">
            <StatusPie total={stats.total_applications} approved={stats.approved} pending={stats.pending} flagged={stats.flagged} />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
  }

  return (
    <div className={`rounded-lg border p-6 ${colors[color]}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  )
}

function StatusBadge({ status }) {
  const colors = {
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    submitted: 'bg-yellow-100 text-yellow-800',
    flagged: 'bg-orange-100 text-orange-800',
  }

  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded capitalize ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  )
}

function StatusPie({ total, approved, pending, flagged }) {
  if (total === 0) return <p className="text-gray-500 text-sm">No data available</p>

  const pct = (val) => ((val / total) * 100).toFixed(1)

  return (
    <div>
      <div className="flex h-6 rounded overflow-hidden mb-4">
        {approved > 0 && <div className="bg-green-500" style={{ width: `${pct(approved)}%` }} />}
        {pending > 0 && <div className="bg-yellow-500" style={{ width: `${pct(pending)}%` }} />}
        {flagged > 0 && <div className="bg-orange-500" style={{ width: `${pct(flagged)}%` }} />}
      </div>
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded" /> Approved ({pct(approved)}%)</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded" /> Pending ({pct(pending)}%)</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded" /> Flagged ({pct(flagged)}%)</div>
      </div>
    </div>
  )
}
