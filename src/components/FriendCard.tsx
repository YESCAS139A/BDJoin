import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export type FriendItem = {
  userId: string;
  username: string;
  displayName?: string;
  avatarUrl?: string | null;
  becameFriendsAt: string;
};

type FriendCardProps = {
  friend: FriendItem;
  viewMode: "table" | "cards";
  onRemoveFriend: (userId: string, username: string) => void;
};

export const FriendCard: React.FC<FriendCardProps> = ({
  friend,
  viewMode,
  onRemoveFriend,
}) => {
  const formattedDate = friend.becameFriendsAt
    ? new Date(friend.becameFriendsAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently";

  const displayName = friend.displayName || friend.username;

  if (viewMode === "table") {
    return (
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition">
        <Link
          to={`/p/${friend.username}`}
          className="flex items-center gap-3 group"
        >
          <Avatar src={friend.avatarUrl || undefined} size="md" />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition">
              {displayName}
            </span>
            <span className="text-xs text-gray-500">@{friend.username}</span>
          </div>
        </Link>

        <div className="text-xs text-gray-400 font-medium">
          Friend since: {formattedDate}
        </div>

        <button
          type="button"
          onClick={() => onRemoveFriend(friend.userId, friend.username)}
          className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition cursor-pointer"
        >
          Remove Friend
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition text-center justify-between">
      <Link
        to={`/p/${friend.username}`}
        className="flex flex-col items-center gap-2 group w-full"
      >
        <Avatar src={friend.avatarUrl || undefined} size="lg" />
        <div className="flex flex-col w-full px-1">
          <span className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition">
            {displayName}
          </span>
          <span className="text-xs text-gray-500 truncate">
            @{friend.username}
          </span>
        </div>
      </Link>

      <span className="text-[11px] text-gray-400 mt-2 mb-3">
        Since {formattedDate}
      </span>

      <button
        type="button"
        onClick={() => onRemoveFriend(friend.userId, friend.username)}
        className="w-full py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-gray-200 rounded-lg transition cursor-pointer"
      >
        Remove
      </button>
    </div>
  );
};

export default FriendCard;
