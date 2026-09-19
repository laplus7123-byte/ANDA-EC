import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'
import type { ScheduleEvent, Task, ViewId } from '../types'
import { PageHeader } from './PageHeader'

interface Props {
  tasks: Task[]
  events: ScheduleEvent[]
  onNavigate: (view: ViewId) => void
}

const statusLabel = {
  todo: '未着手',
  doing: '進行中',
  done: '完了',
} as const

export function HomeView({ tasks, events, onNavigate }: Props) {
  const open = tasks.filter((t) => t.status !== 'done')
  const dueSoon = [...open]
    .filter((t) => t.dueDate)
    .sort((a, b) => (a.dueDate! > b.dueDate! ? 1 : -1))
    .slice(0, 4)

  const upcoming = [...events]
    .sort((a, b) =>
      `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`),
    )
    .filter((e) => e.date >= format(new Date(), 'yyyy-MM-dd'))
    .slice(0, 4)

  return (
    <PageHeader
      title="ホーム"
      description="タスク・スケジュール・プロンプトをひとつの作業面に結ぶ、Knot のダッシュボードです。"
    >
      <div className="home-grid">
        <section className="panel home-hero">
          <h2>仕事の流れを、ひとつに結ぶ。</h2>
          <p>
            個人利用向け。タスク・予定・固定プロンプト付きの画面内AIを、ひとつのワークスペースに統合しました。
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button
              type="button"
              className="primary-btn"
              onClick={() => onNavigate('ai')}
            >
              AIを開く
            </button>
            <button
              type="button"
              className="secondary-btn"
              style={{ background: 'rgba(255,255,255,0.16)', color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}
              onClick={() => onNavigate('tasks')}
            >
              タスクボード
            </button>
          </div>
        </section>

        <div>
          <div className="stat-row">
            <div className="stat">
              <strong>{open.length}</strong>
              <span>進行中のタスク</span>
            </div>
            <div className="stat">
              <strong>{events.length}</strong>
              <span>登録イベント</span>
            </div>
            <div className="stat">
              <strong>{tasks.filter((t) => t.status === 'done').length}</strong>
              <span>完了済み</span>
            </div>
          </div>

          <section className="panel quick-list" style={{ marginTop: 12 }}>
            <h3>直近の予定</h3>
            {upcoming.length === 0 ? (
              <div className="empty">予定はまだありません</div>
            ) : (
              upcoming.map((e) => (
                <div key={e.id} className="quick-item">
                  <div>
                    <strong>{e.title}</strong>
                    <div className="meta" style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                      {format(parseISO(e.date), 'M月d日(E)', { locale: ja })}{' '}
                      {e.startTime}–{e.endTime}
                    </div>
                  </div>
                  <span className="pill">予定</span>
                </div>
              ))
            )}
            <button
              type="button"
              className="secondary-btn"
              style={{ width: '100%', marginTop: 8 }}
              onClick={() => onNavigate('schedule')}
            >
              スケジュールを見る
            </button>
          </section>
        </div>

        <section className="panel quick-list" style={{ gridColumn: '1 / -1' }}>
          <h3>期限が近いタスク</h3>
          {dueSoon.length === 0 ? (
            <div className="empty">期限付きの未完了タスクはありません</div>
          ) : (
            dueSoon.map((t) => (
              <div key={t.id} className="quick-item">
                <div>
                  <strong>{t.title}</strong>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                    {t.assignee || '未割当'}
                    {t.dueDate
                      ? ` · 期限 ${format(parseISO(t.dueDate), 'M/d', { locale: ja })}`
                      : ''}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className={`pill ${t.priority}`}>{t.priority}</span>
                  <span className={`pill ${t.status}`}>{statusLabel[t.status]}</span>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </PageHeader>
  )
}
