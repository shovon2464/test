import { Snackbar, TextField, Alert } from "@mui/material";
import React from "react";
import { OutlinedErrorButton } from "../../../../style_components/buttons/styled_outlined_buttons";
import "../../../../style_components/tools/autoDelete_style.css";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  IAutoDelete,
  updateTaskDays,
} from "../../../../action_creators/tools/auto_delete/auto_delete";
import { ContainedPrimaryButton } from "../../../../style_components/buttons/styled_contained_buttons";

const ReceivingEmail: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackBarOpen] = React.useState(false);
  const auto_delete_info = useAppSelector((state) => state.autoDelete.infos);
  const [email, setEmail] = React.useState("");
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");

  const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  function isEmailFormat(input: string): boolean {
    return emailRegex.test(input);
  }

  const handleClickOpen = () => {
    if (email.length > 0) {
      if (isEmailFormat(email)) {
        setOpen(true);
        setSnackBarOpen(true);
        saveTargetEmail();
        setIsSuccess(true);
        setSnackMsg("Target Email changed successfully.");
      } else {
        setSnackBarOpen(true);
        setIsSuccess(false);
        setSnackMsg("Invalid Email format.");
      }
    } else {
      setSnackBarOpen(true);
      setIsSuccess(false);
      setSnackMsg("Email cannot be empty.");
    }
  };

  const saveTargetEmail = () => {
    let changedInfo: IAutoDelete;
    changedInfo = {
      alert_delete_id: "79a47e2a-e386-4a2d-aaa6-8a70cc57c12f",
      alert_days: auto_delete_info[0].delete_days,
      delete_days: auto_delete_info[0].delete_days,
      target_email: email,
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
        <Alert
          onClose={handleClose}
          severity={isSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>

      <div className="auto_delete_email_textfield">
        <TextField
          id="outlined-basic"
          label="Target Email"
          value={email}
          onChange={(event: any) => {
            setEmail(event.target.value);
          }}
        ></TextField>
        <ContainedPrimaryButton
          className="save_button"
          onClick={handleClickOpen}
        >
          Update
        </ContainedPrimaryButton>
      </div>
    </>
  );
};

export default ReceivingEmail;
