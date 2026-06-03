import { createContext, useContext, useState } from "react";

// 1. Tipado del contexto
type AuthContextType = {
  isLoggedIn: boolean;
  role: string | null;
  login: (selectedRole: string) => void;
  logout: () => void;
};

// 2. Creación del contexto
const AuthContext = createContext(null as AuthContextType | null);

// 4. Hook personalizado para consumir el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

// 3. Provider: maneja el estado global de autenticación y rol
export const AuthProvider = ({ children }: { children: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null as string | null);

  const login = (selectedRole: string) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

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