export type UploadStatus = 'mapping' | 'validating' | 'running' | 'completed' | 'warning' | 'failed'

export type NavItemId =
  | 'dashboard'
  | 'uploads'
  | 'stores'
  | 'costs'
  | 'expenses'
  | 'insights'
  | 'usage'

export const kpis = [
  { label: 'Doanh thu', value: '186.4M', delta: '+12.8%', tone: 'good' },
  { label: 'Loi nhuan gop', value: '54.2M', delta: '+8.1%', tone: 'good' },
  { label: 'Loi nhuan rong', value: '37.8M', delta: '+4.4%', tone: 'good' },
  { label: 'Bien loi nhuan', value: '20.3%', delta: '-1.6%', tone: 'warn' },
  { label: 'Don hang', value: '2,418', delta: '+194', tone: 'neutral' },
] as const

export const profitSeries = [18, 24, 21, 32, 28, 37, 42, 39, 48, 44, 52, 58]

export const topSkus = [
  { sku: 'DB-TEE-001', name: 'Ao thun basic', revenue: '31.2M', profit: '9.8M', margin: '31.4%', status: 'Healthy' },
  { sku: 'SKN-BOX-09', name: 'Combo cham soc da', revenue: '26.7M', profit: '7.4M', margin: '27.7%', status: 'Missing cost' },
  { sku: 'BAG-MINI-18', name: 'Tui deo cheo mini', revenue: '19.1M', profit: '3.2M', margin: '16.8%', status: 'Low margin' },
  { sku: 'KIT-HOME-22', name: 'Bo dung cu nha bep', revenue: '15.6M', profit: '5.1M', margin: '32.7%', status: 'Healthy' },
]

export const uploads: Array<{
  file: string
  store: string
  source: string
  status: UploadStatus
  rows: string
  time: string
}> = [
  {
    file: 'shopee_orders_may.xlsx',
    store: 'Maison Sai Gon',
    source: 'Shopee',
    status: 'mapping',
    rows: '4,218',
    time: '12 phut truoc',
  },
  {
    file: 'tiktok_shop_week_21.csv',
    store: 'Breeze Beauty',
    source: 'TikTok Shop',
    status: 'warning',
    rows: '1,840',
    time: 'Hom qua',
  },
  {
    file: 'ads_google_q2.csv',
    store: 'All stores',
    source: 'Google Ads',
    status: 'completed',
    rows: '940',
    time: '29 thg 5',
  },
  {
    file: 'expense_may.xlsx',
    store: 'Maison Sai Gon',
    source: 'Expenses',
    status: 'completed',
    rows: '64',
    time: '28 thg 5',
  },
]

export const mappingRows = [
  {
    source: 'Ma don hang',
    example: '250522QF14MA9',
    target: 'Order ID',
    group: 'Order basics',
    confidence: 'High',
    required: true,
  },
  {
    source: 'SKU phan loai hang',
    example: 'DB-TEE-001-BLACK-M',
    target: 'SKU',
    group: 'Product and SKU',
    confidence: 'High',
    required: true,
  },
  {
    source: 'Tong tien hang',
    example: '349000',
    target: 'Gross revenue',
    group: 'Revenue and fees',
    confidence: 'Medium',
    required: true,
  },
  {
    source: 'Phi dich vu',
    example: '18400',
    target: 'Marketplace fee',
    group: 'Revenue and fees',
    confidence: 'Medium',
    required: false,
  },
  {
    source: 'Ngay tao don',
    example: '2026-05-29 14:32',
    target: 'Order date',
    group: 'Order basics',
    confidence: 'High',
    required: true,
  },
  {
    source: 'Gia von',
    example: '',
    target: 'Not mapped',
    group: 'Costs',
    confidence: 'Missing',
    required: false,
  },
]

export const stores = [
  { name: 'Maison Sai Gon', platform: 'Shopee', status: 'Active', lastImport: '12 phut truoc', revenue: '94.1M' },
  { name: 'Breeze Beauty', platform: 'TikTok Shop', status: 'Needs costs', lastImport: 'Hom qua', revenue: '61.8M' },
  { name: 'Home Kit VN', platform: 'Shopee', status: 'Active', lastImport: '29 thg 5', revenue: '30.5M' },
]

export const missingCosts = [
  { sku: 'SKN-BOX-09', product: 'Combo cham soc da', orders: 214, affected: '26.7M' },
  { sku: 'BAG-MINI-18', product: 'Tui deo cheo mini', orders: 91, affected: '19.1M' },
  { sku: 'ACC-CABLE-04', product: 'Cap sac nhanh', orders: 64, affected: '8.4M' },
]

export const expenses = [
  { category: 'Ads', description: 'Google Ads May', store: 'All stores', amount: '8.2M', date: '31 thg 5' },
  { category: 'Fulfillment', description: 'Kho va dong goi', store: 'Maison Sai Gon', amount: '4.6M', date: '29 thg 5' },
  { category: 'Operations', description: 'Cong cu van hanh', store: 'All stores', amount: '1.2M', date: '25 thg 5' },
]

export const insights = [
  {
    severity: 'High',
    title: 'SKU co doanh thu nhung dang lo',
    summary: 'BAG-MINI-18 co bien loi nhuan 16.8% sau phi san va khuyen mai.',
    action: 'Kiem tra gia von',
  },
  {
    severity: 'Medium',
    title: 'Mot so dong ban hang thieu gia von',
    summary: '369 don hang bi anh huong boi SKU chua co gia von.',
    action: 'Them gia von',
  },
  {
    severity: 'Low',
    title: 'Doanh thu Shopee tang trong 7 ngay',
    summary: 'Maison Sai Gon tang 12.8% so voi ky truoc.',
    action: 'Xem chi tiet',
  },
]
