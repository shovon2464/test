import React from "react";
import TextField from "@mui/material/TextField";
import { updateEachTaskStatus } from "../../../../action_creators/task/task_list";
import { useAppDispatch } from "../../../../app/hooks";
import { Alert, Snackbar } from "@mui/material";

interface TaskFollowUpProps {
  eachRowDate: any;
}

const TaskFollowUpCalendar: React.FC<TaskFollowUpProps> = (props) => {
  const { eachRowDate } = props;
  const dispatch = useAppDispatch();
  const [snackbarOpen, setSnackBarOpen] = React.useState(false);
  const defaultDate: string = eachRowDate.FollowUp_Date
    ? eachRowDate.FollowUp_Date.toString()
    : "";
  const getOnlyDate: string = defaultDate ? defaultDate.split("T")[0] : "";

  const [followUpDate, setFollowUpDate] = React.useState(getOnlyDate);
  const [followUpLoading, setFollowUpLoading] = React.useState(false);

  const handleFollowUpDateOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    const checkValidYear: number = +date.substring(0, 4);
    setFollowUpDate(date);
    if (checkValidYear >= 2022 && checkValidYear <= 2123) {
      const dateObj = new Date(date);
      const ISODate = dateObj.toISOString();
      let taskInfo = eachRowDate;
      taskInfo.FollowUp_Date = ISODate;

      if (taskInfo.FollowUp_Date !== null && taskInfo.FollowUp_Date !== "") {
        setFollowUpLoading(true);
        setTimeout(() => {
          dispatch(updateEachTaskStatus(taskInfo))
            .unwrap()
            .then((res) => {
              console.log(res);
              window.location.reload();
              setSnackBarOpen(true);
            })
            .catch((e) => {
              window.alert(e);
            });
        }, 3000);
      }
    }

  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event?.preventDefault();
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
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Follow Up Date Changed
        </Alert>
      </Snackbar>
      <TextField
        variant="standard"
        type="date"
        value={followUpDate}
        onChange={handleFollowUpDateOnChange}
        disabled={followUpLoading}
        sx={{ width: 120, marginLeft: 2, marginTop: 0 }}
      />
      {followUpLoading && (
        <span className="spinner-border spinner-border-sm follow-up-date-spinner"></span>
      )}
    </>
  );
};

export default TaskFollowUpCalendar;
