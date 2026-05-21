import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = { name: string; email: string };

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  avatar: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (name: string) => Promise<void>;
  updateAvatar: (uri: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const DEFAULT_USER: User = {
  name: "Devansh Gupta",
  email: "devanshgupta09072004@gmail.com",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    async function checkStorage() {
      try {
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        const userData = await AsyncStorage.getItem("userData");
        const avatarUri = await AsyncStorage.getItem("userAvatar");

        if (loggedIn === "true") {
          setIsLoggedIn(true);
          setUser(userData ? JSON.parse(userData) : DEFAULT_USER);
          if (avatarUri) setAvatar(avatarUri);
        }
      } catch (e) {
        console.error("AuthContext checkStorage error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    checkStorage();
  }, []);

  async function login() {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      const existing = await AsyncStorage.getItem("userData");
      const avatarUri = await AsyncStorage.getItem("userAvatar");
      if (!existing) {
        await AsyncStorage.setItem("userData", JSON.stringify(DEFAULT_USER));
      }
      setIsLoggedIn(true);
      setUser(existing ? JSON.parse(existing) : DEFAULT_USER);
      if (avatarUri) setAvatar(avatarUri);
    } catch (e) {
      console.error("AuthContext login error:", e);
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setUser(null);
    } catch (e) {
      console.error("AuthContext logout error:", e);
    }
  }

  async function updateUser(name: string) {
    try {
      const current = user?.email ?? DEFAULT_USER.email;
      const updated = { name, email: current };
      await AsyncStorage.setItem("userData", JSON.stringify(updated));
      setUser(updated);
    } catch (e) {
      console.error("AuthContext updateUser error:", e);
    }
  }

  async function updateAvatar(uri: string) {
    try {
      if (uri) {
        await AsyncStorage.setItem("userAvatar", uri);
        setAvatar(uri);
      } else {
        await AsyncStorage.removeItem("userAvatar");
        setAvatar(null);
      }
    } catch (e) {
      console.error("AuthContext updateAvatar error:", e);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        avatar,
        login,
        logout,
        updateUser,
        updateAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
