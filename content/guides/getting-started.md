---
title: Getting Started with Shopigent Returns
description: Install the app, configure billing, generate your MCP key, and connect AI agents.
---

## Installation

1. Install the app from the **Shopify App Store**
2. Authorize the required scopes (products, orders, customers, inventory, fulfillments, content, translations)
3. You'll be redirected to the Dashboard

## Step 1: Set Up Billing & Choose a Plan

Go to **Settings → Billing** to view available plans:

| Plan | Price | Tool Calls/Day | Features |
|------|-------|----------------|----------|
| **Free** | $0 | 25 | Read-only tools, audit log, dry-run preview |
| **Growth** | $9.99/mo | 500 | All tools including writes (edit products, orders, customers), confirmation gate, 7-day trial |
| **Pro** | $29/mo | Unlimited | Everything + translations, theme/Liquid editing, custom tools builder, priority execution, 7-day trial |

Click **Choose plan** next to your desired tier. You'll be redirected to Shopify's hosted pricing page to confirm. Paid plans include a 7-day free trial. Changes take effect immediately.

## Step 2: Generate an MCP Key

Go to **Settings → MCP Server** and click **Generate MCP Key**.

> ⚠️ **Save the key immediately** — it is only shown once. If lost, generate a new one from the same page.

Each store gets one active MCP API key at a time.

## Step 3: Connect Your AI Agent

Add the MCP server to your AI client's configuration:

### Claude Desktop

Add to `claude_desktop_config.json`:

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

### OpenAI Codex / Codex Desktop

```bash
codex --mcp-url https://returns.greeknous.com/api/mcp \
  --mcp-headers '{"Authorization":"Bearer YOUR_MCP_KEY"}'
```

### Cursor

Add in **Cursor Settings → MCP Servers**:

```json
{
  "shopigent-returns": {
    "url": "https://returns.greeknous.com/api/mcp",
    "headers": { "Authorization": "Bearer YOUR_MCP_KEY" }
  }
}
```

## Step 4: Confirmation Gate (Security)

All mutation tools that are marked as destructive or require a second check use the **confirmation gate**. The agent must:

1. Call the tool without `confirmed` — the server returns `status: "confirmation_pending"` with an HMAC-signed `confirmationToken`
2. Present the details to you (the human) for approval
3. Call the same tool again with `confirmed: true` and the `confirmationToken`

```
Agent calls: update_product({ id: "gid://shopify/Product/123", title: "New Title" })
Server responds: {
  status: "confirmation_pending",
  content: {
    message: "This action requires confirmation before it runs.",
    graphqlPreview: "...",
    variablesPreview: { ... },
    confirmationToken: "hmac..."
  }
}

You approve

Agent calls: update_product({
  id: "gid://shopify/Product/123",
  title: "New Title",
  confirmed: true,
  confirmationToken: "hmac..."
})
→ Status: "success" ✅
```

The token expires in **5 minutes** and is bound to the exact shop, tool, and arguments to prevent replay attacks.

## Step 5: Dry-Run Mode

Before executing any tool, you can preview the GraphQL call without side effects:

```
Call any tool with: dryRun: true
Server responds: {
  status: "dry_run",
  content: {
    graphqlPreview: "mutation ... { ... }",
    variablesPreview: { ... }
  }
}
```

This shows exactly what Shopify API call will be made, including the resolved arguments. Great for auditing before approval.

## Step 6: Custom Tools (Pro Plan)

Pro plan users can define their own tools via the **Custom Tools** page:

1. Go to **Settings → Custom Tools**
2. Write a GraphQL query or mutation
3. Define the input schema
4. Dry-run to validate
5. Activate — the tool is instantly available via MCP

## Available Tools

Shopigent comes with **72 curated tools** covering:

- **Products** — list, search, create, update, delete, metafields, variants, images, bulk price updates
- **Orders** — list, search, get, update, refund
- **Customers** — list, search, get, create, update
- **Collections** — list, get, create, update, delete, product membership
- **Discounts** — list, get, create, delete
- **Fulfillments** — list orders, get orders, close/open fulfillment orders
- **Content** — pages, blogs, articles (CRUD)
- **Themes** — list, get files, duplicate, publish, edit content/Liquid, manage translations
- **Store Info** — get shop details

## Next Steps

- Read the [MCP Usage Guide](/guides/mcp-usage) for detailed workflows
- See [Pricing](/pricing) for plan comparison
- View [Changelog](/changelog) for updates