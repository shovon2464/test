import React from "react";
import { IconButton, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FieldWrapper } from "../../../../components/form_components/FieldWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../../app/hooks";
import {
  addTaskSource,
  ITaskSource,
} from "../../../../action_creators/tools/task_source_dropdown/task_source";

const AddTaskSource: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const initialStates: ITaskSource = {
    Task_Source_Name: "",
  };

  const checkTypeInput: RegExp = /^[A-Za-z0-9_ ]+$/;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskSourceSubmit = (taskSourceInfo: ITaskSource) => {
    setLoading(true);
    dispatch(addTaskSource(taskSourceInfo.Task_Source_Name))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    Task_Source_Name: Yup.string()
      .required("Field Required!")
      .matches(checkTypeInput, "Accept only letters and numbers"),
  });

  return (
    <div>
      <IconButton aria-label="create" color="primary" onClick={handleClickOpen}>
        <AddCircleOutlineIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <Formik
          initialValues={initialStates}
          validationSchema={validationSchema}
          onSubmit={handleTaskSourceSubmit}
        >
          <Form>
            <DialogTitle>Create New Task Source</DialogTitle>
            <DialogContent>
              <FieldWrapper
                name="Task_Source_Name"
                type="text"
                label="Task Source Name"
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" variant="contained">
                Create
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
};

export default AddTaskSource;
