import type { PaginatedResponse } from "../../lib/pagination";
import { token } from "../../lib/token";
import { ProfileNotFoundError } from "./types";
import type {
  ProfileApi,
  MyProfile,
  UserProfile,
  UpdateMyProfile,
  RelationshipStatus,
  FriendSummaryResponse,
  UserSearchResult,
  PendingRequestItem,
  FriendListResponse,
  GetFriendsParams,
} from "./types";

const CURRENT_USERNAME = "testuser";
const CURRENT_USER_ID = "u1";

type MockUser = {
  userId: string;
  userName: string;
  email: string;
  name?: string;
  lastName?: string;
  profileImageUrl?: string;
  createdAt: string;
  friendsCount: number;
  biography?: string;
  recentFriends: FriendSummaryResponse[];
  relationshipStatus: RelationshipStatus;
  birthday?: string;
  city?: string;
  requestId: number;
};

const MOCK_USERS: Record<string, MockUser> = {
  testuser: {
    userId: CURRENT_USER_ID,
    userName: "testuser",
    email: "test@example.com",
    name: "Usuario",
    lastName: "de Prueba",
    profileImageUrl: "https://i.pravatar.cc/150?u=testuser",
    createdAt: "2024-01-10T00:00:00Z",
    friendsCount: 4,
    biography: "Hola a todos que tal soy un nuevo usuario",
    recentFriends: [
      {
        userName: "ana",
        name: "Ana",
        profileImageUrl: "https://i.pravatar.cc/150?u=ana",
      },
      {
        userName: "carlos",
        name: "Carlos",
        profileImageUrl: "https://i.pravatar.cc/150?u=carlos",
      },
      {
        userName: "maria",
        name: "María",
        profileImageUrl: "https://i.pravatar.cc/150?u=maria",
      },
      {
        userName: "pedro",
        name: "Pedro",
        profileImageUrl: "https://i.pravatar.cc/150?u=pedro",
      },
    ],
    relationshipStatus: 0,
    birthday: "2000-02-14",
    city: "hermosillo",
    requestId: 0,
  },
  ana: {
    userId: "u2",
    userName: "ana",
    email: "ana@example.com",
    name: "Ana",
    lastName: "López",
    profileImageUrl: "https://i.pravatar.cc/150?u=ana",
    createdAt: "2024-02-01T00:00:00Z",
    friendsCount: 12,
    biography: "Hola soy Ana",
    recentFriends: [],
    relationshipStatus: 3,
    requestId: 101,
  },
  carlos: {
    userId: "u3",
    userName: "carlos",
    email: "carlos@example.com",
    name: "Carlos",
    lastName: "Ruiz",
    profileImageUrl: "https://i.pravatar.cc/150?u=carlos",
    createdAt: "2024-03-01T00:00:00Z",
    friendsCount: 5,
    recentFriends: [],
    relationshipStatus: 2,
    requestId: 102,
  },
  maria: {
    userId: "u4",
    userName: "maria",
    email: "maria@example.com",
    name: "María",
    lastName: "Pérez",
    profileImageUrl: "https://i.pravatar.cc/150?u=maria",
    createdAt: "2024-04-01T00:00:00Z",
    friendsCount: 8,
    recentFriends: [],
    relationshipStatus: 1,
    requestId: 103,
  },
  pedro: {
    userId: "u5",
    userName: "pedro",
    email: "pedro@example.com",
    name: "Pedro",
    lastName: "Sánchez",
    profileImageUrl: "https://i.pravatar.cc/150?u=pedro",
    createdAt: "2024-05-01T00:00:00Z",
    friendsCount: 0,
    recentFriends: [],
    relationshipStatus: 0,
    requestId: 0,
  },
};

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

class MockProfileApi implements ProfileApi {
  async myProfile(): Promise<MyProfile> {
    await delay(null);
    const user = MOCK_USERS[CURRENT_USERNAME];

    return {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      createdAt: user.createdAt,
      biography: user.biography,
      recentFriends: user.recentFriends,
      birthday: user.birthday,
    };
  }

  async userProfile(userName: string): Promise<UserProfile> {
    await delay(null);

    const userKey = Object.keys(MOCK_USERS).find(
      (k) => k.toLowerCase() === userName.toLowerCase(),
    );

    if (!userKey) {
      throw new ProfileNotFoundError(userName);
    }

    const user = MOCK_USERS[userKey];
    const isAuthenticated = token.isAuthenticated();
    const isSelf = userKey === CURRENT_USERNAME && isAuthenticated;

    let computedStatus: RelationshipStatus | null = user.relationshipStatus;

    if (isSelf) {
      computedStatus = null;
    } else if (!isAuthenticated) {
      computedStatus = 0;
    }

    return {
      userId: user.userId,
      userName: user.userName,
      name: user.name,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      biography: user.biography,
      relationshipStatus: computedStatus,
      friendsCount: user.friendsCount,
      recentFriends: user.recentFriends,
      city: user.city,
      requestId: user.requestId,
    };
  }

  async updateMyProfile(data: UpdateMyProfile): Promise<MyProfile> {
    await delay(null);
    const user = MOCK_USERS[CURRENT_USERNAME];

    user.name = data.name;
    user.lastName = data.lastName;
    user.profileImageUrl = data.profileImageUrl;
    user.biography = data.biography;
    user.birthday = data.birthday;
    user.city = data.city;

    return {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      createdAt: user.createdAt,
      biography: user.biography,
      recentFriends: user.recentFriends,
      birthday: user.birthday,
    };
  }

  async sendFriendRequest(userId: string): Promise<void> {
    await delay(undefined);
    const target = Object.values(MOCK_USERS).find(
      (u) => u.userId === userId || u.userName === userId,
    );
    if (target) {
      target.relationshipStatus = 1;
      target.requestId = Math.floor(Math.random() * 1000) + 1;
    }
  }

  async cancelFriendRequest(requestId: number): Promise<void> {
    await delay(undefined);
    const target = Object.values(MOCK_USERS).find(
      (u) => u.requestId === requestId,
    );
    if (target) {
      target.relationshipStatus = 0;
      target.requestId = 0;
    }
  }

  async acceptFriendRequest(requestId: number): Promise<void> {
    await delay(undefined);
    const target = Object.values(MOCK_USERS).find(
      (u) => u.requestId === requestId,
    );
    if (target) {
      target.relationshipStatus = 3;
      target.friendsCount += 1;
    }
  }

  async rejectFriendRequest(requestId: number): Promise<void> {
    await delay(undefined);
    const target = Object.values(MOCK_USERS).find(
      (u) => u.requestId === requestId,
    );
    if (target) {
      target.relationshipStatus = 0;
      target.requestId = 0;
    }
  }

  async removeFriend(userId: string): Promise<void> {
    await delay(undefined);
    const target = Object.values(MOCK_USERS).find(
      (u) => u.userId === userId || u.userName === userId,
    );
    if (target) {
      target.relationshipStatus = 0;
      target.friendsCount = Math.max(0, target.friendsCount - 1);
      target.requestId = 0;
    }
  }

  async searchUsers(
    query: string,
    page = 1,
  ): Promise<PaginatedResponse<UserSearchResult>> {
    await delay(null);

    const normalizedQuery = query.trim().toLowerCase();
    const isAuthenticated = token.isAuthenticated();

    const matches = Object.values(MOCK_USERS).filter((user) => {
      const fullName =
        `${user.name ?? ""} ${user.lastName ?? ""}`.toLowerCase();
      return (
        user.userName.toLowerCase().includes(normalizedQuery) ||
        fullName.includes(normalizedQuery)
      );
    });

    const results: UserSearchResult[] = matches.map((user) => {
      const isSelf = user.userName === CURRENT_USERNAME && isAuthenticated;
      return {
        userId: user.userId,
        username: user.userName,
        userName: user.userName,
        name: user.name,
        lastName: user.lastName,
        displayName: `${user.name ?? ""} ${user.lastName ?? ""}`.trim(),
        profileImageUrl: user.profileImageUrl,
        biography: user.biography,
        relationshipStatus: isSelf ? null : user.relationshipStatus,
        requestId: user.requestId,
      };
    });

    const pageSize = 10;
    const start = (page - 1) * pageSize;

    return {
      items: results.slice(start, start + pageSize),
      page,
      pageSize,
      totalCount: results.length,
      totalPages: Math.ceil(results.length / pageSize) || 1,
    };
  }

  async getIncomingRequests(
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedResponse<PendingRequestItem>> {
    await delay(null);

    const incomingUsers = Object.values(MOCK_USERS).filter(
      (u) => u.relationshipStatus === 2,
    );

    const items: PendingRequestItem[] = incomingUsers.map((u) => ({
      requestId: u.requestId,
      senderId: u.userId,
      senderUsername: u.userName,
      senderDisplayName: `${u.name ?? ""} ${u.lastName ?? ""}`.trim(),
      senderProfileImageUrl: u.profileImageUrl,
      createdAt: u.createdAt,
      status: "Pending",
    }));

    const start = (page - 1) * pageSize;

    return {
      items: items.slice(start, start + pageSize),
      page,
      pageSize,
      totalCount: items.length,
      totalPages: Math.ceil(items.length / pageSize) || 1,
    };
  }

  async getOutgoingRequests(
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedResponse<PendingRequestItem>> {
    await delay(null);

    const outgoingUsers = Object.values(MOCK_USERS).filter(
      (u) => u.relationshipStatus === 1,
    );

    const items: PendingRequestItem[] = outgoingUsers.map((u) => ({
      requestId: u.requestId,
      senderId: CURRENT_USER_ID,
      senderUsername: CURRENT_USERNAME,
      senderDisplayName: "Usuario de Prueba",
      senderProfileImageUrl: MOCK_USERS[CURRENT_USERNAME].profileImageUrl,
      createdAt: u.createdAt,
      status: "Pending",
    }));

    const start = (page - 1) * pageSize;

    return {
      items: items.slice(start, start + pageSize),
      page,
      pageSize,
      totalCount: items.length,
      totalPages: Math.ceil(items.length / pageSize) || 1,
    };
  }

  async getFriends(params: GetFriendsParams): Promise<FriendListResponse> {
    await delay(null);

    const pageIndex = params.pageIndex ?? 1;
    const pageSize = params.pageSize ?? 10;

    const friendsList = Object.values(MOCK_USERS).filter(
      (u) => u.relationshipStatus === 3 && u.userName !== CURRENT_USERNAME,
    );

    const items = friendsList.map((u) => ({
      userId: u.userId,
      username: u.userName,
      displayName: `${u.name ?? ""} ${u.lastName ?? ""}`.trim(),
      avatarUrl: u.profileImageUrl,
      becameFriendsAt: u.createdAt,
    }));

    const start = (pageIndex - 1) * pageSize;
    const paginatedItems = items.slice(start, start + pageSize);
    const totalPages = Math.ceil(items.length / pageSize) || 1;

    return {
      pageIndex,
      pageSize,
      totalCount: items.length,
      totalPages,
      hasPreviousPage: pageIndex > 1,
      hasNextPage: pageIndex < totalPages,
      items: paginatedItems,
    };
  }
}

export default new MockProfileApi();
