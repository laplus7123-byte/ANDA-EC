import {
  Bot,
  CalendarDays,
  CheckSquare,
  Home,
  LogOut,
  RotateCcw,
  Settings,
  Sparkles,
} from 'lucide-react'
import type { ViewId } from '../types'

const items: { id: ViewId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'ホーム', icon: Home },
  { id: 'tasks', label: 'タスク', icon: CheckSquare },
  { id: 'schedule', label: 'スケジュール', icon: CalendarDays },
  { id: 'prompts', label: 'プロンプト', icon: Sparkles },
  { id: 'ai', label: 'AI', icon: Bot },
  { id: 'settings', label: '設定', icon: Settings },
]

interface Props {
  view: ViewId
  displayName: string
  onNavigate: (view: ViewId) => void
  onReset: () => void
  onLogout: () => void
}

export function Sidebar({ view, displayName, onNavigate, onReset, onLogout }: Props) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <span className="brand-glyph" aria-hidden />
          <span className="brand-name">Knot</span>
        </div>
        <span className="brand-tag">{displayName} のワークスペース</span>
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
        <button type="button" className="ghost-btn" onClick={onLogout}>
          <LogOut size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
          ログアウト
        </button>
      </div>
    </aside>
  )
}
