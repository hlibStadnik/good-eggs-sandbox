# Stripe Payment Backend

Separate Node.js/Express backend for handling Stripe payments.

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables

The `.env` file is already configured with your Stripe secret key and port.

```env
STRIPE_SECRET_KEY=sk_test_51STqo9KCHAcCaB080RfQaPfmpu7176jJn8CWza6dQxuq5ed6G0hs1CDcVsPCdGvKasyiuqwtZXERIarLYNquxbYM00e8SOracE
PORT=4242
```

### 3. Run the Server

```bash
npm start
```

Or with auto-reload (requires nodemon):
```bash
npm run dev
```

You should see:
```
Stripe payment server running on http://localhost:4242
```

## API Endpoints

### POST /create-payment-intent
Create a Stripe PaymentIntent

**Request:**
```json
{
  "amount": 2999
}
```

**Response:**
```json
{
  "clientSecret": "pi_...",
  "id": "pi_..."
}
```

### POST /pay
Process a payment with card details

**Request:**
```json
{
  "amount": 2999,
  "cardDetails": {
    "number": "4242424242424242",
    "expMonth": 12,
    "expYear": 2025,
    "cvc": "123"
  }
}
```

**Response:**
```json
{
  "success": true,
  "paymentIntentId": "pi_...",
  "amount": 2999
}
```

### GET /payment-status/:paymentIntentId
Check payment status

**Response:**
```json
{
  "id": "pi_...",
  "status": "succeeded",
  "amount": 2999,
  "currency": "usd"
}
```

## Testing

Test the backend with curl:

```bash
# Create PaymentIntent
curl -X POST http://localhost:4242/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 2999}'

# Check payment status
curl http://localhost:4242/payment-status/pi_your_payment_id
```

## Dependencies

- **express** - Web framework
- **stripe** - Stripe API client
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **nodemon** (dev) - Auto-reload on file changes

## Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
└── README.md         # This file
```
