// src/api/authLoader.ts
import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { isAuthenticated } from "../Hooks/useAuthUser";

export function requireAuth({ request }: LoaderFunctionArgs) {
    if (!isAuthenticated()) {
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;

    const params = new URLSearchParams();
    params.set("redirectTo", redirectTo);

    throw redirect(`/auth/login?${params.toString()}`);
    }

    return null;
}

export function redirectIfAuthenticated() {
    if (isAuthenticated()) {
    throw redirect("/home");
    }

    return null;
}