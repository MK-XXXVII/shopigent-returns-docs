---
title: Features
description: Everything Shopigent Returns does to automate your Shopify returns with AI — policy engine, fraud detection, auto-refunds, labels, and more.
---

## Everything Shipped to Automate Your Returns

Shopigent Returns replaces the manual, tedious work of processing returns with an AI agent that handles the full lifecycle — intake, decision, fraud check, refund, and label — so you can focus on growing your store.

### 🤖 AI Agent

The heart of Shopigent Returns. An MCP-powered agent analyzes every return request, applies your policy, and decides whether to approve, deny, or flag it for review — then executes the outcome automatically.

- Reads each return's items, reason, and order context
- Applies your configured policies with a confidence score
- Approves, denies, or routes to manual review
- Executes refunds and generates labels without your involvement
- Logs every decision for a full audit trail

### ⚙️ Policy Engine

Set the rules once and let the AI enforce them consistently. Configure conditions that map to outcomes automatically.

- **Time windows** — only accept returns within N days of fulfillment
- **Amount limits** — auto-approve under a threshold, flag above it
- **Restocking fees** — apply a percentage automatically
- **Auto-approve or flag** — decide per condition whether the agent acts alone or asks you
- **Priority rules** — control which policy wins when multiple match

### 🛒 Customer Portal

A self-service return flow your customers will actually use. No email back-and-forth, no support tickets.

- Customers enter their email and verify with a **one-time code (OTP)** — secure by default
- Select items and reasons from a clean interface
- Submit instantly — the AI takes it from there
- Fully embeddable / linked from your storefront
- Each store gets its own portal URL: `returns.greeknous.com/return?shop=YOUR_STORE.myshopify.com`

[Full portal setup guide →](/guides/return-portal)

### 🛡️ Fraud Detection

Catch suspicious returns before they cost you money. Configurable rules with automatic flagging.

- **Custom rules UI** — max returns per customer (in N days), max value per return, blocked countries, suspicious email domains
- **Velocity analysis** — repeated returns from the same customer within the time window
- **Amount anomalies** — unusually large returns flagged for manual review
- **Automatic flagging** — fraud-flagged returns stay **PENDING** for manual review (skip auto-approve)
- **Fraud Signals** — every triggered rule creates a fraud signal with activity log entry
- **MCP check_fraud tool** — AI agents can evaluate fraud rules autonomously

### 💰 Auto-Refund

Refunds execute directly in Shopify via the Admin API. No copy-pasting, no manual actions.

- Full or partial refunds based on the policy decision
- AI agent processes refunds end-to-end
- Every transaction recorded in your decision log

### 📦 Label Generation

When a return is approved, a return label is generated automatically.

- **SendCloud**, **Shippo**, or **EasyPost** — bring your provider
- Labels auto-generate on approval
- Send directly to the customer without manual steps

### 🔁 Exchanges

Offer customers an exchange instead of a refund when it makes sense.

- Route approved returns to exchange workflows
- Seamless integration with your return flow

### 📊 Analytics

See exactly what the AI is handling for you.

- Return rate trends
- Auto-resolution percentage
- Fraud caught and money saved
- Top return reasons

### 🔔 Notifications

Keep you and your customers informed automatically.

- **Email notifications** on approve, deny, and refund — sent from `shopigent@greeknous.com` with branded logo
- **Custom sender** — each email includes the store name and branded Shopigent Returns logo
- **Email types**: Return received, Return approved (with refund amount), Return denied (with reason), Refund processed, Return shipping label

---

## How It Works

1. **Connect** — install the app and authorize your Shopify store
2. **Configure** — set your policies in the Policies page
3. **Automate** — the AI agent handles returns end-to-end, or flags the ones you want to review

[Get Started →](/guides/getting-started) · [View Pricing →](/pricing)