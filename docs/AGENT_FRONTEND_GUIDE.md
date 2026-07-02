# DataBreeze Frontend Agent Guide

This guide is for agents working inside `FE_Databreeze`.

Before making product or architecture decisions, also read `docs/PRODUCT_MEMORY_AND_LONG_TERM_STACK.md`. That file preserves the long-term product memory, stack decision, user model, module priority, and build sequence for DataBreeze.

This file intentionally avoids visual design direction. Treat current user briefs, active design tasks, and verified product requirements as the source of visual direction.

## Current Stack

The frontend is a Vite React TypeScript app.

Current stack:

```text
React
TypeScript
Vite
React Router
TanStack Query
Phosphor Icons
CSS tokens and feature styles
```

Long-term additions can include:

```text
Typed API client
Form validation helpers
Charting library when real dashboard data needs it
Vitest + Testing Library
Playwright smoke tests
```

Do not add framework-level complexity unless it solves a current product need.

## Product Role

The frontend is the user-facing workspace for:

- Authentication.
- Workspace and store selection.
- Upload history.
- File upload.
- Column mapping.
- Validation state.
- Dashboard review.
- Product costs.
- Operating expenses.
- Insights.
- Plan and usage.

The frontend should keep business workflows understandable, but this guide does not prescribe visual style, color, layout, or landing-page direction.

## Core Flow

```text
Auth
  -> workspace/store context
  -> upload file
  -> map columns
  -> validate data
  -> run import/update dashboard
  -> review profit and warnings
  -> fix missing costs or expenses
```

## API Expectations

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

Do not reintroduce `actorUserId` request parameters. Current backend controllers use the authenticated principal.

## State Model

Recommended state split:

- Authentication/session state: small local app store or context.
- Current workspace/store/date filters: URL params where shareable, local state where temporary.
- Server state: TanStack Query.
- Form state: local component state or a form helper when complexity justifies it.

Do not duplicate server data into global client state unless there is a strong reason.

## Suggested Source Structure

```text
src/
|-- app/              # providers, router, app shell
|-- api/              # API client and generated/manual types
|-- components/       # shared components
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

The current app may be flatter than this. Do not refactor structure unless it helps the active task.

## Implementation Rules

- Prefer existing components, tokens, and routing patterns when they fit the task.
- Keep product routes working while changing public or landing routes.
- Keep API boundaries typed.
- Keep workspace-scoped requests tied to an authenticated workspace context.
- Keep upload, mapping, validation, dashboard, costs, expenses, insights, and billing concepts aligned with backend API names.
- Add tests or browser verification when changing user-facing flows.
- Run `npm.cmd run build` before claiming frontend implementation is complete.

## Visual Direction

There is no persistent visual design instruction in this guide.

For visual work, use the active user brief, current references, product assets, and browser verification. Do not inherit stale design opinions from older repo docs.
