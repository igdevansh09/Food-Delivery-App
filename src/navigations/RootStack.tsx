import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/stack/Onboarding";
import DrawerNavigator from "./DrawerNavigator";
import Login from "../screens/stack/Login";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#e4d164",
        },

        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          color: "black",
        },
        animation: "slide_from_right"
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

