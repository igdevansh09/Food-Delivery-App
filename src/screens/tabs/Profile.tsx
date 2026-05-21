import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const PROFILE_OPTIONS = [
  {
    id: "1",
    title: "Payment Methods",
    icon: "card-outline",
    action: "Payment",
  },
  {
    id: "2",
    title: "Delivery Addresses",
    icon: "location-outline",
    action: "Addresses",
  },
  {
    id: "3",
    title: "Notifications",
    icon: "notifications-outline",
    action: "Notifications",
  },
  { id: "4", title: "Settings", icon: "settings-outline", action: "Settings" },
  {
    id: "5",
    title: "Help & Support",
    icon: "help-circle-outline",
    action: "Help",
  },
];

const Profile = () => {
  const { user, avatar, logout, updateUser, updateAvatar } = useAuth();
  const navigation = useNavigation<any>();

  const [editVisible, setEditVisible] = useState(false);
  const [editName, setEditName] = useState("");

  const handleOptionPress = (action: string) => {
    if (action === "Help" || action === "Settings") {
      navigation.getParent()?.openDrawer();
    } else {
      Alert.alert("Coming Soon", `${action} feature is under development.`);
    }
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: logout },
    ]);
  };

  const openEdit = () => {
    setEditName(user?.name || "");
    setEditVisible(true);
  };

  const saveEdit = async () => {
    if (!editName.trim()) {
      Alert.alert("Error", "Name cannot be empty.");
      return;
    }
    await updateUser(editName.trim());
    setEditVisible(false);
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
    Alert.alert("Remove Avatar", "Are you sure you want to remove your photo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          await updateAvatar(""); 
          Alert.alert("Removed", "Your avatar has been removed.");
        },
      },
    ]);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Pressable style={styles.iconCircle} onPress={openEdit}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person" size={80} color="#1a1a1a" />
            )}
          </Pressable>
        </View>

        <ScrollView
          style={styles.contentContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || "Guest User"}</Text>
            <Text style={styles.userEmail}>
              {user?.email || "Not logged in"}
            </Text>
          </View>

          <View style={styles.optionsWrapper}>
            {PROFILE_OPTIONS.map((option, index) => (
              <Pressable
                key={option.id}
                style={[
                  styles.optionRow,
                  index === PROFILE_OPTIONS.length - 1 && styles.lastOptionRow,
                ]}
                onPress={() => handleOptionPress(option.action)}
              >
                <View style={styles.optionLeft}>
                  <Ionicons name={option.icon as any} size={24} color="#555" />
                  <Text style={styles.optionTitle}>{option.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </ScrollView>
      </View>

      <Modal visible={editVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <View style={styles.photoActionsRow}>
              <Pressable style={styles.photoActionButton} onPress={handleChangeAvatar}>
                <Ionicons name="image-outline" size={20} color="#1a1a1a" />
                <Text style={styles.photoActionText}>Change Photo</Text>
              </Pressable>
              {avatar ? (
                <Pressable
                  style={[styles.photoActionButton, styles.photoActionRemove]}
                  onPress={handleRemoveAvatar}
                >
                  <Ionicons name="trash-outline" size={20} color="#e74c3c" />
                  <Text style={[styles.photoActionText, { color: "#e74c3c" }]}>Remove</Text>
                </Pressable>
              ) : null}
            </View>

            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.modalInput}
              value={editName}
              onChangeText={setEditName}
              placeholder="Your name"
              placeholderTextColor="#bbb"
            />

            <Pressable style={styles.saveButton} onPress={saveEdit}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </Pressable>
            <Pressable onPress={() => setEditVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default Profile;

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
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
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
  userInfo: { alignItems: "center", marginBottom: 30 },
  userName: { fontSize: 26, fontWeight: "900", color: "#333", marginBottom: 5 },
  userEmail: { fontSize: 16, color: "#666" },
  optionsWrapper: { marginBottom: 20 },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastOptionRow: { borderBottomWidth: 0 },
  optionLeft: { flexDirection: "row", alignItems: "center" },
  optionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ffebee",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  logoutText: { fontSize: 18, fontWeight: "bold", color: "#e74c3c" },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingBottom: 50,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#333",
    marginBottom: 25,
  },
  photoActionsRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  photoActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  photoActionRemove: {
    backgroundColor: "#fdedec",
  },
  photoActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  saveButton: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: { fontSize: 16, fontWeight: "bold", color: "#f8f40f" },
  cancelText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 15,
    color: "#999",
  },
});
