export type TaskStatus = 'todo' | 'doing' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string | null
  tags: string[]
  assignee: string
  createdAt: string
  updatedAt: string
}

export interface ScheduleEvent {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  color: string
  taskId: string | null
}

export interface PromptTemplate {
  id: string
  title: string
  category: string
  body: string
  variables: string[]
  favorite: boolean
  updatedAt: string
}

/** Always-on instruction prepended to every AI call */
export interface FixedPrompt {
  id: string
  title: string
  body: string
  enabled: boolean
}

export interface AiSettings {
  apiKey: string
  baseUrl: string
  model: string
  /** Master system prompt always applied */
  systemPrompt: string
  /** Use offline demo responder when no API key */
  useDemoWhenNoKey: boolean
}

export interface AiMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: string
  promptTitle?: string
}

export type ViewId = 'home' | 'tasks' | 'schedule' | 'prompts' | 'ai' | 'settings'

export interface AppState {
  tasks: Task[]
  events: ScheduleEvent[]
  prompts: PromptTemplate[]
  fixedPrompts: FixedPrompt[]
  aiSettings: AiSettings
  aiHistory: AiMessage[]
}

export interface AuthState {
  displayName: string
  /** SHA-256 hex of password */
  passwordHash: string
  createdAt: string
}
