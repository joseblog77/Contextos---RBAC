import { createContext, useContext, useState } from "react";

// 1. Tipado del contexto
type AuthContextType = {
  isLoggedIn: boolean;
  role: string | null;
  login: (selectedRole: string) => void;
  logout: () => void;
};

// 2. Creación del contexto
const AuthContext = createContext<AuthContextType | null>(null);

// 4. Hook personalizado para consumir el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

// 3. Provider: maneja el estado global de autenticación y rol
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  // Guarda el rol seleccionado y marca sesión como iniciada
  const login = (selectedRole: string) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  // Limpia el estado al cerrar sesión
  const logout = () => {
    setRole(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};