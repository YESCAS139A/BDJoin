import React, { useState, useEffect } from "react";
import FriendCard, { type FriendItem } from "./FriendCard";

type FriendsListProps = {
  fetchFriendsApi: (params: {
    page: number;
    search: string;
    sort: "asc" | "desc";
  }) => Promise<{ items: FriendItem[]; totalPages: number }>;
  onRemoveFriendApi: (userId: string) => Promise<void>;
};

export const FriendsList: React.FC<FriendsListProps> = ({
  fetchFriendsApi,
  onRemoveFriendApi,
}) => {
  const [friends, setFriends] = useState<FriendItem[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFriends = async () => {
      setIsLoading(true);
      try {
        const res = await fetchFriendsApi({ page, search, sort });
        if (isMounted) {
          setFriends(res.items || []);
          setTotalPages(res.totalPages || 1);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error loading friends:", error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadFriends();

    return () => {
      isMounted = false;
    };
  }, [page, search, sort, fetchFriendsApi]);

  const handleRemove = async (userId: string, username: string) => {
    if (!window.confirm(`Are you sure you want to remove @${username}?`))
      return;

    try {
      await onRemoveFriendApi(userId);
      setFriends((prev) => prev.filter((f) => f.userId !== userId));
    } catch {
      alert("Failed to remove friend.");
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-gray-200 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Friends</h2>
          <p className="text-xs text-gray-500">
            Manage and view all your connected friends.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
              viewMode === "table"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Table
          </button>
          <button
            type="button"
            onClick={() => setViewMode("cards")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
              viewMode === "cards"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search friends by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none cursor-pointer"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-sm text-gray-400 bg-white rounded-xl border border-gray-200">
          Loading friends...
        </div>
      ) : friends.length === 0 ? (
        <div className="p-10 text-center bg-white rounded-xl border border-gray-200 space-y-2">
          <p className="font-semibold text-gray-700">No friends found</p>
          <p className="text-xs text-gray-400">
            {search
              ? "Try adjusting your search criteria."
              : "You haven't added any friends yet."}
          </p>
        </div>
      ) : viewMode === "table" ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100 shadow-sm">
          {friends.map((friend) => (
            <FriendCard
              key={friend.userId}
              friend={friend}
              viewMode="table"
              onRemoveFriend={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <FriendCard
              key={friend.userId}
              friend={friend}
              viewMode="cards"
              onRemoveFriend={handleRemove}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 text-xs border border-gray-200 bg-white rounded-lg disabled:opacity-50 cursor-pointer hover:bg-gray-50 transition"
          >
            Previous
          </button>
          <span className="text-xs text-gray-500 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 text-xs border border-gray-200 bg-white rounded-lg disabled:opacity-50 cursor-pointer hover:bg-gray-50 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendsList;
