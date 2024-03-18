import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
  Alert,
} from "@mui/material";
import {
  OutlinedErrorButton,
  OutlinedPrimaryButton,
  OutlinedSuccessButton,
} from "../../../../style_components/buttons/styled_outlined_buttons";
import {
  ContainedWarningButton,
  ContainedSuccessButton,
} from "../../../../style_components/buttons/styled_contained_buttons";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  StyledTableCol,
  StyledTableRow,
} from "../../../../components/share_components/CustomizedTable/CustomizedTable";
import { ITaskListResponse } from "../../../../action_creators/task/task_list";
import { deleteTask } from "../../../../action_creators/task/task_list";
import { retrieveTaskFilesByTaskId } from "../../../../action_creators/task/task_files/task_files";

interface TaskWaitingDocProps {
  eachRowDate: any;
}

const TaskWaitingDocButton: React.FC<TaskWaitingDocProps> = (props) => {
  const { eachRowDate } = props;
  const row_task_id = eachRowDate.Task_Id;
  const row_policy_id = eachRowDate.Policy_Number;
  const [open, setOpen] = React.useState(false);
  const [matchConfirmationOpen, setMatchConfirmationOpen] =
    React.useState(false);
  const [taskMatchList, setTaskMatchList] = React.useState<ITaskListResponse[]>(
    []
  );
  const dispatch = useAppDispatch();
  const tasksList = useAppSelector((state) => state.taskList.tasks);
  const [matchTaskId, setMatchTaskId] = React.useState("");
  const [searchInput, setSearchInput] = React.useState(row_policy_id);
  const [searchClick, setSearchClick] = React.useState(0);

  // setSearchInput(row_policy_id);

  const handleOnClick = () => {
    // if (tasksList) {
    //   let initialMatchList: ITaskListResponse[] = [];
    //   tasksList.forEach((value) => {
    //     if (
    //       value.Policy_Number === row_policy_id &&
    //       value.Task_Id !== row_task_id &&
    //       value.Job_Type_Name === "Edoc"
    //     ) {
    //       initialMatchList.push(value);
    //     }
    //   });
    //   setTaskMatchList(initialMatchList);
    // }
    setOpen(true);
  };
  const handleMatchOnClick = (id: string) => {
    try {
      dispatch(deleteTask(id))
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          throw Error(e);
        });
      dispatch(deleteTask(row_task_id))
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          throw Error(e);
        });
      handleCloseMatchConfirmation();
      handleClose();
    } catch (error) {
      window.alert(error);
      console.log(error);
    }
  };

  const handleFileView = (taskId: string) => {
    dispatch(retrieveTaskFilesByTaskId(taskId))
      .unwrap()
      .then((value) => {
        window.open(value[0].File_Path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setTaskMatchList([]);
    setSearchInput(row_policy_id);
    setSearchClick(0);
  };

  const handleClickOpen = () => {
    let initialMatchList: ITaskListResponse[] = [];
    tasksList.forEach((value) => {
      if (
        value.Policy_Number === searchInput &&
        value.Task_Id !== row_task_id &&
        value.Job_Type_Name === "Edoc"
      ) {
        initialMatchList.push(value);
      }
    });
    setTaskMatchList(initialMatchList);
    setSearchClick(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value.trim());
  };

  const resetSearchInput = () => {
    setSearchInput("");
    setSearchClick(0);
    setTaskMatchList([]);
  };

  const handleCloseMatchConfirmation = () => {
    setMatchTaskId("");
    setMatchConfirmationOpen(false);
  };

  const matchConfirmationPopup = (id: string) => {
    setMatchTaskId(id);
    setMatchConfirmationOpen(true);
  };

  return (
    <>
      <ContainedSuccessButton
        className="waiting-doc-match-button"
        onClick={handleOnClick}>
        Match
      </ContainedSuccessButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <Dialog
          className="matching-task-confirmation-dialog"
          open={matchConfirmationOpen}
          onClose={handleCloseMatchConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle
            className="matching-task-confirmation-dialog"
            id="alert-dialog-title">
            Matching Tasks
            <IconButton
              className="dialog-close-icon-button"
              aria-label="close"
              onClick={handleCloseMatchConfirmation}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider variant="middle"></Divider>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The selected tasks will be deleted, are you sure you want to macth
              them?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <OutlinedErrorButton
              onClick={() => handleMatchOnClick(matchTaskId)}>
              Match
            </OutlinedErrorButton>
          </DialogActions>
        </Dialog>
        <DialogTitle className="matching-edocs-dialog">
          Matching EDocs
          <IconButton
            className="dialog-close-icon-button"
            aria-label="close"
            onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          <div className="search-input-n-button">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
              placeholder="123456"
              onChange={handleChange}
              value={searchInput}
            />
            <OutlinedSuccessButton
              className="policy-number-search-button"
              onClick={handleClickOpen}>
              Search
            </OutlinedSuccessButton>
            <ContainedSuccessButton
              className="policy-number-clear-button"
              onClick={resetSearchInput}>
              Clear
            </ContainedSuccessButton>
          </div>
          {searchClick === 1 && taskMatchList.length > 0 ? (
            <TableContainer component={Paper}>
              <Table
                className="matching-edoc-tasks-table"
                aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCol width={100}>Task #</StyledTableCol>
                    <StyledTableCol align="right">
                      Task Description
                    </StyledTableCol>
                    <StyledTableCol align="right">Task Job Type</StyledTableCol>
                    <StyledTableCol align="right">EDoc Type</StyledTableCol>
                    <StyledTableCol align="right">Create Date</StyledTableCol>
                    <StyledTableCol align="right">Action</StyledTableCol>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {taskMatchList.map((row, index) => (
                    <StyledTableRow key={row.Task_Id}>
                      <StyledTableCol component="th" scope="row">
                        {index + 1}
                      </StyledTableCol>
                      <StyledTableCol align="right">
                        {row.Task_Description}
                      </StyledTableCol>
                      <StyledTableCol align="right">
                        {row.Job_Type_Name}
                      </StyledTableCol>
                      <StyledTableCol align="right">
                        {row.Task_Files}
                      </StyledTableCol>
                      <StyledTableCol align="right">
                        {String(row.Create_Date).split("T")[0]}
                      </StyledTableCol>
                      <StyledTableCol align="right">
                        <OutlinedPrimaryButton
                          className="matching-task-view-file-button"
                          onClick={() => {
                            handleFileView(row.Task_Id);
                          }}>
                          View File
                        </OutlinedPrimaryButton>
                        <ContainedWarningButton
                          className="matching-task-match-button"
                          onClick={() => {
                            matchConfirmationPopup(row.Task_Id);
                          }}>
                          Match
                        </ContainedWarningButton>
                      </StyledTableCol>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" component="div">
              {" "}
              {searchClick === 1 && taskMatchList.length === 0 && (
                <Alert className="phone-number-search-alert" severity="error">
                  No EDoc Tasks Matched
                </Alert>
              )}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskWaitingDocButton;