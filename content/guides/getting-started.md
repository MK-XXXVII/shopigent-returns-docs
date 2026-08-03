---
title: Getting Started with Shopigent Returns
description: Install the app, configure your first policy, and connect AI agents.
---

## Installation

1. Install the app from the Shopify App Store
2. Authorize the required scopes (orders, products, customers, fulfillments, inventory)
3. You'll be redirected to the Dashboard

## Step 1: Set Up Policies

Policies define how returns are handled. Go to **Policies** and create your first one:

```
Name: Standard 30-day return
Max Days: 30
Max Amount: $200
Auto-approve: ✅
Restocking Fee: 0%
```

Orders under $200 within 30 days will be auto-approved by the AI agent.

## Step 2: Configure MCP

Go to **Settings → Generate MCP Key** to get your API key for AI agents.

### Connect Claude Desktop

In Claude Desktop, add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "shopigent-returns": {
      "type": "url",
      "url": "https://returns-app-production-8384.up.railway.app/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_KEY"
      }
    }
  }
}
```

### Connect GitHub Codex

Pass the MCP key and endpoint when configuring Codex:

```
--mcp-url https://returns-app-production-8384.up.railway.app/api/mcp
--mcp-headers '{"Authorization":"Bearer YOUR_MCP_KEY"}'
```

## Step 3: Customer Portal

Share the return portal with your customers:

```
https://returns-app-production-8384.up.railway.app/return
```

Customers enter their email, select their order, choose items to return, and submit. The AI agent handles the rest.

## Step 4: Configure Email

Emails are sent automatically when returns are approved or denied. No setup needed — we use our VPS mail relay.

## Step 5: Configure Labels (Optional)

Set your label provider via Railway variables:

- `LABEL_PROVIDER=sendcloud` + `SENDCLOUD_API_KEY` + `SENDCLOUD_API_SECRET`
- or `LABEL_PROVIDER=shippo` + `SHIPPO_API_KEY`
- or `LABEL_PROVIDER=easypost` + `EASYPOST_API_KEY`

## Next Steps

- Read the [API Reference](/reference/api) for MCP tool details
- Check [Pricing](/pricing) for plans
- View [Changelog](/changelog) for updates