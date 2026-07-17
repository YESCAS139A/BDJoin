import { createContext, useEffect, useState, type ReactNode } from "react";

import type { CurrentUser } from "./types";
import authApi from ".";
import { token } from "../../lib/token";

export type AuthContextType = {
  user: CurrentUser | null;
  isLoading: boolean;
  setUser: (user: CurrentUser | null) => void;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function loadUser() {
      if (token.isAuthenticated()) {
        try {
          const currentUser = await authApi.getMe();
          setUser(currentUser);
        } catch {
          token.clear();
          setUser(null);
        }
      }
      setIsLoading(false);
    }
    loadUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
