import React, { useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { IntentConfiguration, useEmbeddedPaymentElement } from '@stripe/stripe-react-native';

interface StripePaymentElementProps {
  amount: number;
  currency: string;
  onPaymentSuccess: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function StripePaymentElement({
  amount,
  currency,
  onPaymentSuccess,
  loading,
  setLoading,
}: StripePaymentElementProps) {
  const elementConfig = useMemo(
    () => ({
      merchantDisplayName: 'Good Eggs Sandbox',
      returnURL: 'stripe-example://payment-return',
    }),
    [],
  );

  const handleConfirmationToken = useCallback(async (confirmationToken: any) => {
    try {
      // Send request to server to create PaymentIntent
      const response = await fetch('http://localhost:3000/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          confirmationTokenId: confirmationToken.id,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      // Return the client secret from the server
      return data.client_secret;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to process payment');
    }
  }, [amount, currency]);

  const intentConfig = useMemo<IntentConfiguration>(
    () => ({
      mode: {
        amount,
        currencyCode: currency,
      },
      confirmHandler: handleConfirmationToken,
    }),
    [amount, currency, handleConfirmationToken],
  );

  const {
    embeddedPaymentElementView,
    paymentOption,
    confirm,
    clearPaymentOption,
    isLoaded,
  } = useEmbeddedPaymentElement(intentConfig, elementConfig);

  // Handle payment confirmation
  const handlePayment = async () => {
    if (!confirm) {
      Alert.alert('Error', 'Payment element not loaded');
      return;
    }

    setLoading(true);

    try {
      const result = await confirm();

      if (result.status === 'completed') {
        Alert.alert('Success', 'Payment completed successfully!');
        onPaymentSuccess();
        clearPaymentOption?.();
      } else if (result.status === 'canceled') {
        Alert.alert('Payment Canceled', 'Payment was canceled.');
      } else if (result.status === 'failed') {
        Alert.alert('Payment Failed', 'Payment processing failed.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Payment processing failed.');
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
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
            <Text style={styles.paymentOptionLabel}>Selected Payment Method:</Text>
            <Text style={styles.paymentOptionValue}>{paymentOption.label}</Text>
          </View>
        )}
      </View>

      {/* Pay Button */}
      <TouchableOpacity
        style={[styles.payButton, (loading || !isLoaded) && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={loading || !isLoaded}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>Pay {currency} {(amount / 100).toFixed(2)}</Text>
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
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
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
  paymentOptionContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  paymentOptionLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  paymentOptionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  payButton: {
    backgroundColor: '#5469d4',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
