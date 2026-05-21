import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { dummyCategories, featuredFoods } from "../../data/dummyData";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<any>();

  const filteredFoods = featuredFoods.filter(
    (item) =>
      item.foodName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.restaurantName.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderHeader = () => (
    <>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Find food or restaurants..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <Pressable onPress={() => setSearchText("")}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </Pressable>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <View style={styles.categoriesWrapper}>
          {dummyCategories.map((cat) => (
            <Pressable key={cat.id} style={styles.categoryChip}>
              <Text style={styles.categoryChipText}>
                {cat.name} {cat.emoji}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Suggested for you</Text>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={styles.suggestedItem}
            onPress={() =>
              navigation.navigate("Home", {
                screen: "Details",
                params: {
                  foodName: item.foodName,
                  restaurantName: item.restaurantName,
                  price: item.price,
                },
              })
            }
          >
            <View style={styles.suggestedItemLeft}>
              <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
              <View style={styles.suggestedItemInfo}>
                <Text style={styles.suggestedItemName}>{item.foodName}</Text>
                <Text style={styles.suggestedItemRest}>
                  {item.restaurantName}
                </Text>
              </View>
            </View>
            <Text style={styles.suggestedItemPrice}>{item.price}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f40f",
  },
  listContent: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  categoriesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryChip: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  suggestedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  suggestedItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  suggestedItemInfo: {
    marginLeft: 15,
  },
  suggestedItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  suggestedItemRest: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  suggestedItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
  },
});
