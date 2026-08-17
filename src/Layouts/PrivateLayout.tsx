import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import FriendsSummary from "../components/FriendsSummary";

const PrivateLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopBar />

      <div className="flex flex-1 w-full justify-between">
        <SideBar />

        <FriendsSummary />
      </div>
    </div>
  );
};

export default PrivateLayout;
