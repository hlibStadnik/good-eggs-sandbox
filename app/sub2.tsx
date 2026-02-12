import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { createCustomer as apiCreateCustomer } from "../api";
import {
  EmbeddedPaymentElementConfiguration,
  IntentConfiguration,
  IntentCreationCallbackParams,
  useEmbeddedPaymentElement,
} from "@stripe/stripe-react-native";

const API_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

export default function ExploreScreen() {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerSessionClientSecret, setCustomerSessionClientSecret] =
    useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  // Create a customer session on mount
  useEffect(() => {
    initCustomerSession();
  }, []);

  const initCustomerSession = async () => {
    try {
      const data = await apiCreateCustomer({
        email: "customer@example.com",
        name: "Test Customer",
      });
      setCustomerId(data.customer);
      setCustomerSessionClientSecret(data.customerSessionClientSecret);
      console.log("🚀 ~ initCustomerSession ~ data:", data);
    } catch (error) {
      console.error("Failed to create customer session:", error);
    }
  };

  /**
   * confirmHandler - called when the user confirms payment.
   * Creates a subscription on the server, then passes the clientSecret
   * back to the SDK so it can finish confirming the underlying PaymentIntent.
   */
  const confirmHandler = useCallback(
    async (
      paymentMethod: any,
      shouldSavePaymentMethod: boolean,
      intentCreationCallback: (result: IntentCreationCallbackParams) => void,
    ) => {
      console.log("🚀 ~ confirmHandler ~ paymentMethod:", paymentMethod);
      console.log(
        "🚀 ~ confirmHandler ~ shouldSavePaymentMethod:",
        shouldSavePaymentMethod,
      );

      try {
        const response = await fetch(`${API_URL}/create-subscription`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId,
          }),
        });

        if (response.ok) {
          const { clientSecret, subscriptionId } = await response.json();
          console.log("✅ Subscription created:", subscriptionId);
          intentCreationCallback({ clientSecret });
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
        console.error("Error in confirmHandler:", error);
        intentCreationCallback({
          error: {
            code: "Failed",
            message: error.message || "Unknown error occurred",
            localizedMessage: error.message || "Unknown error occurred",
          },
        });
      }
    },
    [customerId],
  );

  const intentConfig: IntentConfiguration = useMemo(
    () => ({
      mode: {
        amount: 2499, // Must match the subscription price on the server (in cents)
        currencyCode: "USD",
        setupFutureUsage: "OffSession",
      },
      confirmHandler,
    }),
    [confirmHandler],
  );

  const configuration: EmbeddedPaymentElementConfiguration = useMemo(
    () => ({
      merchantDisplayName: "Good Eggs",
      returnURL: "stripe-example://payment-sheet",
      allowsDelayedPaymentMethods: true,
      customerId: customerId || "",
      customerSessionClientSecret: customerSessionClientSecret || "",
    }),
    [customerId, customerSessionClientSecret],
  );

  const {
    embeddedPaymentElementView,
    loadingError,
    isLoaded,
    confirm,
    paymentOption,
  } = useEmbeddedPaymentElement(intentConfig, configuration);

  console.log("🚀 ~ ExploreScreen ~ loadingError:", loadingError);

  const handleSubscribe = async () => {
    try {
      setConfirming(true);
      const result = await confirm();
      console.log("🚀 ~ handleSubscribe ~ result:", result);

      if (result?.status === "completed") {
        Alert.alert("Success", "Your subscription has been activated!");
      } else if (result?.status === "canceled") {
        Alert.alert("Canceled", "Subscription setup was canceled.");
      } else if (result?.status === "failed") {
        const errorMsg = result?.error?.message || "Payment processing failed.";
        console.error("Payment failed:", errorMsg);
        Alert.alert("Payment Failed", errorMsg);
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      Alert.alert("Error", error.message || "Payment processing failed.");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Monthly Subscription Box</Text>
      <Text style={styles.subtitle}>
        Choose products to receive monthly. Billed the same amount each month.
      </Text>

      {/* Payment Method Section */}
      <Text style={styles.sectionTitle}>Payment Method</Text>
      {isLoaded ? (
        embeddedPaymentElementView
      ) : (
        <ActivityIndicator size="large" color="#5469d4" />
      )}

      {paymentOption && (
        <Text style={{ marginTop: 8, color: "#666" }}>
          Selected: {paymentOption.label}
        </Text>
      )}

      <View style={styles.cartSection}>
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            (!isLoaded || confirming) && { opacity: 0.6 },
          ]}
          onPress={handleSubscribe}
          disabled={!isLoaded || confirming}
        >
          {confirming ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.checkoutButtonText}>
              Set Up Monthly Subscription
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    marginTop: 8,
    color: "#333",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
  },
  addButton: {
    backgroundColor: "#5469d4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonActive: {
    backgroundColor: "#27ae60",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  cartSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#666",
  },
  cartItemControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantityNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    minWidth: 24,
    textAlign: "center",
  },
  removeButton: {
    paddingLeft: 8,
  },
  removeButtonText: {
    color: "#e74c3c",
    fontSize: 12,
    fontWeight: "600",
  },
  cartTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: "#eee",
    marginBottom: 16,
  },
  cartTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  cartTotalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27ae60",
  },
  checkoutButton: {
    backgroundColor: "#5469d4",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  clearButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyCart: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#999",
  },
  infoSection: {
    backgroundColor: "#e8f4f8",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  summarySection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  summaryTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: "#eee",
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27ae60",
  },
  backButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  backButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
});
