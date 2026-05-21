import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { dummyRestaurants, featuredFoods } from "../../data/dummyData";

export interface FoodCardProps {
  emoji: string;
  foodName: string;
  restaurantName: string;
  price: string;
}

const FoodCard = ({
  emoji,
  foodName,
  restaurantName,
  price,
}: FoodCardProps) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      style={styles.categoryCard}
      onPress={() =>
        navigation.navigate("Details", {
          foodName,
          restaurantName,
          price,
        })
      }
    >
      <Text style={styles.categoryEmoji}>{emoji}</Text>
      <Text style={styles.categoryText}>{foodName}</Text>
      <Text style={styles.restaurantSmallText} numberOfLines={1}>
        {restaurantName}
      </Text>
      <Text style={styles.priceText}>{price}</Text>
    </Pressable>
  );
};

const Home = () => {
  const navigation = useNavigation<any>();

  const renderHeader = () => (
    <>
      <Text style={styles.headerTitle}>What are you craving?</Text>

      <FlatList
        data={featuredFoods}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.categoryContainer}
        renderItem={({ item }) => (
          <FoodCard
            emoji={item.emoji}
            foodName={item.foodName}
            restaurantName={item.restaurantName}
            price={item.price}
          />
        )}
      />

      <Text style={styles.sectionTitle}>Featured Restaurants</Text>
    </>
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <FlatList
        data={dummyRestaurants}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <View style={styles.featuredSection}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantDesc}>
              {item.tags.join(" • ")} • {item.deliveryTime} • $
              {item.deliveryFee} Delivery
            </Text>

            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate("Details", {
                  restaurantName: item.name,
                  foodName: item.menu[0]?.name,
                  price: `$${item.menu[0]?.price}`,
                })
              }
            >
              <Text style={styles.buttonText}>View Menu</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f40f",
  },
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 20,
    gap: 15,
  },
  categoryCard: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: "center",
    width: 130,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 5,
  },
  categoryText: {
    fontWeight: "600",
    color: "#555",
  },
  restaurantSmallText: {
    fontSize: 10,
    color: "#777",
    marginTop: 2,
  },
  priceText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
    marginTop: 4,
  },
  featuredSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  restaurantDesc: {
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#e4d164",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
