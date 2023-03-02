'use client'

import { Auth } from '../components/Auth'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { useAuth } from '../hooks'
import { VIEWS } from '../components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  const { signOut, user, view } = useAuth()

  if (view === VIEWS.UPDATE_PASSWORD)
    return <Auth view={view} />

  if (user)
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/app/page.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              rel="noopener noreferrer"
              target="_blank"
            >
              By
              {' '}
              <Image
                priority
                alt="Vercel Logo"
                className={styles.vercelLogo}
                height={24}
                src="/vercel.svg"
                width={100}
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            priority
            alt="Next.js Logo"
            className={styles.logo}
            height={37}
            src="/next.svg"
            width={180}
          />
          <div className={styles.thirteen}>
            <Image priority alt="13" height={31} src="/thirteen.svg" width={40} />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            className={styles.card}
            href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2 className={inter.className}>
              Docs
              {' '}
              <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            className={styles.card}
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2 className={inter.className}>
              Templates
              {' '}
              <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Explore the Next.js 13 playground.</p>
          </a>

          <a
            className={styles.card}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2 className={inter.className}>
              Deploy
              {' '}
              <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
          </a>
          <button
            className="signOut__button"
            type="button"
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
      </main>
    )

  return <Auth view={view} />
}
