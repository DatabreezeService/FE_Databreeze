export type Tone = 'neutral' | 'good' | 'warn' | 'danger' | 'info'

export type UploadStatus = 'mapping' | 'validating' | 'running' | 'completed' | 'warning' | 'failed'

export type UploadRecord = {
  file: string
  store: string
  source: string
  status: UploadStatus
  rows: string
  time: string
}

export type MappingRow = {
  source: string
  example: string
  target: string
  group: string
  confidence: 'Cao' | 'Trung bình' | 'Thiếu'
  required: boolean
}

export type CostItem = {
  sku: string
  product: string
  orders: number
  affected: string
  unitCost: string
}

export type ExpenseItem = {
  category: string
  description: string
  store: string
  amount: string
  date: string
}

export const storeOptions = ['Tất cả shop', 'Maison Sài Gòn', 'Breeze Beauty', 'Home Kit VN']
export const dateRangeOptions = ['7 ngày qua', '30 ngày qua', 'Tháng này', 'Quý này']
export const sourceOptions = ['Tất cả nguồn', 'Shopee', 'TikTok Shop', 'Google Ads', 'Chi phí']

export const kpis: Array<{ label: string; value: string; delta: string; tone: Tone }> = [
  { label: 'Doanh thu', value: '186,4M', delta: '+12,8%', tone: 'good' },
  { label: 'Lợi nhuận gộp', value: '54,2M', delta: '+8,1%', tone: 'good' },
  { label: 'Lợi nhuận ròng', value: '37,8M', delta: '+4,4%', tone: 'good' },
  { label: 'Biên lợi nhuận', value: '20,3%', delta: '-1,6%', tone: 'warn' },
  { label: 'Đơn hàng', value: '2.418', delta: '+194', tone: 'neutral' },
]

export type ProfitTrendPoint = {
  label: string
  profit: number
  revenue: number
}

export const profitTrendData: ProfitTrendPoint[] = [
  { label: '7 thg 5', profit: 18, revenue: 62 },
  { label: '10 thg 5', profit: 24, revenue: 70 },
  { label: '13 thg 5', profit: 21, revenue: 68 },
  { label: '16 thg 5', profit: 32, revenue: 82 },
  { label: '19 thg 5', profit: 28, revenue: 76 },
  { label: '22 thg 5', profit: 37, revenue: 92 },
  { label: '25 thg 5', profit: 42, revenue: 104 },
  { label: '28 thg 5', profit: 39, revenue: 98 },
  { label: '31 thg 5', profit: 48, revenue: 116 },
  { label: '3 thg 6', profit: 44, revenue: 108 },
  { label: '6 thg 6', profit: 52, revenue: 126 },
  { label: 'Hôm nay', profit: 58, revenue: 138 },
]

export const formatProfitValue = (value: number) => `${value}M`

export const topSkus = [
  { sku: 'DB-TEE-001', name: 'Áo thun basic', revenue: '31,2M', profit: '9,8M', margin: '31,4%', status: 'Khỏe' },
  { sku: 'SKN-BOX-09', name: 'Combo chăm sóc da', revenue: '26,7M', profit: '7,4M', margin: '27,7%', status: 'Thiếu giá vốn' },
  { sku: 'BAG-MINI-18', name: 'Túi đeo chéo mini', revenue: '19,1M', profit: '3,2M', margin: '16,8%', status: 'Biên thấp' },
  { sku: 'KIT-HOME-22', name: 'Bộ dụng cụ nhà bếp', revenue: '15,6M', profit: '5,1M', margin: '32,7%', status: 'Khỏe' },
]

export const initialUploads: UploadRecord[] = [
  {
    file: 'shopee_orders_may.xlsx',
    store: 'Maison Sài Gòn',
    source: 'Shopee',
    status: 'mapping',
    rows: '4.218',
    time: '12 phút trước',
  },
  {
    file: 'tiktok_shop_week_21.csv',
    store: 'Breeze Beauty',
    source: 'TikTok Shop',
    status: 'warning',
    rows: '1.840',
    time: 'Hôm qua',
  },
  {
    file: 'ads_google_q2.csv',
    store: 'Tất cả shop',
    source: 'Google Ads',
    status: 'completed',
    rows: '940',
    time: '29 thg 5',
  },
  {
    file: 'expense_may.xlsx',
    store: 'Maison Sài Gòn',
    source: 'Chi phí',
    status: 'completed',
    rows: '64',
    time: '28 thg 5',
  },
]

export const mappingTargets = [
  'Không map',
  'Mã đơn hàng',
  'SKU',
  'Doanh thu gộp',
  'Phí sàn',
  'Ngày tạo đơn',
  'Giá vốn',
  'Tên sản phẩm',
  'Số lượng',
]

export const initialMappingRows: MappingRow[] = [
  {
    source: 'Mã đơn hàng',
    example: '250522QF14MA9',
    target: 'Mã đơn hàng',
    group: 'Thông tin đơn',
    confidence: 'Cao',
    required: true,
  },
  {
    source: 'SKU phân loại hàng',
    example: 'DB-TEE-001-BLACK-M',
    target: 'SKU',
    group: 'Sản phẩm và SKU',
    confidence: 'Cao',
    required: true,
  },
  {
    source: 'Tổng tiền hàng',
    example: '349000',
    target: 'Doanh thu gộp',
    group: 'Doanh thu và phí',
    confidence: 'Trung bình',
    required: true,
  },
  {
    source: 'Phí dịch vụ',
    example: '18400',
    target: 'Phí sàn',
    group: 'Doanh thu và phí',
    confidence: 'Trung bình',
    required: false,
  },
  {
    source: 'Ngày tạo đơn',
    example: '2026-05-29 14:32',
    target: 'Ngày tạo đơn',
    group: 'Thông tin đơn',
    confidence: 'Cao',
    required: true,
  },
  {
    source: 'Giá vốn',
    example: '',
    target: 'Không map',
    group: 'Giá vốn',
    confidence: 'Thiếu',
    required: false,
  },
]

export const stores = [
  { name: 'Maison Sài Gòn', platform: 'Shopee', status: 'Đang hoạt động', lastImport: '12 phút trước', revenue: '94,1M' },
  { name: 'Breeze Beauty', platform: 'TikTok Shop', status: 'Cần giá vốn', lastImport: 'Hôm qua', revenue: '61,8M' },
  { name: 'Home Kit VN', platform: 'Shopee', status: 'Đang hoạt động', lastImport: '29 thg 5', revenue: '30,5M' },
]

export const initialMissingCosts: CostItem[] = [
  { sku: 'SKN-BOX-09', product: 'Combo chăm sóc da', orders: 214, affected: '26,7M', unitCost: '' },
  { sku: 'BAG-MINI-18', product: 'Túi đeo chéo mini', orders: 91, affected: '19,1M', unitCost: '' },
  { sku: 'ACC-CABLE-04', product: 'Cáp sạc nhanh', orders: 64, affected: '8,4M', unitCost: '' },
]

export const initialExpenses: ExpenseItem[] = [
  { category: 'Quảng cáo', description: 'Google Ads tháng 5', store: 'Tất cả shop', amount: '8,2M', date: '31 thg 5' },
  { category: 'Vận hành', description: 'Kho và đóng gói', store: 'Maison Sài Gòn', amount: '4,6M', date: '29 thg 5' },
  { category: 'Công cụ', description: 'Công cụ vận hành', store: 'Tất cả shop', amount: '1,2M', date: '25 thg 5' },
]

export const insights = [
  {
    severity: 'Cao',
    title: 'SKU có doanh thu nhưng đang lỗ',
    summary: 'BAG-MINI-18 có biên lợi nhuận 16,8% sau phí sàn và khuyến mãi.',
    action: 'Kiểm tra giá vốn',
  },
  {
    severity: 'Vừa',
    title: 'Một số dòng bán hàng thiếu giá vốn',
    summary: '369 đơn hàng bị ảnh hưởng bởi SKU chưa có giá vốn.',
    action: 'Thêm giá vốn',
  },
  {
    severity: 'Thấp',
    title: 'Doanh thu Shopee tăng trong 7 ngày',
    summary: 'Maison Sài Gòn tăng 12,8% so với kỳ trước.',
    action: 'Xem chi tiết',
  },
]
