import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import DetectPage from './pages/DetectPage'
import HistoryPage from './pages/HistoryPage'
import StatsPage from './pages/StatsPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/detect" replace />} />
        <Route path="/detect" element={<DetectPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Route>
    </Routes>
  )
}

export default App
