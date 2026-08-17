import { Link } from "react-router-dom";

import type { FriendSummaryResponse } from "../api/profile/types";
import Avatar from "./Avatar";

type RecentFriendsProps = {
  friends?: FriendSummaryResponse[];
};

function RecentFriends({ friends = [] }: RecentFriendsProps) {
  if (!friends || friends.length === 0) {
    return (
      <div className="mt-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Recent Friends
        </p>
        <p className="text-sm text-gray-400">No recent friends.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-sm font-semibold text-gray-700 mb-2">Recent Friends</p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 bg-gray-50 border border-gray-100 rounded-lg p-3">
        {friends.map((friend) => (
          <Link
            key={friend.userName}
            to={`/p/${friend.userName}`}
            className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <Avatar src={friend.profileImageUrl} size="sm" />
            <span className="text-xs text-gray-600 truncate w-full text-center">
              {friend.userName}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentFriends;
