---
title: Return Portal Guide
description: How to set up the self-service return portal for your customers — add the link to your store navigation and configure it.
---

## Return Portal

Shopigent Returns includes a **self-service customer portal** where your customers can submit return requests without contacting you. They enter their email, verify with a one-time code, select the items they want to return, and submit — all automatically.

The portal is hosted at `returns.greeknous.com` and works with any Shopify store using Shopigent Returns.

### Step 1: Find Your Portal URL

Your store's unique portal URL is:

```
https://returns.greeknous.com/return?shop=YOUR_STORE.myshopify.com
```

You can find this URL in your **Shopigent Returns app → Settings → Return Portal** section, with a one-click copy button.

### Step 2: Add to Navigation

1. Go to your **Shopify Admin** → **Online Store** → **Navigation**
2. Click the **Main menu** (or the menu where you want the link to appear)
3. Click **Add menu item**
4. **Name:** `Start a Return` (or `Returns` or `Request a Return`)
5. **Link:** Paste your portal URL from Step 1
6. Click **Add**, then **Save menu**

The link will appear in your store's navigation for customers to click.

### How It Works

1. Customer clicks "Start a Return" in your store navigation
2. They enter their **email address**
3. A **6-digit verification code** is sent to that email (valid for 10 minutes)
4. They enter the code to verify their identity
5. Their orders are displayed — they select **specific items** to return (partial return supported)
6. They choose between **refund** or **store credit**
7. The return request is submitted to the **AI agent** for review
8. The AI agent checks your policies, fraud signals, and decides automatically

### Security

- **Email verification required** — customers must prove they own the email address before seeing order details
- **OTP codes expire** after 10 minutes
- **Shopify Admin API** is used with your store's offline access token — no external services
- The AI agent reviews all returns before processing refunds

### Custom Domain (Optional)

If you want the portal on your own domain (e.g., `returns.yourstore.com`), contact us at **shopigent@greeknous.com** with your store domain and we'll set it up.

---

[Back to Docs](/guides/getting-started)