import type { RelationshipStatus } from "../api/profile/types";

export type ProfileAction =
  | "add_friend"
  | "cancel_request"
  | "accept_request"
  | "reject_request"
  | "remove_friend"
  | "edit_profile"
  | "manage_account";

export function getProfileActions(
  status: RelationshipStatus | null | undefined,
): ProfileAction[] {
  if (status === null) return ["edit_profile", "manage_account"];

  switch (status) {
    case "None":
      return ["add_friend"];
    case "PendingSent":
      return ["cancel_request"];
    case "PendingReceived":
      return ["accept_request", "reject_request"];
    case "Friends":
      return ["remove_friend"];
    default:
      return [];
  }
}
