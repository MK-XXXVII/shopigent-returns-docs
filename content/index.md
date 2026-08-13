---
title: Shopigent Returns — AI-Powered Shopify MCP Server
description: Connect AI agents to your Shopify store via MCP protocol. 72 curated tools, plan-based access, confirmation gate, custom tools builder, and full audit log.
---

**Your AI agent's gateway to Shopify.** Shopigent Returns is an MCP (Model Context Protocol) server that gives AI agents 72 curated tools to read, create, and manage your Shopify store — plus unlimited custom tools on the Pro plan.

## What Makes It Different

Unlike one-off scripts or limited integrations, Shopigent Returns provides a **complete MCP server** purpose-built for Shopify:

1. **72 curated tools** covering every major Shopify admin area — products, orders, customers, collections, discounts, fulfillment, themes, content, and translations
2. **Plan-based access** — Free (read-only), Growth (writes), Pro (premium + unlimited)
3. **Confirmation gate** — HMAC-signed tokens prevent dangerous mutations without human approval
4. **Dry-run mode** — Preview any GraphQL call before executing
5. **Custom tools (Pro)** — Write your own GraphQL tools from the dashboard
6. **Full audit log** — Every tool call logged with input, output, and latency

## Key Features

| Feature | What It Does |
|---------|-------------|
| **72 Curated Tools** | Products, orders, customers, collections, discounts, fulfillment, content, themes, translations — all via MCP |
| **Confirmation Gate** | Two-step HMAC-signed confirmation for mutations prevents accidental or malicious changes |
| **Dry-Run Mode** | Preview any GraphQL API call without side effects |
| **Plan-Based Access** | Free (read-only, 25 calls/day), Growth (writes, 500 calls/day), Pro (unlimited + premium) |
| **Custom Tools (Pro)** | Build your own GraphQL tools — define queries, schemas, and confirmation settings |
| **Audit Log** | Every tool call recorded — shop ID, tool key, input, status, Shopify response, latency |
| **Rate Limiting** | 60 calls/min per store + daily plan allowance (25/500/unlimited) |
| **Billing via Shopify** | Choose plans through Shopify's managed pricing page — 7-day free trial on paid plans |
| **Auto Token Refresh** | Expired Shopify access tokens are refreshed automatically |
| **Any MCP Client** | Works with Claude Desktop, Codex, Cursor, Grok, and all MCP-compatible tools |

## Product Catalog

### Products (17 tools)
List, search, get, create, update, delete — plus variants, metafields, images, and bulk price updates.

### Orders (5 tools)
List, search, get by ID, update, and process refunds with restocking options.

### Customers (5 tools)
List, search, get, create, and update with tags, notes, and contact info.

### Collections (9 tools)
Create, update, delete collections — manage product membership (add/remove products).

### Fulfillment (4 tools)
List fulfillment orders, get details, close and open fulfillment orders.

### Content (16 tools)
Full CRUD for pages, blogs, and articles including search and body HTML editing.

### Themes (9 tools)
List, duplicate, publish — edit theme content and Liquid files, manage theme assets, read and update translations.

### Discounts (4 tools)
Create percentage and fixed-amount discounts, list, get by ID, and delete.

### Translations (3 tools)
Get, set, and delete translations for any translatable resource in your store.

### Store Info (1 tool)
Get store name, email, URL, domain, currency, plan display name, and timezone.

## MCP Server

Endpoint: `https://returns.greeknous.com/api/mcp`

```json
{
  "mcpServers": {
    "shopigent-returns": {
      "type": "url",
      "url": "https://returns.greeknous.com/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_KEY"
      }
    }
  }
}
```

## Pricing

| Plan | Price | Daily Calls | Read Tools | Write Tools | Premium Tools | Custom Tools |
|------|-------|-------------|-----------|-------------|--------------|--------------|
| **Free** | $0 | 25 | ✅ | ❌ | ❌ | ❌ |
| **Growth** | $9.99/mo | 500 | ✅ | ✅ | ❌ | ❌ |
| **Pro** | $29/mo | Unlimited | ✅ | ✅ | ✅ | ✅ |
| **Enterprise** | Custom | Custom | ✅ | ✅ | ✅ | ✅ |

Paid plans include a **7-day free trial**. Billing is handled through Shopify's managed pricing.

## Confirmation Gate

All mutation tools go through a **two-step confirmation flow**:

1. Agent calls the tool → server returns `confirmation_pending` with an HMAC-signed token + GraphQL preview
2. You review and approve
3. Agent re-calls with `confirmed: true` + confirmation token → executes

Tokens expire in **5 minutes** and are cryptographically bound to the exact shop, tool, and arguments.

## Custom Tools (Pro)

Pro plan users can define their own GraphQL tools:

- Write any Shopify Admin API query or mutation
- Define the input schema (JSON Schema format)
- Set confirmation requirements
- Dry-run to validate before activating
- Custom tools appear instantly in the MCP tool list

---

[Install App →](https://apps.shopify.com)
[Getting Started →](/guides/getting-started)
[Pricing →](/pricing)