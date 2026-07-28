import { PostNotFoundError } from "./types";
import type { PostApi, Post, CreatePost, UpdatePost } from "./types";
import type { PaginatedResponse } from "../../lib/pagination";

const CURRENT_USERNAME = "testuser";
const CURRENT_USER_ID = "u1";
const CURRENT_AUTHOR_NAME = "Usuario de Prueba";
const PAGE_SIZE = 10;

let mockPosts: Post[] = [
  {
    id: 1,
    userId: CURRENT_USER_ID,
    authorUserName: CURRENT_USERNAME,
    author: CURRENT_AUTHOR_NAME,
    content: "Mi primer post de prueba",
    createdDate: "2024-06-01T10:00:00Z",
    createdBy: CURRENT_USERNAME,
    lastModifiedDate: null,
    lastModifiedBy: null,
  },
  {
    id: 2,
    userId: "u2",
    authorUserName: "ana",
    author: "Ana López",
    content: "¡Hola a todos!",
    createdDate: "2024-06-02T12:00:00Z",
    createdBy: "ana",
    lastModifiedDate: null,
    lastModifiedBy: null,
  },
];

let nextId = 3;

function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function paginate(items: Post[], page: number): PaginatedResponse<Post> {
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = items.slice(start, start + PAGE_SIZE);
  return {
    items: pageItems,
    page,
    pageSize: PAGE_SIZE,
    totalCount: items.length,
    totalPages: Math.ceil(items.length / PAGE_SIZE) || 1,
  };
}

class MockPostApi implements PostApi {
  async createPost(data: CreatePost): Promise<Post> {
    await delay(null);
    const newPost: Post = {
      id: nextId++,
      userId: CURRENT_USER_ID,
      authorUserName: CURRENT_USERNAME,
      author: CURRENT_AUTHOR_NAME,
      content: data.content,
      createdDate: new Date().toISOString(),
      createdBy: CURRENT_USERNAME,
      lastModifiedDate: null,
      lastModifiedBy: null,
    };
    mockPosts = [newPost, ...mockPosts];
    return newPost;
  }

  async getPostById(postId: number): Promise<Post> {
    await delay(null);
    const post = mockPosts.find((p) => p.id === postId);
    if (!post) throw new PostNotFoundError(postId);
    return post;
  }

  async getUserPosts(
    userName: string,
    page = 1,
  ): Promise<PaginatedResponse<Post>> {
    await delay(null);
    const userPosts = mockPosts.filter((p) => p.authorUserName === userName);
    return paginate(userPosts, page);
  }

  async getHomeFeed(page = 1): Promise<PaginatedResponse<Post>> {
    await delay(null);
    return paginate(mockPosts, page);
  }

  async updatePost(postId: number, data: UpdatePost): Promise<Post> {
    await delay(null);
    const post = mockPosts.find((p) => p.id === postId);
    if (!post) throw new PostNotFoundError(postId);

    post.content = data.content;
    post.lastModifiedDate = new Date().toISOString();
    post.lastModifiedBy = CURRENT_USERNAME;

    return post;
  }

  async deletePost(postId: number): Promise<void> {
    await delay(undefined);
    mockPosts = mockPosts.filter((p) => p.id !== postId);
  }
}

export default new MockPostApi();
