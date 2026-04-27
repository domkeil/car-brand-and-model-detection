import { useState, useEffect } from 'react'
import { getStats } from '../api'
import styles from './StatsPage.module.css'

function StatsPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await getStats()
      setStats(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className={styles.loading}>Loading...</div>
  if (error) return <div className={styles.error}>{error}</div>
  if (!stats) return <div>No stats available</div>

  return (
    <div className={styles.container}>
      <h1>Statistics</h1>
      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <h3>Total Detections</h3>
          <p className={styles.number}>{stats.total_detections}</p>
        </div>
        <div className={styles.card}>
          <h3>Most Common Brand</h3>
          <p className={styles.brand}>{stats.most_common_brand}</p>
        </div>
        <div className={styles.card}>
          <h3>Most Common Model</h3>
          <p className={styles.model}>{stats.most_common_model}</p>
        </div>
      </div>
    </div>
  )
}

export default StatsPage
