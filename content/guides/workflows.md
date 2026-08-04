---
title: Workflow Examples
description: Real-world automation workflows showing how merchants can save time with AI-powered returns.
---

## Overview

Shopigent Returns works in two modes:

1. **Chat Mode** — Talk to an AI agent (Claude, Codex) and it handles returns via MCP
2. **Automation Mode** — The agent runs on a schedule and processes returns automatically

---

## Workflow 1: Daily Return Processing

**Goal:** Every morning, process all pending returns automatically.

### Step 1: Find pending returns

The agent calls:
```
list_returns(status: "PENDING")
```

**Result:** Returns a list of all returns waiting for review.

### Step 2: Analyze each return

For each pending return, the agent calls:
```
analyze_return(returnId: "xxx")
```

**Result:** A recommendation (approve/review/deny) with confidence score and policy match.

### Step 3: Auto-approve eligible returns

For returns that match an auto-approve policy:
```
approve_return(returnId: "xxx", issueLabel: true)
```

**Result:** The return is approved, refund is executed in Shopify, label is generated, customer gets an email.

### Step 4: Flag for review

For returns that don't match any policy:
→ The agent creates a report for the merchant to review manually.

### Chat Example

> **Merchant:** "Process all pending returns for today."
>
> **Agent:** "Found 5 pending returns. Analyzing..."
> - #BZ-2026010 — Maria P. — $45.00 — ✅ Auto-approved (matches Standard policy)
> - #BZ-2026015 — John D. — $299.00 — ⚠️ Needs review (over $200 policy limit)
> - #BZ-2026016 — Anna K. — $89.00 — ✅ Auto-approved
> - #BZ-2026017 — Peter M. — $150.00 — ✅ Auto-approved
> - #BZ-2026018 — Sofia R. — $500.00 — ❌ Denied (outside 30-day window)
>
> "3 approved with refunds, 1 denied, 1 needs your review."

---

## Workflow 2: Fraud Investigation

**Goal:** Check all new returns for fraud signals before processing.

### The agent calls:

1. `list_returns(status: "PENDING")` → get all pending returns
2. For each: `check_fraud(returnId)` → run fraud detection

### Detection signals:

| Signal | What it checks | Risk |
|---|---|---|
| High-value return | Items over $1,000 | Medium |
| Frequent returner | 3+ returns in 30 days | High |
| Amount mismatch | Return amount doesn't match order | High |

### Chat Example

> **Merchant:** "Check for fraud on today's returns."
>
> **Agent:** "Running fraud checks on 3 pending returns..."
> - Order #BZ-2026020 — Medium risk (high-value: $1,200)
> - Order #BZ-2026021 — 🚨 High risk (frequent returner: 4 returns this month)
> - Order #BZ-2026022 — Low risk ✅
>
> "Recommend flagging #BZ-2026021 for manual review."

---

## Workflow 3: Customer Support Automation

**Goal:** A customer emails about a return. The merchant asks the agent for an instant answer.

### Chat Example

> **Merchant:** "Customer Maria Papadopoulou wants to return a leather jacket from order #BZ-2026010. What's the policy?"
>
> **Agent:** "Let me check..."
> 1. `list_returns(limit: 10)` → finds Maria's return
> 2. `analyze_return(returnId: "xxx")` → evaluates against policies
>
> "Found it! Order #BZ-2026010 — Leather Jacket ($299.99) — 23 days ago.
> - **Policy:** Standard 30-day return
> - **Eligible:** ✅ (23 days ≤ 30 days)
> - **Amount:** ❌ ($299.99 > $200 auto-approve limit)
> - **Recommendation:** Manual review required"
>
> "Since the jacket is over $200, I can't auto-approve it. Would you like me to approve it manually or let the customer know?"

---

## Workflow 4: End-of-Month Analytics

**Goal:** Get a complete returns performance report.

### Chat Example

> **Merchant:** "Show me my returns analytics for this month."
>
> **Agent:** "Let me gather the data..."
> 1. `list_returns()` → get all returns
> 2. `list_policies()` → get active policies
>
> **📊 Monthly Returns Report:**
> - Total returns: 45
> - Auto-approved: 32 (71%)
> - Denied: 8 (18%)
> - Manual review: 5 (11%)
> - Total refunded: $3,240
> - Fraud prevented: ~$890
> - Avg resolution time: 2.3 hours
>
> **Top reasons:** Sizing (40%), Changed mind (25%), Defective (15%)
> **Most returned:** Classic Leather Jacket (8 returns)
>
> "Your auto-resolution rate is 71%. I'd recommend adding a policy for items over $200 to catch more auto-approvals."

---

## Workflow 5: Bulk Approve with Labels

**Goal:** Approve 10 returns at once and generate labels for all of them.

### Chat Example

> **Merchant:** "Approve all pending returns under $100 and generate return labels."
>
> **Agent:** "Finding pending returns under $100..."
>
> Processing 6 returns:
> 1. ✅ #BZ-2026025 — $34.99 — Approved + Label generated
> 2. ✅ #BZ-2026026 — $89.00 — Approved + Label generated
> 3. ✅ #BZ-2026027 — $45.00 — Approved + Label generated
> 4. ✅ #BZ-2026028 — $22.50 — Approved + Label generated
> 5. ✅ #BZ-2026029 — $79.99 — Approved + Label generated
> 6. ✅ #BZ-2026030 — $12.99 — Approved + Label generated
>
> "Done! 6 returns approved, $284.47 in refunds processed, labels sent to customers."

---

## Automation Setup (Scheduled Tasks)

For fully automated processing, you can set up a daily cron job:

```bash
# Run every morning at 8 AM
0 8 * * * curl -X POST https://returns.greeknous.com/api/mcp \
  -H "Authorization: Bearer YOUR_MCP_KEY" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"list_returns","arguments":{"status":"PENDING"}}}'
```

Or use an automation platform like **n8n**, **Zapier**, or **Make** to trigger MCP calls on a schedule.

---

## Time Savings Calculator

| Task | Manual (per return) | Automated |
|---|---|---|
| Review return request | 5 minutes | 2 seconds |
| Check policy eligibility | 3 minutes | Instant |
| Process refund | 5 minutes | 5 seconds |
| Generate label | 3 minutes | 3 seconds |
| Email customer | 2 minutes | Automatic |
| **Total per return** | **~18 minutes** | **~10 seconds** |

**For a store with 50 returns/month:** Saves **~15 hours** of manual work per month.