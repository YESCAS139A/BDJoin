import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";

import profileApi from "../../api/profile";
import type { UserProfile } from "../../api/profile/types";
import ProfileView from "../../components/ProfileView";

export type PendingAction =
  | "send"
  | "cancel"
  | "accept"
  | "reject"
  | "remove"
  | null;

function PublicProfile() {
  const profile = useLoaderData() as UserProfile;
  const revalidator = useRevalidator();
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const handleSendRequest = async () => {
    if (!profile.userId || pendingAction) return;
    setPendingAction("send");
    try {
      await profileApi.sendFriendRequest(profile.userId);
      await revalidate();
    } finally {
      setPendingAction(null);
    }
  };

  const handleCancelRequest = async () => {
    if (!profile.requestId || pendingAction) return;
    setPendingAction("cancel");
    try {
      await profileApi.cancelFriendRequest(Number(profile.requestId));
      await revalidate();
    } finally {
      setPendingAction(null);
    }
  };

  const handleAcceptRequest = async () => {
    if (!profile.requestId || pendingAction) return;
    setPendingAction("accept");
    try {
      await profileApi.acceptFriendRequest(Number(profile.requestId));
      await revalidate();
    } finally {
      setPendingAction(null);
    }
  };

  const handleRejectRequest = async () => {
    if (!profile.requestId || pendingAction) return;
    setPendingAction("reject");
    try {
      await profileApi.rejectFriendRequest(Number(profile.requestId));
      await revalidate();
    } finally {
      setPendingAction(null);
    }
  };

  const handleRemoveFriend = async () => {
    if (!profile.userId || pendingAction) return;
    setPendingAction("remove");
    try {
      await profileApi.removeFriend(profile.userId);
      await revalidate();
    } finally {
      setPendingAction(null);
    }
  };

  async function revalidate() {
    await revalidator.revalidate();
  }

  return (
    <ProfileView
      profile={profile}
      pendingAction={pendingAction}
      onSendRequest={handleSendRequest}
      onCancelRequest={handleCancelRequest}
      onAcceptRequest={handleAcceptRequest}
      onRejectRequest={handleRejectRequest}
      onRemoveFriend={handleRemoveFriend}
    />
  );
}

export default PublicProfile;
