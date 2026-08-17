---
title: Changelog
description: Release history and updates for Shopigent Returns.
---

## v1.1.0 — Pre-Release Polish (August 2026)

### ✨ New Features

- **Fraud flag blocks auto-approve** — fraud-flagged returns now stay PENDING for manual review
- **Close Return button** — close Shopify return directly from the app for REFUNDED returns
- **Shopify return lookup fallback** — when `shopifyReturnId` is missing, queries Shopify by orderId
- **Cancel/Deny for approved returns** — cancel APPROVED/SHIPPED returns with one click (syncs to Shopify)
- **Token action fix** — single token works for both Approve and Deny
- **Return Portal UI** — Polaris Select dropdown for reason (instead of raw HTML), item layout with `InlineStack`, live total updates via React state
- **Email sender** — changed from `master@greeknous.com` to `shopigent@greeknous.com`
- **Email logo** — branded SVG logo with "Shopigent" (purple) + "Returns" (green)
- **Fraud Rules save fix** — flush pending input before submit (async state race)
- **Returns list search** — filter returns by order name or customer name
- **Loading states** — SkeletonBodyText while data loads
- **Auto-refresh** — page auto-reloads after approve/deny/refund/close
- **NavMenu fix** — key-based re-mount to fix embedded nav after client-side navigation

### 🐛 Bug Fixes

- **returnClose failure** — log actual error instead of silent failure
- **Auth "null" display** — fixed root.tsx ErrorBoundary to show "Re-authenticating..." instead of "null"
- **Login path error** — root.tsx calls `login()` when shop param missing
- **Return Detail "Not found"** — reverted child route auth to standard pattern
- **Process Refund action mismatch** — removed invalid `@idempotent` directive, fixed syntax (field-level with UUID key)
- **Refund gateway** — changed from "manual" to "cash" for orders without payment transaction
- **Back arrow** — changed from fixed `/returns` URL to `navigate(-1)` with Dashboard fallback
- **Cancel button** — now also declines Shopify return before closing
- **UI spacing** — standardized all gaps to Polaris conventions (100→200)

### 🔧 Technical

- API version aligned to 2026-07 across all files
- Shopify admin API version env set to 2026-07
- Railway env variable alignment
- `@idempotent` directive corrected per Shopify 2026-07 requirements
- Portal uses React state for live quantity × price calculation
- All action buttons now `fullWidth` + stacked vertically on detail page

## v1.0.0 — Initial Release (August 2026)

### ✨ Features

- **Policy Engine** — Create and manage return policies with conditions (max days, max amount, auto-approve, restocking fees)
- **Returns Dashboard** — View, filter, and manage all returns by status
- **Return Detail** — Complete view with items, fraud signals, activity log
- **Customer Portal** — Self-service return initiation at `/return` with OTP verification
- **MCP Server** — 9 tools for AI agent integration via Model Context Protocol
- **Confirmation Gate** — HMAC-signed confirmation tokens with 5-min TTL for destructive operations
- **Atomic State Transitions** — Concurrent double-approve prevention via `updateMany` with status guard
- **Token Refresh** — Automatic refresh of expired offline access tokens via OAuth
- **Rate Limiting** — Postgres-backed per-minute (60) and per-day (1000) limits per shop
- **Refund Execution** — Automatic refunds via Shopify Admin API with store credit option
- **Fraud Detection** — Velocity checks, amount anomalies, frequent returner flags, configurable rules
- **Advanced Fraud Rules** — Custom rules UI: max returns per customer, max value, blocked countries, suspicious domains
- **Label Generation** — SendCloud, Shippo, and EasyPost integration with settings UI
- **Email Notifications** — Automatic emails on approve/deny/refund via VPS mail relay
- **Exchange Workflow** — MCP tool to create draft orders for replacement items
- **Analytics Dashboard** — Return rate, auto-resolution %, trends, top reasons, top products
- **Plan-Based Access Control** — Free (read-only), Growth (approve/deny/refund), Pro (exchange + labels)
- **Billing Integration** — Shopify managed pricing with Free/Growth/Pro plans
- **ORDERS_FULFILLED Webhook** — Auto-create returns when orders are fulfilled
- **GDPR Compliance** — Webhooks for customers/data_request, customers/redact, shop/redact

### 🔧 Technical

- Built on Remix + Polaris + Prisma + Postgres
- Deployed on Railway with GitHub auto-deploy
- MCP protocol 2024-11-05 compliant
- Multi-provider label architecture (SendCloud, Shippo, EasyPost)
- VPS mail relay for email delivery (no third-party dependency)
- Custom domain: returns.greeknous.com
- Docs site: returns-docs.greeknous.com
- GitHub: MK-XXXVII/shopigent-returns