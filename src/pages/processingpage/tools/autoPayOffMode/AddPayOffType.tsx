import React, { useState, useEffect } from "react";
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
import { addAutoPayOffType } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payofftype";
import { IAutoPayOffType } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payoffmode";

interface IPayOffTypeState {
  pay_off_type_detail: string;
}

interface IAddPayOffTypeDialogProps {
  pay_off_mode_id?: string;
}

const AddPayOffType: React.FC<IAddPayOffTypeDialogProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [payOffModeId, setPayOffModeId] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.pay_off_mode_id) {
      setPayOffModeId(props.pay_off_mode_id);
    }
  }, [props.pay_off_mode_id]);

  const initialStates: IPayOffTypeState = {
    pay_off_type_detail: "",
  };
  const checkTypeInput: RegExp = /^[A-Za-z0-9_ ]+$/;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAutoPayOffTypeSubmit = (payOffTypeInfo: IPayOffTypeState) => {
    setLoading(true);
    const newAutoPayOffType: IAutoPayOffType = {
      PayOffTypeDetail: payOffTypeInfo.pay_off_type_detail,
      fk_pay_off_mode_id: payOffModeId,
      cm_payofftypedetail: [{}],
    };
    dispatch(addAutoPayOffType(newAutoPayOffType))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    pay_off_type_detail: Yup.string()
      .required("Field Required!")
      .matches(checkTypeInput, "Accept only letters and numbers"),
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
          onSubmit={handleAutoPayOffTypeSubmit}
        >
          <Form>
            <DialogTitle>Create New Auto Pay Off Type Detail</DialogTitle>
            <DialogContent>
              <FieldWrapper
                name="pay_off_type_detail"
                type="text"
                label="Auto Pay Off Type Detail"
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

export default AddPayOffType;
