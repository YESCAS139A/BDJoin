import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

const PrivateLayout = () => {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
