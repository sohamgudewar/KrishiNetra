import { useState, useEffect } from 'react'
import { getApplications, approveApplication, rejectApplication, flagApplication } from '../services/api'

export function Applications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchApps = async () => {
    setLoading(true)
    try {
      const data = await getApplications()
      setApplications(data)
    } catch (error) {
      console.error('Failed to fetch applications:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApps()
  }, [])

  const handleApprove = async (id) => {
    try {
      await approveApplication(id)
      fetchApps()
    } catch (error) {
      console.error('Approval failed:', error)
    }
  }

  const handleReject = async (id) => {
    try {
      await rejectApplication(id)
      fetchApps()
    } catch (error) {
      console.error('Rejection failed:', error)
    }
  }

  if (loading) return <p className="text-gray-500">Loading applications...</p>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications</h1>
          <p className="text-gray-600">Review and verify farmer applications</p>
        </div>
        <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
          New Application
        </button>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-500 bg-white p-6 rounded-lg shadow text-center">No applications submitted yet.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Crop</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Claimed</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actual</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Recommendation</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">#{app.id}</td>
                  <td className="px-6 py-4 capitalize">{app.claimed_crop}</td>
                  <td className="px-6 py-4">{app.claimed_area} acres</td>
                  <td className="px-6 py-4">{app.geoai_verification?.detected_area || 'N/A'} acres</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {app.recommendation || 'Pending'}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {app.status === 'submitted' && (
                        <>
                          <button 
                            onClick={() => handleApprove(app.id)}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleReject(app.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
