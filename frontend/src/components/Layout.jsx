import { Outlet, NavLink } from 'react-router-dom'
import styles from './Layout.module.css'

function Layout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <NavLink to="/detect" className={styles.logoLink}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>◈</span>
              <div>
                <span className={styles.logoText}>AutoScan</span>
                <span className={styles.logoSub}>AI Detection</span>
              </div>
            </div>
          </NavLink>
          <nav className={styles.nav}>
            <NavLink to="/detect" className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
              <span className={styles.navIcon}>⊞</span>
              Detect
            </NavLink>
            <NavLink to="/history" className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
              <span className={styles.navIcon}>⧖</span>
              History
            </NavLink>
            <NavLink to="/stats" className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
              <span className={styles.navIcon}>◉</span>
              Stats
            </NavLink>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
