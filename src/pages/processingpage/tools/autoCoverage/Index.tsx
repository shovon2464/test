import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { key } from "../../../../services/auth/getKey";
import { useNavigate, Navigate, Link } from "react-router-dom";
import EventBus from "../../../../app/EventBus";
import {
  getAllAutoCoverages,
  removeAutoCoverage,
} from "../../../../action_creators/tools/auto_coverage_dropdown/auto_coverage";
import {
  Stack,
  Avatar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAutoCoverage from "./AddAutoCoverage";

const AutoCoverage: React.FC = () => {
  const user = key();
  const dispatch = useAppDispatch();
  let history = useNavigate();

  const autoCoverage = useAppSelector(
    (state) => state.autoCoverage.autoCoverages
  );
  const autoCoverageStatus = useAppSelector(
    (state) => state.autoCoverage.autoCoverageStatus
  );
  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      dispatch(getAllAutoCoverages({}));
      if (autoCoverageStatus === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, []);

  return (
    <div>
      <Typography variant="h5">Auto Coverage Type Management</Typography>
      <AddAutoCoverage />
      <Stack spacing={2}>
        <List>
          {autoCoverage.length > 0 &&
            autoCoverage.map((eachCoverage) => {
              return (
                <ListItem
                  key={eachCoverage.CM_Vehicle_Coverage_Id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="error"
                      onClick={() => {
                        const id = eachCoverage.CM_Vehicle_Coverage_Id;
                        if (id) {
                          dispatch(removeAutoCoverage(id));
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
                    primary={eachCoverage.CoverageType}
                    secondary={eachCoverage.CoverageDetails}
                  />
                </ListItem>
              );
            })}
        </List>
      </Stack>
    </div>
  );
};

export default AutoCoverage;
