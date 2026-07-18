import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert,Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../configs/config"; // Ensure your API URL is correct

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Handle login form submission
  const handleLogin = async () => {
    setLoading(true); // Set loading to true while waiting for the response

    try {
      // Fetch API call to login
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Fetch the raw response to debug
      const responseText = await response.text(); // Get the response as text
      console.log("Raw Response:", responseText); // Log the raw response for debugging

      let data;
      try {
        data = JSON.parse(responseText); // Try to parse the response as JSON
      } catch (err) {
        throw new Error("Server response is not valid JSON. Please check the API.");
      }

      if (!response.ok || !data.success) {
        // Handle failed login
        throw new Error(data.message || "Login failed, please try again.");
      }

      // Store token in AsyncStorage
      await AsyncStorage.setItem("token", data.token);

      // Navigate to HomeScreen after successful login
      navigation.replace("HomeScreen");

    } catch (error) {
      // Handle error
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false); // Set loading to false after API response
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

      <Text style={styles.heading}>Welcome Back</Text>

      <Image source={require('../Assests/logo.png')} style={{height:200,width:200,alignSelf:'center'}} />

      <TextInput
        style={[styles.input, emailFocused && styles.inputFocused]} // Apply focused style conditionally
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#888"
        onFocus={() => setEmailFocused(true)} // Set focus state when field is focused
        onBlur={() => setEmailFocused(false)} // Remove focus state when field is blurred
      />

      <TextInput
        style={[styles.input, passwordFocused && styles.inputFocused]} // Apply focused style conditionally
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
        onFocus={() => setPasswordFocused(true)} // Set focus state when field is focused
        onBlur={() => setPasswordFocused(false)} // Remove focus state when field is blurred
      />

      {loading ? (
        <Text style={styles.loadingText}>Logging in...</Text>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Login" color="#4CAF50" onPress={handleLogin} />
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            Register
          </Text>
        </Text>
      </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f8f7",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    // marginBottom: 30,
    textAlign: "center",
    color: "#388E3C", // Green color for eco-friendly look
    marginTop:100
  },
  input: {
    height: 50,
    borderColor: "#388E3C", // Light Green border
    borderWidth: 1,
    borderRadius: 10, // Rounded corners for a softer look
    paddingLeft: 15, // Added more space for text
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#ffffff", // White background for the input
    color: "#333", // Dark color for the text
    fontWeight: "500", // Slightly bold text
    elevation:18,
    shadowColor:'green'
  },
  inputFocused: {
    borderColor: "#4CAF50", // Change border to darker green on focus
    shadowColor: "#388E3C", // Light green shadow effect for focus state
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 15,
    color: "#388E3C", // Green color for eco-friendly look
  },
  buttonContainer: {
    backgroundColor: "#388E3C", // Green background for the button
    borderRadius: 5,
    overflow: "hidden",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    color: "#388E3C", // Green link color
    textDecorationLine: "underline",
  },
});
