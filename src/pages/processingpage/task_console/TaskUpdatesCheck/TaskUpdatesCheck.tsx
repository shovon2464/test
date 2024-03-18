import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  retrieveTasksList,
  updateEachTaskAssignTo,
} from "../../../../action_creators/task/task_list";
import { getAllUsersListWithAIBotRole } from "../../../../services/task/user/user";
import { ITaskListResponse } from "../../../../action_creators/task/task_list";
import { getLastNotesByTaskId } from "../../../../services/task/note/note";
import { getUserByUserId } from "../../../../services/task/user/user";
import { deleteTask } from "../../../../action_creators/task/task_list";
import { timeDiff } from "../../../../helpers/TimeDiffHelper";
import useAuth from "../../../../context/useAuth";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Alert,
  Snackbar,
  DialogContentText,
  DialogActions,
  Button,
  Icon,
  SwipeableDrawer,
  Drawer,
  ListItem,
  ListItemText,
  Badge,
  BadgeProps,
} from "@mui/material";
import {
  StyledTableCol,
  StyledTableRow,
} from "../../../../components/share_components/CustomizedTable/CustomizedTable";
import CloseIcon from "@mui/icons-material/Close";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import { OutlinedErrorButton } from "../../../../style_components/buttons/styled_outlined_buttons";
import { ContainedErrorButton } from "../../../../style_components/buttons/styled_contained_buttons";
import { dateDiffInDays } from "../../../../helpers/TimeDiffHelper";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import { sendDeletedDetail } from "../../../../services/tools/auto_delete/auto_delete";
import {
  createAPerformanceRecord,
  IUserPerformanceRequest,
} from "../../../../action_creators/performance_report/user_performance";
import { Box } from "@mui/system";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { getTaskDaysInfo } from "../../../../action_creators/tools/auto_delete/auto_delete";

interface TaskUpdatesCheckProps {
  task_id_array: string[];
}

const TaskUpdatesCheck: React.FC<TaskUpdatesCheckProps> = (props) => {
  const { task_id_array } = props;
  const dispatch = useAppDispatch();
  const [taskDeleteList, setTaskDeleteList] = React.useState<
    ITaskListResponse[]
  >([]);
  const [taskAlertList, setTaskAlertList] = React.useState<ITaskListResponse[]>(
    []
  );
  const [openUpdateCheck, setOpenUpdateCheck] = React.useState(false);
  const [alertDays, setAlertDays] = React.useState(0);
  const [deleteDays, setDeleteDays] = React.useState(0);
  const [targetEmail, setTargetEmail] = React.useState("");
  const tasksList = useAppSelector((state) => state.taskList.tasks);
  const auto_delete_info = useAppSelector((state) => state.autoDelete.infos);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const userList = useAppSelector((state) => state.userList.users);
  const [snackbarOpen, setSnackBarOpen] = React.useState(false);
  const userInfo = useAuth();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const confirmDeleteOpen = () => {
    setConfirmOpen(true);
  };
  const confirmDeleteClose = () => {
    setConfirmOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    dispatch(retrieveTasksList({}));
    setDrawerOpen(newOpen);
  };

  var arr: string[] = [];
  var userNameArray: string[] = [];

  arr = task_id_array;

  useEffect(() => {
    const retrieveNoUpdateTasksList = async () => {
      if (auto_delete_info[0] !== undefined) {
        setAlertDays(auto_delete_info[0]?.alert_days);
        setDeleteDays(auto_delete_info[0]?.delete_days);
        setTargetEmail(auto_delete_info[0]?.target_email);

        let initialDeleteList: ITaskListResponse[] = [];
        tasksList.forEach(async (value) => {
          const noUpdateTasks = { ...value };
          const createdDate = new Date(noUpdateTasks.Create_Date);
          if (dateDiffInDays(createdDate) > auto_delete_info[0].delete_days) {
            // const userName = await getUserByUserId(noUpdateTasks.Assign_To);
            // noUpdateTasks.Assign_To = userName.data.findUserByUserID[0].name;
            initialDeleteList.push(noUpdateTasks);
          }
        });

        let initialAlertList: ITaskListResponse[] = [];
        tasksList.forEach(async (value) => {
          const noUpdateTasks = { ...value };
          const createdDate = new Date(noUpdateTasks.Create_Date);
          if (dateDiffInDays(createdDate) > auto_delete_info[0].alert_days) {
            initialAlertList.push(noUpdateTasks);
          }
        });

        setTaskDeleteList(initialDeleteList);
        if (taskDeleteList.length > 0) {
          setOpenUpdateCheck(true);
        }

        setTaskAlertList(initialAlertList);
        if (taskAlertList.length > 0) {
          setOpenUpdateCheck(true);
        }
      }
    };
    retrieveNoUpdateTasksList().catch(console.error);
  }, [tasksList, auto_delete_info]);
  //delete tasks that are more than delete_days
  const deleteAllExpire = () => {
    taskDeleteList.forEach((task) => {
      if (task.Task_Status === "COMPLETE") {
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
        setConfirmOpen(false);
        setSnackBarOpen(true);
      } else {
        dispatch(deleteTask(task.Task_Id));
        setConfirmOpen(false);
        setSnackBarOpen(true);
      }
    });
    sendEmail();
  };

  const sendEmail = async () => {
    const msg = generateMsg();
    try {
      await sendDeletedDetail(msg, auto_delete_info[0].target_email).catch(
        (err) => {
          throw Error(err);
        }
      );
    } catch (err) {
      throw Error("Something goes wrong when sending email");
    }
  };

  const generateMsg = () => {
    let msg = "";
    taskDeleteList.forEach((task) => {
      msg += task.Policy_Number;
      msg += ",";
      msg += task.CRM_Client_Name;
      msg += ",";
      msg += task.Task_Description;
      msg += ",";
      msg += task.Job_Type_Name;
      msg += ",";
      msg += task.Task_Files;
      msg += ","
      msg += task.Create_Date;
      msg += ";";
    });
    return msg;
  };

  const handleClose = () => {
    setOpenUpdateCheck(false);
    setTimeout(() => {
      setTaskDeleteList([]);
    }, 1000);
  };

  const alertOpen = () => {
    setSnackBarOpen(true);
  };

  const alertClose = () => {
    setSnackBarOpen(false);
  };

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -1,
      top: 5,
      padding: "2px",
    },
  }));

  return (
    <div>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={alertClose}
      >
        <Alert onClose={alertClose} severity="success" sx={{ width: "100%" }}>
          Tasks has been deleted and sent to your Email. Please check your Email
          for details.
        </Alert>
      </Snackbar>

      <Dialog
        className="completed-task-delete-confirmation-dialog"
        open={confirmOpen}
        onClose={confirmDeleteClose}
      >
        <DialogTitle className="delete-all-task-dialog">
          Delete All confirmation
          <IconButton
            className="dialog-close-icon-button"
            onClick={confirmDeleteClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          <DialogContentText>
            All tasks that has been created for more than {deleteDays} days will
            be deleted, are you sure you want to do this?
            <br />
            <br />
            Deleted tasks will be send to{" "}
            <span style={{ fontWeight: "900" }}>{targetEmail}</span>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <OutlinedErrorButton
            className="delete-task-confirm-button"
            onClick={deleteAllExpire}
          >
            Delete All
          </OutlinedErrorButton>
        </DialogActions>
      </Dialog>

      {/* Drawer  */}
      <Box
        className="task-notification-drawer"
        sx={{ textAlign: "center", pt: 1 }}
      >
        <IconButton className="alert-bell" onClick={toggleDrawer(true)}>
          <StyledBadge
            badgeContent={taskDeleteList.length}
            max={99}
            color="error"
            overlap="circular"
          >
            <NotificationsNoneIcon />
          </StyledBadge>
        </IconButton>

        <SwipeableDrawer
          anchor="right"
          variant="temporary"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div className="task-notification-container sticky">
            <div className="task-notification-header">
              <header className="task-notifications-header">
                Task notifications
              </header>
              <IconButton
                className="auto-delete-all-button"
                aria-label="auto-delete-all-button"
                onClick={confirmDeleteOpen}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={toggleDrawer(false)}
                className="dialog-close-icon-button"
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className="alert-content">
              <div className="alert-session">
                <div className="task-parent">
                  <Typography className="task-child task-child-alert-title">
                    Alert tasks
                  </Typography>
                  <Typography className="task-child task-child-alert-title">
                    {taskAlertList.length}
                  </Typography>
                </div>
              </div>
              <Divider className="dark-divider" variant="middle" />
              <div className="expire-session">
                <div className="task-parent">
                  <Typography className="task-child task-child-delete-title">
                    Expiring tasks
                  </Typography>
                </div>
                {taskDeleteList.map((task, index) => (
                  <ListItem>
                    <ListItemText key="task.Task_Id">
                      <div className="task-parent task-detail">
                        <Typography className="task-child">
                          <span style={{ fontWeight: "bold" }}>
                            Client name:{" "}
                          </span>
                          {task.CRM_Client_Name}
                          <br />
                          <span style={{ fontWeight: "bold" }}>
                            Policy number:{" "}
                          </span>
                          {task.Policy_Number}
                          <br />
                          <span style={{ fontWeight: "bold" }}>Job type: </span>
                          {task.Job_Type_Name}
                          <br />
                          <span style={{ fontWeight: "bold" }}>
                            Description:{" "}
                          </span>
                          {task.Task_Description}
                        </Typography>
                      </div>
                      <Divider variant="fullWidth"></Divider>
                    </ListItemText>
                  </ListItem>
                ))}
              </div>
            </div>

            {/* <Divider variant="middle"></Divider> */}
          </div>
        </SwipeableDrawer>
      </Box>
    </div>
  );
};

export default TaskUpdatesCheck;

// if (noUpdateTasks.FollowUp_Date !== null) {
//   const followUpDate = new Date(noUpdateTasks.FollowUp_Date!);
//   const result = await getLastNotesByTaskId(noUpdateTasks.Task_Id);
//   if (result.data.findLastNotesByTaskID.length > 0) {
//     const lastNoteCreatedDate = new Date(
//       result.data.findLastNotesByTaskID[0].Create_Date
//     );
//     if (followUpDate.getTime() > lastNoteCreatedDate.getTime()) {
//       if (dateDiffInDays(followUpDate) > 3) {
//         const userName = await getUserByUserId(noUpdateTasks.Assign_To);
//         noUpdateTasks.Assign_To =
//           userName.data.findUserByUserID[0].name;
//         initialMatchList.push(noUpdateTasks);
//       }
//     } else {
//       if (dateDiffInDays(lastNoteCreatedDate) > 3) {
//         const userName = await getUserByUserId(noUpdateTasks.Assign_To);
//         noUpdateTasks.Assign_To =
//           userName.data.findUserByUserID[0].name;
//         initialMatchList.push(noUpdateTasks);
//       }
//     }
//   } else {
//     if (dateDiffInDays(followUpDate) > 3) {
//       const userName = await getUserByUserId(noUpdateTasks.Assign_To);
//       noUpdateTasks.Assign_To = userName.data.findUserByUserID[0].name;
//       initialMatchList.push(noUpdateTasks);
//     }
//   }
// } else if (
//   noUpdateTasks.Task_Newest_Note === null ||
//   noUpdateTasks.Task_Newest_Note === "null"
// ) {
//   const createdDate = new Date(noUpdateTasks.Create_Date);
//   if (dateDiffInDays(createdDate) > 3) {
//     const userName = await getUserByUserId(noUpdateTasks.Assign_To);
//     noUpdateTasks.Assign_To = userName.data.findUserByUserID[0].name;
//     initialMatchList.push(noUpdateTasks);
//   }
// } else {
//   const result = await getLastNotesByTaskId(noUpdateTasks.Task_Id);
//   if (result.data.length > 0) {
//     const lastNoteCreatedDate = new Date(
//       result.data.findLastNotesByTaskID[0].Create_Date
//     );
//     if (dateDiffInDays(lastNoteCreatedDate) > 3) {
//       const userName = await getUserByUserId(noUpdateTasks.Assign_To);
//       noUpdateTasks.Assign_To = userName.data.findUserByUserID[0].name;
//       initialMatchList.push(noUpdateTasks);
//     }
//   }
// }
