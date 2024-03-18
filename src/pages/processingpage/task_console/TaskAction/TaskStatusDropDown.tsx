import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TaskDeleteButton from "./TaskDeleteButton";
import TaskFollowUpCalendar from "./TaskFollowUpCalendar";
import TaskWaitingDocButton from "./TaskWaitingDocButton";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import IUserDropDownListProps from "../../../../interfaces/task/IUserDropDownListProps";
import { updateEachTaskStatus } from "../../../../action_creators/task/task_list";
import { Alert, Snackbar } from "@mui/material";
import { color } from "@mui/system";
import { getLastNotesByTaskId } from "../../../../services/task/note/note";
import { timeCollapse } from "../../../../helpers/TimeDiffHelper";
import useAuth from "../../../../context/useAuth";
// import TaskHelloSignButton from "./TaskHelloSignButton";

enum TaskState {
  INPROGRESS = "INPROGRESS",
  COMPLETE = "COMPLETE",
  FOLLOWUP = "FOLLOWUP",
  WAITINGDOC = "WAITINGDOC",
}

const TaskStatusDropDown: React.FC<IUserDropDownListProps> = (props) => {
  const { defValue, rowValue } = props;
  let row = rowValue;
  let task_id = row.Task_Id;
  const [taskState, setTaskState] = React.useState("");
  const [snackbarOpen, setSnackBarOpen] = React.useState(false);
  const [checkFollowUpDate, setCheckFollowUpDate] = React.useState(0);
  const [isClickable, setIsClickable] = React.useState(false);
  const dispatch = useAppDispatch();
  let taskCurrentStatus = row.Task_Status;
  const userInfo = useAuth();
  // only be able to click "completed" within 1 hour of writing note. Check time difference.

  const checkTimeCollapse = async () => {
    const lastNote = await getLastNotesByTaskId(task_id);
    if (lastNote.data.findLastNotesByTaskID.length != 0) {
      const lastNoteCreateDate =
        lastNote.data.findLastNotesByTaskID[0].Create_Date;
      const lastNoteDate = new Date(lastNoteCreateDate);
      if (timeCollapse(lastNoteDate) <= 60) {
        setIsClickable(true);
      }
    }
  };

  React.useEffect(() => {
    setTaskState(taskCurrentStatus);
    // checkTimeCollapse();
    return () => {
      setTaskState("");
      // setSnackBarOpen(false);
    };
  }, [dispatch, taskCurrentStatus]);

  const handleChange = (event: SelectChangeEvent) => {
    setTaskState(event.target.value);
    row.Task_Status = event.target.value;

    if (row.Task_Status === TaskState.COMPLETE) {
      row.Close_Date = new Date();
    }
    if (
      row.Task_Status === TaskState.INPROGRESS ||
      row.Task_Status === TaskState.WAITINGDOC
    ) {
      row.FollowUp_Date = null;
    }
    if (row.Task_Status === TaskState.FOLLOWUP && row.FollowUp_Date === null) {
      setCheckFollowUpDate(1);
    } else {
      setCheckFollowUpDate(0);
      dispatch(updateEachTaskStatus(row))
        .unwrap()
        .then(() => {
          setSnackBarOpen(true);
        })
        .catch((e) => {
          console.log(e);
        });
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
    <div>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Task Status Changed
        </Alert>
      </Snackbar>
      <Select
        value={taskState}
        onChange={handleChange}
        onOpen={checkTimeCollapse}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        variant="standard">
        <MenuItem key={0} value={TaskState.INPROGRESS}>
          In Progress
        </MenuItem>

        <MenuItem
          key={1}
          value={TaskState.COMPLETE}
          disabled={isClickable === false}>
          Completed
        </MenuItem>
        <MenuItem key={2} value={TaskState.FOLLOWUP}>
          Follow Up
        </MenuItem>
        {rowValue.Policy_Number && (
          <MenuItem key={3} value={TaskState.WAITINGDOC}>
            Waiting Docs
          </MenuItem>
        )}
      </Select>
      {taskCurrentStatus === "COMPLETE" && (
        <>
          {userInfo.Role === "manager" && (
            <TaskDeleteButton task_id={task_id} eachRowDate={row} />
          )}
        </>
      )}
      {taskCurrentStatus === "FOLLOWUP" && (
        <>
          <TaskFollowUpCalendar eachRowDate={rowValue} />
          {checkFollowUpDate === 1 && (
            <>
              <br />
              <p className="follow-up-date-validation">
                * Choose a follow up date to save changes
              </p>
            </>
          )}
        </>
      )}

      {taskCurrentStatus === "WAITINGDOC" && (
        <TaskWaitingDocButton eachRowDate={rowValue} />
      )}
    </div>
  );
};

export default TaskStatusDropDown;
