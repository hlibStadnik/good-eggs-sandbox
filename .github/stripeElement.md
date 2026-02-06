# Accept in-app payments

Build a customized payments integration in your iOS, Android, or React Native app using the Payment Element.

The Payment Element is a customizable component that renders a list of payment methods that you can add into any screen in your app. When customers interact with payment methods in the list, the component opens individual bottom sheets to collect payment details.

# Accept a payment

> This is a Accept a payment for when platform is ios and type is payment. View the full page at https://docs.stripe.com/payments/mobile/accept-payment-embedded?platform=ios&type=payment.

A PaymentIntent flow allows you to create a charge in your app. In this integration, you render the Payment Element, create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods), and confirm a charge in your app.

## Set up Stripe [Server-side] [Client-side]

### Server-side 

This integration requires endpoints on your server that talk to the Stripe API. Use our official libraries for access to the Stripe API from your server:

#### Ruby

```bash
# Available as a gem
sudo gem install stripe
```

```ruby
# If you use bundler, you can add this line to your Gemfile
gem 'stripe'
```

#### Python

```bash
# Install through pip
pip3 install --upgrade stripe
```

```bash
# Or find the Stripe package on http://pypi.python.org/pypi/stripe/
```

```python
# Find the version you want to pin:
# https://github.com/stripe/stripe-python/blob/master/CHANGELOG.md
# Specify that version in your requirements.txt file
stripe>=5.0.0
```

#### PHP

```bash
# Install the PHP library with Composer
composer require stripe/stripe-php
```

```bash
# Or download the source directly: https://github.com/stripe/stripe-php/releases
```

#### Java

```java
/*
  For Gradle, add the following dependency to your build.gradle and replace with
  the version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
*/
implementation "com.stripe:stripe-java:31.3.0"
```

```xml
<!--
  For Maven, add the following dependency to your POM and replace with the
  version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
-->
<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>31.3.0</version>
</dependency>
```

```bash
# For other environments, manually install the following JARs:
# - The Stripe JAR from https://github.com/stripe/stripe-java/releases/latest
# - Google Gson from https://github.com/google/gson
```

#### Node.js

```bash
# Install with npm
npm install stripe --save
```

#### Go

```bash
# Make sure your project is using Go Modules
go mod init
# Install stripe-go
go get -u github.com/stripe/stripe-go/v84
```

```go
// Then import the package
import (
  "github.com/stripe/stripe-go/v84"
)
```

#### .NET

```bash
# Install with dotnet
dotnet add package Stripe.net
dotnet restore
```

```bash
# Or install with NuGet
Install-Package Stripe.net
```

### Client-side 

The [Stripe iOS SDK](https://github.com/stripe/stripe-ios) is open source, [fully documented](https://stripe.dev/stripe-ios/index.html), and compatible with apps supporting iOS 13 or above.

#### Swift Package Manager

To install the SDK, follow these steps:

1. In Xcode, select **File** > **Add Package Dependencies…** and enter `https://github.com/stripe/stripe-ios-spm` as the repository URL.
1. Select the latest version number from our [releases page](https://github.com/stripe/stripe-ios/releases).
1. Add the **StripePaymentSheet** product to the [target of your app](https://developer.apple.com/documentation/swift_packages/adding_package_dependencies_to_your_app).

#### CocoaPods

1. If you haven’t already, install the latest version of [CocoaPods](https://guides.cocoapods.org/using/getting-started.html).
1. If you don’t have an existing [Podfile](https://guides.cocoapods.org/syntax/podfile.html), run the following command to create one:
   ```bash
   pod init
   ```
1. Add this line to your `Podfile`:
   ```podfile
   pod 'StripePaymentSheet'
   ```
1. Run the following command:
   ```bash
   pod install
   ```
1. Don’t forget to use the `.xcworkspace` file to open your project in Xcode, instead of the `.xcodeproj` file, from here on out.
1. In the future, to update to the latest version of the SDK, run:
   ```bash
   pod update StripePaymentSheet
   ```

#### Carthage

1. If you haven’t already, install the latest version of [Carthage](https://github.com/Carthage/Carthage#installing-carthage).
1. Add this line to your `Cartfile`:
   ```cartfile
   github "stripe/stripe-ios"
   ```
1. Follow the [Carthage installation instructions](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos). Make sure to embed all of the required frameworks listed [here](https://github.com/stripe/stripe-ios/tree/master/StripePaymentSheet/README.md#manual-linking).
1. In the future, to update to the latest version of the SDK, run the following command:
   ```bash
   carthage update stripe-ios --platform ios
   ```

#### Manual Framework

1. Head to our [GitHub releases page](https://github.com/stripe/stripe-ios/releases/latest) and download and unzip **Stripe.xcframework.zip**.
1. Drag **StripePaymentSheet.xcframework** to the **Embedded Binaries** section of the **General** settings in your Xcode project. Make sure to select **Copy items if needed**.
1. Repeat step 2 for all required frameworks listed [here](https://github.com/stripe/stripe-ios/tree/master/StripePaymentSheet/README.md#manual-linking).
1. In the future, to update to the latest version of our SDK, repeat steps 1–3.

> For details on the latest SDK release and past versions, see the [Releases](https://github.com/stripe/stripe-ios/releases) page on GitHub. To receive notifications when a new release is published, [watch releases](https://help.github.com/en/articles/watching-and-unwatching-releases-for-a-repository#watching-releases-for-a-repository) for the repository.

You also need to set your [publishable key](https://dashboard.stripe.com/apikeys) so that the SDK can make API calls to Stripe. To get started, you can hardcode the publishable key on the client while you’re integrating, but fetch the publishable key from your server in production.

```swift
// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
STPAPIClient.shared.publishableKey = "<<YOUR_PUBLISHABLE_KEY>>"
```

## Enable payment methods

View your [payment methods settings](https://dashboard.stripe.com/settings/payment_methods) and enable the payment methods you want to support. You need at least one payment method enabled to create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods).

By default, Stripe enables cards and other prevalent payment methods that can help you reach more customers, but we recommend turning on additional payment methods that are relevant for your business and customers. See [Payment method support](https://docs.stripe.com/payments/payment-methods/payment-method-support.md) for product and payment method support, and our [pricing page](https://stripe.com/pricing/local-payment-methods) for fees.

## Collect payment details [Client-side]

The Embedded Mobile Payment Element is designed to be placed on the checkout page of your native mobile app. The element displays a list of payment methods and you can customize it to match your app’s look and feel.

When the customer taps the **Card** row, it opens a sheet where they can enter their payment method details. The button in the sheet says **Continue** by default and dismisses the sheet when tapped, which lets your customer finish payment in your checkout.

![Payment Element](https://b.stripecdn.com/docs-statics-srv/assets/ios-embedded.b5867c116d537ffcb920dd80ebdfc741.png)
 

You can also configure the button to immediately complete payment instead of continuing. To do so, complete [this step](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#embedded-let-customer-pay-immediately) after following the guide.

#### UIKit

### Initialize the Payment Element

Call `create` to instantiate EmbeddedPaymentElement with a `EmbeddedPaymentElement.Configuration` and a [PaymentSheet.IntentConfiguration](https://github.com/stripe/stripe-ios/blob/master/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/PaymentSheetIntentConfiguration.swift).

The Configuration object contains general-purpose configuration options for EmbeddedPaymentElement that don’t change between payments, like `returnURL`. The `IntentConfiguration` object contains details about the specific payment like the amount and currency, as well as a `confirmationTokenConfirmHandler` callback. For now, leave its implementation empty. After it successfully initializes, set its `presentingViewController` and `delegate` properties.

```swift
import StripePaymentSheet

class MyCheckoutVC: UIViewController {

    func createEmbeddedPaymentElement() async throws -> EmbeddedPaymentElement {
        let intentConfig = PaymentSheet.IntentConfiguration(
          mode: .payment(amount: 1099, currency: "USD")
        ) { [weak self] confirmationToken in
          return await self?.handleConfirmationToken(confirmationToken)
        }
        var configuration = EmbeddedPaymentElement.Configuration()
        configuration.returnURL = "your-app://stripe-redirect" // Use the return url you set up in the previous step
        let embeddedPaymentElement = try await EmbeddedPaymentElement.create(intentConfiguration: intentConfig, configuration: configuration)
        embeddedPaymentElement.presentingViewController = self
        embeddedPaymentElement.delegate = self
        return embeddedPaymentElement
    }

    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
      // You'll implement this in the "Confirm the payment" section below
    }
}
```

### Add the Payment Element view

After EmbeddedPaymentElement successfully initializes, put its view in your checkout UI.

> The view must be contained within a scrollable view such as UIScrollView because it doesn’t have a fixed size and can change height after it initially renders.

```swift
class MyCheckoutVC: UIViewController {
    // ...
    private(set) var embeddedPaymentElement: EmbeddedPaymentElement?

    private lazy var checkoutButton: UIButton = {
        let checkoutButton = UIButton(type: .system)
        checkoutButton.backgroundColor = .systemBlue
        checkoutButton.layer.cornerRadius = 5.0
        checkoutButton.clipsToBounds = true
        checkoutButton.setTitle("Checkout", for: .normal)
        checkoutButton.setTitleColor(.white, for: .normal)
        checkoutButton.translatesAutoresizingMaskIntoConstraints = false
        checkoutButton.isEnabled = embeddedPaymentElement?.paymentOption != nil
        checkoutButton.addTarget(self, action: #selector(didTapConfirmButton), for: .touchUpInside)
        return checkoutButton
    }()
    // ...
    @objc func didTapConfirmButton() {
        // You'll implement this in the "Confirm the payment" section below
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        Task { @MainActor in
            do {
                // Create a UIScrollView
                let scrollView = UIScrollView()
                scrollView.translatesAutoresizingMaskIntoConstraints = false
                self.view.addSubview(scrollView)

	       // Create the Payment Element
                let embeddedPaymentElement = try await createEmbeddedPaymentElement()
                embeddedPaymentElement.delegate = self
                embeddedPaymentElement.presentingViewController = self
                self.embeddedPaymentElement = embeddedPaymentElement

                // Add its view to the scroll view
                scrollView.addSubview(embeddedPaymentElement.view)

	       // Add your own checkout button to the scroll view
                scrollView.addSubview(checkoutButton)

                // Set up layout constraints
                embeddedPaymentElement.view.translatesAutoresizingMaskIntoConstraints = false
                NSLayoutConstraint.activate([
                    scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
                    scrollView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
                    scrollView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
                    scrollView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),

                    embeddedPaymentElement.view.topAnchor.constraint(equalTo: scrollView.topAnchor),
                    embeddedPaymentElement.view.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
                    embeddedPaymentElement.view.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
                    checkoutButton.topAnchor.constraint(equalTo: embeddedPaymentElement.view.bottomAnchor, constant: 4.0),
                    checkoutButton.leadingAnchor.constraint(equalTo: scrollView.safeAreaLayoutGuide.leadingAnchor, constant: 4.0),
                    checkoutButton.trailingAnchor.constraint(equalTo: scrollView.safeAreaLayoutGuide.trailingAnchor, constant: -4.0),
                ])

            } catch {
                // Handle view not being added to view
            }
        }
    }
}
```

At this point you can run your app and see the Embedded Mobile Payment Element.

### Handle height changes

The EmbeddedPaymentElement’s view might grow or shrink in size, which can impact the layout of the view.

Handle height changes by implementing the `embeddedPaymentElementDidUpdateHeight` delegate method. EmbeddedPaymentElement’s view calls this method inside an animation block that updates its height. Your implementation is expected to call `setNeedsLayout()` and `layoutIfNeeded()` on the scroll view that contains the EmbeddedPaymentElement’s view to enable a smooth animation of the height change.

```swift
extension MyCheckoutVC: EmbeddedPaymentElementDelegate {
    func embeddedPaymentElementDidUpdateHeight(embeddedPaymentElement: StripePaymentSheet.EmbeddedPaymentElement) {
        // Handle layout appropriately
        self.view.setNeedsLayout()
        self.view.layoutIfNeeded()
    }
}
```

We recommend that you test that your view properly responds to changes in height. To do this, call `testHeightChange()` on EmbeddedPaymentElement to simulate showing and hiding a mandate within the element. Make sure that after calling `testHeightChange()`, your scroll view adjusts smoothly.

```swift
class MyCheckoutVC: UIViewController {
    override func viewDidLoad() {
        // This is only for testing purposes:
        #if DEBUG
        Timer.scheduledTimer(withTimeInterval: 5.0, repeats: true) { [weak self] _ in
            Task { @MainActor in
                self?.embeddedPaymentElement?.testHeightChange()
            }
        }
        #endif
    }
}
```

### (Optional) Display the selected payment option

If you need to access details about the customer’s selected payment option like a label (for example, “····4242”), image (for example, a VISA logo), or billing details to display in your UI, use the EmbeddedPaymentElement’s `paymentOption` property.

To be notified when the `paymentOption` changes, implement the `embeddedPaymentElementDidUpdatePaymentOption` delegate method.

```swift
extension MyCheckoutVC: EmbeddedPaymentElementDelegate {
  func embeddedPaymentElementDidUpdatePaymentOption(embeddedPaymentElement: EmbeddedPaymentElement) {
    print("The payment option changed: \(embeddedPaymentElement.paymentOption)")
    checkoutButton.isEnabled = embeddedPaymentElement.paymentOption != nil
  }
}
```

### (Optional) Update payment details

As the customer performs actions that change the payment details (for example, applying a discount code), update the `EmbeddedPaymentElement` instance to reflect the new values by calling the `update` method. Some payment methods, like Apple Pay and Google Pay, show the amount in the UI, so make sure it’s always accurate and up to date.

When the update call completes, update your UI. The update call might change the customer’s currently selected payment option.

```swift
extension MyCheckoutVC {
    func update() {
        Task { @MainActor in
            var updatedIntentConfig = oldIntentConfig
            // Update the amount to reflect the price after applying the discount code
            updatedIntentConfig.mode = PaymentSheet.IntentConfiguration.Mode.payment(amount: 999, currency: "USD")

            let result = await embeddedPaymentElement?.update(intentConfiguration: updatedIntentConfig)
            switch result {
            case .canceled, nil:
                // Do nothing; this happens when a subsequent `update` call cancels this one
                break
            case .failed(let error):
                // Display error to user in an alert, let users retry
            case .succeeded:
                // Update your UI in case the payment option changed
            }
        }
    }
}
```

### Confirm the payment

When the customer taps the checkout button, call `embeddedPaymentElement.confirm()` to complete the payment. Be sure to disable user interaction during confirmation.

```swift
extension MyCheckoutVC {
    @objc func didTapConfirmButton() {
        Task { @MainActor in
            guard let embeddedPaymentElement else { return }
            self.view.isUserInteractionEnabled = false // Disable user interaction, show a spinner, and so on before calling confirm.
            let result = await embeddedPaymentElement.confirm()
            switch result {
            case .completed:
                // Payment completed - show a confirmation screen.
            case .failed(let error):
                self.view.isUserInteractionEnabled = true
                // Encountered an unrecoverable error. You can display the error to the user, log it, and so on.
            case .canceled:
                self.view.isUserInteractionEnabled = true
                // Customer canceled - you should probably do nothing.
                break
            }
        }
    }
}
```

Next, implement the `confirmationTokenConfirmHandler` callback you passed to `PaymentSheet.IntentConfiguration` earlier to send a request to your server. Your server creates a PaymentIntent and returns its client secret. For information about this process, see [Create a PaymentIntent](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#submit-payment).

When the request returns, return your server response’s client secret or throw an error. The EmbeddedPaymentElement confirms the PaymentIntent using the client secret or displays the localized error message in its UI (either [errorDescription](https://developer.apple.com/documentation/foundation/localizederror/2946895-errordescription) or [localizedDescription](https://developer.apple.com/documentation/foundation/nserror/1414418-localizeddescription)). After confirmation completes, EmbeddedPaymentElement isn’t usable. Instead, direct the user to a receipt screen or something similar.

```swift
extension MyCheckoutVC {
    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
        // Make a request to your own server. Pass `confirmationToken.stripeId` if using server-side confirmation, and return the client secret or throw an error.
        let myServerClientSecret = try await fetchIntentClientSecret(...)
    }
}
```

#### SwiftUI

### Initialize the Payment Element

Call `load` to load EmbeddedPaymentElementViewModel with a `EmbeddedPaymentElement.Configuration` and a [PaymentSheet.IntentConfiguration](https://github.com/stripe/stripe-ios/blob/master/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/PaymentSheetIntentConfiguration.swift).

The Configuration object contains general-purpose configuration options for EmbeddedPaymentElement that don’t change between payments, like `returnURL`. The `IntentConfiguration` object contains details about the specific payment like the amount and currency, as well as a `confirmationTokenConfirmHandler` callback. For now, leave its implementation empty.

```swift
import SwiftUI
import StripePaymentSheet

struct MyEmbeddedCheckoutView: View {
    // Store an `EmbeddedPaymentElementViewModel` as a `@StateObject`
    @StateObject var embeddedViewModel = EmbeddedPaymentElementViewModel()

    var body: some View {
        ScrollView {
            // Empty scroll view for now
        }
        .task {
            do {
                if !embeddedViewModel.isLoaded {
                    // Load the view model with your configuration
                    try await loadEmbeddedViewModel()
                }
            } catch {
                // On load failure, implement retry logic (automatic retry or user-triggered through UI).
            }
        }
    }

    private func loadEmbeddedViewModel() async throws {
        let intentConfiguration = PaymentSheet.IntentConfiguration(
          mode: .payment(amount: 1099, currency: "USD")
        ) { confirmationToken in
          try await self.handleConfirmationToken(confirmationToken)
        }
        var configuration = EmbeddedPaymentElement.Configuration()
        configuration.returnURL = "your-app://stripe-redirect" // Use the return url you set up in the previous step
        try await embeddedViewModel.load(intentConfiguration: intentConfiguration, configuration: configuration)
    }

    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
      // You'll implement this in the "Confirm the payment" section below
    }
}
```

### Add the Payment Element view

After EmbeddedPaymentElementViewModel successfully loads, add EmbeddedPaymentElementView in your checkout UI.

> The view must be contained within a scrollable view such as ScrollView because it doesn’t have a fixed size and can change height after it initially renders.

```swift
struct MyEmbeddedCheckoutView: View {
    var body: some View {
        ScrollView {
	      // isLoaded becomes true only after a successful call to `embeddedViewModel.load()`
            if embeddedViewModel.isLoaded {
                EmbeddedPaymentElementView(viewModel: embeddedViewModel)
            }
        }
    }
}
```

At this point you can run your app and see the Embedded Mobile Payment Element.

### Handle height changes

The EmbeddedPaymentElementView might grow or shrink in size, which might impact the layout of the view. The EmbeddedPaymentElementView handles this automatically when inside a ScrollView.

We recommend that you test that your view properly responds to changes in height. To do this, call `testHeightChange()` on EmbeddedPaymentElementViewModel to simulate showing and hiding a mandate within the element. Make sure that after calling `testHeightChange()`, your scroll view adjusts smoothly.

```swift
struct MyEmbeddedCheckoutView: View {
    var body: some View {
        ScrollView {
            if embeddedViewModel.isLoaded {
                EmbeddedPaymentElementView(viewModel: embeddedViewModel)

                // For testing only
                #if DEBUG
                Button("Test height change") {
                    embeddedViewModel.testHeightChange()
                }
                #endif
            }
        }
    }
}
```

### (Optional) Display the selected payment option

If you need to access details about the customer’s selected payment option like a label (for example, “····4242”), image (for example, a VISA logo), or billing details to display in your UI, use the EmbeddedPaymentElementViewModel’s `paymentOption` property. When the customer selects a payment method that opens a form sheet, the payment option updates after they tap **Continue** in the sheet.

```swift
struct MyEmbeddedCheckoutView: View {
    var body: some View {
        ScrollView {
            if embeddedViewModel.isLoaded {
                // ...

                // A real integration probably wouldn't show the selected payment option on the same screen as the embedded payment element. We display it as an example.
                if let paymentOption = embeddedViewModel.paymentOption {
                    HStack {
                        Image(uiImage: paymentOption.image)
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(height: 30)
                        Text(paymentOption.label)
                        Spacer()
                    }
                    .padding()
                }
            }
        }
    }
}
```

### (Optional) Update payment details

As the customer performs actions that change the payment details (for example, applying a discount code), update the `EmbeddedPaymentElementViewModel` instance to reflect the new values by calling the `update` method. Some payment methods, like Apple Pay and Google Pay, show the amount in the UI, so make sure it’s always accurate and up to date.

When the update completes, the update might have changed the customer’s currently selected payment option.

```swift
extension MyEmbeddedCheckoutView {
    func update() {
        Task { @MainActor in
            var updatedIntentConfig = oldIntentConfig
            updatedIntentConfig.mode = PaymentSheet.IntentConfiguration.Mode.payment(amount: 999, currency: "USD")

            let result = await embeddedViewModel.update(intentConfiguration: updatedIntentConfig)
            switch result {
            case .canceled:
                // Do nothing; this happens when a subsequent `update` call cancels this one
                break
            case .failed(let error):
                // Display error to user in an alert, let users retry
            case .succeeded:
                // Update your UI in case the payment option changed
            }
        }
    }
}
```

### Confirm the payment

When the customer taps the checkout button, call `embeddedViewModel.confirm()` to complete the payment. Be sure to disable user interaction during confirmation.

```swift
extension MyEmbeddedCheckoutView {
    func didTapConfirmButton() {
        Task { @MainActor in
            // Be sure to disable user interaction during confirm (not shown in this example)
            let result = await embeddedViewModel.confirm()
            switch result {
            case .completed:
                // Payment completed - show a confirmation screen.
            case .failed(let error):
                // Encountered an unrecoverable error. Re-enable user interaction, display the error to the user, log it, and so on.
            case .canceled:
                // Customer canceled - re-enable user interaction and let them try again.
                break
            }
        }
    }
}
```

Next, implement the `confirmationTokenConfirmHandler` callback you passed to `PaymentSheet.IntentConfiguration` earlier to send a request to your server. Your server creates a PaymentIntent and returns its client secret. For information about this process, see [Create a PaymentIntent](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#submit-payment).

Return your server response’s client secret or throw an error. The EmbeddedPaymentElement confirms the PaymentIntent using the client secret or displays the localized error message in its UI (either [errorDescription](https://developer.apple.com/documentation/foundation/localizederror/2946895-errordescription) or [localizedDescription](https://developer.apple.com/documentation/foundation/nserror/1414418-localizeddescription)). After confirmation completes, EmbeddedPaymentElement isn’t usable. Instead, direct the user to a receipt screen or something similar.

```swift
extension MyEmbeddedCheckoutView {
    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
        // Make a request to your own server. Pass confirmationToken.stripeId if using server-side confirmation.
        // Return the client secret or throw an error
        return try await MyAPIClient.shared.createIntent(confirmationTokenId: confirmationToken.stripeId)
    }
}
```

## Optional: Clear the selected payment option

If you have payment options external to EmbeddedPaymentElement, you might need to clear the selected payment option. To do this, use the `clearPaymentOption` API to deselect the selected payment option.

#### UIKit

```swift
extension MyCheckoutVC: UIViewController {
    func deselectPaymentMethod() {
        embeddedPaymentElement?.clearPaymentOption()
    }
}
```

#### SwiftUI

```swift
@available(iOS 15.0, *)
extension MyEmbeddedCheckoutView {
    func deselectPaymentMethod() {
        embeddedViewModel.clearPaymentOption()
    }
}
```

## Optional: Display the mandate yourself

By default, the Embedded Mobile Payment Element displays mandates and legal disclaimers to ensure regulatory compliance. This text must be located close to your buy button. If necessary, disable its display in the view and display it yourself instead.

> Your integration must display the mandate text to be compliant. Make sure URLs in the text can be opened by using a UITextView or something similar.

#### UIKit

```swift
var configuration = EmbeddedPaymentElement.Configuration(...)
configuration.embeddedViewDisplaysMandateText = true

...

let mandateTextView = UITextView()
mandateTextView.attributedText = embeddedPaymentElement.paymentOption.mandateText
```

#### SwiftUI

```swift
var configuration = EmbeddedPaymentElement.Configuration(...)
configuration.embeddedViewDisplaysMandateText = true

...

if let attributedText = embeddedViewModel.paymentOption?.mandateText {
  Text(AttributedString(attributedText))
}
```

## Optional: Let the customer pay immediately in the sheet

![Embedded Payment Element](https://b.stripecdn.com/docs-statics-srv/assets/embedded-pay-immediate.057c691220d43158ac8000de10815ed9.png)
 

To configure the button in the form sheet to immediately confirm payment, set `formSheetAction` on your `EmbeddedPaymentElement.Configuration` object.

The completion block executes with the result of the payment after the sheet dismisses. The embedded UI isn’t usable after payment completes, so we recommend that your implementation directs the user to a different screen, such as a receipt screen.

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.formSheetAction = .confirm(completion: { result in
  switch result {
  case .completed:
    // Payment completed. You can for example, show a confirmation screen.
    print("Completed")
  case .failed(let error):
    // Encountered an unrecoverable error. You can display the error to the user, log it, etc.
    print(error)
  case .canceled:
    // Customer canceled - you should probably do nothing.
    break
  }
})
```

## Create a PaymentIntent [Server-side]

On your server, create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods) with an amount and currency. You can manage payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods). Stripe handles the return of eligible payment methods based on factors such as the transaction’s amount, currency, and payment flow. To prevent malicious customers from choosing their own prices, always decide how much to charge on the server-side (a trusted environment) and not the client.

If the call succeeds, return the PaymentIntent *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)). If the call fails, [handle the error](https://docs.stripe.com/error-handling.md) and return an error message with a brief explanation for your customer.

> Verify that all IntentConfiguration properties match your PaymentIntent (for example, `setup_future_usage`, `amount`, and `currency`).

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    amount: 1099,
    currency: 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'amount': 1099,
      'currency': 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'amount' => 1099,
    'currency' => 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setAmount(1099L)
          .setCurrency("usd")
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          )
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationTokenID string `json:"confirmation_token_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Amount = 1099,
        Currency = "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token_id")]
      public string ConfirmationTokenId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```

## Set up a return URL [Client-side]

The customer might navigate away from your app to authenticate (for example, in Safari or their banking app). To allow them to automatically return to your app after authenticating, [configure a custom URL scheme](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app) and set up your app delegate to forward the URL to the SDK. Stripe doesn’t support [universal links](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content).

#### SceneDelegate

#### Swift

```swift
// This method handles opening custom URL schemes (for example, "your-app://stripe-redirect")
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let url = URLContexts.first?.url else {
        return
    }
    let stripeHandled = StripeAPI.handleURLCallback(with: url)
    if (!stripeHandled) {
        // This was not a Stripe url – handle the URL normally as you would
    }
}

```

#### AppDelegate

#### Swift

```swift
// This method handles opening custom URL schemes (for example, "your-app://stripe-redirect")
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    let stripeHandled = StripeAPI.handleURLCallback(with: url)
    if (stripeHandled) {
        return true
    } else {
        // This was not a Stripe url – handle the URL normally as you would
    }
    return false
}
```

#### SwiftUI

#### Swift

```swift

@main
struct MyApp: App {
  var body: some Scene {
    WindowGroup {
      Text("Hello, world!").onOpenURL { incomingURL in
          let stripeHandled = StripeAPI.handleURLCallback(with: incomingURL)
          if (!stripeHandled) {
            // This was not a Stripe url – handle the URL normally as you would
          }
        }
    }
  }
}
```

Additionally, set the [returnURL](https://github.com/stripe/stripe-ios/blob/aa3234a7fafde98c9203b6ed77e0278c04310eb0/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L70) on your [EmbeddedPaymentElement.Configuration](https://github.com/stripe/stripe-ios/blob/aa3234a7fafde98c9203b6ed77e0278c04310eb0/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L12) object to the URL for your app.

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.returnURL = "your-app://stripe-redirect"
```

## Handle post-payment events [Server-side]

Stripe sends a [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md#event_types-payment_intent.succeeded) event when the payment completes. Use the [Dashboard webhook tool](https://dashboard.stripe.com/webhooks) or follow the [webhook guide](https://docs.stripe.com/webhooks/quickstart.md) to receive these events and run actions, such as sending an order confirmation email to your customer, logging the sale in a database, or starting a shipping workflow.

Listen for these events rather than waiting on a callback from the client. On the client, the customer could close the browser window or quit the app before the callback executes, and malicious clients could manipulate the response. Setting up your integration to listen for asynchronous events is what enables you to accept [different types of payment methods](https://stripe.com/payments/payment-methods-guide) with a single integration.

In addition to handling the `payment_intent.succeeded` event, we recommend handling these other events when collecting payments with the Payment Element:

| Event                                                                                                                           | Description                                                                                                                                                                                                                                                                         | Action                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.succeeded)           | Sent when a customer successfully completes a payment.                                                                                                                                                                                                                              | Send the customer an order confirmation and *fulfill* (Fulfillment is the process of providing the goods or services purchased by a customer, typically after payment is collected) their order. |
| [payment_intent.processing](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.processing)         | Sent when a customer successfully initiates a payment, but the payment has yet to complete. This event is most commonly sent when the customer initiates a bank debit. It’s followed by either a `payment_intent.succeeded` or `payment_intent.payment_failed` event in the future. | Send the customer an order confirmation that indicates their payment is pending. For digital goods, you might want to fulfill the order before waiting for payment to complete.                  |
| [payment_intent.payment_failed](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.payment_failed) | Sent when a customer attempts a payment, but the payment fails.                                                                                                                                                                                                                     | If a payment transitions from `processing` to `payment_failed`, offer the customer another attempt to pay.                                                                                       |

## Test the integration

#### Cards

| Card number         | Scenario                                                                                                                                                                                                                                                                                      | How to test                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 4242424242424242    | The card payment succeeds and doesn’t require authentication.                                                                                                                                                                                                                                 | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000002500003155    | The card payment requires *authentication* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase). | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000000000009995    | The card is declined with a decline code like `insufficient_funds`.                                                                                                                                                                                                                           | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 6205500000000000004 | The UnionPay card has a variable length of 13-19 digits.                                                                                                                                                                                                                                      | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |

#### Bank redirects

| Payment method    | Scenario                                                                                                                                                                                        | How to test                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bancontact, iDEAL | Your customer fails to authenticate on the redirect page for a redirect-based and immediate notification payment method.                                                                        | Choose any redirect-based payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page. |
| Pay by Bank       | Your customer successfully pays with a redirect-based and [delayed notification](https://docs.stripe.com/payments/payment-methods.md#payment-notification) payment method.                      | Choose the payment method, fill out the required details, and confirm the payment. Then click **Complete test payment** on the redirect page.            |
| Pay by Bank       | Your customer fails to authenticate on the redirect page for a redirect-based and delayed notification payment method.                                                                          | Choose the payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page.                |
| BLIK              | BLIK payments fail in a variety of ways—immediate failures (for example, the code is expired or invalid), delayed errors (the bank declines) or timeouts (the customer didn’t respond in time). | Use email patterns to [simulate the different failures.](https://docs.stripe.com/payments/blik/accept-a-payment.md#simulate-failures)                    |

#### Bank debits

| Payment method    | Scenario                                                                                          | How to test                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEPA Direct Debit | Your customer successfully pays with SEPA Direct Debit.                                           | Fill out the form using the account number `AT321904300235473204`. The confirmed PaymentIntent initially transitions to processing, then transitions to the succeeded status three minutes later. |
| SEPA Direct Debit | Your customer’s payment intent status transitions from `processing` to `requires_payment_method`. | Fill out the form using the account number `AT861904300235473202`.                                                                                                                                |

See [Testing](https://docs.stripe.com/testing.md) for additional information to test your integration.

## Optional: Enable saved cards [Server-side] [Client-side]

EmbeddedPaymentElement can display a **Save this card for future use** checkbox that saves the customer’s card, and display the customer’s saved cards. To enable this checkbox, create a [Customer](https://docs.stripe.com/api/customers.md) object on your server and an associated [CustomerSession](https://docs.stripe.com/api/customer_sessions.md), with `payment_method_save` set to `enabled`.

> #### Compare Customers v1 and Accounts v2 references
> 
> If your Connect platform uses [customer-configured Accounts](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-configuration-customer), use our [guide](https://docs.stripe.com/connect/use-accounts-as-customers.md) to replace `Customer` and event references in your code with the equivalent Accounts v2 API references.

```javascript
const stripe = require('stripe')('sk_test_your_secret_key');

app.post('/mobile-payment-element', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const customerSession = await stripe.customerSessions.create({
    customer: customer.id,
    components: {
      mobile_payment_element: {
        enabled: true,
        features: {
          payment_method_save: 'enabled',
          payment_method_redisplay: 'enabled',
          payment_method_remove: 'enabled'
        }
      },
    },
  });

  res.json({
    customerSessionClientSecret: customerSession.client_secret,
    customer: customer.id,
  });
});
```

Next, configure EmbeddedPaymentElement with the Customer’s ID and the CustomerSession client secret.

#### UIKit

```swift
@_spi(CustomerSessionBetaAccess) import StripePaymentSheet

var configuration = EmbeddedPaymentElement.Configuration()
configuration.customer = .init(id: customerId, customerSessionClientSecret: customerSessionClientSecret)

self.embeddedPaymentElement = try await EmbeddedPaymentElement.create(..., configuration: configuration)
```

#### SwiftUI

```swift
@_spi(CustomerSessionBetaAccess) import StripePaymentSheet

var configuration = EmbeddedPaymentElement.Configuration()
configuration.customer = .init(id: customerId, customerSessionClientSecret: customerSessionClientSecret)

try await embeddedViewModel.load(..., configuration: configuration)
```

## Optional: Allow delayed payment methods [Client-side]

*Delayed payment methods* (A payment method that can't immediately return payment status when a customer attempts a transaction (for example, ACH debits). Businesses commonly hold an order in a pending state until payment is successful with these payment methods) don’t guarantee that you’ll receive funds from your customer at the end of the checkout either because they take time to settle (for example, US Bank Accounts, SEPA Debit, iDEAL, and Bancontact) or because they require customer action to complete (for example, OXXO, Konbini, and Boleto).

By default, EmbeddedPaymentElement doesn’t display delayed payment methods. To opt in, set `allowsDelayedPaymentMethods` to true in your `EmbeddedPaymentElement.Configuration`. This step alone doesn’t activate any specific payment methods; rather, it indicates that your app is able to handle them. For example, although OXXO is currently not supported by EmbeddedPaymentElement, if it becomes supported and you’ve updated to the latest SDK version, your app will be able to display OXXO as a payment option without additional integration changes.

#### UIKit

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.allowsDelayedPaymentMethods = true

self.embeddedPaymentElement = try await EmbeddedPaymentElement.create(..., configuration: configuration)
```

#### SwiftUI

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.allowsDelayedPaymentMethods = true

try await embeddedViewModel.load(..., configuration: configuration)
```

If the customer successfully uses one of these delayed payment methods in EmbeddedPaymentElement, the payment result returned is `.completed`.

## Optional: Enable Apple Pay

> If your checkout screen has a dedicated **Apple Pay** button, follow the [Apple Pay guide](https://docs.stripe.com/apple-pay.md#present-payment-sheet) and use `ApplePayContext` to collect payment from your **Apple Pay** button. You can use `EmbeddedPaymentElement` to handle other payment method types.

### Register for an Apple Merchant ID

Obtain an Apple Merchant ID by [registering for a new identifier](https://developer.apple.com/account/resources/identifiers/add/merchant) on the Apple Developer website.

Fill out the form with a description and identifier. Your description is for your own records and you can modify it in the future. Stripe recommends using the name of your app as the identifier (for example, `merchant.com.{{YOUR_APP_NAME}}`).

### Create a new Apple Pay certificate

Create a certificate for your app to encrypt payment data.

Go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard, click **Add new application**, and follow the guide.

Download a Certificate Signing Request (CSR) file to get a secure certificate from Apple that allows you to use Apple Pay.

One CSR file must be used to issue exactly one certificate. If you switch your Apple Merchant ID, you must go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard to obtain a new CSR and certificate.

### Integrate with Xcode

Add the Apple Pay capability to your app. In Xcode, open your project settings, click the **Signing & Capabilities** tab, and add the **Apple Pay** capability. You might be prompted to log in to your developer account at this point. Select the merchant ID you created earlier, and your app is ready to accept Apple Pay.
![](https://b.stripecdn.com/docs-statics-srv/assets/xcode.a701d4c1922d19985e9c614a6f105bf1.png)

Enable the Apple Pay capability in Xcode

### Add Apple Pay

#### One-time payment

To add Apple Pay to EmbeddedPaymentElement, set [applePay](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L28) after initializing `EmbeddedPaymentElement.Configuration` with your Apple merchant ID and your business’s [country code](https://dashboard.stripe.com/settings/account).

#### iOS (Swift)

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.applePay = .init(
  merchantId: "merchant.com.your_app_name",
  merchantCountryCode: "US"
)
```

#### Recurring payments

To add Apple Pay to EmbeddedPaymentElement, set [applePay](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L28) after initializing `EmbeddedPaymentElement.Configuration` with your Apple merchant ID and your business’s [country code](https://dashboard.stripe.com/settings/account).

Per [Apple’s guidelines](https://developer.apple.com/design/human-interface-guidelines/apple-pay#Supporting-subscriptions) for recurring payments, you must also set additional attributes on the `PKPaymentRequest`. Add a handler in [ApplePayConfiguration.paymentRequestHandlers](https://stripe.dev/stripe-ios/stripepaymentsheet/documentation/stripepaymentsheet/paymentsheet/applepayconfiguration/handlers/paymentrequesthandler) to configure the [PKPaymentRequest.paymentSummaryItems](https://developer.apple.com/documentation/passkit/pkpaymentrequest/1619231-paymentsummaryitems) with the amount you intend to charge (for example, 9.95 USD a month).

You can also adopt [merchant tokens](https://developer.apple.com/apple-pay/merchant-tokens/) by setting the `recurringPaymentRequest` or `automaticReloadPaymentRequest` properties on the `PKPaymentRequest`.

To learn more about how to use recurring payments with Apple Pay, see [Apple’s PassKit documentation](https://developer.apple.com/documentation/passkit/pkpaymentrequest).

#### iOS (Swift)

```swift
let customHandlers = EmbeddedPaymentElement.ApplePayConfiguration.Handlers(
    paymentRequestHandler: { request in
        // PKRecurringPaymentSummaryItem is available on iOS 15 or later
        if #available(iOS 15.0, *) {
            let billing = PKRecurringPaymentSummaryItem(label: "My Subscription", amount: NSDecimalNumber(string: "59.99"))

            // Payment starts today
            billing.startDate = Date()

            // Payment ends in one year
            billing.endDate = Date().addingTimeInterval(60 * 60 * 24 * 365)

            // Pay once a month.
            billing.intervalUnit = .month
            billing.intervalCount = 1

            // recurringPaymentRequest is only available on iOS 16 or later
            if #available(iOS 16.0, *) {
                request.recurringPaymentRequest = PKRecurringPaymentRequest(paymentDescription: "Recurring",
                                                                            regularBilling: billing,
                                                                            managementURL: URL(string: "https://my-backend.example.com/customer-portal")!)
                request.recurringPaymentRequest?.billingAgreement = "You'll be billed $59.99 every month for the next 12 months. To cancel at any time, go to Account and click 'Cancel Membership.'"
            }
            request.paymentSummaryItems = [billing]
            request.currencyCode = "USD"
        } else {
            // On older iOS versions, set alternative summary items.
            request.paymentSummaryItems = [PKPaymentSummaryItem(label: "Monthly plan starting July 1, 2022", amount: NSDecimalNumber(string: "59.99"), type: .final)]
        }
        return request
    }
)
var configuration = EmbeddedPaymentElement.Configuration()
configuration.applePay = .init(merchantId: "merchant.com.your_app_name",
                                merchantCountryCode: "US",
                                customHandlers: customHandlers)
```

### Order tracking

To add [order tracking](https://developer.apple.com/design/human-interface-guidelines/technologies/wallet/designing-order-tracking) information in iOS 16 or later, configure an [authorizationResultHandler](https://stripe.dev/stripe-ios/stripepaymentsheet/documentation/stripepaymentsheet/paymentsheet/applepayconfiguration/handlers/authorizationresulthandler) in your `PaymentSheet.ApplePayConfiguration.Handlers`. Stripe calls your implementation after the payment is complete, but before iOS dismisses the Apple Pay sheet.

In your `authorizationResultHandler` implementation, fetch the order details from your server for the completed order. Add the details to the provided [PKPaymentAuthorizationResult](https://developer.apple.com/documentation/passkit/pkpaymentauthorizationresult) and return the modified result.

To learn more about order tracking, see [Apple’s Wallet Orders documentation](https://developer.apple.com/documentation/walletorders).

#### iOS (Swift)

```swift
let customHandlers = PaymentSheet.ApplePayConfiguration.Handlers(
    authorizationResultHandler: { result in
      do {
        // Fetch the order details from your service
        let myOrderDetails = try await MyAPIClient.shared.fetchOrderDetails(orderID: orderID)
        result.orderDetails = PKPaymentOrderDetails(
          orderTypeIdentifier: myOrderDetails.orderTypeIdentifier, // "com.myapp.order"
          orderIdentifier: myOrderDetails.orderIdentifier, // "ABC123-AAAA-1111"
          webServiceURL: myOrderDetails.webServiceURL, // "https://my-backend.example.com/apple-order-tracking-backend"
          authenticationToken: myOrderDetails.authenticationToken) // "abc123"
        // Return your modified PKPaymentAuthorizationResult
        return result
      } catch {
        return PKPaymentAuthorizationResult(status: .failure, errors: [error])
      }
    }
)
var configuration = EmbeddedPaymentElement.Configuration()
configuration.applePay = .init(merchantId: "merchant.com.your_app_name",
                               merchantCountryCode: "US",
                               customHandlers: customHandlers)
```

## Optional: Enable card scanning

#### iOS

To enable card scanning support, set the `NSCameraUsageDescription` (**Privacy - Camera Usage Description**) in the Info.plist of your application, and provide a reason for accessing the camera (for example, “To scan cards”). Devices with iOS 13 or higher support card scanning.

#### Android

To enable card scanning support, [request production access](https://developers.google.com/pay/api/android/guides/test-and-deploy/request-prod-access) to the Google Pay API from the [Google Pay and Wallet Console](https://pay.google.com/business/console?utm_source=devsite&utm_medium=devsite&utm_campaign=devsite).

- If you’ve enabled Google Pay, the card scanning feature is automatically available in our UI on eligible devices. To learn more about eligible devices, see the [Google Pay API constraints](https://developers.google.com/pay/payment-card-recognition/debit-credit-card-recognition)
- **Important:** The card scanning feature only appears in builds signed with the same signing key registered in the [Google Pay & Wallet Console](https://pay.google.com/business/console). Test or debug builds using different signing keys (for example, builds distributed through Firebase App Tester) won’t show the **Scan card** option. To test card scanning in pre-release builds, you must either:
  - Sign your test builds with your production signing key
  - Add your test signing key fingerprint to the Google Pay and Wallet Console

## Optional: Customize the element

All customization is configured through the [EmbeddedPaymentElement.Configuration](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L12) object.

### Appearance

Customize colors, fonts, and so on to match the look and feel of your app by using the [appearance API](https://docs.stripe.com/elements/appearance-api/embedded-mobile.md?platform=ios).

### Collect users addresses

Collect local and international shipping or billing addresses from your customers using the [Address Element](https://docs.stripe.com/elements/address-element.md?platform=ios).

### Merchant display name

Specify a customer-facing business name by setting [merchantDisplayName](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L66). By default, this is your app’s name.

#### Swift

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.merchantDisplayName = "My app, Inc."
```

### Dark mode

`EmbeddedPaymentElement` automatically adapts to the user’s system-wide appearance settings (light and dark mode). If your app doesn’t support dark mode, you can set [style](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L51) to `alwaysLight` or `alwaysDark` mode.

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.style = .alwaysLight
```

## Optional: Enable CVC recollection on confirmation

To re-collect the CVC of a saved card during PaymentIntent confirmation, your integration must collect payment details before creating a PaymentIntent.

### Update the intent configuration

`PaymentSheet.IntentConfiguration` accepts an optional parameter that controls when to re-collect CVC for a saved card.

```swift
let intentConfig = PaymentSheet.IntentConfiguration(
  mode: .payment(amount: 1099, currency: "USD"),
  confirmHandler: { confirmationToken in
    // Handle ConfirmationToken...}, requireCVCRecollection: true)
```

### Update parameters of the intent creation

To re-collect the CVC when confirming payment, include both the `customerId` and `require_cvc_recollection` parameters during the creation of the PaymentIntent.

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    amount: 1099,
    currency: 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: customer.id,
    payment_method_options: {
      card: {require_cvc_recollection: true}
    }
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'amount': 1099,
      'currency': 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },customer=customer['id'],
      payment_method_options={
        'card': {
          'require_cvc_recollection': True
        }
      }
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'amount' => 1099,
    'currency' => 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],'customer' => $customer->id,
    'payment_method_options' => [
      'card' => ['require_cvc_recollection' => true]
    ]
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},customer: customer.id,
      payment_method_options: {
        card: {
          require_cvc_recollection: true,
        },
      },
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setAmount(1099L)
          .setCurrency("usd")
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          ).setCustomer(customer.getId())
          .setPaymentMethodOptions(
            PaymentIntentCreateParams.PaymentMethodOptions.builder()
              .setCard(
                PaymentIntentCreateParams.PaymentMethodOptions.Card.builder()
                  .setRequireCvcRecollection(true)
                  .build()
              )
              .build()
          )
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      PaymentMethodID string `json:"payment_method_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },Customer: stripe.String(customer.ID),
      PaymentMethodOptions: stripe.PaymentIntentPaymentMethodOptionsParams{
        Card: stripe.PaymentIntentPaymentMethodOptionsCardParams{
          RequireCvcRecollection: stripe.Bool(true),
        }
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Amount = 1099,
        Currency = "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },Customer = customer.Id,
        PaymentMethodOptions = new PaymentIntentPaymentMethodOptionsOptions
        {
            Card = new PaymentIntentPaymentMethodOptionsCardOptions
            {
                RequireCvcRecollection = true,
            },
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("payment_method_id")]
      public string PaymentMethodId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```


# Collect and save a payment method

> This is a Collect and save a payment method for when platform is ios and type is setup. View the full page at https://docs.stripe.com/payments/mobile/accept-payment-embedded?platform=ios&type=setup.

A SetupIntent flow allows you to save payment methods for future payments without creating a charge. In this integration, you render the Payment Element, create a *SetupIntent* (The Setup Intents API lets you build dynamic flows for collecting payment method details for future payments. It tracks the lifecycle of a payment setup flow and can trigger additional authentication steps if required by law or by the payment method), and save the payment method in your app.

## Set up Stripe [Server-side] [Client-side]

### Server-side 

This integration requires endpoints on your server that talk to the Stripe API. Use our official libraries for access to the Stripe API from your server:

#### Ruby

```bash
# Available as a gem
sudo gem install stripe
```

```ruby
# If you use bundler, you can add this line to your Gemfile
gem 'stripe'
```

#### Python

```bash
# Install through pip
pip3 install --upgrade stripe
```

```bash
# Or find the Stripe package on http://pypi.python.org/pypi/stripe/
```

```python
# Find the version you want to pin:
# https://github.com/stripe/stripe-python/blob/master/CHANGELOG.md
# Specify that version in your requirements.txt file
stripe>=5.0.0
```

#### PHP

```bash
# Install the PHP library with Composer
composer require stripe/stripe-php
```

```bash
# Or download the source directly: https://github.com/stripe/stripe-php/releases
```

#### Java

```java
/*
  For Gradle, add the following dependency to your build.gradle and replace with
  the version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
*/
implementation "com.stripe:stripe-java:31.3.0"
```

```xml
<!--
  For Maven, add the following dependency to your POM and replace with the
  version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
-->
<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>31.3.0</version>
</dependency>
```

```bash
# For other environments, manually install the following JARs:
# - The Stripe JAR from https://github.com/stripe/stripe-java/releases/latest
# - Google Gson from https://github.com/google/gson
```

#### Node.js

```bash
# Install with npm
npm install stripe --save
```

#### Go

```bash
# Make sure your project is using Go Modules
go mod init
# Install stripe-go
go get -u github.com/stripe/stripe-go/v84
```

```go
// Then import the package
import (
  "github.com/stripe/stripe-go/v84"
)
```

#### .NET

```bash
# Install with dotnet
dotnet add package Stripe.net
dotnet restore
```

```bash
# Or install with NuGet
Install-Package Stripe.net
```

### Client-side 

The [Stripe iOS SDK](https://github.com/stripe/stripe-ios) is open source, [fully documented](https://stripe.dev/stripe-ios/index.html), and compatible with apps supporting iOS 13 or above.

#### Swift Package Manager

To install the SDK, follow these steps:

1. In Xcode, select **File** > **Add Package Dependencies…** and enter `https://github.com/stripe/stripe-ios-spm` as the repository URL.
1. Select the latest version number from our [releases page](https://github.com/stripe/stripe-ios/releases).
1. Add the **StripePaymentSheet** product to the [target of your app](https://developer.apple.com/documentation/swift_packages/adding_package_dependencies_to_your_app).

#### CocoaPods

1. If you haven’t already, install the latest version of [CocoaPods](https://guides.cocoapods.org/using/getting-started.html).
1. If you don’t have an existing [Podfile](https://guides.cocoapods.org/syntax/podfile.html), run the following command to create one:
   ```bash
   pod init
   ```
1. Add this line to your `Podfile`:
   ```podfile
   pod 'StripePaymentSheet'
   ```
1. Run the following command:
   ```bash
   pod install
   ```
1. Don’t forget to use the `.xcworkspace` file to open your project in Xcode, instead of the `.xcodeproj` file, from here on out.
1. In the future, to update to the latest version of the SDK, run:
   ```bash
   pod update StripePaymentSheet
   ```

#### Carthage

1. If you haven’t already, install the latest version of [Carthage](https://github.com/Carthage/Carthage#installing-carthage).
1. Add this line to your `Cartfile`:
   ```cartfile
   github "stripe/stripe-ios"
   ```
1. Follow the [Carthage installation instructions](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos). Make sure to embed all of the required frameworks listed [here](https://github.com/stripe/stripe-ios/tree/master/StripePaymentSheet/README.md#manual-linking).
1. In the future, to update to the latest version of the SDK, run the following command:
   ```bash
   carthage update stripe-ios --platform ios
   ```

#### Manual Framework

1. Head to our [GitHub releases page](https://github.com/stripe/stripe-ios/releases/latest) and download and unzip **Stripe.xcframework.zip**.
1. Drag **StripePaymentSheet.xcframework** to the **Embedded Binaries** section of the **General** settings in your Xcode project. Make sure to select **Copy items if needed**.
1. Repeat step 2 for all required frameworks listed [here](https://github.com/stripe/stripe-ios/tree/master/StripePaymentSheet/README.md#manual-linking).
1. In the future, to update to the latest version of our SDK, repeat steps 1–3.

> For details on the latest SDK release and past versions, see the [Releases](https://github.com/stripe/stripe-ios/releases) page on GitHub. To receive notifications when a new release is published, [watch releases](https://help.github.com/en/articles/watching-and-unwatching-releases-for-a-repository#watching-releases-for-a-repository) for the repository.

You also need to set your [publishable key](https://dashboard.stripe.com/apikeys) so that the SDK can make API calls to Stripe. To get started, you can hardcode the publishable key on the client while you’re integrating, but fetch the publishable key from your server in production.

```swift
// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
STPAPIClient.shared.publishableKey = "<<YOUR_PUBLISHABLE_KEY>>"
```

## Enable payment methods

View your [payment methods settings](https://dashboard.stripe.com/settings/payment_methods) and enable the payment methods you want to support. You need at least one payment method enabled to create a *SetupIntent* (The Setup Intents API lets you build dynamic flows for collecting payment method details for future payments. It tracks the lifecycle of a payment setup flow and can trigger additional authentication steps if required by law or by the payment method).

By default, Stripe enables cards and other prevalent payment methods that can help you reach more customers, but we recommend turning on additional payment methods that are relevant for your business and customers. See [Payment method support](https://docs.stripe.com/payments/payment-methods/payment-method-support.md) for product and payment method support, and our [pricing page](https://stripe.com/pricing/local-payment-methods) for fees.

## Create a Customer [Server-side]

To set up a payment method for future payments, you must attach it to a *Customer* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments). Create a `Customer` object when your customer creates an account with your business. `Customer` objects allow for reusing payment methods and tracking across multiple payments.

> #### Compare Customers v1 and Accounts v2 references
> 
> If your Connect platform uses [customer-configured Accounts](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-configuration-customer), use our [guide](https://docs.stripe.com/connect/use-accounts-as-customers.md) to replace `Customer` and event references in your code with the equivalent Accounts v2 API references.

```curl
curl -X POST https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:"
```

```cli
stripe customers create
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

customer = client.v1.customers.create()
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

# For SDK versions 12.4.0 or lower, remove '.v1' from the following line.
customer = client.v1.customers.create()
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$customer = $stripe->customers->create([]);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

CustomerCreateParams params = CustomerCreateParams.builder().build();

// For SDK versions 29.4.0 or lower, remove '.v1()' from the following line.
Customer customer = client.v1().customers().create(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const customer = await stripe.customers.create();
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.CustomerCreateParams{}
result, err := sc.V1Customers.Create(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new CustomerCreateOptions();
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.Customers;
Customer customer = service.Create(options);
```

## Collect payment details [Client-side]

The Embedded Mobile Payment Element is designed to be placed on the checkout page of your native mobile app. The element displays a list of payment methods and you can customize it to match your app’s look and feel.

When the customer taps the **Card** row, it opens a sheet where they can enter their payment method details. The button in the sheet says **Continue** by default and dismisses the sheet when tapped, which lets your customer finish the setup in your checkout.

![Payment Element](https://b.stripecdn.com/docs-statics-srv/assets/ios-embedded.b5867c116d537ffcb920dd80ebdfc741.png)
 

You can configure the button to immediately complete the setup instead of continuing. To do so, complete [this step](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#embedded-let-customer-pay-immediately) after following the guide.

#### UIKit

### Initialize the Payment Element

Call `create` to instantiate EmbeddedPaymentElement with a `EmbeddedPaymentElement.Configuration` and a [PaymentSheet.IntentConfiguration](https://github.com/stripe/stripe-ios/blob/master/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/PaymentSheetIntentConfiguration.swift).

The Configuration object contains general-purpose configuration options for EmbeddedPaymentElement that don’t change between payments, like `returnURL`. The `IntentConfiguration` object contains details about the specific payment like the amount and currency, as well as a `confirmationTokenConfirmHandler` callback. For now, leave its implementation empty. After it successfully initializes, set its `presentingViewController` and `delegate` properties.

```swift
import StripePaymentSheet

class MyCheckoutVC: UIViewController {

    func createEmbeddedPaymentElement() async throws -> EmbeddedPaymentElement {
        let intentConfig = PaymentSheet.IntentConfiguration(
          mode: .setup(currency: "USD")
        ) { [weak self] confirmationToken in
          return await self?.handleConfirmationToken(confirmationToken)
        }
        var configuration = EmbeddedPaymentElement.Configuration()
        configuration.returnURL = "your-app://stripe-redirect" // Use the return url you set up in the previous step
        let embeddedPaymentElement = try await EmbeddedPaymentElement.create(intentConfiguration: intentConfig, configuration: configuration)
        embeddedPaymentElement.presentingViewController = self
        embeddedPaymentElement.delegate = self
        return embeddedPaymentElement
    }

    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
      // You'll implement this in the "Confirm the payment" section below
    }
}
```

### Add the Payment Element view

After EmbeddedPaymentElement successfully initializes, put its view in your checkout UI.

> The view must be contained within a scrollable view such as UIScrollView because it doesn’t have a fixed size and can change height after it initially renders.

```swift
class MyCheckoutVC: UIViewController {
    // ...
    private(set) var embeddedPaymentElement: EmbeddedPaymentElement?

    private lazy var checkoutButton: UIButton = {
        let checkoutButton = UIButton(type: .system)
        checkoutButton.backgroundColor = .systemBlue
        checkoutButton.layer.cornerRadius = 5.0
        checkoutButton.clipsToBounds = true
        checkoutButton.setTitle("Checkout", for: .normal)
        checkoutButton.setTitleColor(.white, for: .normal)
        checkoutButton.translatesAutoresizingMaskIntoConstraints = false
        checkoutButton.isEnabled = embeddedPaymentElement?.paymentOption != nil
        checkoutButton.addTarget(self, action: #selector(didTapConfirmButton), for: .touchUpInside)
        return checkoutButton
    }()
    // ...
    @objc func didTapConfirmButton() {
        // You'll implement this in the "Confirm the payment" section below
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        Task { @MainActor in
            do {
                // Create a UIScrollView
                let scrollView = UIScrollView()
                scrollView.translatesAutoresizingMaskIntoConstraints = false
                self.view.addSubview(scrollView)

	       // Create the Payment Element
                let embeddedPaymentElement = try await createEmbeddedPaymentElement()
                embeddedPaymentElement.delegate = self
                embeddedPaymentElement.presentingViewController = self
                self.embeddedPaymentElement = embeddedPaymentElement

                // Add its view to the scroll view
                scrollView.addSubview(embeddedPaymentElement.view)

	       // Add your own checkout button to the scroll view
                scrollView.addSubview(checkoutButton)

                // Set up layout constraints
                embeddedPaymentElement.view.translatesAutoresizingMaskIntoConstraints = false
                NSLayoutConstraint.activate([
                    scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
                    scrollView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
                    scrollView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
                    scrollView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),

                    embeddedPaymentElement.view.topAnchor.constraint(equalTo: scrollView.topAnchor),
                    embeddedPaymentElement.view.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
                    embeddedPaymentElement.view.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
                    checkoutButton.topAnchor.constraint(equalTo: embeddedPaymentElement.view.bottomAnchor, constant: 4.0),
                    checkoutButton.leadingAnchor.constraint(equalTo: scrollView.safeAreaLayoutGuide.leadingAnchor, constant: 4.0),
                    checkoutButton.trailingAnchor.constraint(equalTo: scrollView.safeAreaLayoutGuide.trailingAnchor, constant: -4.0),
                ])

            } catch {
                // Handle view not being added to view
            }
        }
    }
}
```

At this point you can run your app and see the Embedded Mobile Payment Element.

### Handle height changes

The EmbeddedPaymentElement’s view might grow or shrink in size, which can impact the layout of the view.

Handle height changes by implementing the `embeddedPaymentElementDidUpdateHeight` delegate method. EmbeddedPaymentElement’s view calls this method inside an animation block that updates its height. Your implementation is expected to call `setNeedsLayout()` and `layoutIfNeeded()` on the scroll view that contains the EmbeddedPaymentElement’s view to enable a smooth animation of the height change.

```swift
extension MyCheckoutVC: EmbeddedPaymentElementDelegate {
    func embeddedPaymentElementDidUpdateHeight(embeddedPaymentElement: StripePaymentSheet.EmbeddedPaymentElement) {
        // Handle layout appropriately
        self.view.setNeedsLayout()
        self.view.layoutIfNeeded()
    }
}
```

We recommend that you test that your view properly responds to changes in height. To do this, call `testHeightChange()` on EmbeddedPaymentElement to simulate showing and hiding a mandate within the element. Make sure that after calling `testHeightChange()`, your scroll view adjusts smoothly.

```swift
class MyCheckoutVC: UIViewController {
    override func viewDidLoad() {
        // This is only for testing purposes:
        #if DEBUG
        Timer.scheduledTimer(withTimeInterval: 5.0, repeats: true) { [weak self] _ in
            Task { @MainActor in
                self?.embeddedPaymentElement?.testHeightChange()
            }
        }
        #endif
    }
}
```

### (Optional) Display the selected payment option

If you need to access details about the customer’s selected payment option like a label (for example, “····4242”), image (for example, a VISA logo), or billing details to display in your UI, use the EmbeddedPaymentElement’s `paymentOption` property.

To be notified when the `paymentOption` changes, implement the `embeddedPaymentElementDidUpdatePaymentOption` delegate method.

```swift
extension MyCheckoutVC: EmbeddedPaymentElementDelegate {
  func embeddedPaymentElementDidUpdatePaymentOption(embeddedPaymentElement: EmbeddedPaymentElement) {
    print("The payment option changed: \(embeddedPaymentElement.paymentOption)")
    checkoutButton.isEnabled = embeddedPaymentElement.paymentOption != nil
  }
}
```

### (Optional) Update payment details

As the customer performs actions that change the payment details (for example, applying a discount code), update the `EmbeddedPaymentElement` instance to reflect the new values by calling the `update` method. Some payment methods, like Apple Pay and Google Pay, show the amount in the UI, so make sure it’s always accurate and up to date.

When the update call completes, update your UI. The update call might change the customer’s currently selected payment option.

```swift
extension MyCheckoutVC {
    func update() {
        Task { @MainActor in
            var updatedIntentConfig = oldIntentConfig
            // Update the currency
            updatedIntentConfig.mode = PaymentSheet.IntentConfiguration.Mode.setup(currency: "USD")

            let result = await embeddedPaymentElement?.update(intentConfiguration: updatedIntentConfig)
            switch result {
            case .canceled, nil:
                // Do nothing; this happens when a subsequent `update` call cancels this one
                break
            case .failed(let error):
                // Display error to user in an alert, let users retry
            case .succeeded:
                // Update your UI in case the payment option changed
            }
        }
    }
}
```

### Confirm the setup

When the customer taps the checkout button, call `embeddedPaymentElement.confirm()` to complete the setup. Be sure to disable user interaction during confirmation.

```swift
extension MyCheckoutVC {
    @objc func didTapConfirmButton() {
        Task { @MainActor in
            guard let embeddedPaymentElement else { return }
            self.view.isUserInteractionEnabled = false // Disable user interaction, show a spinner, and so on before calling confirm.
            let result = await embeddedPaymentElement.confirm()
            switch result {
            case .completed:
                // Setup completed - show a confirmation screen.
            case .failed(let error):
                self.view.isUserInteractionEnabled = true
                // Encountered an unrecoverable error. You can display the error to the user, log it, and so on.
            case .canceled:
                self.view.isUserInteractionEnabled = true
                // Customer canceled - you should probably do nothing.
                break
            }
        }
    }
}
```

Next, implement the `confirmationTokenConfirmHandler` callback you passed to `PaymentSheet.IntentConfiguration` earlier to send a request to your server. Your server creates a SetupIntent and returns its client secret. For information about this process, see [Create a SetupIntent](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#submit-setup).

When the request returns, return your server response’s client secret or throw an error. The EmbeddedPaymentElement confirms the PaymentIntent using the client secret or displays the localized error message in its UI (either [errorDescription](https://developer.apple.com/documentation/foundation/localizederror/2946895-errordescription) or [localizedDescription](https://developer.apple.com/documentation/foundation/nserror/1414418-localizeddescription)). After confirmation completes, EmbeddedPaymentElement isn’t usable. Instead, direct the user to a receipt screen or something similar.

```swift
extension MyCheckoutVC {
    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
        // Make a request to your own server. Pass `confirmationToken.stripeId` if using server-side confirmation, and return the client secret or throw an error.
        let myServerClientSecret = try await fetchIntentClientSecret(...)
    }
}
```

#### SwiftUI

### Initialize the Payment Element

Call `load` to load EmbeddedPaymentElementViewModel with a `EmbeddedPaymentElement.Configuration` and a [PaymentSheet.IntentConfiguration](https://github.com/stripe/stripe-ios/blob/master/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/PaymentSheetIntentConfiguration.swift).

The Configuration object contains general-purpose configuration options for EmbeddedPaymentElement that don’t change between payments, like `returnURL`. The `IntentConfiguration` object contains details about the specific payment like the amount and currency, as well as a `confirmationTokenConfirmHandler` callback. For now, leave its implementation empty.

```swift
import SwiftUI
import StripePaymentSheet

struct MyEmbeddedCheckoutView: View {
    // Store an `EmbeddedPaymentElementViewModel` as a `@StateObject`
    @StateObject var embeddedViewModel = EmbeddedPaymentElementViewModel()

    var body: some View {
        ScrollView {
            // Empty scroll view for now
        }
        .task {
            do {
                if !embeddedViewModel.isLoaded {
                    // Load the view model with your configuration
                    try await loadEmbeddedViewModel()
                }
            } catch {
                // On load failure, implement retry logic (automatic retry or user-triggered through UI).
            }
        }
    }

    private func loadEmbeddedViewModel() async throws {
        let intentConfiguration = PaymentSheet.IntentConfiguration(
          mode: .setup(currency: "USD")
        ) { confirmationToken in
          try await self.handleConfirmationToken(confirmationToken)
        }
        var configuration = EmbeddedPaymentElement.Configuration()
        configuration.returnURL = "your-app://stripe-redirect" // Use the return url you set up in the previous step
        try await embeddedViewModel.load(intentConfiguration: intentConfiguration, configuration: configuration)
    }

    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
      // You'll implement this in the "Confirm the payment" section below
    }
}
```

### Add the Payment Element view

After EmbeddedPaymentElementViewModel successfully loads, add EmbeddedPaymentElementView in your checkout UI.

> The view must be contained within a scrollable view such as ScrollView because it doesn’t have a fixed size and can change height after it initially renders.

```swift
struct MyEmbeddedCheckoutView: View {
    var body: some View {
        ScrollView {
	      // isLoaded becomes true only after a successful call to `embeddedViewModel.load()`
            if embeddedViewModel.isLoaded {
                EmbeddedPaymentElementView(viewModel: embeddedViewModel)
            }
        }
    }
}
```

At this point you can run your app and see the Embedded Mobile Payment Element.

### Handle height changes

The EmbeddedPaymentElementView might grow or shrink in size, which might impact the layout of the view. The EmbeddedPaymentElementView handles this automatically when inside a ScrollView.

We recommend that you test that your view properly responds to changes in height. To do this, call `testHeightChange()` on EmbeddedPaymentElementViewModel to simulate showing and hiding a mandate within the element. Make sure that after calling `testHeightChange()`, your scroll view adjusts smoothly.

```swift
struct MyEmbeddedCheckoutView: View {
    var body: some View {
        ScrollView {
            if embeddedViewModel.isLoaded {
                EmbeddedPaymentElementView(viewModel: embeddedViewModel)

                // For testing only
                #if DEBUG
                Button("Test height change") {
                    embeddedViewModel.testHeightChange()
                }
                #endif
            }
        }
    }
}
```

### (Optional) Display the selected payment option

If you need to access details about the customer’s selected payment option like a label (for example, “····4242”), image (for example, a VISA logo), or billing details to display in your UI, use the EmbeddedPaymentElementViewModel’s `paymentOption` property. When the customer selects a payment method that opens a form sheet, the payment option updates after they tap **Continue** in the sheet.

```swift
struct MyEmbeddedCheckoutView: View {
    var body: some View {
        ScrollView {
            if embeddedViewModel.isLoaded {
                // ...

                // A real integration probably wouldn't show the selected payment option on the same screen as the embedded payment element. We display it as an example.
                if let paymentOption = embeddedViewModel.paymentOption {
                    HStack {
                        Image(uiImage: paymentOption.image)
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(height: 30)
                        Text(paymentOption.label)
                        Spacer()
                    }
                    .padding()
                }
            }
        }
    }
}
```

### (Optional) Update payment details

As the customer performs actions that change the payment details (for example, applying a discount code), update the `EmbeddedPaymentElementViewModel` instance to reflect the new values by calling the `update` method. Some payment methods, like Apple Pay and Google Pay, show the amount in the UI, so make sure it’s always accurate and up to date.

When the update completes, the update might have changed the customer’s currently selected payment option.

```swift
extension MyEmbeddedCheckoutView {
    func update() {
        Task { @MainActor in
            var updatedIntentConfig = oldIntentConfig
            updatedIntentConfig.mode = PaymentSheet.IntentConfiguration.Mode.setup(currency: "USD")

            let result = await embeddedViewModel.update(intentConfiguration: updatedIntentConfig)
            switch result {
            case .canceled:
                // Do nothing; this happens when a subsequent `update` call cancels this one
                break
            case .failed(let error):
                // Display error to user in an alert, let users retry
            case .succeeded:
                // Update your UI in case the payment option changed
            }
        }
    }
}
```

### Confirm the setup

When the customer taps the checkout button, call `embeddedViewModel.confirm()` to complete the setup. Be sure to disable user interaction during confirmation.

```swift
extension MyEmbeddedCheckoutView {
    func didTapConfirmButton() {
        Task { @MainActor in
            // Be sure to disable user interaction during confirm (not shown in this example)
            let result = await embeddedViewModel.confirm()
            switch result {
            case .completed:
                // Setup completed - show a confirmation screen.
            case .failed(let error):
                // Encountered an unrecoverable error. Re-enable user interaction, display the error to the user, log it, and so on.
            case .canceled:
                // Customer canceled - re-enable user interaction and let them try again.
                break
            }
        }
    }
}
```

Next, implement the `confirmationTokenConfirmHandler` callback you passed to `PaymentSheet.IntentConfiguration` earlier to send a request to your server. Your server creates a SetupIntent and returns its client secret. For information about this process, see [Create a SetupIntent](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#submit-setup).

Return your server response’s client secret or throw an error. The EmbeddedPaymentElement confirms the PaymentIntent using the client secret or displays the localized error message in its UI (either [errorDescription](https://developer.apple.com/documentation/foundation/localizederror/2946895-errordescription) or [localizedDescription](https://developer.apple.com/documentation/foundation/nserror/1414418-localizeddescription)). After confirmation completes, EmbeddedPaymentElement isn’t usable. Instead, direct the user to a receipt screen or something similar.

```swift
extension MyEmbeddedCheckoutView {
    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
        // Make a request to your own server. Pass confirmationToken.stripeId if using server-side confirmation.
        // Return the client secret or throw an error
        return try await MyAPIClient.shared.createIntent(confirmationTokenId: confirmationToken.stripeId)
    }
}
```

## Optional: Clear the selected payment option

If you have payment options external to EmbeddedPaymentElement, you might need to clear the selected payment option. To do this, use the `clearPaymentOption` API to deselect the selected payment option.

#### UIKit

```swift
extension MyCheckoutVC: UIViewController {
    func deselectPaymentMethod() {
        embeddedPaymentElement?.clearPaymentOption()
    }
}
```

#### SwiftUI

```swift
@available(iOS 15.0, *)
extension MyEmbeddedCheckoutView {
    func deselectPaymentMethod() {
        embeddedViewModel.clearPaymentOption()
    }
}
```

## Optional: Display the mandate yourself

By default, the Embedded Mobile Payment Element displays mandates and legal disclaimers to ensure regulatory compliance. This text must be located close to your buy button. If necessary, disable its display in the view and display it yourself instead.

> Your integration must display the mandate text to be compliant. Make sure URLs in the text can be opened by using a UITextView or something similar.

#### UIKit

```swift
var configuration = EmbeddedPaymentElement.Configuration(...)
configuration.embeddedViewDisplaysMandateText = true

...

let mandateTextView = UITextView()
mandateTextView.attributedText = embeddedPaymentElement.paymentOption.mandateText
```

#### SwiftUI

```swift
var configuration = EmbeddedPaymentElement.Configuration(...)
configuration.embeddedViewDisplaysMandateText = true

...

if let attributedText = embeddedViewModel.paymentOption?.mandateText {
  Text(AttributedString(attributedText))
}
```

## Optional: Let the customer confirm setup immediately in the sheet

To configure the button in the form sheet to immediately confirm setup, set `formSheetAction` on your `EmbeddedPaymentElement.Configuration` object.

The completion block executes with the result of the setup after the sheet dismisses. The embedded UI isn’t usable after setup completes, so we recommend that your implementation directs the user to a different screen, such as a receipt screen.

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.formSheetAction = .confirm(completion: { result in
  switch result {
  case .completed:
    // Setup completed. You can for example, show a confirmation screen.
    print("Completed")
  case .failed(let error):
    // Encountered an unrecoverable error. You can display the error to the user, log it, etc.
    print(error)
  case .canceled:
    // Customer canceled - you should probably do nothing.
    break
  }
})
```

## Create a SetupIntent [Server-side]

On your server, create a *SetupIntent* (The Setup Intents API lets you build dynamic flows for collecting payment method details for future payments. It tracks the lifecycle of a payment setup flow and can trigger additional authentication steps if required by law or by the payment method). You can manage payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods). Stripe evaluates payment method restrictions and other parameters to determine the list of supported payment methods.

If the call succeeds, return the SetupIntent *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)). If the call fails, [handle the error](https://docs.stripe.com/error-handling.md) and return an error message with a brief explanation for your customer.

> Verify that all IntentConfiguration properties match your SetupIntent (for example, [usage](https://docs.stripe.com/api/setup_intents/object.md#setup_intent_object-usage)).

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    customer: ..., # The Customer ID you previously created
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::SetupIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'customer': customer['id'],
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.SetupIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'customer' => $customer->id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->setupIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      customer: ... // The Customer ID you previously created
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.setupIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.SetupIntent;
import com.stripe.param.SetupIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      SetupIntentCreateParams.Builder paramsBuilder =
        SetupIntentCreateParams
          .builder()
          .setCustomer(customer.getId()) // The Customer ID you previously created
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            SetupIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          )
      SetupIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        SetupIntent setupIntent = SetupIntent.create(params);
        map.put("client_secret", setupIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/setupintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationTokenID string `json:"confirmation_token_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.SetupIntentParams{
      Customer: stripe.String(c.ID), // The Customer ID you previously created
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.SetupIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := setupintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new SetupIntentCreateOptions()
      {
        Customer = customer.Id, // The Customer ID you previously created
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new SetupIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new SetupIntentService();
      try
      {
        SetupIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token_id")]
      public string ConfirmationTokenId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```

## Set up a return URL [Client-side]

The customer might navigate away from your app to authenticate (for example, in Safari or their banking app). To allow them to automatically return to your app after authenticating, [configure a custom URL scheme](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app) and set up your app delegate to forward the URL to the SDK. Stripe doesn’t support [universal links](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content).

#### SceneDelegate

#### Swift

```swift
// This method handles opening custom URL schemes (for example, "your-app://stripe-redirect")
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let url = URLContexts.first?.url else {
        return
    }
    let stripeHandled = StripeAPI.handleURLCallback(with: url)
    if (!stripeHandled) {
        // This was not a Stripe url – handle the URL normally as you would
    }
}

```

#### AppDelegate

#### Swift

```swift
// This method handles opening custom URL schemes (for example, "your-app://stripe-redirect")
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    let stripeHandled = StripeAPI.handleURLCallback(with: url)
    if (stripeHandled) {
        return true
    } else {
        // This was not a Stripe url – handle the URL normally as you would
    }
    return false
}
```

#### SwiftUI

#### Swift

```swift

@main
struct MyApp: App {
  var body: some Scene {
    WindowGroup {
      Text("Hello, world!").onOpenURL { incomingURL in
          let stripeHandled = StripeAPI.handleURLCallback(with: incomingURL)
          if (!stripeHandled) {
            // This was not a Stripe url – handle the URL normally as you would
          }
        }
    }
  }
}
```

Additionally, set the [returnURL](https://github.com/stripe/stripe-ios/blob/aa3234a7fafde98c9203b6ed77e0278c04310eb0/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L70) on your [EmbeddedPaymentElement.Configuration](https://github.com/stripe/stripe-ios/blob/aa3234a7fafde98c9203b6ed77e0278c04310eb0/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L12) object to the URL for your app.

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.returnURL = "your-app://stripe-redirect"
```

## Charge the saved payment method later [Server-side]

> `bancontact` and `ideal` are one-time payment methods by default. When set up for future usage, they generate a `sepa_debit` reusable payment method type so you need to use `sepa_debit` to query for saved payment methods.

> #### Compliance
> 
> You’re responsible for your compliance with all applicable laws, regulations, and network rules when saving a customer’s payment details. When rendering past payment methods to your end customer for future purchases, make sure you’re listing payment methods where you’ve collected consent from the customer to save the payment method details for this specific future use. To differentiate between payment methods attached to customers that can and can’t be presented to your end customer as a saved payment method for future purchases, use the [allow_redisplay](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-allow_redisplay) parameter.

When you’re ready to charge your customer *off-session* (A payment is described as off-session if it occurs without the direct involvement of the customer, using previously-collected payment information), use the Customer and PaymentMethod IDs to create a PaymentIntent. To find a payment method to charge, list the payment methods associated with your customer. This example lists cards but you can list any supported [type](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-type).

```curl
curl -G https://api.stripe.com/v1/payment_methods \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer="{{CUSTOMER_ID}}" \
  -d type=card
```

```cli
stripe payment_methods list  \
  --customer="{{CUSTOMER_ID}}" \
  --type=card
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

payment_methods = client.v1.payment_methods.list({
  customer: '{{CUSTOMER_ID}}',
  type: 'card',
})
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

# For SDK versions 12.4.0 or lower, remove '.v1' from the following line.
payment_methods = client.v1.payment_methods.list({
  "customer": "{{CUSTOMER_ID}}",
  "type": "card",
})
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$paymentMethods = $stripe->paymentMethods->all([
  'customer' => '{{CUSTOMER_ID}}',
  'type' => 'card',
]);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

PaymentMethodListParams params =
  PaymentMethodListParams.builder()
    .setCustomer("{{CUSTOMER_ID}}")
    .setType(PaymentMethodListParams.Type.CARD)
    .build();

// For SDK versions 29.4.0 or lower, remove '.v1()' from the following line.
StripeCollection<PaymentMethod> stripeCollection =
  client.v1().paymentMethods().list(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const paymentMethods = await stripe.paymentMethods.list({
  customer: '{{CUSTOMER_ID}}',
  type: 'card',
});
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.PaymentMethodListParams{
  Customer: stripe.String("{{CUSTOMER_ID}}"),
  Type: stripe.String(stripe.PaymentMethodTypeCard),
}
result := sc.V1PaymentMethods.List(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new PaymentMethodListOptions
{
    Customer = "{{CUSTOMER_ID}}",
    Type = "card",
};
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.PaymentMethods;
StripeList<PaymentMethod> paymentMethods = service.List(options);
```

When you have the Customer and PaymentMethod IDs, create a PaymentIntent with the amount and currency of the payment. Set a few other parameters to make the off-session payment:

- Set [off_session](https://docs.stripe.com/api/payment_intents/confirm.md#confirm_payment_intent-off_session) to `true` to indicate that the customer isn’t in your checkout flow during a payment attempt and can’t fulfill an authentication request made by a partner, such as a card issuer, bank, or other payment institution. If, during your checkout flow, a partner requests authentication, Stripe requests exemptions using customer information from a previous *on-session* (A payment is described as on-session if it occurs while the customer is actively in your checkout flow and able to authenticate the payment method) transaction. If the conditions for exemption aren’t met, the PaymentIntent might throw an error.
- Set the value of the PaymentIntent’s [confirm](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-confirm) property to `true`, which causes confirmation to occur immediately when the PaymentIntent is created.
- Set [payment_method](https://docs.stripe.com/api.md#create_payment_intent-payment_method) to the ID of the PaymentMethod and [customer](https://docs.stripe.com/api.md#create_payment_intent-customer) to the ID of the Customer.

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

#### Stripe CLI

```bash
stripe payment_intents create \
  --amount=1099 \
  --currency=gbp \
  -d "automatic_payment_methods[enabled]"=true \
 # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.--customer={{CUSTOMER_ID}} \
  --payment-method={{PAYMENT_METHOD_ID}} \
  --return-url="https://example.com/order/123/complete" \
  --off-session=true \
  --confirm=true
```

#### Ruby

```ruby

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

begin
  intent = Stripe::PaymentIntent.create({
    amount: 1099,
    currency: 'gbp',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: '{{CUSTOMER_ID}}',
    payment_method: '{{PAYMENT_METHOD_ID}}',
    return_url: 'https://example.com/order/123/complete',
    off_session: true,
    confirm: true,
  })
rescue Stripe::CardError => e
  # Error code will be authentication_required if authentication is needed
  puts "Error is: \#{e.error.code}"
  payment_intent_id = e.error.payment_intent.id
  payment_intent = Stripe::PaymentIntent.retrieve(payment_intent_id)
  puts payment_intent.id
end
```

#### Python

```python

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
stripe.api_key = '<<YOUR_SECRET_KEY>>'

try:
  stripe.PaymentIntent.create(
    amount=1099,
    currency='gbp',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods={"enabled": True},customer='{{CUSTOMER_ID}}',
    payment_method='{{PAYMENT_METHOD_ID}}',
    return_url='https://example.com/order/123/complete',
    off_session=True,
    confirm=True,
  )
except stripe.error.CardError as e:
  err = e.error
  # Error code will be authentication_required if authentication is needed
  print("Code is: %s" % err.code)
  payment_intent_id = err.payment_intent['id']
  payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
```

#### PHP

```php

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
\Stripe\Stripe::setApiKey('<<YOUR_SECRET_KEY>>');

try {
  \Stripe\PaymentIntent::create([
    'amount' => 1099,
    'currency' => 'gbp',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],'customer' => '{{CUSTOMER_ID}}',
    'payment_method' => '{{PAYMENT_METHOD_ID}}',
    'return_url' => 'https://example.com/order/123/complete',
    'off_session' => true,
    'confirm' => true,
  ]);
} catch (\Stripe\Exception\CardException $e) {
  // Error code will be authentication_required if authentication is needed
  echo 'Error code is:' . $e->getError()->code;
  $payment_intent_id = $e->getError()->payment_intent->id;
  $payment_intent = \Stripe\PaymentIntent::retrieve($payment_intent_id);
}
```

#### Java

```java

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

PaymentIntentCreateParams params =
  PaymentIntentCreateParams.builder()
    .setCurrency("gbp")
    .setAmount(1099)
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    .setAutomaticPaymentMethods(
      PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
    ).setCustomer("{{CUSTOMER_ID}}")
    .setPaymentMethod("{{PAYMENT_METHOD_ID}}")
    .setReturnUrl("https://example.com/order/123/complete")
    .setConfirm(true)
    .setOffSession(true)
    .build();
try {
  PaymentIntent.create(params);
} catch (CardException e) {
  // Error code will be authentication_required if authentication is needed
  System.out.println("Error code is : " + e.getCode());
  String paymentIntentId = e.getStripeError().getPaymentIntent().getId();
  PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
  System.out.println(paymentIntent.getId());
}
```

#### Node.js

```javascript

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'gbp',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: '{{CUSTOMER_ID}}',
    payment_method: '{{PAYMENT_METHOD_ID}}',
    return_url: 'https://example.com/order/123/complete',
    off_session: true,
    confirm: true,
  });
} catch (err) {
  // Error code will be authentication_required if authentication is needed
  console.log('Error code is: ', err.code);
  const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
  console.log('PI retrieved: ', paymentIntentRetrieved.id);
}
```

#### Go

```go

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
stripe.Key = "<<YOUR_SECRET_KEY>>"

params := &stripe.PaymentIntentParams{
  Amount: stripe.Int64(1099),
  Currency: stripe.String(string(stripe.CurrencyGBP)),
  // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
  AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
    Enabled: stripe.Bool(true),
  },Customer: stripe.String("{{CUSTOMER_ID}}"),
  PaymentMethod: stripe.String("{{PAYMENT_METHOD_ID}}"),
  ReturnUrl: stripe.String("https://example.com/order/123/complete"),
  Confirm: stripe.Bool(true),
  OffSession: stripe.Bool(true),
}

_, err := paymentintent.New(params)

if err != nil {
  if stripeErr, ok := err.(*stripe.Error); ok {
    // Error code will be authentication_required if authentication is needed
    fmt.Printf("Error code: %v", stripeErr.Code)

    paymentIntentID := stripeErr.PaymentIntent.ID
    paymentIntent, _ := paymentintent.Get(paymentIntentID, nil)

    fmt.Printf("PI: %v", paymentIntent.ID)
  }
}
```

#### .NET

```dotnet

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>";

try
{
  var service = new PaymentIntentService();
  var options = new PaymentIntentCreateOptions
  {
    Amount = 1099,
    Currency = "gbp",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
    {
        Enabled = true,
    },Customer = "{{CUSTOMER_ID}}",
    PaymentMethod = "{{PAYMENT_METHOD_ID}}",
    ReturnUrl = "https://example.com/order/123/complete",
    Confirm = true,
    OffSession = true,
  };
  service.Create(options);
}
catch (StripeException e)
{
  switch (e.StripeError.Type)
  {
    case "card_error":
      // Error code will be authentication_required if authentication is needed
      Console.WriteLine("Error code: " + e.StripeError.Code);
      var paymentIntentId = e.StripeError.PaymentIntent.Id;
      var service = new PaymentIntentService();
      var paymentIntent = service.Get(paymentIntentId);

      Console.WriteLine(paymentIntent.Id);
      break;
    default:
      break;
  }
}
```

## Test the integration

#### Cards

| Card number         | Scenario                                                                                                                                                                                                                                                                                      | How to test                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 4242424242424242    | The card payment succeeds and doesn’t require authentication.                                                                                                                                                                                                                                 | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000002500003155    | The card payment requires *authentication* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase). | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000000000009995    | The card is declined with a decline code like `insufficient_funds`.                                                                                                                                                                                                                           | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 6205500000000000004 | The UnionPay card has a variable length of 13-19 digits.                                                                                                                                                                                                                                      | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |

#### Bank redirects

| Payment method    | Scenario                                                                                                                                                                                        | How to test                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bancontact, iDEAL | Your customer fails to authenticate on the redirect page for a redirect-based and immediate notification payment method.                                                                        | Choose any redirect-based payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page. |
| Pay by Bank       | Your customer successfully pays with a redirect-based and [delayed notification](https://docs.stripe.com/payments/payment-methods.md#payment-notification) payment method.                      | Choose the payment method, fill out the required details, and confirm the payment. Then click **Complete test payment** on the redirect page.            |
| Pay by Bank       | Your customer fails to authenticate on the redirect page for a redirect-based and delayed notification payment method.                                                                          | Choose the payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page.                |
| BLIK              | BLIK payments fail in a variety of ways—immediate failures (for example, the code is expired or invalid), delayed errors (the bank declines) or timeouts (the customer didn’t respond in time). | Use email patterns to [simulate the different failures.](https://docs.stripe.com/payments/blik/accept-a-payment.md#simulate-failures)                    |

#### Bank debits

| Payment method    | Scenario                                                                                          | How to test                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEPA Direct Debit | Your customer successfully pays with SEPA Direct Debit.                                           | Fill out the form using the account number `AT321904300235473204`. The confirmed PaymentIntent initially transitions to processing, then transitions to the succeeded status three minutes later. |
| SEPA Direct Debit | Your customer’s payment intent status transitions from `processing` to `requires_payment_method`. | Fill out the form using the account number `AT861904300235473202`.                                                                                                                                |

See [Testing](https://docs.stripe.com/testing.md) for additional information to test your integration.

## Optional: Enable saved cards [Server-side] [Client-side]

EmbeddedPaymentElement can display a **Save this card for future use** checkbox that saves the customer’s card, and display the customer’s saved cards. To enable this checkbox, create a [Customer](https://docs.stripe.com/api/customers.md) object on your server and an associated [CustomerSession](https://docs.stripe.com/api/customer_sessions.md), with `payment_method_save` set to `enabled`.

> #### Compare Customers v1 and Accounts v2 references
> 
> If your Connect platform uses [customer-configured Accounts](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-configuration-customer), use our [guide](https://docs.stripe.com/connect/use-accounts-as-customers.md) to replace `Customer` and event references in your code with the equivalent Accounts v2 API references.

```javascript
const stripe = require('stripe')('sk_test_your_secret_key');

app.post('/mobile-payment-element', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const customerSession = await stripe.customerSessions.create({
    customer: customer.id,
    components: {
      mobile_payment_element: {
        enabled: true,
        features: {
          payment_method_save: 'enabled',
          payment_method_redisplay: 'enabled',
          payment_method_remove: 'enabled'
        }
      },
    },
  });

  res.json({
    customerSessionClientSecret: customerSession.client_secret,
    customer: customer.id,
  });
});
```

Next, configure EmbeddedPaymentElement with the Customer’s ID and the CustomerSession client secret.

#### UIKit

```swift
@_spi(CustomerSessionBetaAccess) import StripePaymentSheet

var configuration = EmbeddedPaymentElement.Configuration()
configuration.customer = .init(id: customerId, customerSessionClientSecret: customerSessionClientSecret)

self.embeddedPaymentElement = try await EmbeddedPaymentElement.create(..., configuration: configuration)
```

#### SwiftUI

```swift
@_spi(CustomerSessionBetaAccess) import StripePaymentSheet

var configuration = EmbeddedPaymentElement.Configuration()
configuration.customer = .init(id: customerId, customerSessionClientSecret: customerSessionClientSecret)

try await embeddedViewModel.load(..., configuration: configuration)
```

## Optional: Allow delayed payment methods [Client-side]

*Delayed payment methods* (A payment method that can't immediately return payment status when a customer attempts a transaction (for example, ACH debits). Businesses commonly hold an order in a pending state until payment is successful with these payment methods) don’t guarantee that you’ll receive funds from your customer at the end of the checkout either because they take time to settle (for example, US Bank Accounts, SEPA Debit, iDEAL, and Bancontact) or because they require customer action to complete (for example, OXXO, Konbini, and Boleto).

By default, EmbeddedPaymentElement doesn’t display delayed payment methods. To opt in, set `allowsDelayedPaymentMethods` to true in your `EmbeddedPaymentElement.Configuration`. This step alone doesn’t activate any specific payment methods; rather, it indicates that your app is able to handle them. For example, although OXXO is currently not supported by EmbeddedPaymentElement, if it becomes supported and you’ve updated to the latest SDK version, your app will be able to display OXXO as a payment option without additional integration changes.

#### UIKit

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.allowsDelayedPaymentMethods = true

self.embeddedPaymentElement = try await EmbeddedPaymentElement.create(..., configuration: configuration)
```

#### SwiftUI

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.allowsDelayedPaymentMethods = true

try await embeddedViewModel.load(..., configuration: configuration)
```

If the customer successfully uses one of these delayed payment methods in EmbeddedPaymentElement, the payment result returned is `.completed`.

## Optional: Enable Apple Pay

> If your checkout screen has a dedicated **Apple Pay** button, follow the [Apple Pay guide](https://docs.stripe.com/apple-pay.md#present-payment-sheet) and use `ApplePayContext` to collect payment from your **Apple Pay** button. You can use `EmbeddedPaymentElement` to handle other payment method types.

### Register for an Apple Merchant ID

Obtain an Apple Merchant ID by [registering for a new identifier](https://developer.apple.com/account/resources/identifiers/add/merchant) on the Apple Developer website.

Fill out the form with a description and identifier. Your description is for your own records and you can modify it in the future. Stripe recommends using the name of your app as the identifier (for example, `merchant.com.{{YOUR_APP_NAME}}`).

### Create a new Apple Pay certificate

Create a certificate for your app to encrypt payment data.

Go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard, click **Add new application**, and follow the guide.

Download a Certificate Signing Request (CSR) file to get a secure certificate from Apple that allows you to use Apple Pay.

One CSR file must be used to issue exactly one certificate. If you switch your Apple Merchant ID, you must go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard to obtain a new CSR and certificate.

### Integrate with Xcode

Add the Apple Pay capability to your app. In Xcode, open your project settings, click the **Signing & Capabilities** tab, and add the **Apple Pay** capability. You might be prompted to log in to your developer account at this point. Select the merchant ID you created earlier, and your app is ready to accept Apple Pay.
![](https://b.stripecdn.com/docs-statics-srv/assets/xcode.a701d4c1922d19985e9c614a6f105bf1.png)

Enable the Apple Pay capability in Xcode

### Add Apple Pay

#### One-time payment

To add Apple Pay to EmbeddedPaymentElement, set [applePay](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L28) after initializing `EmbeddedPaymentElement.Configuration` with your Apple merchant ID and your business’s [country code](https://dashboard.stripe.com/settings/account).

#### iOS (Swift)

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.applePay = .init(
  merchantId: "merchant.com.your_app_name",
  merchantCountryCode: "US"
)
```

#### Recurring payments

To add Apple Pay to EmbeddedPaymentElement, set [applePay](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L28) after initializing `EmbeddedPaymentElement.Configuration` with your Apple merchant ID and your business’s [country code](https://dashboard.stripe.com/settings/account).

Per [Apple’s guidelines](https://developer.apple.com/design/human-interface-guidelines/apple-pay#Supporting-subscriptions) for recurring payments, you must also set additional attributes on the `PKPaymentRequest`. Add a handler in [ApplePayConfiguration.paymentRequestHandlers](https://stripe.dev/stripe-ios/stripepaymentsheet/documentation/stripepaymentsheet/paymentsheet/applepayconfiguration/handlers/paymentrequesthandler) to configure the [PKPaymentRequest.paymentSummaryItems](https://developer.apple.com/documentation/passkit/pkpaymentrequest/1619231-paymentsummaryitems) with the amount you intend to charge (for example, 9.95 USD a month).

You can also adopt [merchant tokens](https://developer.apple.com/apple-pay/merchant-tokens/) by setting the `recurringPaymentRequest` or `automaticReloadPaymentRequest` properties on the `PKPaymentRequest`.

To learn more about how to use recurring payments with Apple Pay, see [Apple’s PassKit documentation](https://developer.apple.com/documentation/passkit/pkpaymentrequest).

#### iOS (Swift)

```swift
let customHandlers = EmbeddedPaymentElement.ApplePayConfiguration.Handlers(
    paymentRequestHandler: { request in
        // PKRecurringPaymentSummaryItem is available on iOS 15 or later
        if #available(iOS 15.0, *) {
            let billing = PKRecurringPaymentSummaryItem(label: "My Subscription", amount: NSDecimalNumber(string: "59.99"))

            // Payment starts today
            billing.startDate = Date()

            // Payment ends in one year
            billing.endDate = Date().addingTimeInterval(60 * 60 * 24 * 365)

            // Pay once a month.
            billing.intervalUnit = .month
            billing.intervalCount = 1

            // recurringPaymentRequest is only available on iOS 16 or later
            if #available(iOS 16.0, *) {
                request.recurringPaymentRequest = PKRecurringPaymentRequest(paymentDescription: "Recurring",
                                                                            regularBilling: billing,
                                                                            managementURL: URL(string: "https://my-backend.example.com/customer-portal")!)
                request.recurringPaymentRequest?.billingAgreement = "You'll be billed $59.99 every month for the next 12 months. To cancel at any time, go to Account and click 'Cancel Membership.'"
            }
            request.paymentSummaryItems = [billing]
            request.currencyCode = "USD"
        } else {
            // On older iOS versions, set alternative summary items.
            request.paymentSummaryItems = [PKPaymentSummaryItem(label: "Monthly plan starting July 1, 2022", amount: NSDecimalNumber(string: "59.99"), type: .final)]
        }
        return request
    }
)
var configuration = EmbeddedPaymentElement.Configuration()
configuration.applePay = .init(merchantId: "merchant.com.your_app_name",
                                merchantCountryCode: "US",
                                customHandlers: customHandlers)
```

### Order tracking

To add [order tracking](https://developer.apple.com/design/human-interface-guidelines/technologies/wallet/designing-order-tracking) information in iOS 16 or later, configure an [authorizationResultHandler](https://stripe.dev/stripe-ios/stripepaymentsheet/documentation/stripepaymentsheet/paymentsheet/applepayconfiguration/handlers/authorizationresulthandler) in your `PaymentSheet.ApplePayConfiguration.Handlers`. Stripe calls your implementation after the payment is complete, but before iOS dismisses the Apple Pay sheet.

In your `authorizationResultHandler` implementation, fetch the order details from your server for the completed order. Add the details to the provided [PKPaymentAuthorizationResult](https://developer.apple.com/documentation/passkit/pkpaymentauthorizationresult) and return the modified result.

To learn more about order tracking, see [Apple’s Wallet Orders documentation](https://developer.apple.com/documentation/walletorders).

#### iOS (Swift)

```swift
let customHandlers = PaymentSheet.ApplePayConfiguration.Handlers(
    authorizationResultHandler: { result in
      do {
        // Fetch the order details from your service
        let myOrderDetails = try await MyAPIClient.shared.fetchOrderDetails(orderID: orderID)
        result.orderDetails = PKPaymentOrderDetails(
          orderTypeIdentifier: myOrderDetails.orderTypeIdentifier, // "com.myapp.order"
          orderIdentifier: myOrderDetails.orderIdentifier, // "ABC123-AAAA-1111"
          webServiceURL: myOrderDetails.webServiceURL, // "https://my-backend.example.com/apple-order-tracking-backend"
          authenticationToken: myOrderDetails.authenticationToken) // "abc123"
        // Return your modified PKPaymentAuthorizationResult
        return result
      } catch {
        return PKPaymentAuthorizationResult(status: .failure, errors: [error])
      }
    }
)
var configuration = EmbeddedPaymentElement.Configuration()
configuration.applePay = .init(merchantId: "merchant.com.your_app_name",
                               merchantCountryCode: "US",
                               customHandlers: customHandlers)
```

## Optional: Enable card scanning

#### iOS

To enable card scanning support, set the `NSCameraUsageDescription` (**Privacy - Camera Usage Description**) in the Info.plist of your application, and provide a reason for accessing the camera (for example, “To scan cards”). Devices with iOS 13 or higher support card scanning.

#### Android

To enable card scanning support, [request production access](https://developers.google.com/pay/api/android/guides/test-and-deploy/request-prod-access) to the Google Pay API from the [Google Pay and Wallet Console](https://pay.google.com/business/console?utm_source=devsite&utm_medium=devsite&utm_campaign=devsite).

- If you’ve enabled Google Pay, the card scanning feature is automatically available in our UI on eligible devices. To learn more about eligible devices, see the [Google Pay API constraints](https://developers.google.com/pay/payment-card-recognition/debit-credit-card-recognition)
- **Important:** The card scanning feature only appears in builds signed with the same signing key registered in the [Google Pay & Wallet Console](https://pay.google.com/business/console). Test or debug builds using different signing keys (for example, builds distributed through Firebase App Tester) won’t show the **Scan card** option. To test card scanning in pre-release builds, you must either:
  - Sign your test builds with your production signing key
  - Add your test signing key fingerprint to the Google Pay and Wallet Console

## Optional: Customize the element

All customization is configured through the [EmbeddedPaymentElement.Configuration](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L12) object.

### Appearance

Customize colors, fonts, and so on to match the look and feel of your app by using the [appearance API](https://docs.stripe.com/elements/appearance-api/embedded-mobile.md?platform=ios).

### Collect users addresses

Collect local and international shipping or billing addresses from your customers using the [Address Element](https://docs.stripe.com/elements/address-element.md?platform=ios).

### Merchant display name

Specify a customer-facing business name by setting [merchantDisplayName](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L66). By default, this is your app’s name.

#### Swift

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.merchantDisplayName = "My app, Inc."
```

### Dark mode

`EmbeddedPaymentElement` automatically adapts to the user’s system-wide appearance settings (light and dark mode). If your app doesn’t support dark mode, you can set [style](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L51) to `alwaysLight` or `alwaysDark` mode.

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.style = .alwaysLight
```


# Accept a payment and save the payment method

> This is a Accept a payment and save the payment method for when platform is ios and type is paymentsfu. View the full page at https://docs.stripe.com/payments/mobile/accept-payment-embedded?platform=ios&type=paymentsfu.

Use the [Payment Intents API](https://docs.stripe.com/api/payment_intents.md) to save payment details from a purchase. There are several use cases:

- Charge a customer for an e-commerce order and store the details for future purchases.
- Initiate the first payment of a series of recurring payments.
- Charge a deposit and store the details to charge the full amount later.

> #### Card-present transactions
> 
> Card-present transactions, such as payments through Stripe Terminal, use a different process for saving the payment method. For details, see [the Terminal documentation](https://docs.stripe.com/terminal/features/saving-payment-details/save-after-payment.md).

## Compliance

You’re responsible for your compliance with all applicable laws, regulations, and network rules when saving a customer’s payment details. These requirements generally apply if you want to save your customer’s payment method for future use, such as displaying a customer’s payment method to them in the checkout flow for a future purchase or charging them when they’re not actively using your website or app. Add terms to your website or app that state how you plan to save payment method details and allow customers to opt in.

When you save a payment method, you can only use it for the specific usage you have included in your terms. To charge a payment method when a customer is offline and save it as an option for future purchases, make sure that you explicitly collect consent from the customer for this specific use. For example, include a “Save my payment method for future use” checkbox to collect consent.

To charge them when they’re offline, make sure your terms include the following:

- The customer’s agreement to your initiating a payment or a series of payments on their behalf for specified transactions.
- The anticipated timing and frequency of payments (for example, if the charges are for scheduled installments, subscription payments, or unscheduled top-ups).
- How you determine the payment amount.
- Your cancellation policy, if the payment method is for a subscription service.

Make sure you keep a record of your customer’s written agreement to these terms.

> [SCA regulation](https://docs.stripe.com/strong-customer-authentication.md) requires that you authenticate your customer up front if you intend to collect payments from them again in the future. The cardholder’s bank may decline future payments and ask for additional authentication if the customer never authenticated initially.

## Set up Stripe [Server-side] [Client-side]

### Server-side 

This integration requires endpoints on your server that talk to the Stripe API. Use our official libraries for access to the Stripe API from your server:

#### Ruby

```bash
# Available as a gem
sudo gem install stripe
```

```ruby
# If you use bundler, you can add this line to your Gemfile
gem 'stripe'
```

#### Python

```bash
# Install through pip
pip3 install --upgrade stripe
```

```bash
# Or find the Stripe package on http://pypi.python.org/pypi/stripe/
```

```python
# Find the version you want to pin:
# https://github.com/stripe/stripe-python/blob/master/CHANGELOG.md
# Specify that version in your requirements.txt file
stripe>=5.0.0
```

#### PHP

```bash
# Install the PHP library with Composer
composer require stripe/stripe-php
```

```bash
# Or download the source directly: https://github.com/stripe/stripe-php/releases
```

#### Java

```java
/*
  For Gradle, add the following dependency to your build.gradle and replace with
  the version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
*/
implementation "com.stripe:stripe-java:31.3.0"
```

```xml
<!--
  For Maven, add the following dependency to your POM and replace with the
  version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
-->
<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>31.3.0</version>
</dependency>
```

```bash
# For other environments, manually install the following JARs:
# - The Stripe JAR from https://github.com/stripe/stripe-java/releases/latest
# - Google Gson from https://github.com/google/gson
```

#### Node.js

```bash
# Install with npm
npm install stripe --save
```

#### Go

```bash
# Make sure your project is using Go Modules
go mod init
# Install stripe-go
go get -u github.com/stripe/stripe-go/v84
```

```go
// Then import the package
import (
  "github.com/stripe/stripe-go/v84"
)
```

#### .NET

```bash
# Install with dotnet
dotnet add package Stripe.net
dotnet restore
```

```bash
# Or install with NuGet
Install-Package Stripe.net
```

### Client-side 

The [Stripe iOS SDK](https://github.com/stripe/stripe-ios) is open source, [fully documented](https://stripe.dev/stripe-ios/index.html), and compatible with apps supporting iOS 13 or above.

#### Swift Package Manager

To install the SDK, follow these steps:

1. In Xcode, select **File** > **Add Package Dependencies…** and enter `https://github.com/stripe/stripe-ios-spm` as the repository URL.
1. Select the latest version number from our [releases page](https://github.com/stripe/stripe-ios/releases).
1. Add the **StripePaymentSheet** product to the [target of your app](https://developer.apple.com/documentation/swift_packages/adding_package_dependencies_to_your_app).

#### CocoaPods

1. If you haven’t already, install the latest version of [CocoaPods](https://guides.cocoapods.org/using/getting-started.html).
1. If you don’t have an existing [Podfile](https://guides.cocoapods.org/syntax/podfile.html), run the following command to create one:
   ```bash
   pod init
   ```
1. Add this line to your `Podfile`:
   ```podfile
   pod 'StripePaymentSheet'
   ```
1. Run the following command:
   ```bash
   pod install
   ```
1. Don’t forget to use the `.xcworkspace` file to open your project in Xcode, instead of the `.xcodeproj` file, from here on out.
1. In the future, to update to the latest version of the SDK, run:
   ```bash
   pod update StripePaymentSheet
   ```

#### Carthage

1. If you haven’t already, install the latest version of [Carthage](https://github.com/Carthage/Carthage#installing-carthage).
1. Add this line to your `Cartfile`:
   ```cartfile
   github "stripe/stripe-ios"
   ```
1. Follow the [Carthage installation instructions](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos). Make sure to embed all of the required frameworks listed [here](https://github.com/stripe/stripe-ios/tree/master/StripePaymentSheet/README.md#manual-linking).
1. In the future, to update to the latest version of the SDK, run the following command:
   ```bash
   carthage update stripe-ios --platform ios
   ```

#### Manual Framework

1. Head to our [GitHub releases page](https://github.com/stripe/stripe-ios/releases/latest) and download and unzip **Stripe.xcframework.zip**.
1. Drag **StripePaymentSheet.xcframework** to the **Embedded Binaries** section of the **General** settings in your Xcode project. Make sure to select **Copy items if needed**.
1. Repeat step 2 for all required frameworks listed [here](https://github.com/stripe/stripe-ios/tree/master/StripePaymentSheet/README.md#manual-linking).
1. In the future, to update to the latest version of our SDK, repeat steps 1–3.

> For details on the latest SDK release and past versions, see the [Releases](https://github.com/stripe/stripe-ios/releases) page on GitHub. To receive notifications when a new release is published, [watch releases](https://help.github.com/en/articles/watching-and-unwatching-releases-for-a-repository#watching-releases-for-a-repository) for the repository.

You also need to set your [publishable key](https://dashboard.stripe.com/apikeys) so that the SDK can make API calls to Stripe. To get started, you can hardcode the publishable key on the client while you’re integrating, but fetch the publishable key from your server in production.

```swift
// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
STPAPIClient.shared.publishableKey = "<<YOUR_PUBLISHABLE_KEY>>"
```

## Enable payment methods

View your [payment methods settings](https://dashboard.stripe.com/settings/payment_methods) and enable the payment methods you want to support. You need at least one payment method enabled to create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods).

By default, Stripe enables cards and other prevalent payment methods that can help you reach more customers, but we recommend turning on additional payment methods that are relevant for your business and customers. See [Payment method support](https://docs.stripe.com/payments/payment-methods/payment-method-support.md) for product and payment method support, and our [pricing page](https://stripe.com/pricing/local-payment-methods) for fees.

## Create a Customer [Server-side]

To set up a payment method for future payments, you must attach it to a *Customer* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments). Create a `Customer` object when your customer creates an account with your business. `Customer` objects allow for reusing payment methods and tracking across multiple payments.

> #### Compare Customers v1 and Accounts v2 references
> 
> If your Connect platform uses [customer-configured Accounts](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-configuration-customer), use our [guide](https://docs.stripe.com/connect/use-accounts-as-customers.md) to replace `Customer` and event references in your code with the equivalent Accounts v2 API references.

```curl
curl -X POST https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:"
```

```cli
stripe customers create
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

customer = client.v1.customers.create()
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

# For SDK versions 12.4.0 or lower, remove '.v1' from the following line.
customer = client.v1.customers.create()
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$customer = $stripe->customers->create([]);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

CustomerCreateParams params = CustomerCreateParams.builder().build();

// For SDK versions 29.4.0 or lower, remove '.v1()' from the following line.
Customer customer = client.v1().customers().create(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const customer = await stripe.customers.create();
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.CustomerCreateParams{}
result, err := sc.V1Customers.Create(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new CustomerCreateOptions();
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.Customers;
Customer customer = service.Create(options);
```

## Collect payment details [Client-side]

The Embedded Mobile Payment Element is designed to be placed on the checkout page of your native mobile app. The element displays a list of payment methods and you can customize it to match your app’s look and feel.

When the customer taps the **Card** row, it opens a sheet where they can enter their payment method details. The button in the sheet says **Continue** by default and dismisses the sheet when tapped, which lets your customer finish payment in your checkout.

![Payment Element](https://b.stripecdn.com/docs-statics-srv/assets/ios-embedded.b5867c116d537ffcb920dd80ebdfc741.png)
 

You can also configure the button to immediately complete payment instead of continuing. To do so, complete [this step](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#embedded-let-customer-pay-immediately) after following the guide.

#### UIKit

### Initialize the Payment Element

Call `create` to instantiate EmbeddedPaymentElement with a `EmbeddedPaymentElement.Configuration` and a [PaymentSheet.IntentConfiguration](https://github.com/stripe/stripe-ios/blob/master/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/PaymentSheetIntentConfiguration.swift).

The Configuration object contains general-purpose configuration options for EmbeddedPaymentElement that don’t change between payments, like `returnURL`. The `IntentConfiguration` object contains details about the specific payment like the amount and currency, as well as a `confirmationTokenConfirmHandler` callback. For now, leave its implementation empty. After it successfully initializes, set its `presentingViewController` and `delegate` properties.

> To save payment methods in the EmbeddedPaymentElement, configure `setupFutureUsage`. You can set the [setupFutureUsage](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-setup_future_usage) parameter on `IntentConfiguration` to `onSession` or `offSession`. This value is automatically applied to all available payment methods.

```swift
import StripePaymentSheet

class MyCheckoutVC: UIViewController {

    func createEmbeddedPaymentElement() async throws -> EmbeddedPaymentElement {
        let intentConfig = PaymentSheet.IntentConfiguration(
          mode: .payment(amount: 1099, currency: "USD", setupFutureUsage: .offSession)
        ) { [weak self] confirmationToken in
          return await self?.handleConfirmationToken(confirmationToken)
        }
        var configuration = EmbeddedPaymentElement.Configuration()
        configuration.returnURL = "your-app://stripe-redirect" // Use the return url you set up in the previous step
        let embeddedPaymentElement = try await EmbeddedPaymentElement.create(intentConfiguration: intentConfig, configuration: configuration)
        embeddedPaymentElement.presentingViewController = self
        embeddedPaymentElement.delegate = self
        return embeddedPaymentElement
    }

    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
      // You'll implement this in the "Confirm the payment" section below
    }
}
```

### Add the Payment Element view

After EmbeddedPaymentElement successfully initializes, put its view in your checkout UI.

> The view must be contained within a scrollable view such as UIScrollView because it doesn’t have a fixed size and can change height after it initially renders.

```swift
class MyCheckoutVC: UIViewController {
    // ...
    private(set) var embeddedPaymentElement: EmbeddedPaymentElement?

    private lazy var checkoutButton: UIButton = {
        let checkoutButton = UIButton(type: .system)
        checkoutButton.backgroundColor = .systemBlue
        checkoutButton.layer.cornerRadius = 5.0
        checkoutButton.clipsToBounds = true
        checkoutButton.setTitle("Checkout", for: .normal)
        checkoutButton.setTitleColor(.white, for: .normal)
        checkoutButton.translatesAutoresizingMaskIntoConstraints = false
        checkoutButton.isEnabled = embeddedPaymentElement?.paymentOption != nil
        checkoutButton.addTarget(self, action: #selector(didTapConfirmButton), for: .touchUpInside)
        return checkoutButton
    }()
    // ...
    @objc func didTapConfirmButton() {
        // You'll implement this in the "Confirm the payment" section below
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        Task { @MainActor in
            do {
                // Create a UIScrollView
                let scrollView = UIScrollView()
                scrollView.translatesAutoresizingMaskIntoConstraints = false
                self.view.addSubview(scrollView)

	       // Create the Payment Element
                let embeddedPaymentElement = try await createEmbeddedPaymentElement()
                embeddedPaymentElement.delegate = self
                embeddedPaymentElement.presentingViewController = self
                self.embeddedPaymentElement = embeddedPaymentElement

                // Add its view to the scroll view
                scrollView.addSubview(embeddedPaymentElement.view)

	       // Add your own checkout button to the scroll view
                scrollView.addSubview(checkoutButton)

                // Set up layout constraints
                embeddedPaymentElement.view.translatesAutoresizingMaskIntoConstraints = false
                NSLayoutConstraint.activate([
                    scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
                    scrollView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
                    scrollView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
                    scrollView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),

                    embeddedPaymentElement.view.topAnchor.constraint(equalTo: scrollView.topAnchor),
                    embeddedPaymentElement.view.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
                    embeddedPaymentElement.view.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
                    checkoutButton.topAnchor.constraint(equalTo: embeddedPaymentElement.view.bottomAnchor, constant: 4.0),
                    checkoutButton.leadingAnchor.constraint(equalTo: scrollView.safeAreaLayoutGuide.leadingAnchor, constant: 4.0),
                    checkoutButton.trailingAnchor.constraint(equalTo: scrollView.safeAreaLayoutGuide.trailingAnchor, constant: -4.0),
                ])

            } catch {
                // Handle view not being added to view
            }
        }
    }
}
```

At this point you can run your app and see the Embedded Mobile Payment Element.

### Handle height changes

The EmbeddedPaymentElement’s view might grow or shrink in size, which can impact the layout of the view.

Handle height changes by implementing the `embeddedPaymentElementDidUpdateHeight` delegate method. EmbeddedPaymentElement’s view calls this method inside an animation block that updates its height. Your implementation is expected to call `setNeedsLayout()` and `layoutIfNeeded()` on the scroll view that contains the EmbeddedPaymentElement’s view to enable a smooth animation of the height change.

```swift
extension MyCheckoutVC: EmbeddedPaymentElementDelegate {
    func embeddedPaymentElementDidUpdateHeight(embeddedPaymentElement: StripePaymentSheet.EmbeddedPaymentElement) {
        // Handle layout appropriately
        self.view.setNeedsLayout()
        self.view.layoutIfNeeded()
    }
}
```

We recommend that you test that your view properly responds to changes in height. To do this, call `testHeightChange()` on EmbeddedPaymentElement to simulate showing and hiding a mandate within the element. Make sure that after calling `testHeightChange()`, your scroll view adjusts smoothly.

```swift
class MyCheckoutVC: UIViewController {
    override func viewDidLoad() {
        // This is only for testing purposes:
        #if DEBUG
        Timer.scheduledTimer(withTimeInterval: 5.0, repeats: true) { [weak self] _ in
            Task { @MainActor in
                self?.embeddedPaymentElement?.testHeightChange()
            }
        }
        #endif
    }
}
```

### (Optional) Display the selected payment option

If you need to access details about the customer’s selected payment option like a label (for example, “····4242”), image (for example, a VISA logo), or billing details to display in your UI, use the EmbeddedPaymentElement’s `paymentOption` property.

To be notified when the `paymentOption` changes, implement the `embeddedPaymentElementDidUpdatePaymentOption` delegate method.

```swift
extension MyCheckoutVC: EmbeddedPaymentElementDelegate {
  func embeddedPaymentElementDidUpdatePaymentOption(embeddedPaymentElement: EmbeddedPaymentElement) {
    print("The payment option changed: \(embeddedPaymentElement.paymentOption)")
    checkoutButton.isEnabled = embeddedPaymentElement.paymentOption != nil
  }
}
```

### (Optional) Update payment details

As the customer performs actions that change the payment details (for example, applying a discount code), update the `EmbeddedPaymentElement` instance to reflect the new values by calling the `update` method. Some payment methods, like Apple Pay and Google Pay, show the amount in the UI, so make sure it’s always accurate and up to date.

When the update call completes, update your UI. The update call might change the customer’s currently selected payment option.

```swift
extension MyCheckoutVC {
    func update() {
        Task { @MainActor in
            var updatedIntentConfig = oldIntentConfig
            // Update the amount to reflect the price after applying the discount code
            updatedIntentConfig.mode = PaymentSheet.IntentConfiguration.Mode.payment(amount: 999, currency: "USD", setupFutureUsage: .offSession)

            let result = await embeddedPaymentElement?.update(intentConfiguration: updatedIntentConfig)
            switch result {
            case .canceled, nil:
                // Do nothing; this happens when a subsequent `update` call cancels this one
                break
            case .failed(let error):
                // Display error to user in an alert, let users retry
            case .succeeded:
                // Update your UI in case the payment option changed
            }
        }
    }
}
```

### Confirm the payment

When the customer taps the checkout button, call `embeddedPaymentElement.confirm()` to complete the payment. Be sure to disable user interaction during confirmation.

```swift
extension MyCheckoutVC {
    @objc func didTapConfirmButton() {
        Task { @MainActor in
            guard let embeddedPaymentElement else { return }
            self.view.isUserInteractionEnabled = false // Disable user interaction, show a spinner, and so on before calling confirm.
            let result = await embeddedPaymentElement.confirm()
            switch result {
            case .completed:
                // Payment completed - show a confirmation screen.
            case .failed(let error):
                self.view.isUserInteractionEnabled = true
                // Encountered an unrecoverable error. You can display the error to the user, log it, and so on.
            case .canceled:
                self.view.isUserInteractionEnabled = true
                // Customer canceled - you should probably do nothing.
                break
            }
        }
    }
}
```

Next, implement the `confirmationTokenConfirmHandler` callback you passed to `PaymentSheet.IntentConfiguration` earlier to send a request to your server. Your server creates a PaymentIntent and returns its client secret. For information about this process, see [Create a PaymentIntent](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#submit-payment).

When the request returns, return your server response’s client secret or throw an error. The EmbeddedPaymentElement confirms the PaymentIntent using the client secret or displays the localized error message in its UI (either [errorDescription](https://developer.apple.com/documentation/foundation/localizederror/2946895-errordescription) or [localizedDescription](https://developer.apple.com/documentation/foundation/nserror/1414418-localizeddescription)). After confirmation completes, EmbeddedPaymentElement isn’t usable. Instead, direct the user to a receipt screen or something similar.

```swift
extension MyCheckoutVC {
    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
        // Make a request to your own server. Pass `confirmationToken.stripeId` if using server-side confirmation, and return the client secret or throw an error.
        let myServerClientSecret = try await fetchIntentClientSecret(...)
    }
}
```

#### SwiftUI

### Initialize the Payment Element

Call `load` to load EmbeddedPaymentElementViewModel with a `EmbeddedPaymentElement.Configuration` and a [PaymentSheet.IntentConfiguration](https://github.com/stripe/stripe-ios/blob/master/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/PaymentSheetIntentConfiguration.swift).

The Configuration object contains general-purpose configuration options for EmbeddedPaymentElement that don’t change between payments, like `returnURL`. The `IntentConfiguration` object contains details about the specific payment like the amount and currency, as well as a `confirmationTokenConfirmHandler` callback. For now, leave its implementation empty.

> To save payment methods in the EmbeddedPaymentElement, configure `setupFutureUsage`. You can set the [setupFutureUsage](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-setup_future_usage) parameter on `IntentConfiguration` to `onSession` or `offSession`. This value automatically applies to all available payment methods.

```swift
import SwiftUI
import StripePaymentSheet

struct MyEmbeddedCheckoutView: View {
    // Store an `EmbeddedPaymentElementViewModel` as a `@StateObject`
    @StateObject var embeddedViewModel = EmbeddedPaymentElementViewModel()

    var body: some View {
        ScrollView {
            // Empty scroll view for now
        }
        .task {
            do {
                if !embeddedViewModel.isLoaded {
                    // Load the view model with your configuration
                    try await loadEmbeddedViewModel()
                }
            } catch {
                // On load failure, implement retry logic (automatic retry or user-triggered through UI).
            }
        }
    }

    private func loadEmbeddedViewModel() async throws {
        let intentConfiguration = PaymentSheet.IntentConfiguration(
          mode: .payment(amount: 1099, currency: "USD", setupFutureUsage: .offSession)
        ) { confirmationToken in
          try await self.handleConfirmationToken(confirmationToken)
        }
        var configuration = EmbeddedPaymentElement.Configuration()
        configuration.returnURL = "your-app://stripe-redirect" // Use the return url you set up in the previous step
        try await embeddedViewModel.load(intentConfiguration: intentConfiguration, configuration: configuration)
    }

    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
      // You'll implement this in the "Confirm the payment" section below
    }
}
```

### Add the Payment Element view

After EmbeddedPaymentElementViewModel successfully loads, add EmbeddedPaymentElementView in your checkout UI.

> The view must be contained within a scrollable view such as ScrollView because it doesn’t have a fixed size and can change height after it initially renders.

```swift
struct MyEmbeddedCheckoutView: View {
    var body: some View {
        ScrollView {
	      // isLoaded becomes true only after a successful call to `embeddedViewModel.load()`
            if embeddedViewModel.isLoaded {
                EmbeddedPaymentElementView(viewModel: embeddedViewModel)
            }
        }
    }
}
```

At this point you can run your app and see the Embedded Mobile Payment Element.

### Handle height changes

The EmbeddedPaymentElementView might grow or shrink in size, which might impact the layout of the view. The EmbeddedPaymentElementView handles this automatically when inside a ScrollView.

We recommend that you test that your view properly responds to changes in height. To do this, call `testHeightChange()` on EmbeddedPaymentElementViewModel to simulate showing and hiding a mandate within the element. Make sure that after calling `testHeightChange()`, your scroll view adjusts smoothly.

```swift
struct MyEmbeddedCheckoutView: View {
    var body: some View {
        ScrollView {
            if embeddedViewModel.isLoaded {
                EmbeddedPaymentElementView(viewModel: embeddedViewModel)

                // For testing only
                #if DEBUG
                Button("Test height change") {
                    embeddedViewModel.testHeightChange()
                }
                #endif
            }
        }
    }
}
```

### (Optional) Display the selected payment option

If you need to access details about the customer’s selected payment option like a label (for example, “····4242”), image (for example, a VISA logo), or billing details to display in your UI, use the EmbeddedPaymentElementViewModel’s `paymentOption` property. When the customer selects a payment method that opens a form sheet, the payment option updates after they tap **Continue** in the sheet.

```swift
struct MyEmbeddedCheckoutView: View {
    var body: some View {
        ScrollView {
            if embeddedViewModel.isLoaded {
                // ...

                // A real integration probably wouldn't show the selected payment option on the same screen as the embedded payment element. We display it as an example.
                if let paymentOption = embeddedViewModel.paymentOption {
                    HStack {
                        Image(uiImage: paymentOption.image)
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(height: 30)
                        Text(paymentOption.label)
                        Spacer()
                    }
                    .padding()
                }
            }
        }
    }
}
```

### (Optional) Update payment details

As the customer performs actions that change the payment details (for example, applying a discount code), update the `EmbeddedPaymentElementViewModel` instance to reflect the new values by calling the `update` method. Some payment methods, like Apple Pay and Google Pay, show the amount in the UI, so make sure it’s always accurate and up to date.

When the update completes, the update might have changed the customer’s currently selected payment option.

```swift
extension MyEmbeddedCheckoutView {
    func update() {
        Task { @MainActor in
            var updatedIntentConfig = oldIntentConfig
            updatedIntentConfig.mode = PaymentSheet.IntentConfiguration.Mode.payment(amount: 999, currency: "USD", setupFutureUsage: .offSession)

            let result = await embeddedViewModel.update(intentConfiguration: updatedIntentConfig)
            switch result {
            case .canceled:
                // Do nothing; this happens when a subsequent `update` call cancels this one
                break
            case .failed(let error):
                // Display error to user in an alert, let users retry
            case .succeeded:
                // Update your UI in case the payment option changed
            }
        }
    }
}
```

### Confirm the payment

When the customer taps the checkout button, call `embeddedViewModel.confirm()` to complete the payment. Be sure to disable user interaction during confirmation.

```swift
extension MyEmbeddedCheckoutView {
    func didTapConfirmButton() {
        Task { @MainActor in
            // Be sure to disable user interaction during confirm (not shown in this example)
            let result = await embeddedViewModel.confirm()
            switch result {
            case .completed:
                // Payment completed - show a confirmation screen.
            case .failed(let error):
                // Encountered an unrecoverable error. Re-enable user interaction, display the error to the user, log it, and so on.
            case .canceled:
                // Customer canceled - re-enable user interaction and let them try again.
                break
            }
        }
    }
}
```

Next, implement the `confirmationTokenConfirmHandler` callback you passed to `PaymentSheet.IntentConfiguration` earlier to send a request to your server. Your server creates a PaymentIntent and returns its client secret. For information about this process, see [Create a PaymentIntent](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#submit-payment).

Return your server response’s client secret or throw an error. The EmbeddedPaymentElement confirms the PaymentIntent using the client secret or displays the localized error message in its UI (either [errorDescription](https://developer.apple.com/documentation/foundation/localizederror/2946895-errordescription) or [localizedDescription](https://developer.apple.com/documentation/foundation/nserror/1414418-localizeddescription)). After confirmation completes, EmbeddedPaymentElement isn’t usable. Instead, direct the user to a receipt screen or something similar.

```swift
extension MyEmbeddedCheckoutView {
    func handleConfirmationToken(_ confirmationToken: STPConfirmationToken) async throws -> String {
        // Make a request to your own server. Pass confirmationToken.stripeId if using server-side confirmation.
        // Return the client secret or throw an error
        return try await MyAPIClient.shared.createIntent(confirmationTokenId: confirmationToken.stripeId)
    }
}
```

## Optional: Clear the selected payment option

If you have payment options external to EmbeddedPaymentElement, you might need to clear the selected payment option. To do this, use the `clearPaymentOption` API to deselect the selected payment option.

#### UIKit

```swift
extension MyCheckoutVC: UIViewController {
    func deselectPaymentMethod() {
        embeddedPaymentElement?.clearPaymentOption()
    }
}
```

#### SwiftUI

```swift
@available(iOS 15.0, *)
extension MyEmbeddedCheckoutView {
    func deselectPaymentMethod() {
        embeddedViewModel.clearPaymentOption()
    }
}
```

## Optional: Display the mandate yourself

By default, the Embedded Mobile Payment Element displays mandates and legal disclaimers to ensure regulatory compliance. This text must be located close to your buy button. If necessary, disable its display in the view and display it yourself instead.

> Your integration must display the mandate text to be compliant. Make sure URLs in the text can be opened by using a UITextView or something similar.

#### UIKit

```swift
var configuration = EmbeddedPaymentElement.Configuration(...)
configuration.embeddedViewDisplaysMandateText = true

...

let mandateTextView = UITextView()
mandateTextView.attributedText = embeddedPaymentElement.paymentOption.mandateText
```

#### SwiftUI

```swift
var configuration = EmbeddedPaymentElement.Configuration(...)
configuration.embeddedViewDisplaysMandateText = true

...

if let attributedText = embeddedViewModel.paymentOption?.mandateText {
  Text(AttributedString(attributedText))
}
```

## Optional: Let the customer pay immediately in the sheet

![Embedded Payment Element](https://b.stripecdn.com/docs-statics-srv/assets/embedded-pay-immediate.057c691220d43158ac8000de10815ed9.png)
 

To configure the button in the form sheet to immediately confirm payment, set `formSheetAction` on your `EmbeddedPaymentElement.Configuration` object.

The completion block executes with the result of the payment after the sheet dismisses. The embedded UI isn’t usable after payment completes, so we recommend that your implementation directs the user to a different screen, such as a receipt screen.

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.formSheetAction = .confirm(completion: { result in
  switch result {
  case .completed:
    // Payment completed. You can for example, show a confirmation screen.
    print("Completed")
  case .failed(let error):
    // Encountered an unrecoverable error. You can display the error to the user, log it, etc.
    print(error)
  case .canceled:
    // Customer canceled - you should probably do nothing.
    break
  }
})
```

## Create a PaymentIntent [Server-side]

On your server, create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods) with an amount and currency. You can manage payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods). Stripe handles the return of eligible payment methods based on factors such as the transaction’s amount, currency, and payment flow. To prevent malicious customers from choosing their own prices, always decide how much to charge on the server-side (a trusted environment) and not the client.

If the call succeeds, return the PaymentIntent *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)). If the call fails, [handle the error](https://docs.stripe.com/error-handling.md) and return an error message with a brief explanation for your customer.

> Verify that all IntentConfiguration properties match your PaymentIntent (for example, `setup_future_usage`, `amount`, and `currency`).

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    customer: ..., # The Customer ID you previously created
    amount: 1099,
    currency: 'usd',
    setup_future_usage: 'off_session',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'customer': customer['id'],
      'amount': 1099,
      'currency': 'usd',
      'setup_future_usage': 'off_session',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'customer' => $customer->id,
    'amount' => 1099,
    'currency' => 'usd',
    'setup_future_usage' => 'off_session',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      customer: ... // The Customer ID you previously created
      setup_future_usage: 'off_session',
      customer: ... // The Customer ID you previously created
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setCustomer(customer.getId()) // The Customer ID you previously created
          .setAmount(1099L)
          .setCurrency("usd")
          .setSetupFutureUsage(PaymentIntentCreateParams.SetupFutureUsage.OFF_SESSION)
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          )
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationTokenID string `json:"confirmation_token_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Customer: stripe.String(c.ID), // The Customer ID you previously created
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      SetupFutureUsage: stripe.String("off_session"),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Customer = customer.Id, // The Customer ID you previously created
        Amount = 1099,
        Currency = "usd",
        SetupFutureUsage: "off_session",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token_id")]
      public string ConfirmationTokenId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```

## Set up a return URL [Client-side]

The customer might navigate away from your app to authenticate (for example, in Safari or their banking app). To allow them to automatically return to your app after authenticating, [configure a custom URL scheme](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app) and set up your app delegate to forward the URL to the SDK. Stripe doesn’t support [universal links](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content).

#### SceneDelegate

#### Swift

```swift
// This method handles opening custom URL schemes (for example, "your-app://stripe-redirect")
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let url = URLContexts.first?.url else {
        return
    }
    let stripeHandled = StripeAPI.handleURLCallback(with: url)
    if (!stripeHandled) {
        // This was not a Stripe url – handle the URL normally as you would
    }
}

```

#### AppDelegate

#### Swift

```swift
// This method handles opening custom URL schemes (for example, "your-app://stripe-redirect")
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    let stripeHandled = StripeAPI.handleURLCallback(with: url)
    if (stripeHandled) {
        return true
    } else {
        // This was not a Stripe url – handle the URL normally as you would
    }
    return false
}
```

#### SwiftUI

#### Swift

```swift

@main
struct MyApp: App {
  var body: some Scene {
    WindowGroup {
      Text("Hello, world!").onOpenURL { incomingURL in
          let stripeHandled = StripeAPI.handleURLCallback(with: incomingURL)
          if (!stripeHandled) {
            // This was not a Stripe url – handle the URL normally as you would
          }
        }
    }
  }
}
```

Additionally, set the [returnURL](https://github.com/stripe/stripe-ios/blob/aa3234a7fafde98c9203b6ed77e0278c04310eb0/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L70) on your [EmbeddedPaymentElement.Configuration](https://github.com/stripe/stripe-ios/blob/aa3234a7fafde98c9203b6ed77e0278c04310eb0/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L12) object to the URL for your app.

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.returnURL = "your-app://stripe-redirect"
```

## Handle post-payment events [Server-side]

Stripe sends a [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md#event_types-payment_intent.succeeded) event when the payment completes. Use the [Dashboard webhook tool](https://dashboard.stripe.com/webhooks) or follow the [webhook guide](https://docs.stripe.com/webhooks/quickstart.md) to receive these events and run actions, such as sending an order confirmation email to your customer, logging the sale in a database, or starting a shipping workflow.

Listen for these events rather than waiting on a callback from the client. On the client, the customer could close the browser window or quit the app before the callback executes, and malicious clients could manipulate the response. Setting up your integration to listen for asynchronous events is what enables you to accept [different types of payment methods](https://stripe.com/payments/payment-methods-guide) with a single integration.

In addition to handling the `payment_intent.succeeded` event, we recommend handling these other events when collecting payments with the Payment Element:

| Event                                                                                                                           | Description                                                                                                                                                                                                                                                                         | Action                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.succeeded)           | Sent when a customer successfully completes a payment.                                                                                                                                                                                                                              | Send the customer an order confirmation and *fulfill* (Fulfillment is the process of providing the goods or services purchased by a customer, typically after payment is collected) their order. |
| [payment_intent.processing](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.processing)         | Sent when a customer successfully initiates a payment, but the payment has yet to complete. This event is most commonly sent when the customer initiates a bank debit. It’s followed by either a `payment_intent.succeeded` or `payment_intent.payment_failed` event in the future. | Send the customer an order confirmation that indicates their payment is pending. For digital goods, you might want to fulfill the order before waiting for payment to complete.                  |
| [payment_intent.payment_failed](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.payment_failed) | Sent when a customer attempts a payment, but the payment fails.                                                                                                                                                                                                                     | If a payment transitions from `processing` to `payment_failed`, offer the customer another attempt to pay.                                                                                       |

## Charge the saved payment method later [Server-side]

> `bancontact` and `ideal` are one-time payment methods by default. When set up for future usage, they generate a `sepa_debit` reusable payment method type so you need to use `sepa_debit` to query for saved payment methods.

> #### Compliance
> 
> You’re responsible for your compliance with all applicable laws, regulations, and network rules when saving a customer’s payment details. When rendering past payment methods to your end customer for future purchases, make sure you’re listing payment methods where you’ve collected consent from the customer to save the payment method details for this specific future use. To differentiate between payment methods attached to customers that can and can’t be presented to your end customer as a saved payment method for future purchases, use the [allow_redisplay](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-allow_redisplay) parameter.

When you’re ready to charge your customer *off-session* (A payment is described as off-session if it occurs without the direct involvement of the customer, using previously-collected payment information), use the Customer and PaymentMethod IDs to create a PaymentIntent. To find a payment method to charge, list the payment methods associated with your customer. This example lists cards but you can list any supported [type](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-type).

```curl
curl -G https://api.stripe.com/v1/payment_methods \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer="{{CUSTOMER_ID}}" \
  -d type=card
```

```cli
stripe payment_methods list  \
  --customer="{{CUSTOMER_ID}}" \
  --type=card
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

payment_methods = client.v1.payment_methods.list({
  customer: '{{CUSTOMER_ID}}',
  type: 'card',
})
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

# For SDK versions 12.4.0 or lower, remove '.v1' from the following line.
payment_methods = client.v1.payment_methods.list({
  "customer": "{{CUSTOMER_ID}}",
  "type": "card",
})
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$paymentMethods = $stripe->paymentMethods->all([
  'customer' => '{{CUSTOMER_ID}}',
  'type' => 'card',
]);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

PaymentMethodListParams params =
  PaymentMethodListParams.builder()
    .setCustomer("{{CUSTOMER_ID}}")
    .setType(PaymentMethodListParams.Type.CARD)
    .build();

// For SDK versions 29.4.0 or lower, remove '.v1()' from the following line.
StripeCollection<PaymentMethod> stripeCollection =
  client.v1().paymentMethods().list(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const paymentMethods = await stripe.paymentMethods.list({
  customer: '{{CUSTOMER_ID}}',
  type: 'card',
});
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.PaymentMethodListParams{
  Customer: stripe.String("{{CUSTOMER_ID}}"),
  Type: stripe.String(stripe.PaymentMethodTypeCard),
}
result := sc.V1PaymentMethods.List(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new PaymentMethodListOptions
{
    Customer = "{{CUSTOMER_ID}}",
    Type = "card",
};
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.PaymentMethods;
StripeList<PaymentMethod> paymentMethods = service.List(options);
```

When you have the Customer and PaymentMethod IDs, create a PaymentIntent with the amount and currency of the payment. Set a few other parameters to make the off-session payment:

- Set [off_session](https://docs.stripe.com/api/payment_intents/confirm.md#confirm_payment_intent-off_session) to `true` to indicate that the customer isn’t in your checkout flow during a payment attempt and can’t fulfill an authentication request made by a partner, such as a card issuer, bank, or other payment institution. If, during your checkout flow, a partner requests authentication, Stripe requests exemptions using customer information from a previous *on-session* (A payment is described as on-session if it occurs while the customer is actively in your checkout flow and able to authenticate the payment method) transaction. If the conditions for exemption aren’t met, the PaymentIntent might throw an error.
- Set the value of the PaymentIntent’s [confirm](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-confirm) property to `true`, which causes confirmation to occur immediately when the PaymentIntent is created.
- Set [payment_method](https://docs.stripe.com/api.md#create_payment_intent-payment_method) to the ID of the PaymentMethod and [customer](https://docs.stripe.com/api.md#create_payment_intent-customer) to the ID of the Customer.

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

#### Stripe CLI

```bash
stripe payment_intents create \
  --amount=1099 \
  --currency=gbp \
  -d "automatic_payment_methods[enabled]"=true \
 # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.--customer={{CUSTOMER_ID}} \
  --payment-method={{PAYMENT_METHOD_ID}} \
  --return-url="https://example.com/order/123/complete" \
  --off-session=true \
  --confirm=true
```

#### Ruby

```ruby

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

begin
  intent = Stripe::PaymentIntent.create({
    amount: 1099,
    currency: 'gbp',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: '{{CUSTOMER_ID}}',
    payment_method: '{{PAYMENT_METHOD_ID}}',
    return_url: 'https://example.com/order/123/complete',
    off_session: true,
    confirm: true,
  })
rescue Stripe::CardError => e
  # Error code will be authentication_required if authentication is needed
  puts "Error is: \#{e.error.code}"
  payment_intent_id = e.error.payment_intent.id
  payment_intent = Stripe::PaymentIntent.retrieve(payment_intent_id)
  puts payment_intent.id
end
```

#### Python

```python

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
stripe.api_key = '<<YOUR_SECRET_KEY>>'

try:
  stripe.PaymentIntent.create(
    amount=1099,
    currency='gbp',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods={"enabled": True},customer='{{CUSTOMER_ID}}',
    payment_method='{{PAYMENT_METHOD_ID}}',
    return_url='https://example.com/order/123/complete',
    off_session=True,
    confirm=True,
  )
except stripe.error.CardError as e:
  err = e.error
  # Error code will be authentication_required if authentication is needed
  print("Code is: %s" % err.code)
  payment_intent_id = err.payment_intent['id']
  payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
```

#### PHP

```php

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
\Stripe\Stripe::setApiKey('<<YOUR_SECRET_KEY>>');

try {
  \Stripe\PaymentIntent::create([
    'amount' => 1099,
    'currency' => 'gbp',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],'customer' => '{{CUSTOMER_ID}}',
    'payment_method' => '{{PAYMENT_METHOD_ID}}',
    'return_url' => 'https://example.com/order/123/complete',
    'off_session' => true,
    'confirm' => true,
  ]);
} catch (\Stripe\Exception\CardException $e) {
  // Error code will be authentication_required if authentication is needed
  echo 'Error code is:' . $e->getError()->code;
  $payment_intent_id = $e->getError()->payment_intent->id;
  $payment_intent = \Stripe\PaymentIntent::retrieve($payment_intent_id);
}
```

#### Java

```java

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

PaymentIntentCreateParams params =
  PaymentIntentCreateParams.builder()
    .setCurrency("gbp")
    .setAmount(1099)
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    .setAutomaticPaymentMethods(
      PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
    ).setCustomer("{{CUSTOMER_ID}}")
    .setPaymentMethod("{{PAYMENT_METHOD_ID}}")
    .setReturnUrl("https://example.com/order/123/complete")
    .setConfirm(true)
    .setOffSession(true)
    .build();
try {
  PaymentIntent.create(params);
} catch (CardException e) {
  // Error code will be authentication_required if authentication is needed
  System.out.println("Error code is : " + e.getCode());
  String paymentIntentId = e.getStripeError().getPaymentIntent().getId();
  PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
  System.out.println(paymentIntent.getId());
}
```

#### Node.js

```javascript

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'gbp',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: '{{CUSTOMER_ID}}',
    payment_method: '{{PAYMENT_METHOD_ID}}',
    return_url: 'https://example.com/order/123/complete',
    off_session: true,
    confirm: true,
  });
} catch (err) {
  // Error code will be authentication_required if authentication is needed
  console.log('Error code is: ', err.code);
  const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
  console.log('PI retrieved: ', paymentIntentRetrieved.id);
}
```

#### Go

```go

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
stripe.Key = "<<YOUR_SECRET_KEY>>"

params := &stripe.PaymentIntentParams{
  Amount: stripe.Int64(1099),
  Currency: stripe.String(string(stripe.CurrencyGBP)),
  // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
  AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
    Enabled: stripe.Bool(true),
  },Customer: stripe.String("{{CUSTOMER_ID}}"),
  PaymentMethod: stripe.String("{{PAYMENT_METHOD_ID}}"),
  ReturnUrl: stripe.String("https://example.com/order/123/complete"),
  Confirm: stripe.Bool(true),
  OffSession: stripe.Bool(true),
}

_, err := paymentintent.New(params)

if err != nil {
  if stripeErr, ok := err.(*stripe.Error); ok {
    // Error code will be authentication_required if authentication is needed
    fmt.Printf("Error code: %v", stripeErr.Code)

    paymentIntentID := stripeErr.PaymentIntent.ID
    paymentIntent, _ := paymentintent.Get(paymentIntentID, nil)

    fmt.Printf("PI: %v", paymentIntent.ID)
  }
}
```

#### .NET

```dotnet

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>";

try
{
  var service = new PaymentIntentService();
  var options = new PaymentIntentCreateOptions
  {
    Amount = 1099,
    Currency = "gbp",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
    {
        Enabled = true,
    },Customer = "{{CUSTOMER_ID}}",
    PaymentMethod = "{{PAYMENT_METHOD_ID}}",
    ReturnUrl = "https://example.com/order/123/complete",
    Confirm = true,
    OffSession = true,
  };
  service.Create(options);
}
catch (StripeException e)
{
  switch (e.StripeError.Type)
  {
    case "card_error":
      // Error code will be authentication_required if authentication is needed
      Console.WriteLine("Error code: " + e.StripeError.Code);
      var paymentIntentId = e.StripeError.PaymentIntent.Id;
      var service = new PaymentIntentService();
      var paymentIntent = service.Get(paymentIntentId);

      Console.WriteLine(paymentIntent.Id);
      break;
    default:
      break;
  }
}
```

## Test the integration

#### Cards

| Card number         | Scenario                                                                                                                                                                                                                                                                                      | How to test                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 4242424242424242    | The card payment succeeds and doesn’t require authentication.                                                                                                                                                                                                                                 | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000002500003155    | The card payment requires *authentication* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase). | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000000000009995    | The card is declined with a decline code like `insufficient_funds`.                                                                                                                                                                                                                           | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 6205500000000000004 | The UnionPay card has a variable length of 13-19 digits.                                                                                                                                                                                                                                      | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |

#### Bank redirects

| Payment method    | Scenario                                                                                                                                                                                        | How to test                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bancontact, iDEAL | Your customer fails to authenticate on the redirect page for a redirect-based and immediate notification payment method.                                                                        | Choose any redirect-based payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page. |
| Pay by Bank       | Your customer successfully pays with a redirect-based and [delayed notification](https://docs.stripe.com/payments/payment-methods.md#payment-notification) payment method.                      | Choose the payment method, fill out the required details, and confirm the payment. Then click **Complete test payment** on the redirect page.            |
| Pay by Bank       | Your customer fails to authenticate on the redirect page for a redirect-based and delayed notification payment method.                                                                          | Choose the payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page.                |
| BLIK              | BLIK payments fail in a variety of ways—immediate failures (for example, the code is expired or invalid), delayed errors (the bank declines) or timeouts (the customer didn’t respond in time). | Use email patterns to [simulate the different failures.](https://docs.stripe.com/payments/blik/accept-a-payment.md#simulate-failures)                    |

#### Bank debits

| Payment method    | Scenario                                                                                          | How to test                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEPA Direct Debit | Your customer successfully pays with SEPA Direct Debit.                                           | Fill out the form using the account number `AT321904300235473204`. The confirmed PaymentIntent initially transitions to processing, then transitions to the succeeded status three minutes later. |
| SEPA Direct Debit | Your customer’s payment intent status transitions from `processing` to `requires_payment_method`. | Fill out the form using the account number `AT861904300235473202`.                                                                                                                                |

See [Testing](https://docs.stripe.com/testing.md) for additional information to test your integration.

## Optional: Set SetupFutureUsage on individual payment methods (Preview) [Server-side] [Client-side]

For more granularity, set `setupFutureUsage` for specific payment methods with [PaymentSheet.IntentConfiguration.Mode.PaymentMethodOptions](https://github.com/stripe/stripe-ios/blob/master/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/PaymentSheetIntentConfiguration.swift#L116).

```swift
@_spi(PaymentMethodOptionsSetupFutureUsagePreview) import StripePaymentSheet
class MyCheckoutVC: UIViewController {

  func createEmbeddedPaymentElement() async throws -> EmbeddedPaymentElement {
      let intentConfig = PaymentSheet.IntentConfiguration(
        mode: .payment(
          amount: 1099,
          currency: "USD",paymentMethodOptions: PaymentSheet.IntentConfiguration.Mode.PaymentMethodOptions(
            setupFutureUsageValues: [
              .card: .offSession,
              .cashApp: .onSession
            ]
          )
        )
      ) { [weak self] confirmationToken in
        return try await self?.handleConfirmationToken(confirmationToken)
      }
      var configuration = EmbeddedPaymentElement.Configuration()
      configuration.returnURL = "your-app://stripe-redirect" // Use the return url you set up in the previous step
      let embeddedPaymentElement = try await EmbeddedPaymentElement.create(intentConfiguration: intentConfig, configuration: configuration)
      embeddedPaymentElement.presentingViewController = self
      embeddedPaymentElement.delegate = self
      return embeddedPaymentElement
  }
}
```

Learn more about [the `setupFutureUsage` values](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-payment_method_options) that are supported for each payment method.

Next, make sure your server doesn’t set `setup_future_usage` or `payment_method_options[X][setup_future_usage]` on the PaymentIntent. The SDK automatically handles setting it based on the `IntentConfiguration`.

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    amount: 1099,
    currency: 'usd',
    confirmation_token: data['confirmation_token'],
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'amount': 1099,
      'currency': 'usd',
      'confirmation_token': data['confirmation_token'],
      # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'amount' => 1099,
    'currency' => 'usd',
    'confirmation_token' => $jsonObj->confirmation_token,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      confirmation_token: req.body.confirmation_token,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setAmount(1099L)
          .setCurrency("usd")
          .setConfirmationToken(postBody.get("confirmation_token").getAsString())
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          );
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationToken string `json:"confirmation_token"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      ConfirmationToken: stripe.String(req.ConfirmationToken),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Amount = 1099,
        Currency = "usd",
        ConfirmationToken = request.ConfirmationToken,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token")]
      public string ConfirmationToken { get; set; }
    }
  }
}
```

## Optional: Enable saved cards [Server-side] [Client-side]

EmbeddedPaymentElement can display a **Save this card for future use** checkbox that saves the customer’s card, and display the customer’s saved cards. To enable this checkbox, create a [Customer](https://docs.stripe.com/api/customers.md) object on your server and an associated [CustomerSession](https://docs.stripe.com/api/customer_sessions.md), with `payment_method_save` set to `enabled`.

> #### Compare Customers v1 and Accounts v2 references
> 
> If your Connect platform uses [customer-configured Accounts](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-configuration-customer), use our [guide](https://docs.stripe.com/connect/use-accounts-as-customers.md) to replace `Customer` and event references in your code with the equivalent Accounts v2 API references.

```javascript
const stripe = require('stripe')('sk_test_your_secret_key');

app.post('/mobile-payment-element', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const customerSession = await stripe.customerSessions.create({
    customer: customer.id,
    components: {
      mobile_payment_element: {
        enabled: true,
        features: {
          payment_method_save: 'enabled',
          payment_method_redisplay: 'enabled',
          payment_method_remove: 'enabled'
        }
      },
    },
  });

  res.json({
    customerSessionClientSecret: customerSession.client_secret,
    customer: customer.id,
  });
});
```

Next, configure EmbeddedPaymentElement with the Customer’s ID and the CustomerSession client secret.

#### UIKit

```swift
@_spi(CustomerSessionBetaAccess) import StripePaymentSheet

var configuration = EmbeddedPaymentElement.Configuration()
configuration.customer = .init(id: customerId, customerSessionClientSecret: customerSessionClientSecret)

self.embeddedPaymentElement = try await EmbeddedPaymentElement.create(..., configuration: configuration)
```

#### SwiftUI

```swift
@_spi(CustomerSessionBetaAccess) import StripePaymentSheet

var configuration = EmbeddedPaymentElement.Configuration()
configuration.customer = .init(id: customerId, customerSessionClientSecret: customerSessionClientSecret)

try await embeddedViewModel.load(..., configuration: configuration)
```

## Optional: Allow delayed payment methods [Client-side]

*Delayed payment methods* (A payment method that can't immediately return payment status when a customer attempts a transaction (for example, ACH debits). Businesses commonly hold an order in a pending state until payment is successful with these payment methods) don’t guarantee that you’ll receive funds from your customer at the end of the checkout either because they take time to settle (for example, US Bank Accounts, SEPA Debit, iDEAL, and Bancontact) or because they require customer action to complete (for example, OXXO, Konbini, and Boleto).

By default, EmbeddedPaymentElement doesn’t display delayed payment methods. To opt in, set `allowsDelayedPaymentMethods` to true in your `EmbeddedPaymentElement.Configuration`. This step alone doesn’t activate any specific payment methods; rather, it indicates that your app is able to handle them. For example, although OXXO is currently not supported by EmbeddedPaymentElement, if it becomes supported and you’ve updated to the latest SDK version, your app will be able to display OXXO as a payment option without additional integration changes.

#### UIKit

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.allowsDelayedPaymentMethods = true

self.embeddedPaymentElement = try await EmbeddedPaymentElement.create(..., configuration: configuration)
```

#### SwiftUI

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.allowsDelayedPaymentMethods = true

try await embeddedViewModel.load(..., configuration: configuration)
```

If the customer successfully uses one of these delayed payment methods in EmbeddedPaymentElement, the payment result returned is `.completed`.

## Optional: Enable Apple Pay

> If your checkout screen has a dedicated **Apple Pay** button, follow the [Apple Pay guide](https://docs.stripe.com/apple-pay.md#present-payment-sheet) and use `ApplePayContext` to collect payment from your **Apple Pay** button. You can use `EmbeddedPaymentElement` to handle other payment method types.

### Register for an Apple Merchant ID

Obtain an Apple Merchant ID by [registering for a new identifier](https://developer.apple.com/account/resources/identifiers/add/merchant) on the Apple Developer website.

Fill out the form with a description and identifier. Your description is for your own records and you can modify it in the future. Stripe recommends using the name of your app as the identifier (for example, `merchant.com.{{YOUR_APP_NAME}}`).

### Create a new Apple Pay certificate

Create a certificate for your app to encrypt payment data.

Go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard, click **Add new application**, and follow the guide.

Download a Certificate Signing Request (CSR) file to get a secure certificate from Apple that allows you to use Apple Pay.

One CSR file must be used to issue exactly one certificate. If you switch your Apple Merchant ID, you must go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard to obtain a new CSR and certificate.

### Integrate with Xcode

Add the Apple Pay capability to your app. In Xcode, open your project settings, click the **Signing & Capabilities** tab, and add the **Apple Pay** capability. You might be prompted to log in to your developer account at this point. Select the merchant ID you created earlier, and your app is ready to accept Apple Pay.
![](https://b.stripecdn.com/docs-statics-srv/assets/xcode.a701d4c1922d19985e9c614a6f105bf1.png)

Enable the Apple Pay capability in Xcode

### Add Apple Pay

#### One-time payment

To add Apple Pay to EmbeddedPaymentElement, set [applePay](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L28) after initializing `EmbeddedPaymentElement.Configuration` with your Apple merchant ID and your business’s [country code](https://dashboard.stripe.com/settings/account).

#### iOS (Swift)

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.applePay = .init(
  merchantId: "merchant.com.your_app_name",
  merchantCountryCode: "US"
)
```

#### Recurring payments

To add Apple Pay to EmbeddedPaymentElement, set [applePay](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L28) after initializing `EmbeddedPaymentElement.Configuration` with your Apple merchant ID and your business’s [country code](https://dashboard.stripe.com/settings/account).

Per [Apple’s guidelines](https://developer.apple.com/design/human-interface-guidelines/apple-pay#Supporting-subscriptions) for recurring payments, you must also set additional attributes on the `PKPaymentRequest`. Add a handler in [ApplePayConfiguration.paymentRequestHandlers](https://stripe.dev/stripe-ios/stripepaymentsheet/documentation/stripepaymentsheet/paymentsheet/applepayconfiguration/handlers/paymentrequesthandler) to configure the [PKPaymentRequest.paymentSummaryItems](https://developer.apple.com/documentation/passkit/pkpaymentrequest/1619231-paymentsummaryitems) with the amount you intend to charge (for example, 9.95 USD a month).

You can also adopt [merchant tokens](https://developer.apple.com/apple-pay/merchant-tokens/) by setting the `recurringPaymentRequest` or `automaticReloadPaymentRequest` properties on the `PKPaymentRequest`.

To learn more about how to use recurring payments with Apple Pay, see [Apple’s PassKit documentation](https://developer.apple.com/documentation/passkit/pkpaymentrequest).

#### iOS (Swift)

```swift
let customHandlers = EmbeddedPaymentElement.ApplePayConfiguration.Handlers(
    paymentRequestHandler: { request in
        // PKRecurringPaymentSummaryItem is available on iOS 15 or later
        if #available(iOS 15.0, *) {
            let billing = PKRecurringPaymentSummaryItem(label: "My Subscription", amount: NSDecimalNumber(string: "59.99"))

            // Payment starts today
            billing.startDate = Date()

            // Payment ends in one year
            billing.endDate = Date().addingTimeInterval(60 * 60 * 24 * 365)

            // Pay once a month.
            billing.intervalUnit = .month
            billing.intervalCount = 1

            // recurringPaymentRequest is only available on iOS 16 or later
            if #available(iOS 16.0, *) {
                request.recurringPaymentRequest = PKRecurringPaymentRequest(paymentDescription: "Recurring",
                                                                            regularBilling: billing,
                                                                            managementURL: URL(string: "https://my-backend.example.com/customer-portal")!)
                request.recurringPaymentRequest?.billingAgreement = "You'll be billed $59.99 every month for the next 12 months. To cancel at any time, go to Account and click 'Cancel Membership.'"
            }
            request.paymentSummaryItems = [billing]
            request.currencyCode = "USD"
        } else {
            // On older iOS versions, set alternative summary items.
            request.paymentSummaryItems = [PKPaymentSummaryItem(label: "Monthly plan starting July 1, 2022", amount: NSDecimalNumber(string: "59.99"), type: .final)]
        }
        return request
    }
)
var configuration = EmbeddedPaymentElement.Configuration()
configuration.applePay = .init(merchantId: "merchant.com.your_app_name",
                                merchantCountryCode: "US",
                                customHandlers: customHandlers)
```

### Order tracking

To add [order tracking](https://developer.apple.com/design/human-interface-guidelines/technologies/wallet/designing-order-tracking) information in iOS 16 or later, configure an [authorizationResultHandler](https://stripe.dev/stripe-ios/stripepaymentsheet/documentation/stripepaymentsheet/paymentsheet/applepayconfiguration/handlers/authorizationresulthandler) in your `PaymentSheet.ApplePayConfiguration.Handlers`. Stripe calls your implementation after the payment is complete, but before iOS dismisses the Apple Pay sheet.

In your `authorizationResultHandler` implementation, fetch the order details from your server for the completed order. Add the details to the provided [PKPaymentAuthorizationResult](https://developer.apple.com/documentation/passkit/pkpaymentauthorizationresult) and return the modified result.

To learn more about order tracking, see [Apple’s Wallet Orders documentation](https://developer.apple.com/documentation/walletorders).

#### iOS (Swift)

```swift
let customHandlers = PaymentSheet.ApplePayConfiguration.Handlers(
    authorizationResultHandler: { result in
      do {
        // Fetch the order details from your service
        let myOrderDetails = try await MyAPIClient.shared.fetchOrderDetails(orderID: orderID)
        result.orderDetails = PKPaymentOrderDetails(
          orderTypeIdentifier: myOrderDetails.orderTypeIdentifier, // "com.myapp.order"
          orderIdentifier: myOrderDetails.orderIdentifier, // "ABC123-AAAA-1111"
          webServiceURL: myOrderDetails.webServiceURL, // "https://my-backend.example.com/apple-order-tracking-backend"
          authenticationToken: myOrderDetails.authenticationToken) // "abc123"
        // Return your modified PKPaymentAuthorizationResult
        return result
      } catch {
        return PKPaymentAuthorizationResult(status: .failure, errors: [error])
      }
    }
)
var configuration = EmbeddedPaymentElement.Configuration()
configuration.applePay = .init(merchantId: "merchant.com.your_app_name",
                               merchantCountryCode: "US",
                               customHandlers: customHandlers)
```

## Optional: Enable card scanning

#### iOS

To enable card scanning support, set the `NSCameraUsageDescription` (**Privacy - Camera Usage Description**) in the Info.plist of your application, and provide a reason for accessing the camera (for example, “To scan cards”). Devices with iOS 13 or higher support card scanning.

#### Android

To enable card scanning support, [request production access](https://developers.google.com/pay/api/android/guides/test-and-deploy/request-prod-access) to the Google Pay API from the [Google Pay and Wallet Console](https://pay.google.com/business/console?utm_source=devsite&utm_medium=devsite&utm_campaign=devsite).

- If you’ve enabled Google Pay, the card scanning feature is automatically available in our UI on eligible devices. To learn more about eligible devices, see the [Google Pay API constraints](https://developers.google.com/pay/payment-card-recognition/debit-credit-card-recognition)
- **Important:** The card scanning feature only appears in builds signed with the same signing key registered in the [Google Pay & Wallet Console](https://pay.google.com/business/console). Test or debug builds using different signing keys (for example, builds distributed through Firebase App Tester) won’t show the **Scan card** option. To test card scanning in pre-release builds, you must either:
  - Sign your test builds with your production signing key
  - Add your test signing key fingerprint to the Google Pay and Wallet Console

## Optional: Customize the element

All customization is configured through the [EmbeddedPaymentElement.Configuration](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L12) object.

### Appearance

Customize colors, fonts, and so on to match the look and feel of your app by using the [appearance API](https://docs.stripe.com/elements/appearance-api/embedded-mobile.md?platform=ios).

### Collect users addresses

Collect local and international shipping or billing addresses from your customers using the [Address Element](https://docs.stripe.com/elements/address-element.md?platform=ios).

### Merchant display name

Specify a customer-facing business name by setting [merchantDisplayName](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L66). By default, this is your app’s name.

#### Swift

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.merchantDisplayName = "My app, Inc."
```

### Dark mode

`EmbeddedPaymentElement` automatically adapts to the user’s system-wide appearance settings (light and dark mode). If your app doesn’t support dark mode, you can set [style](https://github.com/stripe/stripe-ios/blob/8be959abc141e360080efa88980afb325737a935/StripePaymentSheet/StripePaymentSheet/Source/PaymentSheet/Embedded/EmbeddedPaymentElementConfiguration.swift#L51) to `alwaysLight` or `alwaysDark` mode.

```swift
var configuration = EmbeddedPaymentElement.Configuration()
configuration.style = .alwaysLight
```

## Optional: Enable CVC recollection on confirmation

To re-collect the CVC of a saved card during PaymentIntent confirmation, your integration must collect payment details before creating a PaymentIntent.

### Update the intent configuration

`PaymentSheet.IntentConfiguration` accepts an optional parameter that controls when to re-collect CVC for a saved card.

```swift
let intentConfig = PaymentSheet.IntentConfiguration(
  mode: .payment(amount: 1099, currency: "USD"),
  confirmHandler: { confirmationToken in
    // Handle ConfirmationToken...}, requireCVCRecollection: true)
```

### Update parameters of the intent creation

To re-collect the CVC when confirming payment, include both the `customerId` and `require_cvc_recollection` parameters during the creation of the PaymentIntent.

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    amount: 1099,
    currency: 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: customer.id,
    payment_method_options: {
      card: {require_cvc_recollection: true}
    }
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'amount': 1099,
      'currency': 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },customer=customer['id'],
      payment_method_options={
        'card': {
          'require_cvc_recollection': True
        }
      }
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'amount' => 1099,
    'currency' => 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],'customer' => $customer->id,
    'payment_method_options' => [
      'card' => ['require_cvc_recollection' => true]
    ]
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},customer: customer.id,
      payment_method_options: {
        card: {
          require_cvc_recollection: true,
        },
      },
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setAmount(1099L)
          .setCurrency("usd")
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          ).setCustomer(customer.getId())
          .setPaymentMethodOptions(
            PaymentIntentCreateParams.PaymentMethodOptions.builder()
              .setCard(
                PaymentIntentCreateParams.PaymentMethodOptions.Card.builder()
                  .setRequireCvcRecollection(true)
                  .build()
              )
              .build()
          )
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      PaymentMethodID string `json:"payment_method_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },Customer: stripe.String(customer.ID),
      PaymentMethodOptions: stripe.PaymentIntentPaymentMethodOptionsParams{
        Card: stripe.PaymentIntentPaymentMethodOptionsCardParams{
          RequireCvcRecollection: stripe.Bool(true),
        }
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Amount = 1099,
        Currency = "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },Customer = customer.Id,
        PaymentMethodOptions = new PaymentIntentPaymentMethodOptionsOptions
        {
            Card = new PaymentIntentPaymentMethodOptionsCardOptions
            {
                RequireCvcRecollection = true,
            },
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("payment_method_id")]
      public string PaymentMethodId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```


# Accept a payment

> This is a Accept a payment for when platform is android and type is payment. View the full page at https://docs.stripe.com/payments/mobile/accept-payment-embedded?platform=android&type=payment.

The Payment Element allows you to accept multiple payment methods using a single integration. In this integration, you build a custom payment flow where you render the Payment Element, create the *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods), and confirm the payment in your app.

## Set up Stripe [Server-side] [Client-side]

### Server-side 

This integration requires endpoints on your server that talk to the Stripe API. Use the official libraries for access to the Stripe API from your server:

#### Ruby

```bash
# Available as a gem
sudo gem install stripe
```

```ruby
# If you use bundler, you can add this line to your Gemfile
gem 'stripe'
```

#### Python

```bash
# Install through pip
pip3 install --upgrade stripe
```

```bash
# Or find the Stripe package on http://pypi.python.org/pypi/stripe/
```

```python
# Find the version you want to pin:
# https://github.com/stripe/stripe-python/blob/master/CHANGELOG.md
# Specify that version in your requirements.txt file
stripe>=5.0.0
```

#### PHP

```bash
# Install the PHP library with Composer
composer require stripe/stripe-php
```

```bash
# Or download the source directly: https://github.com/stripe/stripe-php/releases
```

#### Java

```java
/*
  For Gradle, add the following dependency to your build.gradle and replace with
  the version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
*/
implementation "com.stripe:stripe-java:31.3.0"
```

```xml
<!--
  For Maven, add the following dependency to your POM and replace with the
  version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
-->
<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>31.3.0</version>
</dependency>
```

```bash
# For other environments, manually install the following JARs:
# - The Stripe JAR from https://github.com/stripe/stripe-java/releases/latest
# - Google Gson from https://github.com/google/gson
```

#### Node.js

```bash
# Install with npm
npm install stripe --save
```

#### Go

```bash
# Make sure your project is using Go Modules
go mod init
# Install stripe-go
go get -u github.com/stripe/stripe-go/v84
```

```go
// Then import the package
import (
  "github.com/stripe/stripe-go/v84"
)
```

#### .NET

```bash
# Install with dotnet
dotnet add package Stripe.net
dotnet restore
```

```bash
# Or install with NuGet
Install-Package Stripe.net
```

### Client-side 

The [Stripe Android SDK](https://github.com/stripe/stripe-android) is open source and [fully documented](https://stripe.dev/stripe-android/).

To install the SDK, add `stripe-android` to the `dependencies` block of your [app/build.gradle](https://developer.android.com/studio/build/dependencies) file:

#### Kotlin

```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    ...
    kotlinOptions {
        jvmTarget = '11'
    }
    buildFeatures {
        compose true
    }
}

dependencies {
  // ...

  // Stripe Android SDK
  implementation("com.stripe:stripe-android:22.6.1")
  // Include the financial connections SDK to support US bank account as a payment method
  implementation("com.stripe:financial-connections:22.6.1")
}
```

#### Groovy

```groovy
apply plugin: 'com.android.application'

android { ... }

dependencies {
  // ...

  // Stripe Android SDK
  implementation 'com.stripe:stripe-android:22.6.1'
  // Include the financial connections SDK to support US bank account as a payment method
  implementation 'com.stripe:financial-connections:22.6.1'
}
```

> For details on the latest SDK release and past versions, see the [Releases](https://github.com/stripe/stripe-android/releases) page on GitHub. To receive notifications when a new release is published, [watch releases for the repository](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/configuring-notifications#configuring-your-watch-settings-for-an-individual-repository).

You also need to set your [publishable key](https://dashboard.stripe.com/apikeys) so that the SDK can make API calls to Stripe. To get started quickly, you can hardcode this on the client while you’re integrating, but fetch the publishable key from your server in production.

```kotlin
// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
PaymentConfiguration.init(context, publishableKey = "<<YOUR_PUBLISHABLE_KEY>>")
```

## Enable payment methods

View your [payment methods settings](https://dashboard.stripe.com/settings/payment_methods) and enable the payment methods you want to support. You need at least one payment method enabled to create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods).

By default, Stripe enables cards and other prevalent payment methods that can help you reach more customers, but we recommend turning on additional payment methods that are relevant for your business and customers. See [Payment method support](https://docs.stripe.com/payments/payment-methods/payment-method-support.md) for product and payment method support, and our [pricing page](https://stripe.com/pricing/local-payment-methods) for fees.

## Collect payment details [Client-side]

The Embedded Mobile Payment Element is designed for use on the checkout page of your native mobile app. The element displays a list of payment methods, and you can customize it to match your app’s look and feel.

When the customer taps the **Card** row, a sheet opens where they can enter their payment method details. The button in the sheet says **Continue** by default and dismisses the sheet when tapped, which lets your customer finish payment in your checkout.
![Embedded Payment Element](https://b.stripecdn.com/docs-statics-srv/assets/android-embedded.1aefe2ca79ed073e350ec629a5af22d5.png)

Alternatively, you can configure the button to immediately complete payment instead of continuing. To do so, complete [this step](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#embedded-let-customer-pay-immediately) after following the guide.

### Initialize the Embedded Payment Element

#### Jetpack Compose

Initialize an instance of `EmbeddedPaymentElement` using the `rememberEmbeddedPaymentElement` function with an `EmbeddedPaymentElement.Builder`.

Pass in a `CreateIntentWithConfirmationTokenCallback`. For now, leave the implementation empty.

```kotlin
import com.stripe.android.paymentelement.EmbeddedPaymentElement
import com.stripe.android.paymentelement.rememberEmbeddedPaymentElement

@Composable
fun CheckoutScreen() {
    val embeddedBuilder = remember {
        EmbeddedPaymentElement.Builder(
            createIntentCallback = { confirmationToken, ->
                TODO("You'll implement this in the "Confirm the payment" step")
            },
            resultCallback = { result ->
                TODO("You'll implement this in the "Confirm the payment" step")
            },
        )
    }

    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)
}
```

#### Views (Classic)

Initialize an instance of `EmbeddedPaymentElement` using the `rememberEmbeddedPaymentElement` function with an `EmbeddedPaymentElement.Builder`.

```kotlin
import com.stripe.android.paymentelement.EmbeddedPaymentElement
import com.stripe.android.paymentelement.rememberEmbeddedPaymentElement

@Composable
fun CheckoutScreen() {
    val embeddedBuilder = remember {
        EmbeddedPaymentElement.Builder(
            createIntentCallback = { confirmationToken ->
                TODO("Completed in a later step.")
            },
            resultCallback = { result ->
                TODO("Completed in a later step.")
            },
        )
    }

    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)
}
```

The Embedded Mobile Payment Element is built for the Jetpack Compose UI and exposes a `@Composable Content` method. When using classic views, you must wrap the Embedded Payment Element with a `ComposeView`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Replace the content with your actual layout -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.compose.ui.platform.ComposeView
        android:id="@+id/compose_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.checkout_screen_layout)
        val composeView = findViewById<ComposeView>(R.id.compose_view)
        composeView.setContent {
            CheckoutScreen()
        }
    }
}
```

### Configure the Embedded Payment Element

The `Builder` object contains callbacks necessary for instantiating `EmbeddedPaymentElement`, including the `CreateIntentCallback`. For now, leave its implementation empty.

After instantiating, call `configure` with an `EmbeddedPaymentElement.Configuration` and `PaymentSheet.IntentConfiguration`. The `Configuration` object contains general configuration options for `EmbeddedPaymentElement` that don’t change between payments. The `IntentConfiguration` object contains details about the specific payment, such as the amount and currency.

```kotlin
import com.stripe.android.paymentsheet.PaymentSheet

@Composable
fun CheckoutScreen() {
    val embeddedBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)
LaunchedEffect(embeddedPaymentElement) {
        embeddedPaymentElement.configure(
            intentConfiguration = PaymentSheet.IntentConfiguration(mode = PaymentSheet.IntentConfiguration.Mode.Payment(
                    amount = 1099,
                    currency = "USD",),// Optional intent configuration options...
            ),
            configuration = EmbeddedPaymentElement.Configuration.Builder("Powdur").build()
        )
    }
}
```

### Add the Embedded Payment Element view

After the `EmbeddedPaymentElement` has successfully initialized, put its `@Composable Content` in your checkout UI.

> The content must be in a scrollable container, because its height can change after it’s initially rendered.

```kotlin
@Composable
fun CheckoutScreen() {
    val embeddedBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)

    .....
val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        embeddedPaymentElement.Content()
    }
}
```

At this point, you can run your app and see the Embedded Mobile Payment Element.

### (Optional) Update payment details

If a customer changes the payment details (for example, by applying a discount code), update the `EmbeddedPaymentElement` instance. When you call the `configure` method again, the new values synchronize and display in the UI.

> Some payment methods, like Google Pay, show the amount in the UI. If a customer changes the payment and you don’t update the `EmbeddedPaymentElement`, the UI displays incorrect values.

When the `configure` call completes, the `@Composable Content` and the `paymentOption` automatically update with the new values provided to the `configure` call.

```kotlin
val intentConfiguration = PaymentSheet.IntentConfiguration(
    // Update the amount to reflect the price after applying the discount code
    mode = PaymentSheet.IntentConfiguration.Mode.Payment(
        amount = 999,
        currency = "USD",
    ),
)

val configuration = EmbeddedPaymentElement.Configuration.Builder("Powdur")
    .build()

LaunchedEffect(embeddedPaymentElement) {
    embeddedPaymentElement.configure(
        intentConfiguration = intentConfiguration,
        configuration = configuration,
    )
}
```

### (Optional) Display the selected payment option

You can display payment option details (such as the last 4 digits, a card logo, or billing information) by accessing the observable `Flow` property in the Embedded Payment Element’s `paymentOption`. When a customer selects a payment method that opens a form sheet, the payment option updates after they tap **Continue** in the sheet.

```kotlin
val selectedPaymentOption by embeddedPaymentElement.paymentOption.collectAsState()

selectedPaymentOption?.let { paymentOption ->
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .clickable(
                onClick = {  },
            )
            .semantics {
                text = AnnotatedString(paymentOption.label)
            },
    ) {
        Icon(
            painter = paymentOption.iconPainter,
            contentDescription = null, // decorative element
            modifier = Modifier.padding(horizontal = 4.dp),
            tint = Color.Unspecified,
        )

        Text(text = paymentOption.label)
    }
}
```

### Confirm the payment

When the customer taps the checkout button, initiate the payment by calling `embeddedPaymentElement.confirm()`. Be sure to disable user interaction during confirmation.

When a form is presented, the `EmbeddedPaymentElement` calls `confirm` when the user clicks **Call to action**. If the selected payment method doesn’t have any form fields, call `confirm` when the user clicks **Call to action** below the `@Composable Content`.

```kotlin
Button(
    onClick = {
        embeddedPaymentElement.confirm()
    }
) {
    Text("Confirm payment")
}
```

Next, implement the `createIntentCallback` callback you passed to `EmbeddedPaymentElement.Builder` earlier to send a request to your server. Your server creates a `PaymentIntent` and returns its client secret, explained in [Create a PaymentIntent](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#submit-payment).

When you receive the request, return the result of the Intent creation using `CreateIntentResult` with your server response’s client secret or an error. The `EmbeddedPaymentElement` confirms the PaymentIntent using the client secret or displays the localized error message in its UI.

```kotlin
import com.stripe.android.paymentsheet.CreateIntentResult

val embeddedBuilder = remember {
    val embeddedBuilder = EmbeddedPaymentElement.Builder(
        createIntentCallback = { confirmationToken ->// Make a request to your own server and receive a client secret or an error.
            val networkResult = ...
            if (networkResult.isSuccess) {
                CreateIntentResult.Success(networkResult.clientSecret)
            } else {
                CreateIntentResult.Failure(networkResult.exception)
            }
        },
        resultCallback = { result ->when (result) {
                is EmbeddedPaymentElement.Result.Completed -> {
                    // Payment completed - show a confirmation screen.
                }
                is EmbeddedPaymentElement.Result.Failed -> {
                    // Encountered an unrecoverable error. You can display the error to the user, log it, and so on
                }
                is EmbeddedPaymentElement.Result.Canceled -> {
                    // Customer canceled - you should probably do nothing.
                }
            }
        },
    )
}
```

## Optional: Clear the selected payment option

If you have payment options external to `EmbeddedPaymentElement`, you might need to clear the selected payment option. To do so, use the `clearPaymentOption` API to deselect the selected payment option.

```kotlin
@Composable
fun CheckoutScreen() {
    val embeddedPaymentElementBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedPaymentElementBuilder)

    ....

    Button(
        onClick = embeddedPaymentElement::clearPaymentOption
    ) {
        Text("Select external payment option")
    }
}
```

## Optional: Display the mandate yourself

To ensure regulatory compliance, the Embedded Mobile Payment Element displays mandates and legal disclaimers by default. This text must be located close to your **Buy** button. If you disable the default display of this text in the view, you must display it yourself.

> To be compliant, your integration must display the mandate text accurately. If you display it yourself, make sure that any URLs are rendered correctly by including the text in a `Text` composable.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder("Merchant, Inc")
    .embeddedViewDisplaysMandateText(false)
    .build()

....

val selectedPaymentOption by embeddedPaymentElement.paymentOption.collectAsState()
selectedPaymentOption?.mandateText?.let { mandateText ->
    Text(mandateText)
}
```

## Optional: Let the customer pay immediately in the sheet

![Embedded Payment Element](https://b.stripecdn.com/docs-statics-srv/assets/embedded-pay-immediate.057c691220d43158ac8000de10815ed9.png)
 

To configure the button in the form sheet to immediately confirm payment, set `formSheetAction` on your `EmbeddedPaymentElement.Configuration` object.

The completion block executes with the result of the payment after the sheet dismisses. The embedded UI isn’t usable after payment completes, so we recommend that your implementation directs the user to a different screen, such as a receipt screen.

```kotlin
@Composable
fun CheckoutScreen() {
    val embeddedBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)

    LaunchedEffect(embeddedPaymentElement) {
        embeddedPaymentElement.configure(
            intentConfiguration = ....,
            configuration = EmbeddedPaymentElement.Configuration.Builder("Powdur")
                .formSheetAction(EmbeddedPaymentElement.FormSheetAction.Confirm)
                .build()
        )
    }
}
```

## Create a PaymentIntent [Server-side]

On your server, create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods) with an amount and currency. You can manage payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods). Stripe handles the return of eligible payment methods based on factors such as the transaction’s amount, currency, and payment flow. To prevent malicious customers from choosing their own prices, always decide how much to charge on the server-side (a trusted environment) and not the client.

If the call succeeds, return the PaymentIntent *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)). If the call fails, [handle the error](https://docs.stripe.com/error-handling.md) and return an error message with a brief explanation for your customer.

> Verify that all IntentConfiguration properties match your PaymentIntent (for example, `setup_future_usage`, `amount`, and `currency`).

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    amount: 1099,
    currency: 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'amount': 1099,
      'currency': 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'amount' => 1099,
    'currency' => 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setAmount(1099L)
          .setCurrency("usd")
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          )
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationTokenID string `json:"confirmation_token_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Amount = 1099,
        Currency = "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token_id")]
      public string ConfirmationTokenId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```

## Handle post-payment events [Server-side]

Stripe sends a [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md#event_types-payment_intent.succeeded) event when the payment completes. Use the [Dashboard webhook tool](https://dashboard.stripe.com/webhooks) or follow the [webhook guide](https://docs.stripe.com/webhooks/quickstart.md) to receive these events and run actions, such as sending an order confirmation email to your customer, logging the sale in a database, or starting a shipping workflow.

Listen for these events rather than waiting on a callback from the client. On the client, the customer could close the browser window or quit the app before the callback executes, and malicious clients could manipulate the response. Setting up your integration to listen for asynchronous events is what enables you to accept [different types of payment methods](https://stripe.com/payments/payment-methods-guide) with a single integration.

In addition to handling the `payment_intent.succeeded` event, we recommend handling these other events when collecting payments with the Payment Element:

| Event                                                                                                                           | Description                                                                                                                                                                                                                                                                         | Action                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.succeeded)           | Sent when a customer successfully completes a payment.                                                                                                                                                                                                                              | Send the customer an order confirmation and *fulfill* (Fulfillment is the process of providing the goods or services purchased by a customer, typically after payment is collected) their order. |
| [payment_intent.processing](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.processing)         | Sent when a customer successfully initiates a payment, but the payment has yet to complete. This event is most commonly sent when the customer initiates a bank debit. It’s followed by either a `payment_intent.succeeded` or `payment_intent.payment_failed` event in the future. | Send the customer an order confirmation that indicates their payment is pending. For digital goods, you might want to fulfill the order before waiting for payment to complete.                  |
| [payment_intent.payment_failed](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.payment_failed) | Sent when a customer attempts a payment, but the payment fails.                                                                                                                                                                                                                     | If a payment transitions from `processing` to `payment_failed`, offer the customer another attempt to pay.                                                                                       |

## Test the integration

#### Cards

| Card number         | Scenario                                                                                                                                                                                                                                                                                      | How to test                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 4242424242424242    | The card payment succeeds and doesn’t require authentication.                                                                                                                                                                                                                                 | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000002500003155    | The card payment requires *authentication* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase). | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000000000009995    | The card is declined with a decline code like `insufficient_funds`.                                                                                                                                                                                                                           | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 6205500000000000004 | The UnionPay card has a variable length of 13-19 digits.                                                                                                                                                                                                                                      | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |

#### Bank redirects

| Payment method    | Scenario                                                                                                                                                                                        | How to test                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bancontact, iDEAL | Your customer fails to authenticate on the redirect page for a redirect-based and immediate notification payment method.                                                                        | Choose any redirect-based payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page. |
| Pay by Bank       | Your customer successfully pays with a redirect-based and [delayed notification](https://docs.stripe.com/payments/payment-methods.md#payment-notification) payment method.                      | Choose the payment method, fill out the required details, and confirm the payment. Then click **Complete test payment** on the redirect page.            |
| Pay by Bank       | Your customer fails to authenticate on the redirect page for a redirect-based and delayed notification payment method.                                                                          | Choose the payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page.                |
| BLIK              | BLIK payments fail in a variety of ways—immediate failures (for example, the code is expired or invalid), delayed errors (the bank declines) or timeouts (the customer didn’t respond in time). | Use email patterns to [simulate the different failures.](https://docs.stripe.com/payments/blik/accept-a-payment.md#simulate-failures)                    |

#### Bank debits

| Payment method    | Scenario                                                                                          | How to test                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEPA Direct Debit | Your customer successfully pays with SEPA Direct Debit.                                           | Fill out the form using the account number `AT321904300235473204`. The confirmed PaymentIntent initially transitions to processing, then transitions to the succeeded status three minutes later. |
| SEPA Direct Debit | Your customer’s payment intent status transitions from `processing` to `requires_payment_method`. | Fill out the form using the account number `AT861904300235473202`.                                                                                                                                |

See [Testing](https://docs.stripe.com/testing.md) for additional information to test your integration.

## Optional: Enable saved cards [Server-side] [Client-side]

`EmbeddedPaymentElement` can allow the customer to save their card and can include the customer’s saved cards in available payment methods. The customer must have an associated [Customer](https://docs.stripe.com/api/customers.md) object on your server. To enable a checkbox that allows the customer to save their card, create a [CustomerSession](https://docs.stripe.com/api/customer_sessions.md), with `payment_method_save` set to `enabled`.

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const customerSession = await stripe.customerSessions.create({
    customer: customer.id,
    components: {
      mobile_payment_element: {
        enabled: true,
        features: {
          payment_method_save: 'enabled',
          payment_method_redisplay: 'enabled',
          payment_method_remove: 'enabled'
        }
      },
    },
  });

  res.json({
    customerSessionClientSecret: customerSession.client_secret,
    customer: customer.id,
  });
});
```

Next, configure `EmbeddedPaymentElement` with the Customer’s ID and the `CustomerSession` client secret.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Powdur")
    .customer(
        PaymentSheet.CustomerConfiguration.createWithCustomerSession(
            id = customerId,
            clientSecret = customerSessionClientSecret,
        )
    )
    .build()

embeddedPaymentElement.configure(
    intentConfiguration = // ... ,
    configuration = configuration,
)
```

## Optional: Allow delayed payment methods [Client-side]

*Delayed payment methods* (A payment method that can't immediately return payment status when a customer attempts a transaction (for example, ACH debits). Businesses commonly hold an order in a pending state until payment is successful with these payment methods) don’t guarantee that you’ll receive funds from your customer at the end of checkout, either because they take time to settle (for example, US Bank Accounts, SEPA Debit, iDEAL, Bancontact, and Sofort) or because they require customer action to complete (for example, OXXO, Konbini, and Boleto).

By default, `EmbeddedPaymentElement` doesn’t display delayed payment methods, even if you accept them. To display the delayed payment methods that you’ve enabled, set `allowsDelayedPaymentMethods` to true in your `EmbeddedPaymentElement.Configuration`.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Powdur")
  .allowsDelayedPaymentMethods(true)
  .build()
```

If the customer successfully uses a delayed payment method in an `EmbeddedPaymentElement`, the payment result returned is `EmbeddedPaymentElement.Result.Completed`.

## Optional: Enable Google Pay

> If your checkout screen has a dedicated **Google Pay** button, follow the [Google Pay guide](https://docs.stripe.com/google-pay.md?platform=android). You can use Embedded Payment Element to handle other payment method types.

### Set up your integration

To use Google Pay, first enable the Google Pay API by adding the following to the `<application>` tag of your **AndroidManifest.xml**:

```xml
<application>
  ...
  <meta-data
    android:name="com.google.android.gms.wallet.api.enabled"
    android:value="true" />
</application>
```

For more details, see Google Pay’s [Set up Google Pay API](https://developers.google.com/pay/api/android/guides/setup) for Android.

### Add Google Pay

To add Google Pay to your integration, pass a [PaymentSheet.GooglePayConfiguration](https://stripe.dev/stripe-android/paymentsheet/com.stripe.android.paymentsheet/-payment-sheet/-google-pay-configuration/index.html) with your Google Pay environment (production or test) and the [country code of your business](https://dashboard.stripe.com/settings/account) when initializing `EmbeddedPaymentElement.Configuration`.

```kotlin
val googlePayConfiguration = PaymentSheet.GooglePayConfiguration(
  environment = PaymentSheet.GooglePayConfiguration.Environment.Test,
  countryCode = "US",
  currencyCode = "USD" // Required for Setup Intents, optional for Payment Intents
)
val configuration = EmbeddedPaymentElement.Configuration.Builder("Merchant, Inc.")
    .googlePay(googlePayConfiguration)
    .build()
```

### Test Google Pay

Google allows you to make test payments through their [Test card suite](https://developers.google.com/pay/api/android/guides/resources/test-card-suite). The test suite supports using Stripe [test cards](https://docs.stripe.com/testing.md).

You must test Google Pay using a physical Android device instead of a simulated device, in a country where Google Pay is supported. Log in to a Google account on your test device with a real card saved to Google Wallet.

## Optional: Enable card scanning

To enable card scanning support, [request production access](https://developers.google.com/pay/api/android/guides/test-and-deploy/request-prod-access) to the Google Pay API from the [Google Pay and Wallet Console](https://pay.google.com/business/console?utm_source=devsite&utm_medium=devsite&utm_campaign=devsite).

- If you’ve enabled Google Pay, the card scanning feature is automatically available in our UI on eligible devices. To learn more about eligible devices, see the [Google Pay API constraints](https://developers.google.com/pay/payment-card-recognition/debit-credit-card-recognition)
- **Important:** The card scanning feature only appears in builds signed with the same signing key registered in the [Google Pay & Wallet Console](https://pay.google.com/business/console). Test or debug builds using different signing keys (for example, builds distributed through Firebase App Tester) won’t show the **Scan card** option. To test card scanning in pre-release builds, you must either:
  - Sign your test builds with your production signing key
  - Add your test signing key fingerprint to the Google Pay and Wallet Console

## Optional: Customize the sheet

All customization is configured through the `EmbeddedPaymentElement.Configuration` object.

### Appearance

Customize colors, fonts, and so on to match the look and feel of your app by using the [appearance API](https://docs.stripe.com/elements/appearance-api/embedded-mobile.md?platform=android).

### Collect customer addresses

Collect shipping and billing addresses from your customers using the [Address Element](https://docs.stripe.com/elements/address-element.md?platform=android).

### Customize the displayed business name

Specify a customer-facing business name by setting `merchantDisplayName`. If you don’t specify a name, the default value is your app’s name.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Merchant, Inc.")
    .build()
```

### Specify default billing details

To set default values for billing details collected in `EmbeddedPaymentElement`, configure the `defaultBillingDetails` property. The `EmbeddedPaymentElement` pre-populates its fields with the values that you provide.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Merchant, Inc.")
    .defaultBillingDetails(
       PaymentSheet.BillingDetails(
         address = PaymentSheet.Address(
           country = "US",
         ),
         email = "foo@bar.com"
      )
    )
    .build()
```

### Configure collection of billing details

Use `BillingDetailsCollectionConfiguration` to specify how you want to collect billing details in the `EmbeddedPaymentElement`.

You can collect your customer’s name, email, phone number, and address.

If you want to attach default billing details to the PaymentMethod object even when those fields aren’t collected in the UI, set `billingDetailsCollectionConfiguration.attachDefaultsToPaymentMethod` to `true`.

```kotlin
import com.stripe.android.paymentsheet.PaymentSheet.BillingDetailsCollectionConfiguration

val billingDetails = PaymentSheet.BillingDetails(
    email = "foo@bar.com"
)
val billingDetailsCollectionConfiguration = BillingDetailsCollectionConfiguration(
    attachDefaultsToPaymentMethod = true,
    name = BillingDetailsCollectionConfiguration.CollectionMode.Always,
    email = BillingDetailsCollectionConfiguration.CollectionMode.Never,
    address = BillingDetailsCollectionConfiguration.AddressCollectionMode.Full,
)
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Merchant, Inc.")
    .defaultBillingDetails(billingDetails)
    .billingDetailsCollectionConfiguration(billingDetailsCollectionConfiguration)
    .build()
```

> Consult with your legal counsel regarding laws that apply to collecting information. Only collect phone numbers if you need them for the transaction.

## Optional: Enable CVC recollection on confirmation

To re-collect the CVC of a saved card during PaymentIntent confirmation, your integration must collect payment details before creating a PaymentIntent.

### Update the intent configuration

`PaymentSheet.IntentConfiguration` accepts an optional parameter that controls when to re-collect CVC for a saved card.

```kotlin
val intentConfig = PaymentSheet.IntentConfiguration(
  mode = PaymentSheet.IntentConfiguration.Mode.Payment(
    amount = 1099,
    currency = "usd",
  ),requireCvcRecollection = true,
)
```

### Update parameters of the intent creation

To re-collect the CVC when confirming payment, include both the `customerId` and `require_cvc_recollection` parameters during the creation of the PaymentIntent.

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    amount: 1099,
    currency: 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: customer.id,
    payment_method_options: {
      card: {require_cvc_recollection: true}
    }
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'amount': 1099,
      'currency': 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },customer=customer['id'],
      payment_method_options={
        'card': {
          'require_cvc_recollection': True
        }
      }
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'amount' => 1099,
    'currency' => 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],'customer' => $customer->id,
    'payment_method_options' => [
      'card' => ['require_cvc_recollection' => true]
    ]
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},customer: customer.id,
      payment_method_options: {
        card: {
          require_cvc_recollection: true,
        },
      },
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setAmount(1099L)
          .setCurrency("usd")
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          ).setCustomer(customer.getId())
          .setPaymentMethodOptions(
            PaymentIntentCreateParams.PaymentMethodOptions.builder()
              .setCard(
                PaymentIntentCreateParams.PaymentMethodOptions.Card.builder()
                  .setRequireCvcRecollection(true)
                  .build()
              )
              .build()
          )
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      PaymentMethodID string `json:"payment_method_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },Customer: stripe.String(customer.ID),
      PaymentMethodOptions: stripe.PaymentIntentPaymentMethodOptionsParams{
        Card: stripe.PaymentIntentPaymentMethodOptionsCardParams{
          RequireCvcRecollection: stripe.Bool(true),
        }
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Amount = 1099,
        Currency = "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },Customer = customer.Id,
        PaymentMethodOptions = new PaymentIntentPaymentMethodOptionsOptions
        {
            Card = new PaymentIntentPaymentMethodOptionsCardOptions
            {
                RequireCvcRecollection = true,
            },
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("payment_method_id")]
      public string PaymentMethodId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```


# Collect and save a payment method

> This is a Collect and save a payment method for when platform is android and type is setup. View the full page at https://docs.stripe.com/payments/mobile/accept-payment-embedded?platform=android&type=setup.

A SetupIntent flow allows you to collect payment method details and save them for future payments without creating a charge. In this integration, you build a custom flow where you render the Payment Element, create the *SetupIntent* (The Setup Intents API lets you build dynamic flows for collecting payment method details for future payments. It tracks the lifecycle of a payment setup flow and can trigger additional authentication steps if required by law or by the payment method), and confirm saving the payment method in your app.

## Set up Stripe [Server-side] [Client-side]

### Server-side 

This integration requires endpoints on your server that talk to the Stripe API. Use the official libraries for access to the Stripe API from your server:

#### Ruby

```bash
# Available as a gem
sudo gem install stripe
```

```ruby
# If you use bundler, you can add this line to your Gemfile
gem 'stripe'
```

#### Python

```bash
# Install through pip
pip3 install --upgrade stripe
```

```bash
# Or find the Stripe package on http://pypi.python.org/pypi/stripe/
```

```python
# Find the version you want to pin:
# https://github.com/stripe/stripe-python/blob/master/CHANGELOG.md
# Specify that version in your requirements.txt file
stripe>=5.0.0
```

#### PHP

```bash
# Install the PHP library with Composer
composer require stripe/stripe-php
```

```bash
# Or download the source directly: https://github.com/stripe/stripe-php/releases
```

#### Java

```java
/*
  For Gradle, add the following dependency to your build.gradle and replace with
  the version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
*/
implementation "com.stripe:stripe-java:31.3.0"
```

```xml
<!--
  For Maven, add the following dependency to your POM and replace with the
  version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
-->
<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>31.3.0</version>
</dependency>
```

```bash
# For other environments, manually install the following JARs:
# - The Stripe JAR from https://github.com/stripe/stripe-java/releases/latest
# - Google Gson from https://github.com/google/gson
```

#### Node.js

```bash
# Install with npm
npm install stripe --save
```

#### Go

```bash
# Make sure your project is using Go Modules
go mod init
# Install stripe-go
go get -u github.com/stripe/stripe-go/v84
```

```go
// Then import the package
import (
  "github.com/stripe/stripe-go/v84"
)
```

#### .NET

```bash
# Install with dotnet
dotnet add package Stripe.net
dotnet restore
```

```bash
# Or install with NuGet
Install-Package Stripe.net
```

### Client-side 

The [Stripe Android SDK](https://github.com/stripe/stripe-android) is open source and [fully documented](https://stripe.dev/stripe-android/).

To install the SDK, add `stripe-android` to the `dependencies` block of your [app/build.gradle](https://developer.android.com/studio/build/dependencies) file:

#### Kotlin

```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    ...
    kotlinOptions {
        jvmTarget = '11'
    }
    buildFeatures {
        compose true
    }
}

dependencies {
  // ...

  // Stripe Android SDK
  implementation("com.stripe:stripe-android:22.6.1")
  // Include the financial connections SDK to support US bank account as a payment method
  implementation("com.stripe:financial-connections:22.6.1")
}
```

#### Groovy

```groovy
apply plugin: 'com.android.application'

android { ... }

dependencies {
  // ...

  // Stripe Android SDK
  implementation 'com.stripe:stripe-android:22.6.1'
  // Include the financial connections SDK to support US bank account as a payment method
  implementation 'com.stripe:financial-connections:22.6.1'
}
```

> For details on the latest SDK release and past versions, see the [Releases](https://github.com/stripe/stripe-android/releases) page on GitHub. To receive notifications when a new release is published, [watch releases for the repository](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/configuring-notifications#configuring-your-watch-settings-for-an-individual-repository).

You also need to set your [publishable key](https://dashboard.stripe.com/apikeys) so that the SDK can make API calls to Stripe. To get started quickly, you can hardcode this on the client while you’re integrating, but fetch the publishable key from your server in production.

```kotlin
// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
PaymentConfiguration.init(context, publishableKey = "<<YOUR_PUBLISHABLE_KEY>>")
```

## Enable payment methods

View your [payment methods settings](https://dashboard.stripe.com/settings/payment_methods) and enable the payment methods you want to support. You need at least one payment method enabled to create a *SetupIntent* (The Setup Intents API lets you build dynamic flows for collecting payment method details for future payments. It tracks the lifecycle of a payment setup flow and can trigger additional authentication steps if required by law or by the payment method).

By default, Stripe enables cards and other prevalent payment methods that can help you reach more customers, but we recommend turning on additional payment methods that are relevant for your business and customers. See [Payment method support](https://docs.stripe.com/payments/payment-methods/payment-method-support.md) for product and payment method support, and our [pricing page](https://stripe.com/pricing/local-payment-methods) for fees.

## Create a Customer [Server-side]

To set up a payment method for future payments, you must attach it to a *Customer* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments). Create a `Customer` object when your customer creates an account with your business. `Customer` objects allow for reusing payment methods and tracking across multiple payments.

> #### Compare Customers v1 and Accounts v2 references
> 
> If your Connect platform uses [customer-configured Accounts](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-configuration-customer), use our [guide](https://docs.stripe.com/connect/use-accounts-as-customers.md) to replace `Customer` and event references in your code with the equivalent Accounts v2 API references.

```curl
curl -X POST https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:"
```

```cli
stripe customers create
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

customer = client.v1.customers.create()
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

# For SDK versions 12.4.0 or lower, remove '.v1' from the following line.
customer = client.v1.customers.create()
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$customer = $stripe->customers->create([]);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

CustomerCreateParams params = CustomerCreateParams.builder().build();

// For SDK versions 29.4.0 or lower, remove '.v1()' from the following line.
Customer customer = client.v1().customers().create(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const customer = await stripe.customers.create();
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.CustomerCreateParams{}
result, err := sc.V1Customers.Create(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new CustomerCreateOptions();
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.Customers;
Customer customer = service.Create(options);
```

## Collect payment details [Client-side]

The Embedded Mobile Payment Element is designed for use on the checkout page of your native mobile app. The element displays a list of payment methods, and you can customize it to match your app’s look and feel.

When the customer taps the **Card** row, a sheet opens where they can enter their payment method details. The button in the sheet says **Continue** by default and dismisses the sheet when tapped, which lets your customer finish the setup in your checkout.
![Embedded Payment Element](https://b.stripecdn.com/docs-statics-srv/assets/android-embedded.1aefe2ca79ed073e350ec629a5af22d5.png)

You can configure the button to immediately complete the setup instead of continuing. To do so, complete [this step](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#embedded-let-customer-pay-immediately) after following the guide.

### Initialize the Embedded Payment Element

#### Jetpack Compose

Initialize an instance of `EmbeddedPaymentElement` using the `rememberEmbeddedPaymentElement` function with an `EmbeddedPaymentElement.Builder`.

Pass in a `CreateIntentWithConfirmationTokenCallback`. For now, leave the implementation empty.

```kotlin
import com.stripe.android.paymentelement.EmbeddedPaymentElement
import com.stripe.android.paymentelement.rememberEmbeddedPaymentElement

@Composable
fun CheckoutScreen() {
    val embeddedBuilder = remember {
        EmbeddedPaymentElement.Builder(
            createIntentCallback = { confirmationToken, ->
                TODO("You'll implement this in the "Confirm the payment" step")
            },
            resultCallback = { result ->
                TODO("You'll implement this in the "Confirm the payment" step")
            },
        )
    }

    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)
}
```

#### Views (Classic)

Initialize an instance of `EmbeddedPaymentElement` using the `rememberEmbeddedPaymentElement` function with an `EmbeddedPaymentElement.Builder`.

```kotlin
import com.stripe.android.paymentelement.EmbeddedPaymentElement
import com.stripe.android.paymentelement.rememberEmbeddedPaymentElement

@Composable
fun CheckoutScreen() {
    val embeddedBuilder = remember {
        EmbeddedPaymentElement.Builder(
            createIntentCallback = { confirmationToken ->
                TODO("Completed in a later step.")
            },
            resultCallback = { result ->
                TODO("Completed in a later step.")
            },
        )
    }

    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)
}
```

The Embedded Mobile Payment Element is built for the Jetpack Compose UI and exposes a `@Composable Content` method. When using classic views, you must wrap the Embedded Payment Element with a `ComposeView`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Replace the content with your actual layout -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.compose.ui.platform.ComposeView
        android:id="@+id/compose_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.checkout_screen_layout)
        val composeView = findViewById<ComposeView>(R.id.compose_view)
        composeView.setContent {
            CheckoutScreen()
        }
    }
}
```

### Configure the Embedded Payment Element

The `Builder` object contains callbacks necessary for instantiating `EmbeddedPaymentElement`, including the `CreateIntentCallback`. For now, leave its implementation empty.

After instantiating, call `configure` with an `EmbeddedPaymentElement.Configuration` and `PaymentSheet.IntentConfiguration`. The `Configuration` object contains general configuration options for `EmbeddedPaymentElement` that don’t change between payments. The `IntentConfiguration` object contains details about the specific payment, such as the amount and currency.

```kotlin
import com.stripe.android.paymentsheet.PaymentSheet

@Composable
fun CheckoutScreen() {
    val embeddedBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)
LaunchedEffect(embeddedPaymentElement) {
        embeddedPaymentElement.configure(
            intentConfiguration = PaymentSheet.IntentConfiguration(mode = PaymentSheet.IntentConfiguration.Mode.Setup(
                    currency = "USD",
                ),// Optional intent configuration options...
            ),
            configuration = EmbeddedPaymentElement.Configuration.Builder("Powdur").build()
        )
    }
}
```

### Add the Embedded Payment Element view

After the `EmbeddedPaymentElement` has successfully initialized, put its `@Composable Content` in your checkout UI.

> The content must be in a scrollable container, because its height can change after it’s initially rendered.

```kotlin
@Composable
fun CheckoutScreen() {
    val embeddedBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)

    .....
val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        embeddedPaymentElement.Content()
    }
}
```

At this point, you can run your app and see the Embedded Mobile Payment Element.

### (Optional) Update payment details

If a customer changes the payment details (for example, by applying a discount code), update the `EmbeddedPaymentElement` instance. When you call the `configure` method again, the new values synchronize and display in the UI.

> Some payment methods, like Google Pay, show the amount in the UI. If a customer changes the payment and you don’t update the `EmbeddedPaymentElement`, the UI displays incorrect values.

When the `configure` call completes, the `@Composable Content` and the `paymentOption` automatically update with the new values provided to the `configure` call.

```kotlin
val intentConfiguration = PaymentSheet.IntentConfiguration(
    // Change paymentMethodTypes to customize the payment methods you want to accept
    mode = PaymentSheet.IntentConfiguration.Mode.Setup(
        currency = "USD",
    ),
    paymentMethodTypes = listOf("card")
)

val configuration = EmbeddedPaymentElement.Configuration.Builder("Powdur")
    .build()

LaunchedEffect(embeddedPaymentElement) {
    embeddedPaymentElement.configure(
        intentConfiguration = intentConfiguration,
        configuration = configuration,
    )
}
```

### (Optional) Display the selected payment option

You can display payment option details (such as the last 4 digits, a card logo, or billing information) by accessing the observable `Flow` property in the Embedded Payment Element’s `paymentOption`. When a customer selects a payment method that opens a form sheet, the payment option updates after they tap **Continue** in the sheet.

```kotlin
val selectedPaymentOption by embeddedPaymentElement.paymentOption.collectAsState()

selectedPaymentOption?.let { paymentOption ->
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .clickable(
                onClick = {  },
            )
            .semantics {
                text = AnnotatedString(paymentOption.label)
            },
    ) {
        Icon(
            painter = paymentOption.iconPainter,
            contentDescription = null, // decorative element
            modifier = Modifier.padding(horizontal = 4.dp),
            tint = Color.Unspecified,
        )

        Text(text = paymentOption.label)
    }
}
```

### Confirm the setup

When the customer taps the checkout button, confirm the SetupIntent by calling `embeddedPaymentElement.confirm()`. Be sure to disable user interaction during confirmation.

When a form is presented, the `EmbeddedPaymentElement` calls `confirm` when the user clicks **Call to action**. If the selected payment method doesn’t have any form fields, call `confirm` when the user clicks **Call to action** below the `@Composable Content`.

```kotlin
Button(
    onClick = {
        embeddedPaymentElement.confirm()
    }
) {
    Text("Confirm payment")
}
```

Next, implement the `createIntentCallback` callback you passed to `EmbeddedPaymentElement.Builder` earlier to send a request to your server. Your server creates a SetupIntent and returns its client secret, which is explained in the [create a SetupIntent](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#submit-setup) step.

When you receive the request, return the result of the Intent creation using `CreateIntentResult` with your server response’s client secret or an error. The `EmbeddedPaymentElement` confirms the SetupIntent using the client secret or displays the localized error message in its UI.

```kotlin
import com.stripe.android.paymentsheet.CreateIntentResult

val embeddedBuilder = remember {
    val embeddedBuilder = EmbeddedPaymentElement.Builder(
        createIntentCallback = { confirmationToken ->// Make a request to your own server and receive a client secret or an error.
            val networkResult = ...
            if (networkResult.isSuccess) {
                CreateIntentResult.Success(networkResult.clientSecret)
            } else {
                CreateIntentResult.Failure(networkResult.exception)
            }
        },
        resultCallback = { result ->when (result) {
                is EmbeddedPaymentElement.Result.Completed -> {
                    // Payment completed - show a confirmation screen.
                }
                is EmbeddedPaymentElement.Result.Failed -> {
                    // Encountered an unrecoverable error. You can display the error to the user, log it, and so on
                }
                is EmbeddedPaymentElement.Result.Canceled -> {
                    // Customer canceled - you should probably do nothing.
                }
            }
        },
    )
}
```

## Optional: Clear the selected payment option

If you have payment options external to `EmbeddedPaymentElement`, you might need to clear the selected payment option. To do so, use the `clearPaymentOption` API to deselect the selected payment option.

```kotlin
@Composable
fun CheckoutScreen() {
    val embeddedPaymentElementBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedPaymentElementBuilder)

    ....

    Button(
        onClick = embeddedPaymentElement::clearPaymentOption
    ) {
        Text("Select external payment option")
    }
}
```

## Optional: Display the mandate yourself

To ensure regulatory compliance, the Embedded Mobile Payment Element displays mandates and legal disclaimers by default. This text must be located close to your **Buy** button. If you disable the default display of this text in the view, you must display it yourself.

> To be compliant, your integration must display the mandate text accurately. If you display it yourself, make sure that any URLs are rendered correctly by including the text in a `Text` composable.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder("Merchant, Inc")
    .embeddedViewDisplaysMandateText(false)
    .build()

....

val selectedPaymentOption by embeddedPaymentElement.paymentOption.collectAsState()
selectedPaymentOption?.mandateText?.let { mandateText ->
    Text(mandateText)
}
```

## Optional: Let the customer confirm setup immediately in the sheet

To configure the button in the form sheet to immediately confirm setup, set `formSheetAction` on your `EmbeddedPaymentElement.Configuration` object.

The completion block executes with the result of the setup after the sheet dismisses. The embedded UI isn’t usable after setup completes, so we recommend that your implementation directs the user to a different screen, such as a receipt screen.

```kotlin
@Composable
fun CheckoutScreen() {
    val embeddedBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)

    LaunchedEffect(embeddedPaymentElement) {
        embeddedPaymentElement.configure(
            intentConfiguration = ....,
            configuration = EmbeddedPaymentElement.Configuration.Builder("Powdur")
                .formSheetAction(EmbeddedPaymentElement.FormSheetAction.Confirm)
                .build()
        )
    }
}
```

## Create a SetupIntent [Server-side]

On your server, create a *SetupIntent* (The Setup Intents API lets you build dynamic flows for collecting payment method details for future payments. It tracks the lifecycle of a payment setup flow and can trigger additional authentication steps if required by law or by the payment method). You can manage payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods). Stripe evaluates payment method restrictions and other parameters to determine the list of supported payment methods.

If the call succeeds, return the SetupIntent *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)). If the call fails, [handle the error](https://docs.stripe.com/error-handling.md) and return an error message with a brief explanation for your customer.

> Verify that all IntentConfiguration properties match your SetupIntent (for example, [usage](https://docs.stripe.com/api/setup_intents/object.md#setup_intent_object-usage)).

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    customer: ..., # The Customer ID you previously created
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::SetupIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'customer': customer['id'],
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.SetupIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'customer' => $customer->id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->setupIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      customer: ... // The Customer ID you previously created
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.setupIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.SetupIntent;
import com.stripe.param.SetupIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      SetupIntentCreateParams.Builder paramsBuilder =
        SetupIntentCreateParams
          .builder()
          .setCustomer(customer.getId()) // The Customer ID you previously created
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            SetupIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          )
      SetupIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        SetupIntent setupIntent = SetupIntent.create(params);
        map.put("client_secret", setupIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/setupintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationTokenID string `json:"confirmation_token_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.SetupIntentParams{
      Customer: stripe.String(c.ID), // The Customer ID you previously created
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.SetupIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := setupintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new SetupIntentCreateOptions()
      {
        Customer = customer.Id, // The Customer ID you previously created
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new SetupIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new SetupIntentService();
      try
      {
        SetupIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token_id")]
      public string ConfirmationTokenId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```

## Charge the saved payment method later [Server-side]

> `bancontact` and `ideal` are one-time payment methods by default. When set up for future usage, they generate a `sepa_debit` reusable payment method type so you need to use `sepa_debit` to query for saved payment methods.

> #### Compliance
> 
> You’re responsible for your compliance with all applicable laws, regulations, and network rules when saving a customer’s payment details. When rendering past payment methods to your end customer for future purchases, make sure you’re listing payment methods where you’ve collected consent from the customer to save the payment method details for this specific future use. To differentiate between payment methods attached to customers that can and can’t be presented to your end customer as a saved payment method for future purchases, use the [allow_redisplay](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-allow_redisplay) parameter.

When you’re ready to charge your customer *off-session* (A payment is described as off-session if it occurs without the direct involvement of the customer, using previously-collected payment information), use the Customer and PaymentMethod IDs to create a PaymentIntent. To find a payment method to charge, list the payment methods associated with your customer. This example lists cards but you can list any supported [type](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-type).

```curl
curl -G https://api.stripe.com/v1/payment_methods \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer="{{CUSTOMER_ID}}" \
  -d type=card
```

```cli
stripe payment_methods list  \
  --customer="{{CUSTOMER_ID}}" \
  --type=card
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

payment_methods = client.v1.payment_methods.list({
  customer: '{{CUSTOMER_ID}}',
  type: 'card',
})
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

# For SDK versions 12.4.0 or lower, remove '.v1' from the following line.
payment_methods = client.v1.payment_methods.list({
  "customer": "{{CUSTOMER_ID}}",
  "type": "card",
})
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$paymentMethods = $stripe->paymentMethods->all([
  'customer' => '{{CUSTOMER_ID}}',
  'type' => 'card',
]);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

PaymentMethodListParams params =
  PaymentMethodListParams.builder()
    .setCustomer("{{CUSTOMER_ID}}")
    .setType(PaymentMethodListParams.Type.CARD)
    .build();

// For SDK versions 29.4.0 or lower, remove '.v1()' from the following line.
StripeCollection<PaymentMethod> stripeCollection =
  client.v1().paymentMethods().list(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const paymentMethods = await stripe.paymentMethods.list({
  customer: '{{CUSTOMER_ID}}',
  type: 'card',
});
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.PaymentMethodListParams{
  Customer: stripe.String("{{CUSTOMER_ID}}"),
  Type: stripe.String(stripe.PaymentMethodTypeCard),
}
result := sc.V1PaymentMethods.List(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new PaymentMethodListOptions
{
    Customer = "{{CUSTOMER_ID}}",
    Type = "card",
};
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.PaymentMethods;
StripeList<PaymentMethod> paymentMethods = service.List(options);
```

When you have the Customer and PaymentMethod IDs, create a PaymentIntent with the amount and currency of the payment. Set a few other parameters to make the off-session payment:

- Set [off_session](https://docs.stripe.com/api/payment_intents/confirm.md#confirm_payment_intent-off_session) to `true` to indicate that the customer isn’t in your checkout flow during a payment attempt and can’t fulfill an authentication request made by a partner, such as a card issuer, bank, or other payment institution. If, during your checkout flow, a partner requests authentication, Stripe requests exemptions using customer information from a previous *on-session* (A payment is described as on-session if it occurs while the customer is actively in your checkout flow and able to authenticate the payment method) transaction. If the conditions for exemption aren’t met, the PaymentIntent might throw an error.
- Set the value of the PaymentIntent’s [confirm](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-confirm) property to `true`, which causes confirmation to occur immediately when the PaymentIntent is created.
- Set [payment_method](https://docs.stripe.com/api.md#create_payment_intent-payment_method) to the ID of the PaymentMethod and [customer](https://docs.stripe.com/api.md#create_payment_intent-customer) to the ID of the Customer.

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

#### Stripe CLI

```bash
stripe payment_intents create \
  --amount=1099 \
  --currency=gbp \
  -d "automatic_payment_methods[enabled]"=true \
 # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.--customer={{CUSTOMER_ID}} \
  --payment-method={{PAYMENT_METHOD_ID}} \
  --return-url="https://example.com/order/123/complete" \
  --off-session=true \
  --confirm=true
```

#### Ruby

```ruby

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

begin
  intent = Stripe::PaymentIntent.create({
    amount: 1099,
    currency: 'gbp',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: '{{CUSTOMER_ID}}',
    payment_method: '{{PAYMENT_METHOD_ID}}',
    return_url: 'https://example.com/order/123/complete',
    off_session: true,
    confirm: true,
  })
rescue Stripe::CardError => e
  # Error code will be authentication_required if authentication is needed
  puts "Error is: \#{e.error.code}"
  payment_intent_id = e.error.payment_intent.id
  payment_intent = Stripe::PaymentIntent.retrieve(payment_intent_id)
  puts payment_intent.id
end
```

#### Python

```python

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
stripe.api_key = '<<YOUR_SECRET_KEY>>'

try:
  stripe.PaymentIntent.create(
    amount=1099,
    currency='gbp',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods={"enabled": True},customer='{{CUSTOMER_ID}}',
    payment_method='{{PAYMENT_METHOD_ID}}',
    return_url='https://example.com/order/123/complete',
    off_session=True,
    confirm=True,
  )
except stripe.error.CardError as e:
  err = e.error
  # Error code will be authentication_required if authentication is needed
  print("Code is: %s" % err.code)
  payment_intent_id = err.payment_intent['id']
  payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
```

#### PHP

```php

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
\Stripe\Stripe::setApiKey('<<YOUR_SECRET_KEY>>');

try {
  \Stripe\PaymentIntent::create([
    'amount' => 1099,
    'currency' => 'gbp',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],'customer' => '{{CUSTOMER_ID}}',
    'payment_method' => '{{PAYMENT_METHOD_ID}}',
    'return_url' => 'https://example.com/order/123/complete',
    'off_session' => true,
    'confirm' => true,
  ]);
} catch (\Stripe\Exception\CardException $e) {
  // Error code will be authentication_required if authentication is needed
  echo 'Error code is:' . $e->getError()->code;
  $payment_intent_id = $e->getError()->payment_intent->id;
  $payment_intent = \Stripe\PaymentIntent::retrieve($payment_intent_id);
}
```

#### Java

```java

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

PaymentIntentCreateParams params =
  PaymentIntentCreateParams.builder()
    .setCurrency("gbp")
    .setAmount(1099)
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    .setAutomaticPaymentMethods(
      PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
    ).setCustomer("{{CUSTOMER_ID}}")
    .setPaymentMethod("{{PAYMENT_METHOD_ID}}")
    .setReturnUrl("https://example.com/order/123/complete")
    .setConfirm(true)
    .setOffSession(true)
    .build();
try {
  PaymentIntent.create(params);
} catch (CardException e) {
  // Error code will be authentication_required if authentication is needed
  System.out.println("Error code is : " + e.getCode());
  String paymentIntentId = e.getStripeError().getPaymentIntent().getId();
  PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
  System.out.println(paymentIntent.getId());
}
```

#### Node.js

```javascript

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'gbp',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: '{{CUSTOMER_ID}}',
    payment_method: '{{PAYMENT_METHOD_ID}}',
    return_url: 'https://example.com/order/123/complete',
    off_session: true,
    confirm: true,
  });
} catch (err) {
  // Error code will be authentication_required if authentication is needed
  console.log('Error code is: ', err.code);
  const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
  console.log('PI retrieved: ', paymentIntentRetrieved.id);
}
```

#### Go

```go

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
stripe.Key = "<<YOUR_SECRET_KEY>>"

params := &stripe.PaymentIntentParams{
  Amount: stripe.Int64(1099),
  Currency: stripe.String(string(stripe.CurrencyGBP)),
  // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
  AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
    Enabled: stripe.Bool(true),
  },Customer: stripe.String("{{CUSTOMER_ID}}"),
  PaymentMethod: stripe.String("{{PAYMENT_METHOD_ID}}"),
  ReturnUrl: stripe.String("https://example.com/order/123/complete"),
  Confirm: stripe.Bool(true),
  OffSession: stripe.Bool(true),
}

_, err := paymentintent.New(params)

if err != nil {
  if stripeErr, ok := err.(*stripe.Error); ok {
    // Error code will be authentication_required if authentication is needed
    fmt.Printf("Error code: %v", stripeErr.Code)

    paymentIntentID := stripeErr.PaymentIntent.ID
    paymentIntent, _ := paymentintent.Get(paymentIntentID, nil)

    fmt.Printf("PI: %v", paymentIntent.ID)
  }
}
```

#### .NET

```dotnet

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>";

try
{
  var service = new PaymentIntentService();
  var options = new PaymentIntentCreateOptions
  {
    Amount = 1099,
    Currency = "gbp",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
    {
        Enabled = true,
    },Customer = "{{CUSTOMER_ID}}",
    PaymentMethod = "{{PAYMENT_METHOD_ID}}",
    ReturnUrl = "https://example.com/order/123/complete",
    Confirm = true,
    OffSession = true,
  };
  service.Create(options);
}
catch (StripeException e)
{
  switch (e.StripeError.Type)
  {
    case "card_error":
      // Error code will be authentication_required if authentication is needed
      Console.WriteLine("Error code: " + e.StripeError.Code);
      var paymentIntentId = e.StripeError.PaymentIntent.Id;
      var service = new PaymentIntentService();
      var paymentIntent = service.Get(paymentIntentId);

      Console.WriteLine(paymentIntent.Id);
      break;
    default:
      break;
  }
}
```

## Test the integration

#### Cards

| Card number         | Scenario                                                                                                                                                                                                                                                                                      | How to test                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 4242424242424242    | The card payment succeeds and doesn’t require authentication.                                                                                                                                                                                                                                 | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000002500003155    | The card payment requires *authentication* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase). | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000000000009995    | The card is declined with a decline code like `insufficient_funds`.                                                                                                                                                                                                                           | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 6205500000000000004 | The UnionPay card has a variable length of 13-19 digits.                                                                                                                                                                                                                                      | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |

#### Bank redirects

| Payment method    | Scenario                                                                                                                                                                                        | How to test                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bancontact, iDEAL | Your customer fails to authenticate on the redirect page for a redirect-based and immediate notification payment method.                                                                        | Choose any redirect-based payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page. |
| Pay by Bank       | Your customer successfully pays with a redirect-based and [delayed notification](https://docs.stripe.com/payments/payment-methods.md#payment-notification) payment method.                      | Choose the payment method, fill out the required details, and confirm the payment. Then click **Complete test payment** on the redirect page.            |
| Pay by Bank       | Your customer fails to authenticate on the redirect page for a redirect-based and delayed notification payment method.                                                                          | Choose the payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page.                |
| BLIK              | BLIK payments fail in a variety of ways—immediate failures (for example, the code is expired or invalid), delayed errors (the bank declines) or timeouts (the customer didn’t respond in time). | Use email patterns to [simulate the different failures.](https://docs.stripe.com/payments/blik/accept-a-payment.md#simulate-failures)                    |

#### Bank debits

| Payment method    | Scenario                                                                                          | How to test                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEPA Direct Debit | Your customer successfully pays with SEPA Direct Debit.                                           | Fill out the form using the account number `AT321904300235473204`. The confirmed PaymentIntent initially transitions to processing, then transitions to the succeeded status three minutes later. |
| SEPA Direct Debit | Your customer’s payment intent status transitions from `processing` to `requires_payment_method`. | Fill out the form using the account number `AT861904300235473202`.                                                                                                                                |

See [Testing](https://docs.stripe.com/testing.md) for additional information to test your integration.

## Optional: Enable saved cards [Server-side] [Client-side]

`EmbeddedPaymentElement` can allow the customer to save their card and can include the customer’s saved cards in available payment methods. The customer must have an associated [Customer](https://docs.stripe.com/api/customers.md) object on your server. To enable a checkbox that allows the customer to save their card, create a [CustomerSession](https://docs.stripe.com/api/customer_sessions.md), with `payment_method_save` set to `enabled`.

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const customerSession = await stripe.customerSessions.create({
    customer: customer.id,
    components: {
      mobile_payment_element: {
        enabled: true,
        features: {
          payment_method_save: 'enabled',
          payment_method_redisplay: 'enabled',
          payment_method_remove: 'enabled'
        }
      },
    },
  });

  res.json({
    customerSessionClientSecret: customerSession.client_secret,
    customer: customer.id,
  });
});
```

Next, configure `EmbeddedPaymentElement` with the Customer’s ID and the `CustomerSession` client secret.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Powdur")
    .customer(
        PaymentSheet.CustomerConfiguration.createWithCustomerSession(
            id = customerId,
            clientSecret = customerSessionClientSecret,
        )
    )
    .build()

embeddedPaymentElement.configure(
    intentConfiguration = // ... ,
    configuration = configuration,
)
```

## Optional: Allow delayed payment methods [Client-side]

*Delayed payment methods* (A payment method that can't immediately return payment status when a customer attempts a transaction (for example, ACH debits). Businesses commonly hold an order in a pending state until payment is successful with these payment methods) don’t guarantee that you’ll receive funds from your customer at the end of checkout, either because they take time to settle (for example, US Bank Accounts, SEPA Debit, iDEAL, Bancontact, and Sofort) or because they require customer action to complete (for example, OXXO, Konbini, and Boleto).

By default, `EmbeddedPaymentElement` doesn’t display delayed payment methods, even if you accept them. To display the delayed payment methods that you’ve enabled, set `allowsDelayedPaymentMethods` to true in your `EmbeddedPaymentElement.Configuration`.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Powdur")
  .allowsDelayedPaymentMethods(true)
  .build()
```

If the customer successfully uses a delayed payment method in an `EmbeddedPaymentElement`, the payment result returned is `EmbeddedPaymentElement.Result.Completed`.

## Optional: Enable Google Pay

> If your checkout screen has a dedicated **Google Pay** button, follow the [Google Pay guide](https://docs.stripe.com/google-pay.md?platform=android). You can use Embedded Payment Element to handle other payment method types.

### Set up your integration

To use Google Pay, first enable the Google Pay API by adding the following to the `<application>` tag of your **AndroidManifest.xml**:

```xml
<application>
  ...
  <meta-data
    android:name="com.google.android.gms.wallet.api.enabled"
    android:value="true" />
</application>
```

For more details, see Google Pay’s [Set up Google Pay API](https://developers.google.com/pay/api/android/guides/setup) for Android.

### Add Google Pay

To add Google Pay to your integration, pass a [PaymentSheet.GooglePayConfiguration](https://stripe.dev/stripe-android/paymentsheet/com.stripe.android.paymentsheet/-payment-sheet/-google-pay-configuration/index.html) with your Google Pay environment (production or test) and the [country code of your business](https://dashboard.stripe.com/settings/account) when initializing `EmbeddedPaymentElement.Configuration`.

```kotlin
val googlePayConfiguration = PaymentSheet.GooglePayConfiguration(
  environment = PaymentSheet.GooglePayConfiguration.Environment.Test,
  countryCode = "US",
  currencyCode = "USD" // Required for Setup Intents, optional for Payment Intents
)
val configuration = EmbeddedPaymentElement.Configuration.Builder("Merchant, Inc.")
    .googlePay(googlePayConfiguration)
    .build()
```

### Test Google Pay

Google allows you to make test payments through their [Test card suite](https://developers.google.com/pay/api/android/guides/resources/test-card-suite). The test suite supports using Stripe [test cards](https://docs.stripe.com/testing.md).

You must test Google Pay using a physical Android device instead of a simulated device, in a country where Google Pay is supported. Log in to a Google account on your test device with a real card saved to Google Wallet.

## Optional: Enable card scanning

To enable card scanning support, [request production access](https://developers.google.com/pay/api/android/guides/test-and-deploy/request-prod-access) to the Google Pay API from the [Google Pay and Wallet Console](https://pay.google.com/business/console?utm_source=devsite&utm_medium=devsite&utm_campaign=devsite).

- If you’ve enabled Google Pay, the card scanning feature is automatically available in our UI on eligible devices. To learn more about eligible devices, see the [Google Pay API constraints](https://developers.google.com/pay/payment-card-recognition/debit-credit-card-recognition)
- **Important:** The card scanning feature only appears in builds signed with the same signing key registered in the [Google Pay & Wallet Console](https://pay.google.com/business/console). Test or debug builds using different signing keys (for example, builds distributed through Firebase App Tester) won’t show the **Scan card** option. To test card scanning in pre-release builds, you must either:
  - Sign your test builds with your production signing key
  - Add your test signing key fingerprint to the Google Pay and Wallet Console

## Optional: Customize the sheet

All customization is configured through the `EmbeddedPaymentElement.Configuration` object.

### Appearance

Customize colors, fonts, and so on to match the look and feel of your app by using the [appearance API](https://docs.stripe.com/elements/appearance-api/embedded-mobile.md?platform=android).

### Collect customer addresses

Collect shipping and billing addresses from your customers using the [Address Element](https://docs.stripe.com/elements/address-element.md?platform=android).

### Customize the displayed business name

Specify a customer-facing business name by setting `merchantDisplayName`. If you don’t specify a name, the default value is your app’s name.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Merchant, Inc.")
    .build()
```

### Specify default billing details

To set default values for billing details collected in `EmbeddedPaymentElement`, configure the `defaultBillingDetails` property. The `EmbeddedPaymentElement` pre-populates its fields with the values that you provide.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Merchant, Inc.")
    .defaultBillingDetails(
       PaymentSheet.BillingDetails(
         address = PaymentSheet.Address(
           country = "US",
         ),
         email = "foo@bar.com"
      )
    )
    .build()
```

### Configure collection of billing details

Use `BillingDetailsCollectionConfiguration` to specify how you want to collect billing details in the `EmbeddedPaymentElement`.

You can collect your customer’s name, email, phone number, and address.

If you want to attach default billing details to the PaymentMethod object even when those fields aren’t collected in the UI, set `billingDetailsCollectionConfiguration.attachDefaultsToPaymentMethod` to `true`.

```kotlin
import com.stripe.android.paymentsheet.PaymentSheet.BillingDetailsCollectionConfiguration

val billingDetails = PaymentSheet.BillingDetails(
    email = "foo@bar.com"
)
val billingDetailsCollectionConfiguration = BillingDetailsCollectionConfiguration(
    attachDefaultsToPaymentMethod = true,
    name = BillingDetailsCollectionConfiguration.CollectionMode.Always,
    email = BillingDetailsCollectionConfiguration.CollectionMode.Never,
    address = BillingDetailsCollectionConfiguration.AddressCollectionMode.Full,
)
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Merchant, Inc.")
    .defaultBillingDetails(billingDetails)
    .billingDetailsCollectionConfiguration(billingDetailsCollectionConfiguration)
    .build()
```

> Consult with your legal counsel regarding laws that apply to collecting information. Only collect phone numbers if you need them for the transaction.


# Accept a payment and save the payment method

> This is a Accept a payment and save the payment method for when platform is android and type is paymentsfu. View the full page at https://docs.stripe.com/payments/mobile/accept-payment-embedded?platform=android&type=paymentsfu.

Use the [Payment Intents API](https://docs.stripe.com/api/payment_intents.md) to save payment details from a purchase. There are several use cases:

- Charge a customer for an e-commerce order and store the details for future purchases.
- Initiate the first payment of a series of recurring payments.
- Charge a deposit and store the details to charge the full amount later.

> #### Card-present transactions
> 
> Card-present transactions, such as payments through Stripe Terminal, use a different process for saving the payment method. For details, see [the Terminal documentation](https://docs.stripe.com/terminal/features/saving-payment-details/save-after-payment.md).

## Compliance

You’re responsible for your compliance with all applicable laws, regulations, and network rules when saving a customer’s payment details. These requirements generally apply if you want to save your customer’s payment method for future use, such as displaying a customer’s payment method to them in the checkout flow for a future purchase or charging them when they’re not actively using your website or app. Add terms to your website or app that state how you plan to save payment method details and allow customers to opt in.

When you save a payment method, you can only use it for the specific usage you have included in your terms. To charge a payment method when a customer is offline and save it as an option for future purchases, make sure that you explicitly collect consent from the customer for this specific use. For example, include a “Save my payment method for future use” checkbox to collect consent.

To charge them when they’re offline, make sure your terms include the following:

- The customer’s agreement to your initiating a payment or a series of payments on their behalf for specified transactions.
- The anticipated timing and frequency of payments (for example, if the charges are for scheduled installments, subscription payments, or unscheduled top-ups).
- How you determine the payment amount.
- Your cancellation policy, if the payment method is for a subscription service.

Make sure you keep a record of your customer’s written agreement to these terms.

> [SCA regulation](https://docs.stripe.com/strong-customer-authentication.md) requires that you authenticate your customer up front if you intend to collect payments from them again in the future. The cardholder’s bank may decline future payments and ask for additional authentication if the customer never authenticated initially.

## Set up Stripe [Server-side] [Client-side]

### Server-side 

This integration requires endpoints on your server that talk to the Stripe API. Use the official libraries for access to the Stripe API from your server:

#### Ruby

```bash
# Available as a gem
sudo gem install stripe
```

```ruby
# If you use bundler, you can add this line to your Gemfile
gem 'stripe'
```

#### Python

```bash
# Install through pip
pip3 install --upgrade stripe
```

```bash
# Or find the Stripe package on http://pypi.python.org/pypi/stripe/
```

```python
# Find the version you want to pin:
# https://github.com/stripe/stripe-python/blob/master/CHANGELOG.md
# Specify that version in your requirements.txt file
stripe>=5.0.0
```

#### PHP

```bash
# Install the PHP library with Composer
composer require stripe/stripe-php
```

```bash
# Or download the source directly: https://github.com/stripe/stripe-php/releases
```

#### Java

```java
/*
  For Gradle, add the following dependency to your build.gradle and replace with
  the version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
*/
implementation "com.stripe:stripe-java:31.3.0"
```

```xml
<!--
  For Maven, add the following dependency to your POM and replace with the
  version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
-->
<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>31.3.0</version>
</dependency>
```

```bash
# For other environments, manually install the following JARs:
# - The Stripe JAR from https://github.com/stripe/stripe-java/releases/latest
# - Google Gson from https://github.com/google/gson
```

#### Node.js

```bash
# Install with npm
npm install stripe --save
```

#### Go

```bash
# Make sure your project is using Go Modules
go mod init
# Install stripe-go
go get -u github.com/stripe/stripe-go/v84
```

```go
// Then import the package
import (
  "github.com/stripe/stripe-go/v84"
)
```

#### .NET

```bash
# Install with dotnet
dotnet add package Stripe.net
dotnet restore
```

```bash
# Or install with NuGet
Install-Package Stripe.net
```

### Client-side 

The [Stripe Android SDK](https://github.com/stripe/stripe-android) is open source and [fully documented](https://stripe.dev/stripe-android/).

To install the SDK, add `stripe-android` to the `dependencies` block of your [app/build.gradle](https://developer.android.com/studio/build/dependencies) file:

#### Kotlin

```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    ...
    kotlinOptions {
        jvmTarget = '11'
    }
    buildFeatures {
        compose true
    }
}

dependencies {
  // ...

  // Stripe Android SDK
  implementation("com.stripe:stripe-android:22.6.1")
  // Include the financial connections SDK to support US bank account as a payment method
  implementation("com.stripe:financial-connections:22.6.1")
}
```

#### Groovy

```groovy
apply plugin: 'com.android.application'

android { ... }

dependencies {
  // ...

  // Stripe Android SDK
  implementation 'com.stripe:stripe-android:22.6.1'
  // Include the financial connections SDK to support US bank account as a payment method
  implementation 'com.stripe:financial-connections:22.6.1'
}
```

> For details on the latest SDK release and past versions, see the [Releases](https://github.com/stripe/stripe-android/releases) page on GitHub. To receive notifications when a new release is published, [watch releases for the repository](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/configuring-notifications#configuring-your-watch-settings-for-an-individual-repository).

You also need to set your [publishable key](https://dashboard.stripe.com/apikeys) so that the SDK can make API calls to Stripe. To get started quickly, you can hardcode this on the client while you’re integrating, but fetch the publishable key from your server in production.

```kotlin
// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
PaymentConfiguration.init(context, publishableKey = "<<YOUR_PUBLISHABLE_KEY>>")
```

## Enable payment methods

View your [payment methods settings](https://dashboard.stripe.com/settings/payment_methods) and enable the payment methods you want to support. You need at least one payment method enabled to create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods).

By default, Stripe enables cards and other prevalent payment methods that can help you reach more customers, but we recommend turning on additional payment methods that are relevant for your business and customers. See [Payment method support](https://docs.stripe.com/payments/payment-methods/payment-method-support.md) for product and payment method support, and our [pricing page](https://stripe.com/pricing/local-payment-methods) for fees.

## Create a Customer [Server-side]

To set up a payment method for future payments, you must attach it to a *Customer* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments). Create a `Customer` object when your customer creates an account with your business. `Customer` objects allow for reusing payment methods and tracking across multiple payments.

> #### Compare Customers v1 and Accounts v2 references
> 
> If your Connect platform uses [customer-configured Accounts](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-configuration-customer), use our [guide](https://docs.stripe.com/connect/use-accounts-as-customers.md) to replace `Customer` and event references in your code with the equivalent Accounts v2 API references.

```curl
curl -X POST https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:"
```

```cli
stripe customers create
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

customer = client.v1.customers.create()
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

# For SDK versions 12.4.0 or lower, remove '.v1' from the following line.
customer = client.v1.customers.create()
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$customer = $stripe->customers->create([]);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

CustomerCreateParams params = CustomerCreateParams.builder().build();

// For SDK versions 29.4.0 or lower, remove '.v1()' from the following line.
Customer customer = client.v1().customers().create(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const customer = await stripe.customers.create();
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.CustomerCreateParams{}
result, err := sc.V1Customers.Create(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new CustomerCreateOptions();
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.Customers;
Customer customer = service.Create(options);
```

## Collect payment details [Client-side]

The Embedded Mobile Payment Element is designed for use on the checkout page of your native mobile app. The element displays a list of payment methods, and you can customize it to match your app’s look and feel.

When the customer taps the **Card** row, a sheet opens where they can enter their payment method details. The button in the sheet says **Continue** by default and dismisses the sheet when tapped, which lets your customer finish payment in your checkout.
![Embedded Payment Element](https://b.stripecdn.com/docs-statics-srv/assets/android-embedded.1aefe2ca79ed073e350ec629a5af22d5.png)

Alternatively, you can configure the button to immediately complete payment instead of continuing. To do so, complete [this step](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#embedded-let-customer-pay-immediately) after following the guide.

### Initialize the Embedded Payment Element

#### Jetpack Compose

Initialize an instance of `EmbeddedPaymentElement` using the `rememberEmbeddedPaymentElement` function with an `EmbeddedPaymentElement.Builder`.

Pass in a `CreateIntentWithConfirmationTokenCallback`. For now, leave the implementation empty.

```kotlin
import com.stripe.android.paymentelement.EmbeddedPaymentElement
import com.stripe.android.paymentelement.rememberEmbeddedPaymentElement

@Composable
fun CheckoutScreen() {
    val embeddedBuilder = remember {
        EmbeddedPaymentElement.Builder(
            createIntentCallback = { confirmationToken, ->
                TODO("You'll implement this in the "Confirm the payment" step")
            },
            resultCallback = { result ->
                TODO("You'll implement this in the "Confirm the payment" step")
            },
        )
    }

    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)
}
```

#### Views (Classic)

Initialize an instance of `EmbeddedPaymentElement` using the `rememberEmbeddedPaymentElement` function with an `EmbeddedPaymentElement.Builder`.

```kotlin
import com.stripe.android.paymentelement.EmbeddedPaymentElement
import com.stripe.android.paymentelement.rememberEmbeddedPaymentElement

@Composable
fun CheckoutScreen() {
    val embeddedBuilder = remember {
        EmbeddedPaymentElement.Builder(
            createIntentCallback = { confirmationToken ->
                TODO("Completed in a later step.")
            },
            resultCallback = { result ->
                TODO("Completed in a later step.")
            },
        )
    }

    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)
}
```

The Embedded Mobile Payment Element is built for the Jetpack Compose UI and exposes a `@Composable Content` method. When using classic views, you must wrap the Embedded Payment Element with a `ComposeView`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Replace the content with your actual layout -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.compose.ui.platform.ComposeView
        android:id="@+id/compose_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.checkout_screen_layout)
        val composeView = findViewById<ComposeView>(R.id.compose_view)
        composeView.setContent {
            CheckoutScreen()
        }
    }
}
```

### Configure the Embedded Payment Element

The `Builder` object contains callbacks necessary for instantiating `EmbeddedPaymentElement`, including the `CreateIntentCallback`. For now, leave its implementation empty.

After instantiating, call `configure` with an `EmbeddedPaymentElement.Configuration` and `PaymentSheet.IntentConfiguration`. The `Configuration` object contains general configuration options for `EmbeddedPaymentElement` that don’t change between payments. The `IntentConfiguration` object contains details about the specific payment, such as the amount and currency.

> To save payment methods in the `EmbeddedPaymentElement`, configure `setupFutureUsage`. You can set the [setupFutureUsage](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-setup_future_usage) parameter on `IntentConfiguration` to `onSession` or `offSession`. This value is applied automatically to all available payment methods.

```kotlin
import com.stripe.android.paymentsheet.PaymentSheet
import com.stripe.android.paymentsheet.PaymentSheet.IntentConfiguration.SetupFutureUse

@Composable
fun CheckoutScreen() {
    val embeddedBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)
LaunchedEffect(embeddedPaymentElement) {
        embeddedPaymentElement.configure(
            intentConfiguration = PaymentSheet.IntentConfiguration(mode = PaymentSheet.IntentConfiguration.Mode.Payment(
                    amount = 1099,
                    currency = "USD",setupFutureUse = SetupFutureUse.OffSession,),// Optional intent configuration options...
            ),
            configuration = EmbeddedPaymentElement.Configuration.Builder("Powdur").build()
        )
    }
}
```

### Add the Embedded Payment Element view

After the `EmbeddedPaymentElement` has successfully initialized, put its `@Composable Content` in your checkout UI.

> The content must be in a scrollable container, because its height can change after it’s initially rendered.

```kotlin
@Composable
fun CheckoutScreen() {
    val embeddedBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)

    .....
val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        embeddedPaymentElement.Content()
    }
}
```

At this point, you can run your app and see the Embedded Mobile Payment Element.

### (Optional) Update payment details

If a customer changes the payment details (for example, by applying a discount code), update the `EmbeddedPaymentElement` instance. When you call the `configure` method again, the new values synchronize and display in the UI.

> Some payment methods, like Google Pay, show the amount in the UI. If a customer changes the payment and you don’t update the `EmbeddedPaymentElement`, the UI displays incorrect values.

When the `configure` call completes, the `@Composable Content` and the `paymentOption` automatically update with the new values provided to the `configure` call.

```kotlin
val intentConfiguration = PaymentSheet.IntentConfiguration(
    // Update the amount to reflect the price after applying the discount code
    mode = PaymentSheet.IntentConfiguration.Mode.Payment(
        amount = 999,
        currency = "USD",
        setupFutureUse = SetupFutureUse.OffSession,
    ),
)

val configuration = EmbeddedPaymentElement.Configuration.Builder("Powdur")
    .build()

LaunchedEffect(embeddedPaymentElement) {
    embeddedPaymentElement.configure(
        intentConfiguration = intentConfiguration,
        configuration = configuration,
    )
}
```

### (Optional) Display the selected payment option

You can display payment option details (such as the last 4 digits, a card logo, or billing information) by accessing the observable `Flow` property in the Embedded Payment Element’s `paymentOption`. When a customer selects a payment method that opens a form sheet, the payment option updates after they tap **Continue** in the sheet.

```kotlin
val selectedPaymentOption by embeddedPaymentElement.paymentOption.collectAsState()

selectedPaymentOption?.let { paymentOption ->
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .clickable(
                onClick = {  },
            )
            .semantics {
                text = AnnotatedString(paymentOption.label)
            },
    ) {
        Icon(
            painter = paymentOption.iconPainter,
            contentDescription = null, // decorative element
            modifier = Modifier.padding(horizontal = 4.dp),
            tint = Color.Unspecified,
        )

        Text(text = paymentOption.label)
    }
}
```

### Confirm the payment

When the customer taps the checkout button, initiate the payment by calling `embeddedPaymentElement.confirm()`. Be sure to disable user interaction during confirmation.

When a form is presented, the `EmbeddedPaymentElement` calls `confirm` when the user clicks **Call to action**. If the selected payment method doesn’t have any form fields, call `confirm` when the user clicks **Call to action** below the `@Composable Content`.

```kotlin
Button(
    onClick = {
        embeddedPaymentElement.confirm()
    }
) {
    Text("Confirm payment")
}
```

Next, implement the `createIntentCallback` callback you passed to `EmbeddedPaymentElement.Builder` earlier to send a request to your server. Your server creates a `PaymentIntent` and returns its client secret, explained in [Create a PaymentIntent](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md#submit-payment).

When you receive the request, return the result of the Intent creation using `CreateIntentResult` with your server response’s client secret or an error. The `EmbeddedPaymentElement` confirms the PaymentIntent using the client secret or displays the localized error message in its UI.

```kotlin
import com.stripe.android.paymentsheet.CreateIntentResult

val embeddedBuilder = remember {
    val embeddedBuilder = EmbeddedPaymentElement.Builder(
        createIntentCallback = { confirmationToken ->// Make a request to your own server and receive a client secret or an error.
            val networkResult = ...
            if (networkResult.isSuccess) {
                CreateIntentResult.Success(networkResult.clientSecret)
            } else {
                CreateIntentResult.Failure(networkResult.exception)
            }
        },
        resultCallback = { result ->when (result) {
                is EmbeddedPaymentElement.Result.Completed -> {
                    // Payment completed - show a confirmation screen.
                }
                is EmbeddedPaymentElement.Result.Failed -> {
                    // Encountered an unrecoverable error. You can display the error to the user, log it, and so on
                }
                is EmbeddedPaymentElement.Result.Canceled -> {
                    // Customer canceled - you should probably do nothing.
                }
            }
        },
    )
}
```

## Optional: Clear the selected payment option

If you have payment options external to `EmbeddedPaymentElement`, you might need to clear the selected payment option. To do so, use the `clearPaymentOption` API to deselect the selected payment option.

```kotlin
@Composable
fun CheckoutScreen() {
    val embeddedPaymentElementBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedPaymentElementBuilder)

    ....

    Button(
        onClick = embeddedPaymentElement::clearPaymentOption
    ) {
        Text("Select external payment option")
    }
}
```

## Optional: Display the mandate yourself

To ensure regulatory compliance, the Embedded Mobile Payment Element displays mandates and legal disclaimers by default. This text must be located close to your **Buy** button. If you disable the default display of this text in the view, you must display it yourself.

> To be compliant, your integration must display the mandate text accurately. If you display it yourself, make sure that any URLs are rendered correctly by including the text in a `Text` composable.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder("Merchant, Inc")
    .embeddedViewDisplaysMandateText(false)
    .build()

....

val selectedPaymentOption by embeddedPaymentElement.paymentOption.collectAsState()
selectedPaymentOption?.mandateText?.let { mandateText ->
    Text(mandateText)
}
```

## Optional: Let the customer pay immediately in the sheet

![Embedded Payment Element](https://b.stripecdn.com/docs-statics-srv/assets/embedded-pay-immediate.057c691220d43158ac8000de10815ed9.png)
 

To configure the button in the form sheet to immediately confirm payment, set `formSheetAction` on your `EmbeddedPaymentElement.Configuration` object.

The completion block executes with the result of the payment after the sheet dismisses. The embedded UI isn’t usable after payment completes, so we recommend that your implementation directs the user to a different screen, such as a receipt screen.

```kotlin
@Composable
fun CheckoutScreen() {
    val embeddedBuilder = ....
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(embeddedBuilder)

    LaunchedEffect(embeddedPaymentElement) {
        embeddedPaymentElement.configure(
            intentConfiguration = ....,
            configuration = EmbeddedPaymentElement.Configuration.Builder("Powdur")
                .formSheetAction(EmbeddedPaymentElement.FormSheetAction.Confirm)
                .build()
        )
    }
}
```

## Create a PaymentIntent [Server-side]

On your server, create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods) with an amount and currency. You can manage payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods). Stripe handles the return of eligible payment methods based on factors such as the transaction’s amount, currency, and payment flow. To prevent malicious customers from choosing their own prices, always decide how much to charge on the server-side (a trusted environment) and not the client.

If the call succeeds, return the PaymentIntent *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)). If the call fails, [handle the error](https://docs.stripe.com/error-handling.md) and return an error message with a brief explanation for your customer.

> Verify that all IntentConfiguration properties match your PaymentIntent (for example, `setup_future_usage`, `amount`, and `currency`).

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    customer: ..., # The Customer ID you previously created
    amount: 1099,
    currency: 'usd',
    setup_future_usage: 'off_session',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'customer': customer['id'],
      'amount': 1099,
      'currency': 'usd',
      'setup_future_usage': 'off_session',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'customer' => $customer->id,
    'amount' => 1099,
    'currency' => 'usd',
    'setup_future_usage' => 'off_session',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      customer: ... // The Customer ID you previously created
      setup_future_usage: 'off_session',
      customer: ... // The Customer ID you previously created
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setCustomer(customer.getId()) // The Customer ID you previously created
          .setAmount(1099L)
          .setCurrency("usd")
          .setSetupFutureUsage(PaymentIntentCreateParams.SetupFutureUsage.OFF_SESSION)
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          )
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationTokenID string `json:"confirmation_token_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Customer: stripe.String(c.ID), // The Customer ID you previously created
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      SetupFutureUsage: stripe.String("off_session"),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Customer = customer.Id, // The Customer ID you previously created
        Amount = 1099,
        Currency = "usd",
        SetupFutureUsage: "off_session",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token_id")]
      public string ConfirmationTokenId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```

## Handle post-payment events [Server-side]

Stripe sends a [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md#event_types-payment_intent.succeeded) event when the payment completes. Use the [Dashboard webhook tool](https://dashboard.stripe.com/webhooks) or follow the [webhook guide](https://docs.stripe.com/webhooks/quickstart.md) to receive these events and run actions, such as sending an order confirmation email to your customer, logging the sale in a database, or starting a shipping workflow.

Listen for these events rather than waiting on a callback from the client. On the client, the customer could close the browser window or quit the app before the callback executes, and malicious clients could manipulate the response. Setting up your integration to listen for asynchronous events is what enables you to accept [different types of payment methods](https://stripe.com/payments/payment-methods-guide) with a single integration.

In addition to handling the `payment_intent.succeeded` event, we recommend handling these other events when collecting payments with the Payment Element:

| Event                                                                                                                           | Description                                                                                                                                                                                                                                                                         | Action                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.succeeded)           | Sent when a customer successfully completes a payment.                                                                                                                                                                                                                              | Send the customer an order confirmation and *fulfill* (Fulfillment is the process of providing the goods or services purchased by a customer, typically after payment is collected) their order. |
| [payment_intent.processing](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.processing)         | Sent when a customer successfully initiates a payment, but the payment has yet to complete. This event is most commonly sent when the customer initiates a bank debit. It’s followed by either a `payment_intent.succeeded` or `payment_intent.payment_failed` event in the future. | Send the customer an order confirmation that indicates their payment is pending. For digital goods, you might want to fulfill the order before waiting for payment to complete.                  |
| [payment_intent.payment_failed](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.payment_failed) | Sent when a customer attempts a payment, but the payment fails.                                                                                                                                                                                                                     | If a payment transitions from `processing` to `payment_failed`, offer the customer another attempt to pay.                                                                                       |

## Test the integration

#### Cards

| Card number         | Scenario                                                                                                                                                                                                                                                                                      | How to test                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 4242424242424242    | The card payment succeeds and doesn’t require authentication.                                                                                                                                                                                                                                 | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000002500003155    | The card payment requires *authentication* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase). | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000000000009995    | The card is declined with a decline code like `insufficient_funds`.                                                                                                                                                                                                                           | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 6205500000000000004 | The UnionPay card has a variable length of 13-19 digits.                                                                                                                                                                                                                                      | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |

#### Bank redirects

| Payment method    | Scenario                                                                                                                                                                                        | How to test                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bancontact, iDEAL | Your customer fails to authenticate on the redirect page for a redirect-based and immediate notification payment method.                                                                        | Choose any redirect-based payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page. |
| Pay by Bank       | Your customer successfully pays with a redirect-based and [delayed notification](https://docs.stripe.com/payments/payment-methods.md#payment-notification) payment method.                      | Choose the payment method, fill out the required details, and confirm the payment. Then click **Complete test payment** on the redirect page.            |
| Pay by Bank       | Your customer fails to authenticate on the redirect page for a redirect-based and delayed notification payment method.                                                                          | Choose the payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page.                |
| BLIK              | BLIK payments fail in a variety of ways—immediate failures (for example, the code is expired or invalid), delayed errors (the bank declines) or timeouts (the customer didn’t respond in time). | Use email patterns to [simulate the different failures.](https://docs.stripe.com/payments/blik/accept-a-payment.md#simulate-failures)                    |

#### Bank debits

| Payment method    | Scenario                                                                                          | How to test                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEPA Direct Debit | Your customer successfully pays with SEPA Direct Debit.                                           | Fill out the form using the account number `AT321904300235473204`. The confirmed PaymentIntent initially transitions to processing, then transitions to the succeeded status three minutes later. |
| SEPA Direct Debit | Your customer’s payment intent status transitions from `processing` to `requires_payment_method`. | Fill out the form using the account number `AT861904300235473202`.                                                                                                                                |

See [Testing](https://docs.stripe.com/testing.md) for additional information to test your integration.

## Optional: Set SetupFutureUsage on individual payment methods (Preview) [Server-side] [Client-side]

For more granularity, set `setupFutureUsage` for specific payment methods with [PaymentSheet.IntentConfiguration.Mode.PaymentMethodOptions](https://github.com/stripe/stripe-android/blob/master/paymentsheet/src/main/java/com/stripe/android/paymentsheet/PaymentSheet.kt#L433).

```kotlin
import com.stripe.android.model.PaymentMethod
import com.stripe.android.paymentelement.PaymentMethodOptionsSetupFutureUsagePreview
@OptIn(PaymentMethodOptionsSetupFutureUsagePreview::class)
@Composable
fun MyCheckoutScreen() {
    val embeddedPaymentElement = rememberEmbeddedPaymentElement(
        EmbeddedPaymentElement.Builder(
            createIntentCallback = { confirmationToken ->
                // Handle ConfirmationToken...
            }
        )
    )

    Column {
        embeddedPaymentElement.Content(
            intentConfiguration = PaymentSheet.IntentConfiguration(
                mode = PaymentSheet.IntentConfiguration.Mode.Payment(
                    amount = 1099,
                    currency = "usd",paymentMethodOptions = PaymentSheet.IntentConfiguration.Mode.PaymentMethodOptions(
                        setupFutureUsageValues = mapOf(
                            PaymentMethod.Type.Card to SetupFutureUse.OffSession,
                            PaymentMethod.Type.CashAppPay to SetupFutureUse.OnSession
                        )
                    )
                )
            )
        )
    }
}
```

Learn more about [the `setupFutureUsage` values](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-payment_method_options) that are supported for each payment method.

Next, make sure your server doesn’t set `setup_future_usage` or `payment_method_options[X][setup_future_usage]` on the PaymentIntent. The SDK automatically handles setting it based on the `IntentConfiguration`.

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    amount: 1099,
    currency: 'usd',
    confirmation_token: data['confirmation_token'],
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'amount': 1099,
      'currency': 'usd',
      'confirmation_token': data['confirmation_token'],
      # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'amount' => 1099,
    'currency' => 'usd',
    'confirmation_token' => $jsonObj->confirmation_token,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      confirmation_token: req.body.confirmation_token,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setAmount(1099L)
          .setCurrency("usd")
          .setConfirmationToken(postBody.get("confirmation_token").getAsString())
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          );
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationToken string `json:"confirmation_token"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      ConfirmationToken: stripe.String(req.ConfirmationToken),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Amount = 1099,
        Currency = "usd",
        ConfirmationToken = request.ConfirmationToken,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token")]
      public string ConfirmationToken { get; set; }
    }
  }
}
```

## Optional: Enable saved cards [Server-side] [Client-side]

`EmbeddedPaymentElement` can allow the customer to save their card and can include the customer’s saved cards in available payment methods. The customer must have an associated [Customer](https://docs.stripe.com/api/customers.md) object on your server. To enable a checkbox that allows the customer to save their card, create a [CustomerSession](https://docs.stripe.com/api/customer_sessions.md), with `payment_method_save` set to `enabled`.

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const customerSession = await stripe.customerSessions.create({
    customer: customer.id,
    components: {
      mobile_payment_element: {
        enabled: true,
        features: {
          payment_method_save: 'enabled',
          payment_method_redisplay: 'enabled',
          payment_method_remove: 'enabled'
        }
      },
    },
  });

  res.json({
    customerSessionClientSecret: customerSession.client_secret,
    customer: customer.id,
  });
});
```

Next, configure `EmbeddedPaymentElement` with the Customer’s ID and the `CustomerSession` client secret.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Powdur")
    .customer(
        PaymentSheet.CustomerConfiguration.createWithCustomerSession(
            id = customerId,
            clientSecret = customerSessionClientSecret,
        )
    )
    .build()

embeddedPaymentElement.configure(
    intentConfiguration = // ... ,
    configuration = configuration,
)
```

## Optional: Allow delayed payment methods [Client-side]

*Delayed payment methods* (A payment method that can't immediately return payment status when a customer attempts a transaction (for example, ACH debits). Businesses commonly hold an order in a pending state until payment is successful with these payment methods) don’t guarantee that you’ll receive funds from your customer at the end of checkout, either because they take time to settle (for example, US Bank Accounts, SEPA Debit, iDEAL, Bancontact, and Sofort) or because they require customer action to complete (for example, OXXO, Konbini, and Boleto).

By default, `EmbeddedPaymentElement` doesn’t display delayed payment methods, even if you accept them. To display the delayed payment methods that you’ve enabled, set `allowsDelayedPaymentMethods` to true in your `EmbeddedPaymentElement.Configuration`.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Powdur")
  .allowsDelayedPaymentMethods(true)
  .build()
```

If the customer successfully uses a delayed payment method in an `EmbeddedPaymentElement`, the payment result returned is `EmbeddedPaymentElement.Result.Completed`.

## Optional: Enable Google Pay

> If your checkout screen has a dedicated **Google Pay** button, follow the [Google Pay guide](https://docs.stripe.com/google-pay.md?platform=android). You can use Embedded Payment Element to handle other payment method types.

### Set up your integration

To use Google Pay, first enable the Google Pay API by adding the following to the `<application>` tag of your **AndroidManifest.xml**:

```xml
<application>
  ...
  <meta-data
    android:name="com.google.android.gms.wallet.api.enabled"
    android:value="true" />
</application>
```

For more details, see Google Pay’s [Set up Google Pay API](https://developers.google.com/pay/api/android/guides/setup) for Android.

### Add Google Pay

To add Google Pay to your integration, pass a [PaymentSheet.GooglePayConfiguration](https://stripe.dev/stripe-android/paymentsheet/com.stripe.android.paymentsheet/-payment-sheet/-google-pay-configuration/index.html) with your Google Pay environment (production or test) and the [country code of your business](https://dashboard.stripe.com/settings/account) when initializing `EmbeddedPaymentElement.Configuration`.

```kotlin
val googlePayConfiguration = PaymentSheet.GooglePayConfiguration(
  environment = PaymentSheet.GooglePayConfiguration.Environment.Test,
  countryCode = "US",
  currencyCode = "USD" // Required for Setup Intents, optional for Payment Intents
)
val configuration = EmbeddedPaymentElement.Configuration.Builder("Merchant, Inc.")
    .googlePay(googlePayConfiguration)
    .build()
```

### Test Google Pay

Google allows you to make test payments through their [Test card suite](https://developers.google.com/pay/api/android/guides/resources/test-card-suite). The test suite supports using Stripe [test cards](https://docs.stripe.com/testing.md).

You must test Google Pay using a physical Android device instead of a simulated device, in a country where Google Pay is supported. Log in to a Google account on your test device with a real card saved to Google Wallet.

## Optional: Enable card scanning

To enable card scanning support, [request production access](https://developers.google.com/pay/api/android/guides/test-and-deploy/request-prod-access) to the Google Pay API from the [Google Pay and Wallet Console](https://pay.google.com/business/console?utm_source=devsite&utm_medium=devsite&utm_campaign=devsite).

- If you’ve enabled Google Pay, the card scanning feature is automatically available in our UI on eligible devices. To learn more about eligible devices, see the [Google Pay API constraints](https://developers.google.com/pay/payment-card-recognition/debit-credit-card-recognition)
- **Important:** The card scanning feature only appears in builds signed with the same signing key registered in the [Google Pay & Wallet Console](https://pay.google.com/business/console). Test or debug builds using different signing keys (for example, builds distributed through Firebase App Tester) won’t show the **Scan card** option. To test card scanning in pre-release builds, you must either:
  - Sign your test builds with your production signing key
  - Add your test signing key fingerprint to the Google Pay and Wallet Console

## Optional: Customize the sheet

All customization is configured through the `EmbeddedPaymentElement.Configuration` object.

### Appearance

Customize colors, fonts, and so on to match the look and feel of your app by using the [appearance API](https://docs.stripe.com/elements/appearance-api/embedded-mobile.md?platform=android).

### Collect customer addresses

Collect shipping and billing addresses from your customers using the [Address Element](https://docs.stripe.com/elements/address-element.md?platform=android).

### Customize the displayed business name

Specify a customer-facing business name by setting `merchantDisplayName`. If you don’t specify a name, the default value is your app’s name.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Merchant, Inc.")
    .build()
```

### Specify default billing details

To set default values for billing details collected in `EmbeddedPaymentElement`, configure the `defaultBillingDetails` property. The `EmbeddedPaymentElement` pre-populates its fields with the values that you provide.

```kotlin
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Merchant, Inc.")
    .defaultBillingDetails(
       PaymentSheet.BillingDetails(
         address = PaymentSheet.Address(
           country = "US",
         ),
         email = "foo@bar.com"
      )
    )
    .build()
```

### Configure collection of billing details

Use `BillingDetailsCollectionConfiguration` to specify how you want to collect billing details in the `EmbeddedPaymentElement`.

You can collect your customer’s name, email, phone number, and address.

If you want to attach default billing details to the PaymentMethod object even when those fields aren’t collected in the UI, set `billingDetailsCollectionConfiguration.attachDefaultsToPaymentMethod` to `true`.

```kotlin
import com.stripe.android.paymentsheet.PaymentSheet.BillingDetailsCollectionConfiguration

val billingDetails = PaymentSheet.BillingDetails(
    email = "foo@bar.com"
)
val billingDetailsCollectionConfiguration = BillingDetailsCollectionConfiguration(
    attachDefaultsToPaymentMethod = true,
    name = BillingDetailsCollectionConfiguration.CollectionMode.Always,
    email = BillingDetailsCollectionConfiguration.CollectionMode.Never,
    address = BillingDetailsCollectionConfiguration.AddressCollectionMode.Full,
)
val configuration = EmbeddedPaymentElement.Configuration.Builder(merchantDisplayName = "Merchant, Inc.")
    .defaultBillingDetails(billingDetails)
    .billingDetailsCollectionConfiguration(billingDetailsCollectionConfiguration)
    .build()
```

> Consult with your legal counsel regarding laws that apply to collecting information. Only collect phone numbers if you need them for the transaction.

## Optional: Enable CVC recollection on confirmation

To re-collect the CVC of a saved card during PaymentIntent confirmation, your integration must collect payment details before creating a PaymentIntent.

### Update the intent configuration

`PaymentSheet.IntentConfiguration` accepts an optional parameter that controls when to re-collect CVC for a saved card.

```kotlin
val intentConfig = PaymentSheet.IntentConfiguration(
  mode = PaymentSheet.IntentConfiguration.Mode.Payment(
    amount = 1099,
    currency = "usd",
  ),requireCvcRecollection = true,
)
```

### Update parameters of the intent creation

To re-collect the CVC when confirming payment, include both the `customerId` and `require_cvc_recollection` parameters during the creation of the PaymentIntent.

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    amount: 1099,
    currency: 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: customer.id,
    payment_method_options: {
      card: {require_cvc_recollection: true}
    }
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'amount': 1099,
      'currency': 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },customer=customer['id'],
      payment_method_options={
        'card': {
          'require_cvc_recollection': True
        }
      }
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'amount' => 1099,
    'currency' => 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],'customer' => $customer->id,
    'payment_method_options' => [
      'card' => ['require_cvc_recollection' => true]
    ]
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},customer: customer.id,
      payment_method_options: {
        card: {
          require_cvc_recollection: true,
        },
      },
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setAmount(1099L)
          .setCurrency("usd")
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          ).setCustomer(customer.getId())
          .setPaymentMethodOptions(
            PaymentIntentCreateParams.PaymentMethodOptions.builder()
              .setCard(
                PaymentIntentCreateParams.PaymentMethodOptions.Card.builder()
                  .setRequireCvcRecollection(true)
                  .build()
              )
              .build()
          )
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      PaymentMethodID string `json:"payment_method_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },Customer: stripe.String(customer.ID),
      PaymentMethodOptions: stripe.PaymentIntentPaymentMethodOptionsParams{
        Card: stripe.PaymentIntentPaymentMethodOptionsCardParams{
          RequireCvcRecollection: stripe.Bool(true),
        }
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Amount = 1099,
        Currency = "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },Customer = customer.Id,
        PaymentMethodOptions = new PaymentIntentPaymentMethodOptionsOptions
        {
            Card = new PaymentIntentPaymentMethodOptionsCardOptions
            {
                RequireCvcRecollection = true,
            },
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("payment_method_id")]
      public string PaymentMethodId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```


# Accept a payment

> This is a Accept a payment for when platform is react-native and type is payment. View the full page at https://docs.stripe.com/payments/mobile/accept-payment-embedded?platform=react-native&type=payment.

The Payment Element allows you to accept multiple payment methods using a single integration. In this integration, you build a custom payment flow where you render the Payment Element, create the *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods), and confirm the payment in your app.

## Set up Stripe [Server-side] [Client-side]

### Server-side 

This integration requires endpoints on your server that talk to the Stripe API. Use our official libraries for access to the Stripe API from your server:

#### Ruby

```bash
# Available as a gem
sudo gem install stripe
```

```ruby
# If you use bundler, you can add this line to your Gemfile
gem 'stripe'
```

#### Python

```bash
# Install through pip
pip3 install --upgrade stripe
```

```bash
# Or find the Stripe package on http://pypi.python.org/pypi/stripe/
```

```python
# Find the version you want to pin:
# https://github.com/stripe/stripe-python/blob/master/CHANGELOG.md
# Specify that version in your requirements.txt file
stripe>=5.0.0
```

#### PHP

```bash
# Install the PHP library with Composer
composer require stripe/stripe-php
```

```bash
# Or download the source directly: https://github.com/stripe/stripe-php/releases
```

#### Java

```java
/*
  For Gradle, add the following dependency to your build.gradle and replace with
  the version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
*/
implementation "com.stripe:stripe-java:31.3.0"
```

```xml
<!--
  For Maven, add the following dependency to your POM and replace with the
  version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
-->
<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>31.3.0</version>
</dependency>
```

```bash
# For other environments, manually install the following JARs:
# - The Stripe JAR from https://github.com/stripe/stripe-java/releases/latest
# - Google Gson from https://github.com/google/gson
```

#### Node.js

```bash
# Install with npm
npm install stripe --save
```

#### Go

```bash
# Make sure your project is using Go Modules
go mod init
# Install stripe-go
go get -u github.com/stripe/stripe-go/v84
```

```go
// Then import the package
import (
  "github.com/stripe/stripe-go/v84"
)
```

#### .NET

```bash
# Install with dotnet
dotnet add package Stripe.net
dotnet restore
```

```bash
# Or install with NuGet
Install-Package Stripe.net
```

### Client-side 

The [React Native SDK](https://github.com/stripe/stripe-react-native) is open source and fully documented. Internally, it uses the [native iOS](https://github.com/stripe/stripe-ios) and [Android](https://github.com/stripe/stripe-android) SDKs. To install Stripe’s React Native SDK, run one of the following commands in your project’s directory (depending on which package manager you use):

#### yarn

```bash
yarn add @stripe/stripe-react-native
```

#### npm

```bash
npm install @stripe/stripe-react-native
```

Next, install some other necessary dependencies:

- For iOS, go to the **ios** directory and run `pod install` to ensure that you also install the required native dependencies.
- For Android, there are no more dependencies to install.

> We recommend following the [official TypeScript guide](https://reactnative.dev/docs/typescript#adding-typescript-to-an-existing-project) to add TypeScript support.

### Stripe initialization

To initialize Stripe in your React Native app, either wrap your payment screen with the `StripeProvider` component, or use the `initStripe` initialization method. Only the API [publishable key](https://docs.stripe.com/keys.md#obtain-api-keys) in `publishableKey` is required. The following example shows how to initialize Stripe using the `StripeProvider` component.

```jsx
import { useState, useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

function App() {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    const key = await fetchKey(); // fetch key from your server here
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      {/* Your app code here */}
    </StripeProvider>
  );
}
```

> Use your API [test keys](https://docs.stripe.com/keys.md#obtain-api-keys) while you test and develop, and your [live mode](https://docs.stripe.com/keys.md#test-live-modes) keys when you publish your app.

## Enable payment methods

View your [payment methods settings](https://dashboard.stripe.com/settings/payment_methods) and enable the payment methods you want to support. You need at least one payment method enabled to create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods).

By default, Stripe enables cards and other prevalent payment methods that can help you reach more customers, but we recommend turning on additional payment methods that are relevant for your business and customers. See [Payment method support](https://docs.stripe.com/payments/payment-methods/payment-method-support.md) for product and payment method support, and our [pricing page](https://stripe.com/pricing/local-payment-methods) for fees.

## Collect payment details [Client-side]

### Initialize the Embedded Payment Element

Use the `useEmbeddedPaymentElement` hook to create and display the Embedded Payment Element in your React Native app. This hook requires two configuration objects:

- `EmbeddedPaymentElementConfiguration`: General settings (for example, `returnURL`).
- `IntentConfiguration`: Payment-specific details (for example, amount, currency, and a `confirmHandler` callback).

The hook returns an object with the `embeddedPaymentElementView` React component and other helper methods. For a full list of options and return values, see the [Stripe React Native SDK docs](https://stripe.dev/stripe-react-native/api-reference/interfaces/UseEmbeddedPaymentElementResult.html).

> Implementing `confirmHandler` is required, but for this step you can leave it as an empty function and implement it later.

```jsx
import { useState, useCallback, useEffect } from 'react';
import {
  useEmbeddedPaymentElement,
  IntentConfiguration,
  EmbeddedPaymentElementConfiguration,
  IntentCreationCallbackParams,
} from '@stripe/stripe-react-native';

function MyCheckoutComponent() {
  const [intentConfig, setIntentConfig] = useState<IntentConfiguration | null>(null);
  const [elementConfig, setElementConfig] = useState<EmbeddedPaymentElementConfiguration | null>(null);

  const initialize = useCallback(() => {
    const newIntentConfig: IntentConfiguration = {
      mode: {
        amount: 1099,
        currencyCode: 'USD',
      },
      confirmHandler: async (
        confirmationToken,
        callback: (params: IntentCreationCallbackParams) => void
      ) => {
	 // You'll implement this in the "Confirm the payment" section below
      },
    };

    const newElementConfig: EmbeddedPaymentElementConfiguration = {
      merchantDisplayName: 'Your Business Name',
      returnURL: 'your-app://stripe-redirect',
    };

    setIntentConfig(newIntentConfig);
    setElementConfig(newElementConfig);
  }, []);

  const {
    embeddedPaymentElementView,
    paymentOption,
    confirm,
    update,
    clearPaymentOption,
    loadingError,
    isLoaded,
  } = useEmbeddedPaymentElement(
    intentConfig!,
    elementConfig!
  );

  useEffect(() => {
    initialize();
  }, [initialize]);
}
```

### Add the Embedded Payment Element view

After the `useEmbeddedPaymentElement` hook has successfully initialized, include the `embeddedPaymentElementView` in your component to display the Embedded Payment Element in your checkout UI.

> If `isLoaded` never becomes `true`, verify that `embeddedPaymentElementView` remains in your component’s render tree at all times. On Android, the native view must be mounted for initialization to complete. Use opacity to control visibility instead of conditionally rendering the view, as shown in the example below.

```jsx
import { View, Text, ActivityIndicator } from 'react-native';

function MyCheckoutComponent() {
   // Other component code remains the same

  return (
    <View>
      {/* Handle loading errors through the loadingError property */}
      {loadingError && (
        <View>
          <Text>Failed to load payment form: {loadingError.message || String(loadingError)}</Text>
        </View>
      )}
      {/* Keep the view in the render tree for Android, control visibility with opacity */}
      <View style={{ opacity: isLoaded ? 1 : 0 }}>
        {embeddedPaymentElementView}
      </View>
      {/* Show loading indicator while the view is loading */}
      {!loadingError && !isLoaded && (
        <View style={{ paddingVertical: 16, alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}
```

Now you can run your app and see the Embedded Mobile Payment Element.

### (Optional) Display the selected payment option

The `useEmbeddedPaymentElement` hook provides a `paymentOption` property in its return object. You can use this to access details about the customer’s selected payment option, such as a label (for example, “····4242”), image (for example, a VISA logo), or billing details to display in your UI.

The `paymentOption` property is reactive, meaning it automatically updates when the selected payment option changes. You don’t need to implement a separate delegate method. Instead, you can use this property directly in your component, and React re-renders the component whenever the `paymentOption` changes.

```jsx
import { View, Text, Image } from 'react-native';

function MyCheckoutComponent() {
  // Other component code remains the same

  return (
    // Other component code remains the same
    // Display the currently selected payment option (label and image)
    <View style={{ paddingVertical: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {paymentOption?.image && (
          <Image
            source={{ uri: `data:image/png;base64,${paymentOption.image}` }}
            style={{ width: 32, height: 20 }}
            resizeMode="contain"
          />
        )}
        <Text>
          Selected: {paymentOption?.label ?? 'None'}
        </Text>
      </View>
    </View>
  );
}
```

### (Optional) Update payment details

As the customer performs actions that change the payment details (for example, applying a discount code), update the `EmbeddedPaymentElement` instance to reflect the new values by calling the update method. Some payment methods, like Apple Pay and Google Pay, show the amount in the UI, so make sure it’s always accurate and up to date.

When the update call completes, update your UI. The update call might change the customer’s currently selected payment option.

> Always use `await` when calling the `update` API to ensure loading states are properly sequenced. Without `await`, the loading indicator may disappear before the update completes.

```jsx
import { useState, useCallback } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';

function MyCheckoutComponent() {
  // Other component code remains the same
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = useCallback(async () => {
    // Create a new IntentConfiguration object with updated values
    const updatedIntentConfig: IntentConfiguration = {
      ...intentConfig!,

        mode: {
          amount: 999, // Updated amount after applying discount code
          currencyCode: 'USD',
        },
    };

    setIsUpdating(true);
    try {
      await update(updatedIntentConfig);
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error during update:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [intentConfig, update]);

  // Example of how to use the handleUpdate function
  const applyDiscountCode = useCallback(async (discountCode: string) => {
    // Validate discount code with your server
    try {
      const response = await fetch('https://your-server.com/apply-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discountCode }),
      });

      if (response.ok) {
        // Update the intent configuration with the new amount
        await handleUpdate();
      }
    } catch (error) {
      console.error('Failed to apply discount:', error);
    }
  }, [handleUpdate]);

  return (
    <View>
      {/* Hide view and show loading indicator during update */}
      <View style={{ opacity: isUpdating ? 0 : 1 }}>
        {embeddedPaymentElementView}
      </View>
      {isUpdating && (
        <View style={{ paddingVertical: 16, alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
      <Button
        title="Apply Discount Code"
        onPress={() => applyDiscountCode('123456')}
        disabled={isUpdating}
      />
    </View>
  );
}
```

### Confirm the payment

When the customer taps the checkout button, call the `confirm()` method provided by the `useEmbeddedPaymentElement` hook to complete the payment. Make sure to disable user interaction during the confirmation process to prevent multiple submissions or interfering actions.

```jsx
import { useCallback, useState } from 'react';
import { View, Button, Alert, ActivityIndicator } from 'react-native';

function MyCheckoutComponent() {
  // Other component code remains the same.

  const [isProcessing, setIsProcessing] = useState(false);
  const { confirm } = useEmbeddedPaymentElement(intentConfig!, elementConfig!);

  const handleSubmit = useCallback(async () => {
    setIsProcessing(true); // Disable user interaction, show a spinner.

    try {
      const result = await confirm();

      switch (result.status) {
        case 'completed':
          // Payment completed - show a confirmation screen.
          Alert.alert('Success', 'Payment was completed successfully!');
          break;
        case 'failed':
          // Encountered an unrecoverable error. You can display the error to the user, log it, and so on.
          Alert.alert('Error', `Payment failed: ${result.error.message}`);
          break;
        case 'canceled':
          // Customer canceled - you should probably do nothing.
          console.log('Payment was canceled by the user');
          break;
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error during confirmation:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsProcessing(false); // Re-enable user interaction, hide spinner.
    }
  }, [confirm]);

  // The rest of the component code.

  return (
    <View>
      {/* Other UI elements */}

      <Button
        title="Confirm Payment"
        onPress={handleSubmit}
        disabled={isProcessing || !paymentOption}
      />

      {isProcessing && <ActivityIndicator size="large" />}
    </View>
  );
}
```

Next, implement the `confirmHandler` callback you passed to the `IntentConfiguration` earlier to send a request to your server. Your server creates a `PaymentIntent` and returns its client secret. For more information about this process, see [Creating a PaymentIntent](https://docs.stripe.com/payments/payment-intents.md#creating-a-paymentintent).

When the server request returns, call the `intentCreationCallback` with either your server response’s client secret or an error. The Embedded Payment Element confirms the `PaymentIntent` using the client secret or displays a localized error message in its UI. After confirmation completes, the Embedded Payment Element becomes unusable. At this point, navigate the user to a receipt screen or similar confirmation page in your app.

```jsx
function MyCheckoutComponent() {
  const handleConfirm = useCallback(async (
    confirmationToken,
    intentCreationCallback: (params: IntentCreationCallbackParams) => void
  ) => {
    try {
      // Make a request to your own server and receive a client secret or an error.
      const response = await fetch('https://your-server.com/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirmation_token_id: confirmationToken.id,
          // Add any other necessary data.
        }),
      });

      if (!response.ok) {
        throw new Error('Server response was not ok');
      }

      const { clientSecret } = await response.json();

      // Call the `intentCreationCallback` with the client secret.
      intentCreationCallback({ clientSecret });
    } catch (error) {
      // Call the `intentCreationCallback` with the error.
      intentCreationCallback({ error: (error as IntentCreationError) });
    }
  }, []);

  const intentConfig: IntentConfiguration = {
    mode: {
      amount: 1099,
      currencyCode: 'USD',
    },
    confirmHandler: handleConfirm,
  };

  // The rest of your component code

  return (
    // Your component
  );
}
```

### (Optional) Clear the selected payment option

If you have payment options external to the Embedded Payment Element, you might need to clear the selected payment option. To do this, use the `clearPaymentOption` function provided by the `useEmbeddedPaymentElement` hook to deselect the currently selected payment option.

```jsx
function MyCheckoutComponent() {
  // The rest of your component code
  const handleDeselectPaymentMethod = useCallback(() => {
    clearPaymentOption();
  }, [clearPaymentOption]);

  // The rest of your component code
}
```

## Set up a return URL (iOS Only) [Client-side]

When a customer exits your app (for example to authenticate in Safari or their banking app), provide a way for them to automatically return to your app. Many payment method types *require* a return URL. If you don’t provide one, we can’t present payment methods that require a return URL to your users, even if you’ve enabled them.

To provide a return URL:

1. [Register](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app#Register-your-URL-scheme) a custom URL. Universal links aren’t supported.
1. [Configure](https://reactnative.dev/docs/linking) your custom URL.
1. Set up your root component to forward the URL to the Stripe SDK as shown below.

> If you’re using Expo, [set your scheme](https://docs.expo.io/guides/linking/#in-a-standalone-app) in the `app.json` file.

```jsx
import { useEffect, useCallback } from 'react';
import { Linking } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

export default function MyApp() {
  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  return (
    <View>
      <AwesomeAppComponent />
    </View>
  );
}
```

For more information on native URL schemes, refer to the [Android](https://developer.android.com/training/app-links/deep-linking) and [iOS](https://developer.apple.com/documentation/xcode/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app) docs.

## Create a PaymentIntent [Server-side]

On your server, create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods) with an amount and currency. You can manage payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods). Stripe handles the return of eligible payment methods based on factors such as the transaction’s amount, currency, and payment flow. To prevent malicious customers from choosing their own prices, always decide how much to charge on the server-side (a trusted environment) and not the client.

If the call succeeds, return the PaymentIntent *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)). If the call fails, [handle the error](https://docs.stripe.com/error-handling.md) and return an error message with a brief explanation for your customer.

> Verify that all IntentConfiguration properties match your PaymentIntent (for example, `setup_future_usage`, `amount`, and `currency`).

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    amount: 1099,
    currency: 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'amount': 1099,
      'currency': 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'amount' => 1099,
    'currency' => 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setAmount(1099L)
          .setCurrency("usd")
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          )
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationTokenID string `json:"confirmation_token_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Amount = 1099,
        Currency = "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token_id")]
      public string ConfirmationTokenId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```

## Handle post-payment events [Server-side]

Stripe sends a [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md#event_types-payment_intent.succeeded) event when the payment completes. Use the [Dashboard webhook tool](https://dashboard.stripe.com/webhooks) or follow the [webhook guide](https://docs.stripe.com/webhooks/quickstart.md) to receive these events and run actions, such as sending an order confirmation email to your customer, logging the sale in a database, or starting a shipping workflow.

Listen for these events rather than waiting on a callback from the client. On the client, the customer could close the browser window or quit the app before the callback executes, and malicious clients could manipulate the response. Setting up your integration to listen for asynchronous events is what enables you to accept [different types of payment methods](https://stripe.com/payments/payment-methods-guide) with a single integration.

In addition to handling the `payment_intent.succeeded` event, we recommend handling these other events when collecting payments with the Payment Element:

| Event                                                                                                                           | Description                                                                                                                                                                                                                                                                         | Action                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.succeeded)           | Sent when a customer successfully completes a payment.                                                                                                                                                                                                                              | Send the customer an order confirmation and *fulfill* (Fulfillment is the process of providing the goods or services purchased by a customer, typically after payment is collected) their order. |
| [payment_intent.processing](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.processing)         | Sent when a customer successfully initiates a payment, but the payment has yet to complete. This event is most commonly sent when the customer initiates a bank debit. It’s followed by either a `payment_intent.succeeded` or `payment_intent.payment_failed` event in the future. | Send the customer an order confirmation that indicates their payment is pending. For digital goods, you might want to fulfill the order before waiting for payment to complete.                  |
| [payment_intent.payment_failed](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.payment_failed) | Sent when a customer attempts a payment, but the payment fails.                                                                                                                                                                                                                     | If a payment transitions from `processing` to `payment_failed`, offer the customer another attempt to pay.                                                                                       |

## Test the integration

#### Cards

| Card number         | Scenario                                                                                                                                                                                                                                                                                      | How to test                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 4242424242424242    | The card payment succeeds and doesn’t require authentication.                                                                                                                                                                                                                                 | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000002500003155    | The card payment requires *authentication* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase). | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000000000009995    | The card is declined with a decline code like `insufficient_funds`.                                                                                                                                                                                                                           | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 6205500000000000004 | The UnionPay card has a variable length of 13-19 digits.                                                                                                                                                                                                                                      | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |

#### Bank redirects

| Payment method    | Scenario                                                                                                                                                                                        | How to test                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bancontact, iDEAL | Your customer fails to authenticate on the redirect page for a redirect-based and immediate notification payment method.                                                                        | Choose any redirect-based payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page. |
| Pay by Bank       | Your customer successfully pays with a redirect-based and [delayed notification](https://docs.stripe.com/payments/payment-methods.md#payment-notification) payment method.                      | Choose the payment method, fill out the required details, and confirm the payment. Then click **Complete test payment** on the redirect page.            |
| Pay by Bank       | Your customer fails to authenticate on the redirect page for a redirect-based and delayed notification payment method.                                                                          | Choose the payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page.                |
| BLIK              | BLIK payments fail in a variety of ways—immediate failures (for example, the code is expired or invalid), delayed errors (the bank declines) or timeouts (the customer didn’t respond in time). | Use email patterns to [simulate the different failures.](https://docs.stripe.com/payments/blik/accept-a-payment.md#simulate-failures)                    |

#### Bank debits

| Payment method    | Scenario                                                                                          | How to test                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEPA Direct Debit | Your customer successfully pays with SEPA Direct Debit.                                           | Fill out the form using the account number `AT321904300235473204`. The confirmed PaymentIntent initially transitions to processing, then transitions to the succeeded status three minutes later. |
| SEPA Direct Debit | Your customer’s payment intent status transitions from `processing` to `requires_payment_method`. | Fill out the form using the account number `AT861904300235473202`.                                                                                                                                |

See [Testing](https://docs.stripe.com/testing.md) for additional information to test your integration.

## Optional: Enable saved cards [Server-side] [Client-side]

EmbeddedPaymentElement can display a **Save this card for future use** checkbox that saves the customer’s card. It can also display the customer’s saved cards. To enable this checkbox, the customer must have an associated [Customer](https://docs.stripe.com/api/customers.md) object on your server. To enable a checkbox that allows the customer to save their card, create a [CustomerSession](https://docs.stripe.com/api/customer_sessions.md) with `payment_method_save` set to `enabled`.

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const customerSession = await stripe.customerSessions.create({
    customer: customer.id,
      mobile_payment_element: {
        enabled: true,
        features: {
          payment_method_save: 'enabled',
          payment_method_redisplay: 'enabled',
          payment_method_remove: 'enabled'
        }
      },
  });

  res.json({
    customerSessionClientSecret: customerSession.client_secret,
    customer: customer.id,
  });
});
```

Next, configure EmbeddedPaymentElement with the Customer’s ID and the CustomerSession client secret.

```jsx
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  merchantDisplayName: "Example, Inc.",
  customerId: customer,
  customerSessionClientSecret: customerSessionClientSecret,
  ...
};
```

## Optional: Allow delayed payment methods [Client-side]

*Delayed payment methods* (A payment method that can't immediately return payment status when a customer attempts a transaction (for example, ACH debits). Businesses commonly hold an order in a pending state until payment is successful with these payment methods) don’t guarantee that you’ll receive funds from your customer at the end of checkout. That’s because they take time to settle (for example, US Bank Accounts, SEPA Debit, iDEAL, Bancontact, and Sofort) or because they require customer action to complete (for example, OXXO, Konbini, and Boleto).

By default, `EmbeddedPaymentElement` doesn’t display delayed payment methods. To display them, when you initialize `EmbeddedPaymentElementConfiguration`, set `allowsDelayedPaymentMethods` to true.

```jsx
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
// Other EmbeddedPaymentElementConfiguration remains the same
    allowsDelayedPaymentMethods: true,
};
```

If the customer successfully uses one of these delayed payment methods in `EmbeddedPaymentElement`, the payment result returned is `.completed`.

## Optional: Enable Apple Pay

### Register for an Apple Merchant ID

Obtain an Apple Merchant ID by [registering for a new identifier](https://developer.apple.com/account/resources/identifiers/add/merchant) on the Apple Developer website.

Fill out the form with a description and identifier. Your description is for your own records and you can modify it in the future. Stripe recommends using the name of your app as the identifier (for example, `merchant.com.{{YOUR_APP_NAME}}`).

### Create a new Apple Pay certificate

Create a certificate for your app to encrypt payment data.

Go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard, click **Add new application**, and follow the guide.

Download a Certificate Signing Request (CSR) file to get a secure certificate from Apple that allows you to use Apple Pay.

One CSR file must be used to issue exactly one certificate. If you switch your Apple Merchant ID, you must go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard to obtain a new CSR and certificate.

### Integrate with Xcode

Add the Apple Pay capability to your app. In Xcode, open your project settings, click the **Signing & Capabilities** tab, and add the **Apple Pay** capability. You might be prompted to log in to your developer account at this point. Select the merchant ID you created earlier, and your app is ready to accept Apple Pay.
![](https://b.stripecdn.com/docs-statics-srv/assets/xcode.a701d4c1922d19985e9c614a6f105bf1.png)

Enable the Apple Pay capability in Xcode

### Add Apple Pay

#### One-time payment

Pass your merchant ID when you create `StripeProvider`:

```javascript
import { StripeProvider } from '@stripe/stripe-react-native';

function App() {
  return (
    <StripeProvider
      publishableKey="<<YOUR_PUBLISHABLE_KEY>>"
      merchantIdentifier="MERCHANT_ID"
    >
      // Your app code here
    </StripeProvider>
  );
}
```

When you initialize `EmbeddedPaymentElementConfiguration`, pass in your [ApplePayParams](https://stripe.dev/stripe-react-native/api-reference/modules/PaymentSheet.html#ApplePayParams):

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  applePay: {
    merchantCountryCode: 'US',
  },
};
```

#### Recurring payments

When you initialize `EmbeddedPaymentElementConfiguration`, pass in an [ApplePayParams](https://stripe.dev/stripe-react-native/api-reference/modules/PaymentSheet.html#ApplePayParams) with `merchantCountryCode` set to the country code of your business.

In accordance with [Apple’s guidelines](https://developer.apple.com/design/human-interface-guidelines/apple-pay#Supporting-subscriptions) for recurring payments, you must also set a `cardItems` that includes a [RecurringCartSummaryItem](https://stripe.dev/stripe-react-native/api-reference/modules/ApplePay.html#RecurringCartSummaryItem) with the amount you intend to charge (for example, “$59.95 a month”).

You can also adopt [merchant tokens](https://developer.apple.com/apple-pay/merchant-tokens/) by setting the `request` with its `type` set to `PaymentRequestType.Recurring`

To learn more about how to use recurring payments with Apple Pay, see [Apple’s PassKit documentation](https://developer.apple.com/documentation/passkit/pkpaymentrequest).

#### iOS (React Native)

```javascript
const initialize = useCallback(() => {
  const recurringSummaryItem = {
    label: 'My Subscription',
    amount: '59.99',
    paymentType: 'Recurring',
    intervalCount: 1,
    intervalUnit: 'month',
    // Payment starts today
    startDate: new Date().getTime() / 1000,

    // Payment ends in one year
    endDate: new Date().getTime() / 1000 + 60 * 60 * 24 * 365,
  };

  const embeddedConfig: EmbeddedPaymentElementConfiguration = {
    // ...
    applePay: {
      merchantCountryCode: 'US',
      cartItems: [recurringSummaryItem],
      request: {
        type: PaymentRequestType.Recurring,
        description: 'Recurring',
        managementUrl: 'https://my-backend.example.com/customer-portal',
        billing: recurringSummaryItem,
        billingAgreement:
          "You'll be billed $59.99 every month for the next 12 months. To cancel at any time, go to Account and click 'Cancel Membership.'",
      },
    },
  };
});
```

### Order tracking

To add [order tracking](https://developer.apple.com/design/human-interface-guidelines/technologies/wallet/designing-order-tracking) information in iOS 16 or later, configure a `setOrderTracking` callback function. Stripe calls your implementation after the payment is complete, but before iOS dismisses the Apple Pay sheet.

In your implementation of `setOrderTracking` callback function, fetch the order details from your server for the completed order, and pass the details to the provided `completion` function.

To learn more about order tracking, see [Apple’s Wallet Orders documentation](https://developer.apple.com/documentation/walletorders).

#### iOS (React Native)

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  applePay: {
    // ...
    setOrderTracking: async complete => {
      const apiEndpoint =
        Platform.OS === 'ios'
          ? 'http://localhost:4242'
          : 'http://10.0.2.2:4567';
      const response = await fetch(
        `${apiEndpoint}/retrieve-order?orderId=${orderId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        const orderDetails = await response.json();
        // orderDetails should include orderIdentifier, orderTypeIdentifier,
        // authenticationToken and webServiceUrl
        complete(orderDetails);
      }
    },
  },
};
```

## Optional: Enable Google Pay

### Set up your integration

To use Google Pay, first enable the Google Pay API by adding the following to the `<application>` tag of your **AndroidManifest.xml**:

```xml
<application>
  ...
  <meta-data
    android:name="com.google.android.gms.wallet.api.enabled"
    android:value="true" />
</application>
```

For more details, see Google Pay’s [Set up Google Pay API](https://developers.google.com/pay/api/android/guides/setup) for Android.

### Add Google Pay

When you initialize `EmbeddedPaymentElement`, set `merchantCountryCode` to the country code of your business and set `googlePay` to true.

You can also use the test environment by passing the `testEnv` parameter. You can only test Google Pay on a physical Android device. Follow the [React Native docs](https://reactnative.dev/docs/running-on-device) to test your application on a physical device.

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  googlePay: {
    merchantCountryCode: 'US',
    testEnv: true, // use test environment
  },
};
```

## Optional: Enable card scanning

To enable card scanning support for iOS, set the `NSCameraUsageDescription` (**Privacy - Camera Usage Description**) in the `Info.plist` of your application, and provide a reason for accessing the camera (for example, “To scan cards”). Devices with iOS 13 or higher support card scanning.

To enable card scanning support for Android, [request production access](https://developers.google.com/pay/api/android/guides/test-and-deploy/request-prod-access) to the Google Pay API from the [Google Pay and Wallet Console](https://pay.google.com/business/console?utm_source=devsite&utm_medium=devsite&utm_campaign=devsite).

- If you’ve enabled Google Pay, the card scanning feature is automatically available in our UI on eligible devices. To learn more about eligible devices, see the [Google Pay API constraints](https://developers.google.com/pay/payment-card-recognition/debit-credit-card-recognition)
- **Important:** The card scanning feature only appears in builds signed with the same signing key registered in the [Google Pay & Wallet Console](https://pay.google.com/business/console). Test or debug builds using different signing keys (for example, builds distributed through Firebase App Tester) won’t show the **Scan card** option. To test card scanning in pre-release builds, you must either:
  - Sign your test builds with your production signing key
  - Add your test signing key fingerprint to the Google Pay and Wallet Console

## Optional: Customize the sheet

All customization is configured using `EmbeddedPaymentElementConfiguration`.

### Appearance

Customize colors, fonts, and so on to match the look and feel of your app by using the [appearance API](https://docs.stripe.com/elements/appearance-api.md?platform=react-native).

### Merchant display name

Specify a customer-facing business name by setting `merchantDisplayName`. By default, this is your app’s name.

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  merchantDisplayName: 'Example Inc.',
};
```

### Dark mode

By default, `EmbeddedPaymentElement` automatically adapts to the user’s system-wide appearance settings (light and dark mode). You can change this by setting the `style` property to `alwaysLight` or `alwaysDark` mode on iOS.

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  style: 'alwaysDark',
};
```

On Android, set light or dark mode on your app:

```
// force dark
AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
// force light
AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
```

### Default billing details

To set default values for billing details collected in the EmbeddedPaymentElement, configure the `defaultBillingDetails` property. The `EmbeddedPaymentElement` pre-populates its fields with the values that you provide.

```javascript
const uiConfig: EmbeddedPaymentElementConfiguration = {  
  // ...
  defaultBillingDetails: {
      email: 'foo@bar.com',
      address: {
        country: 'US',
      },
  },
};
```

### Collect billing details

Use `billingDetailsCollectionConfiguration` to specify how you want to collect billing details in the `EmbeddedPaymentElement`.

You can collect your customer’s name, email, phone number, and address.

If you don’t intend to collect the values that the payment method requires, you must do the following:

1. Attach the values that aren’t collected by `EmbeddedPaymentElement` to the `defaultBillingDetails` property.
1. Set `billingDetailsCollectionConfiguration.attachDefaultsToPaymentMethod` to `true`.

```javascript
const newElementConfig: EmbeddedPaymentElementConfiguration = {  
  // ...
  defaultBillingDetails: {
    email: 'foo@bar.com',
  }
  billingDetailsCollectionConfiguration: {
    name: PaymentSheet.CollectionMode.ALWAYS,
    email: PaymentSheet.CollectionMode.NEVER,
    address: PaymentSheet.AddressCollectionMode.FULL,
    attachDefaultsToPaymentMethod: true
  },
};
```

> Consult with your legal counsel regarding laws that apply to collecting information. Only collect phone numbers if you need them for the transaction.


# Collect and save a payment method

> This is a Collect and save a payment method for when platform is react-native and type is setup. View the full page at https://docs.stripe.com/payments/mobile/accept-payment-embedded?platform=react-native&type=setup.

A SetupIntent flow allows you to collect payment method details and save them for future payments without creating a charge. In this integration, you build a custom flow where you render the Payment Element, create the *SetupIntent* (The Setup Intents API lets you build dynamic flows for collecting payment method details for future payments. It tracks the lifecycle of a payment setup flow and can trigger additional authentication steps if required by law or by the payment method), and confirm saving the payment method in your app.

## Set up Stripe [Server-side] [Client-side]

### Server-side 

This integration requires endpoints on your server that talk to the Stripe API. Use our official libraries for access to the Stripe API from your server:

#### Ruby

```bash
# Available as a gem
sudo gem install stripe
```

```ruby
# If you use bundler, you can add this line to your Gemfile
gem 'stripe'
```

#### Python

```bash
# Install through pip
pip3 install --upgrade stripe
```

```bash
# Or find the Stripe package on http://pypi.python.org/pypi/stripe/
```

```python
# Find the version you want to pin:
# https://github.com/stripe/stripe-python/blob/master/CHANGELOG.md
# Specify that version in your requirements.txt file
stripe>=5.0.0
```

#### PHP

```bash
# Install the PHP library with Composer
composer require stripe/stripe-php
```

```bash
# Or download the source directly: https://github.com/stripe/stripe-php/releases
```

#### Java

```java
/*
  For Gradle, add the following dependency to your build.gradle and replace with
  the version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
*/
implementation "com.stripe:stripe-java:31.3.0"
```

```xml
<!--
  For Maven, add the following dependency to your POM and replace with the
  version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
-->
<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>31.3.0</version>
</dependency>
```

```bash
# For other environments, manually install the following JARs:
# - The Stripe JAR from https://github.com/stripe/stripe-java/releases/latest
# - Google Gson from https://github.com/google/gson
```

#### Node.js

```bash
# Install with npm
npm install stripe --save
```

#### Go

```bash
# Make sure your project is using Go Modules
go mod init
# Install stripe-go
go get -u github.com/stripe/stripe-go/v84
```

```go
// Then import the package
import (
  "github.com/stripe/stripe-go/v84"
)
```

#### .NET

```bash
# Install with dotnet
dotnet add package Stripe.net
dotnet restore
```

```bash
# Or install with NuGet
Install-Package Stripe.net
```

### Client-side 

The [React Native SDK](https://github.com/stripe/stripe-react-native) is open source and fully documented. Internally, it uses the [native iOS](https://github.com/stripe/stripe-ios) and [Android](https://github.com/stripe/stripe-android) SDKs. To install Stripe’s React Native SDK, run one of the following commands in your project’s directory (depending on which package manager you use):

#### yarn

```bash
yarn add @stripe/stripe-react-native
```

#### npm

```bash
npm install @stripe/stripe-react-native
```

Next, install some other necessary dependencies:

- For iOS, go to the **ios** directory and run `pod install` to ensure that you also install the required native dependencies.
- For Android, there are no more dependencies to install.

> We recommend following the [official TypeScript guide](https://reactnative.dev/docs/typescript#adding-typescript-to-an-existing-project) to add TypeScript support.

### Stripe initialization

To initialize Stripe in your React Native app, either wrap your payment screen with the `StripeProvider` component, or use the `initStripe` initialization method. Only the API [publishable key](https://docs.stripe.com/keys.md#obtain-api-keys) in `publishableKey` is required. The following example shows how to initialize Stripe using the `StripeProvider` component.

```jsx
import { useState, useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

function App() {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    const key = await fetchKey(); // fetch key from your server here
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      {/* Your app code here */}
    </StripeProvider>
  );
}
```

> Use your API [test keys](https://docs.stripe.com/keys.md#obtain-api-keys) while you test and develop, and your [live mode](https://docs.stripe.com/keys.md#test-live-modes) keys when you publish your app.

## Enable payment methods

> When used with a SetupIntent, PaymentSheet supports cards and PayPal.

View your [payment methods settings](https://dashboard.stripe.com/settings/payment_methods) and enable the payment methods you want to support. You need at least one payment method enabled to create a *SetupIntent* (The Setup Intents API lets you build dynamic flows for collecting payment method details for future payments. It tracks the lifecycle of a payment setup flow and can trigger additional authentication steps if required by law or by the payment method).

By default, Stripe enables cards and other prevalent payment methods that can help you reach more customers, but we recommend turning on additional payment methods that are relevant for your business and customers. See [Payment method support](https://docs.stripe.com/payments/payment-methods/payment-method-support.md) for product and payment method support, and our [pricing page](https://stripe.com/pricing/local-payment-methods) for fees.

## Create a Customer [Server-side]

To set up a payment method for future payments, you must attach it to a *Customer* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments). Create a `Customer` object when your customer creates an account with your business. `Customer` objects allow for reusing payment methods and tracking across multiple payments.

> #### Compare Customers v1 and Accounts v2 references
> 
> If your Connect platform uses [customer-configured Accounts](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-configuration-customer), use our [guide](https://docs.stripe.com/connect/use-accounts-as-customers.md) to replace `Customer` and event references in your code with the equivalent Accounts v2 API references.

```curl
curl -X POST https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:"
```

```cli
stripe customers create
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

customer = client.v1.customers.create()
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

# For SDK versions 12.4.0 or lower, remove '.v1' from the following line.
customer = client.v1.customers.create()
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$customer = $stripe->customers->create([]);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

CustomerCreateParams params = CustomerCreateParams.builder().build();

// For SDK versions 29.4.0 or lower, remove '.v1()' from the following line.
Customer customer = client.v1().customers().create(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const customer = await stripe.customers.create();
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.CustomerCreateParams{}
result, err := sc.V1Customers.Create(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new CustomerCreateOptions();
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.Customers;
Customer customer = service.Create(options);
```

## Collect payment details [Client-side]

### Initialize the Embedded Payment Element

Use the `useEmbeddedPaymentElement` hook to create and display the Embedded Payment Element in your React Native app. This hook requires two configuration objects:

- `EmbeddedPaymentElementConfiguration`: General settings (for example, `returnURL`).
- `IntentConfiguration`: Payment-specific details (for example, amount, currency, and a `confirmHandler` callback).

The hook returns an object with the `embeddedPaymentElementView` React component and other helper methods. For a full list of options and return values, see the [Stripe React Native SDK docs](https://stripe.dev/stripe-react-native/api-reference/interfaces/UseEmbeddedPaymentElementResult.html).

> Implementing `confirmHandler` is required, but for this step you can leave it as an empty function and implement it later.

```jsx
import { useState, useCallback, useEffect } from 'react';
import {
  useEmbeddedPaymentElement,
  IntentConfiguration,
  EmbeddedPaymentElementConfiguration,
  IntentCreationCallbackParams,
} from '@stripe/stripe-react-native';

function MyCheckoutComponent() {
  const [intentConfig, setIntentConfig] = useState<IntentConfiguration | null>(null);
  const [elementConfig, setElementConfig] = useState<EmbeddedPaymentElementConfiguration | null>(null);

  const initialize = useCallback(() => {
    const newIntentConfig: IntentConfiguration = {
      mode: {
        currencyCode: 'USD',
      },
      confirmHandler: async (
        confirmationToken,
        callback: (params: IntentCreationCallbackParams) => void
      ) => {
	 // You'll implement this in the "Confirm the payment" section below
      },
    };

    const newElementConfig: EmbeddedPaymentElementConfiguration = {
      merchantDisplayName: 'Your Business Name',
      returnURL: 'your-app://stripe-redirect',
    };

    setIntentConfig(newIntentConfig);
    setElementConfig(newElementConfig);
  }, []);

  const {
    embeddedPaymentElementView,
    paymentOption,
    confirm,
    update,
    clearPaymentOption,
    loadingError,
    isLoaded,
  } = useEmbeddedPaymentElement(
    intentConfig!,
    elementConfig!
  );

  useEffect(() => {
    initialize();
  }, [initialize]);
}
```

### Add the Embedded Payment Element view

After the `useEmbeddedPaymentElement` hook has successfully initialized, include the `embeddedPaymentElementView` in your component to display the Embedded Payment Element in your checkout UI.

> If `isLoaded` never becomes `true`, verify that `embeddedPaymentElementView` remains in your component’s render tree at all times. On Android, the native view must be mounted for initialization to complete. Use opacity to control visibility instead of conditionally rendering the view, as shown in the example below.

```jsx
import { View, Text, ActivityIndicator } from 'react-native';

function MyCheckoutComponent() {
   // Other component code remains the same

  return (
    <View>
      {/* Handle loading errors through the loadingError property */}
      {loadingError && (
        <View>
          <Text>Failed to load payment form: {loadingError.message || String(loadingError)}</Text>
        </View>
      )}
      {/* Keep the view in the render tree for Android, control visibility with opacity */}
      <View style={{ opacity: isLoaded ? 1 : 0 }}>
        {embeddedPaymentElementView}
      </View>
      {/* Show loading indicator while the view is loading */}
      {!loadingError && !isLoaded && (
        <View style={{ paddingVertical: 16, alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}
```

Now you can run your app and see the Embedded Mobile Payment Element.

### (Optional) Display the selected payment option

The `useEmbeddedPaymentElement` hook provides a `paymentOption` property in its return object. You can use this to access details about the customer’s selected payment option, such as a label (for example, “····4242”), image (for example, a VISA logo), or billing details to display in your UI.

The `paymentOption` property is reactive, meaning it automatically updates when the selected payment option changes. You don’t need to implement a separate delegate method. Instead, you can use this property directly in your component, and React re-renders the component whenever the `paymentOption` changes.

```jsx
import { View, Text, Image } from 'react-native';

function MyCheckoutComponent() {
  // Other component code remains the same

  return (
    // Other component code remains the same
    // Display the currently selected payment option (label and image)
    <View style={{ paddingVertical: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {paymentOption?.image && (
          <Image
            source={{ uri: `data:image/png;base64,${paymentOption.image}` }}
            style={{ width: 32, height: 20 }}
            resizeMode="contain"
          />
        )}
        <Text>
          Selected: {paymentOption?.label ?? 'None'}
        </Text>
      </View>
    </View>
  );
}
```

### (Optional) Update payment details

As the customer performs actions that change the payment details (for example, applying a discount code), update the `EmbeddedPaymentElement` instance to reflect the new values by calling the update method. Some payment methods, like Apple Pay and Google Pay, show the amount in the UI, so make sure it’s always accurate and up to date.

When the update call completes, update your UI. The update call might change the customer’s currently selected payment option.

> Always use `await` when calling the `update` API to ensure loading states are properly sequenced. Without `await`, the loading indicator may disappear before the update completes.

```jsx
import { useState, useCallback } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';

function MyCheckoutComponent() {
  // Other component code remains the same
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = useCallback(async () => {
    // Create a new IntentConfiguration object with updated values
    const updatedIntentConfig: IntentConfiguration = {
      ...intentConfig!,

        mode: {
          currencyCode: 'USD',
        },
    };

    setIsUpdating(true);
    try {
      await update(updatedIntentConfig);
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error during update:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [intentConfig, update]);

  // Example of how to use the handleUpdate function
  const applyDiscountCode = useCallback(async (discountCode: string) => {
    // Validate discount code with your server
    try {
      const response = await fetch('https://your-server.com/apply-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discountCode }),
      });

      if (response.ok) {
        // Update the intent configuration with the new amount
        await handleUpdate();
      }
    } catch (error) {
      console.error('Failed to apply discount:', error);
    }
  }, [handleUpdate]);

  return (
    <View>
      {/* Hide view and show loading indicator during update */}
      <View style={{ opacity: isUpdating ? 0 : 1 }}>
        {embeddedPaymentElementView}
      </View>
      {isUpdating && (
        <View style={{ paddingVertical: 16, alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
      <Button
        title="Apply Discount Code"
        onPress={() => applyDiscountCode('123456')}
        disabled={isUpdating}
      />
    </View>
  );
}
```

### Confirm the payment details

When the customer taps the save button, call the `confirm()` method provided by the `useEmbeddedPaymentElement` hook to complete the payment. Make sure to disable user interaction during the confirmation process to prevent multiple submissions or interfering actions.

```jsx
import { useCallback, useState } from 'react';
import { View, Button, Alert, ActivityIndicator } from 'react-native';

function MyCheckoutComponent() {
  // Other component code remains the same.

  const [isProcessing, setIsProcessing] = useState(false);
  const { confirm } = useEmbeddedPaymentElement(intentConfig!, elementConfig!);

  const handleSubmit = useCallback(async () => {
    setIsProcessing(true); // Disable user interaction, show a spinner.

    try {
      const result = await confirm();

      switch (result.status) {
        case 'completed':
          // Setup completed - show a confirmation screen.
          Alert.alert('Success', 'Setup was completed successfully!');
          break;
        case 'failed':
          // Encountered an unrecoverable error. You can display the error to the user, log it, and so on.
          Alert.alert('Error', `Setup failed: ${result.error.message}`);
          break;
        case 'canceled':
          // Customer canceled - you should probably do nothing.
          console.log('Setup was canceled by the user');
          break;
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error during confirmation:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsProcessing(false); // Re-enable user interaction, hide spinner.
    }
  }, [confirm]);

  // The rest of the component code.

  return (
    <View>
      {/* Other UI elements */}

      <Button
        title="Confirm Save"
        onPress={handleSubmit}
        disabled={isProcessing || !paymentOption}
      />

      {isProcessing && <ActivityIndicator size="large" />}
    </View>
  );
}
```

Next, implement the `confirmHandler` callback you passed to the `IntentConfiguration` earlier to send a request to your server. Your server creates a `SetupIntent` and returns its client secret. For more information about this process, see the [Setup Intents API](https://docs.stripe.com/payments/setup-intents.md).

When the server request returns, call the `intentCreationCallback` with either your server response’s client secret or an error. The Embedded Payment Element confirms the `SetupIntent` using the client secret or displays a localized error message in its UI. After confirmation completes, the Embedded Payment Element becomes unusable. At this point, navigate the user to a receipt screen or similar confirmation page in your app.

```jsx
function MyCheckoutComponent() {
  const handleConfirm = useCallback(async (
    confirmationToken,
    intentCreationCallback: (params: IntentCreationCallbackParams) => void
  ) => {
    try {
      // Make a request to your own server and receive a client secret or an error.
      const response = await fetch('https://your-server.com/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirmation_token_id: confirmationToken.id,
          // Add any other necessary data.
        }),
      });

      if (!response.ok) {
        throw new Error('Server response was not ok');
      }

      const { clientSecret } = await response.json();

      // Call the `intentCreationCallback` with the client secret.
      intentCreationCallback({ clientSecret });
    } catch (error) {
      // Call the `intentCreationCallback` with the error.
      intentCreationCallback({ error: (error as IntentCreationError) });
    }
  }, []);

  const intentConfig: IntentConfiguration = {
    mode: {
      currencyCode: 'USD',
    },
    confirmHandler: handleConfirm,
  };

  // The rest of your component code

  return (
    // Your component
  );
}
```

### (Optional) Clear the selected payment option

If you have payment options external to the Embedded Payment Element, you might need to clear the selected payment option. To do this, use the `clearPaymentOption` function provided by the `useEmbeddedPaymentElement` hook to deselect the currently selected payment option.

```jsx
function MyCheckoutComponent() {
  // The rest of your component code
  const handleDeselectPaymentMethod = useCallback(() => {
    clearPaymentOption();
  }, [clearPaymentOption]);

  // The rest of your component code
}
```

## Set up a return URL (iOS Only) [Client-side]

When a customer exits your app (for example to authenticate in Safari or their banking app), provide a way for them to automatically return to your app. Many payment method types *require* a return URL. If you don’t provide one, we can’t present payment methods that require a return URL to your users, even if you’ve enabled them.

To provide a return URL:

1. [Register](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app#Register-your-URL-scheme) a custom URL. Universal links aren’t supported.
1. [Configure](https://reactnative.dev/docs/linking) your custom URL.
1. Set up your root component to forward the URL to the Stripe SDK as shown below.

> If you’re using Expo, [set your scheme](https://docs.expo.io/guides/linking/#in-a-standalone-app) in the `app.json` file.

```jsx
import { useEffect, useCallback } from 'react';
import { Linking } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

export default function MyApp() {
  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  return (
    <View>
      <AwesomeAppComponent />
    </View>
  );
}
```

For more information on native URL schemes, refer to the [Android](https://developer.android.com/training/app-links/deep-linking) and [iOS](https://developer.apple.com/documentation/xcode/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app) docs.

## Create a SetupIntent [Server-side]

On your server, create a *SetupIntent* (The Setup Intents API lets you build dynamic flows for collecting payment method details for future payments. It tracks the lifecycle of a payment setup flow and can trigger additional authentication steps if required by law or by the payment method). You can manage payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods). Stripe evaluates payment method restrictions and other parameters to determine the list of supported payment methods.

If the call succeeds, return the SetupIntent *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)). If the call fails, [handle the error](https://docs.stripe.com/error-handling.md) and return an error message with a brief explanation for your customer.

> Verify that all IntentConfiguration properties match your SetupIntent (for example, [usage](https://docs.stripe.com/api/setup_intents/object.md#setup_intent_object-usage)).

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    customer: ..., # The Customer ID you previously created
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::SetupIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'customer': customer['id'],
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.SetupIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'customer' => $customer->id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->setupIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      customer: ... // The Customer ID you previously created
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.setupIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.SetupIntent;
import com.stripe.param.SetupIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      SetupIntentCreateParams.Builder paramsBuilder =
        SetupIntentCreateParams
          .builder()
          .setCustomer(customer.getId()) // The Customer ID you previously created
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            SetupIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          )
      SetupIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        SetupIntent setupIntent = SetupIntent.create(params);
        map.put("client_secret", setupIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/setupintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationTokenID string `json:"confirmation_token_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.SetupIntentParams{
      Customer: stripe.String(c.ID), // The Customer ID you previously created
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.SetupIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := setupintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new SetupIntentCreateOptions()
      {
        Customer = customer.Id, // The Customer ID you previously created
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new SetupIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new SetupIntentService();
      try
      {
        SetupIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token_id")]
      public string ConfirmationTokenId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```

## Charge the saved payment method later [Server-side]

> When you save a `bancontact` or `ideal` payment method, it generates and saves a `sepa_debit` reusable payment method instead of the original method. To query for the saved method, you need to use `sepa_debit`, not `bancontact` or `ideal`.

> #### Compliance
> 
> You’re responsible for your compliance with all applicable laws, regulations, and network rules when saving a customer’s payment details. When rendering past payment methods to your end customer for future purchases, make sure you’re listing payment methods where you’ve collected consent from the customer to save the payment method details for this specific future use. To differentiate between payment methods attached to customers that can and can’t be presented to your end customer as a saved payment method for future purchases, use the [allow_redisplay](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-allow_redisplay) parameter.

When you’re ready to charge your customer *off-session* (A payment is described as off-session if it occurs without the direct involvement of the customer, using previously-collected payment information), use the Customer and PaymentMethod IDs to create a PaymentIntent. To find a payment method to charge, list the payment methods associated with your customer. This example lists cards but you can list any supported [type](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-type).

```curl
curl -G https://api.stripe.com/v1/payment_methods \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer="{{CUSTOMER_ID}}" \
  -d type=card
```

```cli
stripe payment_methods list  \
  --customer="{{CUSTOMER_ID}}" \
  --type=card
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

payment_methods = client.v1.payment_methods.list({
  customer: '{{CUSTOMER_ID}}',
  type: 'card',
})
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

# For SDK versions 12.4.0 or lower, remove '.v1' from the following line.
payment_methods = client.v1.payment_methods.list({
  "customer": "{{CUSTOMER_ID}}",
  "type": "card",
})
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$paymentMethods = $stripe->paymentMethods->all([
  'customer' => '{{CUSTOMER_ID}}',
  'type' => 'card',
]);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

PaymentMethodListParams params =
  PaymentMethodListParams.builder()
    .setCustomer("{{CUSTOMER_ID}}")
    .setType(PaymentMethodListParams.Type.CARD)
    .build();

// For SDK versions 29.4.0 or lower, remove '.v1()' from the following line.
StripeCollection<PaymentMethod> stripeCollection =
  client.v1().paymentMethods().list(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const paymentMethods = await stripe.paymentMethods.list({
  customer: '{{CUSTOMER_ID}}',
  type: 'card',
});
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.PaymentMethodListParams{
  Customer: stripe.String("{{CUSTOMER_ID}}"),
  Type: stripe.String(stripe.PaymentMethodTypeCard),
}
result := sc.V1PaymentMethods.List(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new PaymentMethodListOptions
{
    Customer = "{{CUSTOMER_ID}}",
    Type = "card",
};
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.PaymentMethods;
StripeList<PaymentMethod> paymentMethods = service.List(options);
```

When you have the Customer and PaymentMethod IDs, create a PaymentIntent with the amount and currency of the payment. Set a few other parameters to make the off-session payment:

- Set [off_session](https://docs.stripe.com/api/payment_intents/confirm.md#confirm_payment_intent-off_session) to `true` to indicate that the customer isn’t in your checkout flow during a payment attempt and can’t fulfill an authentication request made by a partner, such as a card issuer, bank, or other payment institution. If, during your checkout flow, a partner requests authentication, Stripe requests exemptions using customer information from a previous *on-session* (A payment is described as on-session if it occurs while the customer is actively in your checkout flow and able to authenticate the payment method) transaction. If the conditions for exemption aren’t met, the PaymentIntent might throw an error.
- Set the value of the PaymentIntent’s [confirm](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-confirm) property to `true`, which causes confirmation to occur immediately when the PaymentIntent is created.
- Set [payment_method](https://docs.stripe.com/api.md#create_payment_intent-payment_method) to the ID of the PaymentMethod and [customer](https://docs.stripe.com/api.md#create_payment_intent-customer) to the ID of the Customer.

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

#### Stripe CLI

```bash
stripe payment_intents create \
  --amount=1099 \
  --currency=gbp \
  -d "automatic_payment_methods[enabled]"=true \
 # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.--customer={{CUSTOMER_ID}} \
  --payment-method={{PAYMENT_METHOD_ID}} \
  --return-url="https://example.com/order/123/complete" \
  --off-session=true \
  --confirm=true
```

#### Ruby

```ruby

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

begin
  intent = Stripe::PaymentIntent.create({
    amount: 1099,
    currency: 'gbp',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: '{{CUSTOMER_ID}}',
    payment_method: '{{PAYMENT_METHOD_ID}}',
    return_url: 'https://example.com/order/123/complete',
    off_session: true,
    confirm: true,
  })
rescue Stripe::CardError => e
  # Error code will be authentication_required if authentication is needed
  puts "Error is: \#{e.error.code}"
  payment_intent_id = e.error.payment_intent.id
  payment_intent = Stripe::PaymentIntent.retrieve(payment_intent_id)
  puts payment_intent.id
end
```

#### Python

```python

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
stripe.api_key = '<<YOUR_SECRET_KEY>>'

try:
  stripe.PaymentIntent.create(
    amount=1099,
    currency='gbp',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods={"enabled": True},customer='{{CUSTOMER_ID}}',
    payment_method='{{PAYMENT_METHOD_ID}}',
    return_url='https://example.com/order/123/complete',
    off_session=True,
    confirm=True,
  )
except stripe.error.CardError as e:
  err = e.error
  # Error code will be authentication_required if authentication is needed
  print("Code is: %s" % err.code)
  payment_intent_id = err.payment_intent['id']
  payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
```

#### PHP

```php

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
\Stripe\Stripe::setApiKey('<<YOUR_SECRET_KEY>>');

try {
  \Stripe\PaymentIntent::create([
    'amount' => 1099,
    'currency' => 'gbp',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],'customer' => '{{CUSTOMER_ID}}',
    'payment_method' => '{{PAYMENT_METHOD_ID}}',
    'return_url' => 'https://example.com/order/123/complete',
    'off_session' => true,
    'confirm' => true,
  ]);
} catch (\Stripe\Exception\CardException $e) {
  // Error code will be authentication_required if authentication is needed
  echo 'Error code is:' . $e->getError()->code;
  $payment_intent_id = $e->getError()->payment_intent->id;
  $payment_intent = \Stripe\PaymentIntent::retrieve($payment_intent_id);
}
```

#### Java

```java

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

PaymentIntentCreateParams params =
  PaymentIntentCreateParams.builder()
    .setCurrency("gbp")
    .setAmount(1099)
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    .setAutomaticPaymentMethods(
      PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
    ).setCustomer("{{CUSTOMER_ID}}")
    .setPaymentMethod("{{PAYMENT_METHOD_ID}}")
    .setReturnUrl("https://example.com/order/123/complete")
    .setConfirm(true)
    .setOffSession(true)
    .build();
try {
  PaymentIntent.create(params);
} catch (CardException e) {
  // Error code will be authentication_required if authentication is needed
  System.out.println("Error code is : " + e.getCode());
  String paymentIntentId = e.getStripeError().getPaymentIntent().getId();
  PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
  System.out.println(paymentIntent.getId());
}
```

#### Node.js

```javascript

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'gbp',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},customer: '{{CUSTOMER_ID}}',
    payment_method: '{{PAYMENT_METHOD_ID}}',
    return_url: 'https://example.com/order/123/complete',
    off_session: true,
    confirm: true,
  });
} catch (err) {
  // Error code will be authentication_required if authentication is needed
  console.log('Error code is: ', err.code);
  const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
  console.log('PI retrieved: ', paymentIntentRetrieved.id);
}
```

#### Go

```go

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
stripe.Key = "<<YOUR_SECRET_KEY>>"

params := &stripe.PaymentIntentParams{
  Amount: stripe.Int64(1099),
  Currency: stripe.String(string(stripe.CurrencyGBP)),
  // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
  AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
    Enabled: stripe.Bool(true),
  },Customer: stripe.String("{{CUSTOMER_ID}}"),
  PaymentMethod: stripe.String("{{PAYMENT_METHOD_ID}}"),
  ReturnUrl: stripe.String("https://example.com/order/123/complete"),
  Confirm: stripe.Bool(true),
  OffSession: stripe.Bool(true),
}

_, err := paymentintent.New(params)

if err != nil {
  if stripeErr, ok := err.(*stripe.Error); ok {
    // Error code will be authentication_required if authentication is needed
    fmt.Printf("Error code: %v", stripeErr.Code)

    paymentIntentID := stripeErr.PaymentIntent.ID
    paymentIntent, _ := paymentintent.Get(paymentIntentID, nil)

    fmt.Printf("PI: %v", paymentIntent.ID)
  }
}
```

#### .NET

```dotnet

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>";

try
{
  var service = new PaymentIntentService();
  var options = new PaymentIntentCreateOptions
  {
    Amount = 1099,
    Currency = "gbp",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
    {
        Enabled = true,
    },Customer = "{{CUSTOMER_ID}}",
    PaymentMethod = "{{PAYMENT_METHOD_ID}}",
    ReturnUrl = "https://example.com/order/123/complete",
    Confirm = true,
    OffSession = true,
  };
  service.Create(options);
}
catch (StripeException e)
{
  switch (e.StripeError.Type)
  {
    case "card_error":
      // Error code will be authentication_required if authentication is needed
      Console.WriteLine("Error code: " + e.StripeError.Code);
      var paymentIntentId = e.StripeError.PaymentIntent.Id;
      var service = new PaymentIntentService();
      var paymentIntent = service.Get(paymentIntentId);

      Console.WriteLine(paymentIntent.Id);
      break;
    default:
      break;
  }
}
```

## Test the integration

#### Cards

| Card number         | Scenario                                                                                                                                                                                                                                                                                      | How to test                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 4242424242424242    | The card payment succeeds and doesn’t require authentication.                                                                                                                                                                                                                                 | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000002500003155    | The card payment requires *authentication* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase). | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000000000009995    | The card is declined with a decline code like `insufficient_funds`.                                                                                                                                                                                                                           | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 6205500000000000004 | The UnionPay card has a variable length of 13-19 digits.                                                                                                                                                                                                                                      | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |

#### Bank redirects

| Payment method    | Scenario                                                                                                                                                                                        | How to test                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bancontact, iDEAL | Your customer fails to authenticate on the redirect page for a redirect-based and immediate notification payment method.                                                                        | Choose any redirect-based payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page. |
| Pay by Bank       | Your customer successfully pays with a redirect-based and [delayed notification](https://docs.stripe.com/payments/payment-methods.md#payment-notification) payment method.                      | Choose the payment method, fill out the required details, and confirm the payment. Then click **Complete test payment** on the redirect page.            |
| Pay by Bank       | Your customer fails to authenticate on the redirect page for a redirect-based and delayed notification payment method.                                                                          | Choose the payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page.                |
| BLIK              | BLIK payments fail in a variety of ways—immediate failures (for example, the code is expired or invalid), delayed errors (the bank declines) or timeouts (the customer didn’t respond in time). | Use email patterns to [simulate the different failures.](https://docs.stripe.com/payments/blik/accept-a-payment.md#simulate-failures)                    |

#### Bank debits

| Payment method    | Scenario                                                                                          | How to test                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEPA Direct Debit | Your customer successfully pays with SEPA Direct Debit.                                           | Fill out the form using the account number `AT321904300235473204`. The confirmed PaymentIntent initially transitions to processing, then transitions to the succeeded status three minutes later. |
| SEPA Direct Debit | Your customer’s payment intent status transitions from `processing` to `requires_payment_method`. | Fill out the form using the account number `AT861904300235473202`.                                                                                                                                |

See [Testing](https://docs.stripe.com/testing.md) for additional information to test your integration.

## Optional: Enable saved cards [Server-side] [Client-side]

EmbeddedPaymentElement can display a **Save this card for future use** checkbox that saves the customer’s card. It can also display the customer’s saved cards. To enable this checkbox, the customer must have an associated [Customer](https://docs.stripe.com/api/customers.md) object on your server. To enable a checkbox that allows the customer to save their card, create a [CustomerSession](https://docs.stripe.com/api/customer_sessions.md) with `payment_method_save` set to `enabled`.

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const customerSession = await stripe.customerSessions.create({
    customer: customer.id,
      mobile_payment_element: {
        enabled: true,
        features: {
          payment_method_save: 'enabled',
          payment_method_redisplay: 'enabled',
          payment_method_remove: 'enabled'
        }
      },
  });

  res.json({
    customerSessionClientSecret: customerSession.client_secret,
    customer: customer.id,
  });
});
```

Next, configure EmbeddedPaymentElement with the Customer’s ID and the CustomerSession client secret.

```jsx
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  merchantDisplayName: "Example, Inc.",
  customerId: customer,
  customerSessionClientSecret: customerSessionClientSecret,
  ...
};
```

## Optional: Allow delayed payment methods [Client-side]

*Delayed payment methods* (A payment method that can't immediately return payment status when a customer attempts a transaction (for example, ACH debits). Businesses commonly hold an order in a pending state until payment is successful with these payment methods) don’t guarantee that you’ll receive funds from your customer at the end of checkout. That’s because they take time to settle (for example, US Bank Accounts, SEPA Debit, iDEAL, Bancontact, and Sofort) or because they require customer action to complete (for example, OXXO, Konbini, and Boleto).

By default, `EmbeddedPaymentElement` doesn’t display delayed payment methods. To display them, when you initialize `EmbeddedPaymentElementConfiguration`, set `allowsDelayedPaymentMethods` to true.

```jsx
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
// Other EmbeddedPaymentElementConfiguration remains the same
    allowsDelayedPaymentMethods: true,
};
```

If the customer successfully uses one of these delayed payment methods in `EmbeddedPaymentElement`, the payment result returned is `.completed`.

## Optional: Enable Apple Pay

### Register for an Apple Merchant ID

Obtain an Apple Merchant ID by [registering for a new identifier](https://developer.apple.com/account/resources/identifiers/add/merchant) on the Apple Developer website.

Fill out the form with a description and identifier. Your description is for your own records and you can modify it in the future. Stripe recommends using the name of your app as the identifier (for example, `merchant.com.{{YOUR_APP_NAME}}`).

### Create a new Apple Pay certificate

Create a certificate for your app to encrypt payment data.

Go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard, click **Add new application**, and follow the guide.

Download a Certificate Signing Request (CSR) file to get a secure certificate from Apple that allows you to use Apple Pay.

One CSR file must be used to issue exactly one certificate. If you switch your Apple Merchant ID, you must go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard to obtain a new CSR and certificate.

### Integrate with Xcode

Add the Apple Pay capability to your app. In Xcode, open your project settings, click the **Signing & Capabilities** tab, and add the **Apple Pay** capability. You might be prompted to log in to your developer account at this point. Select the merchant ID you created earlier, and your app is ready to accept Apple Pay.
![](https://b.stripecdn.com/docs-statics-srv/assets/xcode.a701d4c1922d19985e9c614a6f105bf1.png)

Enable the Apple Pay capability in Xcode

### Add Apple Pay

#### One-time payment

Pass your merchant ID when you create `StripeProvider`:

```javascript
import { StripeProvider } from '@stripe/stripe-react-native';

function App() {
  return (
    <StripeProvider
      publishableKey="<<YOUR_PUBLISHABLE_KEY>>"
      merchantIdentifier="MERCHANT_ID"
    >
      // Your app code here
    </StripeProvider>
  );
}
```

When you initialize `EmbeddedPaymentElementConfiguration`, pass in your [ApplePayParams](https://stripe.dev/stripe-react-native/api-reference/modules/PaymentSheet.html#ApplePayParams):

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  applePay: {
    merchantCountryCode: 'US',
  },
};
```

#### Recurring payments

When you initialize `EmbeddedPaymentElementConfiguration`, pass in an [ApplePayParams](https://stripe.dev/stripe-react-native/api-reference/modules/PaymentSheet.html#ApplePayParams) with `merchantCountryCode` set to the country code of your business.

In accordance with [Apple’s guidelines](https://developer.apple.com/design/human-interface-guidelines/apple-pay#Supporting-subscriptions) for recurring payments, you must also set a `cardItems` that includes a [RecurringCartSummaryItem](https://stripe.dev/stripe-react-native/api-reference/modules/ApplePay.html#RecurringCartSummaryItem) with the amount you intend to charge (for example, “$59.95 a month”).

You can also adopt [merchant tokens](https://developer.apple.com/apple-pay/merchant-tokens/) by setting the `request` with its `type` set to `PaymentRequestType.Recurring`

To learn more about how to use recurring payments with Apple Pay, see [Apple’s PassKit documentation](https://developer.apple.com/documentation/passkit/pkpaymentrequest).

#### iOS (React Native)

```javascript
const initialize = useCallback(() => {
  const recurringSummaryItem = {
    label: 'My Subscription',
    amount: '59.99',
    paymentType: 'Recurring',
    intervalCount: 1,
    intervalUnit: 'month',
    // Payment starts today
    startDate: new Date().getTime() / 1000,

    // Payment ends in one year
    endDate: new Date().getTime() / 1000 + 60 * 60 * 24 * 365,
  };

  const embeddedConfig: EmbeddedPaymentElementConfiguration = {
    // ...
    applePay: {
      merchantCountryCode: 'US',
      cartItems: [recurringSummaryItem],
      request: {
        type: PaymentRequestType.Recurring,
        description: 'Recurring',
        managementUrl: 'https://my-backend.example.com/customer-portal',
        billing: recurringSummaryItem,
        billingAgreement:
          "You'll be billed $59.99 every month for the next 12 months. To cancel at any time, go to Account and click 'Cancel Membership.'",
      },
    },
  };
});
```

### Order tracking

To add [order tracking](https://developer.apple.com/design/human-interface-guidelines/technologies/wallet/designing-order-tracking) information in iOS 16 or later, configure a `setOrderTracking` callback function. Stripe calls your implementation after the payment is complete, but before iOS dismisses the Apple Pay sheet.

In your implementation of `setOrderTracking` callback function, fetch the order details from your server for the completed order, and pass the details to the provided `completion` function.

To learn more about order tracking, see [Apple’s Wallet Orders documentation](https://developer.apple.com/documentation/walletorders).

#### iOS (React Native)

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  applePay: {
    // ...
    setOrderTracking: async complete => {
      const apiEndpoint =
        Platform.OS === 'ios'
          ? 'http://localhost:4242'
          : 'http://10.0.2.2:4567';
      const response = await fetch(
        `${apiEndpoint}/retrieve-order?orderId=${orderId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        const orderDetails = await response.json();
        // orderDetails should include orderIdentifier, orderTypeIdentifier,
        // authenticationToken and webServiceUrl
        complete(orderDetails);
      }
    },
  },
};
```

## Optional: Enable Google Pay

### Set up your integration

To use Google Pay, first enable the Google Pay API by adding the following to the `<application>` tag of your **AndroidManifest.xml**:

```xml
<application>
  ...
  <meta-data
    android:name="com.google.android.gms.wallet.api.enabled"
    android:value="true" />
</application>
```

For more details, see Google Pay’s [Set up Google Pay API](https://developers.google.com/pay/api/android/guides/setup) for Android.

### Add Google Pay

When you initialize `EmbeddedPaymentElement`, set `merchantCountryCode` to the country code of your business and set `googlePay` to true.

You can also use the test environment by passing the `testEnv` parameter. You can only test Google Pay on a physical Android device. Follow the [React Native docs](https://reactnative.dev/docs/running-on-device) to test your application on a physical device.

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  googlePay: {
    merchantCountryCode: 'US',
    testEnv: true, // use test environment
  },
};
```

## Optional: Enable card scanning

To enable card scanning support for iOS, set the `NSCameraUsageDescription` (**Privacy - Camera Usage Description**) in the `Info.plist` of your application, and provide a reason for accessing the camera (for example, “To scan cards”). Devices with iOS 13 or higher support card scanning.

To enable card scanning support for Android, [request production access](https://developers.google.com/pay/api/android/guides/test-and-deploy/request-prod-access) to the Google Pay API from the [Google Pay and Wallet Console](https://pay.google.com/business/console?utm_source=devsite&utm_medium=devsite&utm_campaign=devsite).

- If you’ve enabled Google Pay, the card scanning feature is automatically available in our UI on eligible devices. To learn more about eligible devices, see the [Google Pay API constraints](https://developers.google.com/pay/payment-card-recognition/debit-credit-card-recognition)
- **Important:** The card scanning feature only appears in builds signed with the same signing key registered in the [Google Pay & Wallet Console](https://pay.google.com/business/console). Test or debug builds using different signing keys (for example, builds distributed through Firebase App Tester) won’t show the **Scan card** option. To test card scanning in pre-release builds, you must either:
  - Sign your test builds with your production signing key
  - Add your test signing key fingerprint to the Google Pay and Wallet Console

## Optional: Customize the sheet

All customization is configured using `EmbeddedPaymentElementConfiguration`.

### Appearance

Customize colors, fonts, and so on to match the look and feel of your app by using the [appearance API](https://docs.stripe.com/elements/appearance-api.md?platform=react-native).

### Merchant display name

Specify a customer-facing business name by setting `merchantDisplayName`. By default, this is your app’s name.

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  merchantDisplayName: 'Example Inc.',
};
```

### Dark mode

By default, `EmbeddedPaymentElement` automatically adapts to the user’s system-wide appearance settings (light and dark mode). You can change this by setting the `style` property to `alwaysLight` or `alwaysDark` mode on iOS.

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  style: 'alwaysDark',
};
```

On Android, set light or dark mode on your app:

```
// force dark
AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
// force light
AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
```

### Default billing details

To set default values for billing details collected in the EmbeddedPaymentElement, configure the `defaultBillingDetails` property. The `EmbeddedPaymentElement` pre-populates its fields with the values that you provide.

```javascript
const uiConfig: EmbeddedPaymentElementConfiguration = {  
  // ...
  defaultBillingDetails: {
      email: 'foo@bar.com',
      address: {
        country: 'US',
      },
  },
};
```

### Collect billing details

Use `billingDetailsCollectionConfiguration` to specify how you want to collect billing details in the `EmbeddedPaymentElement`.

You can collect your customer’s name, email, phone number, and address.

If you don’t intend to collect the values that the payment method requires, you must do the following:

1. Attach the values that aren’t collected by `EmbeddedPaymentElement` to the `defaultBillingDetails` property.
1. Set `billingDetailsCollectionConfiguration.attachDefaultsToPaymentMethod` to `true`.

```javascript
const newElementConfig: EmbeddedPaymentElementConfiguration = {  
  // ...
  defaultBillingDetails: {
    email: 'foo@bar.com',
  }
  billingDetailsCollectionConfiguration: {
    name: PaymentSheet.CollectionMode.ALWAYS,
    email: PaymentSheet.CollectionMode.NEVER,
    address: PaymentSheet.AddressCollectionMode.FULL,
    attachDefaultsToPaymentMethod: true
  },
};
```

> Consult with your legal counsel regarding laws that apply to collecting information. Only collect phone numbers if you need them for the transaction.


# Accept a payment and save the payment method

> This is a Accept a payment and save the payment method for when platform is react-native and type is paymentsfu. View the full page at https://docs.stripe.com/payments/mobile/accept-payment-embedded?platform=react-native&type=paymentsfu.

Use the [Payment Intents API](https://docs.stripe.com/api/payment_intents.md) to save payment details from a purchase. There are several use cases:

- Charge a customer for an e-commerce order and store the details for future purchases.
- Initiate the first payment of a series of recurring payments.
- Charge a deposit and store the details to charge the full amount later.

> #### Card-present transactions
> 
> Card-present transactions, such as payments through Stripe Terminal, use a different process for saving the payment method. For details, see [the Terminal documentation](https://docs.stripe.com/terminal/features/saving-payment-details/save-after-payment.md).

## Compliance

You’re responsible for your compliance with all applicable laws, regulations, and network rules when saving a customer’s payment details. These requirements generally apply if you want to save your customer’s payment method for future use, such as displaying a customer’s payment method to them in the checkout flow for a future purchase or charging them when they’re not actively using your website or app. Add terms to your website or app that state how you plan to save payment method details and allow customers to opt in.

When you save a payment method, you can only use it for the specific usage you have included in your terms. To charge a payment method when a customer is offline and save it as an option for future purchases, make sure that you explicitly collect consent from the customer for this specific use. For example, include a “Save my payment method for future use” checkbox to collect consent.

To charge them when they’re offline, make sure your terms include the following:

- The customer’s agreement to your initiating a payment or a series of payments on their behalf for specified transactions.
- The anticipated timing and frequency of payments (for example, if the charges are for scheduled installments, subscription payments, or unscheduled top-ups).
- How you determine the payment amount.
- Your cancellation policy, if the payment method is for a subscription service.

Make sure you keep a record of your customer’s written agreement to these terms.

> [SCA regulation](https://docs.stripe.com/strong-customer-authentication.md) requires that you authenticate your customer up front if you intend to collect payments from them again in the future. The cardholder’s bank may decline future payments and ask for additional authentication if the customer never authenticated initially.

## Set up Stripe [Server-side] [Client-side]

### Server-side 

This integration requires endpoints on your server that talk to the Stripe API. Use our official libraries for access to the Stripe API from your server:

#### Ruby

```bash
# Available as a gem
sudo gem install stripe
```

```ruby
# If you use bundler, you can add this line to your Gemfile
gem 'stripe'
```

#### Python

```bash
# Install through pip
pip3 install --upgrade stripe
```

```bash
# Or find the Stripe package on http://pypi.python.org/pypi/stripe/
```

```python
# Find the version you want to pin:
# https://github.com/stripe/stripe-python/blob/master/CHANGELOG.md
# Specify that version in your requirements.txt file
stripe>=5.0.0
```

#### PHP

```bash
# Install the PHP library with Composer
composer require stripe/stripe-php
```

```bash
# Or download the source directly: https://github.com/stripe/stripe-php/releases
```

#### Java

```java
/*
  For Gradle, add the following dependency to your build.gradle and replace with
  the version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
*/
implementation "com.stripe:stripe-java:31.3.0"
```

```xml
<!--
  For Maven, add the following dependency to your POM and replace with the
  version number you want to use from:
  - https://mvnrepository.com/artifact/com.stripe/stripe-java or
  - https://github.com/stripe/stripe-java/releases/latest
-->
<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>31.3.0</version>
</dependency>
```

```bash
# For other environments, manually install the following JARs:
# - The Stripe JAR from https://github.com/stripe/stripe-java/releases/latest
# - Google Gson from https://github.com/google/gson
```

#### Node.js

```bash
# Install with npm
npm install stripe --save
```

#### Go

```bash
# Make sure your project is using Go Modules
go mod init
# Install stripe-go
go get -u github.com/stripe/stripe-go/v84
```

```go
// Then import the package
import (
  "github.com/stripe/stripe-go/v84"
)
```

#### .NET

```bash
# Install with dotnet
dotnet add package Stripe.net
dotnet restore
```

```bash
# Or install with NuGet
Install-Package Stripe.net
```

### Client-side 

The [React Native SDK](https://github.com/stripe/stripe-react-native) is open source and fully documented. Internally, it uses the [native iOS](https://github.com/stripe/stripe-ios) and [Android](https://github.com/stripe/stripe-android) SDKs. To install Stripe’s React Native SDK, run one of the following commands in your project’s directory (depending on which package manager you use):

#### yarn

```bash
yarn add @stripe/stripe-react-native
```

#### npm

```bash
npm install @stripe/stripe-react-native
```

Next, install some other necessary dependencies:

- For iOS, go to the **ios** directory and run `pod install` to ensure that you also install the required native dependencies.
- For Android, there are no more dependencies to install.

> We recommend following the [official TypeScript guide](https://reactnative.dev/docs/typescript#adding-typescript-to-an-existing-project) to add TypeScript support.

### Stripe initialization

To initialize Stripe in your React Native app, either wrap your payment screen with the `StripeProvider` component, or use the `initStripe` initialization method. Only the API [publishable key](https://docs.stripe.com/keys.md#obtain-api-keys) in `publishableKey` is required. The following example shows how to initialize Stripe using the `StripeProvider` component.

```jsx
import { useState, useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

function App() {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    const key = await fetchKey(); // fetch key from your server here
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      {/* Your app code here */}
    </StripeProvider>
  );
}
```

> Use your API [test keys](https://docs.stripe.com/keys.md#obtain-api-keys) while you test and develop, and your [live mode](https://docs.stripe.com/keys.md#test-live-modes) keys when you publish your app.

## Enable payment methods

View your [payment methods settings](https://dashboard.stripe.com/settings/payment_methods) and enable the payment methods you want to support. You need at least one payment method enabled to create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods).

By default, Stripe enables cards and other prevalent payment methods that can help you reach more customers, but we recommend turning on additional payment methods that are relevant for your business and customers. See [Payment method support](https://docs.stripe.com/payments/payment-methods/payment-method-support.md) for product and payment method support, and our [pricing page](https://stripe.com/pricing/local-payment-methods) for fees.

## Collect payment details [Client-side]

### Initialize the Embedded Payment Element

Use the `useEmbeddedPaymentElement` hook to create and display the Embedded Payment Element in your React Native app. This hook requires two configuration objects:

- `EmbeddedPaymentElementConfiguration`: General settings (for example, `returnURL`).
- `IntentConfiguration`: Payment-specific details (for example, amount, currency, and a `confirmHandler` callback).

The hook returns an object with the `embeddedPaymentElementView` React component and other helper methods. For a full list of options and return values, see the [Stripe React Native SDK docs](https://stripe.dev/stripe-react-native/api-reference/interfaces/UseEmbeddedPaymentElementResult.html).

> Implementing `confirmHandler` is required, but for this step you can leave it as an empty function and implement it later.

```jsx
import { useState, useCallback, useEffect } from 'react';
import {
  useEmbeddedPaymentElement,
  IntentConfiguration,
  EmbeddedPaymentElementConfiguration,
  IntentCreationCallbackParams,
} from '@stripe/stripe-react-native';

function MyCheckoutComponent() {
  const [intentConfig, setIntentConfig] = useState<IntentConfiguration | null>(null);
  const [elementConfig, setElementConfig] = useState<EmbeddedPaymentElementConfiguration | null>(null);

  const initialize = useCallback(() => {
    const newIntentConfig: IntentConfiguration = {
      mode: {
        amount: 1099,
        currencyCode: 'USD',
          setupFutureUse: 'OffSession',
      },
      confirmHandler: async (
        confirmationToken,
        callback: (params: IntentCreationCallbackParams) => void
      ) => {
	 // You'll implement this in the "Confirm the payment" section below
      },
    };

    const newElementConfig: EmbeddedPaymentElementConfiguration = {
      merchantDisplayName: 'Your Business Name',
      returnURL: 'your-app://stripe-redirect',
    };

    setIntentConfig(newIntentConfig);
    setElementConfig(newElementConfig);
  }, []);

  const {
    embeddedPaymentElementView,
    paymentOption,
    confirm,
    update,
    clearPaymentOption,
    loadingError,
    isLoaded,
  } = useEmbeddedPaymentElement(
    intentConfig!,
    elementConfig!
  );

  useEffect(() => {
    initialize();
  }, [initialize]);
}
```

### Add the Embedded Payment Element view

After the `useEmbeddedPaymentElement` hook has successfully initialized, include the `embeddedPaymentElementView` in your component to display the Embedded Payment Element in your checkout UI.

> If `isLoaded` never becomes `true`, verify that `embeddedPaymentElementView` remains in your component’s render tree at all times. On Android, the native view must be mounted for initialization to complete. Use opacity to control visibility instead of conditionally rendering the view, as shown in the example below.

```jsx
import { View, Text, ActivityIndicator } from 'react-native';

function MyCheckoutComponent() {
   // Other component code remains the same

  return (
    <View>
      {/* Handle loading errors through the loadingError property */}
      {loadingError && (
        <View>
          <Text>Failed to load payment form: {loadingError.message || String(loadingError)}</Text>
        </View>
      )}
      {/* Keep the view in the render tree for Android, control visibility with opacity */}
      <View style={{ opacity: isLoaded ? 1 : 0 }}>
        {embeddedPaymentElementView}
      </View>
      {/* Show loading indicator while the view is loading */}
      {!loadingError && !isLoaded && (
        <View style={{ paddingVertical: 16, alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}
```

Now you can run your app and see the Embedded Mobile Payment Element.

### (Optional) Display the selected payment option

The `useEmbeddedPaymentElement` hook provides a `paymentOption` property in its return object. You can use this to access details about the customer’s selected payment option, such as a label (for example, “····4242”), image (for example, a VISA logo), or billing details to display in your UI.

The `paymentOption` property is reactive, meaning it automatically updates when the selected payment option changes. You don’t need to implement a separate delegate method. Instead, you can use this property directly in your component, and React re-renders the component whenever the `paymentOption` changes.

```jsx
import { View, Text, Image } from 'react-native';

function MyCheckoutComponent() {
  // Other component code remains the same

  return (
    // Other component code remains the same
    // Display the currently selected payment option (label and image)
    <View style={{ paddingVertical: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {paymentOption?.image && (
          <Image
            source={{ uri: `data:image/png;base64,${paymentOption.image}` }}
            style={{ width: 32, height: 20 }}
            resizeMode="contain"
          />
        )}
        <Text>
          Selected: {paymentOption?.label ?? 'None'}
        </Text>
      </View>
    </View>
  );
}
```

### (Optional) Update payment details

As the customer performs actions that change the payment details (for example, applying a discount code), update the `EmbeddedPaymentElement` instance to reflect the new values by calling the update method. Some payment methods, like Apple Pay and Google Pay, show the amount in the UI, so make sure it’s always accurate and up to date.

When the update call completes, update your UI. The update call might change the customer’s currently selected payment option.

> Always use `await` when calling the `update` API to ensure loading states are properly sequenced. Without `await`, the loading indicator may disappear before the update completes.

```jsx
import { useState, useCallback } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';

function MyCheckoutComponent() {
  // Other component code remains the same
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = useCallback(async () => {
    // Create a new IntentConfiguration object with updated values
    const updatedIntentConfig: IntentConfiguration = {
      ...intentConfig!,

        mode: {
          amount: 999, // Updated amount after applying discount code
          currencyCode: 'USD',
            setupFutureUse: 'OffSession',
        },
    };

    setIsUpdating(true);
    try {
      await update(updatedIntentConfig);
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error during update:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [intentConfig, update]);

  // Example of how to use the handleUpdate function
  const applyDiscountCode = useCallback(async (discountCode: string) => {
    // Validate discount code with your server
    try {
      const response = await fetch('https://your-server.com/apply-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discountCode }),
      });

      if (response.ok) {
        // Update the intent configuration with the new amount
        await handleUpdate();
      }
    } catch (error) {
      console.error('Failed to apply discount:', error);
    }
  }, [handleUpdate]);

  return (
    <View>
      {/* Hide view and show loading indicator during update */}
      <View style={{ opacity: isUpdating ? 0 : 1 }}>
        {embeddedPaymentElementView}
      </View>
      {isUpdating && (
        <View style={{ paddingVertical: 16, alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
      <Button
        title="Apply Discount Code"
        onPress={() => applyDiscountCode('123456')}
        disabled={isUpdating}
      />
    </View>
  );
}
```

### Confirm the payment

When the customer taps the checkout button, call the `confirm()` method provided by the `useEmbeddedPaymentElement` hook to complete the payment. Make sure to disable user interaction during the confirmation process to prevent multiple submissions or interfering actions.

```jsx
import { useCallback, useState } from 'react';
import { View, Button, Alert, ActivityIndicator } from 'react-native';

function MyCheckoutComponent() {
  // Other component code remains the same.

  const [isProcessing, setIsProcessing] = useState(false);
  const { confirm } = useEmbeddedPaymentElement(intentConfig!, elementConfig!);

  const handleSubmit = useCallback(async () => {
    setIsProcessing(true); // Disable user interaction, show a spinner.

    try {
      const result = await confirm();

      switch (result.status) {
        case 'completed':
          // Payment completed - show a confirmation screen.
          Alert.alert('Success', 'Payment was completed successfully!');
          break;
        case 'failed':
          // Encountered an unrecoverable error. You can display the error to the user, log it, and so on.
          Alert.alert('Error', `Payment failed: ${result.error.message}`);
          break;
        case 'canceled':
          // Customer canceled - you should probably do nothing.
          console.log('Payment was canceled by the user');
          break;
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error during confirmation:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsProcessing(false); // Re-enable user interaction, hide spinner.
    }
  }, [confirm]);

  // The rest of the component code.

  return (
    <View>
      {/* Other UI elements */}

      <Button
        title="Confirm Payment"
        onPress={handleSubmit}
        disabled={isProcessing || !paymentOption}
      />

      {isProcessing && <ActivityIndicator size="large" />}
    </View>
  );
}
```

Next, implement the `confirmHandler` callback you passed to the `IntentConfiguration` earlier to send a request to your server. Your server creates a `PaymentIntent` and returns its client secret. For more information about this process, see [Creating a PaymentIntent](https://docs.stripe.com/payments/payment-intents.md#creating-a-paymentintent).

When the server request returns, call the `intentCreationCallback` with either your server response’s client secret or an error. The Embedded Payment Element confirms the `PaymentIntent` using the client secret or displays a localized error message in its UI. After confirmation completes, the Embedded Payment Element becomes unusable. At this point, navigate the user to a receipt screen or similar confirmation page in your app.

```jsx
function MyCheckoutComponent() {
  const handleConfirm = useCallback(async (
    confirmationToken,
    intentCreationCallback: (params: IntentCreationCallbackParams) => void
  ) => {
    try {
      // Make a request to your own server and receive a client secret or an error.
      const response = await fetch('https://your-server.com/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirmation_token_id: confirmationToken.id,
          // Add any other necessary data.
        }),
      });

      if (!response.ok) {
        throw new Error('Server response was not ok');
      }

      const { clientSecret } = await response.json();

      // Call the `intentCreationCallback` with the client secret.
      intentCreationCallback({ clientSecret });
    } catch (error) {
      // Call the `intentCreationCallback` with the error.
      intentCreationCallback({ error: (error as IntentCreationError) });
    }
  }, []);

  const intentConfig: IntentConfiguration = {
    mode: {
      amount: 1099,
      currencyCode: 'USD',
      setupFutureUse: 'OffSession',
    },
    confirmHandler: handleConfirm,
  };

  // The rest of your component code

  return (
    // Your component
  );
}
```

### (Optional) Clear the selected payment option

If you have payment options external to the Embedded Payment Element, you might need to clear the selected payment option. To do this, use the `clearPaymentOption` function provided by the `useEmbeddedPaymentElement` hook to deselect the currently selected payment option.

```jsx
function MyCheckoutComponent() {
  // The rest of your component code
  const handleDeselectPaymentMethod = useCallback(() => {
    clearPaymentOption();
  }, [clearPaymentOption]);

  // The rest of your component code
}
```

## Set up a return URL (iOS Only) [Client-side]

When a customer exits your app (for example to authenticate in Safari or their banking app), provide a way for them to automatically return to your app. Many payment method types *require* a return URL. If you don’t provide one, we can’t present payment methods that require a return URL to your users, even if you’ve enabled them.

To provide a return URL:

1. [Register](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app#Register-your-URL-scheme) a custom URL. Universal links aren’t supported.
1. [Configure](https://reactnative.dev/docs/linking) your custom URL.
1. Set up your root component to forward the URL to the Stripe SDK as shown below.

> If you’re using Expo, [set your scheme](https://docs.expo.io/guides/linking/#in-a-standalone-app) in the `app.json` file.

```jsx
import { useEffect, useCallback } from 'react';
import { Linking } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

export default function MyApp() {
  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  return (
    <View>
      <AwesomeAppComponent />
    </View>
  );
}
```

For more information on native URL schemes, refer to the [Android](https://developer.android.com/training/app-links/deep-linking) and [iOS](https://developer.apple.com/documentation/xcode/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app) docs.

## Create a PaymentIntent [Server-side]

On your server, create a *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods) with an amount and currency. You can manage payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods). Stripe handles the return of eligible payment methods based on factors such as the transaction’s amount, currency, and payment flow. To prevent malicious customers from choosing their own prices, always decide how much to charge on the server-side (a trusted environment) and not the client.

If the call succeeds, return the PaymentIntent *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)). If the call fails, [handle the error](https://docs.stripe.com/error-handling.md) and return an error message with a brief explanation for your customer.

> Verify that all IntentConfiguration properties match your PaymentIntent (for example, `setup_future_usage`, `amount`, and `currency`).

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    customer: ..., # The Customer ID you previously created
    amount: 1099,
    currency: 'usd',
    setup_future_usage: 'off_session',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'customer': customer['id'],
      'amount': 1099,
      'currency': 'usd',
      'setup_future_usage': 'off_session',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'customer' => $customer->id,
    'amount' => 1099,
    'currency' => 'usd',
    'setup_future_usage' => 'off_session',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      customer: ... // The Customer ID you previously created
      setup_future_usage: 'off_session',
      customer: ... // The Customer ID you previously created
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setCustomer(customer.getId()) // The Customer ID you previously created
          .setAmount(1099L)
          .setCurrency("usd")
          .setSetupFutureUsage(PaymentIntentCreateParams.SetupFutureUsage.OFF_SESSION)
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          )
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationTokenID string `json:"confirmation_token_id"`
      ShouldSavePaymentMethod bool `json:"should_save_payment_method"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Customer: stripe.String(c.ID), // The Customer ID you previously created
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      SetupFutureUsage: stripe.String("off_session"),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Customer = customer.Id, // The Customer ID you previously created
        Amount = 1099,
        Currency = "usd",
        SetupFutureUsage: "off_session",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token_id")]
      public string ConfirmationTokenId { get; set; }
      [JsonProperty("should_save_payment_method")]
      public bool ShouldSavePaymentMethod { get; set; }
    }
  }
}
```

## Handle post-payment events [Server-side]

Stripe sends a [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md#event_types-payment_intent.succeeded) event when the payment completes. Use the [Dashboard webhook tool](https://dashboard.stripe.com/webhooks) or follow the [webhook guide](https://docs.stripe.com/webhooks/quickstart.md) to receive these events and run actions, such as sending an order confirmation email to your customer, logging the sale in a database, or starting a shipping workflow.

Listen for these events rather than waiting on a callback from the client. On the client, the customer could close the browser window or quit the app before the callback executes, and malicious clients could manipulate the response. Setting up your integration to listen for asynchronous events is what enables you to accept [different types of payment methods](https://stripe.com/payments/payment-methods-guide) with a single integration.

In addition to handling the `payment_intent.succeeded` event, we recommend handling these other events when collecting payments with the Payment Element:

| Event                                                                                                                           | Description                                                                                                                                                                                                                                                                         | Action                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.succeeded)           | Sent when a customer successfully completes a payment.                                                                                                                                                                                                                              | Send the customer an order confirmation and *fulfill* (Fulfillment is the process of providing the goods or services purchased by a customer, typically after payment is collected) their order. |
| [payment_intent.processing](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.processing)         | Sent when a customer successfully initiates a payment, but the payment has yet to complete. This event is most commonly sent when the customer initiates a bank debit. It’s followed by either a `payment_intent.succeeded` or `payment_intent.payment_failed` event in the future. | Send the customer an order confirmation that indicates their payment is pending. For digital goods, you might want to fulfill the order before waiting for payment to complete.                  |
| [payment_intent.payment_failed](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.payment_failed) | Sent when a customer attempts a payment, but the payment fails.                                                                                                                                                                                                                     | If a payment transitions from `processing` to `payment_failed`, offer the customer another attempt to pay.                                                                                       |

## Test the integration

#### Cards

| Card number         | Scenario                                                                                                                                                                                                                                                                                      | How to test                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 4242424242424242    | The card payment succeeds and doesn’t require authentication.                                                                                                                                                                                                                                 | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000002500003155    | The card payment requires *authentication* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase). | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 4000000000009995    | The card is declined with a decline code like `insufficient_funds`.                                                                                                                                                                                                                           | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |
| 6205500000000000004 | The UnionPay card has a variable length of 13-19 digits.                                                                                                                                                                                                                                      | Fill out the credit card form using the credit card number with any expiration, CVC, and postal code. |

#### Bank redirects

| Payment method    | Scenario                                                                                                                                                                                        | How to test                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bancontact, iDEAL | Your customer fails to authenticate on the redirect page for a redirect-based and immediate notification payment method.                                                                        | Choose any redirect-based payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page. |
| Pay by Bank       | Your customer successfully pays with a redirect-based and [delayed notification](https://docs.stripe.com/payments/payment-methods.md#payment-notification) payment method.                      | Choose the payment method, fill out the required details, and confirm the payment. Then click **Complete test payment** on the redirect page.            |
| Pay by Bank       | Your customer fails to authenticate on the redirect page for a redirect-based and delayed notification payment method.                                                                          | Choose the payment method, fill out the required details, and confirm the payment. Then click **Fail test payment** on the redirect page.                |
| BLIK              | BLIK payments fail in a variety of ways—immediate failures (for example, the code is expired or invalid), delayed errors (the bank declines) or timeouts (the customer didn’t respond in time). | Use email patterns to [simulate the different failures.](https://docs.stripe.com/payments/blik/accept-a-payment.md#simulate-failures)                    |

#### Bank debits

| Payment method    | Scenario                                                                                          | How to test                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEPA Direct Debit | Your customer successfully pays with SEPA Direct Debit.                                           | Fill out the form using the account number `AT321904300235473204`. The confirmed PaymentIntent initially transitions to processing, then transitions to the succeeded status three minutes later. |
| SEPA Direct Debit | Your customer’s payment intent status transitions from `processing` to `requires_payment_method`. | Fill out the form using the account number `AT861904300235473202`.                                                                                                                                |

See [Testing](https://docs.stripe.com/testing.md) for additional information to test your integration.

## Optional: Set SetupFutureUsage on individual payment methods (Preview) [Server-side] [Client-side]

For more granularity, set `setupFutureUsage` for specific payment methods with [PaymentSheet.IntentConfiguration.Mode.PaymentMethodOptions](https://github.com/stripe/stripe-react-native/blob/2062b16b039259d77105a940bd9637cdc2ca9ac1/src/types/PaymentSheet.ts#L585).

```jsx
import { useState, useCallback, useEffect } from 'react';
import {
  useEmbeddedPaymentElement,
  IntentConfiguration,
  EmbeddedPaymentElementConfiguration,
  IntentCreationCallbackParams,
} from '@stripe/stripe-react-native';

function MyCheckoutComponent() {
  const [intentConfig, setIntentConfig] = useState<IntentConfiguration | null>(null);
  const [elementConfig, setElementConfig] = useState<EmbeddedPaymentElementConfiguration | null>(null);

  const initialize = useCallback(() => {
    const newIntentConfig: IntentConfiguration = {
      mode: {
        amount: 1099,
        currencyCode: 'USD',paymentMethodOptions: {
          setupFutureUsageValues: {
            card: 'OffSession',
            cashapp: 'OnSession',
          },
        },
      },
      confirmHandler: (confirmationToken, intentCreationCallback) => {
        // Handle ConfirmationToken...
      },
    };

    const newElementConfig: EmbeddedPaymentElementConfiguration = {
      merchantDisplayName: 'Your Business Name',
      returnURL: 'your-app://stripe-redirect',
    };

    setIntentConfig(newIntentConfig);
    setElementConfig(newElementConfig);
  }, []);

  const {
    embeddedPaymentElementView,
    paymentOption,
    confirm,
    update,
    clearPaymentOption,
    loadingError,
  } = useEmbeddedPaymentElement(
    intentConfig!,
    elementConfig!
  );

  useEffect(() => {
    initialize();
  }, [initialize]);
}
```

Learn more about [the `setupFutureUsage` values](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-payment_method_options) that are supported for each payment method.

Next, make sure your server doesn’t set `setup_future_usage` or `payment_method_options[X][setup_future_usage]` on the PaymentIntent. The SDK automatically handles setting it based on the `IntentConfiguration`.

#### Ruby

```ruby
require 'stripe'
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

post '/create-intent' do
  data = JSON.parse request.body.read
  params = {
    amount: 1099,
    currency: 'usd',
    confirmation_token: data['confirmation_token'],
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled: true},
  }
  begin
    intent = Stripe::PaymentIntent.create(params)
    {client_secret: intent.client_secret}.to_json
  rescue Stripe::StripeError => e
    {error: e.error.message}.to_json
  end
end
```

#### Python

```python
import stripe
from flask import Flask, jsonify
app = Flask(__name__)
stripe.api_key = "<<YOUR_SECRET_KEY>>"

@app.route('/create-intent', methods=['POST'])
def createIntent():
  try:
    data = json.loads(request.data)
    params = {
      'amount': 1099,
      'currency': 'usd',
      'confirmation_token': data['confirmation_token'],
      # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      'automatic_payment_methods': {
        'enabled': True,
      },
    }
    intent = stripe.PaymentIntent.create(**params)
    return jsonify(client_secret=intent.client_secret)
  except stripe.error.CardError as e:
    return jsonify(error=e.user_message), 400
  except Exception as e:
    return jsonify(error=str(e)), 400
```

#### PHP

```php
<?php
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);
  $stripe = new \Stripe\StripeClient("<<YOUR_SECRET_KEY>>");
  $params = [
    'amount' => 1099,
    'currency' => 'usd',
    'confirmation_token' => $jsonObj->confirmation_token,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => ['enabled' => true],
  ];
  $intent = $stripe->paymentIntents->create($params);
  echo json_encode(array('client_secret' => $intent->client_secret));
} catch(\Stripe\Exception\CardException $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getError()->message]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
```

#### Node.js

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      confirmation_token: req.body.confirmation_token,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

#### Java

```java
import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import com.google.gson.Gson;

import static spark.Spark.post;

public class StripeJavaQuickStart {
  public static void main(String[] args) {
    Gson gson = new Gson();
    Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

    post("/create-intent", (request, response) -> {
      JsonObject postBody = new JsonParser().parse(request.body()).getAsJsonObject();
      PaymentIntentCreateParams.Builder paramsBuilder =
        PaymentIntentCreateParams
          .builder()
          .setAmount(1099L)
          .setCurrency("usd")
          .setConfirmationToken(postBody.get("confirmation_token").getAsString())
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
          );
      PaymentIntentCreateParams params = paramsBuilder.build();

      Map<String, String> map = new HashMap();
      try {
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        map.put("client_secret", paymentIntent.getClientSecret());
      } catch (CardException e) {
        map.put("error", e.getUserMessage());
      } catch (Exception e) {
        map.put("error", e.getMessage());
      }
      return map;
    }, gson::toJson);
  }
}
```

#### Go

```go
package main

import (
  "encoding/json"
  "net/http"

  "github.com/stripe/stripe-go/v76.0.0"
  "github.com/stripe/stripe-go/v76.0.0/paymentintent"
)

type CheckoutData struct {
  ClientSecret string `json:"client_secret"`
}

func main() {
  stripe.Key = "<<YOUR_SECRET_KEY>>"

  http.HandleFunc("/create-intent", func(w http.ResponseWriter, r *http.Request) {
    var req struct {
      ConfirmationToken string `json:"confirmation_token"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      log.Printf("json.NewDecoder.Decode: %v", err)
      return
    }
    params := &stripe.PaymentIntentParams{
      Amount: stripe.Int64(1099),
      Currency: stripe.String(string(stripe.CurrencyUSD)),
      ConfirmationToken: stripe.String(req.ConfirmationToken),
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
        Enabled: stripe.Bool(true),
      },
    }
    intent, err := paymentintent.New(params);
    if err == nil {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      data := CheckoutData{
        ClientSecret: intent.ClientSecret,
      }
      json.NewEncoder(w).Encode(data)
    } else {
      if stripeErr, ok := err.(*stripe.Error); ok {
        switch stripeErr.Type {
          case stripe.ErrorTypeCard:
            http.Error(w, stripeErr.Msg, http.StatusInternalServerError)
          default:
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
      } else {
        http.Error(w, err.Error(), http.StatusInternalServerError)
      }
    }
  })

  http.ListenAndServe(":4242", nil)
}
```

#### .NET

```csharp
using System;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace StripeExampleApi.Controllers
{
  [Route("create-intent")]
  [ApiController]
  public class CheckoutApiController : Controller
  {
    public CheckoutApiController()
    {
      StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>"
    }

    [HttpPost]
    public ActionResult Post(IntentCreateRequest request)
    {
      var options = new PaymentIntentCreateOptions()
      {
        Amount = 1099,
        Currency = "usd",
        ConfirmationToken = request.ConfirmationToken,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };
      var service = new PaymentIntentService();
      try
      {
        PaymentIntent intent = service.Create(options);
        return Json(new { client_secret = intent.ClientSecret });
      }
      catch (StripeException e)
      {
        this.HttpContext.Response.StatusCode = 400;
        switch (e.StripeError.Type)
        {
          case "card_error":
            return Json(new { error = e.Message }); // For card errors, the message can be shown to your users
          default:
            return Json(new { error = e.Message }); // Other errors may not be localized
        }
      }
    }

    public class IntentCreateRequest
    {
      [JsonProperty("confirmation_token")]
      public string ConfirmationToken { get; set; }
    }
  }
}
```

## Optional: Enable saved cards [Server-side] [Client-side]

EmbeddedPaymentElement can display a **Save this card for future use** checkbox that saves the customer’s card. It can also display the customer’s saved cards. To enable this checkbox, the customer must have an associated [Customer](https://docs.stripe.com/api/customers.md) object on your server. To enable a checkbox that allows the customer to save their card, create a [CustomerSession](https://docs.stripe.com/api/customer_sessions.md) with `payment_method_save` set to `enabled`.

```javascript
const stripe = require("stripe")("<<YOUR_SECRET_KEY>>");
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const customerSession = await stripe.customerSessions.create({
    customer: customer.id,
      mobile_payment_element: {
        enabled: true,
        features: {
          payment_method_save: 'enabled',
          payment_method_redisplay: 'enabled',
          payment_method_remove: 'enabled'
        }
      },
  });

  res.json({
    customerSessionClientSecret: customerSession.client_secret,
    customer: customer.id,
  });
});
```

Next, configure EmbeddedPaymentElement with the Customer’s ID and the CustomerSession client secret.

```jsx
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  merchantDisplayName: "Example, Inc.",
  customerId: customer,
  customerSessionClientSecret: customerSessionClientSecret,
  ...
};
```

## Optional: Allow delayed payment methods [Client-side]

*Delayed payment methods* (A payment method that can't immediately return payment status when a customer attempts a transaction (for example, ACH debits). Businesses commonly hold an order in a pending state until payment is successful with these payment methods) don’t guarantee that you’ll receive funds from your customer at the end of checkout. That’s because they take time to settle (for example, US Bank Accounts, SEPA Debit, iDEAL, Bancontact, and Sofort) or because they require customer action to complete (for example, OXXO, Konbini, and Boleto).

By default, `EmbeddedPaymentElement` doesn’t display delayed payment methods. To display them, when you initialize `EmbeddedPaymentElementConfiguration`, set `allowsDelayedPaymentMethods` to true.

```jsx
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
// Other EmbeddedPaymentElementConfiguration remains the same
    allowsDelayedPaymentMethods: true,
};
```

If the customer successfully uses one of these delayed payment methods in `EmbeddedPaymentElement`, the payment result returned is `.completed`.

## Optional: Enable Apple Pay

### Register for an Apple Merchant ID

Obtain an Apple Merchant ID by [registering for a new identifier](https://developer.apple.com/account/resources/identifiers/add/merchant) on the Apple Developer website.

Fill out the form with a description and identifier. Your description is for your own records and you can modify it in the future. Stripe recommends using the name of your app as the identifier (for example, `merchant.com.{{YOUR_APP_NAME}}`).

### Create a new Apple Pay certificate

Create a certificate for your app to encrypt payment data.

Go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard, click **Add new application**, and follow the guide.

Download a Certificate Signing Request (CSR) file to get a secure certificate from Apple that allows you to use Apple Pay.

One CSR file must be used to issue exactly one certificate. If you switch your Apple Merchant ID, you must go to the [iOS Certificate Settings](https://dashboard.stripe.com/settings/ios_certificates) in the Dashboard to obtain a new CSR and certificate.

### Integrate with Xcode

Add the Apple Pay capability to your app. In Xcode, open your project settings, click the **Signing & Capabilities** tab, and add the **Apple Pay** capability. You might be prompted to log in to your developer account at this point. Select the merchant ID you created earlier, and your app is ready to accept Apple Pay.
![](https://b.stripecdn.com/docs-statics-srv/assets/xcode.a701d4c1922d19985e9c614a6f105bf1.png)

Enable the Apple Pay capability in Xcode

### Add Apple Pay

#### One-time payment

Pass your merchant ID when you create `StripeProvider`:

```javascript
import { StripeProvider } from '@stripe/stripe-react-native';

function App() {
  return (
    <StripeProvider
      publishableKey="<<YOUR_PUBLISHABLE_KEY>>"
      merchantIdentifier="MERCHANT_ID"
    >
      // Your app code here
    </StripeProvider>
  );
}
```

When you initialize `EmbeddedPaymentElementConfiguration`, pass in your [ApplePayParams](https://stripe.dev/stripe-react-native/api-reference/modules/PaymentSheet.html#ApplePayParams):

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  applePay: {
    merchantCountryCode: 'US',
  },
};
```

#### Recurring payments

When you initialize `EmbeddedPaymentElementConfiguration`, pass in an [ApplePayParams](https://stripe.dev/stripe-react-native/api-reference/modules/PaymentSheet.html#ApplePayParams) with `merchantCountryCode` set to the country code of your business.

In accordance with [Apple’s guidelines](https://developer.apple.com/design/human-interface-guidelines/apple-pay#Supporting-subscriptions) for recurring payments, you must also set a `cardItems` that includes a [RecurringCartSummaryItem](https://stripe.dev/stripe-react-native/api-reference/modules/ApplePay.html#RecurringCartSummaryItem) with the amount you intend to charge (for example, “$59.95 a month”).

You can also adopt [merchant tokens](https://developer.apple.com/apple-pay/merchant-tokens/) by setting the `request` with its `type` set to `PaymentRequestType.Recurring`

To learn more about how to use recurring payments with Apple Pay, see [Apple’s PassKit documentation](https://developer.apple.com/documentation/passkit/pkpaymentrequest).

#### iOS (React Native)

```javascript
const initialize = useCallback(() => {
  const recurringSummaryItem = {
    label: 'My Subscription',
    amount: '59.99',
    paymentType: 'Recurring',
    intervalCount: 1,
    intervalUnit: 'month',
    // Payment starts today
    startDate: new Date().getTime() / 1000,

    // Payment ends in one year
    endDate: new Date().getTime() / 1000 + 60 * 60 * 24 * 365,
  };

  const embeddedConfig: EmbeddedPaymentElementConfiguration = {
    // ...
    applePay: {
      merchantCountryCode: 'US',
      cartItems: [recurringSummaryItem],
      request: {
        type: PaymentRequestType.Recurring,
        description: 'Recurring',
        managementUrl: 'https://my-backend.example.com/customer-portal',
        billing: recurringSummaryItem,
        billingAgreement:
          "You'll be billed $59.99 every month for the next 12 months. To cancel at any time, go to Account and click 'Cancel Membership.'",
      },
    },
  };
});
```

### Order tracking

To add [order tracking](https://developer.apple.com/design/human-interface-guidelines/technologies/wallet/designing-order-tracking) information in iOS 16 or later, configure a `setOrderTracking` callback function. Stripe calls your implementation after the payment is complete, but before iOS dismisses the Apple Pay sheet.

In your implementation of `setOrderTracking` callback function, fetch the order details from your server for the completed order, and pass the details to the provided `completion` function.

To learn more about order tracking, see [Apple’s Wallet Orders documentation](https://developer.apple.com/documentation/walletorders).

#### iOS (React Native)

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  applePay: {
    // ...
    setOrderTracking: async complete => {
      const apiEndpoint =
        Platform.OS === 'ios'
          ? 'http://localhost:4242'
          : 'http://10.0.2.2:4567';
      const response = await fetch(
        `${apiEndpoint}/retrieve-order?orderId=${orderId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        const orderDetails = await response.json();
        // orderDetails should include orderIdentifier, orderTypeIdentifier,
        // authenticationToken and webServiceUrl
        complete(orderDetails);
      }
    },
  },
};
```

## Optional: Enable Google Pay

### Set up your integration

To use Google Pay, first enable the Google Pay API by adding the following to the `<application>` tag of your **AndroidManifest.xml**:

```xml
<application>
  ...
  <meta-data
    android:name="com.google.android.gms.wallet.api.enabled"
    android:value="true" />
</application>
```

For more details, see Google Pay’s [Set up Google Pay API](https://developers.google.com/pay/api/android/guides/setup) for Android.

### Add Google Pay

When you initialize `EmbeddedPaymentElement`, set `merchantCountryCode` to the country code of your business and set `googlePay` to true.

You can also use the test environment by passing the `testEnv` parameter. You can only test Google Pay on a physical Android device. Follow the [React Native docs](https://reactnative.dev/docs/running-on-device) to test your application on a physical device.

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  googlePay: {
    merchantCountryCode: 'US',
    testEnv: true, // use test environment
  },
};
```

## Optional: Enable card scanning

To enable card scanning support for iOS, set the `NSCameraUsageDescription` (**Privacy - Camera Usage Description**) in the `Info.plist` of your application, and provide a reason for accessing the camera (for example, “To scan cards”). Devices with iOS 13 or higher support card scanning.

To enable card scanning support for Android, [request production access](https://developers.google.com/pay/api/android/guides/test-and-deploy/request-prod-access) to the Google Pay API from the [Google Pay and Wallet Console](https://pay.google.com/business/console?utm_source=devsite&utm_medium=devsite&utm_campaign=devsite).

- If you’ve enabled Google Pay, the card scanning feature is automatically available in our UI on eligible devices. To learn more about eligible devices, see the [Google Pay API constraints](https://developers.google.com/pay/payment-card-recognition/debit-credit-card-recognition)
- **Important:** The card scanning feature only appears in builds signed with the same signing key registered in the [Google Pay & Wallet Console](https://pay.google.com/business/console). Test or debug builds using different signing keys (for example, builds distributed through Firebase App Tester) won’t show the **Scan card** option. To test card scanning in pre-release builds, you must either:
  - Sign your test builds with your production signing key
  - Add your test signing key fingerprint to the Google Pay and Wallet Console

## Optional: Customize the sheet

All customization is configured using `EmbeddedPaymentElementConfiguration`.

### Appearance

Customize colors, fonts, and so on to match the look and feel of your app by using the [appearance API](https://docs.stripe.com/elements/appearance-api.md?platform=react-native).

### Merchant display name

Specify a customer-facing business name by setting `merchantDisplayName`. By default, this is your app’s name.

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  merchantDisplayName: 'Example Inc.',
};
```

### Dark mode

By default, `EmbeddedPaymentElement` automatically adapts to the user’s system-wide appearance settings (light and dark mode). You can change this by setting the `style` property to `alwaysLight` or `alwaysDark` mode on iOS.

```javascript
const embeddedConfig: EmbeddedPaymentElementConfiguration = {
  // ...
  style: 'alwaysDark',
};
```

On Android, set light or dark mode on your app:

```
// force dark
AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
// force light
AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
```

### Default billing details

To set default values for billing details collected in the EmbeddedPaymentElement, configure the `defaultBillingDetails` property. The `EmbeddedPaymentElement` pre-populates its fields with the values that you provide.

```javascript
const uiConfig: EmbeddedPaymentElementConfiguration = {  
  // ...
  defaultBillingDetails: {
      email: 'foo@bar.com',
      address: {
        country: 'US',
      },
  },
};
```

### Collect billing details

Use `billingDetailsCollectionConfiguration` to specify how you want to collect billing details in the `EmbeddedPaymentElement`.

You can collect your customer’s name, email, phone number, and address.

If you don’t intend to collect the values that the payment method requires, you must do the following:

1. Attach the values that aren’t collected by `EmbeddedPaymentElement` to the `defaultBillingDetails` property.
1. Set `billingDetailsCollectionConfiguration.attachDefaultsToPaymentMethod` to `true`.

```javascript
const newElementConfig: EmbeddedPaymentElementConfiguration = {  
  // ...
  defaultBillingDetails: {
    email: 'foo@bar.com',
  }
  billingDetailsCollectionConfiguration: {
    name: PaymentSheet.CollectionMode.ALWAYS,
    email: PaymentSheet.CollectionMode.NEVER,
    address: PaymentSheet.AddressCollectionMode.FULL,
    attachDefaultsToPaymentMethod: true
  },
};
```

> Consult with your legal counsel regarding laws that apply to collecting information. Only collect phone numbers if you need them for the transaction.
