import { Outlet, NavLink } from 'react-router-dom'
import styles from './Layout.module.css'

function Layout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>🚗 CAR DETECTOR</div>
        <nav className={styles.nav}>
          <NavLink to="/detect" className={({isActive}) => isActive ? styles.active : ''}>
            Detect
          </NavLink>
          <NavLink to="/history" className={({isActive}) => isActive ? styles.active : ''}>
            History
          </NavLink>
          <NavLink to="/stats" className={({isActive}) => isActive ? styles.active : ''}>
            Stats
          </NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
