import axios from "axios";

import { api } from "../httpClient";

import {
  type ProfileApi as IProfileApi,
  type MyProfile,
  type UserProfile,
  type UpdateMyProfile,
  ProfileNotFoundError,
  type UserSearchResult,
  type PendingRequestItem,
  type GetFriendsParams,
  type FriendListResponse,
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
      const safeUsername = encodeURIComponent(userName.trim().toLowerCase());
      const response = await api.get<UserProfile>(
        `${this.profileRoute}/${safeUsername}`,
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
    const current = await this.myProfile();

    let formattedBirthday: string | null = current.birthday ?? null;
    if (data.birthday !== undefined) {
      if (data.birthday) {
        const parsedDate = new Date(data.birthday);
        if (!isNaN(parsedDate.getTime())) {
          formattedBirthday = parsedDate.toISOString();
        }
      } else {
        formattedBirthday = null;
      }
    }

    const payload = {
      userId: current.userId,
      userName: current.userName,
      name: data.name !== undefined ? data.name : (current.name ?? ""),
      lastName:
        data.lastName !== undefined ? data.lastName : (current.lastName ?? ""),
      biography:
        data.biography !== undefined
          ? data.biography
          : (current.biography ?? ""),
      location: data.city !== undefined ? data.city : (current.city ?? ""),
      profileImageUrl:
        data.profileImageUrl !== undefined
          ? data.profileImageUrl
          : (current.profileImageUrl ?? ""),
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
      {
        params: {
          searchTerm: query,
          pageIndex: page,
          pageSize: 10,
        },
      },
    );
    return response.data;
  }

  async sendFriendRequest(userId: string): Promise<void> {
    await api.post(`${this.friendRoute}/request`, { receiverId: userId });
  }

  async cancelFriendRequest(requestId: number): Promise<void> {
    await api.post(`${this.friendRoute}/cancel/${requestId}`);
  }

  async acceptFriendRequest(requestId: number): Promise<void> {
    await api.post(`${this.friendRoute}/accept/${requestId}`);
  }

  async rejectFriendRequest(requestId: number): Promise<void> {
    await api.post(`${this.friendRoute}/reject/${requestId}`);
  }

  async removeFriend(userId: string): Promise<void> {
    await api.delete(`${this.friendRoute}/${userId}`);
  }

  async getIncomingRequests(
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedResponse<PendingRequestItem>> {
    const response = await api.get<PaginatedResponse<PendingRequestItem>>(
      `${this.friendRoute}/pending`,
      {
        params: { pageIndex: page, pageSize },
      },
    );
    return response.data;
  }

  async getOutgoingRequests(
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedResponse<PendingRequestItem>> {
    const response = await api.get<PaginatedResponse<PendingRequestItem>>(
      `${this.friendRoute}/sent`,
      {
        params: { pageIndex: page, pageSize },
      },
    );
    return response.data;
  }

  async getFriends(params: GetFriendsParams = {}): Promise<FriendListResponse> {
    const {
      pageIndex = 1,
      pageSize = 10,
      searchTerm = "",
      sortBy = "Username",
      sortDescending = false,
    } = params;

    const response = await api.get<FriendListResponse>(
      `${this.friendRoute}/list`,
      {
        params: {
          pageIndex,
          pageSize,
          searchTerm: searchTerm || undefined,
          sortBy,
          sortDescending,
        },
      },
    );
    return response.data;
  }
}

export default new ProfileApi();
