import styles from './layout.module.css'
import './globals.css'

export const metadata = {
  title: 'Todostriker',
  description: 'Be a striker of these todos and complete them'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body>
        <div
          className={styles.general__container}
          style={{ width: '100%', height: '100%' }}
        >
          <header>
            <div className={styles.header__container}>
              <div className="header__logo">
                <span className="app__name">
                  <strong>TODOSTRIKER</strong>
                </span>
              </div>
            </div>
          </header>
          <main className="main__container">
              {children}
          </main>
        </div>
      </body>
    </html>
  )
}
