import type { ReactNode } from 'react'
import type { Tone } from '../data/sampleData'

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
  loading,
  onClick,
  className = '',
  form,
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  form?: string
}) {
  return (
    <button className={`button button-${variant} ${className}`} type={type} form={form} disabled={disabled || loading} onClick={onClick}>
      {loading ? <span className="button-spinner" aria-hidden="true" /> : null}
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
  description,
  action,
}: {
  children: ReactNode
  className?: string
  title?: string
  description?: string
  action?: ReactNode
}) {
  return (
    <section className={`panel ${className}`}>
      {(title || description || action) && (
        <div className="panel-header">
          <div>
            {title ? <h2>{title}</h2> : null}
            {description ? <p>{description}</p> : null}
          </div>
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
      {action ? <div className="empty-state-action">{action}</div> : null}
    </div>
  )
}

export function StepIndicator({ active }: { active: number }) {
  const steps = ['Tải file', 'Map cột', 'Kiểm tra', 'Hoàn tất']

  return (
    <ol className="step-indicator" aria-label="Tiến trình tải file">
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

export function SelectField({
  label,
  value,
  options,
  onChange,
  helper,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
  helper?: string
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} aria-describedby={helper ? `${label}-helper` : undefined}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {helper ? <small id={`${label}-helper`}>{helper}</small> : null}
    </label>
  )
}
