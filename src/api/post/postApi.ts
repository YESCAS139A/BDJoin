import axios from "axios";

import { api } from "../httpClient";
import {
  type PostApi as IPostApi,
  type Post,
  type CreatePost,
  type UpdatePost,
  PostNotFoundError,
  type SortOrder,
} from "./types";
import type { PaginatedResponse } from "../../lib/pagination";

class PostApi implements IPostApi {
  private route = "/Api/Post";

  async createPost(data: CreatePost): Promise<Post> {
    const response = await api.post<Post>(this.route, data);
    return response.data;
  }

  async getPostById(postId: number): Promise<Post> {
    try {
      const response = await api.get<Post>(`${this.route}/${postId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new PostNotFoundError(postId);
      }
      throw error;
    }
  }

  async getUserPosts(
    userName: string,
    page = 1,
  ): Promise<PaginatedResponse<Post>> {
    const response = await api.get<PaginatedResponse<Post>>(
      `${this.route}/user/${userName}`,
      { params: { page } },
    );
    return response.data;
  }

  async getHomeFeed(page = 1): Promise<PaginatedResponse<Post>> {
    const response = await api.get<PaginatedResponse<Post>>(`/api/Feed`, {
      params: { page },
    });
    return response.data;
  }

  async getFeedFriends(
    page = 1,
    sort: SortOrder = "asc",
  ): Promise<PaginatedResponse<Post>> {
    const response = await api.get<PaginatedResponse<Post>>(
      `/api/Feed/friends`,
      { params: { page, sort } },
    );
    return response.data;
  }

  async updatePost(postId: number, data: UpdatePost): Promise<Post> {
    const response = await api.put<Post>(`${this.route}/${postId}`, data);
    return response.data;
  }

  async deletePost(postId: number): Promise<void> {
    await api.delete(`${this.route}/${postId}`);
  }
}

export default new PostApi();
