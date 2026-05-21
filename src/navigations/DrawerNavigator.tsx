import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Help from "../screens/drawer/Help";
import MyOrders from "../screens/drawer/MyOrders";
import Setting from "../screens/drawer/Setting";
import TabNavigator from "./TabNavigator";
import { useAuth } from "../context/AuthContext";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const insets = useSafeAreaInsets();
  const { user, avatar, logout } = useAuth();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.drawerHeader, { paddingTop: insets.top + 15 }]}>
          <View style={styles.avatarContainer}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarFallback}>
                <Ionicons name="person" size={40} color="#1a1a1a" />
              </View>
            )}
          </View>
          <Text style={styles.userName}>{user?.name || "Guest User"}</Text>
          <Text style={styles.userEmail}>{user?.email || "Not logged in"}</Text>
        </View>

        <View style={styles.dividerBar} />

        <View style={styles.drawerListWrapper}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 20 },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed,
          ]}
          onPress={async () => logout()}
        >
          <Ionicons name="log-out-outline" size={22} color="#1a1a1a" />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#e4d164",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#000",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "700", fontSize: 18 },
        drawerType: "slide",
        drawerActiveBackgroundColor: "#1a1a1a",
        drawerActiveTintColor: "#e4d164",
        drawerInactiveTintColor: "#1a1a1a",
        drawerLabelStyle: { fontSize: 15, fontWeight: "600", marginLeft: -10 },
        drawerItemStyle: {
          borderRadius: 8,
          marginVertical: 4,
          paddingHorizontal: 4,
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyOrders"
        options={{
          title: "My Orders",
          drawerIcon: ({ color }) => (
            <Ionicons name="receipt-outline" size={22} color={color} />
          ),
        }}
        component={MyOrders}
      />
      <Drawer.Screen
        name="Settings"
        component={Setting}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e4d164" },
  scrollContent: { flexGrow: 1 },
  drawerHeader: { paddingHorizontal: 20, paddingBottom: 20 },
  avatarContainer: { marginBottom: 10 },
  avatarImage: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 2,
    borderColor: "#1a1a1a",
  },
  avatarFallback: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: -0.3,
  },
  userEmail: {
    fontSize: 13,
    color: "#1a1a1a",
    opacity: 0.7,
    marginTop: 2,
    fontWeight: "500",
  },
  dividerBar: {
    height: 2,
    backgroundColor: "#1a1a1a",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  drawerListWrapper: { flex: 1, paddingHorizontal: 8 },
  footer: { padding: 20, borderTopWidth: 2, borderTopColor: "#1a1a1a" },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  logoutButtonPressed: { backgroundColor: "rgba(0,0,0,0.1)" },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a1a",
    marginLeft: 12,
  },
});
