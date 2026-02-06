import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51STqo9KCHAcCaB08iSlViuJ5Q0nIQLRiC9cASvFT6CdTC62W5gyKDFC306fOSts7xCD1xFN5xrPrStRWxr4ZAGNa00AhdmDckF';

export default function App() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <PaymentScreen />
        <StatusBar style="auto" />
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});
