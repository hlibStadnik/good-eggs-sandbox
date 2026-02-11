import React, { useMemo, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  EmbeddedPaymentElementConfiguration,
  IntentConfiguration,
  IntentCreationCallbackParams,
  useEmbeddedPaymentElement,
} from "@stripe/stripe-react-native";

interface SubscriptionPaymentElementProps {
  customerId: string;
  customerSessionClientSecret: string;
  amount: number;
  productNames: string[];
  onPaymentSuccess: () => void;
}

export default function SubscriptionPaymentElement({
  customerId,
  customerSessionClientSecret,
  amount,
  productNames,
  onPaymentSuccess,
}: SubscriptionPaymentElementProps) {
  const [confirming, setConfirming] = useState(false);

  const elementConfig = useMemo<EmbeddedPaymentElementConfiguration>(
    () => ({
      merchantDisplayName: "Good Eggs",
      customerId: customerId,
      customerSessionClientSecret: customerSessionClientSecret,
      googlePay: {
        testEnv: true,
        merchantCountryCode: "US",
        currencyCode: "USD",
      },
      applePay: {
        merchantCountryCode: "US",
      },
    }),
    [customerId, customerSessionClientSecret],
  );

  const handleConfirm = useCallback(
    async (
      confirmationToken: any,
      shouldSavePaymentMethod: boolean,
      intentCreationCallback: (params: IntentCreationCallbackParams) => void,
    ) => {
      console.log(
        "🚀 ~ SubscriptionPaymentElement ~ confirmationToken:",
        confirmationToken,
      );
      try {
        // Server creates a subscription with the confirmationToken
        const response = await fetch(
          "http://localhost:3000/create-subscription",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              confirmationToken: confirmationToken.id,
              customerId: customerId,
              amount: amount,
              productNames: productNames,
            }),
          },
        );

        if (response.ok) {
          const { clientSecret, subscriptionId } = await response.json();
          console.log(
            "🚀 ~ SubscriptionPaymentElement ~ clientSecret:",
            clientSecret,
          );
          console.log("✅ Subscription created:", subscriptionId);
          intentCreationCallback({ clientSecret: subscriptionId });
          //   intentCreationCallback({ clientSecret });
        } else {
          const errorData = await response.json();
          intentCreationCallback({
            error: {
              code: "Failed",
              message: errorData.error || "Failed to create subscription",
              localizedMessage:
                errorData.error || "Failed to create subscription",
            },
          });
        }
      } catch (error: any) {
        console.error(`Error in handleConfirm:`, error);
        intentCreationCallback({
          error: {
            code: "Failed",
            message: error.message || "Unknown error occurred",
            localizedMessage: error.message || "Unknown error occurred",
          },
        });
      }
    },
    [customerId, amount, productNames],
  );

  const intentConfig = useMemo<IntentConfiguration>(
    () => ({
      confirmHandler: handleConfirm,
      mode: {
        setupFutureUsage: "OffSession", // Important for subscriptions
        currencyCode: "USD",
      },
    }),
    [handleConfirm],
  );

  const {
    embeddedPaymentElementView,
    loadingError,
    paymentOption,
    confirm,
    clearPaymentOption,
    isLoaded,
  } = useEmbeddedPaymentElement(intentConfig, elementConfig);
  console.log("🚀 ~ SubscriptionPaymentElement ~ loadingError:", loadingError);

  // Handle payment confirmation
  const handlePayment = async () => {
    try {
      setConfirming(true);
      console.log("Confirming subscription payment...");

      const result = await confirm();
      console.log("Payment result:", result);

      if (result?.status === "completed") {
        Alert.alert("Success", "Subscription activated successfully!");
        onPaymentSuccess();
      } else if (result?.status === "canceled") {
        Alert.alert("Payment Canceled", "Subscription setup was canceled.");
      } else if (result?.status === "failed") {
        const errorMsg = result?.error?.message || "Payment processing failed.";
        console.error("Payment failed with error:", errorMsg);
        Alert.alert("Payment Failed", errorMsg);
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      console.error("Error message:", error?.message);
      console.error("Error code:", error?.code);
      Alert.alert("Error", error.message || "Payment processing failed.");
    } finally {
      setConfirming(false);
      clearPaymentOption?.();
    }
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5469d4" />
        <Text style={styles.loadingText}>Loading payment options...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.label}>Payment Method</Text>
        {embeddedPaymentElementView}
      </View>

      {/* Subscribe Button */}
      <TouchableOpacity
        style={[
          styles.payButton,
          (!isLoaded || confirming) && styles.payButtonDisabled,
        ]}
        onPress={handlePayment}
        disabled={!isLoaded || confirming}
      >
        {!isLoaded || confirming ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>Activate Subscription</Text>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  paymentOptionContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  paymentOptionLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  paymentOptionValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  payButton: {
    backgroundColor: "#5469d4",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
