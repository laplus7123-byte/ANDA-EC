import { useMemo, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Plus } from 'lucide-react'
import type { Task, TaskPriority, TaskStatus } from '../types'
import { Modal } from './Modal'
import { PageHeader } from './PageHeader'

interface Props {
  tasks: Task[]
  onSave: (task: Partial<Task> & { title: string }) => void
  onDelete: (id: string) => void
  onMove: (id: string, status: TaskStatus) => void
}

const columns: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: '未着手' },
  { id: 'doing', label: '進行中' },
  { id: 'done', label: '完了' },
]

const emptyForm = {
  title: '',
  description: '',
  status: 'todo' as TaskStatus,
  priority: 'medium' as TaskPriority,
  dueDate: '',
  tags: '',
  assignee: '',
}

export function TasksView({ tasks, onSave, onDelete, onMove }: Props) {
  const [mode, setMode] = useState<'board' | 'list'>('board')
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Task | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tasks
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.assignee.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)),
    )
  }, [tasks, query])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setCreating(true)
  }

  const openEdit = (task: Task) => {
    setEditing(task)
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ?? '',
      tags: task.tags.join(', '),
      assignee: task.assignee,
    })
    setCreating(true)
  }

  const submit = () => {
    if (!form.title.trim()) return
    onSave({
      id: editing?.id,
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate || null,
      tags: form.tags
        .split(/[,、]/)
        .map((t) => t.trim())
        .filter(Boolean),
      assignee: form.assignee.trim(),
    })
    setCreating(false)
  }

  return (
    <PageHeader
      title="タスク"
      description="カンバンとリストで進捗を管理。優先度・期限・担当をひと目で把握できます。"
      actions={
        <>
          <div className="view-toggle" role="group" aria-label="表示切替">
            <button
              type="button"
              className={mode === 'board' ? 'active' : ''}
              onClick={() => setMode('board')}
            >
              ボード
            </button>
            <button
              type="button"
              className={mode === 'list' ? 'active' : ''}
              onClick={() => setMode('list')}
            >
              リスト
            </button>
          </div>
          <button type="button" className="primary-btn" onClick={openCreate}>
            <Plus size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
            新規タスク
          </button>
        </>
      }
    >
      <div className="filters">
        <input
          className="search-input"
          style={{ maxWidth: 360 }}
          placeholder="タイトル・担当・タグで検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {mode === 'board' ? (
        <div className="board">
          {columns.map((col) => {
            const items = filtered.filter((t) => t.status === col.id)
            return (
              <section key={col.id} className="column">
                <div className="column-head">
                  <h3>{col.label}</h3>
                  <span className="pill">{items.length}</span>
                </div>
                {items.map((task, i) => (
                  <article
                    key={task.id}
                    className="task-card"
                    style={{ animationDelay: `${i * 40}ms`, cursor: 'pointer' }}
                    onClick={() => openEdit(task)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openEdit(task)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <h4>{task.title}</h4>
                    {task.description ? (
                      <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.85rem' }}>
                        {task.description}
                      </p>
                    ) : null}
                    <div className="task-meta">
                      <span className={`pill ${task.priority}`}>{task.priority}</span>
                      {task.assignee ? <span className="meta">{task.assignee}</span> : null}
                      {task.dueDate ? (
                        <span className="meta">
                          {format(parseISO(task.dueDate), 'M/d')}
                        </span>
                      ) : null}
                    </div>
                    <div className="task-meta" style={{ marginTop: 8 }}>
                      {columns
                        .filter((c) => c.id !== task.status)
                        .map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            className="secondary-btn"
                            style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                            onClick={(e) => {
                              e.stopPropagation()
                              onMove(task.id, c.id)
                            }}
                          >
                            → {c.label}
                          </button>
                        ))}
                    </div>
                  </article>
                ))}
                {items.length === 0 ? (
                  <div className="empty">タスクなし</div>
                ) : null}
              </section>
            )
          })}
        </div>
      ) : (
        <div className="panel" style={{ overflow: 'auto' }}>
          <table className="list-table">
            <thead>
              <tr>
                <th>タイトル</th>
                <th>状態</th>
                <th>優先度</th>
                <th>担当</th>
                <th>期限</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((task) => (
                <tr key={task.id} onClick={() => openEdit(task)}>
                  <td>
                    <strong>{task.title}</strong>
                    {task.tags.length > 0 ? (
                      <div style={{ marginTop: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {task.tags.map((tag) => (
                          <span key={tag} className="pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <span className={`pill ${task.status}`}>
                      {columns.find((c) => c.id === task.status)?.label}
                    </span>
                  </td>
                  <td>
                    <span className={`pill ${task.priority}`}>{task.priority}</span>
                  </td>
                  <td>{task.assignee || '—'}</td>
                  <td>
                    {task.dueDate
                      ? format(parseISO(task.dueDate), 'yyyy/MM/dd')
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 ? <div className="empty">該当なし</div> : null}
        </div>
      )}

      <Modal
        open={creating}
        title={editing ? 'タスクを編集' : '新規タスク'}
        onClose={() => setCreating(false)}
        footer={
          <>
            {editing ? (
              <button
                type="button"
                className="danger-btn"
                style={{ marginRight: 'auto' }}
                onClick={() => {
                  onDelete(editing.id)
                  setCreating(false)
                }}
              >
                削除
              </button>
            ) : null}
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setCreating(false)}
            >
              キャンセル
            </button>
            <button type="button" className="primary-btn" onClick={submit}>
              保存
            </button>
          </>
        }
      >
        <div className="modal-grid">
          <div className="field">
            <label htmlFor="task-title">タイトル</label>
            <input
              id="task-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="例: 週次レポート作成"
            />
          </div>
          <div className="field">
            <label htmlFor="task-desc">説明</label>
            <textarea
              id="task-desc"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="field">
              <label htmlFor="task-status">状態</label>
              <select
                id="task-status"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as TaskStatus })
                }
              >
                {columns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="task-priority">優先度</label>
              <select
                id="task-priority"
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value as TaskPriority })
                }
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="field">
              <label htmlFor="task-assignee">担当</label>
              <input
                id="task-assignee"
                value={form.assignee}
                onChange={(e) => setForm({ ...form, assignee: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="task-due">期限</label>
              <input
                id="task-due"
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="task-tags">タグ（カンマ区切り）</label>
            <input
              id="task-tags"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="レポート, AI"
            />
          </div>
        </div>
      </Modal>
    </PageHeader>
  )
}
