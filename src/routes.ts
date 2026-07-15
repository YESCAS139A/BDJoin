import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LogIn from "./Pages/LogIn/LogIn";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import Forbidden from "./Pages/Forbidden/Forbidden";
import App from "./App";
import RouteErrorBoundary from "./components/ErrorElement";
import PublicLayout from "./Layouts/PublicLayout";
import GuestOnlyLayout from "./Layouts/GuestOnlyLayout";
import PrivateLayout from "./Layouts/PrivateLayout";
import { requireAuth, redirectIfAuthenticated } from "./api/authLoader";
import Landing from "./Pages/Landing/Landing";

export const routes = createBrowserRouter([
    {
        path: "/",
        Component: App,
        ErrorBoundary: RouteErrorBoundary,
        children: [
            {
                Component: PublicLayout,
                children: [
                    { index: true, Component: Landing },
                ],
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
                children: [
                    { path: "home", Component: Home },
                ],
            },
            { path: "403", Component: Forbidden },
            { path: "*", Component: NotFound },
        ],
    },
]);