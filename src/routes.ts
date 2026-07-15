import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Forbidden from "./pages/Forbidden/Forbidden";
import App from "./App";
import RouteErrorBoundary from "./components/ErrorElement";
import PublicLayout from "./layouts/PublicLayout";
import GuestOnlyLayout from "./layouts/GuestOnlyLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import { requireAuth, redirectIfAuthenticated } from "./api/authLoader";
import Landing from "./pages/Landing/Landing";

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
        Component: PrivateLayout,
        loader: requireAuth,
        children: [{ path: "home", Component: Home }],
      },
      { path: "403", Component: Forbidden },
      { path: "*", Component: NotFound },
    ],
  },
]);
