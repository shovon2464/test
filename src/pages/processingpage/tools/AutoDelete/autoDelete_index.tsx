import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import "../../../../style_components/tools/autoDelete_style.css";
import DeleteDays from "./deleteDays";
import AlertDaysCheck from "./alertDays";
import ReceivingEmail from "./recevingEmail";
import { useNavigate } from "react-router-dom";
import { key } from "../../../../services/auth/getKey";
import { retrieveTasksList } from "../../../../action_creators/task/task_list";
import EventBus from "../../../../app/EventBus";
import { getTaskDaysInfo } from "../../../../action_creators/tools/auto_delete/auto_delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateStatus from "./updateStatus";

const AutoDelete: React.FC = () => {
  const dispatch = useAppDispatch();
  let history = useNavigate();
  const taskListState = useAppSelector((state) => state.taskList.taskState);
  const auto_delete_info = useAppSelector((state) => state.autoDelete.infos);
  const user = key();
  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      dispatch(retrieveTasksList({}));
      dispatch(getTaskDaysInfo({}));
      if (taskListState === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, [dispatch]);

  const displayAlertDay = () => {
    if (auto_delete_info.length > 0) {
      return auto_delete_info[0].alert_days;
    } else {
      return "Loading";
    }
  };

  const displayDeleteDay = () => {
    if (auto_delete_info.length > 0) {
      return auto_delete_info[0].delete_days;
    } else {
      return "Loading";
    }
  };

  const displayTargetEmail = () => {
    if (auto_delete_info.length > 0) {
      return auto_delete_info[0].target_email;
    } else {
      return "Loading";
    }
  };

  return (
    <div className="auto-delete-container">
      <div className="auto-delete-parent">
        <Typography className="auto-delete-child-email">
          <div className="auto-delete-child-typography">
            Current Email address is set to <br />
          </div>
          <div className="auto-delete-db">
            <AccountCircleIcon className="auto-delete-icon" />
            &nbsp;
            <span
              className="auto-delete-span"
              style={{ color: "#1a4d2e", fontWeight: "bold" }}
            >
              {displayTargetEmail()}
            </span>
          </div>
        </Typography>

        <Divider
          className="auto-delete-divider"
          orientation="vertical"
          variant="middle"
        ></Divider>

        <Typography className="auto-delete-child-days">
          <div className="auto-delete-child-typography">
            Alert days <br />
          </div>
          <div className="auto-delete-db">
            <NotificationsIcon className="auto-delete-icon" /> &nbsp;
            <span className="auto-delete-span" style={{ color: "#ff9f29" }}>
              {displayAlertDay()}{" "}
            </span>
            <span style={{ fontWeight: "bold" }}>days</span>
          </div>
        </Typography>

        <Divider
          className="auto-delete-divider"
          orientation="vertical"
          variant="fullWidth"
        />

        <Typography className="auto-delete-child-days">
          <div className="auto-delete-child-typography">
            Auto delete in <br />
          </div>
          <div className="auto-delete-db">
            <DeleteForeverIcon className="auto-delete-icon" /> &nbsp;
            <span className="auto-delete-span" style={{ color: "#853037" }}>
              {displayDeleteDay()}{" "}
            </span>
            <span style={{ fontWeight: "bold" }}>days</span>
          </div>
        </Typography>
      </div>
      <ReceivingEmail />
      <AlertDaysCheck />
      <DeleteDays />
      <br />
      <UpdateStatus />
    </div>
  );
};

export default AutoDelete;
