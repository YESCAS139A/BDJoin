import type { PaginatedResponse } from "../../lib/pagination";

export interface ProfileApi {
  myProfile(): Promise<MyProfile>;
  userProfile(username: string): Promise<UserProfile>;
  updateMyProfile(data: UpdateMyProfile): Promise<MyProfile>;
  searchUsers(
    query: string,
    page?: number,
  ): Promise<PaginatedResponse<UserSearchResult>>;
  sendFriendRequest(username: string): Promise<void>;
  cancelFriendRequest(username: string): Promise<void>;
  acceptFriendRequest(username: string): Promise<void>;
  rejectFriendRequest(username: string): Promise<void>;
  removeFriend(username: string): Promise<void>;
}

export type UserSearchResult = {
  userName: string;
  name?: string;
  lastName?: string;
  profileImageUrl?: string;
  relationshipStatus: RelationshipStatus | null;
};

export type RelationshipStatus =
  | "None"
  | "PendingSent"
  | "PendingReceived"
  | "Friends";

// output de perfil propio — GET /Api/Users/me (confirmado por swagger)
export type MyProfile = {
  userId: string;
  userName: string;
  email: string;
  name?: string;
  lastName?: string;
  biography?: string;
  profileImageUrl?: string;
  birthday?: string;
  recentFriends: FriendSummaryResponse[];
  createdAt: string;
};

export type FriendSummaryResponse = {
  userName: string;
  name?: string;
  profileImageUrl?: string;
};

// output de perfil público — pendiente de confirmar con swagger real
export type UserProfile = {
  userName: string;
  name?: string;
  lastName?: string;
  profileImageUrl?: string;
  relationshipStatus: RelationshipStatus | null;
  biography?: string;
  friendsCount: number;
  recentFriends: FriendSummaryResponse[];
  birthday?: string;
  city?: string;
};

// input de actualización — PATCH /Api/Profile/me
// city se manda (mapea a "location" en el body real), pero el backend
// no lo devuelve al leer /Api/Users/me, así que no se puede prellenar.
export type UpdateMyProfile = {
  name: string;
  lastName: string;
  profileImageUrl?: string;
  biography?: string;
  birthday?: string;
  city?: string;
};

export class ProfileNotFoundError extends Error {
  constructor(username: string) {
    super(`Profile not found: ${username}`);
    this.name = "ProfileNotFoundError";
  }
}
