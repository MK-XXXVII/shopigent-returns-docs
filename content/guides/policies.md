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

## Tips

- **Lower priority number = checked first.** Set your most common policy to priority 0.
- **Auto-approve is powerful.** Use it for low-risk returns (low value, recent orders).
- **Combine policies.** A standard auto-approve + a high-value review policy covers most scenarios.
- **Test with the MCP agent.** Call `analyze_return` to see which policy matches a given return.