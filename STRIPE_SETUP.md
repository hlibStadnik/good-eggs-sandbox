# Stripe Payment Integration - Setup Guide

## Overview

This is a minimal React Native/Expo app with Stripe Elements integration for accepting card payments.

## Components

- **PaymentScreen.tsx** - React Native payment UI with Stripe CardField
- **App.tsx** - Main app with StripeProvider wrapper
- **server.js** - Node.js backend for creating PaymentIntents

## Setup Instructions

### 1. Get Stripe Keys

1. Visit [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

### 2. Configure Frontend

Update `App.tsx` with your publishable key:

```tsx
const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_actual_key_here';
```

### 3. Set Up Backend

#### Install dependencies:
```bash
npm install express stripe dotenv cors
```

#### Create `.env` file in project root:
```
STRIPE_SECRET_KEY=sk_test_your_actual_key_here
PORT=4242
```

#### Run the backend:
```bash
node server.js
```

You should see:
```
Stripe payment server running on http://localhost:4242
```

### 4. Run the App

```bash
npm run android
# or
npm run ios
```

## Testing Payments

### Test Card Numbers

| Card Number | Scenario |
|------------|----------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 3220` | Requires 3D Secure authentication |
| `4000 0000 0000 9995` | Card declined |

### Payment Details
- **Expiry Date**: Any future date (e.g., 12/25)
- **CVC**: Any 3-4 digit number (e.g., 123)
- **ZIP Code**: Any 5 digits (e.g., 12345)

## Architecture

```
Client (React Native)
  ↓
  ├─ User enters card details in CardField
  ├─ Initiates payment
  ↓
Server (Node.js)
  ├─ Creates PaymentIntent
  ├─ Processes payment with Stripe API
  ↓
Stripe (Payment Processor)
  ├─ Authorizes/charges card
  ├─ Returns payment status
```

## Key Features

- ✅ Stripe CardField component for secure card input
- ✅ Real-time card validation
- ✅ Amount input (customizable)
- ✅ Test card information display
- ✅ Error handling and user feedback
- ✅ Loading states

## Project Structure

```
good-eggs-sandbox/
├── App.tsx                 # Main app with StripeProvider
├── PaymentScreen.tsx       # Payment UI component
├── server.js              # Backend server
├── package.json
└── README.md              # This file
```

## Next Steps

1. Replace test keys with production keys
2. Add proper error handling and logging
3. Implement order/receipt system
4. Add user authentication
5. Connect to database for order tracking
6. Deploy backend to production server

## Resources

- [Stripe React Native Docs](https://stripe.com/docs/stripe-js/react-native)
- [Stripe Payment Intents API](https://stripe.com/docs/payments/payment-intents)
- [Stripe Testing Guide](https://stripe.com/docs/testing)

## Troubleshooting

### "Could not initialize payment"
- Ensure backend is running on `http://localhost:4242`
- Check that `STRIPE_SECRET_KEY` is set in `.env`
- Verify network connectivity between app and server

### "Card declined"
- Use test card `4242 4242 4242 4242` for successful payments
- Ensure card details are complete before pressing Pay

### "Connection refused"
- Make sure `node server.js` is running
- Verify the backend port (default: 4242)
- Check firewall settings
