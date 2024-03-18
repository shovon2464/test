import * as React from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { updateOnlineQuoteJobType } from "../../../../action_creators/task/task_list";
import { ITaskListJobTypeSubTypeResponse } from "../../../../action_creators/task/task_list";
import { clearTaskListJobTypeSubType } from "../../../../features/task/task_list_job_type_sub_type/taskListJobTypeSubTypeSlice";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DialogActions, Alert, TextField } from "@mui/material";
import { 
  OutlinedSuccessButton
} from "../../../../style_components/buttons/styled_outlined_buttons";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export type HandleJobTypeSubTypeOpen = {
  jobTypeSubTypeOpen: (task: ITaskListJobTypeSubTypeResponse) => void;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle className="switch-job-type-dialog" {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const JobTypeSubType: React.ForwardRefRenderFunction<HandleJobTypeSubTypeOpen> = (
  props,
  ref
) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [switchTaskId, setSwitchTaskId] = React.useState("");
  const [policyNumber, setPolicyNumber] = React.useState("");
  const [inputPolicyNumber, setInputPolicyNumber] = React.useState("");
  const [jobType, setjobType] = React.useState("Edoc");  
  const [jobSubType, setjobSubType] = React.useState("");
  const [checkSelection, setCheckSelection] = React.useState(0);
  const [checkInput, setCheckInput] = React.useState(0);

  React.useImperativeHandle(ref, () => ({
    jobTypeSubTypeOpen(task) {
      setOpen(!open);
      setSwitchTaskId(task.Task_Id);
      if(task.Policy_Number) {
        setPolicyNumber(task.Policy_Number);
      }
    },
  }));


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
    setCheckSelection(0);
  };

  const handleJobSubTypeChange = (event: SelectChangeEvent) => {
    setjobSubType(event.target.value);
    setCheckSelection(0);
  };

  const handleClickSwitch = () => {
    if (jobSubType === "") {
      setCheckSelection(1);
    }
    if (inputPolicyNumber === "") {
      setCheckInput(1);
    }

    if (jobSubType === "EdocServer" && inputPolicyNumber !== "") {
      let task: ITaskListJobTypeSubTypeResponse;
      task = {
        Task_Id: switchTaskId,
        Job_Type_Id: "0fe1f280-8a46-41b2-ac93-e8b9bec8ab78",
        Job_Sub_Type_Id: "cb5abe75-0ebf-4cd3-83dc-efc59f053456",
        Policy_Number: inputPolicyNumber,
      };
      dispatch(updateOnlineQuoteJobType(task));
      dispatch(clearTaskListJobTypeSubType());
      handleClose();
      window.location.reload();
    }

    if (jobSubType === "EdocServer" && policyNumber !== "") {
      let task: ITaskListJobTypeSubTypeResponse;
      task = {
        Task_Id: switchTaskId,
        Job_Type_Id: "0fe1f280-8a46-41b2-ac93-e8b9bec8ab78",
        Job_Sub_Type_Id: "cb5abe75-0ebf-4cd3-83dc-efc59f053456",
        Policy_Number: policyNumber,
      };
      dispatch(updateOnlineQuoteJobType(task));
      dispatch(clearTaskListJobTypeSubType());
      handleClose();
      window.location.reload();
    }
  }

  

  const handlePolicyNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckInput(0);
    e.preventDefault();
    setInputPolicyNumber(e.target.value.trim());
  }

  return (
    <div>
      <BootstrapDialog open={open} onClose={handleClose} fullWidth>
        <BootstrapDialogTitle 
          id="switch-job-type-dialog"
          onClose={handleClose}
        >
          Switch Job Type To Edoc
        </BootstrapDialogTitle>
        <DialogContent 
          className="switch-job-type-dialog-content"
          dividers>
        {policyNumber === "" && (
          <FormControl 
            className="switch-job-type-formcontrol" 
          >
            <TextField 
              id="policy-number-input"
              label="Policy Number"
              variant="outlined"
              onChange={handlePolicyNumberChange}
              value={inputPolicyNumber}
              required
            />
          </FormControl>
        )}
          <FormControl 
            disabled 
            className="switch-job-type-formcontrol"
          >
            <InputLabel id="job-type-select-label">Job Type</InputLabel>
            <Select
              labelId="job-type-select-label"
              id="job-type-select"
              value={jobType}
              label="JobType"
              onChange={handleJobTypeChange}
            >
              <MenuItem value="Edoc">Edoc</MenuItem>
            </Select>
          </FormControl>
          <FormControl 
            required 
            className="switch-job-type-formcontrol"
          >
            <InputLabel id="job-sub-type-select-label">Job Sub Type</InputLabel>
            <Select
              labelId="job-sub-type-select-label"
              id="job-sub-type-select"
              value={jobSubType}
              label="JobSubType"
              onChange={handleJobSubTypeChange}
            >
              <MenuItem value="EdocServer">Edoc Server</MenuItem>
            </Select>
          </FormControl>
          {checkInput === 1 && policyNumber === "" && inputPolicyNumber === "" && 
            <Alert
              className="job-tpye-switch-alert-policy-number-input" 
              severity="error">
                You must enter a policy number.</Alert>}
          {checkSelection === 1 && 
            <Alert
              className="job-tpye-switch-alert-selection" 
              severity="error">
                You must select a job type and job sub type to switch.</Alert>}
        </DialogContent>
        <DialogActions>
          <OutlinedSuccessButton
            className="job-type-switch-button"
            onClick={handleClickSwitch}
          >Switch</OutlinedSuccessButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default React.forwardRef(JobTypeSubType);
