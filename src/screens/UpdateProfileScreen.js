import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../configs/config";
import Ionicons from "@expo/vector-icons/Ionicons"; // for Expo
// import Icon from "react-native-vector-icons/Ionicons"; // for bare RN

export default function UpdateProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const fetchProfile = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setName(data.name || "");
        setEmail(data.email || "");
        setUsername(data.username || "");
        setMobile(data.mobile || "");
        setAddress(data.address || "");
      } else {
        Alert.alert("Error", "Failed to fetch profile");
      }
    } catch (err) {
      Alert.alert("Error", "Network error");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, username, mobile, address }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", "Profile updated successfully");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.message || "Update failed");
      }
    } catch (err) {
      Alert.alert("Error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  const renderInput = (iconName, placeholder, value, onChangeText, keyboardType = "default", multiline = false) => (
    <View style={styles.inputWrapper}>
      <Ionicons name={iconName} size={20} color="#4caf50" style={styles.icon} />
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Update Your Profile</Text>

        {renderInput("person", "Full Name", name, setName)}
        {/* {renderInput("person-circle", "Username", username, setUsername)} */}
        {renderInput("mail", "Email", email, setEmail, "email-address")}
        {/* {renderInput("call", "Mobile Number", mobile, setMobile, "phone-pad")} */}
        {/* {renderInput("home", "Address", address, setAddress, "default", true)} */}

        <View style={styles.buttonContainer}>
          <Button title="Save Changes" onPress={updateProfile} color="#388e3c" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#e8f5e9",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    marginTop: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: 25,
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#c8e6c9",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
