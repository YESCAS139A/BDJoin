import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profileApi from "../../api/profile";
import type {
  PendingRequestItem,
  OutgoingRequestItem,
} from "../../api/profile/types";
import Avatar from "../../components/Avatar";
import FriendRequestsTable, {
  type RequestItem,
} from "../../components/FriendRequestsTable";

type TabType = "incoming" | "outgoing";
type ViewMode = "table" | "cards";

const Request = () => {
  const [activeTab, setActiveTab] = useState<TabType>("incoming");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const [incoming, setIncoming] = useState<PendingRequestItem[]>([]);
  const [outgoing, setOutgoing] = useState<OutgoingRequestItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const reloadRequests = async () => {
    try {
      const [incRes, outRes] = await Promise.all([
        profileApi.getIncomingRequests(),
        profileApi.getOutgoingRequests(),
      ]);
      setIncoming(incRes.items ?? []);
      setOutgoing(outRes.items ?? []);
    } catch (error) {
      console.error("Error updating requests:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchInitialData() {
      try {
        const [incRes, outRes] = await Promise.all([
          profileApi.getIncomingRequests(),
          profileApi.getOutgoingRequests(),
        ]);
        if (isMounted) {
          setIncoming(incRes.items ?? []);
          setOutgoing(outRes.items ?? []);
        }
      } catch (error) {
        console.error("Error loading requests:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAccept = async (requestId: number) => {
    setActionLoadingId(requestId);
    try {
      await profileApi.acceptFriendRequest(requestId);
      await reloadRequests();
    } catch (error) {
      console.error("Error accepting the request:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (requestId: number) => {
    setActionLoadingId(requestId);
    try {
      await profileApi.rejectFriendRequest(requestId);
      await reloadRequests();
    } catch (error) {
      console.error("Error rejecting the request:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleCancel = async (requestId: number) => {
    setActionLoadingId(requestId);
    try {
      await profileApi.cancelFriendRequest(requestId);
      await reloadRequests();
    } catch (error) {
      console.error("Error canceling the request:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const currentRequests: RequestItem[] =
    activeTab === "incoming"
      ? (incoming as RequestItem[])
      : (outgoing as RequestItem[]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Friend Requests</h1>
          <p className="text-xs text-gray-500">
            Manage your incoming and sent requests.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg text-xs font-semibold text-gray-600">
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              viewMode === "table"
                ? "bg-white text-gray-900 shadow-sm"
                : "hover:text-gray-900"
            }`}
          >
            Table
          </button>
          <button
            type="button"
            onClick={() => setViewMode("cards")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              viewMode === "cards"
                ? "bg-white text-gray-900 shadow-sm"
                : "hover:text-gray-900"
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200 text-sm font-semibold text-gray-500">
        <button
          type="button"
          onClick={() => setActiveTab("incoming")}
          className={`pb-3 px-4 border-b-2 transition-colors ${
            activeTab === "incoming"
              ? "border-blue-600 text-blue-600"
              : "border-transparent hover:text-gray-800"
          }`}
        >
          Incoming ({incoming.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("outgoing")}
          className={`pb-3 px-4 border-b-2 transition-colors ${
            activeTab === "outgoing"
              ? "border-blue-600 text-blue-600"
              : "border-transparent hover:text-gray-800"
          }`}
        >
          Outgoing ({outgoing.length})
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-sm text-gray-500">
          Loading requests...
        </div>
      ) : viewMode === "table" ? (
        <FriendRequestsTable
          type={activeTab}
          requests={currentRequests}
          pendingRequestId={actionLoadingId}
          onAccept={handleAccept}
          onReject={handleReject}
          onCancel={handleCancel}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentRequests.length === 0 ? (
            <div className="col-span-full text-center py-12 text-sm text-gray-500 bg-white rounded-xl border border-gray-200">
              You have no pending{" "}
              {activeTab === "incoming" ? "incoming" : "outgoing"} requests.
            </div>
          ) : (
            currentRequests.map((req) => {
              const username =
                req.userName ??
                req.senderUsername ??
                req.receiverUsername ??
                "";
              const displayName =
                req.senderDisplayName ??
                req.receiverDisplayName ??
                `${req.name ?? ""} ${req.lastName ?? ""}`.trim();
              const avatarUrl =
                req.profileImageUrl ??
                req.senderProfileImageUrl ??
                req.receiverProfileImageUrl;
              const isLoading = actionLoadingId === req.requestId;

              return (
                <div
                  key={req.requestId}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center space-y-3"
                >
                  <Link
                    to={username ? `/p/${username}` : "#"}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div className="group-hover:opacity-85 transition-opacity">
                      <Avatar src={avatarUrl} size="lg" />
                    </div>

                    <div className="flex flex-col mt-2">
                      <span className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                        {displayName || username}
                      </span>
                      {username && (
                        <span className="text-xs text-gray-500">
                          @{username}
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="w-full pt-2 flex flex-col gap-2">
                    {activeTab === "incoming" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleAccept(req.requestId)}
                          disabled={isLoading}
                          className="w-full py-1.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg transition-colors"
                        >
                          {isLoading ? "Accepting..." : "Accept"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(req.requestId)}
                          disabled={isLoading}
                          className="w-full py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 rounded-lg transition-colors"
                        >
                          {isLoading ? "Rejecting..." : "Reject"}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleCancel(req.requestId)}
                        disabled={isLoading}
                        className="w-full py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg transition-colors"
                      >
                        {isLoading ? "Canceling..." : "Cancel Request"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Request;
