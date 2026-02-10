import { Tabs } from "expo-router";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Text } from "react-native";

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51STqo9KCHAcCaB08iSlViuJ5Q0nIQLRiC9cASvFT6CdTC62W5gyKDFC306fOSts7xCD1xFN5xrPrStRWxr4ZAGNa00AhdmDckF";

export default function TabLayout() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#5469d4",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Payment",
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>💳</Text>,
          }}
        />
        <Tabs.Screen
          name="subscription"
          options={{
            title: "Subscription",
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🔍</Text>,
          }}
        />
        <Tabs.Screen
          name="register"
          options={{
            title: "Register",
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
          }}
        />
      </Tabs>
    </StripeProvider>
  );
}
