import React, { useEffect, useState } from "react";
import { IQuoteToTaskProps } from "../../../../interfaces/quote/IQuoteToTaskProps";
import { IQuoteToTaskRequest } from "../../../../action_creators/quote/changeQuoteToTask";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  Button,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { changeQuoteToTask } from "../../../../services/quote/quote";
import {
  IDeleteInfo,
  removeQuote,
} from "../../../../action_creators/quote/quote_list";
import { retrieveJobSubTypesByJobTypeId } from "../../../../action_creators/task/job_sub_type/job_sub_type";
import { JobSubTypeRequest } from "../../../../services/questionaire/auto_questionaire/jobSubType";
import { clearJobSubTypes } from "../../../../features/task/job_sub_type/jobSubTypeListSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import QuoteDeleteButton from "../QuotesAction/QuoteDeleteButton";

const validationSchema = yup.object({
  taskDes: yup.string().required("Field Required!"),
  jobType: yup.string().required("Field Required!"),
  jobSubType: yup.string().required("Field Required!"),
});

const QuoteToTask: React.FC<IQuoteToTaskProps> = (props) => {
  const { rowValue, userId } = props;
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const quoteDetail: string = rowValue.QuoteDetail;
  const quoteDetailObj: object = JSON.parse(quoteDetail);
  let quoteDetailStr: string = "";
  const getJobTypeList = useAppSelector((state) => state.jobTypeList.jobTypes);
  const getJobSubTypeList = useAppSelector(
    (state) => state.jobSubTypeList.jobSubTypes
  );
  const [open, setOpen] = React.useState(false);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  let fullName = rowValue.FullName;
  let submitDate = rowValue.SubmitDate;
  let type = rowValue.Type;
  for (const [key, value] of Object.entries(quoteDetailObj)) {
    const initialString: string = `${key}: ${value},`;
    quoteDetailStr = quoteDetailStr + initialString;
  }

  const formik = useFormik({
    initialValues: {
      taskDes: "",
      jobType: "",
      jobSubType: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const currentDateTime = new Date().toISOString();
      const formatPhoneNumber = rowValue.PhoneNumber.replace(/[^0-9+]/g, "");
      const taskRequest: IQuoteToTaskRequest = {
        Address1: rowValue.Address1,
        Address2: rowValue.Address2,
        PostalCode: rowValue.PostalCode,
        Assign_By: userId,
        Assign_Date: new Date(currentDateTime),
        Assign_To: userId,
        CRM_Client_Email: rowValue.Email,
        CRM_Client_Name: rowValue.FullName,
        CRM_Client_Phone: formatPhoneNumber,
        Create_By: userId,
        QC_By: userId,
        Task_Description: values.taskDes,
        Job_Type_Id: values.jobType,
        Job_Sub_Type_Id: values.jobSubType,
        Task_Quote_Details: quoteDetailStr,
      };
      changeQuoteToTask(taskRequest)
        .then((res) => {
          const info: IDeleteInfo = {
            Type: rowValue.Type,
            FullName: rowValue.FullName,
            SubmitDate: rowValue.SubmitDate,
          };
          dispatch(removeQuote(info));
          history("/TaskConsole");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearJobSubTypes());
    };
  }, []);

  useEffect(() => {
    const jobTypeId: JobSubTypeRequest = {
      Job_Type_Id: formik.values.jobType,
    };
    if (jobTypeId.Job_Type_Id) {
      dispatch(retrieveJobSubTypesByJobTypeId(jobTypeId));
    }
  }, [formik.values.jobType]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const openSnackBar = () => {
    setSnackBarOpen(true);
  };

  const handleClose = () => {
    dispatch(clearJobSubTypes());
    setOpen(false);
    setSnackBarOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Task created successfully, quote has been deleted.
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        aria-label="quote_details"
        color="success"
        onClick={handleClickOpen}
      >
        Create Task
      </Button>

      <QuoteDeleteButton
        Type={type}
        FullName={fullName}
        SubmitDate={submitDate}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="create-task-from-quote-dialog">
          Create Quote Task
          <IconButton
            className="dialog-close-icon-button"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              id="taskDes"
              name="taskDes"
              label="Task Description"
              variant="outlined"
              color="primary"
              multiline
              fullWidth
              required
              value={formik.values.taskDes}
              onChange={formik.handleChange}
              error={formik.touched.taskDes && Boolean(formik.errors.taskDes)}
              helperText={formik.touched.taskDes && formik.errors.taskDes}
            />
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="job-type-select-label">Job Types</InputLabel>
              <Select
                labelId="job-type-select-label"
                id="jobType"
                name="jobType"
                label="Job Types"
                value={formik.values.jobType}
                onChange={formik.handleChange}
                error={formik.touched.jobType && Boolean(formik.errors.jobType)}
                required
                fullWidth
              >
                {getJobTypeList.length > 0 &&
                  getJobTypeList.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value.Job_Type_Id}>
                        {value.Job_Type_Name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <br />
            <br />
            {getJobSubTypeList.length > 0 && (
              <FormControl fullWidth>
                <InputLabel id="job-sub-type-select-label">
                  Job Sub Types
                </InputLabel>
                <Select
                  labelId="job-sub-type-select-label"
                  id="jobSubType"
                  name="jobSubType"
                  label="job Sub Type"
                  value={formik.values.jobSubType}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.jobSubType &&
                    Boolean(formik.errors.jobSubType)
                  }
                  required
                  fullWidth
                >
                  {getJobSubTypeList.length > 0 &&
                    getJobSubTypeList.map((value, index) => {
                      return (
                        <MenuItem key={index} value={value.Job_Sub_Type_Id}>
                          {value.Job_Sub_Type_Name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            )}
          </DialogContent>
          <DialogActions className="confirm-button">
            <Button
              onClick={openSnackBar}
              variant="contained"
              color="primary"
              type="submit"
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default QuoteToTask;
