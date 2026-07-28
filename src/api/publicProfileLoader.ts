import { type LoaderFunctionArgs } from "react-router-dom";
import mockProfileApi from "./profile/index";
import { type UserProfile, ProfileNotFoundError } from "./profile/types";

export async function publicProfileLoader({
  params,
}: LoaderFunctionArgs): Promise<UserProfile> {
  const username = params.username;
  if (!username) throw new Response("Not Found", { status: 404 });

  try {
    return await mockProfileApi.userProfile(username);
  } catch (error) {
    if (error instanceof ProfileNotFoundError) {
      throw new Response("Perfil no encontrado", { status: 404 });
    }

    console.error("Error al cargar perfil público:", error);

    throw new Response("No se pudo cargar el perfil del usuario", {
      status: 404,
    });
  }
}
