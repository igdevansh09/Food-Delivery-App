import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { featuredFoods, dummyRestaurants } from "../../data/dummyData";

const RestrauntDetails = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const [quantity, setQuantity] = useState(1);
  const { foodName, restaurantName, price, id } = route.params || {};

  let resolvedFood = foodName as string;
  let resolvedRestaurant = restaurantName as string;
  let resolvedPrice = price as string;

  if (id && !foodName) {
    const found = dummyRestaurants.find((r) => r.id === id);
    if (found) {
      resolvedFood = found.menu[0]?.name || "Special Dish";
      resolvedRestaurant = found.name;
      resolvedPrice = `$${found.menu[0]?.price ?? 0}`;
    }
  }
  if (!resolvedFood) {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.emoji}>🍽️</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.foodName}>Restaurant not found</Text>
          <Text style={styles.restaurantName}>
            No restaurant matched id "{id}"
          </Text>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  let matchedEmoji = "🍽️";
  let matchedDesc =
    "A delicious meal prepared with fresh ingredients and served hot.";

  const foundFeatured = featuredFoods.find(
    (f) =>
      f.foodName === resolvedFood && f.restaurantName === resolvedRestaurant,
  );

  if (foundFeatured) {
    matchedEmoji = foundFeatured.emoji;
  } else {
    const rest = dummyRestaurants.find((r) => r.name === resolvedRestaurant);
    if (rest) {
      const menu = rest.menu.find((m) => m.name === resolvedFood);
      if (menu) {
        matchedEmoji = menu.emoji;
        matchedDesc = menu.description;
      }
    }
  }

  const basePrice = parseFloat(resolvedPrice.replace(/[^0-9.]/g, "")) || 0;
  const totalPrice = basePrice
    ? `$${(basePrice * quantity).toFixed(2)}`
    : resolvedPrice;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.emoji}>{matchedEmoji}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.foodName}>{resolvedFood}</Text>
          <Text style={styles.price}>{totalPrice}</Text>
        </View>
        <Text style={styles.restaurantName}>from {resolvedRestaurant}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{matchedDesc}</Text>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantitySelector}>
            <Pressable
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.qtyBtn}
            >
              <Ionicons name="remove" size={20} color="#333" />
            </Pressable>
            <Text style={styles.qtyText}>{quantity}</Text>
            <Pressable
              onPress={() => setQuantity(quantity + 1)}
              style={styles.qtyBtn}
            >
              <Ionicons name="add" size={20} color="#333" />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("Cart", {
              foodName: `${quantity}x ${resolvedFood}`,
              restaurantName: resolvedRestaurant,
              price: totalPrice,
            })
          }
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RestrauntDetails;

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
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  emoji: {
    fontSize: 100,
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  foodName: {
    fontSize: 26,
    fontWeight: "900",
    color: "#333",
    flex: 1,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#27ae60",
    marginLeft: 10,
  },
  restaurantName: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 24,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 30,
  },
  quantityLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  qtyBtn: {
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    color: "#333",
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
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f8f40f",
  },
});
