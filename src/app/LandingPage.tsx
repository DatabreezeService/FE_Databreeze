import { CaretRight, CheckCircle, ShieldCheck, UploadSimple, WarningCircle } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const proofItems = [
  ['Nhận file thật', 'Shopee, TikTok Shop, ads, chi phí và giá vốn.'],
  ['Tách lỗi trước', 'Dòng hợp lệ, cảnh báo và lỗi chặn được nhìn riêng.'],
  ['Dashboard sau cùng', 'Lợi nhuận cập nhật khi dữ liệu đủ rõ.'],
]

const workflowSteps = [
  {
    title: 'Tải file từ sàn',
    body: 'Seller đưa file xuất từ marketplace vào workspace mà không phải sửa mẫu trước.',
    icon: UploadSimple,
  },
  {
    title: 'Map cột theo dữ liệu thật',
    body: 'DataBreeze hiện cột gốc, giá trị mẫu và trường đích để người bán kiểm tra nhanh.',
    icon: CheckCircle,
  },
  {
    title: 'Kiểm tra lỗi và giá vốn',
    body: 'SKU thiếu cost, ngày sai định dạng và cột bắt buộc được giữ lại trước khi import.',
    icon: WarningCircle,
  },
  {
    title: 'Cập nhật dashboard',
    body: 'Dashboard chỉ nhận những dòng đủ sạch để doanh thu, phí và lợi nhuận đáng tin.',
    icon: ShieldCheck,
  },
]

const validationRows = [
  ['Hợp lệ', 'Cập nhật dashboard', 'Đã qua mapping và kiểm tra định dạng.'],
  ['Cảnh báo', 'Cho xem trước', 'Thiếu giá vốn hoặc dữ liệu cần xác nhận.'],
  ['Lỗi chặn', 'Giữ lại để sửa', 'SKU, ngày hoặc cột bắt buộc không hợp lệ.'],
  ['Thiếu giá vốn', 'Tạo việc cần làm', 'Đưa SKU vào danh sách bổ sung cost.'],
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
          <div className="landing-hero-copy">
            <img className="landing-wordmark" src="/brand/databreeze-wordmark-blue.png" alt="DataBreeze" />
            <h1 id="landing-title">File bán hàng vào dashboard có kiểm tra.</h1>
            <p>DataBreeze kiểm tra file marketplace, chỉ ra lỗi import và cập nhật lợi nhuận khi dữ liệu đủ tin.</p>
            <div className="landing-actions">
              <Link className="landing-button landing-button-primary" to="/dashboard">
                Mở dashboard
                <CaretRight size={17} weight="bold" />
              </Link>
              <a className="landing-button landing-button-secondary" href="#workflow">
                Xem quy trình
              </a>
            </div>
          </div>

          <figure className="landing-product-shot">
            <div className="landing-shot-frame">
              <img src="/landing/databreeze-workspace-preview.png" alt="Dashboard DataBreeze hiển thị lợi nhuận, cảnh báo và bảng SKU" />
            </div>
            <figcaption>Giao diện mẫu trong workspace DataBreeze.</figcaption>
          </figure>
        </section>

        <section className="landing-proof" aria-label="DataBreeze proof points">
          <p>Không cần sửa file theo mẫu trước. DataBreeze đọc, map và tách lỗi để seller biết việc tiếp theo.</p>
          {proofItems.map(([title, body]) => (
            <div key={title}>
              <strong>{title}</strong>
              <span>{body}</span>
            </div>
          ))}
        </section>

        <section id="workflow" className="landing-section">
          <div className="landing-section-copy">
            <h2>Một quy trình import có kiểm soát.</h2>
            <p>Mỗi bước giữ lại dấu vết dữ liệu để người bán biết file nào đã vào, lỗi nào bị chặn và dashboard nào đã cập nhật.</p>
          </div>
          <div className="landing-workflow">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <article className="landing-workflow-item" key={step.title}>
                  <span className="landing-step-index">{index + 1}</span>
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
            <h2>Lợi nhuận chỉ cập nhật khi dữ liệu rõ.</h2>
            <p>Mỗi dòng import có trạng thái riêng nên cảnh báo không bị chôn dưới một con số đẹp.</p>
          </div>
          <div className="landing-validation" aria-label="Bảng trạng thái import">
            {validationRows.map(([label, action, body]) => (
              <div className="landing-validation-row" key={label}>
                <strong>{label}</strong>
                <span>{action}</span>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="start" className="landing-final">
          <div>
            <img src="/brand/databreeze-wordmark-blue.png" alt="DataBreeze" />
            <h2>Bắt đầu bằng một file bán hàng thật.</h2>
            <p>Mở workspace mẫu hoặc vào dashboard để xem luồng dữ liệu vận hành.</p>
          </div>
          <Link className="landing-button landing-button-primary" to="/dashboard">
            Mở dashboard
            <CaretRight size={17} weight="bold" />
          </Link>
        </section>
      </main>
    </div>
  )
}
