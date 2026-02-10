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

const express = require("express");
const stripe = require("stripe")(
  "sk_test_51STqo9KCHAcCaB080RfQaPfmpu7176jJn8CWza6dQxuq5ed6G0hs1CDcVsPCdGvKasyiuqwtZXERIarLYNquxbYM00e8SOracE",
);
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  console.log("[GET] / - Health check");
  res.json({ status: "Stripe payment server running" });
});

/**
 * Create a PaymentIntent with confirmation token
 * POST /create-intent
 * Body: { amount: number (in cents), currency: string, confirmationTokenId: string, customerId?: string, saveCard?: boolean }
 */

app.post("/create-intent", async (req, res) => {
  try {
    const {
      paymentMethodId,
      amount,
      currency = "usd",
      setup_future_usage,
      total = 0,
      customerId,
    } = req.body;
    console.log("🚀 ~ req.body:", req.body);

    // If amount is 0 after store credit, complete the order without Stripe

    var args = {
      amount,
      currency,
      confirm: true,
      customer: customerId,
      return_url: "com.goodEggs.stripe://stripe-redirect",
      payment_method: paymentMethodId,
      setup_future_usage,
      // Add metadata and description for clarity
      description: "Payment for order XYZ, used store credit: ",
      metadata: {
        // store_credit_applied: storeCreditApplied.toString(),
        total: total.toString(),
      },
    };

    const intent = await stripe.paymentIntents.create(args);
    console.log("🚀 ~ intent:", intent);

    const resResult = {
      clientSecret: intent.client_secret,
    };

    res.json(resResult);
  } catch (err) {
    console.error("❌ Error creating intent:", err.message);
    res.status(err.statusCode || 400).json({ error: err.message });
  }
});

app.post("/setup-intent", async (req, res) => {
  try {
    const { email, name } = req.body;
    console.log("[POST] /setup-intent - Email:", email, "Name:", name);

    let customer;

    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      console.log(
        "[POST] /setup-intent - Customer already exists:",
        existingCustomers.data[0].id,
      );
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        name,
      });
    }
    const customerSession = await stripe.customerSessions.create({
      customer: customer.id,
      components: {
        mobile_payment_element: {
          enabled: true,
          features: {
            payment_method_save: "enabled",
            payment_method_redisplay: "enabled",
            payment_method_remove: "enabled",
          },
        },
      },
    });
    console.log("🚀 ~ customerSession:", customerSession);

    res.json({
      customerSessionClientSecret: customerSession.client_secret,
      customer: customer.id,
    });
  } catch (error) {
    console.error("[POST] /create-customer - Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Create a subscription for recurring monthly charges
 * POST /create-subscription
 * Body: { amount: number (in cents), currency: string, confirmationTokenId: string, customerId: string, productName: string }
 */
app.post("/create-subscription", async (req, res) => {
  try {
    const { amount, currency, confirmationTokenId, customerId, productName } =
      req.body;
    console.log(
      "[POST] /create-subscription - Amount:",
      amount,
      "Currency:",
      currency,
      "Customer:",
      customerId,
      "Product:",
      productName,
    );

    if (!amount || amount < 100) {
      console.warn("[POST] /create-subscription - Invalid amount:", amount);
      return res.status(400).json({ error: "Amount must be at least $1.00" });
    }

    if (!customerId) {
      console.warn("[POST] /create-subscription - Missing customer ID");
      return res.status(400).json({ error: "Customer ID is required" });
    }

    // First, create or get a payment method from the confirmation token
    const paymentMethod =
      await stripe.paymentMethods.retrieve(confirmationTokenId);

    // Attach payment method to customer if not already attached
    await stripe.paymentMethods
      .attach(confirmationTokenId, {
        customer: customerId,
      })
      .catch(() => {
        // Ignore if already attached
      });

    // Create a product for the subscription
    const product = await stripe.products.create({
      name: productName,
      type: "service",
    });

    // Create a price for monthly billing
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount,
      currency: currency,
      recurring: {
        interval: "month",
        interval_count: 1,
      },
    });

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: price.id,
        },
      ],
      default_payment_method: confirmationTokenId,
      billing_cycle_anchor: Math.floor(Date.now() / 1000),
    });

    console.log("[POST] /create-subscription - Success:", subscription.id);
    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
      status: subscription.status,
      currentPeriodEnd: subscription.current_period_end,
    });
  } catch (error) {
    console.error("[POST] /create-subscription - Error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

/**
 * Get subscription details
 * GET /subscription/:subscriptionId
 */
app.get("/subscription/:subscriptionId", async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    res.json({
      subscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscription.current_period_end,
      amount: subscription.items.data[0]?.price.unit_amount,
      currency: subscription.items.data[0]?.price.currency,
    });
  } catch (error) {
    console.error("[GET] /subscription - Error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

/**
 * Cancel a subscription
 * POST /cancel-subscription
 * Body: { subscriptionId: string }
 */
app.post("/cancel-subscription", async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const subscription = await stripe.subscriptions.del(subscriptionId);
    console.log("[POST] /cancel-subscription - Success:", subscriptionId);
    res.json({ subscriptionId: subscription.id, status: subscription.status });
  } catch (error) {
    console.error("[POST] /cancel-subscription - Error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Stripe payment server running on http://localhost:${PORT}`);
});
