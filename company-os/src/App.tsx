import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { HomeView } from './components/HomeView'
import { TasksView } from './components/TasksView'
import { ScheduleView } from './components/ScheduleView'
import { PromptsView } from './components/PromptsView'
import { AiView } from './components/AiView'
import { SettingsView } from './components/SettingsView'
import { LoginView } from './components/LoginView'
import { useStore } from './hooks/useStore'
import { useAuth } from './hooks/useAuth'
import type { ViewId } from './types'

export default function App() {
  const [view, setView] = useState<ViewId>('home')
  const store = useStore()
  const auth = useAuth()

  if (!auth.ready) {
    return <div className="login-screen" />
  }

  if (!auth.authed) {
    return (
      <LoginView
        needsSetup={auth.needsSetup}
        onRegister={auth.register}
        onLogin={auth.login}
      />
    )
  }

  return (
    <div className="app-shell">
      <Sidebar
        view={view}
        displayName={auth.auth?.displayName ?? 'オーナー'}
        onNavigate={setView}
        onReset={store.resetDemo}
        onLogout={auth.logout}
      />
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
            settings={store.aiSettings}
            fixedPrompts={store.fixedPrompts}
            onSave={store.upsertPrompt}
            onDelete={store.deletePrompt}
            onToggleFavorite={store.toggleFavorite}
            onSaveAiResult={(userContent, assistantContent, title) => {
              store.appendAiMessages([
                {
                  id: crypto.randomUUID(),
                  role: 'user',
                  content: userContent,
                  createdAt: new Date().toISOString(),
                  promptTitle: title,
                },
                {
                  id: crypto.randomUUID(),
                  role: 'assistant',
                  content: assistantContent,
                  createdAt: new Date().toISOString(),
                },
              ])
            }}
          />
        )}
        {view === 'ai' && (
          <AiView
            settings={store.aiSettings}
            fixedPrompts={store.fixedPrompts}
            prompts={store.prompts}
            history={store.aiHistory}
            onAppend={store.appendAiMessages}
            onClear={store.clearAiHistory}
            onOpenSettings={() => setView('settings')}
          />
        )}
        {view === 'settings' && (
          <SettingsView
            settings={store.aiSettings}
            fixedPrompts={store.fixedPrompts}
            displayName={auth.auth?.displayName ?? 'オーナー'}
            onSaveSettings={store.updateAiSettings}
            onUpsertFixed={store.upsertFixedPrompt}
            onDeleteFixed={store.deleteFixedPrompt}
            onToggleFixed={store.toggleFixedPrompt}
            onChangePassword={auth.changePassword}
            onLogout={auth.logout}
          />
        )}
      </main>
    </div>
  )
}
