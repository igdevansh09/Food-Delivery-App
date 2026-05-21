import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../context/CartContext";

const Order = () => {
const { orders, cancelOrder } = useCart();  const navigation = useNavigation<any>();

  const handleCancel = (id: string) => {
    cancelOrder(id)
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptySubtitle}>
              When you place an order, it will appear here.
            </Text>
          </View>
        )}
        renderItem={({ item: order }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.restaurantInfo}>
                <Ionicons name="fast-food" size={20} color="#1a1a1a" />
                <Text style={styles.restaurantName}>{order.restaurant}</Text>
              </View>
              <Text
                style={[
                  styles.status,
                  order.status === "Delivered" && styles.statusDelivered,
                  order.status === "Preparing" && styles.statusPreparing,
                  order.status === "Cancelled" && styles.statusCancelled,
                ]}
              >
                {order.status}
              </Text>
            </View>

            <View style={styles.orderDetails}>
              <Text style={styles.itemsText}>{order.items}</Text>
              <Text style={styles.dateText}>{order.date}</Text>
            </View>

            <View style={styles.orderFooter}>
              <Text style={styles.priceText}>{order.price}</Text>
              <View style={styles.actionButtons}>
                {order.status === "Preparing" && (
                  <Pressable
                    style={styles.cancelButton}
                    onPress={() => handleCancel(order.id)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f40f",
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
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
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantName: {
    fontSize: 18,
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
  statusDelivered: {
    backgroundColor: "#e8f8f5",
    color: "#27ae60",
  },
  statusPreparing: {
    backgroundColor: "#fff8e1",
    color: "#f39c12",
  },
  statusCancelled: {
    backgroundColor: "#fdedec",
    color: "#e74c3c",
  },
  orderDetails: {
    marginBottom: 15,
  },
  itemsText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
    lineHeight: 20,
  },
  dateText: {
    fontSize: 13,
    color: "#888",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 15,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e74c3c",
  },
  reorderButton: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#1a1a1a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  reorderButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f8f40f",
  },
});
