import { type LoaderFunctionArgs } from "react-router-dom";

import profileApi from "./profile";
import {
  type UserProfile,
  type PendingRequestItem,
  type OutgoingRequestItem,
  ProfileNotFoundError,
} from "./profile/types";

export async function publicProfileLoader({
  params,
}: LoaderFunctionArgs): Promise<UserProfile> {
  const username = params.username;
  if (!username) throw new Response("Not Found", { status: 404 });

  try {
    const user = await profileApi.userProfile(username);

    if (user.relationshipStatus !== null && user.relationshipStatus !== 0) {
      if (user.relationshipStatus === 1) {
        const outgoing = await profileApi.getOutgoingRequests();
        const found = outgoing.items.find(
          (req: OutgoingRequestItem) =>
            req.receiverId === user.userId ||
            req.receiverUsername === user.userName ||
            req.targetUserId === user.userId,
        );
        if (found) user.requestId = found.requestId;
      } else if (user.relationshipStatus === 2) {
        const incoming = await profileApi.getIncomingRequests();
        const found = incoming.items.find(
          (req: PendingRequestItem) =>
            req.senderId === user.userId ||
            req.senderUsername === user.userName,
        );
        if (found) user.requestId = found.requestId;
      }
    }

    return user;
  } catch (error) {
    if (error instanceof ProfileNotFoundError) {
      throw new Response("Profile not found", { status: 404 });
    }
    throw new Response("The profile could not be loaded", { status: 404 });
  }
}
