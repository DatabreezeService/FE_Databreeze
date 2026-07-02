# Design

## Overview

DataBreeze is a product UI, not a brand landing page. The design system should support a logged-in dashboard app with upload workflows, mapping tables, validation states, KPI summaries, cost management, and plan usage.

Design mood: a morning seller workspace, clean white desk, crisp cobalt brand mark, quiet operational clarity.

Color strategy: Restrained. The interface uses neutral work surfaces with one primary cobalt action accent from the DataBreeze logo. Semantic colors are reserved for status only.

Theme strategy: light-first with system dark-mode support later. The first implementation should not create section-level theme flips.

## Color Tokens

Use OKLCH custom properties. Do not introduce hex color literals in source styles.

```css
:root {
  --color-bg: oklch(1.000 0.000 0);
  --color-surface: oklch(0.976 0.004 255);
  --color-surface-strong: oklch(0.948 0.007 255);
  --color-ink: oklch(0.205 0.018 255);
  --color-muted: oklch(0.470 0.020 255);
  --color-border: oklch(0.900 0.010 255);

  --color-primary: oklch(0.600 0.210 262);
  --color-primary-hover: oklch(0.540 0.220 262);
  --color-primary-soft: oklch(0.955 0.038 262);

  --color-accent: oklch(0.620 0.115 178);
  --color-accent-soft: oklch(0.950 0.035 178);

  --color-success: oklch(0.560 0.120 145);
  --color-warning: oklch(0.720 0.135 75);
  --color-danger: oklch(0.560 0.145 25);
  --color-info: oklch(0.570 0.115 245);
}
```

Primary cobalt is used for the main action and selected app state. Teal is a secondary accent for freshness, successful data quality, or non-primary emphasis. Red is reserved for danger and destructive states. Do not use teal as a competing CTA color.

## Typography

Use one product sans family:

```css
font-family: "Be Vietnam Pro", "Noto Sans", "Segoe UI", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

Be Vietnam Pro is the preferred product font because the primary UI language is Vietnamese and diacritics must feel native, not bolted on. Avoid display fonts, serif emphasis, decorative letter spacing, and viewport-scaled type.

Type scale:

- Page title: 28px, 700, 1.15 line height.
- Section title: 18px, 650, 1.25 line height.
- Body: 14px or 15px, 400, 1.55 line height.
- UI label: 12px or 13px, 600, 1.25 line height.
- Table cell: 13px or 14px, 400, 1.4 line height.
- Numeric KPI: 26px to 34px, 700, tabular numbers.

Use `font-variant-numeric: tabular-nums` for KPI values, currency, percentages, dates, and table numbers.

## Shape And Elevation

Radius system:

- Small controls: 6px.
- Buttons, inputs, badges: 8px.
- Panels and cards: 8px maximum.
- Full pill only for compact badges or segmented controls where the pill shape carries state.

Elevation should be rare. Prefer borders, dividers, spacing, and background layers. Do not combine a 1px border with a wide decorative shadow.

## Layout System

Primary app structure:

- Top bar: 64px max height.
- Sidebar: compact, 232px desktop width.
- Main content: fluid, max useful reading width per surface, with dashboard grids expanding when data needs it.
- Page gutter: 24px desktop, 16px tablet, 12px mobile.
- Section spacing: 20px to 32px inside product surfaces.

Use CSS grid for dashboards and complex two-dimensional layouts. Use flex for toolbar rows and inline control groups.

Avoid app-wide hero sections. The first screen after login should be the working surface: dashboard, empty upload prompt, setup flow, or upload state.

## Component Vocabulary

Core components:

- App shell.
- Top bar.
- Sidebar navigation.
- Workspace switcher.
- Store selector.
- Date range control.
- Primary, secondary, ghost, and danger buttons.
- Text input, select, file drop zone, checkbox, segmented control.
- Status badge.
- KPI tile.
- Data table.
- Empty state panel.
- Error and warning callout.
- Step indicator.
- Mapping row.
- Validation summary.
- Insight item.
- Usage meter.
- Side panel or modal for create/edit flows.

Every interactive component needs default, hover, focus-visible, active, disabled, loading, and error states where applicable.

## Brand And Partner Marks

When a logo or partner mark already contains a readable name, treat the mark as the label. Do not repeat the same or nearly same text beside it. For example, show the `.NET` logo by itself instead of placing `.NET` text next to a `.NET` wordmark.

Only add adjacent text when the mark is abstract, ambiguous at small sizes, or when accessibility requires a visible clarification. Always keep descriptive `alt` text for images even when the visible label is omitted.

## Data Visualization

Charts should be quiet and readable:

- Use red only for primary selected series, negative movement, or critical risk.
- Use teal or green only for positive or healthy states.
- Use neutral gridlines and muted axes.
- Always pair color with label, value, icon, or text cue.
- Avoid fake precision. Seed data in demos must be clearly sample data in code comments or constants.

Recommended chart library later: Recharts or another React chart library that keeps chart labels code-native and accessible.

## Motion

Motion intensity: low. Use 150ms to 220ms transitions for state changes, selected rows, drawer entry, hover feedback, and upload step progression.

Rules:

- No decorative page-load choreography.
- No scroll hijacking.
- No layout-property animation.
- Respect `prefers-reduced-motion`.
- Motion should communicate state, feedback, or progress.

## Copy Rules

Visible product copy should be short, operational, and Vietnamese-first where the docs specify Vietnamese labels.

Use:

- "Tải file mới"
- "Tiếp tục map cột"
- "Kiểm tra dữ liệu"
- "Cập nhật dashboard"
- "Thêm shop"
- "Giá vốn bị thiếu"

Avoid:

- "Seamless insights"
- "AI-powered growth engine"
- "Unlock next-gen profit intelligence"
- Technical terms like ETL, schema, row normalization, or pipeline in primary labels.

## Responsive Rules

Desktop:

- Sidebar remains visible.
- Tables use dense rows and sticky header where useful.
- Mapping can use main plus helper rail.

Tablet:

- Sidebar can collapse to icons or drawer.
- Filters wrap into two rows.
- Tables may reduce optional columns.

Mobile:

- Sidebar becomes drawer or bottom navigation.
- Tables become stacked records.
- Primary action can be sticky at the bottom for upload and mapping flows.
- Keep buttons single-line when possible; shorten labels before shrinking text.

## Implementation Notes

Start with the app shell, dashboard empty/data states, upload history, upload flow, mapping screen, validation results, costs, expenses, insights, and plan usage.

Do not add a marketing landing page inside this product frontend unless explicitly requested later.
