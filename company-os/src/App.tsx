import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { HomeView } from './components/HomeView'
import { TasksView } from './components/TasksView'
import { ScheduleView } from './components/ScheduleView'
import { PromptsView } from './components/PromptsView'
import { useStore } from './hooks/useStore'
import type { ViewId } from './types'

export default function App() {
  const [view, setView] = useState<ViewId>('home')
  const store = useStore()

  return (
    <div className="app-shell">
      <Sidebar view={view} onNavigate={setView} onReset={store.resetDemo} />
      <main className="main">
        {view === 'home' && (
          <HomeView
            tasks={store.tasks}
            events={store.events}
            onNavigate={setView}
          />
        )}
        {view === 'tasks' && (
          <TasksView
            tasks={store.tasks}
            onSave={store.upsertTask}
            onDelete={store.deleteTask}
            onMove={store.moveTask}
          />
        )}
        {view === 'schedule' && (
          <ScheduleView
            events={store.events}
            tasks={store.tasks}
            onSave={store.upsertEvent}
            onDelete={store.deleteEvent}
          />
        )}
        {view === 'prompts' && (
          <PromptsView
            prompts={store.prompts}
            onSave={store.upsertPrompt}
            onDelete={store.deletePrompt}
            onToggleFavorite={store.toggleFavorite}
          />
        )}
      </main>
    </div>
  )
}
