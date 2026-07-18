import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Linking,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../configs/config";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Session Expired", "Please log in again.");
        return;
      }

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user profile.");
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("LoginScreen");
  };

  const openGoogleMaps = () => {
    const mapsURL = "https://www.google.com/maps/search/EV+charging+station";
    Linking.openURL(mapsURL);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>⚡ Welcome to Eco Charger</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>👋 Hello, {user?.name || "Eco User"}!</Text>
          <Text style={styles.cardSubtitle}>Charge smarter. Drive cleaner.</Text>
        </View>
{/* 
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🔍 What You Can Do</Text>
          <Text style={styles.listItem}>• Find nearby charging stations</Text>
          <Text style={styles.listItem}>• Book slots in advance</Text>
          <Text style={styles.listItem}>• Track your usage</Text>
        </View> */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>⚡ EV Tips</Text>
          <Text style={styles.listItem}>• Always carry a charging cable</Text>
          <Text style={styles.listItem}>• Avoid going below 20% battery</Text>
          <Text style={styles.listItem}>• Use eco mode while driving</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.mapButton} onPress={openGoogleMaps}>
            <Text style={styles.mapText}>🗺️ Open Google Maps for Stations</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("ProfileScreen")}>
            <Text style={styles.menuText}>👤 Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("ChargingStationsScreen")}>
            <Text style={styles.menuText}>📍 Charging Stations</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("TipsScreen")}>
            <Text style={styles.menuText}>📜 Tips & Instructions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: "#f0fdf4", padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1b5e20",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2e7d32",
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1b5e20",
    marginBottom: 10,
  },
  listItem: {
    fontSize: 15,
    color: "#333",
    marginBottom: 5,
  },
  mapButton: {
    backgroundColor: "#388e3c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  mapText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  menuContainer: {
    marginTop: 20,
    gap: 15,
  },
  menuButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#c62828",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
