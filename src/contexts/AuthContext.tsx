import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@shared/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, User & { password: string }> = {
  "admin@ministere-tourisme.mg": {
    id: "1",
    nom: "Administrateur National",
    email: "admin@ministere-tourisme.mg",
    password: "admin123",
    role: "national",
    actif: true,
    date_creation: "2024-01-01",
  },
  "directeur.atsinanana@region.mg": {
    id: "2",
    nom: "Jean Rakoto",
    email: "directeur.atsinanana@region.mg",
    password: "region123",
    role: "regional",
    region_id: "1",
    actif: true,
    date_creation: "2024-01-01",
  },
  "directeur.boeny@region.mg": {
    id: "3",
    nom: "Marie Andry",
    email: "directeur.boeny@region.mg",
    password: "region123",
    role: "regional",
    region_id: "2",
    actif: true,
    date_creation: "2024-01-01",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on app load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers[email];
    if (user && user.password === password && user.actif) {
      const { password: _, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
