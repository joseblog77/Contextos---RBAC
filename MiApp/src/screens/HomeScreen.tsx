import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { logout, role } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Home</Text>
      <Text style={styles.info}>Rol actual: {role}</Text>
      <TouchableOpacity style={styles.btn} onPress={logout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  info: { fontSize: 16, color: "#555", marginBottom: 30 },
  btn: { backgroundColor: "#e74c3c", paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});