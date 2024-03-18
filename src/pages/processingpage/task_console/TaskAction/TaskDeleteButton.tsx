import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { deleteTask } from "../../../../action_creators/task/task_list";
import {
  createAPerformanceRecord,
  IUserPerformanceRequest,
} from "../../../../action_creators/performance_report/user_performance";
import { timeDiff } from "../../../../helpers/TimeDiffHelper";
import { OutlinedErrorButton }
  from "../../../../style_components/buttons/styled_outlined_buttons";
import { ContainedErrorButton }
  from "../../../../style_components/buttons/styled_contained_buttons";

interface TaskDeleteButtonProps {
  task_id: string;
  eachRowDate: any;
}

const TaskDeleteButton: React.FC<TaskDeleteButtonProps> = (props) => {
  const { task_id, eachRowDate } = props;
  const [deleteBtnLoading, setDeleteBtnLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const userList = useAppSelector((state) => state.userList.users);
  const [matchConfirmationOpen, setMatchConfirmationOpen] = React.useState(false);

  const handleOpenDeleteConfirmation = () => {
    setMatchConfirmationOpen(true);
  }

  const handleCloseDeleteConfirmation = () => {
    setMatchConfirmationOpen(false);
  }


  const handleOnClick = () => {
    setDeleteBtnLoading(true);
    let username: string = "";
    let closeDate: Date = eachRowDate.Close_Date
      ? new Date(eachRowDate.Close_Date)
      : new Date();
    if (userList) {
      const index = userList.findIndex(
        ({ user_id }) => user_id === eachRowDate.Assign_To
      );
      username = userList[index].name;
    }
    const costTimeHours = timeDiff(
      new Date(eachRowDate.Create_Date),
      closeDate
    );

    const performanceInfo: IUserPerformanceRequest = {
      Job_Close_Date: closeDate,
      user_id: eachRowDate.Assign_To,
      Job_Type: eachRowDate.Job_Type_Name,
      Job_Sub_Type: eachRowDate.Job_Sub_Type_Name,
      Phone_Number: eachRowDate.CRM_Client_Phone
        ? eachRowDate.CRM_Client_Phone
        : "",
      UserName: username,
      Cost_Time: costTimeHours,
    };
    dispatch(createAPerformanceRecord(performanceInfo))
      .unwrap()
      .then(() => {
        dispatch(deleteTask(task_id))
          .unwrap()
          .then((res) => {
            //window.location.reload();
            console.log(res);
            setDeleteBtnLoading(false);
          })
          .catch((e) => {
            window.alert(e);
            console.log(e);
            setDeleteBtnLoading(false);
          });
      })
      .catch((e) => {
        window.alert(e);
        console.log(e);
        setDeleteBtnLoading(false);
      });
    setMatchConfirmationOpen(false);
  };
  return (
    <>
      <ContainedErrorButton
        className="completed-task-delete-button"
        onClick={handleOpenDeleteConfirmation}
        disabled={deleteBtnLoading}
      >
        {deleteBtnLoading && (
          <span className="spinner-border spinner-border-sm"></span>
        )}
        <span>Delete</span>
      </ContainedErrorButton>
      <Dialog
        className="completed-task-delete-confirmation-dialog"
        open={matchConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="delete-all-task-dialog" id="alert-dialog-title">
          Delete Task
          <IconButton
            className="dialog-close-icon-button"
            aria-label="close"
            onClick={handleCloseDeleteConfirmation}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The selected task will be deleted, are you sure you want to do this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <OutlinedErrorButton
            className="delete-task-confirm-button"
            onClick={handleOnClick}
          >Delete</OutlinedErrorButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskDeleteButton;
