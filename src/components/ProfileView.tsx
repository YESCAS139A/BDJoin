import { Link } from "react-router-dom";

import type { UserProfile } from "../api/profile/types";
import { getProfileActions } from "../lib/profileActions";
import Avatar from "./Avatar";
import RecentFriends from "./RecentFriends";
import UserFeed from "./UserFeed";

type ProfileViewProps = {
  profile: UserProfile;
  onSendRequest: () => void;
  onCancelRequest: () => void;
  onAcceptRequest: () => void;
  onRejectRequest: () => void;
  onRemoveFriend: () => void;
};

const STATUS_LABELS: Record<string, string> = {
  None: "Usuario común",
  PendingSent: "Solicitud enviada",
  PendingReceived: "Te envió una solicitud",
  Friends: "Son amigos",
};

function ProfileView({
  profile,
  onSendRequest,
  onCancelRequest,
  onAcceptRequest,
  onRejectRequest,
  onRemoveFriend,
}: ProfileViewProps) {
  const actions = getProfileActions(profile.relationshipStatus);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar
            src={profile.profileImageUrl}
            size="lg"
            className="border border-gray-200"
          />
          <div className="flex flex-col justify-center leading-tight">
            <span className="text-base font-semibold text-gray-800">
              {profile.name} {profile.lastName}
            </span>
            <span className="text-sm text-gray-500">@{profile.userName}</span>
            <span className="text-sm text-gray-500">
              Friends: {profile.friendsCount}
            </span>
          </div>
        </div>

        {profile.biography && (
          <p className="text-sm text-gray-600 mt-3">{profile.biography}</p>
        )}

        {profile.relationshipStatus !== null && (
          <span className="inline-block mt-3 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
            {STATUS_LABELS[profile.relationshipStatus]}
          </span>
        )}

        <RecentFriends friends={profile.recentFriends} />

        <div className="flex gap-2 mt-4">
          {actions.includes("add_friend") && (
            <button onClick={onSendRequest} className="...">
              Add friend
            </button>
          )}
          {actions.includes("cancel_request") && (
            <button onClick={onCancelRequest} className="...">
              Cancel request
            </button>
          )}
          {actions.includes("accept_request") && (
            <button onClick={onAcceptRequest} className="...">
              Accept
            </button>
          )}
          {actions.includes("reject_request") && (
            <button onClick={onRejectRequest} className="...">
              Reject
            </button>
          )}
          {actions.includes("remove_friend") && (
            <button onClick={onRemoveFriend} className="...">
              Remove friend
            </button>
          )}
          {actions.includes("edit_profile") && (
            <Link to="/account" className="...">
              Edit profile
            </Link>
          )}
          {actions.includes("manage_account") && (
            <Link to="/account" className="...">
              Manage account
            </Link>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800">Feed</h2>
        <UserFeed />
      </div>
    </div>
  );
}

export default ProfileView;
