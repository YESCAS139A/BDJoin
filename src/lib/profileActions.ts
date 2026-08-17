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
  isSelf: boolean,
): ProfileAction[] {
  if (isSelf) return ["edit_profile", "manage_account"];
  if (status === null || status === undefined) return ["add_friend"];
  switch (status) {
    case 0:
      return ["add_friend"];
    case 1:
      return ["cancel_request"];
    case 2:
      return ["accept_request", "reject_request"];
    case 3:
      return ["remove_friend"];
    default:
      return [];
  }
}
