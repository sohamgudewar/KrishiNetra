import { useState } from 'react'

export function MapView() {
  const [layer, setLayer] = useState('crop-type')

  const layers = [
    { id: 'crop-type', label: 'Crop Type' },
    { id: 'ndvi', label: 'NDVI / Health' },
    { id: 'stress', label: 'Stress Zones' },
    { id: 'boundaries', label: 'Land Boundaries' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Map View</h1>
      <p className="text-gray-600 mb-6">Satellite imagery analysis and crop mapping</p>

      <div className="flex gap-4 mb-6">
        {layers.map((l) => (
          <button
            key={l.id}
            onClick={() => setLayer(l.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              layer === l.id
                ? 'bg-green-700 text-white'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4" style={{ height: '600px' }}>
          <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Map Component</p>
              <p className="text-sm text-gray-400">Mapbox GL will render here</p>
              <p className="text-xs text-gray-400 mt-2">Layer: {layer}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">Legend</h3>
            {layer === 'crop-type' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-sm">Soybean</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded" />
                  <span className="text-sm">Cotton</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded" />
                  <span className="text-sm">Wheat</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded" />
                  <span className="text-sm">Sugarcane</span>
                </div>
              </div>
            )}
            {layer === 'ndvi' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-700 rounded" />
                  <span className="text-sm">Healthy (0.7-1.0)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded" />
                  <span className="text-sm">Moderate (0.4-0.7)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded" />
                  <span className="text-sm">Stressed (0.2-0.4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded" />
                  <span className="text-sm">Critical (0.0-0.2)</span>
                </div>
              </div>
            )}
            {layer === 'stress' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded" />
                  <span className="text-sm">High Stress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded" />
                  <span className="text-sm">Medium Stress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded" />
                  <span className="text-sm">Low Stress</span>
                </div>
              </div>
            )}
            {layer === 'boundaries' && (
              <p className="text-sm text-gray-500">Land parcel boundaries with area measurements</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Area Mapped</span>
                <span className="font-medium">12,450 ha</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Crops Detected</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Avg NDVI</span>
                <span className="font-medium">0.65</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Stress Areas</span>
                <span className="font-medium text-red-600">8.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
