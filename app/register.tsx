import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import {
  EmbeddedPaymentElementConfiguration,
  IntentConfiguration,
  useEmbeddedPaymentElement,
} from "@stripe/stripe-react-native";
import { createCustomer, createPaymentIntent } from "../api";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const defaultCustomer = {
  email: "customer@example.com",
  name: "Test Customer",
};

export default function RegisterScreen() {
  const router = useRouter();

  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerSessionClientSecret, setCustomerSessionClientSecret] =
    useState<string | null>(null);
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateCustomer = async () => {
    setError(null);
    setIsCreatingCustomer(true);

    try {
      const response = await createCustomer({
        email: defaultCustomer.email,
        name: defaultCustomer.name,
      });

      setCustomerId(response.customer);
      setCustomerSessionClientSecret(response.customerSessionClientSecret);
      setRegistrationComplete(false);
    } catch (err: any) {
      setError(err.message || "Failed to create account");
      Alert.alert("Error", err.message || "Failed to create account");
    } finally {
      setIsCreatingCustomer(false);
    }
  };

  // Payment Element Configuration
  const elementConfig = useMemo<EmbeddedPaymentElementConfiguration>(
    () => ({
      merchantDisplayName: "Good Eggs Sandbox",
      paymentOptions: {
        card: true,
        applePay: true,
        googlePay: true,
      },
      customerId: customerId || undefined,
      customerSessionClientSecret: customerSessionClientSecret || undefined,
      googlePay: {
        merchantCountryCode: "US",
        testEnv: true,
      },
      returnURL: "good-eggs-sandbox://stripe-redirect",
    }),
    [customerId, customerSessionClientSecret],
  );

  const handleConfirmationToken = useCallback(
    async (confirmationToken: any) => {
      console.log(
        "🚀 ~ RegisterScreen ~ confirmationToken:",
        confirmationToken,
      );
      try {
        if (!customerId) {
          throw new Error("Customer not initialized");
        }

        const data = await createPaymentIntent({
          amount: 0, // 0 amount for card setup only
          currency: "usd",
          paymentMethodId: confirmationToken.id,
          customerId: customerId,
          saveCard: true,
        });

        return data.clientSecret;
      } catch (error: any) {
        throw new Error(error.message || "Failed to save card");
      }
    },
    [customerId],
  );

  const intentConfig = useMemo<IntentConfiguration>(
    () => ({
      mode: {
        amount: 0,
        currencyCode: "usd",
      },
      confirmHandler: handleConfirmationToken,
    }),
    [handleConfirmationToken],
  );

  const { embeddedPaymentElementView, loadingError, isLoaded, confirm } =
    useEmbeddedPaymentElement(intentConfig, elementConfig);

  const handleSaveCard = async () => {
    if (!isLoaded) {
      Alert.alert("Error", "Payment element is still loading");
      return;
    }

    try {
      const result = await confirm();
      if (result?.status === "failed") {
        Alert.alert("Payment Error", "Failed to save card");
        return;
      }

      setRegistrationComplete(true);
      Alert.alert("Success", "Account created and card saved successfully!", [
        {
          text: "Go to Home",
          onPress: () => {
            router.replace("/");
          },
        },
      ]);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to save card");
    }
  };

  // Show payment element view if customer is created
  if (customerId && customerSessionClientSecret) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>Save Payment Method</Text>
          <Text style={styles.subtitle}>
            Add a card to complete your registration
          </Text>

          {loadingError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {loadingError.message || "Failed to load payment element"}
              </Text>
            </View>
          )}

          <View style={styles.paymentContainer}>
            {embeddedPaymentElementView}
          </View>

          <TouchableOpacity
            style={[styles.button, !isLoaded && styles.buttonDisabled]}
            onPress={handleSaveCard}
            disabled={!isLoaded || registrationComplete}
          >
            <Text style={styles.buttonText}>
              {registrationComplete
                ? "Account Created ✓"
                : "Complete Registration"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => {
              Alert.alert("Skip Card Setup?", "You can add a card later", [
                { text: "Cancel", onPress: () => {}, style: "cancel" },
                {
                  text: "Skip",
                  onPress: () => {
                    setRegistrationComplete(true);
                    router.replace("/");
                  },
                  style: "default",
                },
              ]);
            }}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // Show registration form
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Good Eggs today</Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
          <View style={styles.nameRow}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Name: {defaultCustomer.name}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email: {defaultCustomer.email}</Text>
          </View>

          <TouchableOpacity
            style={[styles.button, isCreatingCustomer && styles.buttonDisabled]}
            onPress={handleCreateCustomer}
            disabled={isCreatingCustomer}
          >
            {isCreatingCustomer ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Next: Add Payment Method</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Join Good Eggs and start shopping
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  header: {
    marginBottom: 32,
    marginTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  helperText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#00a3b7",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  skipButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  skipButtonText: {
    color: "#00a3b7",
    fontSize: 14,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00a3b7",
  },
  paymentContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  errorContainer: {
    backgroundColor: "#fee",
    borderLeftWidth: 4,
    borderLeftColor: "#f00",
    padding: 12,
    borderRadius: 4,
    marginBottom: 20,
  },
  errorText: {
    color: "#c00",
    fontSize: 14,
  },
});
