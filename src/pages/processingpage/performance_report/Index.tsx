import React from "react";
import AdminReport from "./PerformanceReport";
import UserReport from "./LoggedInUserPerformanceReport";
import useAuth from "../../../context/useAuth";

const Index: React.FC = () => {
  const userInfo = useAuth();

  return <>{userInfo.Role === "manager" ? <AdminReport /> : <UserReport />}</>;
};

export default Index;
