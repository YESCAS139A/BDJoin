import useAuthUser from "../hooks/useAuthUser";
import { CiUser } from "react-icons/ci";

const TopBar = () => {
  const { user, isLoading } = useAuthUser();

  return (
    <div className="h-14 md:h-16 bg-blue-100 flex items-center justify-between px-4 md:px-6 gap-4 shrink-0 shadow-sm">
      <p className="font-bold text-gray-700 text-lg">BDJoin</p>
      <nav className="flex gap-4">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
            <div className="flex flex-col gap-1">
              <div className="w-20 h-3 bg-gray-300 rounded animate-pulse" />
              <div className="w-12 h-2 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>
        ) : user ? (
          <div className="flex items-center gap-2">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.userName}
                className="w-8 h-8 rounded-full object-cover border border-blue-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                <CiUser className="w-6 h-6 text-gray-700" />
              </div>
            )}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">
                {user.displayName}
              </span>
              <span className="text-xs text-gray-500">@{user.userName}</span>
            </div>
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default TopBar;
