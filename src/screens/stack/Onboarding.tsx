import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView edges={["top","left","right"]} style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.emojiCircle}>
          <Text style={styles.emoji}>🍔</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Delicious Food</Text>
        <Text style={styles.subtitle}>
          Get your favorite meals delivered to your doorstep quickly and safely.
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

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
  emojiCircle: {
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 10,
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
