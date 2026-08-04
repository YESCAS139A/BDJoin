import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { token } from "../lib/token";

export function requireAuth({ request }: LoaderFunctionArgs) {
  // Si NO hay token guardado, redirigimos al login guardando la ruta actual
  if (!token.isAuthenticated()) {
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;

    const params = new URLSearchParams();
    if (redirectTo && redirectTo !== "/") {
      params.set("redirectTo", redirectTo);
    }

    const searchStr = params.toString();
    return redirect(`/login${searchStr ? `?${searchStr}` : ""}`);
  }

  return null;
}

export function redirectIfAuthenticated() {
  // Si SÍ hay token guardado, lo enviamos directamente a /home
  if (token.isAuthenticated()) {
    return redirect("/home");
  }

  return null;
}
