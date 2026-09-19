import { useMemo, useState, type FormEvent } from 'react'
import { Bot, Eraser, Send } from 'lucide-react'
import { completeChat } from '../lib/ai'
import type {
  AiMessage,
  AiSettings,
  FixedPrompt,
  PromptTemplate,
} from '../types'
import { PageHeader } from './PageHeader'

interface Props {
  settings: AiSettings
  fixedPrompts: FixedPrompt[]
  prompts: PromptTemplate[]
  history: AiMessage[]
  onAppend: (msgs: AiMessage[]) => void
  onClear: () => void
  onOpenSettings: () => void
}

function fillTemplate(body: string, values: Record<string, string>) {
  return body.replace(/\{\{([^}]+)\}\}/g, (_, key: string) => {
    const k = key.trim()
    const v = values[k]
    return v?.trim() ? v : `{{${k}}}`
  })
}

function extractVars(body: string) {
  return Array.from(
    new Set(Array.from(body.matchAll(/\{\{([^}]+)\}\}/g)).map((m) => m[1].trim())),
  )
}

export function AiView({
  settings,
  fixedPrompts,
  prompts,
  history,
  onAppend,
  onClear,
  onOpenSettings,
}: Props) {
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [selectedTemplateId, setSelectedTemplateId] = useState('')
  const [vars, setVars] = useState<Record<string, string>>({})
  const [modeLabel, setModeLabel] = useState<'api' | 'demo' | null>(null)

  const enabledFixed = fixedPrompts.filter((f) => f.enabled)
  const selected = prompts.find((p) => p.id === selectedTemplateId)
  const templateVars = useMemo(
    () => (selected ? extractVars(selected.body) : []),
    [selected],
  )

  const applyTemplate = () => {
    if (!selected) return
    setInput(fillTemplate(selected.body, vars))
  }

  const run = async (e?: FormEvent) => {
    e?.preventDefault()
    const content = input.trim()
    if (!content || busy) return
    setBusy(true)
    setError('')
    const userMsg: AiMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
      promptTitle: selected?.title,
    }
    onAppend([userMsg])

    try {
      const prior = history
        .slice(-10)
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }))
      const { text, mode } = await completeChat({
        settings,
        fixedPrompts,
        userContent: content,
        history: prior,
      })
      setModeLabel(mode)
      onAppend([
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: text,
          createdAt: new Date().toISOString(),
        },
      ])
      setInput('')
    } catch (err) {
      setError(err instanceof Error ? err.message : '実行に失敗しました')
    } finally {
      setBusy(false)
    }
  }

  return (
    <PageHeader
      title="AI"
      description="画面内で固定プロンプト＋テンプレを使ってそのまま実行できます。外部チャット不要。"
      actions={
        <>
          <button type="button" className="secondary-btn" onClick={onOpenSettings}>
            AI設定
          </button>
          <button type="button" className="ghost-btn" onClick={onClear}>
            <Eraser size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
            履歴クリア
          </button>
        </>
      }
    >
      <div className="ai-layout">
        <aside className="panel ai-side">
          <h3>固定プロンプト（適用中）</h3>
          {enabledFixed.length === 0 ? (
            <div className="empty">有効な固定プロンプトはありません</div>
          ) : (
            <ul className="fixed-list">
              {enabledFixed.map((f) => (
                <li key={f.id}>
                  <strong>{f.title}</strong>
                  <span>{f.body}</span>
                </li>
              ))}
            </ul>
          )}

          <h3 style={{ marginTop: 18 }}>テンプレから投入</h3>
          <div className="field">
            <label htmlFor="ai-tpl">プロンプトテンプレ</label>
            <select
              id="ai-tpl"
              value={selectedTemplateId}
              onChange={(e) => {
                setSelectedTemplateId(e.target.value)
                setVars({})
              }}
            >
              <option value="">選択なし（自由入力）</option>
              {prompts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.favorite ? '★ ' : ''}
                  {p.title}
                </option>
              ))}
            </select>
          </div>
          {templateVars.map((v) => (
            <div key={v} className="field">
              <label htmlFor={`ai-var-${v}`}>{v}</label>
              <input
                id={`ai-var-${v}`}
                value={vars[v] ?? ''}
                onChange={(e) => setVars({ ...vars, [v]: e.target.value })}
              />
            </div>
          ))}
          {selected ? (
            <button
              type="button"
              className="secondary-btn"
              style={{ width: '100%', marginTop: 8 }}
              onClick={applyTemplate}
            >
              入力欄に反映
            </button>
          ) : null}

          <div className="ai-status">
            {settings.apiKey
              ? `API接続: ${settings.model}`
              : settings.useDemoWhenNoKey
                ? 'デモAIモード（キー未設定）'
                : 'APIキー未設定'}
            {modeLabel ? ` · 直近: ${modeLabel}` : ''}
          </div>
        </aside>

        <section className="panel ai-chat">
          <div className="ai-thread" aria-live="polite">
            {history.length === 0 ? (
              <div className="empty ai-empty">
                <Bot size={28} />
                <p>左のテンプレを選ぶか、下に直接入力して実行してください。</p>
              </div>
            ) : (
              history.map((m) => (
                <div key={m.id} className={`ai-bubble ${m.role}`}>
                  <div className="ai-bubble-meta">
                    {m.role === 'user' ? 'あなた' : 'Knot AI'}
                    {m.promptTitle ? ` · ${m.promptTitle}` : ''}
                  </div>
                  <pre>{m.content}</pre>
                </div>
              ))
            )}
          </div>

          <form className="ai-composer" onSubmit={run}>
            {error ? (
              <div className="form-error" role="alert">
                {error}
              </div>
            ) : null}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ここにプロンプトを入力…"
              rows={4}
              disabled={busy}
            />
            <div className="ai-composer-actions">
              <span className="meta">
                固定 {enabledFixed.length} 件 + システムプロンプトが毎回付与されます
              </span>
              <button type="submit" className="primary-btn" disabled={busy || !input.trim()}>
                <Send size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
                {busy ? '実行中…' : 'AI実行'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </PageHeader>
  )
}
