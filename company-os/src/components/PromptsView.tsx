import { useEffect, useMemo, useState } from 'react'
import { Check, Copy, Plus, Star } from 'lucide-react'
import type { PromptTemplate } from '../types'
import { Modal } from './Modal'
import { PageHeader } from './PageHeader'

interface Props {
  prompts: PromptTemplate[]
  onSave: (
    prompt: Partial<PromptTemplate> & { title: string; body: string },
  ) => void
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
}

const SLASH_SNIPPETS = [
  { trigger: '/summary', label: '要約', insert: '以下を3点で要約してください:\n{{原文}}' },
  { trigger: '/tasks', label: 'タスク化', insert: '次の内容を実行タスクに分解してください:\n{{内容}}' },
  { trigger: '/mail', label: 'メール', insert: '丁寧なビジネスメールを書いてください。要件: {{要件}}' },
  { trigger: '/review', label: 'レビュー', insert: '次の文書を Critical / Major / Minor でレビュー:\n{{文書}}' },
  { trigger: '/agenda', label: 'アジェンダ', insert: '{{会議名}}のアジェンダを30分枠で作成。目的: {{目的}}' },
]

function extractVars(body: string) {
  return Array.from(new Set(Array.from(body.matchAll(/\{\{([^}]+)\}\}/g)).map((m) => m[1].trim())))
}

function fillTemplate(body: string, values: Record<string, string>) {
  return body.replace(/\{\{([^}]+)\}\}/g, (_, key: string) => {
    const k = key.trim()
    const v = values[k]
    return v?.trim() ? v : `{{${k}}}`
  })
}

export function PromptsView({
  prompts,
  onSave,
  onDelete,
  onToggleFavorite,
}: Props) {
  const [selectedId, setSelectedId] = useState(prompts[0]?.id ?? '')
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<PromptTemplate | null>(null)
  const [form, setForm] = useState({ title: '', category: '一般', body: '' })

  const sorted = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...prompts]
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.body.toLowerCase().includes(q),
      )
      .sort((a, b) => Number(b.favorite) - Number(a.favorite))
  }, [prompts, query])

  const selected = prompts.find((p) => p.id === selectedId) ?? sorted[0]

  useEffect(() => {
    if (!selected) return
    setDraft(selected.body)
    setValues({})
    setSelectedId(selected.id)
  }, [selected?.id])

  const variables = useMemo(() => extractVars(draft), [draft])
  const preview = fillTemplate(draft, values)

  const slashMatches = useMemo(() => {
    const lastLine = draft.split('\n').pop() ?? ''
    if (!lastLine.startsWith('/')) return []
    return SLASH_SNIPPETS.filter((s) => s.trigger.startsWith(lastLine.toLowerCase()))
  }, [draft])

  const applySnippet = (insert: string) => {
    const lines = draft.split('\n')
    lines[lines.length - 1] = insert
    setDraft(lines.join('\n'))
  }

  const copyPreview = async () => {
    await navigator.clipboard.writeText(preview)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const openCreate = () => {
    setEditing(null)
    setForm({ title: '', category: '一般', body: '{{内容}}\n\n上記について提案してください。' })
    setEditorOpen(true)
  }

  const openEditMeta = () => {
    if (!selected) return
    setEditing(selected)
    setForm({
      title: selected.title,
      category: selected.category,
      body: draft,
    })
    setEditorOpen(true)
  }

  const submitMeta = () => {
    if (!form.title.trim() || !form.body.trim()) return
    onSave({
      id: editing?.id,
      title: form.title.trim(),
      category: form.category.trim() || '一般',
      body: form.body,
    })
    setEditorOpen(false)
  }

  return (
    <PageHeader
      title="プロンプト補完"
      description="テンプレ選択・変数埋め込み・スラッシュ補完で、社内AIプロンプトをすぐ使える形に整えます。"
      actions={
        <button type="button" className="primary-btn" onClick={openCreate}>
          <Plus size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
          テンプレ追加
        </button>
      }
    >
      <div className="prompt-layout">
        <aside className="panel prompt-list">
          <input
            className="search-input"
            placeholder="テンプレを検索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          {sorted.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`prompt-item${selected?.id === p.id ? ' active' : ''}`}
              onClick={() => setSelectedId(p.id)}
            >
              <div className="cat">{p.category}</div>
              <strong>
                {p.favorite ? '★ ' : ''}
                {p.title}
              </strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                変数 {p.variables.length} 個
              </div>
            </button>
          ))}
          {sorted.length === 0 ? <div className="empty">テンプレなし</div> : null}
        </aside>

        <section className="panel prompt-studio">
          {selected ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                    {selected.category}
                  </div>
                  <h2
                    style={{
                      margin: '4px 0 0',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.45rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {selected.title}
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label="お気に入り"
                    onClick={() => onToggleFavorite(selected.id)}
                  >
                    <Star
                      size={18}
                      fill={selected.favorite ? 'currentColor' : 'none'}
                      color={selected.favorite ? 'var(--accent)' : 'currentColor'}
                    />
                  </button>
                  <button type="button" className="secondary-btn" onClick={openEditMeta}>
                    編集
                  </button>
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() => {
                      onDelete(selected.id)
                      setSelectedId(prompts.find((p) => p.id !== selected.id)?.id ?? '')
                    }}
                  >
                    削除
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 8 }}>
                  スラッシュ補完 — `/` で挿入候補
                </div>
                <div className="suggest-bar">
                  {SLASH_SNIPPETS.map((s) => (
                    <button
                      key={s.trigger}
                      type="button"
                      className="suggest-chip"
                      onClick={() => applySnippet(s.insert)}
                      title={s.trigger}
                    >
                      {s.trigger} {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {variables.length > 0 ? (
                <div className="var-grid">
                  {variables.map((v) => (
                    <div key={v} className="field">
                      <label htmlFor={`var-${v}`}>{v}</label>
                      <input
                        id={`var-${v}`}
                        value={values[v] ?? ''}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, [v]: e.target.value }))
                        }
                        placeholder={`{{${v}}}`}
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, minHeight: 0 }}>
                <div className="field" style={{ minHeight: 0 }}>
                  <label htmlFor="prompt-draft">編集（補完対象）</label>
                  <textarea
                    id="prompt-draft"
                    className="editor-box"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />
                  {slashMatches.length > 0 ? (
                    <div className="suggest-bar" style={{ marginTop: 8 }}>
                      {slashMatches.map((s) => (
                        <button
                          key={s.trigger}
                          type="button"
                          className="suggest-chip"
                          onClick={() => applySnippet(s.insert)}
                        >
                          {s.trigger} → 挿入
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="field" style={{ minHeight: 0 }}>
                  <label>完成プレビュー</label>
                  <div className="preview-box">{preview}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    onSave({
                      id: selected.id,
                      title: selected.title,
                      category: selected.category,
                      body: draft,
                      favorite: selected.favorite,
                    })
                  }
                >
                  テンプレに反映
                </button>
                <button type="button" className="primary-btn" onClick={copyPreview}>
                  {copied ? (
                    <>
                      <Check size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
                      コピー済み
                    </>
                  ) : (
                    <>
                      <Copy size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
                      プロンプトをコピー
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="empty">左からテンプレを選ぶか、新規作成してください</div>
          )}
        </section>
      </div>

      <Modal
        open={editorOpen}
        title={editing ? 'テンプレを編集' : 'テンプレを追加'}
        onClose={() => setEditorOpen(false)}
        footer={
          <>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setEditorOpen(false)}
            >
              キャンセル
            </button>
            <button type="button" className="primary-btn" onClick={submitMeta}>
              保存
            </button>
          </>
        }
      >
        <div className="modal-grid">
          <div className="field">
            <label htmlFor="p-title">タイトル</label>
            <input
              id="p-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="p-cat">カテゴリ</label>
            <input
              id="p-cat"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="p-body">本文（変数は {'{{名前}}'} ）</label>
            <textarea
              id="p-body"
              rows={8}
              className="editor-box"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </PageHeader>
  )
}
