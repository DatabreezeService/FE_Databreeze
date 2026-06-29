import { ArrowRight, CheckCircle, FileArrowUp, Gauge, SealCheck, WarningCircle } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const boardRows = [
  ['Shopee', 'orders_thang_06.xlsx', 'Sẵn sàng'],
  ['TikTok Shop', 'doanh_thu.csv', 'Cần map cột'],
  ['Ads', 'chi_phi.xlsx', 'Có cảnh báo'],
]

const qualityCards = [
  {
    title: 'File vào có kiểm tra',
    body: 'DataBreeze đọc cấu trúc file, nhận diện cột thiếu và giữ lại lịch sử import.',
    icon: FileArrowUp,
  },
  {
    title: 'Giá vốn không bị đoán',
    body: 'SKU thiếu cost được tách riêng để seller bổ sung trước khi xem lợi nhuận.',
    icon: WarningCircle,
  },
  {
    title: 'Dashboard có dấu vết',
    body: 'Mỗi con số đều đi kèm trạng thái dữ liệu để biết nên tin, sửa hay chờ.',
    icon: SealCheck,
  },
]

const workflow = [
  ['Tải file', 'Nhận file marketplace, ads, chi phí và bảng giá vốn từ nhiều nguồn.'],
  ['Map cột', 'Ghép cột trong file thật với trường dữ liệu DataBreeze cần để tính toán.'],
  ['Kiểm tra', 'Chặn lỗi nghiêm trọng, ghi nhận cảnh báo và tạo danh sách SKU thiếu cost.'],
  ['Ra quyết định', 'Cập nhật dashboard lợi nhuận khi dữ liệu đủ điều kiện để dùng.'],
]

const assurance = [
  ['Dòng hợp lệ', 'Đi vào dashboard'],
  ['Dòng cảnh báo', 'Cho xem trước khi chốt'],
  ['Dòng lỗi', 'Tách ra để sửa'],
  ['Thiếu giá vốn', 'Đưa về danh sách SKU'],
]

export function LandingPage() {
  return (
    <div className="db-landing">
      <header className="db-nav" aria-label="DataBreeze landing navigation">
        <Link className="db-brand" to="/" aria-label="DataBreeze landing">
          <img src="/brand/databreeze-wordmark-blue.png" alt="DataBreeze" />
        </Link>
        <nav>
          <a href="#quality">Kiểm tra</a>
          <a href="#workflow">Quy trình</a>
          <a href="#start">Bắt đầu</a>
        </nav>
        <Link className="db-nav-action" to="/dashboard">
          Vào dashboard
        </Link>
      </header>

      <main>
        <section className="db-hero" aria-labelledby="db-title">
          <div className="db-hero-copy">
            <img className="db-hero-logo" src="/brand/databreeze-wordmark-blue.png" alt="DataBreeze" />
            <h1 id="db-title">Lợi nhuận đáng tin.</h1>
            <p>Tải file marketplace, kiểm tra lỗi, bổ sung giá vốn và xem dashboard trước khi ra quyết định.</p>
            <div className="db-actions">
              <Link className="db-button db-button-primary" to="/dashboard">
                Vào dashboard
                <ArrowRight size={18} weight="bold" />
              </Link>
              <a className="db-button db-button-secondary" href="#workflow">
                Xem quy trình
              </a>
            </div>
          </div>

          <div className="db-board" aria-label="DataBreeze product preview">
            <div className="db-board-top">
              <div>
                <span>Workspace</span>
                <strong>Seller Việt</strong>
              </div>
              <img src="/brand/databreeze-mark-dark.png" alt="" />
            </div>

            <div className="db-board-grid">
              <section className="db-panel db-panel-files" aria-label="Nguồn file">
                <div className="db-panel-head">
                  <span>File mới</span>
                  <strong>Đang kiểm tra</strong>
                </div>
                <div className="db-file-list">
                  {boardRows.map(([source, file, state]) => (
                    <div className="db-file-row" key={file}>
                      <span>{source}</span>
                      <strong>{file}</strong>
                      <em>{state}</em>
                    </div>
                  ))}
                </div>
              </section>

              <section className="db-panel db-panel-profit" aria-label="Lợi nhuận">
                <div className="db-panel-head">
                  <span>Lợi nhuận ròng</span>
                  <strong>37,8M</strong>
                </div>
                <div className="db-bars" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="db-warning">
                  <WarningCircle size={17} weight="duotone" />
                  <span>369 SKU thiếu giá vốn</span>
                </div>
              </section>

              <section className="db-panel db-panel-checks" aria-label="Trạng thái dữ liệu">
                {assurance.map(([label, body]) => (
                  <div className="db-check-row" key={label}>
                    <CheckCircle size={17} weight="duotone" />
                    <span>{label}</span>
                    <strong>{body}</strong>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </section>

        <section className="db-proof" aria-label="DataBreeze promise">
          <p>Không làm đẹp dữ liệu bằng cách bỏ qua lỗi. DataBreeze cho seller thấy điều gì đã tin được và điều gì cần xử lý tiếp.</p>
          <div>
            <strong>4 nguồn</strong>
            <span>marketplace, ads, chi phí, giá vốn</span>
          </div>
          <div>
            <strong>1 luồng</strong>
            <span>import, mapping, validation, dashboard</span>
          </div>
        </section>

        <section id="quality" className="db-quality">
          <div className="db-section-copy">
            <span>Kiểm tra trước khi tính</span>
            <h2>Số lợi nhuận chỉ hữu ích khi dữ liệu đủ sạch.</h2>
            <p>DataBreeze giữ quy trình import rõ ràng để người bán không phải đoán file nào đúng, SKU nào thiếu và dashboard nào nên dùng.</p>
          </div>
          <div className="db-quality-grid">
            {qualityCards.map((card) => {
              const Icon = card.icon
              return (
                <article className="db-quality-card" key={card.title}>
                  <Icon size={25} weight="duotone" />
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section id="workflow" className="db-workflow">
          <div className="db-workflow-head">
            <Gauge size={30} weight="duotone" />
            <div>
              <span>Luồng vận hành</span>
              <h2>Từ file thô đến quyết định có căn cứ.</h2>
            </div>
          </div>
          <div className="db-workflow-list">
            {workflow.map(([title, body]) => (
              <article className="db-workflow-item" key={title}>
                <strong>{title}</strong>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="start" className="db-final">
          <div>
            <img src="/brand/databreeze-wordmark-blue.png" alt="DataBreeze" />
            <h2>Mở workspace và xem dữ liệu chạy qua quy trình thật.</h2>
          </div>
          <Link className="db-button db-button-primary" to="/dashboard">
            Vào dashboard
            <ArrowRight size={18} weight="bold" />
          </Link>
        </section>
      </main>
    </div>
  )
}
