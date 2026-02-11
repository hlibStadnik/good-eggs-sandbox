import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import StripePaymentElement from "../StripePaymentElement";
import { createCustomer as apiCreateCustomer } from "../api";

export default function PaymentScreen() {
  const [amount, setAmount] = useState("29.99");
  const [saveCard, setSaveCard] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerSessionClientSecret, setCustomerSessionClientSecret] =
    useState<string | null>(null);

  // Create a customer on component mount (in production, you'd get this from your auth system)
  useEffect(() => {
    createCustomer();
  }, []);

  const createCustomer = async () => {
    try {
      const data = await apiCreateCustomer({
        email: "customer@example.com",
        name: "Test Customer",
      });

      if (data.customer && data.customerSessionClientSecret) {
        setCustomerId(data.customer);
        setCustomerSessionClientSecret(data.customerSessionClientSecret);
      }
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
  };

  // Handle amount update
  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Stripe Payment</Text>

      {/* Amount Input */}
      <View style={styles.section}>
        <Text style={styles.label}>Amount (USD)</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={handleAmountChange}
          placeholder="29.99"
          keyboardType="decimal-pad"
        />
      </View>

      {/* Save Card Checkbox */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setSaveCard(!saveCard)}
        disabled={!customerId}
      >
        <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
          {saveCard && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>Save card for future use</Text>
      </TouchableOpacity>

      {/* Embedded Payment Element */}
      {customerId && customerSessionClientSecret ? (
        <StripePaymentElement
          amount={Math.floor(parseFloat(amount) * 100)} // Convert to cents
          currency="usd"
          customerId={customerId || ""}
          customerSessionClientSecret={customerSessionClientSecret || ""}
          saveCard={saveCard}
          onPaymentSuccess={() => {
            Alert.alert(
              "Payment Successful",
              saveCard
                ? "Your payment was processed successfully and card was saved!"
                : "Your payment was processed successfully!",
            );
            setAmount("29.99");
            setSaveCard(false);
          }}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
          Loading payment options...
        </Text>
      )}

      {/* Test Card Info */}
      <View style={styles.testInfo}>
        <Text style={styles.testLabel}>Test Card Numbers:</Text>
        <Text style={styles.testCard}>4242 4242 4242 4242 - Success</Text>
        <Text style={styles.testCard}>4000 0000 0000 3220 - 3D Secure</Text>
        <Text style={styles.testCard}>4000 0000 0000 9995 - Decline</Text>
        <Text style={styles.testNote}>Use any future date & any CVC</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
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
  testInfo: {
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: "#5469d4",
    padding: 16,
    borderRadius: 6,
    marginBottom: 20,
  },
  testLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  testCard: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
    fontFamily: "Courier New",
  },
  testNote: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
    fontStyle: "italic",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#5469d4",
    borderRadius: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#5469d4",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
});
