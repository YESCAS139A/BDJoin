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
  None: "Regular user",
  PendingSent: "Application submitted",
  PendingReceived: "He sent you a request",
  Friends: "They're friends",
};

function ProfileView({
  profile,
  onSendRequest,
  onCancelRequest,
  onAcceptRequest,
  onRejectRequest,
  onRemoveFriend,
}: ProfileViewProps) {
  const actions = getProfileActions(profile.relationshipStatus) ?? [];

  const isSelf = profile.relationshipStatus === null;

  const displayName = `${profile.name ?? ""} ${profile.lastName ?? ""}`.trim();

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <Avatar
            src={profile.profileImageUrl}
            size="lg"
            className="border border-gray-200"
          />
          <div className="flex flex-col justify-center leading-tight">
            <span className="text-lg font-bold text-gray-900">
              {displayName || profile.userName}
            </span>
            <span className="text-sm text-gray-500">@{profile.userName}</span>
            <span className="text-xs text-gray-500 mt-1 font-medium">
              Friends: {profile.friendsCount ?? 0}
            </span>
          </div>
        </div>

        {profile.biography && (
          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 whitespace-pre-line">
            {profile.biography}
          </p>
        )}

        {!isSelf && profile.relationshipStatus && (
          <div>
            <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              {STATUS_LABELS[profile.relationshipStatus] || "Desconocido"}
            </span>
          </div>
        )}

        <RecentFriends friends={profile.recentFriends} />

        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          {actions.includes("add_friend") && (
            <button
              onClick={onSendRequest}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              Add a friend
            </button>
          )}

          {actions.includes("cancel_request") && (
            <button
              onClick={onCancelRequest}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel Request
            </button>
          )}

          {actions.includes("accept_request") && (
            <button
              onClick={onAcceptRequest}
              className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
            >
              Accept Request
            </button>
          )}

          {actions.includes("reject_request") && (
            <button
              onClick={onRejectRequest}
              className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              Reject
            </button>
          )}

          {actions.includes("remove_friend") && (
            <button
              onClick={onRemoveFriend}
              className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              Remove from my friends
            </button>
          )}

          {actions.includes("edit_profile") && (
            <Link
              to="/account"
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Edit Profile
            </Link>
          )}

          {actions.includes("manage_account") && (
            <Link
              to="/account"
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Manage Account
            </Link>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800">
          {isSelf ? "My Posts" : `Publications by @${profile.userName}`}
        </h2>

        <UserFeed
          userName={profile.userName}
          showOwnerActions={isSelf}
          emptyMessage={
            isSelf
              ? "You haven't posted anything yet."
              : "This user hasn't posted anything yet."
          }
        />
      </div>
    </div>
  );
}

export default ProfileView;
