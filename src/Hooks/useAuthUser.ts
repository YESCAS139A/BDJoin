import { useState, useEffect } from "react";
import profileApi from "../api/profile";
import { token } from "../lib/token";

export type AuthUser = {
  userName: string;
  displayName: string;
  avatar?: string;
  email?: string;
};

export default function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  // Inicializamos isLoading evaluando si hay un token guardado para evitar el error del linter
  const [isLoading, setIsLoading] = useState<boolean>(() =>
    token.isAuthenticated(),
  );

  useEffect(() => {
    if (!token.isAuthenticated()) {
      return;
    }

    profileApi
      .myProfile()
      .then((data) => {
        const nameParts = [data.name, data.lastName].filter(Boolean).join(" ");

        setUser({
          userName: data.userName,
          displayName: nameParts || data.userName,
          avatar: data.profileImageUrl,
          email: data.email,
        });
      })
      .catch((error) => {
        console.error("Error al obtener la información del usuario:", error);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { user, setUser, isLoading };
}
