import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import StripePaymentElement from './StripePaymentElement';

export default function PaymentScreen() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('29.99');

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
          editable={!loading }
        />
      </View>

      {/* Embedded Payment Element */}
      <StripePaymentElement
        amount={Math.floor(parseFloat(amount) * 100)} // Convert to cents
        currency="usd"
        onPaymentSuccess={() => {
            Alert.alert('Payment Successful', 'Your payment was processed successfully!');
          setAmount('29.99');
        }}
        loading={loading}
        setLoading={setLoading}
      />

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
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  testInfo: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#5469d4',
    padding: 16,
    borderRadius: 6,
    marginBottom: 20,
  },
  testLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  testCard: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Courier New',
  },
  testNote: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
