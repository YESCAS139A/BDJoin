import { useEffect, useState } from "react";

import profileApi from "../../api/profile";
import type { MyProfile } from "../../api/profile/types";
import FormProfile from "../../components/Profile";
import UserFeed from "../../components/UserFeed";

function ProfilePage() {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    profileApi
      .myProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error loading profile:", error);
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

  const currentUsername =
    profile.userName || (profile as unknown as { username?: string }).username;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <FormProfile data={profile} />

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800">My Posts</h2>
        {currentUsername ? (
          <UserFeed
            userName={currentUsername}
            showOwnerActions={true}
            showSortControl={true}
          />
        ) : (
          <p className="text-sm text-gray-400">Username not found.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
