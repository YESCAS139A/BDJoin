import { useState, useEffect } from "react";
import profileApi from "../../api/profile";
import FormAccount from "../../components/FormAccount";
import useAuthUser from "../../hooks/useAuthUser";
import { token } from "../../lib/token";
import type { MyProfile, UpdateMyProfile } from "../../api/profile/types";

const Account = () => {
  const { user, setUser } = useAuthUser();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<MyProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token.isAuthenticated()) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await profileApi.myProfile();
        setProfileData(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmitProfile = async (
    data: UpdateMyProfile,
  ): Promise<MyProfile> => {
    const updatedProfile = await profileApi.updateMyProfile(data);

    const newFirstName = data.name ?? profileData?.name ?? "";
    const newLastName = data.lastName ?? profileData?.lastName ?? "";
    const newDisplayName =
      `${newFirstName} ${newLastName}`.trim() || updatedProfile.userName;

    const newProfileData = {
      ...updatedProfile,
      displayName: newDisplayName,
    };
    setProfileData(newProfileData);

    setUser({
      userName: updatedProfile.userName,
      displayName: newDisplayName,
      avatar:
        data.profileImageUrl !== undefined
          ? data.profileImageUrl
          : user?.avatar,
      email: updatedProfile.email,
    });

    return newProfileData;
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-gray-500">
        Loading account...
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-red-500">
        Error loading profile data.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <FormAccount initialData={profileData} onSubmit={handleSubmitProfile} />
    </div>
  );
};

export default Account;
