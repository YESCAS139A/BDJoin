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
  city?: string; // se conserva solo en el mock para simular UserProfile público
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
    relationshipStatus: "None",
    birthday: "2000-02-14",
    city: "hermosillo",
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
    relationshipStatus: "Friends",
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
    relationshipStatus: "PendingReceived",
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
    relationshipStatus: "PendingSent",
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
    relationshipStatus: "None",
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
      computedStatus = "None";
    }

    return {
      userName: user.userName,
      name: user.name,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      biography: user.biography,
      relationshipStatus: computedStatus,
      friendsCount: user.friendsCount,
      recentFriends: user.recentFriends,
      city: user.city,
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
    user.city = data.city; // se guarda en el mock aunque el backend real no lo devuelva

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

  async sendFriendRequest(userName: string): Promise<void> {
    await delay(undefined);
    if (MOCK_USERS[userName]) {
      MOCK_USERS[userName].relationshipStatus = "PendingSent";
    }
  }

  async cancelFriendRequest(userName: string): Promise<void> {
    await delay(undefined);
    if (MOCK_USERS[userName]) {
      MOCK_USERS[userName].relationshipStatus = "None";
    }
  }

  async acceptFriendRequest(userName: string): Promise<void> {
    await delay(undefined);
    if (MOCK_USERS[userName]) {
      MOCK_USERS[userName].relationshipStatus = "Friends";
      MOCK_USERS[userName].friendsCount += 1;
    }
  }

  async rejectFriendRequest(userName: string): Promise<void> {
    await delay(undefined);
    if (MOCK_USERS[userName]) {
      MOCK_USERS[userName].relationshipStatus = "None";
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
        userName: user.userName,
        name: user.name,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
        relationshipStatus: isSelf ? null : user.relationshipStatus,
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

  async removeFriend(userName: string): Promise<void> {
    await delay(undefined);
    if (MOCK_USERS[userName]) {
      MOCK_USERS[userName].relationshipStatus = "None";
      MOCK_USERS[userName].friendsCount = Math.max(
        0,
        MOCK_USERS[userName].friendsCount - 1,
      );
    }
  }
}

export default new MockProfileApi();
