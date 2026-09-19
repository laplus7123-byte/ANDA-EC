import { useEffect, useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import type { AiSettings, FixedPrompt } from '../types'
import { Modal } from './Modal'
import { PageHeader } from './PageHeader'

interface Props {
  settings: AiSettings
  fixedPrompts: FixedPrompt[]
  displayName: string
  onSaveSettings: (patch: Partial<AiSettings>) => void
  onUpsertFixed: (partial: Partial<FixedPrompt> & { title: string; body: string }) => void
  onDeleteFixed: (id: string) => void
  onToggleFixed: (id: string) => void
  onChangePassword: (current: string, next: string) => Promise<void>
  onLogout: () => void
}

export function SettingsView({
  settings,
  fixedPrompts,
  displayName,
  onSaveSettings,
  onUpsertFixed,
  onDeleteFixed,
  onToggleFixed,
  onChangePassword,
  onLogout,
}: Props) {
  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(settings)
  }, [settings])

  const [pw, setPw] = useState({ current: '', next: '', next2: '' })
  const [pwMsg, setPwMsg] = useState('')
  const [fixedOpen, setFixedOpen] = useState(false)
  const [editing, setEditing] = useState<FixedPrompt | null>(null)
  const [fixedForm, setFixedForm] = useState({ title: '', body: '', enabled: true })

  const save = (e: FormEvent) => {
    e.preventDefault()
    onSaveSettings(form)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1600)
  }

  const submitPw = async (e: FormEvent) => {
    e.preventDefault()
    setPwMsg('')
    try {
      if (pw.next !== pw.next2) throw new Error('新パスワードが一致しません')
      await onChangePassword(pw.current, pw.next)
      setPw({ current: '', next: '', next2: '' })
      setPwMsg('パスワードを更新しました')
    } catch (err) {
      setPwMsg(err instanceof Error ? err.message : '更新に失敗しました')
    }
  }

  const openFixed = (item?: FixedPrompt) => {
    if (item) {
      setEditing(item)
      setFixedForm({ title: item.title, body: item.body, enabled: item.enabled })
    } else {
      setEditing(null)
      setFixedForm({ title: '', body: '', enabled: true })
    }
    setFixedOpen(true)
  }

  return (
    <PageHeader
      title="設定"
      description={`${displayName} 専用。APIキー・固定プロンプト・パスワードを管理します。`}
      actions={
        <button type="button" className="secondary-btn" onClick={onLogout}>
          ログアウト
        </button>
      }
    >
      <div className="settings-grid">
        <form className="panel settings-panel" onSubmit={save}>
          <h3>AI 接続</h3>
          <p className="sub">
            OpenAI 互換 API を画面内で直接呼び出します。キーはブラウザ内のみに保存されます。
          </p>
          <div className="field">
            <label htmlFor="api-key">APIキー</label>
            <input
              id="api-key"
              type="password"
              value={form.apiKey}
              onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
              placeholder="sk-..."
              autoComplete="off"
            />
          </div>
          <div className="field">
            <label htmlFor="base-url">Base URL</label>
            <input
              id="base-url"
              value={form.baseUrl}
              onChange={(e) => setForm({ ...form, baseUrl: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="model">モデル</label>
            <input
              id="model"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              placeholder="gpt-4o-mini"
            />
          </div>
          <div className="field">
            <label htmlFor="system-prompt">システムプロンプト（常時適用）</label>
            <textarea
              id="system-prompt"
              rows={5}
              value={form.systemPrompt}
              onChange={(e) => setForm({ ...form, systemPrompt: e.target.value })}
            />
          </div>
          <label className="check-row">
            <input
              type="checkbox"
              checked={form.useDemoWhenNoKey}
              onChange={(e) =>
                setForm({ ...form, useDemoWhenNoKey: e.target.checked })
              }
            />
            APIキー未設定時はデモAIで応答する
          </label>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button type="submit" className="primary-btn">
              {saved ? '保存しました' : 'AI設定を保存'}
            </button>
          </div>
        </form>

        <section className="panel settings-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <div>
              <h3>固定プロンプト</h3>
              <p className="sub">有効なものは毎回のAI呼び出しに自動で付与されます。</p>
            </div>
            <button type="button" className="secondary-btn" onClick={() => openFixed()}>
              <Plus size={14} style={{ marginRight: 4, verticalAlign: -2 }} />
              追加
            </button>
          </div>
          {fixedPrompts.map((f) => (
            <div key={f.id} className="fixed-row">
              <label className="check-row" style={{ flex: 1 }}>
                <input
                  type="checkbox"
                  checked={f.enabled}
                  onChange={() => onToggleFixed(f.id)}
                />
                <span>
                  <strong>{f.title}</strong>
                  <span className="fixed-preview">{f.body}</span>
                </span>
              </label>
              <button type="button" className="secondary-btn" onClick={() => openFixed(f)}>
                編集
              </button>
              <button
                type="button"
                className="danger-btn"
                onClick={() => onDeleteFixed(f.id)}
              >
                削除
              </button>
            </div>
          ))}
          {fixedPrompts.length === 0 ? (
            <div className="empty">固定プロンプトはまだありません</div>
          ) : null}
        </section>

        <form className="panel settings-panel" onSubmit={submitPw}>
          <h3>パスワード変更</h3>
          <div className="field">
            <label htmlFor="pw-cur">現在のパスワード</label>
            <input
              id="pw-cur"
              type="password"
              value={pw.current}
              onChange={(e) => setPw({ ...pw, current: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="pw-next">新しいパスワード</label>
            <input
              id="pw-next"
              type="password"
              value={pw.next}
              onChange={(e) => setPw({ ...pw, next: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="pw-next2">新しいパスワード（確認）</label>
            <input
              id="pw-next2"
              type="password"
              value={pw.next2}
              onChange={(e) => setPw({ ...pw, next2: e.target.value })}
              required
            />
          </div>
          {pwMsg ? <div className="form-hint">{pwMsg}</div> : null}
          <button type="submit" className="secondary-btn" style={{ marginTop: 10 }}>
            パスワードを更新
          </button>
        </form>
      </div>

      <Modal
        open={fixedOpen}
        title={editing ? '固定プロンプトを編集' : '固定プロンプトを追加'}
        onClose={() => setFixedOpen(false)}
        footer={
          <>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setFixedOpen(false)}
            >
              キャンセル
            </button>
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                if (!fixedForm.title.trim() || !fixedForm.body.trim()) return
                onUpsertFixed({
                  id: editing?.id,
                  title: fixedForm.title.trim(),
                  body: fixedForm.body.trim(),
                  enabled: fixedForm.enabled,
                })
                setFixedOpen(false)
              }}
            >
              保存
            </button>
          </>
        }
      >
        <div className="modal-grid">
          <div className="field">
            <label htmlFor="fx-title">タイトル</label>
            <input
              id="fx-title"
              value={fixedForm.title}
              onChange={(e) => setFixedForm({ ...fixedForm, title: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="fx-body">本文</label>
            <textarea
              id="fx-body"
              rows={5}
              value={fixedForm.body}
              onChange={(e) => setFixedForm({ ...fixedForm, body: e.target.value })}
            />
          </div>
          <label className="check-row">
            <input
              type="checkbox"
              checked={fixedForm.enabled}
              onChange={(e) =>
                setFixedForm({ ...fixedForm, enabled: e.target.checked })
              }
            />
            有効にする
          </label>
        </div>
      </Modal>
    </PageHeader>
  )
}
