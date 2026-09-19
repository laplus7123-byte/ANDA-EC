import { useCallback, useEffect, useState } from 'react'
import { defaultAiSettings, defaultFixedPrompts } from '../data/aiDefaults'
import { seedState } from '../data/seed'
import type {
  AiMessage,
  AiSettings,
  AppState,
  FixedPrompt,
  PromptTemplate,
  ScheduleEvent,
  Task,
  TaskPriority,
  TaskStatus,
} from '../types'

const STORAGE_KEY = 'knot-workspace-v1'
const uuid = () => crypto.randomUUID()

function migrate(raw: Partial<AppState> | null): AppState {
  const base = structuredClone(seedState)
  if (!raw) return base
  return {
    tasks: raw.tasks ?? base.tasks,
    events: raw.events ?? base.events,
    prompts: raw.prompts ?? base.prompts,
    fixedPrompts: raw.fixedPrompts ?? structuredClone(defaultFixedPrompts),
    aiSettings: { ...defaultAiSettings, ...(raw.aiSettings ?? {}) },
    aiHistory: raw.aiHistory ?? [],
  }
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(seedState)
    return migrate(JSON.parse(raw) as Partial<AppState>)
  } catch {
    return structuredClone(seedState)
  }
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function useStore() {
  const [state, setState] = useState<AppState>(() => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  const resetDemo = useCallback(() => {
    const next = structuredClone(seedState)
    // keep AI settings / fixed prompts / history across demo reset of tasks
    setState((prev) => ({
      ...next,
      aiSettings: prev.aiSettings,
      fixedPrompts: prev.fixedPrompts,
      aiHistory: prev.aiHistory,
    }))
  }, [])

  const upsertTask = useCallback((partial: Partial<Task> & { title: string }) => {
    setState((prev) => {
      const now = new Date().toISOString()
      if (partial.id) {
        return {
          ...prev,
          tasks: prev.tasks.map((t) =>
            t.id === partial.id ? { ...t, ...partial, updatedAt: now } : t,
          ),
        }
      }
      const task: Task = {
        id: uuid(),
        title: partial.title,
        description: partial.description ?? '',
        status: (partial.status as TaskStatus) ?? 'todo',
        priority: (partial.priority as TaskPriority) ?? 'medium',
        dueDate: partial.dueDate ?? null,
        tags: partial.tags ?? [],
        assignee: partial.assignee ?? '',
        createdAt: now,
        updatedAt: now,
      }
      return { ...prev, tasks: [task, ...prev.tasks] }
    })
  }, [])

  const deleteTask = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== id),
      events: prev.events.map((e) =>
        e.taskId === id ? { ...e, taskId: null } : e,
      ),
    }))
  }, [])

  const moveTask = useCallback((id: string, status: TaskStatus) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === id
          ? { ...t, status, updatedAt: new Date().toISOString() }
          : t,
      ),
    }))
  }, [])

  const upsertEvent = useCallback(
    (partial: Partial<ScheduleEvent> & { title: string; date: string }) => {
      setState((prev) => {
        if (partial.id) {
          return {
            ...prev,
            events: prev.events.map((e) =>
              e.id === partial.id ? { ...e, ...partial } : e,
            ),
          }
        }
        const event: ScheduleEvent = {
          id: uuid(),
          title: partial.title,
          description: partial.description ?? '',
          date: partial.date,
          startTime: partial.startTime ?? '10:00',
          endTime: partial.endTime ?? '11:00',
          color: partial.color ?? '#2F6F5E',
          taskId: partial.taskId ?? null,
        }
        return { ...prev, events: [...prev.events, event] }
      })
    },
    [],
  )

  const deleteEvent = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }))
  }, [])

  const upsertPrompt = useCallback(
    (partial: Partial<PromptTemplate> & { title: string; body: string }) => {
      setState((prev) => {
        const now = new Date().toISOString()
        const vars =
          partial.variables ??
          Array.from(partial.body.matchAll(/\{\{([^}]+)\}\}/g)).map((m) =>
            m[1].trim(),
          )

        if (partial.id) {
          return {
            ...prev,
            prompts: prev.prompts.map((p) =>
              p.id === partial.id
                ? { ...p, ...partial, variables: vars, updatedAt: now }
                : p,
            ),
          }
        }
        const prompt: PromptTemplate = {
          id: uuid(),
          title: partial.title,
          category: partial.category ?? '一般',
          body: partial.body,
          variables: vars,
          favorite: partial.favorite ?? false,
          updatedAt: now,
        }
        return { ...prev, prompts: [prompt, ...prev.prompts] }
      })
    },
    [],
  )

  const deletePrompt = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      prompts: prev.prompts.filter((p) => p.id !== id),
    }))
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      prompts: prev.prompts.map((p) =>
        p.id === id ? { ...p, favorite: !p.favorite } : p,
      ),
    }))
  }, [])

  const updateAiSettings = useCallback((patch: Partial<AiSettings>) => {
    setState((prev) => ({
      ...prev,
      aiSettings: { ...prev.aiSettings, ...patch },
    }))
  }, [])

  const upsertFixedPrompt = useCallback(
    (partial: Partial<FixedPrompt> & { title: string; body: string }) => {
      setState((prev) => {
        if (partial.id) {
          return {
            ...prev,
            fixedPrompts: prev.fixedPrompts.map((f) =>
              f.id === partial.id ? { ...f, ...partial } : f,
            ),
          }
        }
        const next: FixedPrompt = {
          id: uuid(),
          title: partial.title,
          body: partial.body,
          enabled: partial.enabled ?? true,
        }
        return { ...prev, fixedPrompts: [...prev.fixedPrompts, next] }
      })
    },
    [],
  )

  const deleteFixedPrompt = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      fixedPrompts: prev.fixedPrompts.filter((f) => f.id !== id),
    }))
  }, [])

  const toggleFixedPrompt = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      fixedPrompts: prev.fixedPrompts.map((f) =>
        f.id === id ? { ...f, enabled: !f.enabled } : f,
      ),
    }))
  }, [])

  const appendAiMessages = useCallback((msgs: AiMessage[]) => {
    setState((prev) => ({
      ...prev,
      aiHistory: [...prev.aiHistory, ...msgs].slice(-80),
    }))
  }, [])

  const clearAiHistory = useCallback(() => {
    setState((prev) => ({ ...prev, aiHistory: [] }))
  }, [])

  return {
    ...state,
    upsertTask,
    deleteTask,
    moveTask,
    upsertEvent,
    deleteEvent,
    upsertPrompt,
    deletePrompt,
    toggleFavorite,
    updateAiSettings,
    upsertFixedPrompt,
    deleteFixedPrompt,
    toggleFixedPrompt,
    appendAiMessages,
    clearAiHistory,
    resetDemo,
  }
}
