import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../configs/config";
import { useNavigation } from "@react-navigation/native";

export default function MapScreen() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchStations = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/stations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setStations(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load station locations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: stations[0]?.latitude || 28.6139, // default to Delhi
        longitude: stations[0]?.longitude || 77.2090,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {stations.map((station) => (
        <Marker
          key={station._id}
          coordinate={{
            latitude: station.latitude,
            longitude: station.longitude,
          }}
          title={station.name}
          description={station.address}
          pinColor={station.available ? "green" : "red"}
        >
          <Callout onPress={() => navigation.navigate("BookingScreen", { stationId: station._id })}>
            <View>
              <Text style={{ fontWeight: "bold" }}>{station.name}</Text>
              <Text>{station.address}</Text>
              <Text>₹{station.price} | {station.vehicleType}</Text>
              <Text style={{ color: station.available ? "green" : "red" }}>
                {station.available ? "Available" : "Unavailable"}
              </Text>
              <Text style={{ color: "blue", marginTop: 4 }}>Tap to Book</Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
