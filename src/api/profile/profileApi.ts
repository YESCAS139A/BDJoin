import axios from "axios";

import { api } from "../httpClient";
import {
  type ProfileApi as IProfileApi,
  type MyProfile,
  type UserProfile,
  type UpdateMyProfile,
  ProfileNotFoundError,
} from "./types";

class ProfileApi implements IProfileApi {
  private route = "/profile";

  async myProfile(): Promise<MyProfile> {
    const endpoint = `${this.route}/me`;
    const response = await api.get<MyProfile>(endpoint);
    return response.data;
  }

  async userProfile(userName: string): Promise<UserProfile> {
    const endpoint = `${this.route}/${userName}`;

    try {
      const response = await api.get<UserProfile>(endpoint);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 404) {
          throw new ProfileNotFoundError(userName);
        }

        if (status === 401 || status === 403) {
          throw new ProfileNotFoundError(userName);
        }
      }
      throw error;
    }
  }

  async updateMyProfile(data: UpdateMyProfile): Promise<MyProfile> {
    const endpoint = `${this.route}/me`;
    const response = await api.put<MyProfile>(endpoint, data);
    return response.data;
  }

  async sendFriendRequest(userName: string): Promise<void> {
    await api.post("/friends/requests", { userName });
  }

  async cancelFriendRequest(userName: string): Promise<void> {
    await api.delete(`/friends/requests/outgoing/${userName}`);
  }

  async acceptFriendRequest(userName: string): Promise<void> {
    await api.post(`/friends/requests/incoming/${userName}/accept`);
  }

  async rejectFriendRequest(userName: string): Promise<void> {
    await api.post(`/friends/requests/incoming/${userName}/reject`);
  }

  async removeFriend(userName: string): Promise<void> {
    await api.delete(`/friends/${userName}`);
  }
}

export default new ProfileApi();
