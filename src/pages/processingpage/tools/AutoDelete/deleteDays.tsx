import React, { useEffect } from "react";
import { OutlinedErrorButton } from "../../../../style_components/buttons/styled_outlined_buttons";
import "../../../../style_components/tools/autoDelete_style.css";
import { Alert, TextField, Snackbar } from "@mui/material";
import "../../../../style_components/tools/autoDelete_style.css";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  IAutoDelete,
  updateTaskDays,
} from "../../../../action_creators/tools/auto_delete/auto_delete";
import { ContainedPrimaryButton } from "../../../../style_components/buttons/styled_contained_buttons";

const DeleteDays: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackBarOpen] = React.useState(false);
  const auto_delete_info = useAppSelector((state) => state.autoDelete.infos);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [deleteDays, setDeleteDays] = React.useState(0);
  const dispatch = useAppDispatch();
  const [isSuccess, setIsScucess] = React.useState(false);

  const onChangeDelete = (event: any) => {
    const nums = /^[0-9\b]+$/;
    if (event.target.value === "" || nums.test(event.target.value)) {
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
    if (deleteDays > 0) {
      setSnackMsg("Delete days changed successfullly.");
      setSnackBarOpen(true);
      saveDeleteDay();
      setIsScucess(true);
    } else {
      setSnackMsg("You can't set the delete days to 0.");
      setSnackBarOpen(true);
      setIsScucess(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setSnackBarOpen(false);
  };

  const saveDeleteDay = () => {
    let changedInfo: IAutoDelete;
    changedInfo = {
      alert_delete_id: "79a47e2a-e386-4a2d-aaa6-8a70cc57c12f",
      alert_days: auto_delete_info[0].alert_days,
      delete_days: deleteDays,
      target_email: auto_delete_info[0].target_email,
      active: auto_delete_info[0].active,
    };
    let l: IAutoDelete[] = [];
    l.push(changedInfo);

    dispatch(updateTaskDays(l));
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
      <div className="auto_delete_days_textfield">
        <TextField
          id="outlined-basic-days"
          label="Delete days"
          defaultValue={deleteDays}
          type={"number"}
          onChange={(event: any) => {
            setDeleteDays(event.target.value as number);
          }}
        ></TextField>
        <ContainedPrimaryButton className="save_button" onClick={handleClickOpen}>
          Save
        </ContainedPrimaryButton>
      </div>
    </>
  );
};

export default DeleteDays;
