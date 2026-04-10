# Round 5 Billing Functions (Firebase + Stripe)

## What this contains

- `createCheckoutSession`: authenticated endpoint to create Stripe Checkout session
- `stripeWebhook`: signed webhook endpoint to grant Pro access server-side

## Required environment variables

Create local `.env` in `functions/` (do not commit), based on `.env.example`:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_MONTHLY`
- `STRIPE_PRICE_YEARLY`
- `ALLOWED_ORIGINS` (comma-separated)

## Deploy

```bash
cd functions
npm install
cd ..
firebase deploy --only functions,firestore:rules
```

## Frontend config

Set `BACKEND_CONFIG.checkoutEndpoint` in `site/assets/firebase-config.js` to:

`https://europe-west1-<your-project-id>.cloudfunctions.net/createCheckoutSession`

## Stripe webhook setup

In Stripe dashboard, add endpoint:

`https://europe-west1-<your-project-id>.cloudfunctions.net/stripeWebhook`

Subscribe to event:

- `checkout.session.completed`
