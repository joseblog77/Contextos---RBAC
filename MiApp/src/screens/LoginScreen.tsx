import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.btn, (!email || !password) && styles.btnDisabled]}
        onPress={handleLogin}
        disabled={!email || !password}
      >
        <Text style={styles.btnText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
  input: {
    width: "75%", backgroundColor: "#fff", borderWidth: 1.5,
    borderColor: "#ccc", borderRadius: 10, padding: 12,
    marginBottom: 14, fontSize: 15,
  },
  btn: { marginTop: 10, backgroundColor: "#4A90E2", paddingVertical: 14, paddingHorizontal: 50, borderRadius: 10 },
  btnDisabled: { backgroundColor: "#aaa" },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});