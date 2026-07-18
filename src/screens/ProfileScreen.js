import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../configs/config";

export default function ProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Unauthorized", "Please log in again.");
        navigation.navigate("LoginScreen");
        return;
      }

      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user); // Assuming the response includes user data under 'user'
      } else {
        Alert.alert("Error", data.message || "Could not load profile.");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Profile</Text>
        <Text style={styles.errorText}>User data not available.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>User Profile</Text>

      <View style={styles.profileBox}>
        <Text style={styles.label}>👤 Name:</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>👨‍💻 Username:</Text>
        <Text style={styles.value}>{user.username || "Not provided"}</Text>

        <Text style={styles.label}>✉️ Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>📱 Phone:</Text>
        <Text style={styles.value}>{user.phone || "Not provided"}</Text>

        <Text style={styles.label}>📍 Address:</Text>
        <Text style={styles.value}>{user.address || "Not provided"}</Text>

        <Text style={styles.label}>🕒 Joined:</Text>
        <Text style={styles.value}>
          {user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("UpdateProfileScreen")}
      >
        <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: 20,
    marginTop:100
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    fontWeight: "600",
  },
  value: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
