import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen.tsx";
import SettingsScreen from "../screens/SettingsScreen";
import { useAuth } from "../context/AuthContext";

type TabsParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {
  const { role } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName={role === "admin" ? "Settings" : "Home"}
      screenOptions={{ tabBarActiveTintColor: "#4A90E2" }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Inicio" }} />
      {role === "admin" && (
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Configuración" }} />
      )}
    </Tab.Navigator>
  );
}