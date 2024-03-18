import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { key } from "../../../../services/auth/getKey";
import { useNavigate, Navigate, Link } from "react-router-dom";
import EventBus from "../../../../app/EventBus";
import {
  getAllAutoStatuses,
  removeAutoStatus,
} from "../../../../action_creators/tools/auto_status_dropdown/auto_status";
import {
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAutoStatus from "./AddAutoStatus";

const AutoStatus: React.FC = () => {
  const user = key();
  const dispatch = useAppDispatch();
  let history = useNavigate();

  const autoStatusList = useAppSelector(
    (state) => state.autoStatus.autoStatuses
  );
  const autoStatusState = useAppSelector(
    (state) => state.autoStatus.autoStatusState
  );
  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      dispatch(getAllAutoStatuses({}));
      if (autoStatusState === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, []);

  return (
    <div>
      <Typography variant="h5">Auto Status Management</Typography>
      <AddAutoStatus />
      <Stack spacing={2}>
        <List>
          {autoStatusList.length > 0 &&
            autoStatusList.map((eachStatus) => {
              return (
                <ListItem
                  key={eachStatus.CM_Vehicle_Status_Id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="error"
                      onClick={() => {
                        const id = eachStatus.CM_Vehicle_Status_Id;
                        if (id) {
                          dispatch(removeAutoStatus(id));
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <ReorderIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={eachStatus.CM_Vehicle_Status_Description}
                  />
                </ListItem>
              );
            })}
        </List>
      </Stack>
    </div>
  );
};

export default AutoStatus;
