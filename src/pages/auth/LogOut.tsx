import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../action_creators/auth/logout";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from "@mui/material/ListItemIcon";
import { ReactComponent as LogOutIcon } from "../../icons/Log_Out.svg";

const LogOut: React.FC = () => {
  const dispatch = useAppDispatch();
  let history = useNavigate();

  const handleOnClick = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        history("/");
      });
  };
  return (
    <Link
      className="sidebar-item-log-out"
      component="button"
      style={{
        color: "Black",
        textDecoration: "none",
      }}
      onClick={handleOnClick}
    >
      <ListItemButton 
        className="drawer-list-item-button"
      >
        <ListItemIcon>
          <LogOutIcon className="sidebar-icons" width="2.5rem" />
        </ListItemIcon>
        Log Out
      </ListItemButton>
    </Link>
  );
};

export default LogOut;
