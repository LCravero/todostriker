'use client'

import { createContext, useEffect, useMemo, useState } from 'react'

export const AuthContext = createContext()

export const EVENTS = {
  PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
  SIGNED_OUT: 'SIGNED_OUT',
  USER_UPDATED: 'USER_UPDATED'
}

export const VIEWS = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password'
}

export const AuthProvider = ({ supabase, ...props }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [view, setView] = useState(VIEWS.SIGN_IN)

  useEffect(() => {
    async function getActiveSession () {
      const {
        data: { session: activeSession }
      } = await supabase.auth.getSession()

      setSession(activeSession)
      setUser(activeSession?.user ?? null)
    }

    getActiveSession()

    // Handling Auth state change
    const {
      data: { subscription: authListener }
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)

      switch (event) {
        case EVENTS.PASSWORD_RECOVERY:
          setView(VIEWS.UPDATE_PASSWORD)
          break
        case EVENTS.SIGNED_OUT:
        case EVENTS.USER_UPDATED:
          setView(VIEWS.SIGN_IN)
          break
        default:
      }
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [supabase])

  const value = useMemo(() => {
    return {
      session,
      user,
      view,
      signOut: () => supabase.auth.signOut()
    }
  }, [session, supabase, user, view])

  return <AuthContext.Provider value={value} {...props} />
}
