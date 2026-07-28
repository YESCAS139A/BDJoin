import { useEffect, useState } from "react";

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
    await postApi.deletePost(postId);
    setPosts(null);
    setReloadKey((key) => key + 1);
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
            className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-sm md:text-base">
                  {post.author || post.authorUserName}
                </span>
                <span className="text-xs text-gray-500">
                  @{post.authorUserName}
                </span>
              </div>
            </div>

            <p className="text-gray-800 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <span>
                {new Date(post.createdDate).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              {showOwnerActions && isOwner && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:text-red-800 font-medium transition-colors"
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
