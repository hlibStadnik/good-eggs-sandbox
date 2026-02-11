import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import SubscriptionPaymentElement from "../SubscriptionPaymentElement";
import { createCustomer as apiCreateCustomer } from "../api";

interface Product {
  id: string;
  name: string;
  monthlyPrice: number;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Organic Vegetables Bundle",
    monthlyPrice: 2999, // $29.99 in cents
    description: "Fresh seasonal vegetables delivered monthly",
  },
  {
    id: "2",
    name: "Organic Fruits Selection",
    monthlyPrice: 2499, // $24.99 in cents
    description: "Assorted organic fruits every month",
  },
];

export default function ExploreScreen() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerSessionClientSecret, setCustomerSessionClientSecret] =
    useState<string | null>(null);

  // Create a customer on component mount
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

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.monthlyPrice * item.quantity,
      0,
    );
  };

  const cartTotal = calculateTotalPrice();

  const handleShowPayment = async () => {
    if (!customerId) {
      Alert.alert("Error", "Customer not initialized");
      return;
    }

    // No need to create subscription upfront - the confirmHandler will do it
    setShowPayment(true);
  };

  const handleSubscriptionSuccess = () => {
    Alert.alert(
      "Subscription Started!",
      "Your monthly subscription has been activated successfully!",
    );
    setCart([]);
    setShowPayment(false);
  };

  const renderProductCard = ({ item }: { item: Product }) => {
    const inCart = cart.find((cartItem) => cartItem.product.id === item.id);

    return (
      <View style={styles.productCard}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>
            ${(item.monthlyPrice / 100).toFixed(2)}/month
          </Text>
          <TouchableOpacity
            style={[styles.addButton, inCart && styles.addButtonActive]}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addButtonText}>
              {inCart ? "✓ In Cart" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.product.name}</Text>
        <Text style={styles.cartItemPrice}>
          ${(item.product.monthlyPrice / 100).toFixed(2)} × {item.quantity}
        </Text>
      </View>
      <View style={styles.cartItemControls}>
        <TouchableOpacity
          onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantityNumber}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => removeFromCart(item.product.id)}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (showPayment && customerId && customerSessionClientSecret) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Complete Your Subscription</Text>

        {/* Cart Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product.id}
            scrollEnabled={false}
          />
          <View style={styles.summaryTotal}>
            <Text style={styles.summaryLabel}>Monthly Total:</Text>
            <Text style={styles.summaryAmount}>
              ${(cartTotal / 100).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Subscription Payment Element */}
        <SubscriptionPaymentElement
          customerId={customerId}
          customerSessionClientSecret={customerSessionClientSecret}
          amount={cartTotal}
          productNames={cart.map((item) => item.product.name)}
          onPaymentSuccess={handleSubscriptionSuccess}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowPayment(false)}
        >
          <Text style={styles.backButtonText}>← Back to Products</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Monthly Subscription Box</Text>
      <Text style={styles.subtitle}>
        Choose products to receive monthly. Billed the same amount each month.
      </Text>

      {/* Products Section */}
      <Text style={styles.sectionTitle}>Available Products</Text>
      <FlatList
        data={PRODUCTS}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

      {/* Cart Summary */}
      {cart.length > 0 && (
        <View style={styles.cartSection}>
          <Text style={styles.cartTitle}>
            Your Subscription ({cart.length} items)
          </Text>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product.id}
            scrollEnabled={false}
          />
          <View style={styles.cartTotal}>
            <Text style={styles.cartTotalLabel}>Monthly Total:</Text>
            <Text style={styles.cartTotalAmount}>
              ${(cartTotal / 100).toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleShowPayment}
          >
            <Text style={styles.checkoutButtonText}>
              Set Up Monthly Subscription
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setCart([])}
          >
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
      )}

      {cart.length === 0 && (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>
            Add products to start your monthly subscription
          </Text>
        </View>
      )}
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
