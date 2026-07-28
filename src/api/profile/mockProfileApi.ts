import { token } from "../../lib/token";
import { ProfileNotFoundError } from "./types";
import type {
  ProfileApi,
  MyProfile,
  UserProfile,
  UpdateMyProfile,
  RelationshipStatus,
  FriendSummaryResponse,
} from "./types";

const CURRENT_USERNAME = "testuser";

type MockUser = {
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
};

const MOCK_USERS: Record<string, MockUser> = {
  testuser: {
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
        lastName: "López",
        profileImageUrl: "https://i.pravatar.cc/150?u=ana",
      },
      {
        userName: "carlos",
        name: "Carlos",
        lastName: "Ruiz",
        profileImageUrl: "https://i.pravatar.cc/150?u=carlos",
      },
      {
        userName: "maria",
        name: "María",
        lastName: "Pérez",
        profileImageUrl: "https://i.pravatar.cc/150?u=maria",
      },
      {
        userName: "pedro",
        name: "Pedro",
        lastName: "Sánchez",
        profileImageUrl: "https://i.pravatar.cc/150?u=pedro",
      },
    ],
    relationshipStatus: "None",
    birthday: "14-feb-2000",
    city: "hermosillo",
  },
  ana: {
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
      userName: user.userName,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      createdAt: user.createdAt,
      biography: user.biography,
      friendsCount: user.friendsCount,
      recentFriends: user.recentFriends,
      birthday: user.birthday,
      city: user.city,
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
    };
  }

  async updateMyProfile(data: UpdateMyProfile): Promise<MyProfile> {
    await delay(null);
    const user = MOCK_USERS[CURRENT_USERNAME];

    user.name = data.name;
    user.lastName = data.lastName;
    user.profileImageUrl = data.profileImageUrl;
    user.biography = data.biography;

    return {
      userName: user.userName,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      createdAt: user.createdAt,
      biography: user.biography,
      friendsCount: user.friendsCount,
      recentFriends: user.recentFriends,
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
