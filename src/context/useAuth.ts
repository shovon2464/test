import { useContext } from "react";
import AuthContext from "./AuthContext";

//customized hook : useAuth
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
