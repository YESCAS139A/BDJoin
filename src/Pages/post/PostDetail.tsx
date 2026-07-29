import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import postApi from "../../api/post";
import { PostNotFoundError } from "../../api/post/types";
import type { Post } from "../../api/post/types";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import useAuthUser from "../../hooks/useAuthUser";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthUser();

  const id = Number(postId);
  const hasInvalidId = isNaN(id);

  const [post, setPost] = useState<Post | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    if (hasInvalidId) return;

    let ignore = false;

    postApi
      .getPostById(id)
      .then((data) => {
        if (!ignore) {
          setPost(data);
          setEditContent(data.content);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setFetchFailed(true);
          if (!(err instanceof PostNotFoundError)) {
            console.error("Error inesperado al cargar el post:", err);
          }
        }
      });

    return () => {
      ignore = true;
    };
  }, [id, hasInvalidId]);

  const isNotFound = hasInvalidId || fetchFailed;

  const handleDelete = async () => {
    if (!post) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmDelete) return;

    try {
      await postApi.deletePost(post.id);
      navigate("/home");
    } catch {
      alert("Failed to delete the post. Please try again.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !editContent.trim() || isUpdating) return;

    setIsUpdating(true);
    setUpdateError(null);

    try {
      const updatedPost = await postApi.updatePost(post.id, {
        content: editContent,
      });
      setPost(updatedPost);
      setIsEditing(false);
    } catch {
      setUpdateError("Could not save the changes. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isNotFound) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center max-w-2xl mx-auto mt-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          404 - Post Not Found
        </h2>
        <p className="text-gray-500 text-sm">
          The post you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/home"
          className="inline-block px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-center max-w-2xl mx-auto mt-6">
        <p className="text-gray-400 text-sm">Loading post...</p>
      </div>
    );
  }

  const isOwner = user?.userName === post.authorUserName;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <article className="bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <Link
            to={`/p/${post.authorUserName}`}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
              {post.author || post.authorUserName}
            </span>
            <span className="text-xs text-gray-500 group-hover:underline">
              @{post.authorUserName}
            </span>
          </Link>

          <span className="text-xs text-gray-400">
            {new Date(post.createdDate).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-3">
            <TextArea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Edit your post..."
            />
            {updateError && (
              <p className="text-red-500 text-xs">{updateError}</p>
            )}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1">
                <Button
                  name="Save changes"
                  disabled={!editContent.trim() || isUpdating}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(post.content);
                }}
                disabled={isUpdating}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        )}

        {isOwner && !isEditing && (
          <div className="flex items-center justify-end gap-4 pt-3 border-t border-gray-100">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </article>
    </div>
  );
};

export default PostDetail;
