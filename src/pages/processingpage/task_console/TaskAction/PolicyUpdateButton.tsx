import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { OutlinedErrorButton } from "../../../../style_components/buttons/styled_outlined_buttons";
import {
  ITaskListResponse,
  updateTaskPolicyNumber,
} from "../../../../action_creators/task/task_list";
import { useAppDispatch } from "../../../../app/hooks";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";

interface IPolicyNumberUpdateProps {
  rowValue: any;
}

const UpdatePolicyButton: React.FC<IPolicyNumberUpdateProps> = (props) => {
  const { rowValue } = props;
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [inputPolicyNumber, setInputPolicyNumber] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
    let task_info = rowValue;
    let input = inputPolicyNumber;
    task_info.Policy_Number = input;
    // console.log(task_info.Policy_Number);
    dispatch(updateTaskPolicyNumber(task_info));
    setOpen(false);
  };

  return (
    <>
      <Button className="update-policy-button" onClick={handleClickOpen}>
        Update Policy #
      </Button>
      <Dialog open={open} onClose={handleClickClose} fullWidth>
        <DialogTitle className="update-policy-number-dialog">
          Update Policy Number
          <IconButton
            className="dialog-close-icon-button"
            onClick={handleClickClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent>
          <FormControl className="policy-update-formcontrol" fullWidth>
            <TextField
              id="policy-number-input"
              label="Policy Number"
              variant="outlined"
              required
              onChange={(e: any) => {
                setInputPolicyNumber(e.target.value as string);
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions className="confirm-button">
          <Button
            onClick={handleChange}
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

export default UpdatePolicyButton;
