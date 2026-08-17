import { useEffect, useState } from "react";

import profileApi from "../../../api/profile";
import type { MyProfile } from "../../../api/profile/types";

export function useSettings() {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAccountInfo() {
      try {
        const data = await profileApi.myProfile();
        if (isMounted) {
          setProfile(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading the account:", err);
          setError("The account information could not be retrieved.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchAccountInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedCreatedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return {
    profile,
    isLoading,
    error,
    formattedCreatedDate,
  };
}
