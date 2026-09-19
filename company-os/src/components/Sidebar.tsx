import {
  CalendarDays,
  CheckSquare,
  Home,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import type { ViewId } from '../types'

const items: { id: ViewId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'ホーム', icon: Home },
  { id: 'tasks', label: 'タスク', icon: CheckSquare },
  { id: 'schedule', label: 'スケジュール', icon: CalendarDays },
  { id: 'prompts', label: 'プロンプト', icon: Sparkles },
]

interface Props {
  view: ViewId
  onNavigate: (view: ViewId) => void
  onReset: () => void
}

export function Sidebar({ view, onNavigate, onReset }: Props) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <span className="brand-glyph" aria-hidden />
          <span className="brand-name">Knot</span>
        </div>
        <span className="brand-tag">社内ワークスペース</span>
      </div>

      <nav className="nav" aria-label="メインナビ">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`nav-btn${view === id ? ' active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon />
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-foot">
        <button type="button" className="ghost-btn" onClick={onReset}>
          <RotateCcw size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
          デモデータをリセット
        </button>
      </div>
    </aside>
  )
}
