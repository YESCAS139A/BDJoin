import { redirect, type LoaderFunctionArgs } from "react-router-dom";

import { token } from "../lib/token";

export function requireAuth({ request }: LoaderFunctionArgs) {
  if (!token.isAuthenticated()) {
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;

    const params = new URLSearchParams();
    params.set("redirectTo", redirectTo);

    throw redirect(`/login?${params.toString()}`);
  }

  return null;
}

export function redirectIfAuthenticated() {
  if (token.isAuthenticated()) {
    throw redirect("/home");
  }

  return null;
}
