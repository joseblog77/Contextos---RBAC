import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const [selectedRole, setSelectedRole] = useState(null as string | null);
  const { login } = useAuth();

  const handleIngresar = () => {
    if (selectedRole) {
      login(selectedRole);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>Selecciona tu rol:</Text>

      <TouchableOpacity
        style={[styles.roleButton, selectedRole === "admin" && styles.selected]}
        onPress={() => setSelectedRole("admin")}
      >
        <View style={styles.radio}>
          {selectedRole === "admin" && <View style={styles.radioDot} />}
        </View>
        <Text style={styles.roleText}>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.roleButton, selectedRole === "common" && styles.selected]}
        onPress={() => setSelectedRole("common")}
      >
        <View style={styles.radio}>
          {selectedRole === "common" && <View style={styles.radioDot} />}
        </View>
        <Text style={styles.roleText}>Common</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, !selectedRole && styles.btnDisabled]}
        onPress={handleIngresar}
        disabled={!selectedRole}
      >
        <Text style={styles.btnText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20, color: "#555" },
  roleButton: {
    flexDirection: "row", alignItems: "center",
    padding: 14, marginVertical: 8, width: "70%",
    borderWidth: 2, borderColor: "#ccc", borderRadius: 10,
    backgroundColor: "#fff",
  },
  selected: { borderColor: "#4A90E2", backgroundColor: "#e8f0fe" },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: "#4A90E2",
    marginRight: 12, justifyContent: "center", alignItems: "center",
  },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#4A90E2" },
  roleText: { fontSize: 16 },
  btn: {
    marginTop: 30, backgroundColor: "#4A90E2",
    paddingVertical: 14, paddingHorizontal: 50, borderRadius: 10,
  },
  btnDisabled: { backgroundColor: "#aaa" },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});