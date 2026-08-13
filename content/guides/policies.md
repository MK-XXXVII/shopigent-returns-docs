---
title: Policy Configuration Guide
description: How to set up and optimize return policies for automated AI decision-making.
---

## Overview

Policies are the core of Shopigent Returns. They define the rules that the AI agent uses to automatically approve, deny, or flag returns for review. Each policy has conditions that are evaluated in priority order.

## Creating a Policy

Navigate to **Policies** and click **Add Policy**. Each policy has:

| Field | Description | Example |
|---|---|---|
| **Name** | A descriptive name | "Standard 30-day return" |
| **Priority** | Lower numbers are checked first | 0 = highest priority |
| **Max Days** | Maximum days since order for return eligibility | 30 |
| **Max Amount** | Maximum order value for this policy | $200 |
| **Auto-approve** | Whether the AI agent can auto-approve | ✅ |
| **Restocking Fee** | Percentage fee charged to customer | 0% or 15% |
| **Require Label** | Whether a return label is required | ✅ |

## Example Policies

### 1. Standard Auto-approve (Priority 0)

```
Name: Standard 30-day return
Max Days: 30
Max Amount: $200
Auto-approve: ✅
Restocking Fee: 0%
```

**Result:** Orders under $200 within 30 days are **auto-approved** and refunded by the AI agent.

### 2. High-value Review (Priority 1)

```
Name: High-value review
Max Days: 30
Max Amount: $9999
Auto-approve: ❌
Restocking Fee: 15%
```

**Result:** Orders over $200 are flagged for **manual review**. If approved, a 15% restocking fee applies.

### 3. Clearance / Final Sale (Priority 0, separate policy)

```
Name: Clearance items — no returns
Max Days: 0
Max Amount: $0
Auto-approve: ❌
```

**Result:** Marked with priority 0 and 0 days = any return is denied. This should be used with specific item-level restrictions.

## How the AI Agent Uses Policies

When a customer submits a return:

1. The agent calls `analyze_return(returnId)`
2. The agent evaluates all active policies **in priority order**
3. The **first matching policy** is used
4. If auto-approve is enabled and conditions are met → **auto-approved**
5. If no policy matches → flagged for **manual review**

## Partial Returns

Customers can return **specific items** from an order instead of everything. When the agent approves a partial return:

- Use `returnedItems: ["item-id-1", "item-id-2"]` in `approve_return`
- Only the selected items are refunded/credited
- The rest stay on the original order

**Example:** Customer ordered 5 items but wants to return 2. The agent approves with `returnedItems` set to those 2 items. The refund only covers those 2 items.

## Store Credit

Instead of a refund, you can offer **store credit** — a credit that customers can use for future purchases. This increases repeat purchases and reduces payment processor fees.

To issue store credit:

- Set `storeCredit: true` in `approve_return`
- The AI agent creates a store credit note in Shopify
- The customer can use it on their next order

**When to use store credit:**
- Exchanges (customer returns item A, gets credit for item B)
- Customers who prefer credit over refund
- Promotional returns (bonus credit for store loyalty)

## Tips

- **Lower priority number = checked first.** Set your most common policy to priority 0.
- **Auto-approve is powerful.** Use it for low-risk returns (low value, recent orders).
- **Combine policies.** A standard auto-approve + a high-value review policy covers most scenarios.
- **Test with the MCP agent.** Call `analyze_return` to see which policy matches a given return.
- **Partial returns** reduce shipping costs and improve customer satisfaction.
- **Store credit** improves cash flow and customer retention.