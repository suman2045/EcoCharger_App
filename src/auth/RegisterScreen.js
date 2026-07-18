import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";
import { API_URL } from "../configs/config"; // Ensure this returns full URL like http://192.168.1.X:9000/api

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !username || !email || !mobile || !address || !password) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, phone: mobile, address, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      Alert.alert("Success", "Registration successful. Please log in.");
      navigation.replace("LoginScreen");
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>

      <Text style={styles.title}>Create Account</Text>

      <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Mobile Number" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" maxLength={10} style={styles.input} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

      <View style={styles.buttonContainer}>
        <Button title="Register" color="#388E3C" onPress={handleRegister} />
      </View>

      <View style={styles.loginRedirect}>
        <Text style={{fontWeight:700}}>Already have an account? </Text>
        <Text style={styles.link} onPress={() => navigation.navigate("LoginScreen")}>
          Log in
        </Text>
      </View>
    </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
    backgroundColor: "#f9f8f7", // Light background for a clean look
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#388E3C", // Green color to match eco-friendly theme
  },
  input: {
    height: 50,
    borderColor: "#388E3C", // Green border
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#ffffff", // White background for inputs
    color: "#333",
    fontWeight: "500",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 5,
    overflow: "hidden",
  },
  loginRedirect: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  link: {
    color: "#388E3C", // Green color for link
    textDecorationLine: "underline",
  },
});
