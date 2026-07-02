import type { ComponentType, CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChartLineUp,
  CheckCircle,
  ClipboardText,
  FileArrowUp,
  Gauge,
  ListChecks,
  ShieldCheck,
  Storefront,
  Tag,
  WarningCircle,
} from '@phosphor-icons/react'
import { StatusBadge } from '../components/ui'
import { initialMappingRows, initialMissingCosts, initialUploads, kpis, profitSeries, topSkus } from '../data/sampleData'

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
type LandingIcon = ComponentType<{ size?: number; weight?: IconWeight; className?: string }>
type WorkflowId = 'upload' | 'map' | 'validate' | 'decide'

const workflowSteps: Array<{
  id: WorkflowId
  label: string
  eyebrow: string
  title: string
  body: string
  metric: string
  icon: LandingIcon
}> = [
  {
    id: 'upload',
    label: 'Upload',
    eyebrow: 'Marketplace exports',
    title: 'Bring every sales, ads, and expense file into one workspace.',
    body: 'Shopee, TikTok Shop, ad spend, and operating expenses stay visible from the moment they enter the system.',
    metric: '4.2k rows staged',
    icon: FileArrowUp,
  },
  {
    id: 'map',
    label: 'Map',
    eyebrow: 'Column confidence',
    title: 'Turn messy column names into a reusable seller model.',
    body: 'DataBreeze shows what matched, what needs review, and which fields affect profit before anything hits the dashboard.',
    metric: '6 fields matched',
    icon: ClipboardText,
  },
  {
    id: 'validate',
    label: 'Validate',
    eyebrow: 'Import trust',
    title: 'Catch missing costs, skipped rows, and broken files early.',
    body: 'Validation is treated as part of the product experience, so decisions are made from known data quality instead of hope.',
    metric: '86% quality score',
    icon: ShieldCheck,
  },
  {
    id: 'decide',
    label: 'Decide',
    eyebrow: 'Profit action',
    title: 'Move from clean data to the next business decision.',
    body: 'See true profit by SKU, shop, campaign, and date range, then resolve the exact issue that is holding the number back.',
    metric: '3 actions surfaced',
    icon: Gauge,
  },
]

const proofPoints = [
  {
    title: 'Mapping stays explainable',
    body: 'Every imported column has a target, confidence level, and example value before the dashboard changes.',
    icon: ClipboardText,
  },
  {
    title: 'Profit uses the boring details',
    body: 'Costs, marketplace fees, ads, expenses, and missing inputs sit in the same operating loop.',
    icon: Tag,
  },
  {
    title: 'Built for repeat work',
    body: 'A solo seller can start simple, while the structure leaves room for more shops, roles, and audit history.',
    icon: Storefront,
  },
] satisfies Array<{ title: string; body: string; icon: LandingIcon }>

const heroStats = [
  { value: '86%', label: 'data quality before decisions' },
  { value: '4', label: 'sources in the profit loop' },
  { value: '3', label: 'fixes surfaced from imports' },
]

const importSources = ['Shopee orders', 'TikTok Shop', 'Google Ads', 'Expense sheet']

export function LandingPage() {
  const [activeStepId, setActiveStepId] = useState<WorkflowId>('upload')
  const activeStep = workflowSteps.find((step) => step.id === activeStepId) ?? workflowSteps[0]
  const ActiveIcon = activeStep.icon

  return (
    <div className="landing-page">
      <header className="landing-hero" id="top">
        <nav className="landing-nav" aria-label="Landing navigation">
          <a className="landing-brand" href="#top" aria-label="DataBreeze home">
            <img src="/brand/databreeze-mark-dark.png" alt="" />
            <span>DataBreeze</span>
          </a>
          <div className="landing-nav-links">
            <a href="#workflow">Workflow</a>
            <a href="#product">Product</a>
            <a href="#proof">Proof</a>
          </div>
          <Link className="landing-nav-cta" to="/dashboard">
            Open app
            <ArrowRight size={15} weight="bold" />
          </Link>
        </nav>

        <HeroDataVisual />

        <div className="landing-hero-content">
          <p className="landing-eyebrow">Vietnamese-first profit workspace</p>
          <h1>DataBreeze</h1>
          <p className="landing-hero-line">Messy files. Trusted profit.</p>
          <p className="landing-hero-copy">
            Upload marketplace exports, map the weird columns, validate every row, and see true profit by SKU, shop,
            campaign, and date without building another spreadsheet around the spreadsheet.
          </p>
          <div className="landing-hero-actions">
            <Link className="landing-button landing-button-primary" to="/dashboard">
              Open dashboard
              <ArrowRight size={17} weight="bold" />
            </Link>
            <a className="landing-button landing-button-secondary" href="#workflow">
              See workflow
            </a>
          </div>
        </div>

        <div className="landing-hero-strip" aria-label="DataBreeze highlights">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </header>

      <main>
        <section className="landing-process" id="workflow" aria-labelledby="workflow-title">
          <div className="landing-section-heading">
            <p className="landing-eyebrow">Workflow</p>
            <h2 id="workflow-title">A clear path from raw files to business action.</h2>
            <p>
              DataBreeze keeps every step visible: imports, practical mapping, validation before confidence, and
              dashboard numbers that point to the next fix.
            </p>
          </div>

          <div className="workflow-layout">
            <div className="workflow-rail" role="tablist" aria-label="DataBreeze workflow">
              {workflowSteps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = step.id === activeStepId
                return (
                  <button
                    className={`workflow-step ${isActive ? 'workflow-step-active' : ''}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="workflow-detail"
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <StepIcon size={20} weight="duotone" />
                    <strong>{step.label}</strong>
                  </button>
                )
              })}
            </div>

            <article className="workflow-detail" id="workflow-detail" aria-live="polite">
              <div className="workflow-detail-icon">
                <ActiveIcon size={28} weight="duotone" />
              </div>
              <p>{activeStep.eyebrow}</p>
              <h3>{activeStep.title}</h3>
              <span>{activeStep.body}</span>
              <strong>{activeStep.metric}</strong>
            </article>
          </div>
        </section>

        <section className="landing-product" id="product" aria-labelledby="product-title">
          <div className="landing-section-heading">
            <p className="landing-eyebrow">Product surface</p>
            <h2 id="product-title">Profit clarity from the same surface sellers use every week.</h2>
            <p>
              Uploads, mapping, validation, costs, and profit review stay connected, so the public promise matches the
              working product.
            </p>
          </div>
          <ProductProof />
        </section>

        <section className="landing-proof" id="proof" aria-labelledby="proof-title">
          <div className="landing-section-heading">
            <p className="landing-eyebrow">Why it feels trustworthy</p>
            <h2 id="proof-title">Built around the moments where sellers usually lose confidence.</h2>
          </div>
          <div className="proof-list">
            {proofPoints.map((point) => {
              const PointIcon = point.icon
              return (
                <article className="proof-item" key={point.title}>
                  <PointIcon size={24} weight="duotone" />
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="landing-final">
        <img src="/brand/databreeze-mark-dark.png" alt="" />
        <div>
          <p className="landing-eyebrow">Ready for the working surface</p>
          <h2>Turn the next export into a profit decision.</h2>
        </div>
        <Link className="landing-button landing-button-primary" to="/dashboard">
          Open dashboard
          <ArrowRight size={17} weight="bold" />
        </Link>
      </footer>
    </div>
  )
}

function HeroDataVisual() {
  return (
    <div className="hero-data-visual" aria-hidden="true">
      <div className="hero-file-stack">
        {importSources.map((source, index) => (
          <span style={{ '--delay': `${index * 120}ms` } as CSSProperties} key={source}>
            {source}
          </span>
        ))}
      </div>

      <div className="hero-flow-line">
        <i />
        <i />
        <i />
      </div>

      <div className="hero-dashboard-slice">
        <div className="hero-slice-header">
          <span>Profit workspace</span>
          <StatusBadge tone="good">validated</StatusBadge>
        </div>
        <div className="hero-slice-metrics">
          {kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
        <MiniProfitChart />
      </div>
    </div>
  )
}

function ProductProof() {
  const latestUpload = initialUploads[0]
  const missingCost = initialMissingCosts[0]
  const highProfitSku = topSkus[0]

  return (
    <div className="product-proof-shell">
      <div className="product-proof-topline">
        <div>
          <span>Product workflow</span>
          <strong>Dashboard after a clean import</strong>
        </div>
        <StatusBadge tone="info">sample workspace</StatusBadge>
      </div>

      <div className="product-proof-grid">
        <section className="proof-dashboard-pane">
          <div className="proof-pane-heading">
            <div>
              <span>Total profit</span>
              <strong>{kpis[2].value}</strong>
            </div>
            <StatusBadge tone="good">{kpis[2].delta}</StatusBadge>
          </div>
          <MiniProfitChart />
          <div className="proof-sku-row">
            <div>
              <span>Top SKU</span>
              <strong>{highProfitSku.sku}</strong>
            </div>
            <div>
              <span>Margin</span>
              <strong>{highProfitSku.margin}</strong>
            </div>
            <div>
              <span>Profit</span>
              <strong>{highProfitSku.profit}</strong>
            </div>
          </div>
        </section>

        <section className="proof-import-pane">
          <div className="proof-pane-heading compact">
            <FileArrowUp size={22} weight="duotone" />
            <div>
              <span>Latest import</span>
              <strong>{latestUpload.file}</strong>
            </div>
          </div>
          <div className="proof-import-meta">
            <span>{latestUpload.source}</span>
            <span>{latestUpload.rows} rows</span>
            <StatusBadge tone="warn">mapping</StatusBadge>
          </div>
          <div className="mapping-preview-list">
            {initialMappingRows.slice(0, 4).map((row) => (
              <div className="mapping-preview-row" key={row.source}>
                <span>{row.source || 'Empty field'}</span>
                <strong>{row.target}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="proof-action-pane">
          <WarningCircle size={24} weight="duotone" />
          <div>
            <span>Next fix</span>
            <strong>{missingCost.sku}</strong>
            <p>{missingCost.orders} orders need unit cost before net profit is trusted.</p>
          </div>
          <Link to="/costs">
            Resolve costs
            <ArrowRight size={15} weight="bold" />
          </Link>
        </section>
      </div>
    </div>
  )
}

function MiniProfitChart() {
  const points = useMemo(() => {
    const max = Math.max(...profitSeries)
    const min = Math.min(...profitSeries)
    const range = Math.max(max - min, 1)

    return profitSeries
      .map((value, index) => {
        const x = 10 + (index / (profitSeries.length - 1)) * 340
        const y = 102 - ((value - min) / range) * 78
        return `${x},${y}`
      })
      .join(' ')
  }, [])

  return (
    <svg className="mini-profit-chart" viewBox="0 0 360 120" role="img" aria-label="Profit trend moving upward">
      <polyline className="mini-grid" points="10,96 350,96" />
      <polyline className="mini-grid" points="10,62 350,62" />
      <polyline className="mini-grid" points="10,28 350,28" />
      <polyline className="mini-line" points={points} />
      {points.split(' ').map((point, index) => {
        const [cx, cy] = point.split(',')
        return <circle className="mini-dot" cx={cx} cy={cy} r={index === profitSeries.length - 1 ? 4.2 : 2.4} key={point} />
      })}
    </svg>
  )
}
