---
title: Getting Started with Shopigent Returns
description: Install the app, configure your first policy, set up billing, and connect AI agents via MCP.
---

## Quick Start

1. Install Shopigent Returns from the Shopify App Store
2. Create your first return policy
3. Connect an AI agent via MCP
4. Let it handle returns automatically

## 1. Installation

Install the app from the Shopify App Store. After installation, you'll be redirected to the app dashboard.

## 2. Choose Your Plan

The app offers three plans:

| Plan | Price | Best For |
|---|---|---|
| **Free** | $0 | Testing with up to 10 returns/month |
| **Growth** | $9.99/mo | Automated returns with fraud detection |
| **Pro** | $29/mo | Full automation with labels and exchanges |

You can upgrade, downgrade, or cancel anytime from the **Billing** page.

## 3. Create a Policy

1. Go to **Policies** in the app navigation
2. Click **Add Policy**
3. Set conditions (max days, max amount, auto-approve)
4. Enable the policy

Policies define which returns are auto-approved by the AI agent. Example:

```
Policy: Standard 30-Day Return
- Max days: 30
- Max amount: $200
- Auto-approve: ✅
- Restocking fee: 0%
```

## 4. Customer Return Portal

Your customers can submit returns at:
**https://returns.greeknous.com/return**

They enter their email, receive an OTP, select items to return, and submit.

## 5. Connect AI Agents via MCP

Generate an MCP API key from **Settings** → **MCP Server**. Then configure your AI agent:

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
Headers: Authorization: Bearer YOUR_MCP_KEY
```

## 6. Confirmation Gate (Security)

Destructive operations (approve/deny returns) require a two-step confirmation:

1. First call `issue_confirmation_token` to get a signed HMAC token
2. Include the token as `confirmationToken` in the actual `approve_return` or `deny_return` call

Tokens expire after 5 minutes and are bound to specific arguments.

## 7. Plan-Based Access

| Plan | Tools Available |
|---|---|
| **Free** | Read-only: analyze, check fraud, list tools |
| **Growth** | Approve, deny, refund, email notifications, analytics |
| **Pro** | Exchange workflow, label generation, SMS alerts, advanced fraud rules |

## 8. Next Steps

- [MCP Usage Guide →](/guides/mcp-usage)
- [Policy Configuration →](/guides/policies)
- [Workflow Examples →](/guides/workflows)