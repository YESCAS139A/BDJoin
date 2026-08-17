import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import profileApi from "../api/profile";
import type {
  RelationshipStatus,
  UserSearchResult,
} from "../api/profile/types";
import Avatar from "./Avatar";

const STATUS_LABELS: Record<Exclude<RelationshipStatus, 0>, string> = {
  1: "Application submitted",
  2: "He sent you a request",
  3: "They're friends",
};

function SearchUsers() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSearchResult[] | null>(null);
  const [hasError, setHasError] = useState(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setResults(null);
      setHasError(false);
    }
  };

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed === "") {
      return;
    }

    let ignore = false;
    const timeoutId = setTimeout(() => {
      profileApi
        .searchUsers(trimmed)
        .then((result) => {
          if (!ignore) {
            setResults(result.items || []);
            setHasError(false);
          }
        })
        .catch((error) => {
          console.error("Error retrieving users:", error);
          if (!ignore) {
            setHasError(true);
            setResults([]);
          }
        });
    }, 700);

    return () => {
      ignore = true;
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search by username or name..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      />

      {query.trim() !== "" && results === null && !hasError && (
        <p className="text-sm text-gray-400">Searching...</p>
      )}

      {hasError && (
        <p className="text-sm text-red-500">
          The search could not be completed. Please try again.
        </p>
      )}

      {results !== null && !hasError && results.length === 0 && (
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            No users were found for “{query.trim()}”.
          </p>
        </div>
      )}

      {results !== null && results.length > 0 && (
        <div className="space-y-2">
          {results.map((user) => {
            const username = user.username || user.userName || "";

            const displayName =
              user.displayName ||
              `${user.name ?? ""} ${user.lastName ?? ""}`.trim() ||
              username;

            const profileAvatar = user.profileImageUrl;

            const status = user.relationshipStatus;

            const statusLabel =
              status !== null && status !== 0
                ? STATUS_LABELS[status as Exclude<RelationshipStatus, 0>]
                : null;

            return (
              <Link
                key={user.userId || username}
                to={`/p/${username}`}
                className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <Avatar src={profileAvatar} size="sm" />
                <div className="flex flex-col leading-tight flex-1">
                  <span className="text-sm font-semibold text-gray-800">
                    {displayName}
                  </span>
                  <span className="text-xs text-gray-500">@{username}</span>
                </div>

                {statusLabel && (
                  <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {statusLabel}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchUsers;
