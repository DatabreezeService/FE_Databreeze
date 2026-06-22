# DataBreeze UI/UX Brief

This brief is for designers and frontend agents. It describes the intended product experience, not an implemented frontend.

## One-Line Product Definition

DataBreeze is a Vietnamese-first profit workspace where sellers upload Shopee, TikTok Shop, ads, and expense files, then see real profit by SKU, shop, and campaign.

## Design Audience

Design primarily for:

- Solo sellers with one to three shops.
- Multi-shop sellers.
- Later, small teams and SMEs.

The interface should feel simple enough for one person and structured enough to support teams later.

## Overall Layout

### Top Bar

- Logo and product name.
- Workspace switcher when the user has more than one workspace.
- User menu with account settings and logout.

### Sidebar

Initial navigation:

- Dashboard
- Uploads
- Stores
- Product Costs
- Expenses
- Insights
- Plan & Usage

### Content Area

Each page should have:

- Page title.
- Main action button where relevant.
- Filters where relevant.
- Main content.
- Clear empty/error/loading states.

## 1. Auth Screens

### Login

Goal: Let users enter quickly.

Content:

- Title: "Dang nhap vao DataBreeze"
- Email field.
- Password field.
- Primary button: "Dang nhap"
- Link: "Quen mat khau?"
- Secondary link: "Chua co tai khoan? Dang ky"

States:

- Inline field errors.
- Loading button state.
- Friendly auth error.

### Sign Up

Goal: Create account and prepare the first workspace.

Content:

- Title: "Tao tai khoan moi"
- Name field.
- Email field.
- Password field.
- Primary button: "Tiep tuc"
- Link: "Da co tai khoan? Dang nhap"

After success:

- Continue to OTP verification if required.
- Then continue to first-time workspace setup.

### Forgot/Reset Password

Use the same simple card layout. Keep copy direct and reassuring.

## 2. First-Time Setup

### Workspace Setup

Goal: Create or confirm the personal workspace without overwhelming the user.

Content:

- Title: "Thiet lap khong gian lam viec"
- Short explanation: this name represents the user's business/shop workspace.
- Workspace name field, prefilled if possible.
- Primary button: "Tiep tuc"

### Add First Store

Goal: Introduce the store/shop concept.

Content:

- Title: "Them shop dau tien"
- Store name field.
- Platform dropdown: Shopee, TikTok Shop, Other.
- Primary button: "Them shop"
- Secondary link: "Bo qua, toi se them sau"

After adding a store:

- Show a small store card with platform badge and store name.
- Primary button: "Vao bang dieu khien"

## 3. Dashboard

### Empty State

Goal: Push the user to first upload.

Content:

- Title: "Bang dieu khien loi nhuan"
- Empty message: "Chua co du lieu nao."
- Subtext: "Tai file tu Shopee, TikTok Shop, Google Ads hoac chi phi de xem loi nhuan thuc te."
- Primary button: "Tai file dau tien"

### Dashboard With Data

Goal: Show a clear profit picture.

Filters:

- Store selector: all stores or one store.
- Date range.
- Source/platform.

KPI cards:

- Doanh thu.
- Loi nhuan gop.
- Loi nhuan rong.
- So don hang.
- Bien loi nhuan.
- Refunds/fees where useful.

Main panels:

- Profit over time chart.
- Top SKUs by profit table.
- Store comparison.
- Data quality card.
- Insight/warning card.

Interactions:

- Click SKU to open SKU detail later.
- Click store to filter or open store detail.
- Click insight to view supporting details.

## 4. Stores Page

### Store List

Goal: Let users manage shops in the current workspace.

Header:

- Title: "Shop"
- Button: "Them shop"

Store card/list item:

- Platform badge.
- Store name.
- Status.
- Last upload/import.
- Upload count or data status.

Empty state:

- Message: "Chua co shop nao."
- Button: "Them shop"

### Add/Edit Store

Use a modal or side panel.

Fields:

- Store name.
- Platform.
- External store ID optional.
- Country/currency advanced or hidden by default.

## 5. Uploads Page

### Upload History

Goal: Show file processing history.

Header:

- Title: "Tai len va xu ly"
- Button: "Tai file moi"

Filters:

- Store.
- Data source.
- Status.
- Date range.

Table columns:

- File name.
- Store.
- Source type.
- Upload time.
- Status badge.
- Row count.
- Action: details.

Statuses:

- Waiting for mapping.
- Validating.
- Running.
- Completed.
- Failed.
- Warning.

### Upload Detail

Show:

- File metadata.
- Import jobs.
- Mapping status.
- Row counts.
- Error report download if available.
- Dashboard link if completed.

## 6. Upload Flow

### Upload New File

Goal: Make upload safe and guided.

Fields:

- Store dropdown.
- Data source type dropdown.
- File drop zone.

Drop zone text:

- "Keo tha file Excel/CSV vao day hoac chon tu may."

Accepted:

- `.xlsx`
- `.xls`
- `.csv`

After file select:

- Show file name.
- Show source/store.
- Primary button: "Tiep tuc map cot"

### Mapping Screen

This is the critical UX screen.

Goal: Make column mapping understandable to non-technical sellers.

Top context:

- File name.
- Store.
- Source type.
- Step indicator:

```text
1. Upload -> 2. Map cot -> 3. Kiem tra -> 4. Hoan tat
```

Main layout:

- Left/main area: detected source columns.
- Right/help area: standard DataBreeze fields grouped by category.

Each mapping row:

- Source column name.
- Example value.
- Suggested target field dropdown.
- Confidence/status pill.
- Required-field warning if relevant.

Target field groups:

- Order basics.
- Revenue and fees.
- Product and SKU.
- Costs.
- Ads later.

Bottom actions:

- Checkbox: "Luu mapping nay cho file cung loai sau nay."
- Secondary button: "Quay lai"
- Primary button: "Tiep tuc kiem tra du lieu"

UX notes:

- Required missing fields should be obvious.
- Do not block users with vague errors.
- Explain field names in Vietnamese first, technical field name second.

## 7. Validation Results

Goal: Give confidence and show data problems clearly.

Summary cards:

- Total rows.
- Valid rows.
- Warning rows.
- Failed rows.

Warning/error list examples:

- Missing SKU cost.
- Missing required mapping.
- Invalid dates.
- Duplicate order IDs.
- Empty SKU.

Actions:

- Primary: "Dong y va cap nhat dashboard"
- Secondary: "Tai file loi"
- Secondary: "Quay lai map cot"

Design tone:

- Warnings should be calm and actionable.
- The user should understand what will still import and what will not.

## 8. Product Costs

Goal: Help users make profit accurate.

Screens:

- Cost list.
- Missing cost SKUs.
- Add/edit product cost.
- Apply costs.

Cost row:

- SKU.
- Product name if known.
- Unit cost.
- Effective date.
- Currency.
- Status.

Missing cost view:

- SKU.
- Product name.
- Order item count.
- Quantity sold.
- Revenue affected.
- CTA to add cost.

## 9. Expenses

Goal: Capture non-COGS costs affecting net profit.

Fields:

- Store optional.
- Expense date.
- Category.
- Description.
- Amount.
- Currency.

UX note:

- Expenses should feel like accounting-lite, not a complex ledger.

## 10. Insights

Goal: Explain business risks and opportunities.

Insight card:

- Severity.
- Title.
- Short summary.
- Metric.
- Recommended action.
- Status: open, resolved, ignored.

Examples:

- "SKU co doanh thu nhung dang lo."
- "Mot so dong ban hang thieu gia von."
- "Ty le hoan tien cao."
- "Bien loi nhuan thap."

Insights should link back to dashboard/product/cost context when possible.

## 11. Plan & Usage

Goal: Make limits understandable.

Show:

- Current plan.
- Uploads used.
- Rows processed.
- Stores used.
- AI token usage if visible.
- Insight generation count.

Upgrade prompts:

- Friendly, clear, tied to the action the user tried to perform.

Example:

```text
Ban da dat gioi han shop cua goi hien tai.
Nang cap de them nhieu shop hon va xu ly nhieu dong hon moi thang.
```

## 12. Detail Dashboards Later

### SKU Detail

Show:

- Revenue.
- Profit.
- Quantity sold.
- Orders.
- Margin.
- Profit over time.
- Orders containing this SKU.

### Store Detail

Show:

- Revenue.
- Profit.
- Upload history.
- Top SKUs.
- Data quality.

### Campaign Detail

Later when ads imports exist:

- Spend.
- Revenue.
- ROAS.
- Profit.
- Conversions.
- Daily trend.

## Mobile Behavior

On mobile:

- Collapse sidebar into bottom nav or drawer.
- Turn tables into cards.
- Use filter sheets/drawers.
- Keep primary action sticky when useful.
- Prioritize upload status, KPI cards, and warnings.

## Component Inventory

Core components:

- App shell.
- Workspace switcher.
- Store selector.
- Date range picker.
- KPI card.
- Status badge.
- Upload drop zone.
- Step indicator.
- Mapping row.
- Target field dropdown.
- Validation summary card.
- Data quality card.
- Insight card.
- Empty state.
- Error report download button.
- Usage meter.
- Confirm modal.

## Visual Tone

DataBreeze should feel:

- Trustworthy.
- Calm.
- Clear.
- Operational.
- Vietnamese-first.
- Helpful without feeling childish.

Avoid:

- Overly decorative landing-page patterns inside the app.
- Dense enterprise dashboards too early.
- Purple/blue generic SaaS sameness if a more grounded palette is chosen.
- Technical jargon as primary labels.
