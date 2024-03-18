import React, { useEffect } from "react";
import { Snackbar, Alert, TextField } from "@mui/material";
import { OutlinedErrorButton } from "../../../../style_components/buttons/styled_outlined_buttons";
import "../../../../style_components/tools/autoDelete_style.css";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  IAutoDelete,
  updateTaskDays,
} from "../../../../action_creators/tools/auto_delete/auto_delete";
import { fontSize, fontWeight } from "@mui/system";
import "../../../../style_components/tools/autoDelete_style.css";
import { ContainedPrimaryButton } from "../../../../style_components/buttons/styled_contained_buttons";

const AlertDaysCheck: React.FC = () => {
  // const tasksList = useAppSelector((state) => state.taskList.tasks);

  const auto_delete_info = useAppSelector((state) => state.autoDelete.infos);
  const dispatch = useAppDispatch();
  const [snackbarOpen, setSnackBarOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  // console.log(auto_delete_info[0]);
  const info = auto_delete_info[0];
  const [alertDays, setAlertDays] = React.useState(0);

  const onChangeAlert = (event: any) => {
    setAlertDays(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    if (alertDays > 0) {
      setSnackMsg(`Alert days changed successfully`);
      setSnackBarOpen(true);
      saveAlertDay();
      setIsSuccess(true);
    } else {
      setSnackMsg("You can't set the alert days to 0.");
      setSnackBarOpen(true);
      setIsSuccess(false);
    }

    // console.log("Information", auto_delete_info);
  };

  const saveAlertDay = () => {
    let changedInfo: IAutoDelete;
    changedInfo = {
      alert_delete_id: "79a47e2a-e386-4a2d-aaa6-8a70cc57c12f",
      alert_days: alertDays,
      delete_days: auto_delete_info[0].delete_days,
      target_email: auto_delete_info[0].target_email,
      active: auto_delete_info[0].active,
    };
    let l: IAutoDelete[] = [];
    l.push(changedInfo);

    dispatch(updateTaskDays(l));
  };

  const handleClose = () => {
    setOpen(false);
    setSnackBarOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={isSuccess?'success':'error'} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
      <div className="auto_delete_container">
        

        <br />
        <div className="auto_delete_days_textfield">
        <TextField
          id="outlined-basic-days"
          label="Alert days"
          type={"number"}
          defaultValue={alertDays}
          onChange={(event: any) => {
            setAlertDays(event.target.value as number);
          }}
          required
        ></TextField>
        <ContainedPrimaryButton className="save_button" onClick={handleClickOpen}>
          Save
        </ContainedPrimaryButton>
        </div>
        
      </div>
    </>
  );
};

export default AlertDaysCheck;
