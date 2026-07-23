import { useEffect, useState } from "react";

import profileApi from "../../api/profile";
import type {
  MyProfile as MyProfileType,
  UpdateMyProfile,
} from "../../api/profile/types";
import FormAccount from "../../components/FormAccount";

function MyProfileAccount() {
  const [profile, setProfile] = useState<MyProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    profileApi
      .myProfile()
      .then(setProfile)
      .finally(() => setIsLoading(false));
  }, []);

  async function handleSubmit(data: UpdateMyProfile) {
    setIsSaving(true);
    try {
      const updated = await profileApi.updateMyProfile(data);
      setProfile(updated);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading)
    return <p className="text-center justify-center">Cargando...</p>;
  if (!profile)
    return (
      <p className="text-center justify-center">No se pudo cargar tu perfil.</p>
    );

  return (
    <div>
      <FormAccount
        initialData={profile}
        onSubmit={handleSubmit}
        isSaving={isSaving}
      />
    </div>
  );
}

export default MyProfileAccount;
