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
import { addAutoPayOffTypeDetail } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payofftypedetail";
import { IAutoPayOffTypeDetailWithPayOffModeId } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payofftypedetail";
import { IAutoPayOffTypeDetail } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payoffmode";

interface IPayOffTypeDetailState {
  pay_off_type_sub_detail: string;
}

interface IAddPayOffTypeDetailDialogProps {
  pay_off_mode_id?: string;
  pay_off_type_id?: string;
}

const AddPayOffTypeDetail: React.FC<IAddPayOffTypeDetailDialogProps> = (
  props
) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [payOffModeId, setPayOffModeId] = useState("");
  const [payOffTypeId, setPayOffTypeId] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.pay_off_mode_id && props.pay_off_type_id) {
      setPayOffModeId(props.pay_off_mode_id);
      setPayOffTypeId(props.pay_off_type_id);
    }
  }, [props.pay_off_mode_id, props.pay_off_type_id]);

  const initialStates: IPayOffTypeDetailState = {
    pay_off_type_sub_detail: "",
  };
  const checkTypeInput: RegExp = /^[A-Za-z0-9_ ]+$/;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAutoPayOffTypeDetailSubmit = (
    payOffTypeDetailInfo: IPayOffTypeDetailState
  ) => {
    setLoading(true);
    const newPayOffTypeDetail: IAutoPayOffTypeDetail = {
      PayOffTypeSubDetail: payOffTypeDetailInfo.pay_off_type_sub_detail,
      fk_pay_off_type_id: payOffTypeId,
    };
    const newAutoPayOffTypeDetail: IAutoPayOffTypeDetailWithPayOffModeId = {
      PayOffMode_Id: payOffModeId,
      PayOffTypeDetail: newPayOffTypeDetail,
    };
    dispatch(addAutoPayOffTypeDetail(newAutoPayOffTypeDetail))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    pay_off_type_sub_detail: Yup.string()
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
          onSubmit={handleAutoPayOffTypeDetailSubmit}
        >
          <Form>
            <DialogTitle>Create New Auto Pay Off Type Sub Detail</DialogTitle>
            <DialogContent>
              <FieldWrapper
                name="pay_off_type_sub_detail"
                type="text"
                label="Auto Pay Off Type Sub Detail"
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

export default AddPayOffTypeDetail;
