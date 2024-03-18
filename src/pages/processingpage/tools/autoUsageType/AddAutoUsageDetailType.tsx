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
import { addUsageAndDetailType } from "../../../../action_creators/tools/auto_usage_dropdown/auto_usage_and_detail";
import { UsageDetailRequest } from "../../../../services/tools/auto_usage_dropdown/auto_usageDetail";

interface IAutoUsageDetail {
  usageDetail: string;
}

interface IAddAutoUsageDetailDialogProps {
  usage_id?: string;
}

const AddAutoUsageDetailType: React.FC<IAddAutoUsageDetailDialogProps> = (
  props
) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [usageId, setUsageId] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.usage_id) {
      setUsageId(props.usage_id);
    }
  }, [props.usage_id]);

  const initialStates: IAutoUsageDetail = {
    usageDetail: "",
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUsageDetailSubmit = (autoUsageDetail: IAutoUsageDetail) => {
    setLoading(true);
    const autoUsageDetailType: UsageDetailRequest = {
      usage_detail: autoUsageDetail.usageDetail,
      usage_id: usageId,
    };
    console.log(autoUsageDetailType);
    dispatch(addUsageAndDetailType(autoUsageDetailType))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const checkUsageDetailInput: RegExp = /^[A-Za-z0-9_ ]+$/;
  const validationSchema = Yup.object().shape({
    usageDetail: Yup.string()
      .required("Field Required!")
      .matches(checkUsageDetailInput, "Accept only letters and numbers"),
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
          onSubmit={handleUsageDetailSubmit}
        >
          <Form>
            <DialogTitle>Create New Usage Detail Type</DialogTitle>
            <DialogContent>
              <FieldWrapper
                name="usageDetail"
                type="text"
                label="Auto Usage Detail"
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

export default AddAutoUsageDetailType;
