import profileApi from "../../api/profile";
import FriendsList from "../../components/FriendsList";
import SearchUsers from "../../components/SearchUsers";

function Friends() {
  return (
    <div className="space-y-6">
      <SearchUsers />
      <FriendsList
        fetchFriendsApi={async ({ page, search, sort }) => {
          const response = await profileApi.getFriends({
            pageIndex: page,
            pageSize: 10,
            searchTerm: search,
            sortBy: "BecameFriendsAt",
            sortDescending: sort === "desc",
          });

          return {
            items: response.items,
            totalPages: response.totalPages,
          };
        }}
        onRemoveFriendApi={async (userId) => {
          await profileApi.removeFriend(userId);
        }}
      />
    </div>
  );
}

export default Friends;
