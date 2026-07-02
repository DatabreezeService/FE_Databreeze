# Product

## Register

product

## Users

DataBreeze is designed first for Vietnamese e-commerce sellers who manage one to three shops, then for multi-shop sellers, SMEs, and small teams.

These users work inside recurring operational routines:

- Export marketplace files.
- Check revenue.
- Add missing costs.
- Review warnings.
- Decide what to fix next.

They are usually not data engineers. They need a product that turns messy CSV and Excel files into trusted profit views without asking them to understand ETL, SQL, schemas, or backend jobs.

## Product Purpose

DataBreeze is a Vietnamese-first profit workspace where sellers upload Shopee, TikTok Shop, ads, and expense files, map messy columns, validate import results, and see real profit by SKU, shop, campaign, and time period.

Success means a seller can answer practical business questions quickly:

- Which products actually make money?
- Which SKUs are missing cost data?
- Which shop, campaign, or date range is underperforming?
- Which uploaded files imported cleanly, partially, or failed?
- What action should happen next?

## Core Workflow

```text
Upload files
  -> map columns
  -> validate rows
  -> import clean data
  -> review profit
  -> fix missing costs or data issues
```

## Product Objects

- User: a person who logs in.
- Workspace: the business context and tenant boundary.
- Store: a shop or sales account inside a workspace.
- Upload: a file submitted by the user.
- Import job: the processing run for an upload.
- Mapping: a confirmed relationship between source columns and DataBreeze fields.
- Dashboard: the business view produced from imported and calculated data.

## Priority

The SMB Profit Dashboard is the first core product loop.

Build order:

1. Upload and parse files.
2. Map columns.
3. Validate rows.
4. Import durable records.
5. Show trusted dashboard metrics.
6. Surface missing costs and data problems.
7. Support expenses and reconciliation.
8. Add more sources after the first loop works.

## Non-Goals

- Do not become a generic BI platform before the seller profit loop works.
- Do not build every marketplace source at once.
- Do not let AI-generated advice outrank reliable import, validation, and calculation.
- Do not require users to understand database schemas.
