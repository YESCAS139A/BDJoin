import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function useAuthUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthUser debe usarse dentro de un AuthProvider");
  }
  return context;
}

export default useAuthUser;
