import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { key } from "../services/auth/getKey";
import { logout } from "../action_creators/auth/logout";
import { useAppDispatch } from "../app/hooks";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const useAuth = (): boolean => {
  const isLoggedIn: string | null = key();
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  if (isLoggedIn) {
    const decodeJWT = parseJwt(isLoggedIn);
    if (decodeJWT.exp * 1000 < Date.now()) {
      logOut();
      localStorage.clear();
      return false;
    }
    return true;
  } else {
    return false;
  }
};
const ProtectedRoutes: React.FC = () => {
  const isAuth: boolean = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoutes;
