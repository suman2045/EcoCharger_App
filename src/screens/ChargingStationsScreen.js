import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
  Switch,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { API_URL } from "../configs/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";

export default function ChargingStationsScreen() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [available, setAvailable] = useState(true);

  const navigation = useNavigation();

  const fetchStations = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/stations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setStations(data);
      } else {
        Alert.alert("Error", "Failed to fetch stations");
      }
    } catch (error) {
      Alert.alert("Error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStation = async () => {
    if (!name || !address || !price || !vehicleType) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    const token = await AsyncStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/stations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          address,
          available,
          price,
          vehicleType,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Station added successfully");
        setName("");
        setAddress("");
        setPrice("");
        setVehicleType("");
        setAvailable(true);
        fetchStations();
      } else {
        Alert.alert("Error", data.message || "Failed to add station");
      }
    } catch (error) {
      Alert.alert("Error", "Network error");
    }
  };

  const handleDelete = async (id) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/stations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchStations();
      } else {
        Alert.alert("Error", "Failed to delete station");
      }
    } catch (err) {
      Alert.alert("Error", "Network error");
    }
  };
  const openGoogleMaps = () => {
    const url = "https://www.google.com/maps"; // You can make this dynamic later if needed
    Linking.openURL(url).catch(err => Alert.alert("Error", "Failed to open link."));
  };
  
  useEffect(() => {
    fetchStations();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.form}>
        <Text style={styles.heading}>Add Charging Station</Text>
        <TextInput
          style={styles.input}
          placeholder="Station Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Vehicle Type (e.g., Car, Bike)"
          value={vehicleType}
          onChangeText={setVehicleType}
        />
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Available</Text>
          <Switch value={available} onValueChange={setAvailable} />
        </View>
        <Button title="Add Station" onPress={handleAddStation} color="#43a047" />
      </View>

      <FlatList
        data={stations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>{item.address}</Text>
            <Text style={styles.cardText}>Price: ₹{item.price}/Unit</Text>
            <Text style={styles.cardText}>Vehicle: {item.vehicleType}</Text>
            <View style={styles.cardActions}>
              <Button
                title="Book"
                onPress={() =>
                  navigation.navigate("BookingScreen", { stationId: item._id })
                }
                color="#ffcc00"
              />
              {/* <Button
                title="Delete"
                color="red"
                onPress={() => handleDelete(item._id)}
              /> */}
              
            </View>
            <TouchableOpacity style={styles.menuButton} onPress={openGoogleMaps}>
  <Text style={styles.menuText}>🗺️ Open Google Maps</Text>
</TouchableOpacity>

          </View>
        )}
        refreshing={loading}
        onRefresh={fetchStations}
      />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e8f5e9",
    marginTop: 50,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginBottom: 20,
    padding: 25,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#388e3c",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#388e3c",
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: "#c8e6c9",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f1f8e9",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  toggleLabel: {
    fontSize: 16,
    color: "#388e3c",
  },
  card: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#c8e6c9",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#388e3c",
  },
  cardText: {
    fontSize: 16,
    color: "#4caf50",
    marginVertical: 2,
    fontWeight:'600'
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  menuButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
});
