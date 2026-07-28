import { useEffect, useState } from "react";

import profileApi from "../../api/profile";
import type { MyProfile } from "../../api/profile/types";
import FormProfile from "../../components/Profile";

function Profile() {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    profileApi
      .myProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error al cargar el perfil:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-500 font-medium">
        Loading profile...
      </p>
    );
  }

  if (!profile) {
    return (
      <p className="text-center mt-10 text-red-500 font-medium">
        The profile information could not be loaded.
      </p>
    );
  }

  return <FormProfile data={profile} />;
}

export default Profile;
