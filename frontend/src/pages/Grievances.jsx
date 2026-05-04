import { useState } from 'react'

export function Grievances() {
  const [grievances] = useState([
    {
      id: 1,
      farmer: 'Ramesh Patil',
      category: 'Survey Dispute',
      description: 'My land area was measured incorrectly',
      status: 'open',
      priority: 'high',
      created: '2026-04-28',
    },
    {
      id: 2,
      farmer: 'Sunita Deshmukh',
      category: 'Crop Misclassification',
      description: 'Cotton was classified as soybean',
      status: 'in-progress',
      priority: 'medium',
      created: '2026-04-25',
    },
    {
      id: 3,
      farmer: 'Vikram Shinde',
      category: 'Payment Delay',
      description: 'Insurance claim payment not received',
      status: 'resolved',
      priority: 'low',
      created: '2026-04-20',
    },
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Grievances</h1>
          <p className="text-gray-600">Manage farmer complaints and disputes</p>
        </div>
        <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
          New Grievance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Open</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Resolved</p>
          <p className="text-2xl font-bold">142</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Farmer</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {grievances.map((g) => (
              <tr key={g.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{g.farmer}</td>
                <td className="px-6 py-4">{g.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{g.description}</td>
                <td className="px-6 py-4">
                  <PriorityBadge priority={g.priority} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={g.status} />
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PriorityBadge({ priority }) {
  const colors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  }

  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded capitalize ${colors[priority]}`}>
      {priority}
    </span>
  )
}

function StatusBadge({ status }) {
  const colors = {
    open: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
  }

  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded capitalize ${colors[status]}`}>
      {status}
    </span>
  )
}
