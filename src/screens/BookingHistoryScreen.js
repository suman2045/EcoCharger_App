import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '../configs/config';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BookingHistoryScreen() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Try to parse the response as JSON
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching booking history:", error);
      Alert.alert("Error", "Failed to fetch booking history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* Station Image */}
          <Image
            source={{ uri: item.stationImage || require('../../assets/logo.png') }}
            style={styles.stationImage}
          />

          <View style={styles.cardContent}>
            {/* Station Name */}
            <Text style={styles.stationName}>{item.stationName}</Text>
            
            {/* Booking Date */}
            <Text style={styles.date}>Date: {new Date(item.date).toLocaleDateString()}</Text>
            
            {/* Booking Duration */}
            <Text style={styles.duration}>Duration: {item.duration} hours</Text>
            
            {/* Status Icon and Status */}
            <View style={styles.statusContainer}>
              <Icon
                name={item.status === 'Completed' ? 'check-circle' : 'error'}
                size={20}
                color={item.status === 'Completed' ? 'green' : 'red'}
              />
              <Text style={[styles.statusText, { color: item.status === 'Completed' ? 'green' : 'red' }]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 8,
    elevation: 5,
  },
  stationImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  stationName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#388e3c",
  },
  date: {
    fontSize: 16,
    color: "#555",
  },
  duration: {
    fontSize: 16,
    color: "#888",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  statusText: {
    fontSize: 16,
    marginLeft: 5,
  },
});
