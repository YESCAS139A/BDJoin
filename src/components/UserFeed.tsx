import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import postApi from "../api/post";
import type { Post, SortOrder } from "../api/post/types";

type UserFeedProps = {
  userName?: string;
  feedType?: "home" | "friends";
  showOwnerActions?: boolean;
  showSortControl?: boolean;
  emptyMessage?: string;
};

function UserFeed({
  userName,
  feedType = "home",
  showOwnerActions = false,
  showSortControl = false,
  emptyMessage = "There are no posts available.",
}: UserFeedProps) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [sort, setSort] = useState<SortOrder>("asc");

  useEffect(() => {
    let ignore = false;

    const request = userName
      ? postApi.getUserPosts(userName)
      : feedType === "friends"
        ? postApi.getFeedFriends(1, sort)
        : postApi.getHomeFeed();

    request
      .then((result) => {
        if (!ignore) {
          setPosts(result.items);
          setHasError(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          setHasError(true);
          setPosts([]);
        }
      });

    return () => {
      ignore = true;
    };
  }, [userName, feedType, sort, reloadKey]);

  function handleRetry() {
    setPosts(null);
    setHasError(false);
    setReloadKey((key) => key + 1);
  }

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

  if (hasError) {
    return (
      <div className="bg-white p-6 rounded-xl border border-red-200 text-center space-y-3">
        <p className="text-red-500 text-sm font-medium">
          Something went wrong loading the posts.
        </p>
        <button
          onClick={handleRetry}
          className="text-sm text-blue-600 hover:underline font-medium cursor-pointer"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedType === "friends" && showSortControl && (
        <div className="flex justify-end">
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortOrder);
              setPosts(null);
              setHasError(false);
            }}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1 cursor-pointer"
          >
            <option value="asc">Old Post</option>
            <option value="desc">New Post</option>
          </select>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
          <p className="text-gray-500 font-medium text-sm">{emptyMessage}</p>
        </div>
      ) : (
        posts.map((post) => {
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
                  className="hover:underline text-gray-400 hover:text-gray-600 cursor-pointer"
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
        })
      )}
    </div>
  );
}

export default UserFeed;
