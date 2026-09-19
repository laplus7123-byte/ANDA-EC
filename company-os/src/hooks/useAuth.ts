import { useCallback, useEffect, useState } from 'react'
import { hashPassword, verifyPassword } from '../lib/crypto'
import type { AuthState } from '../types'

const AUTH_KEY = 'knot-auth-v1'
const SESSION_KEY = 'knot-session-v1'

function loadAuth(): AuthState | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthState
  } catch {
    return null
  }
}

function saveAuth(auth: AuthState) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth))
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState | null>(() => loadAuth())
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  const register = useCallback(async (displayName: string, password: string) => {
    if (password.length < 4) throw new Error('パスワードは4文字以上にしてください')
    const passwordHash = await hashPassword(password)
    const next: AuthState = {
      displayName: displayName.trim() || 'オーナー',
      passwordHash,
      createdAt: new Date().toISOString(),
    }
    saveAuth(next)
    setAuth(next)
    sessionStorage.setItem(SESSION_KEY, '1')
    setAuthed(true)
  }, [])

  const login = useCallback(
    async (password: string) => {
      const current = loadAuth()
      if (!current) throw new Error('アカウントがありません')
      const ok = await verifyPassword(password, current.passwordHash)
      if (!ok) throw new Error('パスワードが違います')
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuth(current)
      setAuthed(true)
    },
    [],
  )

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }, [])

  const changePassword = useCallback(
    async (currentPassword: string, nextPassword: string) => {
      const current = loadAuth()
      if (!current) throw new Error('アカウントがありません')
      const ok = await verifyPassword(currentPassword, current.passwordHash)
      if (!ok) throw new Error('現在のパスワードが違います')
      if (nextPassword.length < 4) throw new Error('新パスワードは4文字以上')
      const passwordHash = await hashPassword(nextPassword)
      const next = { ...current, passwordHash }
      saveAuth(next)
      setAuth(next)
    },
    [],
  )

  return {
    ready,
    auth,
    authed: Boolean(authed && auth),
    needsSetup: ready && !auth,
    register,
    login,
    logout,
    changePassword,
  }
}
