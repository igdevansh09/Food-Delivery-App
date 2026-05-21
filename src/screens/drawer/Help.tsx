import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  LayoutAnimation,
  Linking,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const FAQS = [
  {
    id: "1",
    question: "How do I track my order?",
    answer:
      'You can track your order in real-time from the "Order" tab. Once a driver is assigned, you will see their location on the map.',
  },
  {
    id: "2",
    question: "How do I cancel an order?",
    answer:
      'You can cancel an order within 5 minutes of placing it. Go to the order details page and tap the "Cancel Order" button.',
  },
  {
    id: "3",
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards, debit cards, and digital wallets like Apple Pay and Google Pay.",
  },
];

const CONTACT_OPTIONS = [
  { id: "1", title: "Call Support", icon: "call-outline", action: "call" },
  { id: "2", title: "Email Us", icon: "mail-outline", action: "email" },
];

const Help = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const handleContactPress = (action: string) => {
    if (action === "call") {
      Linking.openURL("tel:+18001234567").catch(() =>
        Alert.alert("Error", "Unable to open dialer"),
      );
    } else if (action === "email") {
      Linking.openURL("mailto:cloudsaving09072004@gmail.com").catch(() =>
        Alert.alert("Error", "Unable to open email client"),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="headset" size={80} color="#1a1a1a" />
        </View>
      </View>

      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>How can we help?</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.card}>
            {FAQS.map((faq, index) => (
              <View
                key={faq.id}
                style={[
                  styles.faqItem,
                  index === FAQS.length - 1 && styles.lastFaqItem,
                ]}
              >
                <Pressable
                  style={styles.faqQuestionRow}
                  onPress={() => toggleExpand(faq.id)}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Ionicons
                    name={expandedId === faq.id ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#666"
                  />
                </Pressable>
                {expandedId === faq.id && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.card}>
            {CONTACT_OPTIONS.map((option, index) => (
              <Pressable
                key={option.id}
                style={[
                  styles.contactRow,
                  index === CONTACT_OPTIONS.length - 1 && styles.lastContactRow,
                ]}
                onPress={() => handleContactPress(option.action)}
              >
                <View style={styles.contactLeft}>
                  <Ionicons
                    name={option.icon as any}
                    size={24}
                    color="#1a1a1a"
                  />
                  <Text style={styles.contactTitle}>{option.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f40f",
  },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  scrollContent: {
    padding: 30,
    paddingTop: 40,
    paddingBottom: 50,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastFaqItem: {
    borderBottomWidth: 0,
  },
  faqQuestionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  faqAnswerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastContactRow: {
    borderBottomWidth: 0,
  },
  contactLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactTitle: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
  },
});
