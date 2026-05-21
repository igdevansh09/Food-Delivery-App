import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Search from "../screens/tabs/Search";
import Order from "../screens/tabs/Order";
import Profile from "../screens/tabs/Profile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeStack from "./HomeStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { Pressable } from "react-native";

function isTabBarHidden(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route);
  return routeName === "Details" || routeName === "Cart";
}

const Tab = createBottomTabNavigator();

const sharedHeader = {
  headerShown: true,
  headerStyle: { backgroundColor: "#e4d164" },
  headerTitleStyle: { fontWeight: "bold" as const, fontSize: 18 },
  headerTintColor: "#000",
  headerTitleAlign: "center" as const,
};

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const {cartCount} = useCart()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#e0c111",
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
          marginBottom: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
        animation: "shift",
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#201e1e",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Order") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: isTabBarHidden(route)
            ? { display: "none" }
            : {
                backgroundColor: "#e0c111",
                borderTopWidth: 0,
                height: 60 + insets.bottom,
                paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
                paddingTop: 8,
              },
        })}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          ...sharedHeader,
          title: "Search",
        }}
      />

      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          ...sharedHeader,
          title: "Orders",
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          ...sharedHeader,
          title: "Profile",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.getParent()?.openDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="menu-outline" size={26} color="#000" />
            </Pressable>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
