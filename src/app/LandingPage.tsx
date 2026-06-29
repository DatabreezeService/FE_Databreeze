import { CaretRight, CheckCircle, UploadSimple, WarningCircle } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const incomingFiles = [
  ['Shopee', 'orders_thang_06.xlsx', '4.218 dòng'],
  ['TikTok Shop', 'tiktok_doanh_thu.csv', '1.906 dòng'],
  ['Ads', 'chi_phi_quang_cao.xlsx', '12 chiến dịch'],
]

const processSteps = ['Map cột', 'Kiểm tra lỗi', 'Bổ sung giá vốn']

const workflowSteps = [
  {
    title: 'Tải file thật',
    body: 'Nhận file Shopee, TikTok Shop, quảng cáo và chi phí mà không bắt seller sửa mẫu trước.',
    icon: UploadSimple,
  },
  {
    title: 'Thấy dữ liệu đang thiếu gì',
    body: 'Cột bắt buộc, giá trị mẫu, lỗi ngày tháng và SKU thiếu cost đều được đưa ra trước khi import.',
    icon: WarningCircle,
  },
  {
    title: 'Chốt dashboard đủ tin',
    body: 'Doanh thu, phí, giá vốn và lợi nhuận được cập nhật khi dữ liệu đã qua mapping và validation.',
    icon: CheckCircle,
  },
]

const trustLanes = [
  ['3.842', 'dòng hợp lệ', 'Sẵn sàng cập nhật dashboard'],
  ['312', 'cảnh báo', 'Cho phép import nhưng vẫn cần xem'],
  ['64', 'dòng lỗi', 'Giữ lại để tải xuống và sửa'],
  ['369', 'thiếu giá vốn', 'Tạo danh sách hành động theo SKU'],
]

export function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-nav" aria-label="DataBreeze landing navigation">
        <Link className="landing-brand" to="/" aria-label="DataBreeze landing">
          <img src="/brand/databreeze-wordmark-blue.png" alt="DataBreeze" />
        </Link>
        <nav>
          <a href="#workflow">Quy trình</a>
          <a href="#trust">Độ tin cậy</a>
          <a href="#start">Bắt đầu</a>
        </nav>
        <Link className="landing-nav-cta" to="/dashboard">
          Mở dashboard
        </Link>
      </header>

      <main>
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero-backdrop" aria-hidden="true">
            <img className="landing-bg-mark" src="/brand/databreeze-mark-dark.png" alt="" />
            <span className="landing-bg-lane landing-bg-lane-one" />
            <span className="landing-bg-lane landing-bg-lane-two" />
            <span className="landing-bg-lane landing-bg-lane-three" />
            <span className="landing-bg-token landing-bg-token-one">Shopee CSV</span>
            <span className="landing-bg-token landing-bg-token-two">Thiếu giá vốn</span>
            <span className="landing-bg-token landing-bg-token-three">Lợi nhuận sẵn sàng</span>
          </div>

          <div className="landing-hero-copy">
            <img className="landing-wordmark" src="/brand/databreeze-wordmark-blue.png" alt="DataBreeze" />
            <h1 id="landing-title">Lợi nhuận rõ ràng từ những file bán hàng lộn xộn.</h1>
            <p>
              DataBreeze giúp seller Việt đưa file marketplace vào một quy trình có kiểm tra, có cảnh báo và có dashboard lợi nhuận đủ tin để ra quyết định.
            </p>
            <div className="landing-actions">
              <Link className="landing-button landing-button-primary" to="/dashboard">
                Vào dashboard
                <CaretRight size={17} weight="bold" />
              </Link>
              <a className="landing-button landing-button-secondary" href="#workflow">
                Xem quy trình
              </a>
            </div>
          </div>

          <div className="landing-flow-stage" aria-hidden="true">
            <div className="landing-file-stack">
              {incomingFiles.map(([source, name, rows]) => (
                <div className="landing-file-chip" key={name}>
                  <span>{source}</span>
                  <strong>{name}</strong>
                  <small>{rows}</small>
                </div>
              ))}
            </div>

            <div className="landing-flow-core">
              <div className="landing-core-head">
                <img src="/brand/databreeze-mark-dark.png" alt="" />
                <div>
                  <span>DataBreeze import</span>
                  <strong>Đang làm sạch dữ liệu</strong>
                </div>
              </div>
              <div className="landing-core-line">
                <span />
              </div>
              <div className="landing-core-steps">
                {processSteps.map((step) => (
                  <div key={step}>
                    <CheckCircle size={17} weight="duotone" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="landing-profit-board">
              <div className="landing-profit-topline">
                <span>Lợi nhuận ròng</span>
                <strong>37,8M</strong>
              </div>
              <div className="landing-profit-chart">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="landing-profit-alert">
                <WarningCircle size={17} weight="duotone" />
                <span>369 SKU cần bổ sung giá vốn</span>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-proof" aria-label="DataBreeze proof points">
          <p>Không chỉ gom file vào một chỗ. DataBreeze cho seller biết số nào đáng tin, số nào cần sửa và việc nào nên làm tiếp theo.</p>
          <div>
            <strong>86%</strong>
            <span>độ sẵn sàng dữ liệu</span>
          </div>
          <div>
            <strong>4 nguồn</strong>
            <span>bán hàng, ads, chi phí, giá vốn</span>
          </div>
        </section>

        <section id="workflow" className="landing-section">
          <div className="landing-section-copy">
            <span>Quy trình vận hành</span>
            <h2>Từ file thô đến quyết định có căn cứ.</h2>
            <p>Mỗi bước giữ lại dấu vết dữ liệu: file nào đã vào, lỗi nào bị chặn và dashboard nào đã được cập nhật.</p>
          </div>
          <div className="landing-workflow">
            {workflowSteps.map((step) => {
              const Icon = step.icon
              return (
                <article className="landing-workflow-item" key={step.title}>
                  <Icon size={24} weight="duotone" />
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="trust" className="landing-trust">
          <div className="landing-trust-copy">
            <span>Dữ liệu trước, quyết định sau</span>
            <h2>Không giấu lỗi import dưới một con số đẹp.</h2>
            <p>
              Seller không cần biết ETL hay SQL. Họ cần biết file nào đã vào, dòng nào bị chặn, SKU nào thiếu cost và dashboard nào đủ tin để hành động.
            </p>
          </div>
          <div className="landing-trust-lanes">
            {trustLanes.map(([value, label, body]) => (
              <div className="landing-trust-row" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="start" className="landing-final">
          <div>
            <img src="/brand/databreeze-wordmark-blue.png" alt="DataBreeze" />
            <h2>Mở thử workspace và xem luồng dữ liệu chạy thật.</h2>
          </div>
          <Link className="landing-button landing-button-primary" to="/dashboard">
            Mở sản phẩm
            <CaretRight size={17} weight="bold" />
          </Link>
        </section>
      </main>
    </div>
  )
}
