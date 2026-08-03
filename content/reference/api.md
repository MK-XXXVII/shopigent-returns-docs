---
title: MCP API Reference
description: Complete documentation for all 7 MCP tools available via the Shopigent Returns MCP server.
---

## Overview

The MCP server follows the [Model Context Protocol](https://modelcontextprotocol.io) specification (2024-11-05). It's available at:

```
POST https://returns-app-production-8384.up.railway.app/api/mcp
Authorization: Bearer YOUR_MCP_KEY
Content-Type: application/json
```

## Tools

### analyze_return

Analyze a return request against store policies and fraud signals.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "analyze_return",
    "arguments": { "returnId": "uuid-here" }
  }
}
```

**Response:** Returns recommendation (approve/review), confidence score, policy match info, and reasoning.

### approve_return

Approve a pending return. Optionally executes refund and generates label.

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "approve_return",
    "arguments": {
      "returnId": "uuid-here",
      "refundAmount": 150.00,
      "issueLabel": true,
      "notes": "Approved by AI - matches standard policy"
    }
  }
}
```

### deny_return

Deny a pending return with a reason.

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "deny_return",
    "arguments": {
      "returnId": "uuid-here",
      "reason": "Outside 30-day return window"
    }
  }
}
```

### check_fraud

Run fraud detection on a return request. Checks:
- Return velocity (how many returns in last 30 days)
- Amount anomalies (high-value items)
- Customer history

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "check_fraud",
    "arguments": { "returnId": "uuid-here" }
  }
}
```

### list_policies

List all active return policies for the store.

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/call",
  "params": {
    "name": "list_policies",
    "arguments": {}
  }
}
```

### get_policy_recommendation

Get the best policy match for a return request.

```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "method": "tools/call",
  "params": {
    "name": "get_policy_recommendation",
    "arguments": { "returnId": "uuid-here" }
  }
}
```

### list_returns

List return requests, optionally filtered by status.

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/call",
  "params": {
    "name": "list_returns",
    "arguments": {
      "status": "PENDING",
      "limit": 10
    }
  }
}
```

## Error Handling

All errors follow JSON-RPC 2.0 format:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32602,
    "message": "Return not found"
  }
}
```

Common error codes:

| Code | Meaning |
|---|---|
| -32601 | Unknown tool/method |
| -32602 | Invalid params (e.g., return not found) |
| -32001 | Unauthorized (invalid API key) |
| -32600 | Invalid Request format |