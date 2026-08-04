import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import profileApi from "../api/profile";
import type { UserSearchResult } from "../api/profile/types";
import Avatar from "./Avatar";

const STATUS_LABELS: Record<string, string> = {
  None: "Usuario común",
  PendingSent: "Solicitud enviada",
  PendingReceived: "Te envió una solicitud",
  Friends: "Son amigos",
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
            setResults(result.items);
            setHasError(false);
          }
        })
        .catch(() => {
          if (!ignore) {
            setHasError(true);
            setResults([]);
          }
        });
    }, 300);

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
        placeholder="Buscar por username o nombre..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      />

      {query.trim() !== "" && results === null && !hasError && (
        <p className="text-sm text-gray-400">Buscando...</p>
      )}

      {hasError && (
        <p className="text-sm text-red-500">
          No se pudo completar la búsqueda. Intenta de nuevo.
        </p>
      )}

      {results !== null && !hasError && results.length === 0 && (
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            No se encontraron usuarios para “{query.trim()}”.
          </p>
        </div>
      )}

      {results !== null && results.length > 0 && (
        <div className="space-y-2">
          {results.map((user) => {
            const displayName =
              `${user.name ?? ""} ${user.lastName ?? ""}`.trim();
            const statusLabel =
              user.relationshipStatus !== null
                ? STATUS_LABELS[user.relationshipStatus]
                : "Tu perfil";

            return (
              <Link
                key={user.userName}
                to={`/p/${user.userName}`}
                className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <Avatar src={user.profileImageUrl} size="sm" />
                <div className="flex flex-col leading-tight flex-1">
                  <span className="text-sm font-semibold text-gray-800">
                    {displayName || user.userName}
                  </span>
                  <span className="text-xs text-gray-500">
                    @{user.userName}
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {statusLabel}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchUsers;
