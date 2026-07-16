import { useNavigate } from "react-router-dom";
import { token } from "../lib/token";

function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    token.clear();
    navigate("/");
  };

  return { logout };
}
export default useLogout;
