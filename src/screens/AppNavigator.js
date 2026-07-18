import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../auth/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ChargingStationsScreen from "../screens/ChargingStationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../auth/RegisterScreen";
import BookingScreen from './BookingScreen'
import UpdateProfileScreen from "./UpdateProfileScreen";
 import TipsScreen from './TipsScreen'
import OnbordingScreen from "./OnboardingScreen";

const Stack = createNativeStackNavigator();
    
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="OnbordingScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnbordingScreen" component={OnbordingScreen} />
      
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ChargingStationsScreen" component={ChargingStationsScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} />
      <Stack.Screen name="TipsScreen" component={TipsScreen} />




    </Stack.Navigator>
  );
}
