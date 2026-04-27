import styles from './ResultCard.module.css'

function ResultCard({ result }) {
  if (!result) return null
  const top5 = result.top5 || []

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={result.image_url} alt="Detected car" className={styles.image} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.prediction}>{result.top_prediction}</h2>
        <div className={styles.confidence}>
          <label>Confidence</label>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{width: `${result.confidence * 100}%`}} />
          </div>
          <span>{(result.confidence * 100).toFixed(2)}%</span>
        </div>
        {top5.length > 0 && (
          <div className={styles.top5}>
            <h3>Top 5 Predictions</h3>
            <ul>
              {top5.map((pred, idx) => (
                <li key={idx}>
                  <span>{pred.class_name}</span>
                  <span className={styles.conf}>{(pred.confidence * 100).toFixed(2)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className={styles.timestamp}>{new Date(result.created_at).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default ResultCard
