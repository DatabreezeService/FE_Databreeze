import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, FileArrowUp } from '@phosphor-icons/react'
import { initialMissingCosts, initialUploads, kpis, topSkus } from '../data/sampleData'

const sourceRail = ['Shopee orders', 'TikTok Shop CSV', 'Ad spend', 'Fees', 'Unit costs', 'SKU margin', 'Net profit']

const proofLines = [
  {
    label: 'Rows staged',
    value: initialUploads[0].rows,
    detail: 'before they touch the dashboard',
  },
  {
    label: 'Net profit',
    value: kpis[2].value,
    detail: 'after costs, fees, ads, and expenses',
  },
  {
    label: 'Cost gap',
    value: initialMissingCosts[0].sku,
    detail: `${initialMissingCosts[0].orders} orders waiting for unit cost`,
  },
]

const process = [
  ['01', 'Upload', 'Bring marketplace, ads, and expense exports into one seller workspace.'],
  ['02', 'Map', 'Translate messy seller columns into a repeatable profit model.'],
  ['03', 'Validate', 'Catch missing SKU, cost, fee, and date fields before decisions move.'],
  ['04', 'Decide', 'See the product, shop, and campaign work that changes the margin.'],
]

const productSignals = [
  ['Latest import', initialUploads[0].file],
  ['Top SKU', `${topSkus[0].sku} / ${topSkus[0].margin}`],
  ['Next fix', `${initialMissingCosts[0].sku} cost missing`],
]

export function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-hero" id="top">
        <nav className="landing-nav" aria-label="Landing navigation">
          <a className="landing-brand" href="#top" aria-label="DataBreeze home">
            <img src="/brand/databreeze-mark-dark.png" alt="" />
            <span>DataBreeze</span>
          </a>
          <div className="landing-nav-links">
            <a href="#proof">Proof</a>
            <a href="#flow">Flow</a>
            <a href="#start">Start</a>
          </div>
          <Link className="landing-nav-cta" to="/dashboard">
            Open app
            <ArrowRight size={15} weight="bold" />
          </Link>
        </nav>

        <div className="landing-hero-inner">
          <div className="landing-hero-copy">
            <h1>DataBreeze</h1>
            <p className="landing-hero-statement">Messy exports in. Margin truth out.</p>
            <p className="landing-hero-body">
              A profit workspace for sellers who need marketplace files, ad spend, fees, and product costs to agree
              before they make the next move.
            </p>
            <div className="landing-hero-actions">
              <Link className="landing-button landing-button-primary" to="/dashboard">
                Open dashboard
                <ArrowRight size={17} weight="bold" />
              </Link>
              <a className="landing-button landing-button-secondary" href="#proof">
                See proof
              </a>
            </div>
          </div>

          <div className="landing-hero-visual" aria-hidden="true">
            <img className="landing-hero-mark" src="/brand/databreeze-mark-dark.png" alt="" />
            <div className="landing-product-frame">
              <span>Live product surface</span>
              <img src="/landing/product-surface.png" alt="" />
            </div>
          </div>
        </div>

        <div className="landing-source-rail" aria-label="Data sources and outputs">
          <div>
            {[...sourceRail, ...sourceRail].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="landing-proof" id="proof" aria-labelledby="proof-title">
          <div className="landing-section-label">Proof before polish</div>
          <div className="landing-proof-grid">
            <h2 id="proof-title">The page should sell the feeling of finally trusting the number.</h2>
            <p>
              DataBreeze is not a prettier spreadsheet. It is the operating layer between raw commerce files and the
              decision a seller has to make this week.
            </p>
          </div>
          <div className="landing-proof-lines">
            {proofLines.map((item) => (
              <div className="landing-proof-line" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-product" aria-labelledby="product-title">
          <div className="landing-product-copy">
            <div className="landing-section-label">Inside the product</div>
            <h2 id="product-title">A working surface, not a wall of marketing cards.</h2>
            <p>
              The dashboard carries the story: uploaded files, unresolved costs, real margins, and the next action in
              the same place.
            </p>
          </div>
          <div className="landing-product-shot">
            <img src="/landing/product-surface.png" alt="DataBreeze dashboard showing seller profit, file status, and action items" />
          </div>
          <div className="landing-product-signals" aria-label="Product signals">
            {productSignals.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-flow" id="flow" aria-labelledby="flow-title">
          <div className="landing-section-label">The operating flow</div>
          <h2 id="flow-title">Four moves. One profit trail.</h2>
          <div className="landing-flow-list">
            {process.map(([number, title, body]) => (
              <article className="landing-flow-item" key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-close" id="start" aria-labelledby="start-title">
          <div>
            <div className="landing-section-label">Ready when the next export lands</div>
            <h2 id="start-title">Stop guessing where the margin went.</h2>
          </div>
          <Link className="landing-button landing-button-primary" to="/dashboard">
            Open dashboard
            <ArrowRight size={17} weight="bold" />
          </Link>
          <div className="landing-close-proof" aria-label="Workspace status">
            <CheckCircle size={22} weight="duotone" />
            <span>Dashboard, uploads, mapping, costs, and insights stay behind `/dashboard`.</span>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <a className="landing-brand" href="#top" aria-label="DataBreeze home">
          <img src="/brand/databreeze-mark-dark.png" alt="" />
          <span>DataBreeze</span>
        </a>
        <Link to="/dashboard">
          Open app
          <FileArrowUp size={16} weight="duotone" />
        </Link>
      </footer>
    </div>
  )
}
