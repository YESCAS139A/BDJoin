import { type LoaderFunctionArgs } from "react-router-dom";
import profileApi from "./profile/profileApi";
import { type UserProfile, ProfileNotFoundError } from "./profile/types";

export async function publicProfileLoader({
  params,
}: LoaderFunctionArgs): Promise<UserProfile> {
  const username = params.username;
  if (!username) throw new Response("Not Found", { status: 404 });

  try {
    return await profileApi.userProfile(username);
  } catch (error) {
    if (error instanceof ProfileNotFoundError) {
      throw new Response("Not Found", { status: 404 });
    }
    throw error;
  }
}
