import React, { useMemo, useCallback } from "react";
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
import { createPaymentIntent } from "./api";

interface StripePaymentElementProps {
  amount: number;
  currency: string;
  customerId: string;
  customerSessionClientSecret: string;
  saveCard: boolean;
  onPaymentSuccess: () => void;
}

export default function StripePaymentElement({
  amount,
  currency,
  customerId,
  customerSessionClientSecret,
  saveCard,
  onPaymentSuccess,
}: StripePaymentElementProps) {
  const elementConfig = useMemo<EmbeddedPaymentElementConfiguration>(
    () => ({
      merchantDisplayName: "Demo App",
      customerId: customerId,
      customerSessionClientSecret: customerSessionClientSecret,
      googlePay: {
        testEnv: true,
        merchantCountryCode: "US",
        currencyCode: "USD",
      },
      // applePay: {
      //   merchantCountryCode: "US",
      // },
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
        "🚀 ~ StripePaymentElement ~ confirmationToken:",
        confirmationToken,
      );
      try {
        const data = await createPaymentIntent({
          paymentMethodId: confirmationToken.id,
          amount,
          currency: "usd",
          setup_future_usage: shouldSavePaymentMethod
            ? "off_session"
            : undefined,
          confirmationTokenId: confirmationToken,
          customerId: customerId,
          saveCard: true,
        });

        if (!data.clientSecret) {
          throw new Error("No client secret returned from server");
        }

        console.log(`Calling callback with clientSecret`);
        intentCreationCallback({ clientSecret: data.clientSecret });
      } catch (error: any) {
        console.error(`Error in handleConfirm:`, error);
        intentCreationCallback({
          error: {
            code: "Failed",
            message: error.message || "Unknown error occurred",
            localizedMessage: error.message || "Unknown error occurred",
          } as IntentCreationError,
        });
      }
    },
    [amount],
  );

  const intentConfig = useMemo(
    () => ({
      confirmHandler: handleConfirm,
      mode: { amount: amount, currencyCode: "USD" },
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
  console.log("🚀 ~ StripePaymentElement ~ loadingError:", loadingError);

  // Handle payment confirmation
  const handlePayment = async () => {
    try {
      console.log("pay...");
      const result = await confirm();
      console.log("pay...after confirm");
      console.log("Payment result:", result);

      if (result.status === "completed") {
        Alert.alert("Success", "Payment completed successfully!");
        onPaymentSuccess();
      } else if (result.status === "canceled") {
        Alert.alert("Payment Canceled", "Payment was canceled.");
      } else if (result.status === "failed") {
        Alert.alert("Payment Failed", "Payment processing failed.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Payment processing failed.");
      console.error("Payment error:", error);
    } finally {
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

        {/* Display selected payment option */}
        {paymentOption && (
          <View style={styles.paymentOptionContainer}>
            <Text style={styles.paymentOptionLabel}>
              Selected Payment Method:
            </Text>
            <Text style={styles.paymentOptionValue}>{paymentOption.label}</Text>
          </View>
        )}
      </View>

      {/* Pay Button */}
      <TouchableOpacity
        style={[styles.payButton, !isLoaded && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={!isLoaded}
      >
        {!isLoaded ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>
            Pay {currency} {(amount / 100).toFixed(2)}
          </Text>
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
