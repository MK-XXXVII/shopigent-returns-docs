---
title: Changelog
description: Release history and updates for Shopigent Returns.
---

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
- **SMS Notifications** — Pro plan: email-to-SMS gateways + optional Twilio integration
- **Exchange Workflow** — MCP tool to create draft orders for replacement items
- **Analytics Dashboard** — Return rate, auto-resolution %, trends, top reasons, top products
- **Plan-Based Access Control** — Free (read-only), Growth (approve/deny/refund), Pro (exchange + labels)
- **Billing Integration** — Shopify managed pricing with Free/Growth/Pro plans
- **ORDERS_FULFILLED Webhook** — Auto-create returns when orders are fulfilled
- **GDPR Compliance** — Webhooks for customers/data_request, customers/redact, shop/redact
- **Documentation Site** — Complete docs at returns-docs.greeknous.com

### 🔧 Technical

- Built on Remix + Polaris + Prisma + Postgres
- Deployed on Railway with GitHub auto-deploy
- MCP protocol 2024-11-05 compliant
- Multi-provider label architecture (SendCloud, Shippo, EasyPost)
- VPS mail relay for email delivery (no third-party dependency)
- Custom domain: returns.greeknous.com
- GitHub: MK-XXXVII/shopigent-returns