import SearchUsers from "../../components/SearchUsers";
import UserFeed from "../../components/UserFeed";

function Friends() {
  return (
    <div className="space-y-6">
      <SearchUsers />
      <UserFeed feedType="friends" showSortControl={true} />
    </div>
  );
}

export default Friends;
