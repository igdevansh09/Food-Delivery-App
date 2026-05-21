import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import RootStack from "./RootStack";
import DrawerNavigator from "./DrawerNavigator";

export default function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f40f",
        }}
      >
        <ActivityIndicator size="large" color="#e4d164" />
      </View>
    );
  }

  return isLoggedIn ? <DrawerNavigator /> : <RootStack />;
}
