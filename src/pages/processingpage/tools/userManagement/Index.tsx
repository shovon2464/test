import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { key } from "../../../../services/auth/getKey";
import { useNavigate } from "react-router-dom";
import EventBus from "../../../../app/EventBus";
import { Typography } from "@mui/material";
import { retrieveUsersListWithActiveValue } from "../../../../action_creators/tools/user_management/user_management";
import { getAllRoles } from "../../../../action_creators/tools/role_management_dropdown/role_management";
import SetUserActive from "./SetUserActive";

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector(
    (state) => state.userListWithActiveValue.userswithativevalue
  );
  const usersState = useAppSelector(
    (state) => state.userListWithActiveValue.userwithativevalueStatus
  );

  const rolesList = useAppSelector((state) => state.roleList.roles);
  const rolesStatus = useAppSelector((state) => state.roleList.roleStatus);
  const user = key();
  let history = useNavigate();
  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      dispatch(retrieveUsersListWithActiveValue({}));
      dispatch(getAllRoles({}));
      if (usersState === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, []);

  return (
    <div>
      <Typography variant="h5">User Management</Typography>
      <SetUserActive />
    </div>
  );
};

export default UserManagement;
