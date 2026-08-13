---
title: MCP API Reference
description: Complete documentation for all 9 MCP tools available via the Shopigent Returns MCP server.
---

## Overview

The MCP server follows the [Model Context Protocol](https://modelcontextprotocol.io) specification (2024-11-05). It's available at:

```
POST https://returns.greeknous.com/api/mcp
Authorization: Bearer ***
Content-Type: application/json
```

### Plan-Based Access

Access to tools is gated by the store's subscription plan:

| Plan    | Read-Only Tools              | Read-Write Tools                                        |
|---------|------------------------------|---------------------------------------------------------|
| **Free**  | `analyze_return`, `check_fraud`, `list_policies`, `get_policy_recommendation`, `list_returns` | — *(10 returns/month limit)* |
| **Growth** | Same as Free               | `issue_confirmation_token`, `approve_return`, `deny_return` |
| **Pro**   | Same as Growth              | `exchange_return` *(plus all Growth features)* |

**Free** plan stores can only use read-only tools (analyze, list, check). Returns are capped at 10 per month.

**Growth** adds the ability to approve, deny, and process refunds — but requires a confirmation token workflow for safety.

**Pro** adds exchange orders (variant replacement via draft order) and return label generation.

### Confirmation Token Workflow

Destructive actions (`approve_return`, `deny_return`) require a two-step confirmation:

1. Call `issue_confirmation_token` with the exact arguments you intend to use.
2. Pass the returned `confirmationToken` in the subsequent `approve_return` or `deny_return` call.

The token is HMAC-signed, expires in 5 minutes, and is bound to both the return ID and the exact arguments — replay attacks are prevented.

---

## Tools

### analyze_return

Analyze a return request against store policies and fraud signals. Returns a recommendation (`approve`/`review`) with confidence score and reasoning.

**Request:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "analyze_return",
    "arguments": {
      "returnId": "cm3d1a2b3c4d5e6f7g8h9i0j"
    }
  }
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"returnId\": \"cm3d1a2b3c4d5e6f7g8h9i0j\",\n  \"orderName\": \"#1001\",\n  \"customerName\": \"Jane Doe\",\n  \"totalAmount\": 89.99,\n  \"daysSinceOrder\": 12,\n  \"policyMatch\": {\n    \"name\": \"Standard 30-Day Returns\",\n    \"maxDays\": 30,\n    \"maxAmount\": 9999,\n    \"autoApprove\": true,\n    \"restockingFee\": 0\n  },\n  \"recommendation\": \"approve\",\n  \"confidence\": 0.9,\n  \"reasoning\": \"Order matches \\\"Standard 30-Day Returns\\\": 12 days (≤30), $89.99 (≤$9999), auto-approve enabled\"\n}"
      }
    ]
  }
}
```

**Input Schema:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `returnId` | `string` | ✅ | The return request UUID |

**Plan:** Free ✅

---

### issue_confirmation_token

Issue an HMAC-signed confirmation token for a destructive operation. **Must be called first** — the returned token is then passed to `approve_return` or `deny_return`. Token expires in 5 minutes (300,000 ms).

**Request:**

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "issue_confirmation_token",
    "arguments": {
      "action": "approve_return",
      "returnId": "cm3d1a2b3c4d5e6f7g8h9i0j",
      "args": {
        "refundAmount": 89.99,
        "storeCredit": false,
        "returnedItems": ["item-id-1", "item-id-2"],
        "issueLabel": true,
        "notes": "Approved by AI — matches standard policy"
      }
    }
  }
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"confirmationToken\": \"eyJkYXRhIjoie1wic2hvcFwiOlw...\",\n  \"expiresInMs\": 300000,\n  \"message\": \"Include this token as `confirmationToken` in your approve_return or deny_return call.\"\n}"
      }
    ]
  }
}
```

**Input Schema:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | `"approve_return"` \| `"deny_return"` | ✅ | Which action to authorize |
| `returnId` | `string` | ✅ | The return request UUID |
| `args` | `object` | ✅ | The exact arguments you'll pass to `approve_return` or `deny_return` |

> **Important:** The `args` object must match **exactly** what you will pass to the subsequent tool call — the HMAC hash is computed over these args. Any mismatch will cause verification to fail.

**Plan:** Growth+

---

### approve_return

Approve a pending return request. Processes a financial refund (or store credit) via Shopify, optionally generates a return label, and sends an email notification. **Requires a confirmation token** from `issue_confirmation_token`.

**Request:**

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "approve_return",
    "arguments": {
      "returnId": "cm3d1a2b3c4d5e6f7g8h9i0j",
      "confirmationToken": "eyJkYXRhIjoie1wic2hvcFwiOlw...",
      "refundAmount": 89.99,
      "issueLabel": true,
      "storeCredit": false,
      "returnedItems": ["item-id-1", "item-id-2"],
      "notes": "Approved by AI — matches standard policy"
    }
  }
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"success\": true,\n  \"status\": \"REFUNDED\",\n  \"returnId\": \"cm3d1a2b3c4d5e6f7g8h9i0j\",\n  \"refundExecuted\": true,\n  \"refundId\": \"gid://shopify/Refund/1234567890\",\n  \"refundError\": null,\n  \"storeCreditExecuted\": false,\n  \"storeCreditCode\": null,\n  \"storeCreditError\": null\n}"
      }
    ]
  }
}
```

**Input Schema:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `returnId` | `string` | ✅ | The return request UUID |
| `confirmationToken` | `string` | ✅ | HMAC-signed token from `issue_confirmation_token` |
| `refundAmount` | `number` | ❌ | Optional override refund amount (defaults to sum of item prices) |
| `issueLabel` | `boolean` | ❌ | Whether to generate a return shipping label (requires Pro plan label provider config) |
| `storeCredit` | `boolean` | ❌ | If `true`, issue a store credit discount code instead of processing a refund |
| `returnedItems` | `string[]` | ❌ | Partial refund — only refund these item IDs/variant IDs. If omitted, all items are refunded |
| `notes` | `string` | ❌ | Internal notes about the decision |

**Plan:** Growth+

---

### deny_return

Deny a pending return request with a reason. Sends a denial email to the customer. **Requires a confirmation token.**

**Request:**

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "deny_return",
    "arguments": {
      "returnId": "cm3d1a2b3c4d5e6f7g8h9i0j",
      "reason": "Outside 30-day return window — order was placed 45 days ago",
      "confirmationToken": "eyJkYXRhIjoie1wic2hvcFwiOlw..."
    }
  }
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"success\": true,\n  \"status\": \"DENIED\",\n  \"returnId\": \"cm3d1a2b3c4d5e6f7g8h9i0j\"\n}"
      }
    ]
  }
}
```

**Input Schema:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `returnId` | `string` | ✅ | The return request UUID |
| `reason` | `string` | ✅ | Reason for denial |
| `confirmationToken` | `string` | ✅ | HMAC-signed token from `issue_confirmation_token` |

**Plan:** Growth+

---

### check_fraud

Run fraud detection signals on a return request. Checks:
- **High-value anomalies** — items totalling > $1,000
- **Return velocity** — how many returns the customer has filed in the last 30 days
- **Custom merchant-configured rules** — blocked countries, max return value, max returns per window, suspicious email domains
- **Optional country filter** — evaluate geo-blocking rules when a customer country is provided

**Request:**

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/call",
  "params": {
    "name": "check_fraud",
    "arguments": {
      "returnId": "cm3d1a2b3c4d5e6f7g8h9i0j",
      "customerCountry": "GR"
    }
  }
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"returnId\": \"cm3d1a2b3c4d5e6f7g8h9i0j\",\n  \"riskLevel\": \"low\",\n  \"riskScore\": 0,\n  \"signals\": [],\n  \"customRulesApplied\": true\n}"
      }
    ]
  }
}
```

**Response with detected signals:**

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"returnId\": \"cm3d1a2b3c4d5e6f7g8h9i0j\",\n  \"riskLevel\": \"medium\",\n  \"riskScore\": 0.5,\n  \"signals\": [\n    { \"signal\": \"frequent_returner\", \"score\": 0.5, \"details\": { \"returnsIn30Days\": 5 } },\n    { \"signal\": \"high_value_return\", \"score\": 0.3, \"details\": { \"amount\": 1500 } }\n  ],\n  \"customRulesApplied\": true\n}"
      }
    ]
  }
}
```

**Input Schema:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `returnId` | `string` | ✅ | The return request UUID |
| `customerCountry` | `string` | ❌ | ISO 3166-1 alpha-2 country code (e.g. `"US"`, `"RU"`). Used for merchant-configured geo-blocking rule evaluation |

**Plan:** Free ✅

---

### exchange_return

Create an exchange order for a pending return. Creates a Shopify draft order for the replacement variant at no charge (100% discount). The return status is updated to `EXCHANGE`. **Requires Pro plan.**

**Request:**

```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "method": "tools/call",
  "params": {
    "name": "exchange_return",
    "arguments": {
      "returnId": "cm3d1a2b3c4d5e6f7g8h9i0j",
      "replacementVariantId": "gid://shopify/ProductVariant/9876543210",
      "replacementQuantity": 1,
      "notes": "Size exchange: Medium → Large"
    }
  }
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"success\": true,\n  \"status\": \"EXCHANGE\",\n  \"returnId\": \"cm3d1a2b3c4d5e6f7g8h9i0j\",\n  \"draftOrderId\": \"gid://shopify/DraftOrder/123456789\",\n  \"message\": \"Exchange order created. The replacement item draft order has been created at no charge.\"\n}"
      }
    ]
  }
}
```

**Input Schema:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `returnId` | `string` | ✅ | The return request UUID |
| `replacementVariantId` | `string` | ✅ | Shopify GID of the replacement variant (e.g. `gid://shopify/ProductVariant/123`) |
| `replacementQuantity` | `number` | ❌ | Quantity of replacement items (default: 1) |
| `notes` | `string` | ❌ | Internal notes about the exchange reason |

> **Note:** The return must be in `PENDING` or `EXCHANGE` status. Exchanges create a free draft order — no payment is captured.

**Plan:** Pro

---

### list_policies

List all active return policies for the store, ordered by priority.

**Request:**

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/call",
  "params": {
    "name": "list_policies",
    "arguments": {}
  }
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"policies\": [\n    {\n      \"id\": \"cm1a2b3c4d5e6f7g8h9i0j1k\",\n      \"name\": \"Standard 30-Day Returns\",\n      \"description\": \"Full refund within 30 days of purchase\",\n      \"priority\": 1,\n      \"conditions\": [\n        { \"field\": \"maxDays\", \"value\": 30 },\n        { \"field\": \"maxAmount\", \"value\": 9999 },\n        { \"field\": \"autoApprove\", \"value\": true },\n        { \"field\": \"restockingFee\", \"value\": 0 }\n      ]\n    },\n    {\n      \"id\": \"cm2b3c4d5e6f7g8h9i0j1k2l\",\n      \"name\": \"High-Value Review\",\n      \"description\": \"Items over $500 require manual review\",\n      \"priority\": 2,\n      \"conditions\": [\n        { \"field\": \"maxDays\", \"value\": 60 },\n        { \"field\": \"maxAmount\", \"value\": 500 },\n        { \"field\": \"autoApprove\", \"value\": false }\n      ]\n    }\n  ]\n}"
      }
    ]
  }
}
```

**Input Schema:**

No arguments required.

**Plan:** Free ✅

---

### get_policy_recommendation

Get the best policy match for a return request. Evaluates the return against all active policies (ordered by priority) and returns the first match along with contextual data.

**Request:**

```json
{
  "jsonrpc": "2.0",
  "id": 8,
  "method": "tools/call",
  "params": {
    "name": "get_policy_recommendation",
    "arguments": {
      "returnId": "cm3d1a2b3c4d5e6f7g8h9i0j"
    }
  }
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 8,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"totalAmount\": 89.99,\n  \"daysSinceOrder\": 12,\n  \"bestMatch\": {\n    \"name\": \"Standard 30-Day Returns\",\n    \"conditions\": [\n      { \"field\": \"maxDays\", \"value\": 30 },\n      { \"field\": \"maxAmount\", \"value\": 9999 },\n      { \"field\": \"autoApprove\", \"value\": true },\n      { \"field\": \"restockingFee\", \"value\": 0 }\n    ]\n  }\n}"
      }
    ]
  }
}
```

**Input Schema:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `returnId` | `string` | ✅ | The return request UUID |

**Plan:** Free ✅

---

### list_returns

List return requests, optionally filtered by status. Results are ordered by most recent first.

**Request:**

```json
{
  "jsonrpc": "2.0",
  "id": 9,
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

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 9,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"returns\": [\n    {\n      \"id\": \"cm3d1a2b3c4d5e6f7g8h9i0j\",\n      \"orderName\": \"#1001\",\n      \"customerName\": \"Jane Doe\",\n      \"status\": \"PENDING\",\n      \"totalItems\": 2,\n      \"createdAt\": \"2026-07-09T14:30:00.000Z\"\n    },\n    {\n      \"id\": \"cm4e5f6g7h8i9j0k1l2m3n4o5\",\n      \"orderName\": \"#1002\",\n      \"customerName\": \"John Smith\",\n      \"status\": \"PENDING\",\n      \"totalItems\": 1,\n      \"createdAt\": \"2026-07-08T10:15:00.000Z\"\n    }\n  ]\n}"
      }
    ]
  }
}
```

**Input Schema:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | `string` | ❌ | Filter by status: `PENDING`, `APPROVED`, `DENIED`, `EXCHANGE`, `SHIPPED`, `REFUNDED`, `CLOSED`. Omit to return all statuses |
| `limit` | `number` | ❌ | Maximum number of results (default: 10) |

**Plan:** Free ✅

---

## Lifecycle Methods

### initialize

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {},
    "clientInfo": { "name": "mcp-client", "version": "1.0.0" }
  }
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": { "tools": {}, "resources": {} },
    "serverInfo": { "name": "shopigent-returns", "version": "0.1.0" }
  }
}
```

### tools/list

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list"
}
```

**Response:** Returns the complete list of all 9 tool definitions with their input schemas.

---

## Return Statuses

| Status | Description |
|--------|-------------|
| `PENDING` | Awaiting review/decision |
| `APPROVED` | Approved, refund processing |
| `DENIED` | Rejected with reason |
| `EXCHANGE` | Exchange order created |
| `SHIPPED` | Items received by warehouse |
| `REFUNDED` | Refund or store credit processed |
| `CLOSED` | Fully resolved |

---

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

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "error": {
    "code": -32000,
    "message": "Return is already APPROVED. Only PENDING returns can be denied."
  }
}
```

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "error": {
    "code": -32001,
    "message": "Upgrade to PRO plan to use this tool."
  }
}
```

**Common Error Codes:**

| Code | Meaning |
|------|---------|
| -32601 | Unknown tool/method |
| -32602 | Invalid params (e.g., return not found, wrong status transition) |
| -32600 | Invalid Request format |
| -32000 | Business logic error (wrong return status, confirmation token expired/invalid, missing Shopify token) |
| -32001 | Unauthorized (invalid API key) or plan restriction |
| -32003 | Rate limit exceeded (60 calls/min, 1000 calls/day) |