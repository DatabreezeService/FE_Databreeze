import type { ReactNode } from 'react'

type Tone = 'neutral' | 'good' | 'warn' | 'danger' | 'info'

const toneClass: Record<Tone, string> = {
  neutral: 'tone-neutral',
  good: 'tone-good',
  warn: 'tone-warn',
  danger: 'tone-danger',
  info: 'tone-info',
}

export function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled,
  onClick,
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button className={`button button-${variant}`} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export function StatusBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return <span className={`status-badge ${toneClass[tone]}`}>{children}</span>
}

export function Panel({
  children,
  className = '',
  title,
  action,
}: {
  children: ReactNode
  className?: string
  title?: string
  action?: ReactNode
}) {
  return (
    <section className={`panel ${className}`}>
      {(title || action) && (
        <div className="panel-header">
          {title ? <h2>{title}</h2> : <span />}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function MetricCard({
  label,
  value,
  delta,
  tone,
}: {
  label: string
  value: string
  delta: string
  tone: Tone
}) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <StatusBadge tone={tone}>{delta}</StatusBadge>
    </div>
  )
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string
  body: string
  action?: ReactNode
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-mark" aria-hidden="true">
        <img src="/brand/databreeze-mark-dark.png" alt="" />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      {action}
    </div>
  )
}

export function StepIndicator({ active }: { active: number }) {
  const steps = ['Upload', 'Map cot', 'Kiem tra', 'Hoan tat']

  return (
    <ol className="step-indicator" aria-label="Upload progress">
      {steps.map((step, index) => {
        const state = index < active ? 'done' : index === active ? 'active' : 'idle'
        return (
          <li className={`step step-${state}`} key={step}>
            <span>{index + 1}</span>
            {step}
          </li>
        )
      })}
    </ol>
  )
}

export function Field({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper?: string
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} readOnly aria-describedby={helper ? `${label}-helper` : undefined} />
      {helper ? <small id={`${label}-helper`}>{helper}</small> : null}
    </label>
  )
}
