import { useConfirmPayment } from "@stripe/stripe-react-native";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createKlarnaPaymentIntent } from "../api";

// Klarna simple PaymentIntent – DE / EUR
export default function KlarnaPaymentScreen() {
  const [email, setEmail] = useState("customer@email.de");
  const { confirmPayment, loading: confirmLoading } = useConfirmPayment();

  const handlePayPress = async () => {
    try {
      const { clientSecret } = await createKlarnaPaymentIntent();

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: "Klarna",
        paymentMethodData: {},
      });

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else if (paymentIntent) {
        Alert.alert(
          "Success",
          `Payment confirmed!\nCurrency: ${paymentIntent.currency}`,
        );
      }
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Something went wrong");
    } finally {
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pay with Klarna (DE / EUR)</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.button]}
        onPress={handlePayPress}
        accessibilityLabel="Pay with Klarna"
      >
        <Text style={styles.buttonText}>Pay with Klarna</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24,
    color: "#1a1a2e",
  },
  input: {
    height: 44,
    borderBottomColor: "#b0bec5",
    borderBottomWidth: 1.5,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#5469d4",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
