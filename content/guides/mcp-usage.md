---
title: MCP Usage Guide
description: Complete guide to using the MCP server with Claude Desktop, Codex, Cursor, and other AI agents.
---

## What is MCP?

MCP (Model Context Protocol) is an open standard that lets AI agents connect to external tools and data sources. Shopigent Returns exposes an MCP server with **72 curated tools** for managing your Shopify store — plus unlimited custom tools on the Pro plan.

## Quick Start

### Step 1: Generate an API Key

1. Open the Shopigent Returns app in Shopify admin
2. Go to **Settings → MCP Server**
3. Click **Generate MCP Key**
4. **Save the key** — it will only be shown once!

### Step 2: Connect Your AI Agent

#### Claude Desktop

Edit `claude_desktop_config.json`:

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

#### OpenAI Codex / Codex Desktop

```bash
codex --mcp-url https://returns.greeknous.com/api/mcp \
  --mcp-headers '{"Authorization":"Bearer YOUR_MCP_KEY"}'
```

#### Cursor

Add in **Cursor Settings → MCP Servers**:

```json
{
  "shopigent-returns": {
    "url": "https://returns.greeknous.com/api/mcp",
    "headers": { "Authorization": "Bearer YOUR_MCP_KEY" }
  }
}
```

## Plan Tiers & Access

Your plan determines what tools are available and how many calls you can make per day:

| Plan | Read Tools | Write Tools | Premium Tools | Daily Limit |
|------|-----------|------------|---------------|-------------|
| **Free** | ✅ | ❌ | ❌ | 25 calls/day |
| **Growth** | ✅ | ✅ | ❌ | 500 calls/day |
| **Pro** | ✅ | ✅ | ✅ | Unlimited |

**Premium tools** (Pro only): translations (`set_translations`, `get_translations`, `delete_translations`), theme content editing (`update_theme_content`, `update_theme_file`, `update_theme_translations`), theme publishing (`duplicate_theme`, `publish_theme`).

If a tool is blocked by your plan, the server returns:

```json
{
  "status": "error",
  "content": {
    "message": "Write operations require a paid plan (Growth or higher). Upgrade to enable create/edit/delete tools.",
    "upgradeRequired": true
  }
}
```

## Confirmation Gate

**All mutation tools that require confirmation need a two-step process.** This is a security layer that prevents accidental or destructive executions:

1. **First call** — Call the tool without `confirmed`. The server returns:
   - `status: "confirmation_pending"`
   - A `confirmationToken` (HMAC-signed, bound to shop + tool + args)
   - A preview of the GraphQL query and variables

2. **You approve** — Present the details to a human

3. **Second call** — Call the same tool with `confirmed: true` and the `confirmationToken`

### Example

```
Agent calls (step 1):
  update_product({ id: "gid://shopify/Product/123", title: "New Title" })
  → Status: "confirmation_pending"
     confirmationToken: "hmac_signature_here"
     graphqlPreview: "mutation { ... }"

Human approves

Agent calls (step 2):
  update_product({
    id: "gid://shopify/Product/123",
    title: "New Title",
    confirmed: true,
    confirmationToken: "hmac_signature_here"
  })
  → Status: "success"
```

The token expires in **5 minutes** and is tied to the exact shop, tool, and arguments. A token for approving one order cannot be replayed against a different order.

## Dry-Run Mode

Any tool can be called in dry-run mode to preview the Shopify API call without executing it:

```
Call: update_product({ id: "...", title: "Test", dryRun: true })
Response: {
  status: "dry_run",
  content: {
    graphqlPreview: "mutation UpdateProduct($input: ProductInput!) { ... }",
    variablesPreview: { input: { id: "...", title: "Test" } }
  }
}
```

Useful for:
- Auditing what changes an agent proposes before approving
- Testing custom tools before activation
- Understanding the exact Shopify API call shape

## Example Workflows

### Workflow 1: Get store info and list recent orders

Ask your AI agent:

> "Show me my store info and the last 5 orders."

The agent will:
1. `get_store_info()` — get shop details
2. `list_orders(first: 5)` — list recent orders
3. Summarize the results

### Workflow 2: Product management

> "Update the title of product 123 to 'Summer Sale Tee' and reduce its price to $19.99."

The agent will:
1. `get_product_by_id(id: "gid://shopify/Product/123")` — check current state
2. `update_product({ id: "gid://shopify/Product/123", title: "Summer Sale Tee" })` — update title (confirmation gate if enabled)
3. `update_product_variant_price({ variantId: "...", price: "19.99" })` — update price (confirmation gate if enabled)

### Workflow 3: Customer lookup and update

> "Find customer John Smith and add a note about his recent issue."

The agent will:
1. `search_customers(query: "John Smith")` — find the customer
2. `get_customer(id: "gid://shopify/Customer/...")` — check details
3. `update_customer({ id: "gid://shopify/Customer/...", note: "Recent issue resolved" })` — update with confirmation gate

### Workflow 4: Order refund

> "Refund order #1234 for the full amount."

The agent will:
1. `get_order(id: "gid://shopify/Order/...")` — get order details
2. `refund_order({ orderId: "...", amount: 50.00, restock: true })` — execute refund (confirmation gate)

### Workflow 5: Collection management

> "Create a new 'Summer Collection' and add products from search results."

The agent will:
1. `search_products(query: "summer")` — find matching products
2. `create_collection({ title: "Summer Collection", ruleSet: { ... } })` — create collection
3. `add_products_to_collection({ productId: "...", collectionIds: ["..."] })` — add products

### Workflow 6: Custom tool (Pro)

> "Using my custom 'bulk_tag_products' tool, tag all active products with 'spring-2026'."

The agent will:
1. `list_products(first: 250)` — get products
2. Call your custom tool as defined

## Plan Entitlement Summary

| Capability | Free | Growth | Pro |
|------------|------|--------|-----|
| Read tools (queries) | ✅ | ✅ | ✅ |
| Write tools (mutations) | ❌ | ✅ | ✅ |
| Confirmation gate | — | ✅ | ✅ |
| Audit log | ✅ | ✅ | ✅ |
| Dry-run mode | ✅ | ✅ | ✅ |
| Custom tools | ❌ | ❌ | ✅ |
| Translations | ❌ | ❌ | ✅ |
| Theme content editing | ❌ | ❌ | ✅ |
| Theme publish/duplicate | ❌ | ❌ | ✅ |
| Daily calls | 25 | 500 | Unlimited |

## Tool Reference

Shopigent Returns ships **72 curated tools** across these categories:

### Products (17 tools)
`list_products`, `search_products`, `get_product_by_id`, `create_product`, `update_product`, `delete_product`, `create_product_variant`, `update_product_variant`, `update_product_variant_price`, `bulk_update_prices`, `get_product_metafields`, `set_product_metafields`, `update_product_images`, `update_collection_image`, `update_article_image`

### Orders (5 tools)
`list_orders` (x2 variants), `get_order`, `update_order`, `refund_order`, `search_orders`

### Customers (4 tools)
`list_customers`, `get_customer`, `update_customer`, `create_customer`, `search_customers`

### Collections (9 tools)
`list_collections`, `get_collection_by_id`, `create_collection`, `update_collection`, `delete_collection`, `add_products_to_collection`, `remove_products_from_collection`

### Content: Pages (4 tools)
`list_pages`, `get_page_by_id`, `create_page`, `update_page`, `delete_page`

### Content: Blogs & Articles (12 tools)
`list_blogs`, `get_blog_by_id`, `create_blog`, `update_blog`, `delete_blog`, `list_articles`, `get_article_by_id`, `create_article`, `update_article`, `delete_article`

### Themes (9 tools)
`list_themes`, `get_theme_file`, `duplicate_theme`, `publish_theme`, `update_theme_content`, `update_theme_file`, `upload_theme_asset`, `get_theme_translations`, `update_theme_translations`

### Discounts (4 tools)
`list_discounts`, `get_discount`, `create_discount`, `delete_discount`

### Fulfillment (4 tools)
`list_fulfillment_orders`, `get_fulfillment_order`, `close_fulfillment_order`, `open_fulfillment_order`

### Inventory (1 tool)
`update_inventory_quantity`

### Translations (3 tools)
`get_translations`, `set_translations`, `delete_translations`

### Store Info (1 tool)
`get_store_info`

> **Note:** Pro plan users can also create unlimited **custom tools** via the Custom Tools builder in the Shopify admin dashboard.

## Rate Limits

| Limit | Value |
|-------|-------|
| Per-minute rate | 60 calls per minute per store |
| Per-day allowance | Varies by plan (25/500/unlimited) |
| Retry | `retryAfterSeconds` returned on rate-limit errors |

## Tips

- **Confirmation gate:** Mutation tools return `confirmation_pending` on first call. Present the GraphQL preview to the human, then re-call with `confirmed: true` and the token
- **Dry-run:** Add `dryRun: true` to any call to preview without side effects
- **Custom tools (Pro):** Build your own GraphQL tools in the dashboard — they appear instantly in the tool list
- **Audit log:** Every tool call is logged with input, output, latency, and client info
- **Upgrade prompt:** If a tool returns `upgradeRequired: true`, the shop's plan doesn't cover it