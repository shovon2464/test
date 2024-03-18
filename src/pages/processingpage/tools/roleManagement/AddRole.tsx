import { IconButton, Button } from "@mui/material";
import React from "react";
import Dialog from "@mui/material/Dialog";
import { Formik, Form } from "formik";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  addRole,
  IRoleManagement,
} from "../../../../action_creators/tools/role_management_dropdown/role_management";
import { useAppDispatch } from "../../../../app/hooks";
import * as Yup from "yup";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FieldWrapper } from "../../../../components/form_components/FieldWrapper";

const AddRole: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const initialStates: IRoleManagement = {
    name: "",
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRoleSubmit = (roleInfo: IRoleManagement) => {
    setLoading(true);
    dispatch(addRole(roleInfo.name))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const checkTypeInput: RegExp = /^[A-Za-z0-9_ ]+$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string()
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
          onSubmit={handleRoleSubmit}
        >
          <Form>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogContent>
              <FieldWrapper name="name" type="text" label="Role Description" />
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

export default AddRole;
