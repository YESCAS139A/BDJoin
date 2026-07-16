import { Link } from "react-router-dom";

import useLogout from "../hooks/useLogout";

const TopBar = () => {
  const { logout } = useLogout();

  return (
    <div className="h-14 md:h-16 bg-blue-100 flex items-center justify-between px-4 md:px-6 gap-4 shrink-0 shadow-sm">
      <p className="font-bold text-gray-700 text-lg">BDJoin</p>
      <nav className="flex gap-4">
        <Link
          to="/home"
          className="text-gray-600 hover:text-blue-600 font-medium font-sans"
        >
          Home
        </Link>
        <button
          onClick={logout}
          className="text-gray-600 hover:text-red-600 font-medium font-sans"
        >
          Log out
        </button>
      </nav>
    </div>
  );
};

export default TopBar;
