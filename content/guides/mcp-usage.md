---
title: MCP Usage Guide
description: Complete guide to using the MCP server with Claude Desktop, Codex, Cursor, and other AI agents.
---

## What is MCP?

MCP (Model Context Protocol) is an open standard that lets AI agents connect to external tools and data sources. Shopigent Returns exposes an MCP server with 7 tools for managing returns.

## Quick Start

### Step 1: Generate an API Key

1. Open the Shopigent Returns app in Shopify admin
2. Go to **Settings**
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
      "url": "https://returns-app-production-8384.up.railway.app/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_KEY"
      }
    }
  }
}
```

#### GitHub Codex

```bash
codex --mcp-url https://returns-app-production-8384.up.railway.app/api/mcp \
  --mcp-headers '{"Authorization":"Bearer YOUR_MCP_KEY"}'
```

#### Cursor

Add in Cursor settings → MCP Servers:

```json
{
  "shopigent-returns": {
    "url": "https://returns-app-production-8384.up.railway.app/api/mcp",
    "headers": { "Authorization": "Bearer YOUR_MCP_KEY" }
  }
}
```

## Example Workflows

### Workflow 1: Auto-resolve a return

Ask your AI agent:

> "Check for any pending returns and resolve them according to store policy."

The agent will:
1. `list_returns(status: "PENDING")` — find pending returns
2. `analyze_return(returnId)` — check each against policies
3. `approve_return(returnId)` — approve eligible ones (auto-refund)
4. `deny_return(returnId, reason)` — deny ineligible ones

### Workflow 2: Fraud investigation

> "Run fraud checks on all pending returns and flag suspicious ones."

The agent will:
1. List pending returns
2. `check_fraud(returnId)` — run fraud detection on each
3. Report high-risk returns with risk scores

### Workflow 3: Policy audit

> "Show me my current policies and recommend improvements."

The agent will:
1. `list_policies()` — show all active policies
2. `list_returns()` — show recent return data
3. Suggest policy adjustments based on actual return patterns

### Workflow 4: Customer support

> "Customer Maria from order #BZ-2026010 wants to return a jacket. What should we do?"

The agent will:
1. `list_returns(status: "PENDING")` — find Maria's return
2. `analyze_return(returnId)` — evaluate against policies
3. Explain the decision: approve/deny/review

## Tool Reference

| Tool | Purpose |
|---|---|
| `analyze_return` | Evaluate return against policies, get recommendation |
| `approve_return` | Approve return + execute refund + generate label |
| `deny_return` | Deny return with reason |
| `check_fraud` | Run fraud detection (velocity, amount, history) |
| `list_policies` | View active policies |
| `get_policy_recommendation` | Find best policy match for a return |
| `list_returns` | List returns by status |

## Tips

- **Batch processing:** Ask the agent to process ALL pending returns at once
- **Scheduled checks:** Use cron + MCP to check for new returns daily
- **Refunds:** `approve_return` with `refundAmount` executes the refund in Shopify
- **Labels:** `approve_return` with `issueLabel: true` generates a return label