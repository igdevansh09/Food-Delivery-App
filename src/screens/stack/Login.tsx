import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Test_Password = "123456789";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expectedEmail, setExpectedEmail] = useState(
    "devanshgupta09072004@gmail.com",
  );
  const { login } = useAuth();

  useEffect(() => {
    async function fetchExpectedEmail() {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.email) setExpectedEmail(parsed.email);
      }
    }
    fetchExpectedEmail();
  }, []);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.headerContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="fast-food" size={80} color="#1a1a1a" />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Log in to your account</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={22}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Pressable style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>

            <Pressable
              style={styles.loginButton}
              onPress={async () => {
                if (email.trim() === "" || password.trim() === "") {
                  Alert.alert("Error", "Please fill in all fields");
                  return;
                }
                if (email !== expectedEmail || password !== Test_Password) {
                  Alert.alert(
                    "Wrong credentials",
                    "Use Correct email and password",
                  );
                  return;
                }
                await login();
              }}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Pressable>
              <Text style={[styles.footerText, styles.signupText]}>
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f40f",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  contentContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingTop: 40,
    paddingBottom: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#1a1a1a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f8f40f",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  signupText: {
    fontWeight: "bold",
    color: "#1a1a1a",
  },
});
