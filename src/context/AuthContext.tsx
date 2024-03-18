import React, { createContext } from "react";
import { ILoggedInInfo, getUserInfo } from "../services/auth/getKey";

const AuthContext = createContext({} as ILoggedInInfo);

export const AuthProvider: React.FC = ({ children }) => {
  const userInfo: ILoggedInInfo = getUserInfo();

  return (
    <AuthContext.Provider value={userInfo}> {children} </AuthContext.Provider>
  );
};

export default AuthContext;
