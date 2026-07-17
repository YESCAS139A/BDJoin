import useAuthUser from "../hooks/useAuthUser";

import { CiUser } from "react-icons/ci";

const TopBar = () => {
  const { user, isLoading } = useAuthUser();

  return (
    <div className="h-14 md:h-16 bg-blue-100 flex items-center justify-between px-4 md:px-6 gap-4 shrink-0 shadow-sm">
      <p className="font-bold text-gray-700 text-lg">BDJoin</p>
      <nav className="flex gap-4">
        {isLoading ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <div className="flex items-center gap-2">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.userName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <CiUser className="w-8 h-8 text-gray-600" />
            )}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-gray-700">
                {user?.displayName}
              </span>
              <span className="text-xs text-gray-500">{user?.userName}</span>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default TopBar;
