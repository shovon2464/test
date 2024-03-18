import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { key } from "../../../../services/auth/getKey";
import { useNavigate, Navigate, Link } from "react-router-dom";
import EventBus from "../../../../app/EventBus";
import {
  getAllTaskPriorities,
  removeTaskPriority,
} from "../../../../action_creators/tools/task_priority_dropdown/task_priority";
import {
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskPriority from "./AddTaskPriority";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";

const TaskPriority: React.FC = () => {
  const user = key();
  const dispatch = useAppDispatch();
  let history = useNavigate();

  const taskPriorityList = useAppSelector(
    (state) => state.taskPriority.taskPriorities
  );
  const taskPriorityStatus = useAppSelector(
    (state) => state.taskPriority.taskPriorityStatus
  );
  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      dispatch(getAllTaskPriorities({}));
      if (taskPriorityStatus === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, []);

  const [removeTaskPriorityId, setRemoveTaskPriorityId] = React.useState("");
  const [
    deleteTaskPriorityConfirmationOpen,
    setDeleteTaskPriorityConfirmationOpen,
  ] = React.useState(false);
  const [deleteTaskPriority, setDeleteTaskPriority] = React.useState("");

  const handleClickTaskPriorityDeleteConfirmation = (
    Priority_Id: string,
    Priority_Description: string
  ) => {
    setRemoveTaskPriorityId(Priority_Id);
    setDeleteTaskPriority(Priority_Description);
    setDeleteTaskPriorityConfirmationOpen(true);
  };

  const handleCloseTaskPriorityDeleteConfirmation = () => {
    setRemoveTaskPriorityId("");
    setDeleteTaskPriorityConfirmationOpen(false);
  };

  const handleRemove = (Priority_Id: string) => {
    dispatch(removeTaskPriority(Priority_Id));
    setDeleteTaskPriorityConfirmationOpen(false);
  };

  return (
    <div>
      <Typography variant="h5">Task Priority Management</Typography>
      <AddTaskPriority />

      <Stack spacing={2}>
        <List>
          <Dialog
            open={deleteTaskPriorityConfirmationOpen}
            onClose={handleCloseTaskPriorityDeleteConfirmation}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle
              id="alert-dialog-title"
              className="task-priority-delete-dialog">
              <h4>Delete Task</h4>
              <IconButton
                className="dialog-close-icon-button"
                aria-label="close"
                onClick={handleCloseTaskPriorityDeleteConfirmation}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Divider variant="middle"></Divider>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <span style={{ fontWeight: "900", fontSize: "20px" }}>
                  {deleteTaskPriority}
                </span>{" "}
                will be deleted, are you sure you want to do this?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                className="delete-task-priority-confirm-button"
                variant="outlined"
                color="error"
                onClick={() => {
                  handleRemove(removeTaskPriorityId);
                }}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          {taskPriorityList.length > 0 &&
            taskPriorityList.map((eachTaskPriority) => {
              return (
                <ListItem
                  key={eachTaskPriority.Priority_Id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="error"
                      onClick={() => {
                        // can delete all task priority
                        handleClickTaskPriorityDeleteConfirmation(
                          eachTaskPriority.Priority_Id as string,
                          eachTaskPriority.Priority_Description as string
                        );
                      }}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                  <ListItemAvatar>
                    <ReorderIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={eachTaskPriority.Priority_Description}
                  />
                </ListItem>
              );
            })}
        </List>
      </Stack>
    </div>
  );
};

export default TaskPriority;
