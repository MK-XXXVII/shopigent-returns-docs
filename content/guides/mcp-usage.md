---
title: MCP Usage Guide
description: Complete guide to using the MCP server with Claude Desktop, Codex, Cursor, and other AI agents.
---

## What is MCP?

MCP (Model Context Protocol) is an open standard that allows AI agents to connect to external tools. Shopigent Returns exposes 9 tools via MCP for AI-powered return management.

## Available Tools

| Tool | Description | Plan |
|---|---|---|
| `analyze_return` | Analyze a return against policies | Free |
| `check_fraud` | Run fraud detection checks | Free |
| `list_policies` | List active return policies | Free |
| `get_policy_recommendation` | Get policy match for a return | Free |
| `list_returns` | List returns by status | Free |
| `issue_confirmation_token` | Get HMAC token for destructive ops | Growth |
| `approve_return` | Approve and process refund | Growth |
| `deny_return` | Deny with reason | Growth |
| `exchange_return` | Create exchange with replacement item | Pro |

## Setup

1. Generate an MCP key from **Settings** → **MCP Server**
2. Configure your AI agent with the endpoint and key

### Claude Desktop

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

### Codex Desktop

```
Type: Streamable HTTP
URL: https://returns.greeknous.com/api/mcp
Headers:
  Authorization: Bearer YOUR_MCP_KEY
```

## Confirmation Gate

For security, destructive operations require a two-step confirmation:

### Step 1: Issue a token

```json
{
  "method": "tools/call",
  "params": {
    "name": "issue_confirmation_token",
    "arguments": {
      "action": "approve_return",
      "returnId": "abc-123",
      "args": { "returnId": "abc-123", "issueLabel": false }
    }
  }
}
```

**Response:**
```json
{
  "confirmationToken": "eyJkYX...",
  "expiresInMs": 300000
}
```

### Step 2: Use the token

```json
{
  "method": "tools/call",
  "params": {
    "name": "approve_return",
    "arguments": {
      "returnId": "abc-123",
      "confirmationToken": "eyJkYX...",
      "issueLabel": false
    }
  }
}
```

Tokens expire in 5 minutes and are bound to specific arguments (replay protection).

## Example Workflows

### Auto-approve eligible returns

```
1. list_returns(status: "PENDING")
2. analyze_return(returnId) for each
3. issue_confirmation_token(action: "approve_return", ...)
4. approve_return(returnId, confirmationToken, issueLabel: true)
```

### Fraud investigation

```
1. list_returns(status: "PENDING")
2. check_fraud(returnId) for each
3. Flag high-risk returns for manual review
```

### Exchange workflow

```
1. list_returns(status: "PENDING")
2. issue_confirmation_token(action: "exchange_return", ...)
3. exchange_return(returnId, replacementVariantId, confirmationToken)
```

## Rate Limits

| Period | Limit |
|---|---|
| Per minute | 60 calls |
| Per day | 1,000 calls |

## Plan Limits

| Plan | Daily Calls | Write Access |
|---|---|---|
| Free | 10 returns/month | Read-only |
| Growth | Unlimited | Approve/deny/refund |
| Pro | Unlimited | Exchange + labels