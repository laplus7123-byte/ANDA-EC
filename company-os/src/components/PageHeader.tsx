import type { ReactNode } from 'react'

interface Props {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

export function PageHeader({ title, description, actions, children }: Props) {
  return (
    <div className="page-enter">
      <header className="page-header">
        <div>
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? <div className="header-actions">{actions}</div> : null}
      </header>
      {children}
    </div>
  )
}
