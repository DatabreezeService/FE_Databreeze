# DataBreeze Frontend Agent Guide

This guide is for agents working inside `FE_Databreeze`.

## Current State

`FE_Databreeze` is currently an empty Git repository with documentation only. There is no React app, package manifest, router, components, API client, or build setup yet.

Agents should treat this folder as the future home of the DataBreeze product frontend.

## Recommended Frontend Stack

Long-term frontend stack:

```text
React
TypeScript
Vite
React Router
TanStack Query
Tailwind CSS
shadcn/ui or Radix-based primitives
Recharts or a comparable dashboard chart library
Zod for client-side schema validation where useful
Vitest + Testing Library
Playwright for end-to-end flow verification
```

Why this stack:

- DataBreeze is a logged-in dashboard app, not an SEO-first website.
- React + Vite keeps the product app simpler than Next.js.
- The backend is already Spring Boot, so backend business logic should stay there.
- TanStack Query is a good fit for server-state-heavy screens such as uploads, jobs, dashboards, costs, stores, and usage.

Use Next.js only for a separate marketing/docs site if needed later.

## Product Role Of The Frontend

The frontend should make DataBreeze feel like:

> A simple Vietnamese-first profit workspace where sellers upload messy files and quickly understand real revenue, costs, and profit.

The UI must hide unnecessary ETL complexity while still making mapping, validation, and errors understandable.

## Core UX Flow

```text
Auth
  -> first workspace/store setup
  -> dashboard empty state
  -> upload file
  -> map columns
  -> validate data
  -> run import/update dashboard
  -> view dashboard/insights
  -> fill missing costs
  -> recalculate profit
```

## Expected App Shell

### Top Bar

- Logo and product name.
- Workspace switcher when the user belongs to more than one workspace.
- Current user menu.
- Optional usage/plan indicator for low-tier plans.

### Sidebar

Recommended initial navigation:

- Dashboard
- Uploads
- Stores
- Product Costs
- Expenses
- Insights
- Plan & Usage
- Settings later

Keep the navigation compact and operational. This is a SaaS tool, not a marketing landing page.

## Main Screens

### Auth

Screens:

- Login.
- Sign up.
- Verify OTP.
- Forgot password.
- Reset password.

Notes:

- Keep forms simple.
- Show inline validation.
- Preserve Vietnamese-friendly copy.

### First-Time Setup

Screens:

- Workspace setup.
- Add first store.
- Dashboard empty state.

Goal:

Get the user to the first upload as quickly as possible.

### Dashboard

States:

- Empty dashboard with a clear upload CTA.
- Data dashboard with filters, KPI cards, daily chart, top SKUs, data quality, and insights.

Filters:

- Workspace.
- Store.
- Date range.
- Source/platform.

KPI cards:

- Revenue.
- Gross profit.
- Net profit.
- Orders.
- Margin.
- Refunds or fees where useful.

### Uploads

Screens:

- Upload history.
- Upload detail.
- New upload.
- Mapping.
- Validation/import result.
- Error report download.

The mapping screen is the most important frontend workflow. It must be understandable to non-technical sellers.

### Stores

Screens:

- Store list.
- Add/edit store.

Store cards/list rows should show:

- Store name.
- Platform.
- Status.
- Last upload/import.
- Basic performance summary when available.

### Product Costs

Screens:

- Product cost list.
- Add/edit cost.
- Missing SKU costs.
- Apply costs/recalculate dashboard.

This area is critical because profit is unreliable without COGS.

### Expenses

Screens:

- Operating expense list.
- Add/edit expense.

Expenses feed net profit and should be date/store-aware.

### Insights

Screens:

- Insight list.
- Generate insight.
- Insight status update.

Insights should be presented as practical business warnings, not vague AI advice.

### Plan & Usage

Screens:

- Current plan.
- Upload/row/store/member/token usage.
- Upgrade prompts.

The UI should explain limits before they surprise users.

## Backend API Expectations

The frontend should authenticate with the backend and send bearer tokens to protected endpoints.

Core API groups:

- `/api/v1/auth/**`
- `/api/v1/me/workspaces`
- `/api/v1/workspaces/**`
- `/api/v1/workspaces/{workspaceId}/stores`
- `/api/v1/workspaces/{workspaceId}/etl/**`
- `/api/v1/workspaces/{workspaceId}/dashboard/**`
- `/api/v1/workspaces/{workspaceId}/processed-data/**`
- `/api/v1/workspaces/{workspaceId}/product-costs/**`
- `/api/v1/workspaces/{workspaceId}/operating-expenses/**`
- `/api/v1/workspaces/{workspaceId}/insights/**`
- `/api/v1/workspaces/{workspaceId}/subscription`
- `/api/v1/workspaces/{workspaceId}/usage`
- `/api/v1/plans`

Do not reintroduce `actorUserId` request params. Current backend controllers use JWT principal.

## State Model

Recommended state split:

- Authentication/session state: small local app store or context.
- Current workspace/store/date filters: URL params where shareable, local state where temporary.
- Server state: TanStack Query.
- Form state: local form libraries or controlled forms, depending on complexity.

Do not duplicate server data into global client state unless there is a strong reason.

## UI Principles

### Vietnamese-First

Use seller-friendly language. Avoid technical ETL language in primary UI.

### Guided Steps

The upload workflow should always show progress:

```text
Upload file -> Map columns -> Check data -> Update dashboard
```

### Clear Empty States

Every no-data screen should have one clear primary action.

### Gentle Errors

Data errors should explain what to fix and how to continue.

### Workspace Clarity

The user should always know which workspace and store they are viewing.

### Logo Labels

If a logo already includes a readable name, use the logo alone and do not repeat the same or nearly same name next to it. Example: a `.NET` wordmark should not also have `.NET` as adjacent visible text. Add visible text only when the mark is abstract, unclear at small sizes, or needs clarification in context.

### Solo-First, Team-Ready

The first UI should feel simple for one seller. Do not design in a way that blocks later organization workspaces, roles, and billing.

## Implementation Guidance For Future Agents

When scaffolding the app:

1. Use Vite React TypeScript.
2. Add routing early.
3. Add a typed API client.
4. Add auth token handling.
5. Build the app shell before deep screens.
6. Build upload/mapping/dashboard flows before secondary settings pages.
7. Add Playwright smoke tests for login mock, upload flow mock, and dashboard rendering once possible.

Suggested folders:

```text
src/
|-- app/              # providers, router, app shell
|-- api/              # API client and generated/manual types
|-- components/       # shared UI components
|-- features/
|   |-- auth/
|   |-- dashboard/
|   |-- uploads/
|   |-- mapping/
|   |-- stores/
|   |-- costs/
|   |-- expenses/
|   |-- insights/
|   `-- billing/
|-- hooks/
|-- lib/
`-- styles/
```

## What Not To Build First

- Do not start with a marketing landing page.
- Do not overbuild admin/team settings before upload and dashboard work.
- Do not build fake AI chat as the core experience.
- Do not hide mapping details completely; users need trust.
- Do not make the UI depend on unimplemented backend platforms such as TikTok or Google Ads without feature flags or placeholder states.
