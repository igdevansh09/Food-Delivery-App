import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useCart } from "../../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

const Cart = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const { addOrder } = useCart();
  const { foodName, restaurantName, price } = route.params || {};

  if (!foodName) {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="cart-outline" size={80} color="#1a1a1a" />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything yet.
          </Text>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const handleCheckout = () => {
    addOrder({ items: foodName, restaurant: restaurantName, price });

    Alert.alert("Order Placed! 🎉", "Your food is on the way.", [
      {
        text: "View Orders",
        onPress: () => {
          navigation.navigate("Order");
        },
      },
      {
        text: "OK",
        onPress: () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "HomeMain" }],
            }),
          );
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="cart" size={80} color="#1a1a1a" />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Your Order</Text>

        <View style={styles.itemRow}>
          <View style={styles.itemInfo}>
            <Text style={styles.foodName}>{foodName}</Text>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
          </View>
          <Text style={styles.price}>{price}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalPrice}>{price}</Text>
        </View>

        <Pressable style={styles.button} onPress={handleCheckout}>
          <Text style={styles.buttonText}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f40f",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  contentContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingTop: 40,
    paddingBottom: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemInfo: { flex: 1, marginRight: 10 },
  foodName: { fontSize: 18, fontWeight: "600", color: "#333" },
  restaurantName: { fontSize: 14, color: "#666", marginTop: 4 },
  price: { fontSize: 18, fontWeight: "bold", color: "#27ae60" },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 20 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  totalText: { fontSize: 20, fontWeight: "bold", color: "#333" },
  totalPrice: { fontSize: 22, fontWeight: "bold", color: "#27ae60" },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 18,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    shadowColor: "#1a1a1a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#f8f40f" },
});
