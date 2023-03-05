import { AuthProvider } from '../components/AuthProvider'
import styles from './layout.module.css'
import { supabaseBrowserClient as supabase } from '../lib/supabase-browser-client'
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
            <AuthProvider supabase={supabase}>
              {children}
            </AuthProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
