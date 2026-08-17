---
title: Shopigent Returns — AI-Powered Return Management for Shopify
description: Automate Shopify returns end-to-end with AI. Customer portal, policy engine, fraud detection, auto-refunds, label generation, and MCP agent integration. Saves merchants 10+ hours per week.
---

🚀 **AI-Powered Return Management for Shopify** — Stop manually processing returns. Shopigent Returns uses AI agents to analyze, approve, refund, and detect fraud — automatically.

## What Makes It Different

Unlike basic return apps, Shopigent Returns provides a **complete returns automation system**:

1. **Customer Portal** — Self-service return initiation with OTP verification. Customers enter their email, select items, and submit.
2. **Policy Engine** — Configurable rules: time windows, amounts, restocking fees. Auto-approve or flag for manual review.
3. **Fraud Detection** — Velocity checks, amount anomalies, suspicious domains, blocked countries. Automatic flagging.
4. **Auto-Refund** — Executes refunds directly in Shopify via the Admin API. Full or partial refunds.
5. **Label Generation** — SendCloud, Shippo, or EasyPost. Auto-generate return labels on approval.
6. **MCP Agent Integration** — Connect any MCP-compatible AI agent (Claude Desktop, Codex, Cursor, Grok) to manage returns autonomously.
7. **Bidirectional Sync** — Real-time sync between the app and Shopify returns via webhooks + on-load sync.
8. **Analytics Dashboard** — Return rate, auto-resolution %, trends, top reasons, top products.

## Key Features

| Feature | What It Does |
|---------|-------------|
| **Customer Portal** | Self-service return portal at `/return?shop=...` — OTP verification, item selection, reason dropdown, quantity selector |
| **Policy Engine** | Configurable conditions: max days, max amount, auto-approve, restocking fees. Priority-based matching |
| **Fraud Detection** | Custom rules: max returns per customer, max value, blocked countries, suspicious email domains |
| **Auto-Refund** | Execute refunds via Shopify Admin API — full or partial, with `cash` gateway fallback for test orders |
| **Label Generation** | SendCloud, Shippo, and EasyPost integration — configurable from Settings |
| **MCP Server** | 9 tools for AI agents: analyze, check fraud, approve/deny, process refund, list returns, get stats |
| **Confirmation Gate** | Two-step HMAC-signed confirmation for destructive operations — prevents unauthorized changes |
| **Bidirectional Sync** | Webhook `returns/update` + on-load sync — keeps app and Shopify in sync |
| **Email Notifications** | Automatic emails on approve, deny, refund — from `shopigent@greeknous.com` with branded logo |
| **Analytics** | Return rate, auto-resolution %, trends, top reasons, top products |
| **Plan-Based Access** | Free (10 returns/mo), Growth ($9.99, unlimited), Pro ($29, labels + exchanges) |
| **Rate Limiting** | 60 calls/min per store + daily plan allowance |
| **Auto Token Refresh** | Expired Shopify access tokens are refreshed automatically |
| **Any MCP Client** | Works with Claude Desktop, Codex, Cursor, Grok, and all MCP-compatible tools |

## Customer Portal

Your customers submit returns at a dedicated portal URL:

`https://returns.greeknous.com/return?shop=YOUR_STORE.myshopify.com`

**Flow:**
1. Customer enters email → receives OTP code (or auto-verifies with dev code `123456`)
2. Selects order and items to return
3. Chooses reason from dropdown (Wrong size, Defective, Changed mind, etc.)
4. Adjusts quantities — line total updates live
5. Submits → AI processes (auto-approve, fraud check, or manual review)

## MCP Server

Endpoint: `https://returns.greeknous.com/api/mcp`

```json
{
  "mcpServers": {
    "shopigent-returns": {
      "url": "https://returns.greeknous.com/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_KEY"
      }
    }
  }
}
```

### Available Tools

| Tool | Description | Plan |
|------|-------------|------|
| `analyze_return` | Get return details by ID | Free |
| `check_fraud` | Evaluate fraud rules for a customer | Free |
| `list_returns` | List returns with optional status filter | Free |
| `get_stats` | Get return statistics | Free |
| `issue_confirmation_token` | Get HMAC token for destructive ops | Growth+ |
| `approve_return` | Approve a return (with token) | Growth+ |
| `deny_return` | Deny a return (with token) | Growth+ |
| `process_refund` | Execute refund for a return | Growth+ |
| `exchange_return` | Create exchange draft order | Pro |

## Pricing

| Plan | Price | Returns | Auto-Refund | Fraud Detection | Labels | MCP Access |
|------|-------|---------|-------------|-----------------|--------|------------|
| **Free** | $0 | 10/month | ❌ | ❌ | ❌ | Read-only |
| **Growth** | $9.99/mo | Unlimited | ✅ | ✅ Basic | ❌ | Full |
| **Pro** | $29/mo | Unlimited | ✅ | ✅ Advanced | ✅ | Full + Exchange |

Paid plans include a **7-day free trial**. Billing is handled through Shopify's managed pricing.

## Confirmation Gate

All mutation tools go through a **two-step confirmation flow**:

1. Agent calls `issue_confirmation_token` → receives HMAC-signed token
2. Agent calls `approve_return` / `deny_return` with `confirmationToken`
3. Tokens expire in **5 minutes** and are bound to the exact shop, return, and arguments

## How It Works

1. **Install** — Install the app from the Shopify App Store
2. **Configure** — Set your policies and fraud rules in the app
3. **Automate** — The AI handles returns end-to-end, or flags suspicious ones for review

---

[Install App →](https://apps.shopify.com)
[Getting Started →](/guides/getting-started)
[Pricing →](/pricing)