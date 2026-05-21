import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../context/AuthContext";

const Setting = () => {
  const { avatar, updateAvatar } = useAuth();

  const [notifications, setNotifications] = useState(false);
  const [promos, setPromos] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    async function loadPreferences() {
      try {
        const n = await AsyncStorage.getItem("notif");
        const p = await AsyncStorage.getItem("promos");
        const d = await AsyncStorage.getItem("darkMode");
        if (n !== null) setNotifications(n === "true");
        if (p !== null) setPromos(p === "true");
        if (d !== null) setIsDarkMode(d === "true");
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
    loadPreferences();
  }, []);

  const toggleNotifications = async (value: boolean) => {
    setNotifications(value);
    await AsyncStorage.setItem("notif", String(value));
  };

  const togglePromos = async (value: boolean) => {
    setPromos(value);
    await AsyncStorage.setItem("promos", String(value));
  };

  const toggleDarkMode = async (value: boolean) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem("darkMode", String(value));
  };

  const handleChangeAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please allow access to your photo library in Settings.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, 
      aspect: [1, 1],
      quality: 0.6,
    });

    if (!result.canceled && result.assets.length > 0) {
      await updateAvatar(result.assets[0].uri);
      Alert.alert("Done!", "Your avatar has been updated.");
    }
  };

  const handleRemoveAvatar = () => {
    Alert.alert(
      "Remove Avatar",
      "Are you sure you want to remove your photo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await updateAvatar(""); 
            Alert.alert("Removed", "Your avatar has been removed.");
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.iconCircle}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="settings" size={80} color="#1a1a1a" />
          )}
        </View>
      </View>

      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Photo</Text>
          <View style={styles.card}>
            <Pressable style={styles.optionRow} onPress={handleChangeAvatar}>
              <View style={styles.optionLeft}>
                <Ionicons name="image-outline" size={24} color="#1a1a1a" />
                <Text style={styles.optionTitle}>
                  {avatar ? "Change Photo" : "Upload Photo"}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </Pressable>

            {avatar ? (
              <Pressable
                style={[styles.optionRow, styles.lastOptionRow]}
                onPress={handleRemoveAvatar}
              >
                <View style={styles.optionLeft}>
                  <Ionicons name="trash-outline" size={24} color="#e74c3c" />
                  <Text style={[styles.optionTitle, { color: "#e74c3c" }]}>
                    Remove Photo
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </Pressable>
            ) : (
              <View style={[styles.optionRow, styles.lastOptionRow]}>
                <View style={styles.optionLeft}>
                  <Ionicons name="camera-outline" size={24} color="#999" />
                  <Text style={[styles.optionTitle, { color: "#999" }]}>
                    No photo uploaded
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <Pressable
              style={styles.optionRow}
              onPress={() =>
                Alert.alert(
                  "Change Password",
                  "A reset link will be sent to your registered email.",
                  [{ text: "Send Link" }, { text: "Cancel", style: "cancel" }],
                )
              }
            >
              <View style={styles.optionLeft}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color="#1a1a1a"
                />
                <Text style={styles.optionTitle}>Change Password</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </Pressable>

            <Pressable
              style={[styles.optionRow, styles.lastOptionRow]}
              onPress={() =>
                Alert.alert(
                  "Delete Account",
                  "This will permanently delete your account and all data. This cannot be undone.",
                  [
                    { text: "Delete", style: "destructive" },
                    { text: "Cancel", style: "cancel" },
                  ],
                )
              }
            >
              <View style={styles.optionLeft}>
                <Ionicons name="trash-outline" size={24} color="#e74c3c" />
                <Text style={[styles.optionTitle, { color: "#e74c3c" }]}>
                  Delete Account
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <View style={styles.optionRow}>
              <View style={styles.optionLeft}>
                <Ionicons name="moon-outline" size={24} color="#1a1a1a" />
                <Text style={styles.optionTitle}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: "#e0e0e0", true: "#1a1a1a" }}
                thumbColor={isDarkMode ? "#f8f40f" : "#f4f3f4"}
                ios_backgroundColor="#e0e0e0"
              />
            </View>

            <View style={styles.optionRow}>
              <View style={styles.optionLeft}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#1a1a1a"
                />
                <Text style={styles.optionTitle}>Order Updates</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={toggleNotifications}
                trackColor={{ false: "#e0e0e0", true: "#1a1a1a" }}
                thumbColor={notifications ? "#f8f40f" : "#f4f3f4"}
              />
            </View>

            <View style={[styles.optionRow, styles.lastOptionRow]}>
              <View style={styles.optionLeft}>
                <Ionicons name="pricetag-outline" size={24} color="#1a1a1a" />
                <Text style={styles.optionTitle}>Promotions & Offers</Text>
              </View>
              <Switch
                value={promos}
                onValueChange={togglePromos}
                trackColor={{ false: "#e0e0e0", true: "#1a1a1a" }}
                thumbColor={promos ? "#f8f40f" : "#f4f3f4"}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <Pressable
              style={styles.optionRow}
              onPress={() =>
                Alert.alert(
                  "Privacy Policy",
                  "We collect minimal data to provide our service.\n\nYour data is never sold to third parties.\n\nYou can request deletion of your data at any time.",
                )
              }
            >
              <View style={styles.optionLeft}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={24}
                  color="#1a1a1a"
                />
                <Text style={styles.optionTitle}>Privacy Policy</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </Pressable>

            <View style={[styles.optionRow, styles.lastOptionRow]}>
              <View style={styles.optionLeft}>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#1a1a1a"
                />
                <Text style={styles.optionTitle}>App Version</Text>
              </View>
              <Text style={styles.versionText}>v1.0.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f40f" },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  iconCircle: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  avatarImage: { width: 150, height: 150, borderRadius: 75 },
  contentContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  scrollContent: { padding: 30, paddingTop: 40, paddingBottom: 50 },
  headerTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastOptionRow: { borderBottomWidth: 0 },
  optionLeft: { flexDirection: "row", alignItems: "center" },
  optionTitle: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
    fontWeight: "500",
  },
  versionText: { color: "#999", fontSize: 14, fontWeight: "500" },
});
