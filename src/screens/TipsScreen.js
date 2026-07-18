import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons as Icon } from '@expo/vector-icons';

export default function TipsScreen() {
  const tips = [
    {
      icon: "location-on",
      title: "Locate Stations",
      description: "Use the station list or map view to find the nearest available charging stations.",
    },
    {
      icon: "add-circle-outline",
      title: "Add a Station",
      description: "Go to the form section to add a new station if you're a provider or admin.",
    },
    {
      icon: "event-available",
      title: "Book in Advance",
      description: "Reserve your slot ahead of time to avoid waiting at the station.",
    },
    {
      icon: "delete-forever",
      title: "Manage Bookings",
      description: "Easily cancel or check your booking history from the bookings screen.",
    },
    {
      icon: "toggle-on",
      title: "Check Availability",
      description: "Use the toggle switch to see whether a station is available before heading out.",
    },
    {
      icon: "security",
      title: "Secure Login",
      description: "Ensure you're logged in to manage and track your activity securely.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Tips to Use the EV Charging App</Text>
      {tips.map((tip, index) => (
        <View key={index} style={styles.tipCard}>
          <Icon name={tip.icon} size={30} color="#4caf50" style={styles.tipIcon} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipDescription}>{tip.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1f8e9",
    marginBottom:20

  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#388e3c",
    textAlign: "center",
    marginTop:70
  },
  tipCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  tipIcon: {
    marginRight: 15,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#388e3c",
  },
  tipDescription: {
    fontSize: 15,
    color: "#555",
    marginTop: 5,
  },
});
