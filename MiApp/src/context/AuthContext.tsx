import { createContext, useContext, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { Alert } from "react-native";

type User = {
  token: string;
  email: string;
} | null;

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const setUserSession = (data: any) => {
    const session = data.session;
    if (session && session.user) {
      setUser({
        token: session.access_token,
        email: session.user.email,
      });
    } else {
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert("Error al iniciar sesion", error.message);
    }
    setUserSession(data);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};