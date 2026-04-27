import { useState, useEffect } from 'react'
import { getHistory } from '../api'
import styles from './HistoryPage.module.css'

function HistoryPage() {
  const [detections, setDetections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [offset, setOffset] = useState(0)
  const LIMIT = 12

  useEffect(() => {
    loadHistory()
  }, [offset])

  const loadHistory = async () => {
    setLoading(true)
    try {
      const data = await getHistory(LIMIT, offset)
      setDetections(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className={styles.loading}>Loading...</div>
  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.container}>
      <h1>Detection History</h1>
      <div className={styles.grid}>
        {detections.map((detection) => (
          <div key={detection.id} className={styles.card}>
            <img src={detection.image_url} alt={detection.top_prediction} />
            <div className={styles.overlay}>
              <h3>{detection.top_prediction}</h3>
              <p>{(detection.confidence * 100).toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
      {detections.length === 0 && <p className={styles.empty}>No detections yet</p>}
      <div className={styles.pagination}>
        <button onClick={() => setOffset(Math.max(0, offset - LIMIT))} disabled={offset === 0}>Previous</button>
        <span>Page {offset / LIMIT + 1}</span>
        <button onClick={() => setOffset(offset + LIMIT)} disabled={detections.length < LIMIT}>Next</button>
      </div>
    </div>
  )
}

export default HistoryPage
