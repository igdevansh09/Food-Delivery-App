import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "../../context/CartContext";

const MyOrders = () => {
  const insets = useSafeAreaInsets();
  const { orders, cancelOrder } = useCart();

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: insets.bottom + 40,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptySubtitle}>
            Your order history will appear here.
          </Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View style={styles.restaurantInfo}>
              <Ionicons name="restaurant" size={20} color="#1a1a1a" />
              <Text style={styles.restaurantName}>{item.restaurant}</Text>
            </View>
            <Text
              style={[
                styles.status,
                item.status === "Delivered" && styles.statusDelivered,
                item.status === "Preparing" && styles.statusPreparing,
                item.status === "Cancelled" && styles.statusCancelled,
              ]}
            >
              {item.status}
            </Text>
          </View>

          <View style={styles.orderDetails}>
            <Text style={styles.itemsText}>{item.items}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>

          <View style={styles.orderFooter}>
            <Text style={styles.priceText}>{item.price}</Text>
            {item.status === "Preparing" && (
              <Pressable
                style={styles.cancelButton}
                onPress={() => cancelOrder(item.id)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
    />
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  restaurantInfo: { flexDirection: "row", alignItems: "center" },
  restaurantName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginLeft: 8,
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  statusDelivered: { backgroundColor: "#e8f8f5", color: "#27ae60" },
  statusPreparing: { backgroundColor: "#fff8e1", color: "#f39c12" },
  statusCancelled: { backgroundColor: "#fdedec", color: "#e74c3c" },
  orderDetails: { marginBottom: 12 },
  itemsText: { fontSize: 14, color: "#555", marginBottom: 4 },
  dateText: { fontSize: 12, color: "#999" },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  priceText: { fontSize: 16, fontWeight: "bold", color: "#1a1a1a" },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#fdedec",
  },
  cancelButtonText: { fontSize: 14, fontWeight: "600", color: "#e74c3c" },
});
