---
title: FAQ — Frequently Asked Questions
description: Common questions about Shopigent Returns, setup, billing, plans, confirmation gate, and custom tools.
---

## General

### What is Shopigent Returns?

Shopigent Returns is an MCP (Model Context Protocol) server for Shopify — it exposes **72 curated tools** that AI agents can use to read, create, and manage your Shopify store. Connect any MCP-compatible AI client (Claude Desktop, Codex, Cursor) and let your agents manage products, orders, customers, collections, themes, content, and more.

### How is this different from other Shopify MCP tools?

Unlike one-off MCP integrations, Shopigent provides:

- **72 pre-built, curated tools** covering all major Shopify admin areas
- **Plan-based access control** — Free (read-only), Growth (writes), Pro (premium features)
- **Confirmation gate** — HMAC-signed tokens prevent dangerous mutations without human approval
- **Dry-run mode** — Preview any GraphQL call before executing
- **Custom tools (Pro)** — Write your own GraphQL tools directly from the dashboard
- **Full audit log** — Every tool call is logged with input, output, latency, and client

### Is it secure?

Yes. All data stays in your Railway Postgres database. The MCP server requires API key authentication. Destructive operations go through the confirmation gate — a two-step flow with HMAC-signed tokens that expire in 5 minutes. Tokens are bound to the exact shop, tool, and arguments so they cannot be replayed across different operations.

## Setup

### How do I install the app?

1. Install from the Shopify App Store
2. Authorize the required scopes
3. Choose a plan in **Settings → Billing** (Free plan available)
4. Generate an MCP key in **Settings → MCP Server**
5. Connect your AI agent (Claude Desktop, Codex, Cursor)

### What Shopify scopes are needed?

- `read_products`, `write_products` — product creation and management
- `read_orders`, `write_orders` — order processing and refunds
- `read_customers`, `write_customers` — customer management
- `read_inventory`, `write_inventory` — inventory management
- `read_fulfillments`, `write_fulfillments` — fulfillment tracking
- `read_content`, `write_content` — pages, blogs, articles
- `read_themes`, `write_themes` — theme management and content editing
- `read_translations`, `write_translations` — translation management

### Can I try it before paying?

Yes! The **Free plan** includes read-only access to all 72 tools with up to **25 tool calls per day** — no credit card required. Upgrade to Growth or Pro when you need write capabilities.

## Plans & Billing

### What plans are available?

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | 72 read-only tools, 25 calls/day, audit log, dry-run |
| **Growth** | $9.99/mo | All write tools, 500 calls/day, confirmation gate, 7-day trial |
| **Pro** | $29/mo | Everything + unlimited calls, translations, theme editing, custom tools, 7-day trial |
| **Enterprise** | Custom | Multi-store, dedicated support, SLA |

### What does each plan include?

**Free:** You can browse your store, list products and orders, search customers, check inventory — but you cannot create, update, or delete anything. Limited to 25 calls per day.

**Growth:** Full read+write access to all standard tools. Create and update products, process orders, manage customers and discounts, handle fulfillments. Confirmation gate protects destructive operations. 500 calls per day.

**Pro:** Everything in Growth, plus unlimited calls, translations management (get/set/delete), theme content/Liquid editing, theme duplication and publishing, and the **custom tools builder** so you can add your own GraphQL tools.

### How do I upgrade or downgrade?

Go to **Settings → Billing**, click **Choose plan** for your desired tier. You'll be redirected to Shopify's hosted pricing page to confirm. Paid plans include a **7-day free trial**.

### How does billing work?

Billing is handled entirely through Shopify's managed pricing. When you choose a plan, you're redirected to Shopify's pricing page where you approve the charge. Shopify fires an `app_subscriptions/update` webhook to reconcile your plan in our system. You manage payments and invoices through your Shopify admin.

### Can I cancel?

Yes. Cancel through Shopify's billing page or uninstall the app. Your plan will remain active until the end of the current billing cycle.

## MCP & AI Agent

### What is MCP?

MCP (Model Context Protocol) is an open standard for connecting AI agents to external tools and data sources. Shopigent Returns exposes an MCP server at `https://returns.greeknous.com/api/mcp` that lets AI agents manage your Shopify store.

### Which AI agents are supported?

Any MCP-compatible client: **Claude Desktop**, **OpenAI Codex**, **Cursor**, **Grok**, and any other tool that implements the MCP client spec.

### How many tools are available?

**72 curated tools** across products, orders, customers, collections, discounts, fulfillment, content, themes, translations, and store info. Plus unlimited **custom tools** on the Pro plan.

### What is the confirmation gate?

The confirmation gate is a security layer for mutation (write) tools. When an agent calls a tool that requires confirmation, the server doesn't execute it immediately — instead it returns a `confirmation_pending` status with a preview of the GraphQL call and an HMAC-signed token. A human must approve, then the agent re-calls with `confirmed: true` and the token. This prevents accidental or malicious modifications.

[Full guide →](/guides/mcp-usage/#confirmation-gate)

### What is dry-run mode?

Any tool can be called with `dryRun: true` to preview the exact Shopify API call that would be made, without actually executing it. The response includes the full GraphQL query and resolved variable values. Great for auditing agent proposals.

### Can I add my own custom tools?

Yes — on the **Pro plan**, go to **Settings → Custom Tools** to build your own GraphQL tools. Define the query/mutation, input schema, and confirmation settings. Your custom tools appear instantly in the MCP `tools/list` response alongside curated tools.

## Confirmation Gate

### Why does the agent need two calls for mutations?

The two-step confirmation gate protects your store from unintended changes. The agent:
1. Calls the tool → receives a `confirmation_pending` response with a token and GraphQL preview
2. Presents the preview to you
3. Calls again with `confirmed: true` and the token → executes

This ensures no write operation happens without informed human approval.

### How long is the confirmation token valid?

5 minutes. After that, the agent must re-request confirmation.

### Can a token be reused for a different operation?

No. Each token is cryptographically bound to the specific shop, tool, and arguments (hash of the resolved args). A token for approving one order cannot be replayed against a different order or a different tool.

## Troubleshooting

### Why is my MCP connection failing?

1. Verify your API key is correct (Settings → MCP Server)
2. Make sure the `Authorization` header uses `Bearer YOUR_KEY`
3. Check that the endpoint URL is `https://returns.greeknous.com/api/mcp`
4. Regenerate the key if it was exposed or lost

### Why am I getting "upgradeRequired" errors?

This means the tool you're trying to use is not available on your current plan:
- **Free plan** can only read data — mutation tools return `upgradeRequired: true`
- **Growth plan** covers all standard mutations but premium tools (translations, theme editing) require **Pro**
- Upgrade in **Settings → Billing**

### Why am I hitting rate limits?

The per-minute rate limit is **60 calls/minute**. If exceeded, the server returns `retryAfterSeconds` — wait that long before retrying. The per-day allowance depends on your plan:

| Plan | Daily Limit |
|------|-------------|
| Free | 25 calls/day |
| Growth | 500 calls/day |
| Pro | Unlimited |

### How do I see what my AI agent has done?

Every tool call is logged in the **audit log** with:
- Tool key and operation type
- Input payload (the arguments)
- Status (success, error, dry_run, confirmation_pending, confirmation_denied)
- Shopify API response summary
- Latency
- Requesting client info

### How do I regenerate my MCP key?

Go to **Settings → MCP Server** and click **Generate MCP Key**. The old key is immediately revoked. Save the new key — it's shown only once.

### The tool says "confirmation_denied" — what happened?

The confirmation token was invalid or expired. Common causes:
- Token expired (5-minute TTL)
- Token was regenerated between the agent's two calls
- The agent's second call passed different arguments than the first (args must match exactly)
- The token signature didn't match (could indicate tampering)