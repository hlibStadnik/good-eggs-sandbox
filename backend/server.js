const express = require("express");
const stripe = require("stripe")(
  "sk_test_51STqo9KCHAcCaB080RfQaPfmpu7176jJn8CWza6dQxuq5ed6G0hs1CDcVsPCdGvKasyiuqwtZXERIarLYNquxbYM00e8SOracE",
  {
    apiVersion: "2023-10-16",
    typescript: true,
  },
);
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = Number(process.env.PORT) || 3003;
const APP_RETURN_URL = "good-eggs-sandbox://stripe-redirect";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("[GET] / - Health check");
  res.json({ status: "Stripe payment server running" });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: 3000,
      currency: "eur",
      customer: "cus_TwvA8yVWkzFvUJ",
    });

    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error("❌ Error creating payment intent:", err.message);
    if (
      typeof err.message === "string" &&
      err.message.includes("outside of allowed currencies")
    ) {
      return res.status(400).json({
        error:
          "Your Stripe account does not currently allow Klarna in USD. Enable USD for Klarna in Dashboard > Payment methods or use a supported Klarna currency.",
      });
    }
    res.status(err.statusCode || 400).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Stripe payment server running on http://localhost:${PORT}`);
});
