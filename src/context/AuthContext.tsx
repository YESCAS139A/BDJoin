import { createContext, useState, type ReactNode } from "react";

import type { CurrentUser } from "../api/auth/types";

export type AuthContextType = {
  user: CurrentUser | null;
  isLoading: boolean;
  setUser: (
    user:
      | CurrentUser
      | null
      | ((prev: CurrentUser | null) => CurrentUser | null),
  ) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);

  // Sin endpoint /Api/Auth/me, no hay forma de revalidar sesión en cada mount.
  // isLoading se resuelve de inmediato; requireAuth sigue protegiendo rutas
  // usando solo el token, no dependemos de este contexto para eso.
  const isLoading = false;

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
