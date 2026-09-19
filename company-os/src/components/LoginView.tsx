import { useState, type FormEvent } from 'react'

interface Props {
  needsSetup: boolean
  onRegister: (name: string, password: string) => Promise<void>
  onLogin: (password: string) => Promise<void>
}

export function LoginView({ needsSetup, onRegister, onLogin }: Props) {
  const [name, setName] = useState('オーナー')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (needsSetup) {
        if (password !== password2) throw new Error('パスワードが一致しません')
        await onRegister(name, password)
      } else {
        await onLogin(password)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ログインに失敗しました')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="login-screen">
      <form className="login-card panel" onSubmit={submit}>
        <div className="brand" style={{ marginBottom: 18 }}>
          <div className="brand-mark">
            <span className="brand-glyph" aria-hidden />
            <span className="brand-name">Knot</span>
          </div>
          <span className="brand-tag">個人用ワークスペース</span>
        </div>

        <h1 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontSize: '1.7rem' }}>
          {needsSetup ? '初回セットアップ' : 'ログイン'}
        </h1>
        <p style={{ margin: '0 0 18px', color: 'var(--muted)', lineHeight: 1.6 }}>
          {needsSetup
            ? 'ご本人のみ利用する前提です。パスワードを設定してください。'
            : 'パスワードを入力してワークスペースを開きます。'}
        </p>

        {needsSetup ? (
          <div className="field" style={{ marginBottom: 12 }}>
            <label htmlFor="login-name">表示名</label>
            <input
              id="login-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="username"
            />
          </div>
        ) : null}

        <div className="field" style={{ marginBottom: 12 }}>
          <label htmlFor="login-pass">パスワード</label>
          <input
            id="login-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={needsSetup ? 'new-password' : 'current-password'}
            required
          />
        </div>

        {needsSetup ? (
          <div className="field" style={{ marginBottom: 12 }}>
            <label htmlFor="login-pass2">パスワード（確認）</label>
            <input
              id="login-pass2"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        ) : null}

        {error ? (
          <div className="form-error" role="alert">
            {error}
          </div>
        ) : null}

        <button type="submit" className="primary-btn" style={{ width: '100%' }} disabled={busy}>
          {busy ? '処理中…' : needsSetup ? 'はじめる' : 'ログイン'}
        </button>
      </form>
    </div>
  )
}
