// hooks/useAuthUser.ts
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
  const [isLoading, setIsLoading] = useState<boolean>(() =>
    token.isAuthenticated(),
  );

  useEffect(() => {
    const loadUser = async () => {
      if (!token.isAuthenticated()) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await profileApi.myProfile();
        const nameParts = [data.name, data.lastName].filter(Boolean).join(" ");

        setUser({
          userName: data.userName,
          displayName: nameParts || data.userName,
          avatar: data.profileImageUrl,
          email: data.email,
        });
      } catch (error) {
        console.error("Error retrieving user information:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  return { user, setUser, isLoading };
}
