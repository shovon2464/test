import React, { useEffect } from "react";
import {
  ITaskListJobTypeSubTypeResponse,
  updateOnlineQuoteJobType,
} from "../../../../action_creators/task/task_list";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getTaskJobTypesAndSubTypes } from "../../../../action_creators/tools/task_job_type_dropdown/task_job_type";
import { retrieveJobSubTypesByJobTypeId } from "../../../../action_creators/task/job_sub_type/job_sub_type";
import { JobSubTypeRequest } from "../../../../services/questionaire/auto_questionaire/jobSubType";
import { ContainedWarningButton } from "../../../../style_components/buttons/styled_contained_buttons";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import { clearTaskListJobTypeSubType } from "../../../../features/task/task_list_job_type_sub_type/taskListJobTypeSubTypeSlice";

export type HandleEdocSwitchOpen = {
  edocSwitchOpen: (task: ITaskListJobTypeSubTypeResponse) => void;
};

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const EdocSwitch: React.ForwardRefRenderFunction<HandleEdocSwitchOpen> = (
  props,
  ref
) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [switchTaskId, setSwitchTaskId] = React.useState("");
  const [policyNumber, setPolicyNumber] = React.useState("");
  const [inputPolicyNumber, setInputPolicyNumber] = React.useState("");
  const [jobType, setjobType] = React.useState("");
  const [jobSubType, setjobSubType] = React.useState("");
  const [checkSelection, setCheckSelection] = React.useState(0);
  const [checkInput, setCheckInput] = React.useState(0);
  const getJobTypeList = useAppSelector((state) => state.jobTypeList.jobTypes);
  const getJobSubTypeList = useAppSelector(
    (state) => state.jobSubTypeList.jobSubTypes
  );

  React.useImperativeHandle(ref, () => ({
    edocSwitchOpen(task) {
      setOpen(!open);
      setSwitchTaskId(task.Task_Id);
      if (task.Policy_Number) {
        setPolicyNumber(task.Policy_Number);
      }
    },
  }));

  useEffect(() => {
    if (jobType !== "") {
      let type: JobSubTypeRequest = {
        Job_Type_Id: jobType,
      };
      dispatch(retrieveJobSubTypesByJobTypeId(type));
    }
  }, [jobType]);

  const handleClose = () => {
    setjobSubType("");
    setSwitchTaskId("");
    setPolicyNumber("");
    setInputPolicyNumber("");
    setCheckSelection(0);
    setCheckInput(0);
    setOpen(false);
  };

  const handleJobTypeChange = (event: SelectChangeEvent) => {
    setjobType(event.target.value);
    console.log(event.target.value);
    setCheckSelection(0);
  };

  const handleJobSubTypeChange = (event: SelectChangeEvent) => {
    setjobSubType(event.target.value);
    console.log(event.target.value);
    setCheckSelection(0);
  };

  const onUpdate = () => {
    let task: ITaskListJobTypeSubTypeResponse;
    task = {
      Task_Id: switchTaskId,
      Job_Type_Id: jobType,
      Job_Sub_Type_Id: jobSubType,
      Policy_Number: policyNumber,
    };
    console.log(task);
    dispatch(updateOnlineQuoteJobType(task));
    dispatch(clearTaskListJobTypeSubType());
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle className="switch-job-tyle-dialog">
          Update Edoc Job Type & Job Sub Type
          <IconButton
            className="dialog-close-icon-button"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Job Type</InputLabel>
            <Select
              id="job-type-select"
              value={jobType}
              label="JobType"
              onChange={handleJobTypeChange}
              fullWidth
              required
            >
              {getJobTypeList.length > 0 &&
                getJobTypeList.map((value, index) => {
                  return (
                    <MenuItem key={index} value={value.Job_Type_Id}>
                      {value.Job_Type_Name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel>Job Sub Type</InputLabel>
            <Select
              id="job-sub-type"
              value={jobSubType}
              label="Job Sub Type"
              onChange={handleJobSubTypeChange}
              fullWidth
              required
            >
              {getJobSubTypeList.length > 0 &&
                getJobSubTypeList.map((value, index) => {
                  return (
                    <MenuItem key={index} value={value.Job_Sub_Type_Id}>
                      {value.Job_Sub_Type_Name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className="confirm-button">
          <Button
            onClick={onUpdate}
            variant="contained"
            color="primary"
            type="submit"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.forwardRef(EdocSwitch);
