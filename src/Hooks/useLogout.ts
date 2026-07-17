import { useNavigate } from "react-router-dom";

import { token } from "../lib/token";
import useAuthUser from "./useAuthUser";

function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useAuthUser();

  const logout = () => {
    token.clear();
    setUser(null);
    navigate("/");
  };

  return { logout };
}
export default useLogout;
