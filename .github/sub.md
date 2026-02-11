# Recurring payments

Understand your options for charging customers on a recurring basis.

If your Connect platform uses [customer-configured Accounts](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-configuration-customer), use our [guide](https://docs.stripe.com/connect/use-accounts-as-customers.md) to replace `Customer` and event references in your code with the equivalent Accounts v2 API references.

Stripe offers several ways to charge customers on a recurring basis. This guide helps you understand which method or approach best supports your business.

This guide offers a few ways to understand your options:

- [Use cases](https://docs.stripe.com/recurring-payments.md#use-cases): Find the right use case for your business.
- [Types of recurring payments](https://docs.stripe.com/recurring-payments.md#recurring-payment-types): See all the recurring payment types that Stripe supports.
- [Stripe products](https://docs.stripe.com/recurring-payments.md#stripe-products): Check which Stripe products support your recurring payment use case.

## Use cases 

[Accept recurring payments](https://docs.stripe.com/recurring-payments.md#accept-recurring-payments): Let customers pay you regularly and repeatedly through Stripe.

[Split purchases into a few payments](https://docs.stripe.com/recurring-payments.md#installment-plans): Create installment plans to let customers pay you a total amount in a limited number of partial payments.

[Enable customers to manage their own subscriptions](https://docs.stripe.com/recurring-payments.md#enable-customer-portal): Set up the customer portal so your customers can create and manage their own subscriptions.

[Accept recurring donations](https://docs.stripe.com/recurring-payments.md#recurring-donations): Let customers make donations to your organization on a regular basis.

[Migrate existing subscriptions to Stripe](https://docs.stripe.com/recurring-payments.md#migrate-subscriptions): Move your existing subscriptions from a third-party service to Stripe.

## Types of recurring payments 

The following tabs describe the different types of recurring payments that Stripe supports.

#### Subscriptions

|               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Overview**  | Use [Stripe Billing](https://docs.stripe.com/billing.md) to create and manage your subscriptions through the Dashboard or programmatically through the API.

  - [Create a payment link with a recurring product](https://docs.stripe.com/payment-links/create.md).
  - Create a subscription through the [Dashboard](https://dashboard.stripe.com/subscriptions) or [build a subscriptions integration](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md).
  - Create [subscription schedules](https://docs.stripe.com/billing/subscriptions/subscription-schedules.md) for complex subscription use cases.
  - If you use Connect, [create subscriptions](https://docs.stripe.com/connect/subscriptions.md) for connected accounts and end customers. |
| **Features**  | - No coding required. (You can optionally use the Subscriptions API and prebuilt components like Stripe Checkout and Elements to build a programmatic subscriptions integration.)
  - Customize appearance and behavior in your app.
  - Supports multiple products and prices in different currencies.
  - Supports responsive web and mobile native.
  - Website required. You can use Stripe Elements to customize the appearance of payment forms.                                                                                                                                                                                                                                                                                                                      |
| **Use cases** | - [Accept payments from customers on a recurring basis](https://docs.stripe.com/recurring-payments.md#accept-recurring-payments)
  - [Accept recurring donations](https://docs.stripe.com/recurring-payments.md#recurring-donations)
  - [Enable customers to manage their own subscriptions](https://docs.stripe.com/recurring-payments.md#enable-customer-portal)
  - [Migrate existing subscriptions to Stripe](https://docs.stripe.com/recurring-payments.md#migrate-subscriptions)                                                                                                                                                                                                                                                                                     |

#### Installments

|               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Overview**  | Installments let you split a payment into a few recurring charges. They’re good for boosting conversion of high-value goods, increasing average cart size, and reaching new customers.

  Use subscription schedules to set up an [installment plan](https://docs.stripe.com/billing/subscriptions/subscription-schedules.md#installment-plans).

  Use *buy now, pay later (BNPL)* (Buy now, pay later (BNPL) allows customers to purchase a product immediately and pay for it over time—often interest free) services, like Klarna, to let customers pay in installments. Learn more about [buy now, pay later options](https://docs.stripe.com/payments/buy-now-pay-later.md).

  Accept card payments in scheduled installments, if your business is based in Mexico. Learn more about [card payment installments](https://docs.stripe.com/payments/mx-installments.md). (Only available in Mexico) |
| **Features**  | - Subscription schedules require coding. Most BNPL methods can be enabled through the Dashboard.
  - Customize appearance and behavior in your app.
  - Supports multiple products and prices in different currencies.
  - Supports responsive web and mobile native.
  - Website required. You can use Stripe Elements to customize the appearance of payment forms.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Use cases** | [Split purchases into a few payments](https://docs.stripe.com/recurring-payments.md#installment-plans)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

#### Recurring invoices

|               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Overview**  | Invoices let you accept immediate, future, or recurring payments. Create invoices through the Dashboard or API. Set up [automatic charging for your customers](https://docs.stripe.com/invoicing/automatic-charging.md). Automatically schedule and generate recurring invoices by creating subscriptions. Use invoices to collect payment by either [automatically charging customers](https://docs.stripe.com/recurring-payments.md#use-invoices) or [automatically sending invoices to customers](https://docs.stripe.com/recurring-payments.md#schedule-recurring-invoices).

  To schedule future payments, use the [hosted invoice page](https://docs.stripe.com/invoicing/hosted-invoice-page/scheduled-payments.md). Only available in the US. See the [full list of limitations](https://docs.stripe.com/invoicing/hosted-invoice-page/scheduled-payments.md#limitations). |
| **Features**  | - Hosted by Stripe.
  - Requires minimal coding or no coding, depending on the method.
  - Customize the branding of the invoices, emails, and payment page.
  - Supports multiple products and prices in different currencies.
  - Mobile support for responsive web.
  - No website required. Stripe hosts the payment page.
  - Supports [Stripe Tax](https://docs.stripe.com/tax.md).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Use cases** | - [Accept payments from customers on a recurring basis](https://docs.stripe.com/recurring-payments.md#accept-recurring-payments)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

#### Charges on saved payment methods

|               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Overview**  | Use the *Payment Intents API* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods) to save payment method details [as part of the payment flow](https://docs.stripe.com/payments/save-during-payment.md?platform=web#web-create-payment-intent) during the initial payment flow for future, recurring usage.

  When you’re ready to charge the customer, [charge the saved payment method](https://docs.stripe.com/payments/save-and-reuse.md?platform=web&ui=elements#charge-saved-payment-method). |
| **Features**  | - Requires some coding.
  - Customize appearance and behavior in your app.
  - Supports multiple products and prices in different currencies.
  - Supports responsive web and mobile native.
  - Website required. You can use Stripe Elements to customize the appearance of payment forms.                                                                                                                                                                                                                                                                                                                                                                               |
| **Use cases** | - [Accept payments from customers on a recurring basis](https://docs.stripe.com/recurring-payments.md#accept-recurring-payments)
  - [Accept recurring donations](https://docs.stripe.com/recurring-payments.md#recurring-donations)
  - [Enable customers to manage their own subscriptions](https://docs.stripe.com/recurring-payments.md#enable-customer-portal)                                                                                                                                                                                                                                                                                                        |

## Stripe products for recurring payments 

The following table describes which Stripe products support recurring payments.

| Product           | Features                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Use cases                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Payment Links** | - No coding
  - Customize branding
  - One payment link for one or more products
  - Mobile support for responsive web
  - No website required; share link through SMS, email, or social media
  - [Stripe Tax](https://docs.stripe.com/tax.md) support                                                                                                                                                                                                                                                                                                    | - [Accept recurring payments](https://docs.stripe.com/recurring-payments.md#accept-recurring-payments)
  - [Enable customers to manage their own subscriptions](https://docs.stripe.com/recurring-payments.md#enable-customer-portal)
  - [Accept recurring donations](https://docs.stripe.com/recurring-payments.md#recurring-donations)                                                                                                            |
| **Invoicing**     | - No coding required. (You can optionally use the [Invoices API](https://docs.stripe.com/api/invoices.md) and prebuilt components like Stripe Checkout and Elements to build a programmatic invoicing integration.)
  - Customize branding and templates.
  - One invoice for one or more products. Optionally combine one-time and recurring products.
  - Mobile support for responsive web.
  - No website required. Share invoices through customer portal, hosted invoice page, or as PDFs.
  - [Stripe Tax](https://docs.stripe.com/tax.md) support. | - [Accept recurring payments](https://docs.stripe.com/recurring-payments.md#accept-recurring-payments)
  - [Enable customers to manage their own subscriptions](https://docs.stripe.com/recurring-payments.md#enable-customer-portal)
  - [Accept recurring donations](https://docs.stripe.com/recurring-payments.md#recurring-donations)                                                                                                            |
| **Subscriptions** | - No coding required. (You can optionally use the [Subscriptions API](https://docs.stripe.com/api/subscriptions.md) and prebuilt components like Stripe Checkout and Elements to build a programmatic subscriptions integration.)
  - Customize full appearance of payment forms and checkout experience.
  - Multiple products, prices, pricing models, and currencies.
  - Mobile support for responsive web.
  - No website required. You can also add subscriptions to your site.
  - [Stripe Tax](https://docs.stripe.com/tax.md) support.            | - [Accept recurring payments](https://docs.stripe.com/recurring-payments.md#accept-recurring-payments)
  - [Enable customers to manage their own subscriptions](https://docs.stripe.com/recurring-payments.md#enable-customer-portal)
  - [Accept recurring donations](https://docs.stripe.com/recurring-payments.md#recurring-donations)                                                                                                            |
| **Checkout**      | - Minimal coding
  - Customize branding
  - Multiple products and prices in different currencies
  - Mobile support for responsive web
  - Website required, but Stripe hosts the payment page
  - [Stripe Tax](https://docs.stripe.com/tax.md) support                                                                                                                                                                                                                                                                                                    | - [Accept recurring payments](https://docs.stripe.com/recurring-payments.md#accept-recurring-payments)
  - [Enable customers to manage their own subscriptions](https://docs.stripe.com/recurring-payments.md#enable-customer-portal)
  - [Split purchases into a few payments](https://docs.stripe.com/recurring-payments.md#installment-plans)
  - [Accept recurring donations](https://docs.stripe.com/recurring-payments.md#recurring-donations) |
| **Elements**      | - More coding
  - Customize full appearance
  - Multiple products and prices in different currencies
  - Responsive web and mobile native
  - Website required; you add Elements to your payment page
  - [Stripe Tax](https://docs.stripe.com/tax.md) supported with your own [tax integration](https://docs.stripe.com/tax/custom.md)                                                                                                                                                                                                                    | - [Accept recurring payments](https://docs.stripe.com/recurring-payments.md#accept-recurring-payments)
  - [Enable customers to manage their own subscriptions](https://docs.stripe.com/recurring-payments.md#enable-customer-portal)
  - [Split purchases into a few payments](https://docs.stripe.com/recurring-payments.md#installment-plans)
  - [Accept recurring donations](https://docs.stripe.com/recurring-payments.md#recurring-donations) |
| **API**           | - Most coding
  - Customize full appearance, accept payments through your own UI
  - Multiple products and prices in different currencies
  - Website required; accept payments through your own UI
  - [Stripe Tax](https://docs.stripe.com/tax.md) supported with your own [tax integration](https://docs.stripe.com/tax/custom.md)                                                                                                                                                                                                                      | - [Accept recurring payments](https://docs.stripe.com/recurring-payments.md#accept-recurring-payments)
  - [Enable customers to manage their own subscriptions](https://docs.stripe.com/recurring-payments.md#enable-customer-portal)
  - [Split purchases into a few payments](https://docs.stripe.com/recurring-payments.md#installment-plans)
  - [Accept recurring donations](https://docs.stripe.com/recurring-payments.md#recurring-donations) |

## Accept recurring payments 

Stripe offers several ways for you to accept recurring payments. Use Subscriptions with Stripe Billing, PaymentIntents, SetupIntents, or Invoicing.

### Use subscriptions to accept recurring payments

If you have a business model where your customers pay you on a regular basis, you typically want to offer them subscriptions. Stripe offers several ways to create and manage subscriptions.

If you use [Organizations](https://docs.stripe.com/get-started/account/orgs.md), you can view a list of your subscriptions across all of your accounts. You can also filter this list by account. However, you can create and analyze subscriptions only from the Subscriptions page at the account level.

> Subscriptions are part of Stripe Billing, which has its own pricing plan.

#### Create subscriptions from the Dashboard 

To create a subscription:

1. In the Stripe Dashboard, go to the [subscriptions](https://dashboard.stripe.com/test/subscriptions) page.

1. Click **+Create subscription**.

1. Find or add a customer.

1. Enter the pricing and product information. You can add multiple products.

1. Set the start and end date of the subscription.

1. Set the starting date for the billing cycle. This defines when the next invoice is generated. Depending on your settings, the saved payment method on file might also be charged automatically on the billing cycle date. Learn more about the [billing cycle date](https://docs.stripe.com/billing/subscriptions/billing-cycle.md).

1. (Recommended) [Configure email reminders and notifications](https://docs.stripe.com/invoicing/send-email.md#email-configuration) for subscribers.

1. (Optional) Add the default tax behavior, a coupon, a free trial, or metadata.

1. (Optional) Enable [revenue recovery](https://docs.stripe.com/billing/revenue-recovery.md) features in the Dashboard, which can help you reduce and recover failed subscription payments. You can automatically retry failed payments, build custom automations, configure customer emails, and so on.

#### Create subscriptions with Payment Links 

To create subscriptions with Payment Links, select **Sell a subscription** when you create the payment link. Then, share the link with your customers. Learn more about [creating](https://docs.stripe.com/payment-links/create.md) and [sharing](https://docs.stripe.com/payment-links/share.md) payment links.

#### Create subscriptions with Checkout 

If you’re using *Checkout* (A low-code payment integration that creates a customizable form for collecting payments. You can embed Checkout directly in your website, redirect customers to a Stripe-hosted payment page, or create a customized checkout page with Stripe Elements) as your payment UI, create subscriptions with the [Checkout Sessions API](https://docs.stripe.com/api/checkout/sessions.md#checkout_sessions). In typical integrations, you add a button to your site that calls the backend of your application to create the checkout session. Read the [subscriptions integration guide](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md?payment-ui=checkout&ui=stripe-hosted) to learn more.

After a payment succeeds, the subscription becomes active and the [Checkout Session object](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object) contains references to the Customer and Subscription objects.

To create a subscription with this API, pass `mode=subscription`:

#### Ruby

```ruby

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

# The price ID passed from the front end.
#   price_id = params['priceId']
price_id = '{{PRICE_ID}}'

session = Stripe::Checkout::Session.create({
  success_url: 'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
  mode: 'subscription',
  line_items: [{
    # For usage-based billing, don't pass quantity
    quantity: 1,
    price: price_id
  }],
  subscription_data: {
    billing_mode: { type: 'flexible' }
  }
})

# Redirect to the URL returned on the session
#   redirect session.url, 303
```

#### Create subscriptions with Elements 

If you’re using *Elements* (A set of UI components for building a web checkout flow. They adapt to your customer's locale, validate input, and use tokenization, keeping sensitive customer data from touching your server) as your payment UI, create subscriptions with the [Subscriptions API](https://docs.stripe.com/api/subscriptions.md).

Pass the selected price ID and the ID of the customer record to the backend. Then, on the backend, create the subscription with status `incomplete` using `payment_behavior=default_incomplete`. Then return the `client_secret` from the subscription’s first [PaymentIntent](https://docs.stripe.com/payments/paymentintents/lifecycle.md) to the frontend to complete payment. Learn how to [build a subscriptions integration with Elements](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md?payment-ui=elements).

#### Ruby

```ruby

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-subscription' do
  content_type 'application/json'
  data = JSON.parse(request.body.read)
  customer_id = cookies[:customer]
  price_id = data['priceId']

  # Create the subscription. Note we're expanding the Subscription's
  # latest invoice and that invoice's confirmation_secret
  # so we can pass it to the front end to confirm the payment
  subscription = Stripe::Subscription.create(
    customer: customer_id,
    items: [{
      price: price_id,
    }],
    payment_behavior: 'default_incomplete',
    payment_settings: {save_default_payment_method: 'on_subscription'},
    billing_mode: {type: 'flexible'},
    expand: ['latest_invoice.confirmation_secret']
  )

  { subscriptionId: subscription.id, clientSecret: subscription.latest_invoice.confirmation_secret.client_secret }.to_json
end
```

At this point, the subscription is `inactive` and awaiting payment. In the following example response, the minimum fields you *must* store are highlighted. We recommend that you also store any field that your application frequently accesses.

```json
{"id": "sub_JgRjFjhKbtD2qz",
  "object": "subscription",
  "application_fee_percent": null,
  "automatic_tax": {
    "disabled_reason": null,
    "enabled": false,
    "liability": "null"
  },
  "billing_cycle_anchor": 1623873347,
  "billing_cycle_anchor_config": null,
  "cancel_at": null,
  "cancel_at_period_end": false,
  "canceled_at": null,
  "cancellation_details": {
    comment: null,
    feedback: null,
    reason: null
  },
  "collection_method": "charge_automatically",
  "created": 1623873347,
  "currency": "usd"customer": "cus_CMqDWO2xODTZqt",
  "days_until_due": null,
  "default_payment_method": null,
  "default_source": null,
  "default_tax_rates": [

  ],
  "discounts": [],
  "ended_at": null,
  "invoice_customer_balance_settings": {
    "account_tax_ids": null,
    issuer: {
      type: "self"
    }
  },
  "items": {
    "object": "list",
    "data": [
      {
        "id": "si_JgRjmS4Ur1khEx",
        "object": "subscription_item",
        "created": 1623873347,"current_period_end": 1626465347,
        "current_period_start": 1623873347,
        discounts: [],
        "metadata": {
        },
        "plan": {
          "id": "price_1J32RfGPZ1iASj5zHHp57z7C",
          "object": "plan",
          "active": true,
          "amount": 2000,
          "amount_decimal": "2000",
          "billing_scheme": "per_unit",
          "created": 1623864151,
          "currency": "usd",
          "interval": "month",
          "interval_count": 1,
          "livemode": false,
          "metadata": {
          },
          "nickname": null,
          "product": "prod_JgPF5xnq7qBun3",
          "tiers": null,
          "tiers_mode": null,
          "transform_usage": null,
          "trial_period_days": null,
          "usage_type": "licensed"
        },
        "price": {
          "id": "price_1J32RfGPZ1iASj5zHHp57z7C",
          "object": "price",
          "active": true,
          "billing_scheme": "per_unit",
          "created": 1623864151,
          "currency": "usd",
          "livemode": false,
          "lookup_key": null,
          "metadata": {
          },
          "nickname": null,
          "product": "prod_JgPF5xnq7qBun3",
          "recurring": {
            "interval": "month",
            "interval_count": 1,
            "trial_period_days": null,
            "usage_type": "licensed"
          },
          "tiers_mode": null,
          "transform_quantity": null,
          "type": "recurring",
          "unit_amount": 2000,
          "unit_amount_decimal": "2000"
        },
        "quantity": 1,
        "subscription": "sub_JgRjFjhKbtD2qz",
        "tax_rates": [

        ]
      }
    ],
    "has_more": false,
    "total_count": 1,
    "url": "/v1/subscription_items?subscription=sub_JgRjFjhKbtD2qz"
  },
  "latest_invoice": {
    "id": "in_1J34pzGPZ1iASj5zB87qdBNZ",
    "object": "invoice",
    "account_country": "US",
    "account_name": "Angelina's Store",
    "account_tax_ids": null,
    "amount_due": 2000,
    "amount_overpaid": 0,
    "amount_paid": 0,
    "amount_remaining": 2000,
    "amount_shipping": 0,
    "attempt_count": 0,
    "attempted": false,
    "auto_advance": false,
    "automatic_tax": {
      "disabled_reason": null,
      "enabled": false,
      liability: null,
      "status": null
    },
    "automatically_finalizes_at": null,
    "billing_reason": "subscription_update",
    "collection_method": "charge_automatically",
    "created": 1623873347,
    "currency": "usd",
    "custom_fields": null,
    "customer": "cus_CMqDWO2xODTZqt",
    "customer_address": null,
    "customer_email": "angelina@stripe.com",
    "customer_name": null,
    "customer_phone": null,
    "customer_shipping": {
      "address": {
        "city": "",
        "country": "US",
        "line1": "Berry",
        "line2": "",
        "postal_code": "",
        "state": ""
      },
      "name": "",
      "phone": null
    },
    "customer_tax_exempt": "none",
    "customer_tax_ids": [

    ],
    "default_payment_method": null,
    "default_source": null,
    "default_tax_rates": [

    ],
    "description": null,
    "discounts": [],
    "due_date": null,
    "effective_at": "1623873347
    "ending_balance": 0,
    "footer": null,
    "from_invoice": null,
    "hosted_invoice_url": "https://invoice.stripe.com/i/acct_1By64KGPZ1iASj5z/invst_JgRjzIOILGeq2MKC9T0KtyXnD5udsLp",
    "invoice_pdf": "https://pay.stripe.com/invoice/acct_1By64KGPZ1iASj5z/invst_JgRjzIOILGeq2MKC9T0KtyXnD5udsLp/pdf",
    "last_finalization_error": null,
    "latest_revision": null,
    "lines": {
      "object": "list",
      "data": [
        {
          "id": "il_1N2CjMBwKQ696a5NeOawRQP2",
          "object": "line_item",
          "amount": 2000,
          "currency": "usd",
          "description": "1 × Gold Special (at $20.00 / month)",
          "discount_amounts": [

          ],
          "discountable": true,
          "discounts": [

          ],
          "invoice": "in_1J34pzGPZ1iASj5zB87qdBNZ",
          "livemode": false,
          "metadata": {
          },
          "parent": {
            "invoice_item_details": null,
            "subscription_item_details":
            {
              "invoice_item": null
            "proration": false
            "proration_details":
            {
              "credited_items": null
            }
            subscription:
            "sub_JgRjFjhKbtD2qz"
            subscription_item:
              "si_JgRjmS4Ur1khEx"
            }
            type: "subscription_item_details"
          },
          "period": {
            "end": 1626465347,
            "start": 1623873347
          },
          "plan": {
            "id": "price_1J32RfGPZ1iASj5zHHp57z7C",
            "object": "plan",
            "active": true,
            "amount": 2000,
            "amount_decimal": "2000",
            "billing_scheme": "per_unit",
            "created": 1623864151,
            "currency": "usd",
            "interval": "month",
            "interval_count": 1,
            "livemode": false,
            "metadata": {
            },
            "nickname": null,
            "product": "prod_JgPF5xnq7qBun3",
            "tiers": null,
            "tiers_mode": null,
            "transform_usage": null,
            "trial_period_days": null,
            "usage_type": "licensed"
          },
          "price": {
            "id": "price_1J32RfGPZ1iASj5zHHp57z7C",
            "object": "price",
            "active": true,
            "billing_scheme": "per_unit",
            "created": 1623864151,
            "currency": "usd",
            "livemode": false,
            "lookup_key": null,
            "metadata": {
            },
            "nickname": null,
            "product": "prod_JgPF5xnq7qBun3",
            "recurring": {
              "interval": "month",
              "interval_count": 1,
              "trial_period_days": null,
              "usage_type": "licensed"
            },
            "tiers_mode": null,
            "transform_quantity": null,
            "type": "recurring",
            "unit_amount": 2000,
            "unit_amount_decimal": "2000"
          },
          "quantity": 1,
          "taxes": [],
        }
      ],
      "has_more": false,
      "total_count": 1,
      "url": "/v1/invoices/in_1J34pzGPZ1iASj5zB87qdBNZ/lines"
    },
    "livemode": false,
    "metadata": {
    },
    "next_payment_attempt": null,
    "number": "C008FC2-0354",
    "on_behalf_of": null,
    "parent": {
      "quote_details": null,
      "subscription_details": {
        "metadata": {},
        "pause_collection": null,
        "subscription": "sub_JgRjFjhKbtD2qz",
      }
    }
    "payment_intent": {
      "id": "pi_1J34pzGPZ1iASj5zI2nOAaE6",
      "object": "payment_intent",
      "allowed_source_types": [
        "card"
      ],
      "amount": 2000,
      "amount_capturable": 0,
      "amount_received": 0,
      "application": null,
      "application_fee_amount": null,
      "canceled_at": null,
      "cancellation_reason": null,
      "capture_method": "automatic",
      "charges": {
        "object": "list",
        "data": [

        ],
        "has_more": false,
        "total_count": 0,
        "url": "/v1/charges?payment_intent=pi_1J34pzGPZ1iASj5zI2nOAaE6"
      },
      "client_secret": "pi_1J34pzGPZ1iASj5zI2nOAaE6_secret_l7FN6ldFfXiFmJEumenJ2y2wu",
      "confirmation_method": "automatic",
      "created": 1623873347,
      "currency": "usd",
      "customer": "cus_CMqDWO2xODTZqt",
      "description": "Subscription creation",
      "invoice": "in_1J34pzGPZ1iASj5zB87qdBNZ",
      "last_payment_error": null,
      "livemode": false,
      "metadata": {
      },
      "next_action": null,
      "next_source_action": null,
      "on_behalf_of": null,
      "payment_method": null,
      "payment_method_options": {
        "card": {
          "installments": null,
          "network": null,
          "request_three_d_secure": "automatic"
        }
      },
      "payment_method_types": [
        "card"
      ],
      "receipt_email": null,
      "review": null,
      "setup_future_usage": "off_session",
      "shipping": null,
      "source": "card_1By6iQGPZ1iASj5z7ijKBnXJ",
      "statement_descriptor": null,
      "statement_descriptor_suffix": null,
      "status": "requires_confirmation",
      "transfer_data": null,
      "transfer_group": null
    },
    "payment_settings": {
      "payment_method_options": null,
      "payment_method_types": null,
      "save_default_payment_method": "on_subscription"
    },
    "period_end": 1623873347,
    "period_start": 1623873347,
    "post_payment_credit_notes_amount": 0,
    "pre_payment_credit_notes_amount": 0,
    "receipt_number": null,
    "starting_balance": 0,
    "statement_descriptor": null,
    "status": "open",
    "status_transitions": {
      "finalized_at": 1623873347,
      "marked_uncollectible_at": null,
      "paid_at": null,
      "voided_at": null
    },
    "subscription": "sub_JgRjFjhKbtD2qz",
    "subtotal": 2000,
    "tax": null,
    "tax_percent": null,
    "total": 2000,
    "total_discount_amounts": [],
    "total_tax_amounts": [],
    "transfer_data": null,
    "webhooks_delivered_at": 1623873347
  },
  "livemode": false,
  "metadata": {
  },
  "next_pending_invoice_item_invoice": null,
  "pause_collection": null,
  "pending_invoice_item_interval": null,
  "pending_setup_intent": null,
  "pending_update": null,
  "plan": {
    "id": "price_1J32RfGPZ1iASj5zHHp57z7C",
    "object": "plan",
    "active": true,
    "amount": 2000,
    "amount_decimal": "2000",
    "billing_scheme": "per_unit",
    "created": 1623864151,
    "currency": "usd",
    "interval": "month",
    "interval_count": 1,
    "livemode": false,
    "metadata": {
    },
    "nickname": null,
    "product": "prod_JgPF5xnq7qBun3",
    "tiers": null,
    "tiers_mode": null,
    "transform_usage": null,
    "trial_period_days": null,
    "usage_type": "licensed"
  },
  "quantity": 1,
  "schedule": null,
  "start": 1623873347,
  "start_date": 1623873347,
  "status": "incomplete",
  "tax_percent": null,
  "transfer_data": null,
  "trial_end": null,
  "trial_start": null
}
```

#### Create subscriptions through the Subscriptions API 

Use the [Subscriptions API](https://docs.stripe.com/api/subscriptions.md) to create basic subscriptions for recurring prices. Learn how to [build an end-to-end subscriptions integration](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md) or use the [immersive quickstart](https://docs.stripe.com/billing/quickstart.md).

Here’s how to create a subscription where the initial payment also includes a one-time purchase (like a service fee):

```curl
curl https://api.stripe.com/v1/subscriptions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer="{{CUSTOMER_ID}}" \
  -d "items[0][price]"={{RECURRING_PRICE_ID}} \
  -d "add_invoice_items[0][price]"={{ONE_TIME_PRICE_ID}}
```

#### Create subscriptions with the Subscription Schedules API

For more complex subscription scenarios, use the [Subscription Schedules API](https://docs.stripe.com/api/subscription_schedules.md). Learn more about [subscription schedules](https://docs.stripe.com/billing/subscriptions/subscription-schedules.md) and their [use cases](https://docs.stripe.com/billing/subscriptions/subscription-schedules.md#use-cases).

Here’s how to create a recurring subscription:

```curl
curl https://api.stripe.com/v1/subscriptions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer=cus_Gk0uVzT2M4xOKD \
  -d "items[0][price]"=price_F52b2UdntfQsfR \
  -d "expand[0]"="latest_invoice.payments" \
  -d "expand[1]"="latest_invoice.confirmation_secret" \
  -d off_session=true
```

### Save and reuse payment information for recurring charges

Set up recurring payments by charging a customer’s saved payment information. Capture the payment details with a *PaymentIntent* (API object that represents your intent to collect payment from a customer, tracking charge attempts and payment state changes throughout the process) or *SetupIntent* (The Setup Intents API lets you build dynamic flows for collecting payment method details for future payments. It tracks the lifecycle of a payment setup flow and can trigger additional authentication steps if required by law or by the payment method). Then use the  *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)) associated with those objects to charge the customer later. This approach is good if you don’t want to use Subscriptions or have implemented your own subscription logic. These steps only cover what’s needed to collect payment method information and to charge it. Read the guide for complete integration details to [save and reuse payment details](https://docs.stripe.com/payments/save-and-reuse.md).

- **Use PaymentIntents to capture payment information during a checkout flow.** Charge the customer on-session for their immediate purchase, then charge them later. This flow is good for: charging customers for an initial payment in a series of recurring payments, or charging for a one-time setup fee for a subscription service.
- **Use SetupIntents to capture payment information outside of a checkout flow.** Collect the details from the customer and store them in a SetupIntent. This flow is good for: capturing payment information while you onboard a customer that you intend to charge later, or for setting up free trials.

#### Save payment details during checkout (PaymentIntents)

1. As part of the checkout process, create a PaymentIntent and pass `setup_future_usage`. In most cases, you want to use `off_session` for recurring payments. Read more about [optimizing future payments](https://docs.stripe.com/payments/payment-intents.md#future-usage).
   ```curl
   curl https://api.stripe.com/v1/payment_intents \
     -u "<<YOUR_SECRET_KEY>>:" \
     -d customer="{{CUSTOMER_ID}}" \
     -d amount=1099 \
     -d currency=gbp \
     -d setup_future_usage=off_session \
     -d "automatic_payment_methods[enabled]"=true
   ```
1. Save the payment method information and associate it with the customer record. If you’re using Stripe Checkout, pass `setup_future_usage` in the `payment_intent_data` array. See an example of how to [save payment details](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=checkout&ui=stripe-hosted#save-payment-method-details) with Checkout. If you’re using *Elements* (A set of UI components for building a web checkout flow. They adapt to your customer's locale, validate input, and use tokenization, keeping sensitive customer data from touching your server), capture the information with the [Address Element](https://docs.stripe.com/elements/address-element.md).
1. When you’re ready, retrieve the payment method information for the customer and charge them by creating another PaymentIntent. To reduce the chance of declines, pass `off_session` and `confirm` as `True`. These arguments indicate that the customer is not present and enable immediate confirmation.
   #### curl

   ```bash
   curl https://api.stripe.com/v1/payment_intents \
     -u <<YOUR_SECRET_KEY>>: \
     -d amount=1099 \
     -d currency=usd \
     # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
     -d "automatic_payment_methods[enabled]"=true \-d customer="{{CUSTOMER_ID}}" \
     -d payment_method="{{PAYMENT_METHOD_ID}}" \
     -d return_url="https://example.com/order/123/complete" \
     -d off_session=true \
     -d confirm=true
   ```

#### Save payment details outside of checkout (SetupIntents)

1. Create a SetupIntent on your server and attach it to a specific [Customer](https://docs.stripe.com/billing/customer.md). You can optionally set [automatic_payment_methods](https://docs.stripe.com/api/setup_intents/object.md#setup_intent_object-automatic_payment_methods) to `true`. Stripe enables this functionality by default in the latest version of the API.

   #### curl

   ```bash
   
   curl https://api.stripe.com/v1/setup_intents \
     -u <<YOUR_SECRET_KEY>>: \
     -H "Stripe-Version: 2025-10-29.clover" \
     -X "POST" \
     -d "customer"="{{CUSTOMER_ID}}" \
     -d "automatic_payment_methods[enabled]"=true
   ```

1. Collect payment information:

   - Collect payment details with the Payment Element.
   - Collect shipping details with the Address Element.
   - Optionally, add Link as a payment method to enable faster checkout.

1. Submit the payment details to Stripe. Set up a `return_url` so that Stripe can redirect your customer. If necessary, we redirect them to intermediate sites, like a bank authorization page before redirecting them back to the `return_url`.

1. When you’re ready to complete the payment off-session, use the Customer and PaymentMethod IDs to create a PaymentIntent.

### Use invoices to automatically charge customers

You can use invoices to handle recurring payments. For example, the Powdur company has a monthly landscaping service. Each month, the landscapers send Powdur an invoice and automatically charge the payment method they have on file for Powdur.

The following sections describe your options for using invoices for recurring payments.

### Create an invoice through the Dashboard

To create and send an invoice, complete the following steps:

1. In the Dashboard, go to the [Invoices page](https://dashboard.stripe.com/invoices), and click **Create Invoice** to open the [invoice editor](https://dashboard.stripe.com/invoices/create). Whenever you exit the invoice editor, Stripe saves a draft. (To delete a draft invoice, click the overflow menu (⋯) next to an invoice on the [Invoices page](https://dashboard.stripe.com/invoices).)

1. Select an existing customer or click **Add new customer**. For new customers, you have to enter a name. You can optionally add an email address or other details.

1. (Optional) Click the overflow menu (⋯) in the **Items** section to open the **Items Options** dialog. Choose the desired currency and tax rendering option for the invoice.

1. Select **Add one-time item** to create a single, one-time item. To save a product for future use, select **Create new product**.

1. Enter the **Quantity** and **Price** for your new item or product.

1. (Optional) Click the **Item options** under each item to add a tax rate, coupon, or supply date. You can also use the Dashboard to create a [tax rate](https://dashboard.stripe.com/tax-rates) or [coupon](https://dashboard.stripe.com/coupons/create).

1. (Optional) Use the **Memo** box to provide more information to your customer. You can edit the memo on an invoice by clicking **Edit memo** on its details page.

1. Select one of the following invoice delivery options:

   - **Automatically charge a payment method on file**: Immediately charges the invoice amount to your customer’s payment method that you have on file.

   - **Send invoice or payment page link manually**: Provides a payment link for you to send to customers after you confirm the invoice.

   - **Email invoice with link**: Enables Stripe to send an email with a payment page and an invoice PDF.

   - **Email invoice without link**: Enables Stripe to send an invoice PDF only.

1. (Optional) To schedule this invoice to [finalize automatically](https://docs.stripe.com/invoicing/scheduled-finalization.md) at some date in the future, select **Schedule send date**. Or, depending on what you selected in the previous step, **Schedule charge date** or **Schedule finalization date**.

1. (Optional) Expand **Advanced options**, and add [custom fields](https://docs.stripe.com/invoicing/customize.md#custom-fields). To learn more, see [Net prices and taxes](https://docs.stripe.com/invoicing/taxes.md#net-price-taxes). Expand **Advanced options**, and add [custom fields](https://docs.stripe.com/invoicing/customize.md#custom-fields).

1. Click **Review invoice** and decide whether you want to include additional emails or continue editing. Send the invoice.
![](https://d37ugbyn3rpeym.cloudfront.net/videos/invoice-editor-net-price-supply-date.mp4)
### Create an invoice through the API

You can create an invoice through the [Invoices API](https://docs.stripe.com/api/invoices.md). You need to create product, price, and customer before you create the invoice because you specify those values for the invoice and invoice items. Read the guide to understand all the steps for [integrating with the Invoicing API](https://docs.stripe.com/invoicing/integration.md). Or see the [quickstart](https://docs.stripe.com/invoicing/integration/quickstart.md) for an immersive, code-first experience.

To create an invoice through the API, follow these steps:

Set the [collection_method](https://docs.stripe.com/api/invoices/object.md#invoice_object-collection_method) attribute to `send_invoice`. For Stripe to mark an invoice as past due, you must add the [days_until_due](https://docs.stripe.com/api/invoices/create.md#create_invoice-days_until_due) parameter. When you send an invoice, Stripe emails the invoice to the customer with payment instructions.

```curl
curl https://api.stripe.com/v1/invoices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer="{{CUSTOMER_ID}}" \
  -d collection_method=send_invoice \
  -d days_until_due=30
```

Then, create an invoice item by passing in the customer `id`, product `price`, and invoice ID `invoice`.

The maximum number of invoice items is 250.

```curl
curl https://api.stripe.com/v1/invoiceitems \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer="{{CUSTOMER_ID}}" \
  -d "pricing[price]"="{{PRICE_ID}}" \
  -d invoice="{{INVOICE_ID}}"
```

If you set `auto_advance` to `false`, you can continue to modify the invoice until you [finalize](https://docs.stripe.com/invoicing/integration/workflow-transitions.md) it. To finalize a draft invoice, use the Dashboard, send it to the customer, or pay it. You can also use the [Finalize](https://docs.stripe.com/api/invoices/finalize.md) API:

```curl
curl -X POST https://api.stripe.com/v1/invoices/{{INVOICE_ID}}/finalize \
  -u "<<YOUR_SECRET_KEY>>:"
```

If you create an invoice in error, [void](https://docs.stripe.com/invoicing/overview.md#void) it. You can also mark an invoice as [uncollectible](https://docs.stripe.com/invoicing/overview.md#uncollectible).

### Schedule recurring invoices

If you want to set up a recurring invoice, create a subscription.

You can choose how to collect payment:

- Send an invoice to the customer. You can set the collection terms, including due date and accepted payment methods.
- Automatically charge a saved payment method. If the customer has a saved payment method, Stripe automatically charges that method.

In the Dashboard, you configure payment collection in the subscription editor. In the API, you configure payment collection with the [collection_method](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-collection_method) parameter.

You can also configure Stripe to send customers [reminder emails about unpaid recurring invoices](https://docs.stripe.com/billing/revenue-recovery/customer-emails.md#unpaid-recurring-invoice-reminders).

Stripe automatically generates an invoice for each [billing cycle](https://docs.stripe.com/billing/subscriptions/billing-cycle.md) in a subscription. Learn more about the [invoice lifecycle for subscriptions](https://docs.stripe.com/billing/invoices/subscription.md#sub-invoice-lifecycle).

## Split purchases into a few payments 

Offer your customers payment plans in installments with [Subscription Schedules API](https://docs.stripe.com/api/subscription_schedules.md) (part of Stripe Billing) or buy now, pay later methods. If your business is based in Mexico, you can offer card payments in installments.

### Create an installment plan with Subscription Schedules

Installment plans allow customers to make partial payments for a set amount of time until the total amount is paid. For example, when The Pacific buys new printing presses, they sell the used ones to other publications. Smaller publications rarely have enough funds to pay for a printing press upfront, so they pay using an installment plan instead.

For most presses, The Pacific charges 1,000 USD per month so a reusable price is created:

```curl
curl https://api.stripe.com/v1/prices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d unit_amount=100000 \
  -d currency=usd \
  -d product=prod_Hh99apo1OViyGW \
  -d "recurring[interval]"=month
```

Depending on the make, model, and age of the printing press, The Pacific charges different amounts. This example charges 1,000 USD each month for 6 months, for a total of 6,000 USD.

```curl
curl https://api.stripe.com/v1/subscription_schedules \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer="{{CUSTOMER_ID}}" \
  -d start_date=now \
  -d end_behavior=cancel \
  -d "phases[0][items][0][price]"="{{PRICE_ID}}" \
  -d "phases[0][items][0][quantity]"=1 \
  -d "phases[0][iterations]"=6
```

The number of `iterations` is multiplied by the price’s interval—6 monthly payments in this example—to determine the number of times the customer is charged. `end_behavior` determines what happens to the subscription after the last iteration is complete. In an installment plan, the subscription isn’t needed anymore so `end_behavior` is set to `cancel`.

In rare cases, The Pacific charges less than the usual 1,000 USD per month. In these scenarios, they use `price_data` to create a single-use price. This example creates a 500 USD price, and charges monthly for 6 months:

```curl
curl https://api.stripe.com/v1/subscription_schedules \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer="{{CUSTOMER_ID}}" \
  -d start_date=now \
  -d end_behavior=cancel \
  -d "phases[0][items][0][price_data][currency]"=usd \
  -d "phases[0][items][0][price_data][product]"=prod_Hh99apo1OViyGW \
  -d "phases[0][items][0][price_data][recurring][interval]"=month \
  -d "phases[0][items][0][price_data][unit_amount]"=50000 \
  -d "phases[0][items][0][quantity]"=1 \
  -d "phases[0][iterations]"=6
```

### Use a buy now, pay later payment method

Stripe supports several different buy now, pay later methods. These methods let customers pay in installments over time. You’re paid immediately and in full. Your customers pay nothing or only a portion of the total purchase. Buy now, pay later methods help retailers boost conversion, increase average cart size, and reach new customers who don’t have credit cards.

[Learn more about buy now, pay later methods](https://docs.stripe.com/payments/buy-now-pay-later.md)

### Accept card payments in installments
(Only available in Mexico)
If your business is based in Mexico, you can offer your customers installments for card payments, or [meses sin intereses](https://docs.stripe.com/payments/meses-sin-intereses/accept-a-payment.md). Using this method [adds an additional fee](https://docs.stripe.com/payments/mx-installments.md#fees) to the standard credit card transaction fee.

Accept installments with a Stripe-hosted checkout page ([Stripe Checkout](https://docs.stripe.com/payments/meses-sin-intereses/accept-a-payment.md?platform=web&ui=stripe-hosted)), prebuilt UI components ([Stripe Elements](https://docs.stripe.com/payments/meses-sin-intereses/accept-a-payment.md?platform=web&ui=direct-api)), the [Invoicing API](https://docs.stripe.com/payments/meses-sin-intereses/accept-a-payment.md?platform=web&ui=invoices), or through [Payment Links](https://docs.stripe.com/payments/meses-sin-intereses/accept-a-payment.md?platform=no-code) with no code.

Some [connectors and plugins](https://docs.stripe.com/payments/mx-installments.md#connectors-and-plugins) also support installments.

#### Requirements for meses sin interes

There are restrictions on which transactions and cards can use meses sin intereses. You don’t need to implement these rules yourself. Stripe automatically determines meses sin intereses eligibility after you set up the payment method.

- Stripe only supports installments for Stripe Mexico accounts.
- The payment method must be a credit card issued in Mexico.
- The card must be a consumer card–installments don’t support corporate cards.
- The card must be issued by one of our [supported issuers](https://docs.stripe.com/payments/mx-installments.md#supported-cards).
- The currency value must be MXN (pesos).
- The total payment amount must be above a [minimum transaction amount](https://docs.stripe.com/payments/mx-installments.md#fees). Stripe provides a minimum transaction amount based on the number of months in the plan selected. You can specify which installment plans you want to enable and define your own custom minimum and maximum transaction amounts by [configuring custom installment settings](https://docs.stripe.com/payments/meses-sin-intereses/accept-a-payment.md#custom-settings) in the Dashboard.

## Enable customers to manage their own subscriptions 

If you want your customers to manage their own accounts and recurring subscriptions, use the customer portal. Stripe hosts the customer portal, which allows your customers to self-manage their payment details, download invoices, and manage their subscriptions in one place. Read the [no-code customer portal guide](https://docs.stripe.com/customer-management/activate-no-code-customer-portal.md) for complete details.

[Integrate with the customer portal API](https://docs.stripe.com/customer-management/integrate-customer-portal.md)

### Set up the customer portal

1. In the Stripe Dashboard, activate the customer portal link on the [customer portal settings page](https://dashboard.stripe.com/settings/billing/portal).
1. On the same page, go through the configuration options for the customer portal. [Set up the customer portal without writing any code](https://docs.stripe.com/customer-management/activate-no-code-customer-portal.md). Learn more about all the [configuration options](https://docs.stripe.com/customer-management/configure-portal.md).
1. Share the portal link with your customers.
1. (Optional) Customize the branding and prefill email addresses by adding the `prefilled_email` URL parameter to the portal link.
![](https://d37ugbyn3rpeym.cloudfront.net/videos/customer_portal/PortalFunctionalityTrimmed.mp4)
[View demo](https://billing.stripe.com/customer-portal-demo)

## Accept recurring donations 

You can accept recurring donations with Stripe, in the same way as recurring payments. For example, you have a llama rescue organization, Llama House, and want to allow supporters to choose an amount for a recurring, monthly donation. You can use Payment Links to create a link to share on social media and email. From the same payment link, you can also generate a QR code to add to flyers, and an embeddable buy button for your website–all from the Dashboard.

### Accept recurring donations with Payment Links

1. In the Stripe Dashboard, [create a payment link](https://dashboard.stripe.com/test/payment-links/create).
1. Select **Products or subscriptions**.
1. Find or add a recurring product that represents the recurring donation.
1. Under **Advanced options**, toggle the call to action option to **Donate**.
1. Create the link and share it. You can share the link directly, embed it as a button on your site, or generate a QR code.
1. Track payments associated with the payment link in the [payments overview in the Dashboard](https://dashboard.stripe.com/payments).

Learn more about [creating](https://docs.stripe.com/payment-links/create.md) and [sharing](https://docs.stripe.com/payment-links/share.md) payment links.

## Migrate existing subscriptions to Stripe 

If you have existing subscriptions in another system, you can migrate them to Stripe Billing. Read [the guide](https://docs.stripe.com/billing/subscriptions/migrate-subscriptions.md) for more information.

## See also

- [Get an overview of subscriptions](https://docs.stripe.com/billing.md)
- [Create a payment link](https://docs.stripe.com/payment-links/create.md)
- [Get started with no-code invoices](https://docs.stripe.com/invoicing/no-code-guide.md)
- [Save payment details during a payment to set up future payments](https://docs.stripe.com/payments/save-during-payment.md)
- [Save card details to set up future payments](https://docs.stripe.com/payments/save-and-reuse.md)