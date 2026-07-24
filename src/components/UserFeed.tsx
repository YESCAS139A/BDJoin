export type Post = {
  id: string;
  content: string;
  createdAt: string;
  likesCount?: number;
  commentsCount?: number;
};

type UserFeedProps = {
  posts?: Post[];
};

function UserFeed({ posts = [] }: UserFeedProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
        <p className="text-gray-500 font-medium text-sm">
          This user has not posted anything yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm space-y-3"
        >
          <p className="text-gray-800 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {post.content}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>
              {new Date(post.createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

export default UserFeed;
