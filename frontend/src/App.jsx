import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Applications } from './pages/Applications'
import { MapView } from './pages/MapView'
import { Grievances } from './pages/Grievances'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/grievances" element={<Grievances />} />
      </Routes>
    </Layout>
  )
}

export default App
