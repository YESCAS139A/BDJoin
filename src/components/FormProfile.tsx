import Label from "./Label";
import Avatar from "./Avatar";
import Button from "./Button";
import RecentFriends from "./RecentFriends";
import UserFeed from "./UserFeed";
import type { MyProfile } from "../api/profile/types";

type UserInfoData = {
  initialData?: MyProfile;
};

type FormProfileProps = {
  data?: UserInfoData | MyProfile;
};

const FormProfile = ({ data }: FormProfileProps) => {
  const profile = (data && "initialData" in data ? data.initialData : data) as
    | MyProfile
    | undefined;

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  const displayName = `${profile.name ?? ""} ${profile.lastName ?? ""}`.trim();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-800 text-lg">Profile</h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <Avatar
              src={profile.profileImageUrl}
              size="lg"
              className="border-2 border-white shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {profile.userName}
              </span>
              <span className="text-xl font-bold text-gray-900">
                {displayName || "unnamed"}
              </span>
            </div>
          </div>

          <div>
            <Label
              className="text-sm font-semibold text-gray-700"
              name="Biography"
            />
            <div className="w-full mt-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 min-h-[80px] whitespace-pre-wrap">
              {profile.biography || "Sin biografía."}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                className="text-sm font-semibold text-gray-700"
                name="Birthday"
              />
              <div className="w-full mt-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                {profile.birthday || "-"}
              </div>
            </div>
            <div>
              <Label
                className="text-sm font-semibold text-gray-700"
                name="City"
              />
              <div className="w-full mt-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                {profile.city || "-"}
              </div>
            </div>
            <span className="text-sm text-gray-500">
              Friends: {profile.friendsCount ?? 0}
            </span>
            <RecentFriends friends={profile.recentFriends} />
          </div>
          <Button name="Account" type="button" nav="/account" />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800">My Posts</h2>
        <UserFeed />
      </div>
    </div>
  );
};

export default FormProfile;
