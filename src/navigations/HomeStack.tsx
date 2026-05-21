import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/tabs/Home";
import RestaurantDetails from "../screens/stack/RestrauntDetails";
import Cart from "../screens/stack/Cart";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#e4d164" },
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
        headerTintColor: "#000",
        animation: "slide_from_bottom"
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={Home}
      />
      <Stack.Screen
        name="Details"
        component={RestaurantDetails}
        options={{ title: "Restaurant" }}
      />
      <Stack.Screen name="Cart" component={Cart} options={{ title: "Cart" }} />
    </Stack.Navigator>
  );
}
