import { Link } from "react-router-dom";

import Avatar from "./Avatar";

export type RequestItem = {
  requestId: number;
  userName?: string;
  name?: string;
  lastName?: string;
  profileImageUrl?: string;
  senderUsername?: string;
  senderDisplayName?: string;
  senderProfileImageUrl?: string;
  receiverUsername?: string;
  receiverDisplayName?: string;
  receiverProfileImageUrl?: string;
};

type FriendRequestsTableProps = {
  type: "incoming" | "outgoing";
  requests: RequestItem[];
  pendingRequestId?: number | null;
  onAccept?: (requestId: number) => void;
  onReject?: (requestId: number) => void;
  onCancel?: (requestId: number) => void;
};

export default function FriendRequestsTable({
  type,
  requests,
  pendingRequestId,
  onAccept,
  onReject,
  onCancel,
}: FriendRequestsTableProps) {
  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200">
        You have no pending {type === "incoming" ? "incoming" : "outgoing"}{" "}
        requests.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 font-semibold">
              User
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Type
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {requests.map((req) => {
            const targetUsername =
              type === "incoming" ? req.senderUsername : req.receiverUsername;

            const username = targetUsername || req.userName || "";

            const displayName =
              req.senderDisplayName ??
              req.receiverDisplayName ??
              `${req.name ?? ""} ${req.lastName ?? ""}`.trim();

            const avatarUrl =
              req.senderProfileImageUrl ??
              req.receiverProfileImageUrl ??
              req.profileImageUrl;

            const isLoading = pendingRequestId === req.requestId;

            return (
              <tr
                key={req.requestId}
                className="hover:bg-gray-50/80 transition-colors"
              >
                <td className="px-6 py-4">
                  <Link
                    to={username ? `/p/${username}` : "#"}
                    className="flex items-center gap-3 group cursor-pointer w-fit"
                  >
                    <Avatar src={avatarUrl} size="md" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {displayName || username}
                      </span>
                      {username && (
                        <span className="text-xs text-gray-500">
                          @{username}
                        </span>
                      )}
                    </div>
                  </Link>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${
                      type === "incoming"
                        ? "bg-blue-50 text-blue-700 border-blue-100"
                        : "bg-yellow-50 text-yellow-700 border-yellow-100"
                    }`}
                  >
                    {type === "incoming" ? "Incoming" : "Outgoing"}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {type === "incoming" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => onAccept?.(req.requestId)}
                          disabled={isLoading}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
                        >
                          {isLoading ? "Accepting..." : "Accept"}
                        </button>
                        <button
                          type="button"
                          onClick={() => onReject?.(req.requestId)}
                          disabled={isLoading}
                          className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                        >
                          {isLoading ? "Rejecting..." : "Reject"}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onCancel?.(req.requestId)}
                        disabled={isLoading}
                        className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                      >
                        {isLoading ? "Canceling..." : "Cancel Request"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
