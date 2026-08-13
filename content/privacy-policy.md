---
title: Privacy Policy
description: Shopigent Returns privacy policy — how we collect, use, and protect your data.
---

**Last updated:** August 2026

## Overview

Shopigent Returns ("the App") is a Shopify application that provides AI-powered return management. This Privacy Policy describes how we collect, use, and handle your information when you use our App.

## Data We Collect

### Shopify Store Data
When you install the App, we access the following data via the Shopify Admin API:
- **Order information** — order IDs, line items, prices, fulfillment status, customer names and emails
- **Product information** — product titles, SKUs, variant IDs, prices
- **Customer information** — names and email addresses of customers who submit returns
- **Shop information** — store name, domain, plan name

### Return Data
When customers use the return portal, we store:
- Customer name and email address
- Order information and items being returned
- Reason for return
- Return status and decision history
- Fraud detection signals and risk scores

### Payment Data
We do **not** collect, store, or process payment information. All payments are handled by Shopify Billing.

## How We Use Your Data

We use the collected data to:
1. Process and manage return requests
2. Execute refunds via the Shopify Admin API
3. Detect and prevent return fraud
4. Generate analytics and reports
5. Send email and SMS notifications about return status
6. Improve the App's functionality

## Data Storage

- All data is stored in a PostgreSQL database on Railway (US/EU servers)
- Data is encrypted in transit (HTTPS) and at rest
- We retain return data for the duration of your account plus 90 days
- You can request data deletion at any time

## Data Sharing

We do **not** sell, trade, or share your personal data with third parties except:
- **Shopify** — via the Admin API for order/refund processing
- **Railway** — as our hosting provider (data center)
- **VPS mail relay** — for sending email notifications (self-hosted, not third-party)

## Third-Party Services (Optional)

If you configure them, the App may connect to:
- **SendCloud** / **Shippo** / **EasyPost** — for return label generation
- These services receive only the shipping address and order information necessary to generate labels

## Data Deletion

You can request complete data deletion at any time by:
1. Uninstalling the App (triggers automatic cleanup)
2. Emailing us at shopigent@greeknous.com

We will delete all your data within 30 days of request.

## Security

We implement industry-standard security measures:
- MCP API key authentication
- Shopify OAuth for API access
- Encrypted database connections
- No storage of payment credentials
- Regular security updates

## Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any changes via the App or email.

## Contact

For questions about this Privacy Policy, contact us at:
**shopigent@greeknous.com**