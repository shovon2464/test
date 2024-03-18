import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { uploadUnsignedPdf } from "../../../services/questionaire/auto_questionaire/erpFileUpload";
import { toBase64 } from "../../../components/share_components/PdfCreator/ToBase64";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import "../../../style_components/processingpages/files_console/filesConsole_style.css";

const validationSchema = yup.object({
  uploadTo: yup
    .string()
    .required("Field Required!")
    .test("uploadTo", "Enter Valid Phone/Email", (value) => {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const phoneRegex = /^[0-9]{10}$/;
      if (!value) return false;
      let isValidEmail = emailRegex.test(value);
      let isValidPhone = phoneRegex.test(value);
      if (!isValidEmail && !isValidPhone) {
        return false;
      }
      return true;
    }),
  uploadFile: yup.mixed().required("Field Required!"),
  actionType: yup.string().required("Field Required!"),
});

const coverBase64 = async (value: any) => {
  const fileBase64 = await toBase64(value);
  if (typeof fileBase64 === "string") {
    const bytes = fileBase64.split(",")[1];
    const fileBytesWithBrace = "{" + bytes + "}";
    return fileBytesWithBrace;
  }
  return "";
};

const FilesUploadForm: React.FC = () => {
  const [uploadStatus, setUploadStatus] = React.useState(false);
  const [isUploaded, setIsUploaded] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [alertColor, setAlertColor] = React.useState<AlertColor>("success");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event?.preventDefault();
    setIsUploaded(false);
  };

  return (
    <div className="files_container">
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={isUploaded}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alertColor}
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
      <Typography variant="h6" component="div" color="primary">
        Files To Clients
      </Typography>
      <Formik
        initialValues={{
          uploadTo: "",
          uploadFile: { name: "", type: "" },
          actionType: "",
        }}
        onSubmit={async (values) => {
          setUploadStatus(true);
          try {
            if (
              values.uploadFile.name === "" &&
              values.uploadFile.type === ""
            ) {
              setUploadStatus(false);
              throw Error("File Cannot be empty");
            }

            const fileName = values.uploadFile["name"];
            const fileType = values.uploadFile["type"];
            const fileBase64 = await coverBase64(values.uploadFile);

            if (
              values.actionType === "sign" &&
              fileType.substring(0, 5) === "image"
            ) {
              setUploadStatus(false);
              throw Error("Sorry, this File can't be a signable file");
            }

            await uploadUnsignedPdf(
              values.uploadTo,
              values.actionType,
              fileName,
              fileType,
              fileBase64,
              ""
            )
              .then((res) => {
                setUploadStatus(false);
                setSnackMsg(`Successfully sent to ${values.uploadTo}`);
                setAlertColor("success");
                setIsUploaded(true);
                console.log(res);
              })
              .catch((error) => {
                setUploadStatus(false);
                throw Error(error);
              });
          } catch (err) {
            setSnackMsg(String(err));
            setAlertColor("error");
            setIsUploaded(true);
            console.log(err);
          }
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          touched,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              id="uploadTo"
              name="uploadTo"
              label="Enter Phone#/Email"
              variant="outlined"
              color="primary"
              value={values.uploadTo}
              onChange={handleChange}
              error={touched.uploadTo && Boolean(errors.uploadTo)}
              helperText={touched.uploadTo && errors.uploadTo}
              fullWidth
              required
            />
            <br />
            <br />
            <FormControl fullWidth>
              <input
                id="uploadFile"
                name="uploadFile"
                type="file"
                color="primary"
                accept="image/png, image/jpeg, image/jpg, application/pdf"
                required
                onChange={(event) => {
                  setFieldValue(
                    "uploadFile",
                    event.currentTarget.files instanceof FileList
                      ? event.currentTarget.files[0]
                      : { name: "", type: "" }
                  );
                }}
                className="form-control"
              />
            </FormControl>
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="action-type-select-label">
                Choose Action Type*
              </InputLabel>
              <Select
                labelId="action-type-select-label"
                id="actionType"
                name="actionType"
                label="Choose Action Type *"
                value={values.actionType}
                onChange={handleChange}
                error={touched.actionType && Boolean(errors.actionType)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                variant="outlined"
                fullWidth
                required
              >
                <MenuItem key={0} value={"sign"}>
                  Sign File
                </MenuItem>
                <MenuItem key={1} value={"download"}>
                  Download File
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              disabled={uploadStatus}
              type="submit"
              style={{ position: "relative", float: "right", marginTop: 5 }}
            >
              {uploadStatus && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Upload</span>
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FilesUploadForm;
