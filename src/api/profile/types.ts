// Interface que nos ayuda a definir como contraro y que las dos de afuerzas tengan los mismos metodos asi pueden ser intercambiable entre mock y api real
export interface ProfileApi {
  myProfile(): Promise<MyProfile>;
  userProfile(username: string): Promise<UserProfile>;
  updateMyProfile(data: UpdateMyProfile): Promise<MyProfile>;
  sendFriendRequest(username: string): Promise<void>;
  cancelFriendRequest(username: string): Promise<void>;
  acceptFriendRequest(username: string): Promise<void>;
  rejectFriendRequest(username: string): Promise<void>;
  removeFriend(username: string): Promise<void>;
}

//Tipo de relacion con los usuarios
export type RelationshipStatus =
  | "None"
  | "PendingSent"
  | "PendingReceived"
  | "Friends";

//output de perfil propio
export type MyProfile = {
  userName: string;
  email: string;
  name?: string;
  lastName?: string;
  profileImageUrl?: string;
  createdAt: string;
  biography?: string;
  friendsCount: number;
  recentFriends: FriendSummaryResponse[];
  birthday?: string;
  city?: string;
};

//Tipo que obtendra los 5 amigos mas recientes agg
export type FriendSummaryResponse = {
  userName: string;
  name?: string;
  lastName?: string;
  profileImageUrl?: string;
};

//output de perfil publico
export type UserProfile = {
  userName: string;
  name?: string;
  lastName?: string;
  profileImageUrl?: string;
  relationshipStatus: RelationshipStatus | null; //null es para el perfil propio
  biography?: string;
  friendsCount: number;
  recentFriends: FriendSummaryResponse[];
  birthday?: string;
  city?: string;
};

//input de perfil de dueño
export type UpdateMyProfile = {
  name: string;
  lastName: string;
  profileImageUrl?: string;
  biography?: string;
  birthday?: string;
  city?: string;
};

//mensaje de error si el perfil no existe
export class ProfileNotFoundError extends Error {
  constructor(username: string) {
    super(`Profile not found: ${username}`);
    this.name = "ProfileNotFoundError";
  }
}
