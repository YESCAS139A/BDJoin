import React from "react";

import type { PendingRequestItem } from "../api/profile/types";

type RequestCardProps = {
  item: PendingRequestItem;
  type: "incoming" | "outgoing";
  onAccept?: (requestId: number) => void;
  onReject?: (requestId: number) => void;
  onCancel?: (requestId: number) => void;
};

const RequestCard: React.FC<RequestCardProps> = ({
  item,
  type,
  onAccept,
  onReject,
  onCancel,
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 overflow-hidden">
          {item.senderProfileImageUrl ? (
            <img
              src={item.senderProfileImageUrl}
              alt={item.senderUsername}
              className="w-full h-full object-cover"
            />
          ) : (
            item.senderUsername[0]?.toUpperCase()
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-sm">
            {item.senderUsername}
          </span>
          <span className="text-xs text-gray-500">
            {item.senderDisplayName || item.senderUsername}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {type === "incoming" ? (
          <>
            <button
              type="button"
              onClick={() => onAccept?.(item.requestId)}
              className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => onReject?.(item.requestId)}
              className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => onCancel?.(item.requestId)}
            className="px-3 py-1 text-xs font-semibold bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
