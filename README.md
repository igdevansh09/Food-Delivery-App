# 🍔 FoodDelivery — React Native Navigation Assignment

A complete Food Delivery app built with **Expo + React Native**, demonstrating all major
React Navigation patterns in a single project. The focus is on navigation architecture —
nested navigators, auth flow, params, programmatic navigation, and smooth screen transitions.

---

## Demo Video

[Food Delivery  Demo](https://www.youtube.com/watch?v=yvEI0SJoh_E)

---

## Project Overview

FoodDelivery is a React Native Expo assignment that practices every major navigation
pattern in one app. It includes a full auth flow with AsyncStorage persistence, a nested
navigator structure (Drawer → Tabs → Stack), cart state shared via Context, and smooth
screen transition animations.

**Test credentials:**
```
Email:    devanshgupta09072004@gmail.com
Password: 123456789
```

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| expo | ~52.x | Project framework + build tools |
| react-native | 0.76.x | Core UI framework |
| @react-navigation/native | ^7.x | NavigationContainer + utilities |
| @react-navigation/stack | ^7.x | Stack navigator with animation API |
| @react-navigation/native-stack | ^7.x | Stack navigator (RootStack) |
| @react-navigation/bottom-tabs | ^7.x | Bottom tab navigator |
| @react-navigation/drawer | ^7.x | Drawer navigator |
| @react-native-async-storage/async-storage | ^2.x | Persist auth state + settings |
| expo-image-picker | ~16.x | Avatar upload from gallery |
| @expo/vector-icons | ^14.x | Ionicons for tabs and drawer |
| react-native-safe-area-context | ^4.x | Insets for notch and home bar |
| react-native-gesture-handler | ~2.x | Required by drawer + swipe gestures |
| react-native-reanimated | ~3.x | Required by gesture handler |

---

## How to Run Locally

### Prerequisites

- **Node.js** 18 or higher
- **JDK 17** — [Download Adoptium JDK 17](https://adoptium.net/temurin/releases/?version=17)
- Set `JAVA_HOME` to the JDK 17 root folder (not the `\bin` subfolder)
- Android device with USB Debugging enabled

### Install

```bash
git clone <your-repo-url>
cd FoodDelivery
npm install
```

### Run in Expo Go (quick start)

```bash
npx expo start
```

Scan the QR code with the Expo Go app on your phone.

## Navigation Structure

```
App.tsx
│
├── NOT LOGGED IN → RootStack [Stack Navigator]
│   │   cardStyleInterpolator: forHorizontalIOS (slide)
│   │
│   ├── OnboardingScreen
│   │       navigation.replace("Login")         ← replace so back won't return here
│   └── LoginScreen
│           login()  →  state change            ← no navigate(), RootNavigator re-renders
│
└── LOGGED IN → DrawerNavigator [Drawer Navigator]
    │   Custom content: avatar, name, email
    │   Items: Dashboard, My Orders, Settings, Help, Logout
    │
    └── Dashboard → TabNavigator [Bottom Tab Navigator]
            │   Tabs: Home · Search · Orders · Profile
            │   Badge on Orders tab = count of "Preparing" orders
            │
            ├── Home → HomeStack [Stack Navigator]
            │   │   Tab bar hidden on Details + Cart screens
            │   │   forHorizontalIOS on Details, forModalPresentationIOS on Cart
            │   │
            │   ├── HomeMain (HomeScreen)
            │   │       navigation.navigate("Details", { foodName, restaurantName, price })
            │   ├── RestaurantDetailScreen
            │   │       navigation.navigate("Cart", { foodName, restaurantName, price })
            │   └── CartScreen
            │           addOrder() → badge appears on Orders tab
            │           CommonActions.reset([{ name: "HomeMain" }])
            │
            ├── SearchScreen
            │       navigation.navigate("Home", { screen: "Details", params: {...} })
            │
            ├── OrderScreen
            │       cancelOrder(id) → status "Cancelled" → badge auto-decrements
            │
            └── ProfileScreen
                    navigation.getParent()?.openDrawer()
```

---

## Auth Flow

The app never uses `navigation.navigate()` to switch between the auth and main app.
Instead, a state variable in `AuthContext` drives which navigator is rendered:

```
isLoggedIn = false  →  RootNavigator renders <RootStack />
isLoggedIn = true   →  RootNavigator renders <DrawerNavigator />

login()  → AsyncStorage.setItem("isLoggedIn", "true") → setIsLoggedIn(true)
         → React re-renders → DrawerNavigator mounts automatically

logout() → AsyncStorage.removeItem("isLoggedIn")      → setIsLoggedIn(false)
         → React re-renders → RootStack mounts automatically
```

Auth state and user data persist via `AsyncStorage`, so the correct navigator
is shown immediately on app restart without showing a flash of the login screen.

---

## Programmatic Navigation

| Method | Where used | Purpose |
|---|---|---|
| `navigate()` | Home → Details, Details → Cart, Search → Details | Forward navigation with params |
| `replace()` | Onboarding → Login | Removes Onboarding from back stack |
| `goBack()` | Cart empty state | Returns to previous screen |
| `reset()` | Cart after checkout | Clears HomeStack so back won't return to Cart |
| `getParent()?.openDrawer()` | Profile screen | Opens drawer from inside TabNavigator |

---

## Cart & Orders

- `CartContext` stores all orders with status: `Preparing` \| `Delivered` \| `Cancelled`
- `cartCount` is **derived** — `orders.filter(o => o.status === "Preparing").length`
- No manual badge tracking — cancelling an order automatically decrements the badge
- Orders are shared between the Orders tab and the My Orders drawer screen via the same context
- Orders persist across app restarts via `AsyncStorage`

---

## Project Structure

```
FoodDelivery/
├── App.tsx                         ← NavigationContainer, providers
├── README.md
└── src/
    ├── context/
    │   ├── AuthContext.tsx          ← isLoggedIn, user, avatar, login/logout/updateUser/updateAvatar
    │   └── CartContext.tsx          ← orders[], addOrder, cancelOrder, cartCount (derived)
    │
    ├── data/
    │   └── dummyData.ts             ← restaurants, menu items, featured foods, categories
    │
    ├── navigations/
    │   ├── RootNavigator.tsx        ← conditional: RootStack or DrawerNavigator
    │   ├── RootStack.tsx            ← Onboarding → Login (createStackNavigator)
    │   ├── DrawerNavigator.tsx      ← custom drawer content + 4 drawer screens
    │   ├── TabNavigator.tsx         ← 4 tabs + badge + tab bar hide logic
    │   └── HomeStack.tsx            ← HomeMain → Details → Cart (createStackNavigator)
    │
    └── screens/
        ├── stack/
        │   ├── Onboarding.tsx
        │   ├── Login.tsx            ← validates email from AsyncStorage + fixed password
        │   ├── RestrauntDetails.tsx ← quantity selector + emoji/desc from dummyData
        │   └── Cart.tsx             ← addOrder + reset after checkout
        ├── tabs/
        │   ├── Home.tsx             ← FlatList restaurants + horizontal food cards
        │   ├── Search.tsx           ← live search filter + navigate to nested Details
        │   ├── Order.tsx            ← orders from CartContext + cancel button
        │   └── Profile.tsx          ← edit name modal + avatar picker + logout
        └── drawer/
            ├── MyOrders.tsx         ← same orders from CartContext + cancel
            ├── Setting.tsx          ← avatar upload, toggles persisted via AsyncStorage
            └── Help.tsx             ← FAQ accordion + Linking.openURL for contact
```

---

## Assumptions Made

- **Single test account** — one hardcoded password (`123456789`). The email is read from
  `AsyncStorage` so it stays in sync if the user edits their profile name (email is
  read-only and cannot be changed from the UI).

- **Orders persisted via AsyncStorage** — orders survive app restarts. The badge count
  rehydrates correctly on reload.

- **Avatar stored as local URI** — stored as a file URI from the device gallery. If the
  original photo is deleted from the gallery, the avatar will fail to load. A production
  app would copy the file to the app's document directory or upload to a server.

- **Dark mode toggle is cosmetic** — persists via `AsyncStorage` but does not apply a
  real theme.

- **Sign Up is non-functional** — only the Login flow is implemented. Sign Up button
  exists in the UI but has no action attached.

- **All data is static** — restaurants, menu items, and categories are hardcoded in
  `src/data/dummyData.ts`. There is no backend or API.