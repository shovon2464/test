import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { ISeniorUserListResponse, retrieveSeniorUsersList } from "../../../../action_creators/task/user/user_list";
import { updateEachTaskAssignTo } from "../../../../action_creators/task/task_list";
import { getAllUsersListWithAIBotRole } from "../../../../services/task/user/user";
import { ITaskListResponse } from "../../../../action_creators/task/task_list";
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
  Badge
} from "@mui/material";
import {
  StyledTableCol,
  StyledTableRow,
} from "../../../../components/share_components/CustomizedTable/CustomizedTable";
import CloseIcon from '@mui/icons-material/Close';
import { ContainedWarningButton }
  from "../../../../style_components/buttons/styled_contained_buttons";
import { OutlinedSuccessButton }
  from "../../../../style_components/buttons/styled_outlined_buttons";

const AutoAssign: React.FC = () => {
  const dispatch = useAppDispatch();
  const [taskMatchList, setTaskMatchList] =
    React.useState<ITaskListResponse[]>([]);
  const [waitingDocList, setWaitingDocList] =
    React.useState<ITaskListResponse[]>([]);
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackBarOpen] = React.useState(false);
  const [badgeOpen, setBadgeOpen] = React.useState(false);
  const [seniorBrokerArray, setSeniorBrokerArray] = React.useState<string[]>([]);

  const tasksList = useAppSelector((state) => state.taskList.tasks);
  const users = useAppSelector((state) => state.seniorUsersList.seniorUsers);


  useEffect(() => {
    const checkAIBotTaskCreateDate = async () => {
      const AIBotList = await getAllUsersListWithAIBotRole();
      dispatch(retrieveSeniorUsersList({}));
      randomSeniorUsersArray(users);
      const AIBotObjectArray = AIBotList.data.findAllUsersWithAIBotRole;
      const emptyArray: string[] = [];
      for (let i = 0; i < AIBotObjectArray.length; i++) {
        emptyArray.push(AIBotObjectArray[i].user_id);
      }
      let initialMatchList: ITaskListResponse[] = [];
      let initialWaitingDocList: ITaskListResponse[] = [];
      tasksList.forEach((value) => {
        if (value.Assign_To === "undefined" ||
          emptyArray.includes(value.Assign_To) === true) {
          initialMatchList.push(value);
          setBadgeOpen(true);
        }
        if (value.Task_Status === "WAITINGDOC") {
          initialWaitingDocList.push(value);
        }
      });
      setTaskMatchList(initialMatchList);
      setWaitingDocList(initialWaitingDocList);
    };
    checkAIBotTaskCreateDate().catch(console.error);
  }, [tasksList]);

  const shuffle = (array: string[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const randomSeniorUsersArray = (users: ISeniorUserListResponse[]) => {
    const originalArray: string[] = [];
    for (let i = 0; i < users.length; i++) {
      originalArray.push(users[i].user_id);
    }
    let randomOrderArray: string[] = [];
    randomOrderArray = shuffle(originalArray);
    return setSeniorBrokerArray(randomOrderArray);
  };

  const handleClick = () => {
    if (taskMatchList.length > 0) {
      for (
        let i = 0, index = 0;
        i < taskMatchList.length;
        i++, index++
      ) {
        if (index >= seniorBrokerArray.length) {
          index = 0;
        }
        let autoAssignTask = { ...taskMatchList[i] };
        let autoAssignTaskForWaitingDoc = { ...taskMatchList[i] };
        autoAssignTask.Assign_To = seniorBrokerArray[index];
        dispatch(updateEachTaskAssignTo(autoAssignTask))
          .unwrap()
          .then(() => {
            setSnackBarOpen(true);
            setBadgeOpen(false);
          })
          .catch(() => {
            window.alert("Fetch Data Errors");
          });
        if (waitingDocList.length > 0) {
          for (let a = 0; a < waitingDocList.length; a++) {
            if (waitingDocList[a].Policy_Number ===
              autoAssignTaskForWaitingDoc.Policy_Number) {
              autoAssignTaskForWaitingDoc.Assign_To = waitingDocList[a].Assign_To;
              dispatch(updateEachTaskAssignTo(autoAssignTaskForWaitingDoc))
                .unwrap()
                .then(() => {
                  setSnackBarOpen(true);
                  setBadgeOpen(false);
                })
                .catch(() => {
                  window.alert("Fetch Data Errors");
                });
            }
          }
        }
      }
      // setTaskMatchList([]);
      // setWaitingDocList([]);
      setSeniorBrokerArray([]);
    }
  }

  const handleSnackBarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event?.preventDefault();
    setSnackBarOpen(false);
  };


  const handleClickOpen = async () => {
    randomSeniorUsersArray(users);
    const AIBotList = await getAllUsersListWithAIBotRole();
    dispatch(retrieveSeniorUsersList({}));
    const AIBotObjectArray = AIBotList.data.findAllUsersWithAIBotRole;
    const emptyArray: string[] = [];
    for (let i = 0; i < AIBotObjectArray.length; i++) {
      emptyArray.push(AIBotObjectArray[i].user_id);
    }
    let initialMatchList: ITaskListResponse[] = [];
    let initialWaitingDocList: ITaskListResponse[] = [];
    tasksList.forEach((value) => {
      if (value.Assign_To === "undefined" ||
        emptyArray.includes(value.Assign_To) === true) {
        initialMatchList.push(value);
        setBadgeOpen(true);
      }
      if (value.Task_Status === "WAITINGDOC") {
        initialWaitingDocList.push(value);
      }
    });
    setTaskMatchList(initialMatchList);
    setWaitingDocList(initialWaitingDocList);
    setOpen(true);
  };

  const handleClose = () => {
    if (taskMatchList.length > 0) {
      setBadgeOpen(true);
    } else {
      setBadgeOpen(false);
    }
    setOpen(false);
    // setTaskMatchList([]);
    setWaitingDocList([]);
    setSeniorBrokerArray([]);
    setSnackBarOpen(false);
  };

  return (
    <div className="auto-assign-button">
      {taskMatchList.length > 0 ? (
        <>
          {badgeOpen === true ? (
            <Badge
              className="auto-assign-badge"
              color="error"
              badgeContent={taskMatchList.length}
            >
              <ContainedWarningButton
                aria-label="contact"
                onClick={handleClickOpen}
              >
                Auto Assign
              </ContainedWarningButton>
            </Badge>
          ) : (
            <ContainedWarningButton
              aria-label="contact"
              onClick={handleClickOpen}
            >
              Auto Assign
            </ContainedWarningButton>
          )}
          <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle
              className="auto-assign-dialog"
            >
              Oops! Looks like there are {taskMatchList.length} tasks not been assigned in two days.
              <IconButton
                className="dialog-close-icon-button"
                aria-label="close"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Divider variant="fullWidth"></Divider>
            <DialogContent>
              <div className="auto-sign-button-container">
                <Typography>Click button to assign tasks to random senior borkers: </Typography>
                <div>
                  <Snackbar
                    anchorOrigin={{ horizontal: "center", vertical: "top" }}
                    open={snackbarOpen}
                    autoHideDuration={5000}
                    onClose={handleSnackBarClose}
                  >
                    <Alert
                      onClose={handleSnackBarClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Task assigned to new broker!
                    </Alert>
                  </Snackbar>
                  {users && (
                    <OutlinedSuccessButton
                      className="auto-assign-random-senior-brokers-button"
                      onClick={handleClick}
                    >
                      Assign
                    </OutlinedSuccessButton>
                  )}
                </div>
              </div>
              <Typography className="auto-assign-rule-note">* The policy number matches the Waiting Docs task will be assigned to the same broker.</Typography>
              <br />
              <TableContainer component={Paper}>
                <Table className="matching-edoc-tasks-table" aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCol width={100}>Task #</StyledTableCol>
                      <StyledTableCol align="right">
                        Client Name
                      </StyledTableCol>
                      <StyledTableCol align="right">
                        Task Description
                      </StyledTableCol>
                      <StyledTableCol align="right">Task Job Type</StyledTableCol>
                      <StyledTableCol align="right">Create Date</StyledTableCol>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taskMatchList.map((row, index) => (
                      <StyledTableRow key={row.Task_Id}>
                        <StyledTableCol component="th" scope="row">
                          {index + 1}
                        </StyledTableCol>
                        <StyledTableCol align="right">
                          {row.CRM_Client_Name}
                        </StyledTableCol>
                        <StyledTableCol align="right">
                          {row.Task_Description}
                        </StyledTableCol>
                        <StyledTableCol align="right">
                          {row.Job_Type_Name}
                        </StyledTableCol>
                        <StyledTableCol align="right">
                          {String(row.Create_Date).split("T")[0]}
                        </StyledTableCol>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          {badgeOpen === true ? (
            <Badge
              className="auto-assign-badge"
              color="error"
              badgeContent={taskMatchList.length}
            >
              <ContainedWarningButton
                aria-label="contact"
                onClick={handleClickOpen}
              >
                Auto Assign
              </ContainedWarningButton>
            </Badge>
          ) : (
            <ContainedWarningButton
              aria-label="contact"
              onClick={handleClickOpen}
            >
              Auto Assign
            </ContainedWarningButton>
          )}
          <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle
              className="auto-assign-dialog"
            >
              Great! All Edoc tasks are assigned.
              <IconButton
                className="dialog-close-icon-button"
                aria-label="close"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Divider variant="fullWidth"></Divider>
            <DialogContent>
              <div className="auto-sign-button-container">
                <Typography variant="body1" component="div">
                  {" "}
                  {taskMatchList.length === 0 &&
                    <Alert className="phone-number-search-alert" severity="success">
                      There is no AI bot task need to be assigned at this moment.</Alert>}
                </Typography>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default AutoAssign;
