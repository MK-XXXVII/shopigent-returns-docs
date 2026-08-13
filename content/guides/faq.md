---
title: FAQ — Frequently Asked Questions
description: Common questions about Shopigent Returns, setup, billing, plans, and troubleshooting.
---

## General

### What is Shopigent Returns?

Shopigent Returns is an AI-powered return management app for Shopify. It automates the entire return process — from customer submission to refund execution — using AI agents connected via MCP protocol.

### What do I need to use the app?

- A Shopify store
- A subscription plan (Free, Growth, or Pro)
- Optionally, an AI agent (Claude Desktop, Codex, Cursor) for MCP integration

## Plans & Billing

### What are the pricing plans?

| Plan | Price | Returns | MCP Access |
|---|---|---|---|
| **Free** | $0 | 10/month | Read-only |
| **Growth** | $9.99/mo | Unlimited | Full (approve/deny/refund) |
| **Pro** | $29/mo | Unlimited | All features (exchange, labels) |

### How do I upgrade or downgrade?

Go to **Billing** in the app navigation, select your new plan, and follow the Shopify checkout flow. Changes take effect immediately for upgrades, and at the start of the next billing cycle for downgrades.

### Can I cancel anytime?

Yes. Go to **Billing** and cancel. Your access continues until the end of the billing period.

### Is there a free trial?

Growth and Pro plans include a 7-day free trial.

## MCP & AI Agents

### What AI agents work with Shopigent Returns?

Any MCP-compatible client: **Claude Desktop**, **OpenAI Codex**, **Cursor**, **Grok**, and custom MCP agents.

### How do I connect an AI agent?

1. Generate an MCP key from **Settings** → **MCP Server**
2. Configure your agent with the endpoint `https://returns.greeknous.com/api/mcp` and the key

### Why do I need a confirmation token?

The confirmation gate prevents unauthorized destructive operations. Before approving or denying a return, the agent must first call `issue_confirmation_token`, then include the returned token in the actual call. Tokens expire after 5 minutes.

### What happens if the confirmation token expires?

You get an error: `"Token expired"`. Simply call `issue_confirmation_token` again to get a fresh token.

## Returns

### How do customers submit a return?

Customers visit the return portal at `https://returns.greeknous.com/return`, enter their email, receive an OTP, select items, and submit.

### What's the exchange workflow?

Exchange is a Pro feature. When a customer wants to exchange an item instead of a refund, the AI agent calls `exchange_return` with the replacement variant ID. A draft order is created for the replacement.

### How does fraud detection work?

The app checks for:
- Frequent returner (multiple returns in 30 days)
- High-value returns (over policy limit)
- Suspicious email domains
- Blocked countries (configurable)
- Customer return velocity

## Label Generation

### What label providers are supported?

- **SendCloud** — PostNL, DHL, DPD (EU/NL focus)
- **Shippo** — 85+ carriers (US/global)
- **EasyPost** — Multiple carriers (global)

Configure your provider from **Settings** → **Label Provider**.

## SMS Notifications

### How do SMS alerts work?

Pro plan includes SMS notifications. The app sends SMS via email-to-SMS gateways or Twilio (if configured). Customers receive text messages when their return status changes.

### What carriers are supported?

Verizon, T-Mobile, AT&T, Sprint, Google Fi, US Cellular — via email-to-SMS gateways. For other carriers, configure Twilio.

## Security

### Is my data safe?

Yes. All data is encrypted in transit (HTTPS) and at rest. We use Shopify OAuth for API access and MCP API key authentication. We never store payment credentials.

### How are API keys stored?

MCP API keys are hashed with SHA-256 before storage — plaintext is never persisted.

### What happens when I uninstall the app?

Your data is marked for deletion within 30 days. Sessions are cleaned up immediately.

## Troubleshooting

### The AI agent says "Upgrade to GROWTH plan"

The tool you're trying to use requires a paid plan. Go to **Billing** to upgrade.

### Returns are not being auto-approved

Check that:
1. Your policies are active and configured correctly
2. The return matches policy conditions (within time window, under amount limit)
3. You're on a Growth or Pro plan

### I get "Confirmation required" errors

Call `issue_confirmation_token` first, then include the token in your `approve_return` or `deny_return` call.