import { CheckCircle, Lightbulb, Tag, UploadSimple, WarningCircle } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const workflowSteps = [
  {
    title: 'Tải file',
    body: 'Nhận file Shopee, TikTok Shop, quảng cáo và chi phí mà không cần sửa mẫu trước.',
    icon: UploadSimple,
  },
  {
    title: 'Map cột',
    body: 'DataBreeze gợi ý trường đích, hiển thị cột bắt buộc và giá trị mẫu để bạn kiểm tra.',
    icon: CheckCircle,
  },
  {
    title: 'Bổ sung giá vốn',
    body: 'Những SKU thiếu cost được gom lại thành một danh sách hành động rõ ràng.',
    icon: Tag,
  },
  {
    title: 'Xem lợi nhuận',
    body: 'Dashboard cập nhật doanh thu, phí, lợi nhuận và cảnh báo theo từng shop.',
    icon: Lightbulb,
  },
]

const proofRows = [
  ['4.218', 'dòng Shopee được kiểm tra trước khi import'],
  ['369', 'đơn hàng thiếu giá vốn được phát hiện'],
  ['86%', 'độ sẵn sàng dữ liệu cho dashboard lợi nhuận'],
]

export function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-nav" aria-label="DataBreeze landing navigation">
        <Link className="landing-brand" to="/" aria-label="DataBreeze landing">
          <img src="/brand/databreeze-mark-dark.png" alt="" />
          <span>DataBreeze</span>
        </Link>
        <nav>
          <a href="#workflow">Quy trình</a>
          <a href="#trust">Dữ liệu</a>
          <a href="#start">Bắt đầu</a>
        </nav>
        <Link className="landing-nav-cta" to="/dashboard">
          Mở dashboard
        </Link>
      </header>

      <main>
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero-scene" aria-hidden="true">
            <div className="landing-preview-window">
              <div className="landing-preview-bar">
                <img src="/brand/databreeze-wordmark-blue.png" alt="" />
                <span>Maison Commerce</span>
              </div>
              <div className="landing-preview-grid">
                <div className="landing-preview-main">
                  <span>Lợi nhuận ròng</span>
                  <strong>37,8M</strong>
                  <div className="landing-chart">
                    <i style={{ height: '34%' }} />
                    <i style={{ height: '48%' }} />
                    <i style={{ height: '42%' }} />
                    <i style={{ height: '63%' }} />
                    <i style={{ height: '58%' }} />
                    <i style={{ height: '78%' }} />
                    <i style={{ height: '86%' }} />
                  </div>
                </div>
                <div className="landing-preview-side">
                  <span>Cần xử lý</span>
                  <strong>3 việc</strong>
                  <p>SKU thiếu giá vốn, biên thấp và dòng lỗi import.</p>
                </div>
              </div>
              <div className="landing-signal-list">
                <div className="landing-signal-row">
                  <CheckCircle size={18} weight="duotone" />
                  <span>4/4 cột bắt buộc đã map</span>
                </div>
                <div className="landing-signal-row">
                  <WarningCircle size={18} weight="duotone" />
                  <span>369 dòng cần bổ sung giá vốn</span>
                </div>
              </div>
            </div>
          </div>

          <div className="landing-hero-copy">
            <img className="landing-wordmark" src="/brand/databreeze-wordmark-blue.png" alt="DataBreeze" />
            <h1 id="landing-title">Biến file bán hàng thành lợi nhuận rõ ràng.</h1>
            <p>
              DataBreeze giúp seller Việt tải file marketplace, map cột, kiểm tra lỗi, bổ sung giá vốn và xem lợi nhuận theo shop trong một workspace dễ tin.
            </p>
            <div className="landing-actions">
              <Link className="landing-button landing-button-primary" to="/dashboard">
                Vào dashboard
              </Link>
              <a className="landing-button landing-button-secondary" href="#workflow">
                Xem quy trình
              </a>
            </div>
          </div>
        </section>

        <section className="landing-proof" aria-label="DataBreeze proof points">
          {proofRows.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section id="workflow" className="landing-section">
          <div className="landing-section-copy">
            <span>Quy trình vận hành</span>
            <h2>Từ file thô đến dashboard có thể tin.</h2>
            <p>Mỗi bước cho người bán thấy dữ liệu đang ở đâu, thiếu gì và hành động tiếp theo là gì.</p>
          </div>
          <div className="landing-workflow">
            {workflowSteps.map((step) => {
              const Icon = step.icon
              return (
                <div className="landing-workflow-item" key={step.title}>
                  <Icon size={22} weight="duotone" />
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section id="trust" className="landing-detail">
          <div>
            <span>Dữ liệu trước, quyết định sau</span>
            <h2>Không giấu lỗi import dưới một con số đẹp.</h2>
          </div>
          <div className="landing-detail-list">
            <p>DataBreeze tách rõ dòng hợp lệ, cảnh báo, lỗi bị bỏ qua và SKU thiếu giá vốn trước khi dashboard được cập nhật.</p>
            <p>Seller không cần biết ETL hay SQL. Họ chỉ cần biết file nào đã vào, dòng nào cần sửa và lợi nhuận nào đủ tin để hành động.</p>
          </div>
        </section>

        <section id="start" className="landing-final">
          <div>
            <h2>Sẵn sàng thử workspace DataBreeze?</h2>
            <p>Mở dashboard mẫu, xem workflow upload và tiếp tục từ đó.</p>
          </div>
          <Link className="landing-button landing-button-primary" to="/dashboard">
            Mở sản phẩm
          </Link>
        </section>
      </main>
    </div>
  )
}
