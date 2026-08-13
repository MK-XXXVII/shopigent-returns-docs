---
title: Changelog
description: Release history and updates for Shopigent Returns.
---

## v1.0.0 — Initial Release (August 2026)

### ✨ Features

#### MCP Server
- **72 curated tools** covering products, orders, customers, collections, discounts, fulfillment, content, themes, translations, and store info
- **MCP protocol 2024-11-05 compliant** — works with Claude Desktop, Codex, Cursor, and any MCP client
- **Shop-scoped multi-tenant** — each request authenticated via Bearer API key, isolated per-shop tool registry
- **Per-request McpServer** — fresh server instance per HTTP request for correct tenant isolation

#### Plan-based Access Control
- **3-tier freemium model** — Free (read-only, 25 calls/day), Growth ($9.99/mo, writes, 500 calls/day), Pro ($29/mo, unlimited, premium)
- **Free plan** — read-only queries, dry-run preview, audit log
- **Growth plan** — all standard write tools (products, orders, customers, collections, discounts, fulfillment, content)
- **Pro plan** — translations, theme content/Liquid editing, theme publish/duplicate, unlimited tool calls, custom tools builder
- **Daily call allowance** enforced per plan bucket (Postgres-backed)
- **Upgrade prompts** — tools blocked by plan return `upgradeRequired: true` with clear messaging

#### Confirmation Gate
- **Two-step confirmation** for mutation tools — first call returns `confirmation_pending` with HMAC-signed token, second call with `confirmed: true` executes
- **HMAC SHA-256 signed tokens** — self-contained (no server-side storage), works across multiple MCP server instances
- **5-minute token expiry** — tokens are time-bound for security
- **Args binding** — token is cryptographically tied to the exact shop, tool, and argument hash; prevents replay attacks across different operations
- **GraphQL preview** — confirmation_pending response includes the full GraphQL query and resolved variables for human review
- **Per-tool confirmation configuration** — each curated tool has a `defaultRequiresConfirmation` flag, overrideable per-shop via ShopTool

#### Dry-Run Mode
- **Preview before execute** — any tool call with `dryRun: true` returns the GraphQL query and variables without side effects
- Independent from the confirmation gate — works on both read and write tools

#### Rate Limiting
- **Per-minute rate limit** — 60 calls/minute per store via Postgres-bucketed counter
- **Per-day allowance** — plan-based daily call caps (Free: 25, Growth: 500, Pro: unlimited)
- **Rate limit errors** include `retryAfterSeconds` for programmatic retry

#### Auto Token Refresh
- **Offline access token refresh** — expired Shopify access tokens are automatically refreshed using the stored refresh token
- Zero-downtime token rotation — no need for merchant to reinstall

#### Audit Log
- **Full audit trail** — every tool call logged with shop ID, tool key, operation type, input payload, status, Shopify response summary, latency, and client info
- **5 audit statuses** — success, error, dry_run, confirmation_pending, confirmation_denied
- **Indexed for query performance** — by shop ID and creation timestamp

#### Billing Integration
- **Shopify App Pricing (managed pricing)** — plans selected via Shopify's hosted pricing page
- **Webhook-driven reconciliation** — `app_subscriptions/update` webhook updates local plan rows
- **Optimistic plan updates** — local plan row updated immediately on click before Shopify redirect
- **7-day free trial** for paid plans

#### Custom Tools (Pro plan)
- **Custom tool builder** — define your own GraphQL queries/mutations with input schema and confirmation settings
- **Lifecycle management** — draft → dry_run_passed → active workflow
- **Instant availability** — custom tools appear in the MCP `tools/list` response alongside curated tools
- **Confirmation gate support** — custom tools default to requiring confirmation

#### Embedded App (Remix + Polaris)
- **Dashboard** with tool management (enable/disable curated tools per-shop)
- **Billing page** with plan comparison cards and one-click upgrade
- **Custom Tools builder** page with dry-run validation
- **Scope categories UI** — grant/revoke Shopify OAuth scope categories
- **MCP Key generation** — generate and hash API keys per store
- **Dev store auto-Pro** — development stores automatically get Pro plan for testing

### 🔧 Technical

- **Stack:** Remix + Polaris + Prisma + Postgres + Express
- **MCP SDK** — `@modelcontextprotocol/sdk` with `StreamableHTTPServerTransport`
- **Deployment:** Railway with headless CI/CD
- **Auth:** Bearer token → shop resolution → per-shop tool registry + Prisma shop lookup
- **Database:** Single shared Postgres between MCP server and embedded app
- **Migrations:** Prisma-managed schema with PlanTier enum (free, growth, pro, agency)
- **Seeds:** 72 curated tools via `prisma/seed.ts`
- **Schema validation:** Zod-based input schema parsing built dynamically from JSON schema
- **Rate limiting:** Postgres-bucketed per-minute and per-day counters (MVP — Redis planned for v1.1)