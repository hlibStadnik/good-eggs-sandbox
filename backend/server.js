/**
 * Stripe Payment Backend
 * 
 * This is a minimal Node.js/Express backend for handling Stripe payments.
 * 
 * Installation:
 * npm install
 * 
 * Environment variables (.env):
 * STRIPE_SECRET_KEY=sk_test_your_key_here
 * PORT=4242
 * 
 * Run:
 * npm start
 */

const express = require('express');
const stripe = require('stripe')('sk_test_51STqo9KCHAcCaB080RfQaPfmpu7176jJn8CWza6dQxuq5ed6G0hs1CDcVsPCdGvKasyiuqwtZXERIarLYNquxbYM00e8SOracE');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  console.log('[GET] / - Health check');
  res.json({ status: 'Stripe payment server running' });
});

/**
 * Create a PaymentIntent with confirmation token
 * POST /create-intent
 * Body: { amount: number (in cents), currency: string, confirmationTokenId: string }
 */
app.post('/create-intent', async (req, res) => {
  try {
    const { amount, currency, confirmationTokenId } = req.body;
    console.log('[POST] /create-intent - Amount:', amount, 'Currency:', currency, 'Token:', confirmationTokenId);

    if (!amount || amount < 100) {
      console.warn('[POST] /create-intent - Invalid amount:', amount);
      return res.status(400).json({ error: 'Amount must be at least $1.00' });
    }

    if (!currency) {
      console.warn('[POST] /create-intent - Missing currency');
      return res.status(400).json({ error: 'Currency is required' });
    }

    // Create PaymentIntent with payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: confirmationTokenId,
      confirm: true,
      return_url: 'stripe-example://payment-return',
    }); 

    console.log('[POST] /create-intent - Success:', paymentIntent.id);
    res.json({
      client_secret: paymentIntent.client_secret,
      id: paymentIntent.id,
      status: paymentIntent.status,
    });
  } catch (error) {
    console.error('[POST] /create-intent - Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

/**
 * Create a PaymentIntent (old endpoint for compatibility)
 * POST /create-payment-intent
 * Body: { amount: number (in cents) }
 */
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    console.log('[POST] /create-payment-intent - Amount:', amount);

    if (!amount || amount < 100) {
      console.warn('[POST] /create-payment-intent - Invalid amount:', amount);
      return res.status(400).json({ error: 'Amount must be at least $1.00' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('[POST] /create-payment-intent - Success:', paymentIntent.id);
    res.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (error) {
    console.error('[POST] /create-payment-intent - Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Process payment with card details
 * POST /pay
 * Body: { amount: number, cardDetails: object }
 */
app.post('/pay', async (req, res) => {
  try {
    const { amount, cardDetails } = req.body;
    console.log('[POST] /pay - Processing payment for amount:', amount);

    if (!amount || !cardDetails) {
      console.warn('[POST] /pay - Missing amount or card details');
      return res.status(400).json({ error: 'Missing amount or card details' });
    }

    // Create a payment method from card details
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardDetails.number,
        exp_month: cardDetails.expMonth,
        exp_year: cardDetails.expYear,
        cvc: cardDetails.cvc,
      },
    });

    // Create and confirm payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethod.id,
      confirm: true,
    });

    if (paymentIntent.status === 'succeeded') {
      console.log('[POST] /pay - Payment succeeded:', paymentIntent.id);
      res.json({
        success: true,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
      });
    } else {
      console.warn('[POST] /pay - Payment failed with status:', paymentIntent.status);
      res.json({
        success: false,
        error: `Payment status: ${paymentIntent.status}`,
      });
    }
  } catch (error) {
    console.error('[POST] /pay - Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Get payment status
 * GET /payment-status/:paymentIntentId
 */
app.get('/payment-status/:paymentIntentId', async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    console.log('[GET] /payment-status/:paymentIntentId - ID:', paymentIntentId);
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    console.log('[GET] /payment-status/:paymentIntentId - Status:', paymentIntent.status);
    res.json({
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    console.error('[GET] /payment-status/:paymentIntentId - Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Stripe payment server running on http://localhost:${PORT}`);
  console.log(`\n📝 Endpoints:`);
  console.log(`   GET  /`);
  console.log(`   POST /create-intent`);
  console.log(`   POST /create-payment-intent`);
  console.log(`   POST /pay`);
  console.log(`   GET  /payment-status/:paymentIntentId\n`);
});
