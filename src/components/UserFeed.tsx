import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import postApi from "../api/post";
import type { Post } from "../api/post/types";

type UserFeedProps = {
  userName?: string;
  showOwnerActions?: boolean;
  emptyMessage?: string;
};

function UserFeed({
  userName,
  showOwnerActions = false,
  emptyMessage = "There are no posts available.",
}: UserFeedProps) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    const request = userName
      ? postApi.getUserPosts(userName)
      : postApi.getHomeFeed();

    request.then((result) => {
      if (!ignore) {
        setPosts(result.items);
      }
    });

    return () => {
      ignore = true;
    };
  }, [userName, reloadKey]);

  async function handleDelete(postId: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmDelete) return;

    try {
      await postApi.deletePost(postId);
      setPosts(null);
      setReloadKey((key) => key + 1);
    } catch {
      alert("Failed to delete post. Please try again.");
    }
  }

  if (posts === null) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
        <p className="text-gray-400 text-sm">Loading posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
        <p className="text-gray-500 font-medium text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const isOwner = userName ? post.authorUserName === userName : false;

        return (
          <article
            key={post.id}
            className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm space-y-3 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <Link
                to={`/p/${post.authorUserName}`}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <span className="font-semibold text-gray-900 text-sm md:text-base group-hover:text-blue-600 transition-colors">
                  {post.author || post.authorUserName}
                </span>
                <span className="text-xs text-gray-500 group-hover:underline">
                  @{post.authorUserName}
                </span>
              </Link>
            </div>

            <Link
              to={`/posts/${post.id}`}
              className="block group cursor-pointer"
            >
              <p className="text-gray-800 text-sm md:text-base leading-relaxed whitespace-pre-line group-hover:text-gray-900">
                {post.content}
              </p>
            </Link>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <Link
                to={`/posts/${post.id}`}
                className="hover:underline text-gray-400 hover:text-gray-600"
              >
                {new Date(post.createdDate).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Link>

              {showOwnerActions && isOwner && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:text-red-800 font-medium transition-colors cursor-pointer"
                >
                  Delete
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default UserFeed;
