import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="h-14 md:h-16 bg-blue-100 flex items-center justify-between px-4 md:px-6 gap-4 shrink-0 shadow-sm">
      <Link to="/" className="font-bold text-gray-700 text-lg">
        BDJoin
      </Link>
      <nav className="flex gap-4">
        <Link
          to="/landing"
          className="text-gray-600 hover:text-blue-600 font-medium"
        >
          Home
        </Link>
      </nav>
    </div>
  );
};

export default TopBar;
