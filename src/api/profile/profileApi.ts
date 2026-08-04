import axios from "axios";
import { api } from "../httpClient";

import {
  type ProfileApi as IProfileApi,
  type MyProfile,
  type UserProfile,
  type UpdateMyProfile,
  ProfileNotFoundError,
  type UserSearchResult,
} from "./types";
import type { PaginatedResponse } from "../../lib/pagination";

class ProfileApi implements IProfileApi {
  private profileRoute = "/Api/Profile";
  private usersRoute = "/Api/Users";
  private friendRoute = "/Api/Friend";

  async myProfile(): Promise<MyProfile> {
    const response = await api.get<MyProfile>(`${this.usersRoute}/me`);
    return response.data;
  }

  async userProfile(userName: string): Promise<UserProfile> {
    try {
      const response = await api.get<UserProfile>(
        `${this.profileRoute}/${userName}`,
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 404 || status === 401 || status === 403) {
          throw new ProfileNotFoundError(userName);
        }
      }
      throw error;
    }
  }

  async updateMyProfile(data: UpdateMyProfile): Promise<MyProfile> {
    let formattedBirthday: string | null = null;
    if (data.birthday) {
      const parsedDate = new Date(data.birthday);
      if (!isNaN(parsedDate.getTime())) {
        formattedBirthday = parsedDate.toISOString();
      }
    }

    // Extensión tipada sin usar 'any' para evitar la regla de ESLint
    const customData = data as UpdateMyProfile & {
      userId?: string;
      location?: string;
    };

    // Payload idéntico al esquema Swagger PATCH /Api/Profile/me
    const payload = {
      userId: customData.userId || undefined,
      name: data.name || null,
      lastName: data.lastName || null,
      biography: data.biography || null,
      location: data.city || customData.location || null,
      profileImageUrl: data.profileImageUrl || null,
      birthday: formattedBirthday,
    };

    const response = await api.patch<MyProfile>(
      `${this.profileRoute}/me`,
      payload,
    );
    return response.data;
  }

  async searchUsers(
    query: string,
    page = 1,
  ): Promise<PaginatedResponse<UserSearchResult>> {
    const response = await api.get<PaginatedResponse<UserSearchResult>>(
      `${this.usersRoute}/search`,
      { params: { q: query, page } },
    );
    return response.data;
  }

  async sendFriendRequest(userName: string): Promise<void> {
    await api.post(`${this.friendRoute}/request`, { username: userName });
  }

  async cancelFriendRequest(userName: string): Promise<void> {
    await api.post(`${this.friendRoute}/cancel/${userName}`);
  }

  async acceptFriendRequest(userName: string): Promise<void> {
    await api.post(`${this.friendRoute}/accept/${userName}`);
  }

  async rejectFriendRequest(userName: string): Promise<void> {
    await api.post(`${this.friendRoute}/reject/${userName}`);
  }

  async removeFriend(userName: string): Promise<void> {
    await api.delete(`${this.friendRoute}/${userName}`);
  }
}

export default new ProfileApi();
