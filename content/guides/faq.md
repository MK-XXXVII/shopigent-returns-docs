---
title: FAQ — Frequently Asked Questions
description: Common questions about Shopigent Returns, setup, billing, and troubleshooting.
---

## General

### What is Shopigent Returns?

Shopigent Returns is an AI-powered return management system for Shopify stores. It uses AI agents to automatically analyze, approve, refund, and detect fraud for customer returns — saving merchants 10+ hours per week.

### How is this different from other returns apps?

Unlike traditional returns apps (Loop, Returnly, AfterShip) that are workflow tools, Shopigent Returns has a **built-in AI agent** via MCP protocol. The agent can:

- Make autonomous decisions based on your policies
- Execute refunds in Shopify
- Detect fraud automatically
- Generate return labels
- Work with any MCP-compatible AI client (Claude Desktop, Codex, etc.)

### Is it secure?

Yes. All data is stored securely in your Railway Postgres database. The MCP server requires API key authentication. Refunds are executed using Shopify's Admin API with your store's offline access token.

## Setup

### How do I install the app?

1. Install from the Shopify App Store
2. Authorize the required scopes
3. Configure your policies in the Policies page
4. Generate an MCP key in Settings
5. Connect your AI agent (Claude, Codex, etc.)

### What Shopify scopes are needed?

- `read_orders`, `write_orders` — order processing and refunds
- `read_products`, `write_products` — product data and restocking
- `read_customers` — customer identification
- `read_fulfillments`, `write_fulfillments` — fulfillment tracking
- `read_inventory`, `write_inventory` — inventory management

### Can I try it before paying?

Yes! The Free plan includes up to 10 returns per month with basic policy features.

## MCP & AI Agent

### What is MCP?

MCP (Model Context Protocol) is an open standard for connecting AI agents to tools and data. Shopigent Returns exposes an MCP server that lets AI agents manage returns.

### Which AI agents are supported?

Any MCP-compatible client: **Claude Desktop**, **OpenAI Codex**, **Cursor**, **Grok**, and more.

### Can the agent refund orders?

Yes! The `approve_return` tool with a `refundAmount` executes the refund directly in Shopify using the Admin API.

### Can the agent generate labels?

Yes, with `approve_return(issueLabel: true)`. You need to configure a label provider first (SendCloud, Shippo, or EasyPost).

## Billing

### How much does it cost?

| Plan | Price | Features |
|---|---|---|
| Free | $0 | 10 returns/month, basic policies |
| Growth | $9.99/mo | Unlimited, auto-approve, fraud check |
| Pro | $29/mo | Labels, exchanges, analytics, SMS |
| Enterprise | Custom | Multi-store, white-label |

### Can I upgrade or downgrade?

Yes, at any time. Changes take effect immediately.

## Troubleshooting

### Why is my MCP connection failing?

1. Verify your API key is correct (Settings → MCP Server)
2. Make sure the Authorization header uses `Bearer YOUR_KEY`
3. Check that the endpoint URL is correct
4. Regenerate the key if it was exposed

### Why isn't the customer portal working?

The portal at `/return` is a public page — no login required. Customers enter their email to find their orders. If orders aren't showing, make sure:
- The store has unfulfilled orders
- The customer email matches an order email
- The app is installed and has an active session

### Why are refunds not executing?

Refunds require:
- A valid offline access token (reinstall the app if missing)
- `write_orders` scope enabled
- A real Shopify order (test orders with fake IDs won't work)

### How do I change my label provider?

Go to **Settings → Label Provider**, select your provider, enter credentials, and save. The AI agent will use the new provider for future labels.