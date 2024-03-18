import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { ContainedWarningButton } from "../../../../style_components/buttons/styled_contained_buttons";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import CloseIcon from "@mui/icons-material/Close";
import { OutlinedErrorButton } from "../../../../style_components/buttons/styled_outlined_buttons";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  deleteTask,
  ITaskListResponse,
} from "../../../../action_creators/task/task_list";
import { timeDiff } from "../../../../helpers/TimeDiffHelper";
import {
  createAPerformanceRecord,
  IUserPerformanceRequest,
} from "../../../../action_creators/performance_report/user_performance";
import { ContainedErrorButton } from "../../../../style_components/buttons/styled_contained_buttons";

const DeleteAll: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const taskListRetrieve = useAppSelector((state) => state.taskList.tasks);
  const completedTasks: ITaskListResponse[] = [];
  const userList = useAppSelector((state) => state.userList.users);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseWindow = () => {
    setOpen(false);
  };

  //get all completed tasks
  const checkIfEmpty = () => {
    if (taskListRetrieve.length > 0) {
      taskListRetrieve.forEach((task) => {
        if (task.Task_Status === "COMPLETE") {
          completedTasks.push(task);
        }
      });
      if (completedTasks.length > 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const handleDeleteAllTask = () => {
    completedTasks.forEach((task) => {
      //username is User's name, not username.
      let username: string = "";
      let closeDate: Date = task.Close_Date
        ? new Date(task.Close_Date)
        : new Date();
      if (userList) {
        const index = userList.findIndex(
          (user) => user.user_id === task.Assign_To
        );
        username = userList[index].name;
      }

      const costTimeHours = timeDiff(new Date(task.Create_Date), closeDate);

      const performanceInfo: IUserPerformanceRequest = {
        Job_Close_Date: closeDate,
        user_id: task.Assign_To,
        Job_Type: task.Job_Type_Name,
        Job_Sub_Type: task.Job_Sub_Type_Name,
        Phone_Number: task.CRM_Client_Phone ? task.CRM_Client_Phone : "",
        UserName: username,
        Cost_Time: costTimeHours,
      };
      dispatch(createAPerformanceRecord(performanceInfo))
        .unwrap()
        .then(() => {
          dispatch(deleteTask(task.Task_Id));
        });
      setOpen(false);
    });
  };

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleCloseWindow}
          className="completed-task-delete-confirmation-dialog"
        >
          <DialogTitle className="delete-all-task-dialog">
            Delete All Tasks
            <IconButton
              className="dialog-close-icon-button"
              onClick={handleCloseWindow}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider variant="middle"></Divider>
          <DialogContent>
            <DialogContentText>
              All completed tasks will be deleted, are you sure you want to do
              them?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <OutlinedErrorButton
              className="delete-task-confirm-button"
              onClick={handleDeleteAllTask}
            >
              Delete All
            </OutlinedErrorButton>
          </DialogActions>
        </Dialog>
      </div>
      <div className="delete-all-button">
        <ContainedErrorButton
          aria-label="delete-all-completed-task"
          hidden={checkIfEmpty()}
          onClick={handleClickOpen}
        >
          Delete All
        </ContainedErrorButton>
      </div>
    </>
  );
};

export default DeleteAll;
