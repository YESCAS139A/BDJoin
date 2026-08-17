import { useState } from "react";
import {
  FaHome,
  FaUserFriends,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { MdAccountCircle as MdAccountIcon } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { Link, Outlet, useLocation } from "react-router-dom";

import useLogout from "../hooks/useLogout";
import { BsPostcardFill } from "react-icons/bs";
import { IoIosAddCircle, IoIosSettings } from "react-icons/io";

function SideBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => {
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  const { logout } = useLogout();

  const links = [
    { to: "/home", label: "Home", icon: <FaHome /> },
    { to: "/profile", label: "Profile", icon: <MdAccountIcon /> },
    { to: "/friends", label: "Friends", icon: <FaUserFriends /> },
    { to: "/request", label: "Request", icon: <IoIosAddCircle /> },
    { to: "/account", label: "Account", icon: <RiAccountPinCircleFill /> },
    { to: "/post", label: "Posts", icon: <BsPostcardFill /> },
    { to: "/settings", label: "Settings", icon: <IoIosSettings /> },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-slate-50 overflow-hidden">
      <div className="md:hidden flex items-center p-4 bg-blue-100/70 border-b border-blue-200 justify-between z-50">
        <button
          onClick={toggleMenu}
          type="button"
          className="p-2 text-2xl text-slate-700 hover:bg-blue-200/50 rounded-lg transition-colors cursor-pointer"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <div
        className={`md:hidden bg-blue-100/70 border-b border-blue-200 shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="p-4 space-y-3">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={closeMenu}
                className={`flex items-center gap-4 px-4 py-3 text-xl font-bold rounded-2xl transition-all ${
                  isActive(link.to)
                    ? "bg-blue-300/70 text-slate-900"
                    : "text-slate-800 hover:bg-blue-300/50"
                }`}
              >
                <span className="text-2xl text-slate-700">{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                closeMenu();
                logout();
              }}
              className="flex items-center gap-4 px-4 py-3 text-xl font-bold text-slate-800 hover:bg-red-100/50 rounded-2xl transition-all w-full"
            >
              <span className="text-2xl text-slate-700">
                <FaSignOutAlt />
              </span>
              Log out
            </button>
          </li>
        </ul>
      </div>

      <div
        className={`hidden md:flex flex-col relative bg-blue-100/60 border-r border-blue-200 h-screen p-4 pt-10 transition-all duration-300 ease-in-out shrink-0 ${
          isMenuOpen ? "w-64" : "w-24"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute -right-3 top-12 bg-white border border-blue-200 text-slate-600 hover:text-blue-600 p-1.5 rounded-full shadow-md cursor-pointer hover:scale-110 transition-all z-50"
        >
          {isMenuOpen ? (
            <FaChevronLeft size={14} />
          ) : (
            <FaChevronRight size={14} />
          )}
        </button>

        <ul className="space-y-4 flex-1 overflow-y-auto">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`flex items-center px-4 py-3.5 text-xl font-bold rounded-2xl transition-all duration-200 group ${
                  isActive(link.to)
                    ? "bg-blue-300/70 text-slate-900"
                    : "text-slate-800 hover:bg-blue-300/50"
                } ${isMenuOpen ? "gap-4" : "gap-0"}`}
              >
                <span className="text-2xl text-slate-700 shrink-0">
                  {link.icon}
                </span>
                <span
                  className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${
                    isMenuOpen
                      ? "opacity-100 max-w-xs"
                      : "opacity-0 max-w-0 pointer-events-none"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}

          <li>
            <button
              onClick={logout}
              className={`flex items-center px-4 py-3.5 text-xl font-bold text-slate-800 hover:bg-red-100/50 rounded-2xl transition-all duration-200 group w-full ${
                isMenuOpen ? "gap-4" : "gap-0"
              }`}
            >
              <span className="text-2xl text-slate-700 shrink-0">
                <FaSignOutAlt />
              </span>
              <span
                className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${
                  isMenuOpen
                    ? "opacity-100 max-w-xs"
                    : "opacity-0 max-w-0 pointer-events-none"
                }`}
              >
                Log out
              </span>
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 h-screen overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
