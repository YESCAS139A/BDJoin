import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/profile/Profile";
import PublicProfile from "./pages/profile/PublicProfile";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Forbidden from "./pages/Forbidden/Forbidden";
import App from "./App";
import RouteErrorBoundary from "./components/ErrorElement";
import GuestOnlyLayout from "./layouts/GuestOnlyLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import { requireAuth, redirectIfAuthenticated } from "./api/authLoader";
import Landing from "./pages/Landing/Landing";
import Friends from "./pages/friends/Friends";
import MyProfileAccount from "./pages/account/Account";
import { publicProfileLoader } from "./api/publicProfileLoader";
import PublicLayout from "./layouts/PublicLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      {
        index: true,
        Component: Landing,
      },
      {
        Component: GuestOnlyLayout,
        loader: redirectIfAuthenticated,
        children: [
          { path: "login", Component: LogIn },
          { path: "register", Component: Register },
        ],
      },
      {
        Component: PublicLayout,
        children: [
          {
            path: "p/:username",
            Component: PublicProfile,
            loader: publicProfileLoader,
          },
        ],
      },
      {
        Component: PrivateLayout,
        loader: requireAuth,
        children: [
          { path: "home", Component: Home },
          { path: "profile", Component: Profile },
          { path: "account", Component: MyProfileAccount },
          { path: "friends", Component: Friends },
        ],
      },
      { path: "403", Component: Forbidden },
      { path: "*", Component: NotFound },
    ],
  },
]);
