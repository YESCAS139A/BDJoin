import { useLoaderData, useParams, useRevalidator } from "react-router-dom";
import profileApi from "../../api/profile";
import type { UserProfile } from "../../api/profile/types";
import ProfileView from "../../components/ProfileView";

function PublicProfile() {
  const profile = useLoaderData() as UserProfile;
  const { username } = useParams();
  const revalidator = useRevalidator();

  function refresh() {
    revalidator.revalidate();
  }

  return (
    <ProfileView
      profile={profile}
      onSendRequest={() =>
        profileApi.sendFriendRequest(username!).then(refresh)
      }
      onCancelRequest={() =>
        profileApi.cancelFriendRequest(username!).then(refresh)
      }
      onAcceptRequest={() =>
        profileApi.acceptFriendRequest(username!).then(refresh)
      }
      onRejectRequest={() =>
        profileApi.rejectFriendRequest(username!).then(refresh)
      }
      onRemoveFriend={() => profileApi.removeFriend(username!).then(refresh)}
    />
  );
}

export default PublicProfile;
