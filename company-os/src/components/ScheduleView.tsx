import { useMemo, useState } from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { ja } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import type { ScheduleEvent, Task } from '../types'
import { Modal } from './Modal'
import { PageHeader } from './PageHeader'

interface Props {
  events: ScheduleEvent[]
  tasks: Task[]
  onSave: (
    event: Partial<ScheduleEvent> & { title: string; date: string },
  ) => void
  onDelete: (id: string) => void
}

const colors = ['#2F6F5E', '#C46B3A', '#3A5F8A', '#6B4F8A', '#8A5A2A']

const emptyForm = {
  title: '',
  description: '',
  date: format(new Date(), 'yyyy-MM-dd'),
  startTime: '10:00',
  endTime: '11:00',
  color: colors[0],
  taskId: '',
}

export function ScheduleView({ events, tasks, onSave, onDelete }: Props) {
  const [cursor, setCursor] = useState(startOfMonth(new Date()))
  const [selected, setSelected] = useState(new Date())
  const [editing, setEditing] = useState<ScheduleEvent | null>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 0 })
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 0 })
    return eachDayOfInterval({ start, end })
  }, [cursor])

  const dayEvents = events
    .filter((e) => e.date === format(selected, 'yyyy-MM-dd'))
    .sort((a, b) => a.startTime.localeCompare(b.startTime))

  const openCreate = (date?: Date) => {
    const d = date ?? selected
    setEditing(null)
    setForm({
      ...emptyForm,
      date: format(d, 'yyyy-MM-dd'),
    })
    setOpen(true)
  }

  const openEdit = (event: ScheduleEvent) => {
    setEditing(event)
    setForm({
      title: event.title,
      description: event.description,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      color: event.color,
      taskId: event.taskId ?? '',
    })
    setOpen(true)
  }

  const submit = () => {
    if (!form.title.trim()) return
    onSave({
      id: editing?.id,
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      color: form.color,
      taskId: form.taskId || null,
    })
    setOpen(false)
  }

  return (
    <PageHeader
      title="スケジュール"
      description="月次カレンダーで予定を把握。タスクとひも付けて実行計画を一本化できます。"
      actions={
        <button type="button" className="primary-btn" onClick={() => openCreate()}>
          <Plus size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
          予定を追加
        </button>
      }
    >
      <div className="calendar-wrap">
        <section className="panel calendar">
          <div className="cal-nav">
            <button
              type="button"
              className="icon-btn"
              aria-label="前月"
              onClick={() => setCursor((c) => addMonths(c, -1))}
            >
              <ChevronLeft size={20} />
            </button>
            <h2>{format(cursor, 'yyyy年 M月', { locale: ja })}</h2>
            <button
              type="button"
              className="icon-btn"
              aria-label="翌月"
              onClick={() => setCursor((c) => addMonths(c, 1))}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="cal-grid">
            {['日', '月', '火', '水', '木', '金', '土'].map((d) => (
              <div key={d} className="cal-dow">
                {d}
              </div>
            ))}
            {days.map((day) => {
              const key = format(day, 'yyyy-MM-dd')
              const dots = events.filter((e) => e.date === key)
              const classes = [
                'cal-cell',
                !isSameMonth(day, cursor) ? 'muted' : '',
                isSameDay(day, new Date()) ? 'today' : '',
                isSameDay(day, selected) ? 'selected' : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <button
                  key={key}
                  type="button"
                  className={classes}
                  onClick={() => setSelected(day)}
                  onDoubleClick={() => openCreate(day)}
                >
                  <div className="cal-daynum">{format(day, 'd')}</div>
                  {dots.slice(0, 3).map((e) => (
                    <span
                      key={e.id}
                      className="cal-dot"
                      style={{ background: e.color }}
                      title={e.title}
                    />
                  ))}
                </button>
              )
            })}
          </div>
        </section>

        <section className="panel day-panel">
          <h3>{format(selected, 'M月d日(E)', { locale: ja })}</h3>
          <div className="sub">ダブルクリックでその日に予定を追加</div>

          {dayEvents.length === 0 ? (
            <div className="empty">この日の予定はありません</div>
          ) : (
            dayEvents.map((e) => (
              <button
                key={e.id}
                type="button"
                className="event-item"
                style={{ borderLeftColor: e.color }}
                onClick={() => openEdit(e)}
              >
                <strong>{e.title}</strong>
                <span>
                  {e.startTime}–{e.endTime}
                  {e.taskId
                    ? ` · タスク: ${tasks.find((t) => t.id === e.taskId)?.title ?? '—'}`
                    : ''}
                </span>
              </button>
            ))
          )}

          <button
            type="button"
            className="secondary-btn"
            style={{ width: '100%', marginTop: 8 }}
            onClick={() => openCreate(selected)}
          >
            この日に追加
          </button>
        </section>
      </div>

      <Modal
        open={open}
        title={editing ? '予定を編集' : '予定を追加'}
        onClose={() => setOpen(false)}
        footer={
          <>
            {editing ? (
              <button
                type="button"
                className="danger-btn"
                style={{ marginRight: 'auto' }}
                onClick={() => {
                  onDelete(editing.id)
                  setOpen(false)
                }}
              >
                削除
              </button>
            ) : null}
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setOpen(false)}
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
            <label htmlFor="evt-title">タイトル</label>
            <input
              id="evt-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="evt-desc">メモ</label>
            <textarea
              id="evt-desc"
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="evt-date">日付</label>
            <input
              id="evt-date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="field">
              <label htmlFor="evt-start">開始</label>
              <input
                id="evt-start"
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="evt-end">終了</label>
              <input
                id="evt-end"
                type="time"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="evt-task">関連タスク（任意）</label>
            <select
              id="evt-task"
              value={form.taskId}
              onChange={(e) => setForm({ ...form, taskId: e.target.value })}
            >
              <option value="">なし</option>
              {tasks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>カラー</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`色 ${c}`}
                  onClick={() => setForm({ ...form, color: c })}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    border:
                      form.color === c
                        ? '2px solid var(--ink)'
                        : '2px solid transparent',
                    background: c,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </PageHeader>
  )
}
