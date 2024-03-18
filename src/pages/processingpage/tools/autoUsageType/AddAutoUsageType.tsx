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
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { addAutoUsage } from "../../../../action_creators/tools/auto_usage_dropdown/auto_usage";

interface IAutoUsageType {
  usageType: string;
}

const AddAutoUsageType: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const initialStates: IAutoUsageType = {
    usageType: "",
  };
  const checkTypeInput: RegExp = /^[A-Za-z0-9_ ]+$/;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUsageTypeSubmit = (autoUsageType: IAutoUsageType) => {
    setLoading(true);
    dispatch(addAutoUsage(autoUsageType.usageType))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    usageType: Yup.string()
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
          onSubmit={handleUsageTypeSubmit}
        >
          <Form>
            <DialogTitle>Create New Usage Type</DialogTitle>
            <DialogContent>
              <FieldWrapper
                name="usageType"
                type="text"
                label="Auto Usage Type"
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

export default AddAutoUsageType;
