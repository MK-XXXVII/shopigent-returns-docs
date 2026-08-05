---
title: Shopigent Returns — AI-Powered Return Management
description: Automate your Shopify returns with AI agents. Policy engine, fraud detection, auto-refunds, MCP server, and self-service customer portal.
---

**Stop manually processing returns.** Shopigent Returns uses AI agents to analyze, approve, refund, and detect fraud — automatically.

## What Makes It Different

Unlike traditional returns apps that are just workflow tools, Shopigent Returns has an **AI agent** at its core. The agent:

1. **Analyzes** each return against your store policies
2. **Auto-approves** returns that match your criteria
3. **Executes refunds** in Shopify — no manual work
4. **Detects fraud** — velocity checks, amount anomalies
5. **Generates labels** via SendCloud, Shippo, or EasyPost
6. **Notifies customers** via email at every step

## Key Features

| Feature | What It Does |
|---|---|
| **Policy Engine** | Set rules: max days, max amount, auto-approve thresholds, restocking fees |
| **AI Agent (MCP)** | Connect via Claude Desktop, Codex, Cursor — manage returns in natural language |
| **Customer Portal** | Self-service return initiation with **OTP email verification** for security |
| **Fraud Detection** | IP checks, return velocity, amount anomalies, frequent returner flags |
| **Auto-Refund** | Execute Shopify Admin API refunds. Full or partial, with restocking |
| **Label Generation** | SendCloud (EU/NL), Shippo (US), or EasyPost (global) |
| **Email Notifications** | Automatic emails on approve, deny, and refund |
| **Analytics** | Return rate, auto-resolution %, fraud saved, top reasons, trends |

## Customer Portal

Give your customers a self-service return page at `returns.greeknous.com/return?shop=YOUR_STORE.myshopify.com`.

- Customers enter their email and receive a **one-time verification code** (OTP)
- After verification, their orders appear — they select items and a reason
- The AI agent reviews and processes the return automatically
- [Full setup guide →](/guides/return-portal)

## MCP Server

The MCP server gives AI agents 7 tools to manage returns:

```
analyze_return     — Evaluate against policies, get recommendation
approve_return     — Approve, execute refund, generate label
deny_return        — Deny with reason
check_fraud        — Run fraud detection signals
list_policies      — View active policies
get_policy_recommendation — Best policy match for a return
list_returns       — List returns by status
```

**Endpoint:** `https://returns.greeknous.com/api/mcp`

## Pricing

| Plan | Price | Features |
|---|---|---|
| **Free** | $0 | 10 returns/month, basic policies, MCP read-only |
| **Growth** | $9.99/mo | Unlimited returns, auto-approve, fraud check, MCP full, email alerts |
| **Pro** | $29/mo | Everything + label generation, exchanges, analytics, SMS alerts |
| **Enterprise** | Custom | Multi-store, white-label, dedicated support, SLA |

## Supported Carriers

- **SendCloud** — PostNL, DHL, DPD (Europe)
- **Shippo** — UPS, FedEx, USPS (US/International)
- **EasyPost** — UPS, FedEx, USPS, DHL, DPD (Global)

---

[Install App →](https://apps.shopify.com)
[View Docs →](/guides/getting-started)