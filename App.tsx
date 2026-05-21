import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigations/RootNavigator";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
