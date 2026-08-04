---
title: Changelog
description: Release history and updates for Shopigent Returns.
---

## v1.0.0 — Initial Release (August 2026)

### ✨ Features

- **Policy Engine** — Create and manage return policies with conditions (max days, max amount, auto-approve, restocking fees)
- **Returns Dashboard** — View, filter, and manage all returns by status
- **Return Detail** — Complete view with items, fraud signals, activity log
- **Customer Portal** — Self-service return initiation at `/return`
- **MCP Server** — 7 tools for AI agent integration via Model Context Protocol
- **Refund Execution** — Automatic refunds via Shopify Admin API
- **Fraud Detection** — Velocity checks, amount anomalies, frequent returner flags
- **Label Generation** — SendCloud, Shippo, and EasyPost integration
- **Email Notifications** — Automatic emails on approve/deny/refund via VPS mail relay
- **Analytics Dashboard** — Return rate, auto-resolution %, trends, top reasons
- **ORDERS_FULFILLED Webhook** — Auto-create returns when orders are fulfilled
- **Documentation Site** — Complete docs at returns-docs.greeknous.com

### 🔧 Technical

- Built on Remix + Polaris + Prisma + Postgres
- Deployed on Railway with headless CI/CD
- MCP protocol 2024-11-05 compliant
- Multi-provider label architecture (SendCloud, Shippo, EasyPost)
- VPS mail relay for email delivery (no third-party dependency)