import { Divider, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import "../../../../style_components/tools/thirdPartyConnection_style.css";
import { useNavigate } from "react-router-dom";
import { key } from "../../../../services/auth/getKey";
import { retrieveAllThirdPartyConnections } from "../../../../action_creators/tools/third_party_connnection/third_party_connection";
import EventBus from "../../../../app/EventBus";
import { getTaskDaysInfo } from "../../../../action_creators/tools/auto_delete/auto_delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThirdPartyIntegrationCell from "./ThirdPartyIntegration";

const ThirdPartyIntegration: React.FC = () => {
  const dispatch = useAppDispatch();
  let history = useNavigate();
  const thirdPartyConnectionState = useAppSelector(
    (state) => state.thirdPartyConnection.status
  );
  const auto_delete_info = useAppSelector(
    (state) => state.thirdPartyConnection.thirdPartyConnections
  );
  const user = key();
  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      dispatch(retrieveAllThirdPartyConnections({}));
      if (thirdPartyConnectionState === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, [dispatch]);

  const displayURL = () => {
    if (auto_delete_info.length > 0) {
      return auto_delete_info[0].url;
    } else {
      return "Loading";
    }
  };

  const displayUsername = () => {
    if (auto_delete_info.length > 0) {
      return auto_delete_info[0].username;
    } else {
      return "Loading";
    }
  };

  const displayPassword = () => {
    if (auto_delete_info.length > 0) {
      return auto_delete_info[0].password;
    } else {
      return "Loading";
    }
  };

  const displayThirdPartyName = () => {
    if (auto_delete_info.length > 0) {
      return auto_delete_info[0].third_party_name;
    } else {
      return "Loading";
    }
  };

  return (
    <div className="auto-delete-container">
      <div className="auto-delete-parent">
        <Typography className="auto-delete-child-email">
          <div className="auto-delete-child-typography">
            Third Party Integration URL <br />
          </div>
          <div className="auto-delete-db">
            <span
              className="auto-delete-span"
              style={{ color: "#1a4d2e", fontWeight: "bold" }}>
              {displayURL()}
            </span>
          </div>
        </Typography>

        <Divider
          className="auto-delete-divider"
          orientation="vertical"
          variant="middle"></Divider>

        <Typography className="auto-delete-child-days">
          <div className="auto-delete-child-typography">
            UserName <br />
          </div>
          <div className="auto-delete-db">
            <span className="auto-delete-span" style={{ color: "#ff9f29" }}>
              {displayUsername()}{" "}
            </span>
          </div>
        </Typography>

        <Divider
          className="auto-delete-divider"
          orientation="vertical"
          variant="fullWidth"
        />

        <Typography className="auto-delete-child-days">
          <div className="auto-delete-child-typography">
            Password <br />
          </div>
          <div className="auto-delete-db">
            <span className="auto-delete-span" style={{ color: "#853037" }}>
              {displayPassword()}{" "}
            </span>
          </div>
        </Typography>

        <Divider
          className="auto-delete-divider"
          orientation="vertical"
          variant="fullWidth"
        />

        <Typography className="auto-delete-child-days">
          <div className="auto-delete-child-typography">
            Third Party Name <br />
          </div>
          <div className="auto-delete-db">
            <span className="auto-delete-span" style={{ color: "#853037" }}>
              {displayThirdPartyName()}{" "}
            </span>
          </div>
        </Typography>
      </div>
    </div>
  );
};

export default ThirdPartyIntegration;
