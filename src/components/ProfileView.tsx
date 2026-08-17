import { Link } from "react-router-dom";

import type { UserProfile } from "../api/profile/types";
import { getProfileActions } from "../lib/profileActions";
import Avatar from "./Avatar";
import RecentFriends from "./RecentFriends";
import UserFeed from "./UserFeed";
import type { PendingAction } from "../pages/profile/PublicProfile";

type ProfileViewProps = {
  profile: UserProfile;
  onSendRequest: () => void;
  onCancelRequest: () => void;
  onAcceptRequest: () => void;
  onRejectRequest: () => void;
  onRemoveFriend: () => void;
  pendingAction?: PendingAction;
};

const STATUS_LABELS: Record<number | string, string> = {
  0: "Regular user",
  1: "Application submitted",
  2: "He sent you a request",
  3: "They're friends",
};

function ProfileView({
  profile,
  pendingAction,
  onSendRequest,
  onCancelRequest,
  onAcceptRequest,
  onRejectRequest,
  onRemoveFriend,
}: ProfileViewProps) {
  const isSelf = profile.relationshipStatus === null;

  const actions = getProfileActions(profile.relationshipStatus, isSelf) ?? [];

  const displayName = `${profile.name ?? ""} ${profile.lastName ?? ""}`.trim();

  const isPending = Boolean(pendingAction);

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
            <span className="text-sm text-gray-500">{profile.userName}</span>
            <span className="text-xs text-gray-500 mt-1 font-medium">
              Friends: {profile.friendsCount}
            </span>
          </div>
        </div>

        {profile.biography && (
          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 whitespace-pre-line">
            {profile.biography}
          </p>
        )}

        {!isSelf && profile.relationshipStatus !== null ? (
          <div>
            <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              {STATUS_LABELS[profile.relationshipStatus] || "Unknown"}
            </span>
          </div>
        ) : null}
        <RecentFriends friends={profile.recentFriends} />

        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          {actions.includes("add_friend") && (
            <button
              type="button"
              onClick={onSendRequest}
              disabled={isPending}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
            >
              {pendingAction === "send" ? "sending..." : "Add a friend"}
            </button>
          )}

          {actions.includes("cancel_request") && (
            <button
              type="button"
              onClick={onCancelRequest}
              disabled={isPending}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {pendingAction === "cancel" ? "canceling..." : "Cancel Request"}
            </button>
          )}

          {actions.includes("accept_request") && (
            <button
              type="button"
              onClick={onAcceptRequest}
              disabled={isPending}
              className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
            >
              {pendingAction === "accept" ? "accepting..." : "Accept Request"}
            </button>
          )}

          {actions.includes("reject_request") && (
            <button
              type="button"
              onClick={onRejectRequest}
              disabled={isPending}
              className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {pendingAction === "reject" ? "Rechazando..." : "Reject"}
            </button>
          )}

          {actions.includes("remove_friend") && (
            <button
              type="button"
              onClick={onRemoveFriend}
              disabled={isPending}
              className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {pendingAction === "remove"
                ? "removinge we..."
                : "Remove from my friends"}
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
          {isSelf ? "My Posts" : `Publications by ${profile.userName}`}
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
