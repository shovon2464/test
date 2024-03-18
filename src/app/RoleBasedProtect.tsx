import React from "react";
import { getUserRole } from "../services/auth/getKey";
import { Navigate, Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";

const isAdmin = (): boolean => {
  const role: string = getUserRole();
  if (role === "manager") return true;
  return false;
};

const RoleBasedProtect: React.FC = () => {
  const userRole = isAdmin();
  return userRole ? (
    <Outlet />
  ) : (
    <Typography variant="body1" gutterBottom component="div">
      Sorry, the tool module only opens to system admin. <br />
      If you have any concern, please contact the system admin.
    </Typography>
  );
};

export default RoleBasedProtect;
