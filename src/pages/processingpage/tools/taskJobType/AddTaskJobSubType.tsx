import React, { useState, useEffect } from "react";
import { IconButton, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FieldWrapper } from "../../../../components/form_components/FieldWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addTaskJobSubType } from "../../../../action_creators/tools/task_job_type_dropdown/task_job_sub_type";
import { ITaskJobSubType } from "../../../../action_creators/tools/task_job_type_dropdown/task_job_type";

interface ITaskJobSubTypeState {
  job_sub_type_name: string;
  score: number;
}

interface IAddTaskJobSubTypeDialogProps {
  job_type_Id?: string;
}

const AddTaskJobSubType: React.FC<IAddTaskJobSubTypeDialogProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [jobTypeId, setJobTypeId] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.job_type_Id) {
      setJobTypeId(props.job_type_Id);
    }
  }, [props.job_type_Id]);

  const initialStates: ITaskJobSubTypeState = {
    job_sub_type_name: "",
    score: 0,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskJobSubTypeSubmit = (
    taskJobSubTypeInfo: ITaskJobSubTypeState
  ) => {
    setLoading(true);
    const newTaskJobSubType: ITaskJobSubType = {
      Job_Sub_Type_Name: taskJobSubTypeInfo.job_sub_type_name,
      Score: taskJobSubTypeInfo.score,
      Job_Type_Id: jobTypeId,
    };
    dispatch(addTaskJobSubType(newTaskJobSubType))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const checkJobSubTypeInput: RegExp = /^[A-Za-z0-9_ ]+$/;
  const validationSchema = Yup.object().shape({
    job_sub_type_name: Yup.string()
      .required("Field Required!")
      .matches(checkJobSubTypeInput, "Accept only letters and numbers"),
    score: Yup.number()
      .required("Field Required!")
      .max(1, "Score is between 0 to 9"),
  });

  return (
    <div style={{ display: "table-cell" }}>
      <IconButton aria-label="create" color="primary" onClick={handleClickOpen}>
        <AddCircleOutlineIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <Formik
          initialValues={initialStates}
          validationSchema={validationSchema}
          onSubmit={handleTaskJobSubTypeSubmit}
        >
          <Form>
            <DialogTitle>Create New Task Job Sub Type</DialogTitle>
            <DialogContent>
              <FieldWrapper
                name="job_sub_type_name"
                type="text"
                label="Job Sub Type Name"
              />
              <FieldWrapper name="score" type="number" label="Job Type Score" />
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

export default AddTaskJobSubType;
