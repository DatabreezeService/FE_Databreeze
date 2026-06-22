import type { ReactNode } from 'react'
import {
  Bell,
  CreditCard,
  DownloadSimple,
  House,
  Lightbulb,
  List,
  Receipt,
  ShoppingBag,
  Storefront,
  Tag,
  UploadSimple,
  WarningCircle,
  X,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import {
  expenses,
  insights,
  kpis,
  mappingRows,
  missingCosts,
  profitSeries,
  stores,
  topSkus,
  uploads,
} from '../data/sampleData'
import { Button, EmptyState, Field, MetricCard, Panel, StatusBadge, StepIndicator } from '../components/ui'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: House },
  { path: '/uploads', label: 'Uploads', icon: UploadSimple },
  { path: '/stores', label: 'Stores', icon: Storefront },
  { path: '/costs', label: 'Product Costs', icon: Tag },
  { path: '/expenses', label: 'Expenses', icon: Receipt },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
  { path: '/usage', label: 'Plan & Usage', icon: CreditCard },
]

export function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="app-main">
        <Topbar onMenu={() => setMobileNavOpen(true)} />
        <main className="page-frame">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/uploads" element={<UploadsPage />} />
            <Route path="/uploads/mapping" element={<MappingPage />} />
            <Route path="/uploads/validation" element={<ValidationPage />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/costs" element={<CostsPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/usage" element={<UsagePage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  return (
    <>
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup">
          <img src="/brand/databreeze-mark-dark.png" alt="DataBreeze" />
          <div>
            <strong>DataBreeze</strong>
            <span>Profit workspace</span>
          </div>
          <button className="icon-button sidebar-close" type="button" onClick={onClose} aria-label="Close navigation">
            <X size={18} weight="bold" />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink className="nav-link" to={item.path} key={item.path} onClick={onClose}>
                <Icon size={19} weight="duotone" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <span>Current plan</span>
          <strong>Growth</strong>
          <div className="usage-bar">
            <span style={{ width: '62%' }} />
          </div>
          <small>62% row quota used</small>
        </div>
      </aside>
      {mobileOpen ? <button className="mobile-scrim" type="button" aria-label="Close navigation" onClick={onClose} /> : null}
    </>
  )
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="topbar">
      <button className="icon-button topbar-menu" type="button" onClick={onMenu} aria-label="Open navigation">
        <List size={20} weight="bold" />
      </button>
      <div className="workspace-switcher">
        <span>Workspace</span>
        <strong>Maison Commerce</strong>
      </div>
      <div className="topbar-actions">
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={18} weight="duotone" />
        </button>
        <Button variant="primary">Tai file moi</Button>
        <div className="user-chip" aria-label="Current user">
          MQ
        </div>
      </div>
    </header>
  )
}

function PageHeader({
  title,
  body,
  action,
}: {
  title: string
  body: string
  action?: ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
      {action}
    </div>
  )
}

function Filters() {
  return (
    <div className="filter-row" aria-label="Dashboard filters">
      <Field label="Store" value="All stores" />
      <Field label="Date range" value="Last 30 days" />
      <Field label="Source" value="All sources" />
    </div>
  )
}

function DashboardPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Bang dieu khien loi nhuan"
        body="Theo doi doanh thu, chi phi, loi nhuan va chat luong du lieu theo tung shop."
        action={<Button>Tai file moi</Button>}
      />
      <Filters />
      <div className="metrics-grid">
        {kpis.map((kpi) => (
          <MetricCard key={kpi.label} {...kpi} />
        ))}
      </div>
      <div className="dashboard-grid">
        <Panel title="Loi nhuan theo ngay" className="span-2">
          <ProfitChart />
        </Panel>
        <Panel title="Can xu ly" action={<StatusBadge tone="warn">3 viec</StatusBadge>}>
          <div className="action-list">
            {insights.slice(0, 3).map((insight) => (
              <div className="action-item" key={insight.title}>
                <WarningCircle size={19} weight="duotone" />
                <div>
                  <strong>{insight.title}</strong>
                  <span>{insight.summary}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="SKU co loi nhuan cao" className="span-2">
          <SkuTable />
        </Panel>
        <Panel title="Chat luong du lieu">
          <div className="quality-score">
            <strong>86%</strong>
            <span>Du lieu du tot de xem dashboard. Hay them gia von cho 3 SKU de tinh loi nhuan chinh xac hon.</span>
          </div>
        </Panel>
      </div>
    </div>
  )
}

function ProfitChart() {
  const max = Math.max(...profitSeries)
  const points = profitSeries
    .map((value, index) => {
      const x = (index / (profitSeries.length - 1)) * 100
      const y = 100 - (value / max) * 86
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="chart-wrap">
      <svg viewBox="0 0 100 100" role="img" aria-label="Profit trend line chart">
        <polyline className="chart-grid" points="0,80 100,80" />
        <polyline className="chart-grid" points="0,55 100,55" />
        <polyline className="chart-grid" points="0,30 100,30" />
        <polyline className="chart-line" points={points} />
      </svg>
      <div className="chart-caption">
        <span>7 thg 5</span>
        <span>Hom nay</span>
      </div>
    </div>
  )
}

function SkuTable() {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>San pham</th>
            <th>Doanh thu</th>
            <th>Loi nhuan</th>
            <th>Bien</th>
            <th>Trang thai</th>
          </tr>
        </thead>
        <tbody>
          {topSkus.map((sku) => (
            <tr key={sku.sku}>
              <td>{sku.sku}</td>
              <td>{sku.name}</td>
              <td>{sku.revenue}</td>
              <td>{sku.profit}</td>
              <td>{sku.margin}</td>
              <td>
                <StatusBadge tone={sku.status === 'Healthy' ? 'good' : sku.status === 'Missing cost' ? 'warn' : 'danger'}>
                  {sku.status}
                </StatusBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function UploadsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Tai len va xu ly"
        body="Theo doi file, mapping, validation va import job cua tung shop."
        action={<Button>Tai file moi</Button>}
      />
      <div className="upload-layout">
        <Panel title="Upload history" className="span-2">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>File</th>
                  <th>Store</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Rows</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr key={upload.file}>
                    <td>{upload.file}</td>
                    <td>{upload.store}</td>
                    <td>{upload.source}</td>
                    <td>
                      <StatusBadge tone={statusTone(upload.status)}>{statusLabel(upload.status)}</StatusBadge>
                    </td>
                    <td>{upload.rows}</td>
                    <td>{upload.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Next upload">
          <div className="drop-zone">
            <DownloadSimple size={26} weight="duotone" />
            <strong>Keo tha file Excel/CSV vao day</strong>
            <span>Ho tro .xlsx, .xls va .csv tu Shopee, TikTok Shop, ads va chi phi.</span>
            <Button variant="secondary">Chon file</Button>
          </div>
        </Panel>
      </div>
      <EmptyState
        title="Mapping la noi DataBreeze tao niem tin."
        body="Sau khi upload, nguoi dung can thay cot goc, gia tri mau, truong dich va canh bao bat buoc mot cach ro rang."
        action={<Button variant="secondary">Mo mapping mau</Button>}
      />
    </div>
  )
}

function MappingPage() {
  const [saveTemplate, setSaveTemplate] = useState(true)

  return (
    <div className="page-stack mapping-page">
      <PageHeader
        title="Map cot file Shopee"
        body="File shopee_orders_may.xlsx cho shop Maison Sai Gon. Kiem tra cac cot bat buoc truoc khi validation."
        action={<Button>Tiep tuc kiem tra du lieu</Button>}
      />
      <StepIndicator active={1} />
      <div className="mapping-layout">
        <Panel title="Cot duoc phat hien" className="span-2">
          <div className="mapping-table">
            {mappingRows.map((row) => (
              <div className="mapping-row" key={row.source}>
                <div>
                  <strong>{row.source}</strong>
                  <span>Vi du: {row.example || 'Khong co gia tri mau'}</span>
                </div>
                <div>
                  <span>{row.group}</span>
                  <select value={row.target} onChange={() => undefined} aria-label={`Target field for ${row.source}`}>
                    <option>{row.target}</option>
                    <option>Not mapped</option>
                    <option>Order ID</option>
                    <option>SKU</option>
                    <option>Gross revenue</option>
                  </select>
                </div>
                <StatusBadge tone={row.confidence === 'High' ? 'good' : row.confidence === 'Missing' ? 'warn' : 'info'}>
                  {row.confidence}
                </StatusBadge>
                {row.required ? <span className="required-mark">Bat buoc</span> : <span />}
              </div>
            ))}
          </div>
          <div className="mapping-footer">
            <label className="checkbox-row">
              <input checked={saveTemplate} type="checkbox" onChange={(event) => setSaveTemplate(event.target.checked)} />
              Luu mapping nay cho file cung loai sau nay
            </label>
            <div className="mapping-actions">
              <Button variant="secondary">Quay lai</Button>
              <Button>Tiep tuc kiem tra du lieu</Button>
            </div>
          </div>
        </Panel>
        <Panel title="Truong DataBreeze">
          <div className="field-groups">
            {['Order basics', 'Revenue and fees', 'Product and SKU', 'Costs'].map((group) => (
              <div key={group}>
                <strong>{group}</strong>
                <span>{group === 'Costs' ? 'Gia von co the bo sung sau neu file khong co.' : 'Dung de tinh dashboard va insight.'}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}

function ValidationPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Kiem tra du lieu"
        body="DataBreeze se import cac dong hop le va tao file loi cho nhung dong can sua."
        action={<Button>Dong y va cap nhat dashboard</Button>}
      />
      <StepIndicator active={2} />
      <div className="metrics-grid four">
        <MetricCard label="Tong dong" value="4,218" delta="File Shopee" tone="neutral" />
        <MetricCard label="Hop le" value="3,842" delta="91.1%" tone="good" />
        <MetricCard label="Canh bao" value="312" delta="Thieu gia von" tone="warn" />
        <MetricCard label="Loi" value="64" delta="Khong import" tone="danger" />
      </div>
      <Panel title="Canh bao can xem">
        <div className="warning-list">
          {['369 dong ban hang thieu gia von', '64 dong thieu SKU', '18 don co ngay khong hop le'].map((warning) => (
            <div key={warning}>
              <WarningCircle size={18} weight="duotone" />
              <span>{warning}</span>
              <Button variant="ghost">Xem dong</Button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function StoresPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Shop" body="Quan ly shop va trang thai du lieu trong workspace hien tai." action={<Button>Them shop</Button>} />
      <div className="list-grid">
        {stores.map((store) => (
          <Panel key={store.name}>
            <div className="store-row">
              <div className="store-icon">
                <ShoppingBag size={22} weight="duotone" />
              </div>
              <div>
                <strong>{store.name}</strong>
                <span>{store.platform}</span>
              </div>
              <StatusBadge tone={store.status === 'Active' ? 'good' : 'warn'}>{store.status}</StatusBadge>
            </div>
            <dl className="compact-facts">
              <div>
                <dt>Last import</dt>
                <dd>{store.lastImport}</dd>
              </div>
              <div>
                <dt>Revenue</dt>
                <dd>{store.revenue}</dd>
              </div>
            </dl>
          </Panel>
        ))}
      </div>
    </div>
  )
}

function CostsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Product Costs"
        body="Gia von quyet dinh loi nhuan co dang tin hay khong. Xu ly SKU thieu cost truoc."
        action={<Button>Them gia von</Button>}
      />
      <Panel title="SKU thieu gia von">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>San pham</th>
                <th>Don hang</th>
                <th>Doanh thu anh huong</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {missingCosts.map((cost) => (
                <tr key={cost.sku}>
                  <td>{cost.sku}</td>
                  <td>{cost.product}</td>
                  <td>{cost.orders}</td>
                  <td>{cost.affected}</td>
                  <td>
                    <Button variant="secondary">Them cost</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}

function ExpensesPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Expenses"
        body="Ghi nhan chi phi van hanh de tinh loi nhuan rong theo ngay va theo shop."
        action={<Button>Them chi phi</Button>}
      />
      <Panel title="Chi phi gan day">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Store</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.description}>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>{expense.store}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}

function InsightsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Insights"
        body="Canh bao kinh doanh duoc gan voi so lieu va hanh dong tiep theo."
        action={<Button>Generate insight</Button>}
      />
      <div className="insight-list">
        {insights.map((insight) => (
          <Panel key={insight.title}>
            <div className="insight-row">
              <StatusBadge tone={insight.severity === 'High' ? 'danger' : insight.severity === 'Medium' ? 'warn' : 'info'}>
                {insight.severity}
              </StatusBadge>
              <div>
                <strong>{insight.title}</strong>
                <span>{insight.summary}</span>
              </div>
              <Button variant="secondary">{insight.action}</Button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  )
}

function UsagePage() {
  return (
    <div className="page-stack">
      <PageHeader title="Plan & Usage" body="Theo doi gioi han truoc khi upload bi chan." action={<Button>Upgrade</Button>} />
      <div className="usage-grid">
        {[
          ['Uploads', '42 / 80', '52%'],
          ['Rows processed', '318k / 500k', '64%'],
          ['Stores', '3 / 5', '60%'],
          ['Insight runs', '18 / 40', '45%'],
        ].map(([label, value, percent]) => (
          <Panel key={label}>
            <div className="usage-card">
              <span>{label}</span>
              <strong>{value}</strong>
              <div className="usage-bar">
                <span style={{ width: percent }} />
              </div>
              <small>{percent} used</small>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  )
}

function statusTone(status: string) {
  if (status === 'completed') return 'good'
  if (status === 'warning' || status === 'mapping' || status === 'validating') return 'warn'
  if (status === 'failed') return 'danger'
  return 'info'
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    mapping: 'Waiting for mapping',
    validating: 'Validating',
    running: 'Running',
    completed: 'Completed',
    warning: 'Warning',
    failed: 'Failed',
  }
  return labels[status] ?? status
}
