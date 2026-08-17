import type { PaginatedResponse } from "../../lib/pagination";

export interface ProfileApi {
  myProfile(): Promise<MyProfile>;
  userProfile(username: string): Promise<UserProfile>;
  updateMyProfile(data: UpdateMyProfile): Promise<MyProfile>;
  searchUsers(
    query: string,
    page?: number,
  ): Promise<PaginatedResponse<UserSearchResult>>;
  sendFriendRequest(userId: string): Promise<void>;
  cancelFriendRequest(requestId: number): Promise<void>;
  acceptFriendRequest(requestId: number): Promise<void>;
  rejectFriendRequest(requestId: number): Promise<void>;
  removeFriend(userId: string): Promise<void>;
  getIncomingRequests(
    page?: number,
    pageSize?: number,
  ): Promise<PaginatedResponse<PendingRequestItem>>;
  getOutgoingRequests(
    page?: number,
    pageSize?: number,
  ): Promise<PaginatedResponse<PendingRequestItem>>;
  getFriends(params: GetFriendsParams): Promise<FriendListResponse>;
}

export type PendingRequestItem = {
  requestId: number;
  senderId: string;
  senderUsername: string;
  senderDisplayName: string;
  senderProfileImageUrl?: string | null;
  createdAt: string;
  status: string;
};

export type UserSearchResult = {
  userId?: string;
  username: string;
  userName?: string;
  displayName?: string;
  name?: string;
  lastName?: string;
  biography?: string;
  profileImageUrl?: string;
  relationshipStatus: RelationshipStatus | null;
  requestId: number;
  isDeleted?: boolean;
};

export type RelationshipStatus = 0 | 1 | 2 | 3;

export type MyProfile = {
  userId: string;
  userName: string;
  email: string;
  name?: string;
  lastName?: string;
  biography?: string;
  profileImageUrl?: string;
  birthday?: string;
  city?: string;
  friendsCount?: string;
  recentFriends: FriendSummaryResponse[];
  createdAt: string;
};

export type FriendSummaryResponse = {
  userName: string;
  name?: string;
  profileImageUrl?: string;
};

export type UserProfile = {
  userId: string;
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
  requestId: number;
};

export type UpdateMyProfile = {
  name?: string;
  lastName?: string;
  profileImageUrl?: string;
  biography?: string;
  birthday?: string;
  city?: string;
};

export type OutgoingRequestItem = {
  requestId: number;
  receiverId?: string;
  receiverUsername?: string;
  targetUserId?: string;
  status?: string;
  createdAt?: string;
};

export type FriendItem = {
  userId: string;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
  becameFriendsAt: string;
};

export type FriendListResponse = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: FriendItem[];
};

export type GetFriendsParams = {
  pageIndex?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: "Username" | "BecameFriendsAt";
  sortDescending?: boolean;
};

export class ProfileNotFoundError extends Error {
  constructor(username: string) {
    super(`Profile not found: ${username}`);
    this.name = "ProfileNotFoundError";
  }
}
