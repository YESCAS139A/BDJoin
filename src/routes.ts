import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LogIn from "./Pages/LogIn/LogIn";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import Forbidden from "./Pages/Forbidden/Forbidden";
import App from "./App";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import { redirectIfAuthenticated } from "./api/authLoader";


export const routes = createBrowserRouter([
    {
        path: "/",
        Component: App,
        ErrorBoundary: RouteErrorBoundary, 
        children: [
        { index: true, Component: Home },
        { path: "home", Component: Home },
        {
            path: "auth",
            Component: Outlet,
            children: [
            { path: "login", Component: LogIn, loader: redirectIfAuthenticated },
            { path: "register", Component: Register, loader: redirectIfAuthenticated },
            ],
        },
        { path: "403", Component: Forbidden },
        { path: "*", Component: NotFound }, 
        ],
    },
]);