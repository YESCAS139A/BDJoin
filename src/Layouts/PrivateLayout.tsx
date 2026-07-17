import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

const PrivateLayout = () => {
  return (
    <>
      <TopBar />
      <SideBar />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
