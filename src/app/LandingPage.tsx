import type { ComponentType } from 'react'
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
} from '@phosphor-icons/react'
import { initialMappingRows, initialMissingCosts, initialUploads, kpis, profitSeries, topSkus } from '../data/sampleData'

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
type LandingIcon = ComponentType<{ size?: number; weight?: IconWeight; className?: string }>

const sources = ['Shopee', 'TikTok Shop', 'Google Ads', 'Costs']

const principles: Array<{ title: string; body: string; icon: LandingIcon }> = [
  {
    title: 'Imports stay honest',
    body: 'Sales, ads, fees, and expenses land with visible row counts, source names, and review states before they affect profit.',
    icon: FileArrowUp,
  },
  {
    title: 'Mapping has receipts',
    body: 'Every column keeps its original label, a target field, and confidence, so cleanup is visible instead of magical.',
    icon: ClipboardText,
  },
  {
    title: 'Profit points to work',
    body: 'The dashboard ends with the exact SKU, cost gap, or margin issue that needs the next decision.',
    icon: Gauge,
  },
]

const workflow = [
  {
    label: 'Upload',
    title: 'Bring the week in',
    body: 'Marketplace exports, ad spend, and expense sheets are staged together with source context intact.',
    icon: FileArrowUp,
  },
  {
    label: 'Map',
    title: 'Translate the messy columns',
    body: 'DataBreeze turns seller-specific field names into a reusable model without hiding what changed.',
    icon: ClipboardText,
  },
  {
    label: 'Validate',
    title: 'Find the gaps before the chart',
    body: 'Missing SKU, cost, date, and fee problems are flagged while the file is still fixable.',
    icon: ShieldCheck,
  },
  {
    label: 'Decide',
    title: 'Move from number to action',
    body: 'Profit is shown by SKU, shop, campaign, and date range with the next fix close by.',
    icon: ChartLineUp,
  },
] satisfies Array<{ label: string; title: string; body: string; icon: LandingIcon }>

const productMoments = [
  {
    title: 'Latest file',
    value: 'Shopee orders',
    detail: `${initialUploads[0].file} - ${initialUploads[0].rows} rows waiting for mapping`,
    tone: 'blue',
  },
  {
    title: 'Missing cost',
    value: initialMissingCosts[0].sku,
    detail: `${initialMissingCosts[0].orders} orders blocked from trusted net profit`,
    tone: 'amber',
  },
  {
    title: 'Top SKU',
    value: topSkus[0].sku,
    detail: `${topSkus[0].profit} profit at ${topSkus[0].margin} margin`,
    tone: 'teal',
  },
]

export function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-hero" id="top">
        <img className="landing-hero-art" src="/landing/hero-desk.png" alt="" />
        <div className="landing-hero-shade" />

        <nav className="landing-nav" aria-label="Landing navigation">
          <a className="landing-brand" href="#top" aria-label="DataBreeze home">
            <img src="/brand/databreeze-mark-dark.png" alt="" />
            <span>DataBreeze</span>
          </a>
          <div className="landing-nav-links">
            <a href="#workflow">Flow</a>
            <a href="#product">Product</a>
            <a href="#decision">Decision</a>
          </div>
          <Link className="landing-nav-cta" to="/dashboard">
            Open app
            <ArrowRight size={15} weight="bold" />
          </Link>
        </nav>

        <div className="landing-hero-content">
          <div className="landing-hero-mark">
            <img src="/brand/databreeze-mark-dark.png" alt="" />
          </div>
          <h1>DataBreeze</h1>
          <p className="landing-hero-line">Messy files. Real profit decisions.</p>
          <p className="landing-hero-copy">
            A profit workspace for sellers who need marketplace exports, ad spend, costs, and SKU decisions to line up
            before the next campaign burns budget.
          </p>
          <div className="landing-hero-actions">
            <Link className="landing-button landing-button-primary" to="/dashboard">
              Open dashboard
              <ArrowRight size={17} weight="bold" />
            </Link>
            <a className="landing-button landing-button-ghost" href="#workflow">
              See the flow
            </a>
          </div>
        </div>

        <div className="landing-hero-sources" aria-label="Connected commerce sources">
          {sources.map((source) => (
            <span key={source}>{source}</span>
          ))}
        </div>
      </header>

      <main>
        <section className="landing-belief" aria-labelledby="belief-title">
          <div className="landing-section-kicker">Built from the product inward</div>
          <div className="landing-belief-grid">
            <h2 id="belief-title">The landing page should feel like the relief of finally trusting the spreadsheet.</h2>
            <p>
              The product is not promising a magic dashboard. It is promising a clean operating path from raw commerce
              files to the next profitable move.
            </p>
          </div>
          <div className="landing-principles">
            {principles.map((item) => {
              const Icon = item.icon
              return (
                <article className="landing-principle" key={item.title}>
                  <Icon size={24} weight="duotone" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="landing-workflow" id="workflow" aria-labelledby="workflow-title">
          <div className="landing-workflow-media">
            <img src="/landing/workflow-strip.png" alt="" />
          </div>
          <div className="landing-workflow-copy">
            <div className="landing-section-kicker">Four moves, one system</div>
            <h2 id="workflow-title">Raw exports become a decision trail.</h2>
            <div className="landing-workflow-list">
              {workflow.map((step, index) => {
                const Icon = step.icon
                return (
                  <article className="landing-flow-step" key={step.label}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <Icon size={24} weight="duotone" />
                    <div>
                      <strong>{step.label}</strong>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="landing-product" id="product" aria-labelledby="product-title">
          <div className="landing-product-heading">
            <div>
              <div className="landing-section-kicker">Product proof</div>
              <h2 id="product-title">The surface sellers return to after every export.</h2>
            </div>
            <p>
              The page borrows from the working app: file status, mapping confidence, missing costs, and SKU profit all
              stay in one operational story.
            </p>
          </div>

          <div className="landing-product-stage">
            <section className="landing-profit-board" aria-label="Profit dashboard preview">
              <div className="landing-board-top">
                <div>
                  <span>Maison Commerce</span>
                  <strong>{kpis[2].value}</strong>
                  <small>net profit this period</small>
                </div>
                <CheckCircle size={28} weight="duotone" />
              </div>
              <ProfitSparkline />
              <div className="landing-board-table">
                {topSkus.slice(0, 3).map((sku) => (
                  <div key={sku.sku}>
                    <span>{sku.sku}</span>
                    <strong>{sku.profit}</strong>
                    <small>{sku.margin}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="landing-map-board" aria-label="Mapping preview">
              <div className="landing-map-header">
                <ListChecks size={24} weight="duotone" />
                <div>
                  <span>Column mapping</span>
                  <strong>{initialUploads[0].file}</strong>
                </div>
              </div>
              <div className="landing-map-rows">
                {initialMappingRows.slice(0, 5).map((row) => (
                  <div key={row.source}>
                    <span>{row.source}</span>
                    <strong>{row.target}</strong>
                    <small>{row.confidence}</small>
                  </div>
                ))}
              </div>
            </section>

            <aside className="landing-action-stack" aria-label="Product moments">
              {productMoments.map((moment) => (
                <div className={`landing-action-note tone-${moment.tone}`} key={moment.title}>
                  <span>{moment.title}</span>
                  <strong>{moment.value}</strong>
                  <p>{moment.detail}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="landing-decision" id="decision" aria-labelledby="decision-title">
          <img src="/landing/decision-scene.png" alt="" />
          <div className="landing-decision-copy">
            <div className="landing-section-kicker">Decision ready</div>
            <h2 id="decision-title">The best dashboard is the one that tells you what to fix next.</h2>
            <p>
              DataBreeze keeps the accounting details, marketplace mess, and SKU decisions close enough that profit can
              become a weekly habit.
            </p>
            <Link className="landing-button landing-button-primary" to="/dashboard">
              Open dashboard
              <ArrowRight size={17} weight="bold" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <a className="landing-brand" href="#top" aria-label="DataBreeze home">
          <img src="/brand/databreeze-mark-dark.png" alt="" />
          <span>DataBreeze</span>
        </a>
        <div className="landing-footer-links">
          <a href="#workflow">Flow</a>
          <a href="#product">Product</a>
          <Link to="/dashboard">Open app</Link>
        </div>
      </footer>
    </div>
  )
}

function ProfitSparkline() {
  const max = Math.max(...profitSeries)
  const min = Math.min(...profitSeries)
  const range = Math.max(max - min, 1)
  const points = profitSeries
    .map((value, index) => {
      const x = 14 + (index / (profitSeries.length - 1)) * 332
      const y = 112 - ((value - min) / range) * 84
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg className="landing-sparkline" viewBox="0 0 360 136" role="img" aria-label="Profit trend moving upward">
      <polyline className="landing-spark-grid" points="14,108 346,108" />
      <polyline className="landing-spark-grid" points="14,70 346,70" />
      <polyline className="landing-spark-grid" points="14,32 346,32" />
      <polyline className="landing-spark-line" points={points} />
      {points.split(' ').map((point, index) => {
        const [cx, cy] = point.split(',')
        return <circle className="landing-spark-dot" cx={cx} cy={cy} r={index === profitSeries.length - 1 ? 4.4 : 2.5} key={point} />
      })}
    </svg>
  )
}
