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

export type ViewId = 'home' | 'tasks' | 'schedule' | 'prompts'

export interface AppState {
  tasks: Task[]
  events: ScheduleEvent[]
  prompts: PromptTemplate[]
}
