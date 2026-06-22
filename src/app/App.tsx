import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import {
  Bell,
  CaretRight,
  CheckCircle,
  CreditCard,
  DownloadSimple,
  House,
  Lightbulb,
  List,
  MagnifyingGlass,
  Receipt,
  ShoppingBag,
  Storefront,
  Tag,
  UploadSimple,
  WarningCircle,
  X,
} from '@phosphor-icons/react'
import { useMemo, useRef, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import {
  dateRangeOptions,
  initialExpenses,
  initialMappingRows,
  initialMissingCosts,
  initialUploads,
  insights,
  kpis,
  mappingTargets,
  profitSeries,
  sourceOptions,
  storeOptions,
  stores,
  topSkus,
  type CostItem,
  type ExpenseItem,
  type MappingRow,
  type Tone,
  type UploadRecord,
  type UploadStatus,
} from '../data/sampleData'
import { Button, EmptyState, MetricCard, Panel, SelectField, StatusBadge, StepIndicator } from '../components/ui'

const navItems = [
  { path: '/dashboard', label: 'Tổng quan', icon: House },
  { path: '/uploads', label: 'Tệp tải lên', icon: UploadSimple },
  { path: '/stores', label: 'Shop', icon: Storefront },
  { path: '/costs', label: 'Giá vốn', icon: Tag },
  { path: '/expenses', label: 'Chi phí', icon: Receipt },
  { path: '/insights', label: 'Gợi ý', icon: Lightbulb },
  { path: '/usage', label: 'Gói & sử dụng', icon: CreditCard },
]

export function App() {
  const navigate = useNavigate()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState(storeOptions[0])
  const [dateRange, setDateRange] = useState(dateRangeOptions[1])
  const [source, setSource] = useState(sourceOptions[0])
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('Dữ liệu mẫu đã sẵn sàng để thao tác.')
  const [uploads, setUploads] = useState<UploadRecord[]>(initialUploads)
  const [mappingRows, setMappingRows] = useState<MappingRow[]>(initialMappingRows)
  const [costItems, setCostItems] = useState<CostItem[]>(initialMissingCosts)
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses)
  const [validationComplete, setValidationComplete] = useState(false)

  const updateLatestUploadStatus = (status: UploadStatus) => {
    setUploads((current) => current.map((upload, index) => (index === 0 ? { ...upload, status, time: 'Vừa xong' } : upload)))
  }

  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="app-main">
        <Topbar
          query={query}
          onQueryChange={setQuery}
          onMenu={() => setMobileNavOpen(true)}
          onUpload={() => navigate('/uploads')}
        />
        <main className="page-frame">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  dateRange={dateRange}
                  notice={notice}
                  query={query}
                  selectedStore={selectedStore}
                  source={source}
                  onDateRangeChange={setDateRange}
                  onSourceChange={setSource}
                  onStoreChange={setSelectedStore}
                  onResolveCosts={() => navigate('/costs')}
                />
              }
            />
            <Route
              path="/uploads"
              element={
                <UploadsPage
                  query={query}
                  selectedStore={selectedStore}
                  source={source}
                  uploads={uploads}
                  onAddUpload={(upload) => setUploads((current) => [upload, ...current])}
                  onNotice={setNotice}
                />
              }
            />
            <Route
              path="/uploads/mapping"
              element={
                <MappingPage
                  rows={mappingRows}
                  onRowsChange={setMappingRows}
                  onContinue={() => {
                    updateLatestUploadStatus('validating')
                    setNotice('Đã lưu mapping. DataBreeze đang kiểm tra dữ liệu trước khi import.')
                    navigate('/uploads/validation')
                  }}
                  onReset={() => setMappingRows(initialMappingRows)}
                />
              }
            />
            <Route
              path="/uploads/validation"
              element={
                <ValidationPage
                  complete={validationComplete}
                  onDownloadErrors={() => setNotice('Đã tạo file lỗi mẫu cho các dòng cần sửa.')}
                  onImport={() => {
                    setValidationComplete(true)
                    updateLatestUploadStatus('completed')
                    setNotice('Dashboard đã được cập nhật từ file Shopee mới nhất.')
                  }}
                />
              }
            />
            <Route path="/stores" element={<StoresPage />} />
            <Route
              path="/costs"
              element={
                <CostsPage
                  items={costItems}
                  onCostChange={(sku, value) =>
                    setCostItems((current) => current.map((item) => (item.sku === sku ? { ...item, unitCost: value } : item)))
                  }
                  onSave={(sku) => {
                    const item = costItems.find((cost) => cost.sku === sku)
                    if (!item?.unitCost.trim()) return
                    setCostItems((current) => current.filter((cost) => cost.sku !== sku))
                    setNotice(`Đã lưu giá vốn cho ${sku}.`)
                  }}
                />
              }
            />
            <Route
              path="/expenses"
              element={
                <ExpensesPage
                  expenses={expenses}
                  onAddExpense={(expense) => {
                    setExpenses((current) => [expense, ...current])
                    setNotice('Đã thêm chi phí mới vào workspace.')
                  }}
                />
              }
            />
            <Route path="/insights" element={<InsightsPage onResolveCosts={() => navigate('/costs')} />} />
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
            <span>Không gian lợi nhuận</span>
          </div>
          <button className="icon-button sidebar-close" type="button" onClick={onClose} aria-label="Đóng điều hướng">
            <X size={18} weight="bold" />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Điều hướng chính">
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
          <span>Gói hiện tại</span>
          <strong>Growth</strong>
          <div className="usage-bar">
            <span style={{ width: '62%' }} />
          </div>
          <small>Đã dùng 62% hạn mức dòng</small>
        </div>
      </aside>
      {mobileOpen ? <button className="mobile-scrim" type="button" aria-label="Đóng điều hướng" onClick={onClose} /> : null}
    </>
  )
}

function Topbar({
  query,
  onQueryChange,
  onMenu,
  onUpload,
}: {
  query: string
  onQueryChange: (value: string) => void
  onMenu: () => void
  onUpload: () => void
}) {
  return (
    <header className="topbar">
      <button className="icon-button topbar-menu" type="button" onClick={onMenu} aria-label="Mở điều hướng">
        <List size={20} weight="bold" />
      </button>
      <div className="workspace-switcher">
        <span>Workspace</span>
        <strong>Maison Commerce</strong>
      </div>
      <label className="command-box">
        <MagnifyingGlass size={17} weight="duotone" />
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Tìm SKU, shop hoặc file" />
      </label>
      <div className="topbar-actions">
        <button className="icon-button" type="button" aria-label="Thông báo">
          <Bell size={18} weight="duotone" />
        </button>
        <Button onClick={onUpload}>Tải file mới</Button>
        <div className="user-chip" aria-label="Người dùng hiện tại">
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

function DashboardPage({
  selectedStore,
  dateRange,
  source,
  query,
  notice,
  onStoreChange,
  onDateRangeChange,
  onSourceChange,
  onResolveCosts,
}: {
  selectedStore: string
  dateRange: string
  source: string
  query: string
  notice: string
  onStoreChange: (value: string) => void
  onDateRangeChange: (value: string) => void
  onSourceChange: (value: string) => void
  onResolveCosts: () => void
}) {
  const visibleSkus = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return topSkus
    return topSkus.filter((sku) => `${sku.sku} ${sku.name} ${sku.status}`.toLowerCase().includes(normalized))
  }, [query])

  return (
    <div className="page-stack">
      <PageHeader
        title="Tổng quan lợi nhuận"
        body="Theo dõi doanh thu, chi phí, lợi nhuận và chất lượng dữ liệu theo từng shop."
        action={<Button onClick={onResolveCosts}>Xử lý giá vốn</Button>}
      />
      <div className="notice-strip">
        <CheckCircle size={18} weight="duotone" />
        <span>{notice}</span>
      </div>
      <div className="filter-row" aria-label="Bộ lọc dashboard">
        <SelectField label="Shop" value={selectedStore} options={storeOptions} onChange={onStoreChange} />
        <SelectField label="Khoảng thời gian" value={dateRange} options={dateRangeOptions} onChange={onDateRangeChange} />
        <SelectField label="Nguồn dữ liệu" value={source} options={sourceOptions} onChange={onSourceChange} />
      </div>
      <div className="metrics-grid">
        {kpis.map((kpi) => (
          <MetricCard key={kpi.label} {...kpi} />
        ))}
      </div>
      <div className="dashboard-grid">
        <Panel title="Lợi nhuận theo ngày" description={`${selectedStore} · ${dateRange} · ${source}`} className="span-2">
          <ProfitChart />
        </Panel>
        <Panel title="Cần xử lý" action={<StatusBadge tone="warn">3 việc</StatusBadge>}>
          <ActionList onResolveCosts={onResolveCosts} />
        </Panel>
        <Panel title="SKU có lợi nhuận cao" className="span-2">
          <SkuTable skus={visibleSkus} />
        </Panel>
        <Panel title="Chất lượng dữ liệu">
          <div className="quality-score">
            <strong>86%</strong>
            <span>Dữ liệu đủ tốt để xem dashboard. Thêm giá vốn cho 3 SKU để lợi nhuận chính xác hơn.</span>
          </div>
        </Panel>
      </div>
    </div>
  )
}

function ActionList({ onResolveCosts }: { onResolveCosts: () => void }) {
  return (
    <div className="action-list">
      {insights.slice(0, 3).map((insight, index) => (
        <button className="action-item" key={insight.title} type="button" onClick={index === 1 ? onResolveCosts : undefined}>
          <WarningCircle size={19} weight="duotone" />
          <div>
            <strong>{insight.title}</strong>
            <span>{insight.summary}</span>
          </div>
          <CaretRight size={16} weight="bold" />
        </button>
      ))}
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
      <svg viewBox="0 0 100 100" role="img" aria-label="Biểu đồ xu hướng lợi nhuận">
        <polyline className="chart-grid" points="0,80 100,80" />
        <polyline className="chart-grid" points="0,55 100,55" />
        <polyline className="chart-grid" points="0,30 100,30" />
        <polyline className="chart-line" points={points} />
      </svg>
      <div className="chart-caption">
        <span>7 thg 5</span>
        <span>Hôm nay</span>
      </div>
    </div>
  )
}

function SkuTable({ skus }: { skus: typeof topSkus }) {
  if (!skus.length) {
    return <EmptyState title="Không tìm thấy SKU" body="Thử tìm bằng mã SKU, tên sản phẩm hoặc trạng thái khác." />
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Sản phẩm</th>
            <th>Doanh thu</th>
            <th>Lợi nhuận</th>
            <th>Biên</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {skus.map((sku) => (
            <tr key={sku.sku}>
              <td>{sku.sku}</td>
              <td>{sku.name}</td>
              <td>{sku.revenue}</td>
              <td>{sku.profit}</td>
              <td>{sku.margin}</td>
              <td>
                <StatusBadge tone={sku.status === 'Khỏe' ? 'good' : sku.status === 'Thiếu giá vốn' ? 'warn' : 'danger'}>
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

function UploadsPage({
  uploads,
  selectedStore,
  source,
  query,
  onAddUpload,
  onNotice,
}: {
  uploads: UploadRecord[]
  selectedStore: string
  source: string
  query: string
  onAddUpload: (upload: UploadRecord) => void
  onNotice: (value: string) => void
}) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const filteredUploads = uploads.filter((upload) => {
    const normalized = query.trim().toLowerCase()
    return !normalized || `${upload.file} ${upload.store} ${upload.source}`.toLowerCase().includes(normalized)
  })

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const nextUpload: UploadRecord = {
      file: file.name,
      store: selectedStore === 'Tất cả shop' ? 'Maison Sài Gòn' : selectedStore,
      source: inferSource(file.name, source),
      status: 'mapping',
      rows: 'Đang đọc',
      time: 'Vừa xong',
    }
    onAddUpload(nextUpload)
    onNotice(`Đã nhận ${file.name}. Hãy kiểm tra mapping trước khi import.`)
    event.target.value = ''
    navigate('/uploads/mapping')
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Tải lên và xử lý"
        body="Theo dõi file, mapping, validation và import job của từng shop."
        action={<Button onClick={() => inputRef.current?.click()}>Tải file mới</Button>}
      />
      <div className="upload-layout">
        <Panel title="Lịch sử tải lên" className="span-2">
          <UploadTable uploads={filteredUploads} />
        </Panel>
        <Panel title="Tải file tiếp theo" description="CSV hoặc Excel từ sàn, quảng cáo và chi phí.">
          <input ref={inputRef} className="visually-hidden" type="file" accept=".csv,.xlsx,.xls" onChange={handleFiles} />
          <button className="drop-zone" type="button" onClick={() => inputRef.current?.click()}>
            <DownloadSimple size={28} weight="duotone" />
            <strong>Kéo thả hoặc chọn file</strong>
            <span>Hỗ trợ .xlsx, .xls và .csv. Sau khi chọn file, DataBreeze sẽ đưa bạn sang bước map cột.</span>
            <span className="drop-zone-action">Chọn file từ máy</span>
          </button>
        </Panel>
      </div>
      <EmptyState
        title="Mapping là nơi DataBreeze tạo niềm tin."
        body="Sau khi upload, bạn sẽ thấy cột gốc, giá trị mẫu, trường đích và cảnh báo bắt buộc trước khi import."
        action={<Button variant="secondary" onClick={() => navigate('/uploads/mapping')}>Mở mapping mẫu</Button>}
      />
    </div>
  )
}

function UploadTable({ uploads }: { uploads: UploadRecord[] }) {
  const navigate = useNavigate()

  if (!uploads.length) {
    return <EmptyState title="Chưa có file phù hợp" body="Xóa ô tìm kiếm hoặc tải file mới để bắt đầu." />
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Shop</th>
            <th>Nguồn</th>
            <th>Trạng thái</th>
            <th>Dòng</th>
            <th>Thời gian</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {uploads.map((upload) => (
            <tr key={`${upload.file}-${upload.time}`}>
              <td>{upload.file}</td>
              <td>{upload.store}</td>
              <td>{upload.source}</td>
              <td>
                <StatusBadge tone={statusTone(upload.status)}>{statusLabel(upload.status)}</StatusBadge>
              </td>
              <td>{upload.rows}</td>
              <td>{upload.time}</td>
              <td>
                <Button
                  variant={upload.status === 'mapping' ? 'primary' : 'secondary'}
                  onClick={() => navigate(upload.status === 'completed' ? '/dashboard' : '/uploads/mapping')}
                >
                  {upload.status === 'completed' ? 'Xem dashboard' : 'Tiếp tục'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MappingPage({
  rows,
  onRowsChange,
  onContinue,
  onReset,
}: {
  rows: MappingRow[]
  onRowsChange: (rows: MappingRow[]) => void
  onContinue: () => void
  onReset: () => void
}) {
  const navigate = useNavigate()
  const [saveTemplate, setSaveTemplate] = useState(true)
  const requiredMissing = rows.filter((row) => row.required && row.target === 'Không map').length
  const mappedRequired = rows.filter((row) => row.required && row.target !== 'Không map').length
  const requiredTotal = rows.filter((row) => row.required).length

  const updateTarget = (source: string, target: string) => {
    onRowsChange(
      rows.map((row) =>
        row.source === source
          ? {
              ...row,
              target,
              confidence: target === 'Không map' ? 'Thiếu' : row.confidence === 'Thiếu' ? 'Trung bình' : row.confidence,
            }
          : row,
      ),
    )
  }

  return (
    <div className="page-stack mapping-page">
      <PageHeader
        title="Map cột file Shopee"
        body="File shopee_orders_may.xlsx cho shop Maison Sài Gòn. Kiểm tra các cột bắt buộc trước khi validation."
        action={<Button disabled={requiredMissing > 0} onClick={onContinue}>Tiếp tục kiểm tra dữ liệu</Button>}
      />
      <StepIndicator active={1} />
      <div className="mapping-layout">
        <Panel title="Cột được phát hiện" description={`${mappedRequired}/${requiredTotal} cột bắt buộc đã sẵn sàng`} className="span-2">
          <div className="mapping-table">
            {rows.map((row) => (
              <div className="mapping-row" key={row.source}>
                <div>
                  <strong>{row.source}</strong>
                  <span>Ví dụ: {row.example || 'Không có giá trị mẫu'}</span>
                </div>
                <div>
                  <span>{row.group}</span>
                  <select value={row.target} onChange={(event) => updateTarget(row.source, event.target.value)} aria-label={`Trường đích cho ${row.source}`}>
                    {mappingTargets.map((target) => (
                      <option key={target}>{target}</option>
                    ))}
                  </select>
                </div>
                <StatusBadge tone={row.confidence === 'Cao' ? 'good' : row.confidence === 'Thiếu' ? 'warn' : 'info'}>
                  {row.confidence}
                </StatusBadge>
                {row.required ? <span className="required-mark">Bắt buộc</span> : <span className="optional-mark">Tùy chọn</span>}
              </div>
            ))}
          </div>
          <div className="mapping-footer">
            <label className="checkbox-row">
              <input checked={saveTemplate} type="checkbox" onChange={(event) => setSaveTemplate(event.target.checked)} />
              Lưu mapping này cho file cùng loại sau này
            </label>
            <div className="mapping-actions">
              <Button variant="secondary" onClick={() => navigate('/uploads')}>Quay lại</Button>
              <Button variant="secondary" onClick={onReset}>Map lại mẫu</Button>
              <Button disabled={requiredMissing > 0} onClick={onContinue}>Kiểm tra dữ liệu</Button>
            </div>
          </div>
        </Panel>
        <Panel title="Trường DataBreeze" description="Những nhóm dữ liệu dùng để tính dashboard.">
          <div className="field-groups">
            {[
              ['Thông tin đơn', 'Mã đơn, ngày tạo, trạng thái và shop.'],
              ['Doanh thu và phí', 'Tính doanh thu gộp, phí sàn và khuyến mãi.'],
              ['Sản phẩm và SKU', 'Gắn lợi nhuận về đúng SKU và biến thể.'],
              ['Giá vốn', 'Có thể bổ sung sau nếu file không có.'],
            ].map(([group, text]) => (
              <div key={group}>
                <strong>{group}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
          {requiredMissing > 0 ? (
            <div className="inline-warning">
              <WarningCircle size={18} weight="duotone" />
              <span>Còn {requiredMissing} cột bắt buộc chưa được map.</span>
            </div>
          ) : (
            <div className="inline-success">
              <CheckCircle size={18} weight="duotone" />
              <span>Các cột bắt buộc đã sẵn sàng để kiểm tra.</span>
            </div>
          )}
        </Panel>
      </div>
    </div>
  )
}

function ValidationPage({
  complete,
  onImport,
  onDownloadErrors,
}: {
  complete: boolean
  onImport: () => void
  onDownloadErrors: () => void
}) {
  return (
    <div className="page-stack">
      <PageHeader
        title="Kiểm tra dữ liệu"
        body="DataBreeze sẽ import các dòng hợp lệ và tạo file lỗi cho những dòng cần sửa."
        action={<Button disabled={complete} onClick={onImport}>{complete ? 'Đã cập nhật dashboard' : 'Đồng ý và cập nhật dashboard'}</Button>}
      />
      <StepIndicator active={complete ? 3 : 2} />
      <div className="metrics-grid four">
        <MetricCard label="Tổng dòng" value="4.218" delta="File Shopee" tone="neutral" />
        <MetricCard label="Hợp lệ" value="3.842" delta="91,1%" tone="good" />
        <MetricCard label="Cảnh báo" value="312" delta="Thiếu giá vốn" tone="warn" />
        <MetricCard label="Lỗi" value="64" delta="Không import" tone="danger" />
      </div>
      {complete ? (
        <div className="notice-strip success">
          <CheckCircle size={18} weight="duotone" />
          <span>Dashboard đã cập nhật. Các dòng lỗi vẫn được giữ lại để bạn tải xuống và sửa sau.</span>
        </div>
      ) : null}
      <Panel title="Cảnh báo cần xem">
        <div className="warning-list">
          {['369 dòng bán hàng thiếu giá vốn', '64 dòng thiếu SKU', '18 đơn có ngày không hợp lệ'].map((warning) => (
            <div key={warning}>
              <WarningCircle size={18} weight="duotone" />
              <span>{warning}</span>
              <Button variant="ghost">Xem dòng</Button>
            </div>
          ))}
        </div>
        <div className="panel-actions">
          <Button variant="secondary" onClick={onDownloadErrors}>Tải file lỗi</Button>
          <Button disabled={complete} onClick={onImport}>{complete ? 'Đã import' : 'Import dòng hợp lệ'}</Button>
        </div>
      </Panel>
    </div>
  )
}

function StoresPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Shop" body="Quản lý shop và trạng thái dữ liệu trong workspace hiện tại." action={<Button>Thêm shop</Button>} />
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
              <StatusBadge tone={store.status === 'Đang hoạt động' ? 'good' : 'warn'}>{store.status}</StatusBadge>
            </div>
            <dl className="compact-facts">
              <div>
                <dt>Lần import gần nhất</dt>
                <dd>{store.lastImport}</dd>
              </div>
              <div>
                <dt>Doanh thu</dt>
                <dd>{store.revenue}</dd>
              </div>
            </dl>
          </Panel>
        ))}
      </div>
    </div>
  )
}

function CostsPage({
  items,
  onCostChange,
  onSave,
}: {
  items: CostItem[]
  onCostChange: (sku: string, value: string) => void
  onSave: (sku: string) => void
}) {
  return (
    <div className="page-stack">
      <PageHeader
        title="Giá vốn sản phẩm"
        body="Giá vốn quyết định lợi nhuận có đáng tin hay không. Xử lý SKU thiếu cost trước."
        action={<Button>Nhập giá vốn hàng loạt</Button>}
      />
      <Panel title="SKU thiếu giá vốn" description={`${items.length} SKU đang ảnh hưởng tới lợi nhuận ròng`}>
        {items.length ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Sản phẩm</th>
                  <th>Đơn hàng</th>
                  <th>Doanh thu ảnh hưởng</th>
                  <th>Giá vốn / đơn</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {items.map((cost) => (
                  <tr key={cost.sku}>
                    <td>{cost.sku}</td>
                    <td>{cost.product}</td>
                    <td>{cost.orders}</td>
                    <td>{cost.affected}</td>
                    <td>
                      <input
                        className="table-input"
                        value={cost.unitCost}
                        inputMode="numeric"
                        onChange={(event) => onCostChange(cost.sku, event.target.value)}
                        placeholder="VD: 92000"
                        aria-label={`Giá vốn cho ${cost.sku}`}
                      />
                    </td>
                    <td>
                      <Button variant="secondary" disabled={!cost.unitCost.trim()} onClick={() => onSave(cost.sku)}>
                        Lưu giá vốn
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="Không còn SKU thiếu giá vốn" body="Dashboard lợi nhuận đã sẵn sàng hơn để ra quyết định." />
        )}
      </Panel>
    </div>
  )
}

function ExpensesPage({ expenses, onAddExpense }: { expenses: ExpenseItem[]; onAddExpense: (expense: ExpenseItem) => void }) {
  const [draft, setDraft] = useState({ category: 'Quảng cáo', description: '', store: 'Tất cả shop', amount: '' })

  const submitExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft.description.trim() || !draft.amount.trim()) return
    onAddExpense({ ...draft, date: 'Hôm nay' })
    setDraft({ category: 'Quảng cáo', description: '', store: 'Tất cả shop', amount: '' })
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Chi phí"
        body="Ghi nhận chi phí vận hành để tính lợi nhuận ròng theo ngày và theo shop."
        action={<Button type="submit" form="expense-form">Thêm chi phí</Button>}
      />
      <div className="expenses-layout">
        <Panel title="Thêm chi phí nhanh">
          <form id="expense-form" className="expense-form" onSubmit={submitExpense}>
            <label>
              <span>Nhóm chi phí</span>
              <select value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}>
                {['Quảng cáo', 'Vận hành', 'Kho vận', 'Công cụ'].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Mô tả</span>
              <input value={draft.description} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} placeholder="VD: Ads TikTok tháng 6" />
            </label>
            <label>
              <span>Shop</span>
              <select value={draft.store} onChange={(event) => setDraft((current) => ({ ...current, store: event.target.value }))}>
                {storeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Số tiền</span>
              <input value={draft.amount} onChange={(event) => setDraft((current) => ({ ...current, amount: event.target.value }))} placeholder="VD: 2,4M" />
            </label>
          </form>
        </Panel>
        <Panel title="Chi phí gần đây" className="span-2">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nhóm</th>
                  <th>Mô tả</th>
                  <th>Shop</th>
                  <th>Số tiền</th>
                  <th>Ngày</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={`${expense.description}-${index}`}>
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
    </div>
  )
}

function InsightsPage({ onResolveCosts }: { onResolveCosts: () => void }) {
  return (
    <div className="page-stack">
      <PageHeader
        title="Gợi ý hành động"
        body="Cảnh báo kinh doanh được gắn với số liệu và hành động tiếp theo."
        action={<Button variant="secondary">Làm mới gợi ý</Button>}
      />
      <div className="insight-list">
        {insights.map((insight) => (
          <Panel key={insight.title}>
            <div className="insight-row">
              <StatusBadge tone={insight.severity === 'Cao' ? 'danger' : insight.severity === 'Vừa' ? 'warn' : 'info'}>
                {insight.severity}
              </StatusBadge>
              <div>
                <strong>{insight.title}</strong>
                <span>{insight.summary}</span>
              </div>
              <Button variant="secondary" onClick={insight.action === 'Thêm giá vốn' ? onResolveCosts : undefined}>
                {insight.action}
              </Button>
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
      <PageHeader title="Gói & sử dụng" body="Theo dõi giới hạn trước khi upload bị chặn." action={<Button>Nâng cấp</Button>} />
      <div className="usage-grid">
        {[
          ['Tệp tải lên', '42 / 80', '52%'],
          ['Dòng đã xử lý', '318k / 500k', '64%'],
          ['Shop', '3 / 5', '60%'],
          ['Lượt tạo gợi ý', '18 / 40', '45%'],
        ].map(([label, value, percent]) => (
          <Panel key={label}>
            <div className="usage-card">
              <span>{label}</span>
              <strong>{value}</strong>
              <div className="usage-bar">
                <span style={{ width: percent }} />
              </div>
              <small>Đã dùng {percent}</small>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  )
}

function statusTone(status: UploadStatus): Tone {
  if (status === 'completed') return 'good'
  if (status === 'warning' || status === 'mapping' || status === 'validating') return 'warn'
  if (status === 'failed') return 'danger'
  return 'info'
}

function statusLabel(status: UploadStatus) {
  const labels: Record<UploadStatus, string> = {
    mapping: 'Đang map cột',
    validating: 'Đang kiểm tra',
    running: 'Đang xử lý',
    completed: 'Hoàn tất',
    warning: 'Cần xem lại',
    failed: 'Thất bại',
  }
  return labels[status]
}

function inferSource(fileName: string, selectedSource: string) {
  const lower = fileName.toLowerCase()
  if (selectedSource !== 'Tất cả nguồn') return selectedSource
  if (lower.includes('tiktok')) return 'TikTok Shop'
  if (lower.includes('ads') || lower.includes('google')) return 'Google Ads'
  if (lower.includes('expense') || lower.includes('chi_phi')) return 'Chi phí'
  return 'Shopee'
}
