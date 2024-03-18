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
import { addAutoPayOffMode } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payoffmode";

interface IPayOffModeInput {
  pay_off_type: string;
}
const AddPayOffMode: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const initialStates: IPayOffModeInput = {
    pay_off_type: "",
  };
  const checkTypeInput: RegExp = /^[A-Za-z0-9_ ]+$/;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePayOffModeSubmit = (payOffMode: IPayOffModeInput) => {
    setLoading(true);
    dispatch(addAutoPayOffMode(payOffMode.pay_off_type))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    pay_off_type: Yup.string()
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
          onSubmit={handlePayOffModeSubmit}
        >
          <Form>
            <DialogTitle>Create New Pay Off Type</DialogTitle>
            <DialogContent>
              <FieldWrapper
                name="pay_off_type"
                type="text"
                label="Pay Off Type Name"
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

export default AddPayOffMode;
