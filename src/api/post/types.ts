import type { PaginatedResponse } from "../../lib/pagination";

//contrato para mock y api
export interface PostApi {
  createPost(data: CreatePost): Promise<Post>;
  getPostById(postId: number): Promise<Post>;
  getUserPosts(
    userName: string,
    page?: number,
  ): Promise<PaginatedResponse<Post>>;
  getHomeFeed(page?: number): Promise<PaginatedResponse<Post>>;
  updatePost(postId: number, data: UpdatePost): Promise<Post>;
  deletePost(postId: number): Promise<void>;
}

export type SortOrder = "asc" | "desc";

//output post propio
export type Post = {
  id: number;
  userId: string;
  authorUserName: string;
  author: string;
  content: string;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string | null;
  lastModifiedBy: string | null;
};

// inptut para los post
export type CreatePost = {
  content: string;
};

//input que actualiza el post
export type UpdatePost = {
  content: string;
};

export class PostNotFoundError extends Error {
  constructor(postId: number) {
    super(`Post not found: ${postId}`);
    this.name = "PostNotFoundError";
  }
}
