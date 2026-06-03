import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  // Estado local para el rol seleccionado
  const [rolSeleccionado, setRolSeleccionado] = useState<string | null>(null);
  const { login } = useAuth();

  const handleIngresar = () => {
    if (rolSeleccionado) {
      // Guarda el rol en AuthContext y marca la sesión como iniciada
      login(rolSeleccionado);
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Iniciar Sesión</Text>
      <Text style={estilos.subtitulo}>Selecciona tu rol:</Text>

      {/* Botón simulado para Admin */}
      <TouchableOpacity
        style={[estilos.botonRol, rolSeleccionado === "admin" && estilos.seleccionado]}
        onPress={() => setRolSeleccionado("admin")}
      >
        <View style={estilos.radio}>
          {rolSeleccionado === "admin" && <View style={estilos.radioPunto} />}
        </View>
        <Text style={estilos.textoRol}>Admin</Text>
      </TouchableOpacity>

      {/* Botón simulado para Common */}
      <TouchableOpacity
        style={[estilos.botonRol, rolSeleccionado === "common" && estilos.seleccionado]}
        onPress={() => setRolSeleccionado("common")}
      >
        <View style={estilos.radio}>
          {rolSeleccionado === "common" && <View style={estilos.radioPunto} />}
        </View>
        <Text style={estilos.textoRol}>Common</Text>
      </TouchableOpacity>

      {/* Botón Ingresar */}
      <TouchableOpacity
        style={[estilos.boton, !rolSeleccionado && estilos.botonDeshabilitado]}
        onPress={handleIngresar}
        disabled={!rolSeleccionado}
      >
        <Text style={estilos.textoBoton}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  titulo: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitulo: { fontSize: 16, marginBottom: 20, color: "#555" },
  botonRol: {
    flexDirection: "row", alignItems: "center",
    padding: 14, marginVertical: 8, width: "70%",
    borderWidth: 2, borderColor: "#ccc", borderRadius: 10,
    backgroundColor: "#fff",
  },
  seleccionado: { borderColor: "#4A90E2", backgroundColor: "#e8f0fe" },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: "#4A90E2",
    marginRight: 12, justifyContent: "center", alignItems: "center",
  },
  radioPunto: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#4A90E2" },
  textoRol: { fontSize: 16 },
  boton: {
    marginTop: 30, backgroundColor: "#4A90E2",
    paddingVertical: 14, paddingHorizontal: 50, borderRadius: 10,
  },
  botonDeshabilitado: { backgroundColor: "#aaa" },
  textoBoton: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});