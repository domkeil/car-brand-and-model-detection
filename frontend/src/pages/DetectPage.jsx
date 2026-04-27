import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { detectCar } from '../api'
import ResultCard from '../components/ResultCard'
import styles from './DetectPage.module.css'

function DetectPage() {
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) return
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)
    setError(null)
    setResult(null)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }
  })

  const handleDetect = async () => {
    if (!preview) {
      setError('Please select an image first')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(preview)
      const blob = await response.blob()
      const file = new File([blob], 'image.jpg', { type: blob.type })
      const detection = await detectCar(file)
      setResult(detection)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Detect Car</h1>
      <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop here...</p> : <div><p>Drag and drop image</p><p className={styles.hint}>JPG, PNG, WEBP</p></div>}
      </div>
      {preview && <div className={styles.preview}><img src={preview} alt="Preview" /></div>}
      {error && <div className={styles.error}>{error}</div>}
      <button onClick={handleDetect} disabled={!preview || loading} className={styles.detectBtn}>
        {loading ? 'Detecting...' : 'Detect'}
      </button>
      {result && <ResultCard result={result} />}
    </div>
  )
}

export default DetectPage
