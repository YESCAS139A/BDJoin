import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import profileApi from "../api/profile/profileApi";
import type { MyProfile } from "../api/profile/types";
import Avatar from "./Avatar";
import SearchUsers from "./SearchUsers";

interface ExtendedRequestItem {
  requestId: number;
  senderUsername?: string;
  senderDisplayName?: string;
  senderProfileImageUrl?: string | null;
  receiverUsername?: string;
  receiverDisplayName?: string;
  receiverProfileImageUrl?: string | null;
  userName?: string;
  displayName?: string;
  profileImageUrl?: string | null;
}

interface RecentFriendItem {
  userName?: string;
  name?: string;
  profileImageUrl?: string | null;
}

export default function FriendsSummary() {
  const [myProfile, setMyProfile] = useState<MyProfile | null>(null);
  const [incomingRequests, setIncomingRequests] = useState<
    ExtendedRequestItem[]
  >([]);
  const [outgoingRequests, setOutgoingRequests] = useState<
    ExtendedRequestItem[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverviewData() {
      try {
        setLoading(true);
        const [profileData, incomingData, outgoingData] = await Promise.all([
          profileApi.myProfile(),
          profileApi.getIncomingRequests(1, 3),
          profileApi.getOutgoingRequests(1, 3),
        ]);

        setMyProfile(profileData);
        setIncomingRequests(
          (incomingData.items as unknown as ExtendedRequestItem[]) ?? [],
        );
        setOutgoingRequests(
          (outgoingData.items as unknown as ExtendedRequestItem[]) ?? [],
        );
      } catch (error) {
        console.error("Error loading friends list:", error);
      } finally {
        setLoading(false);
      }
    }

    loadOverviewData();
  }, []);

  const profileWithFriends = myProfile as unknown as {
    recentFriends?: RecentFriendItem[];
  };
  const recentFriends = profileWithFriends?.recentFriends?.slice(0, 10) ?? [];

  return (
    <aside className="w-80 shrink-0 flex-col gap-6 p-4 border-l border-gray-200 bg-white hidden lg:flex">
      <SearchUsers />

      {loading ? (
        <div className="text-center py-6 text-sm text-gray-400">
          Loading summary...
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Incoming request
              </h3>
              <Link
                to="/request?tab=incoming"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                See all
              </Link>
            </div>

            {incomingRequests.length === 0 ? (
              <p className="text-xs text-gray-400">No pending requests</p>
            ) : (
              <div className="flex flex-col gap-2">
                {incomingRequests.map((req) => {
                  const username = req.senderUsername || req.userName || "";
                  const displayName =
                    req.senderDisplayName || req.displayName || username;
                  const avatarUrl =
                    req.senderProfileImageUrl ??
                    req.profileImageUrl ??
                    undefined;

                  return (
                    <Link
                      key={req.requestId}
                      to={username ? `/p/${username}` : "#"}
                      className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Avatar src={avatarUrl} size="sm" />
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-semibold text-gray-800 truncate">
                          {displayName}
                        </span>
                        {username && (
                          <span className="text-[10px] text-gray-400 truncate">
                            @{username}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Outgoing Requests
              </h3>
              <Link
                to="/request?tab=outgoing"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                See all
              </Link>
            </div>

            {outgoingRequests.length === 0 ? (
              <p className="text-xs text-gray-400">
                You haven't sent any request
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {outgoingRequests.map((req) => {
                  const username = req.receiverUsername || req.userName || "";
                  const displayName =
                    req.receiverDisplayName || req.displayName || username;
                  const avatarUrl =
                    req.receiverProfileImageUrl ??
                    req.profileImageUrl ??
                    undefined;

                  return (
                    <Link
                      key={req.requestId}
                      to={username ? `/p/${username}` : "#"}
                      className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Avatar src={avatarUrl} size="sm" />
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-semibold text-gray-800 truncate">
                          {displayName}
                        </span>
                        {username && (
                          <span className="text-[10px] text-gray-400 truncate">
                            @{username}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Recent Friends
              </h3>
              <Link
                to="/friends"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View the complete list
              </Link>
            </div>

            {recentFriends.length === 0 ? (
              <p className="text-xs text-gray-400">
                You haven't added any friends yet
              </p>
            ) : (
              <div className="grid grid-cols-5 gap-2">
                {recentFriends.map((friend, index) => (
                  <Link
                    key={friend.userName || index}
                    to={friend.userName ? `/p/${friend.userName}` : "#"}
                    title={friend.name || friend.userName}
                    className="flex flex-col items-center group"
                  >
                    <Avatar
                      src={friend.profileImageUrl ?? undefined}
                      size="md"
                      className="group-hover:ring-2 group-hover:ring-blue-500 transition-all"
                    />
                    <span className="text-[10px] text-gray-600 truncate w-full text-center mt-1">
                      {friend.userName}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </aside>
  );
}
