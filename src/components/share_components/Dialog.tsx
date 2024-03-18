import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FieldWrapper } from "../../components/form_components/FieldWrapper";
import { Formik, Form } from "formik";
import { IconButton, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";

type addOrUpdate = "Add" | "Update";
interface MuiDialogProps {
  buttonTypeStyles: addOrUpdate;
  dialogTitle: string;
  dialogContent?: string;
  fields?: Fields[];
  buttonText: string;
  handleSubmit: () => void;
}
interface Fields {
  name: string;
  type?: string;
  label: string;
  required?: boolean;
  value?: string;
  onChange?: unknown;
  error?: unknown;
}

const DialogWrapper: React.FC<MuiDialogProps> = (props) => {
  const {
    buttonTypeStyles = "Add",
    dialogContent = "",
    dialogTitle = "",
    fields,
    buttonText,
    handleSubmit,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [convert, setConvert] = React.useState({});

  if (fields) {
    const arrayToObjectConvert = fields.reduce(
      (prev, current) => ({ ...prev, [current.name]: "" }),
      {}
    );
    setConvert(arrayToObjectConvert);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {buttonTypeStyles === "Add" ? (
        <IconButton
          aria-label="create"
          color="primary"
          onClick={handleClickOpen}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="create"
          color="primary"
          onClick={handleClickOpen}
        >
          <EditIcon />
        </IconButton>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
          {convert && (
            <Formik initialValues={convert} onSubmit={handleSubmit}>
              <Form>
                {fields &&
                  fields.map((eachField) => {
                    const { name, type, label, required } = eachField;
                    return (
                      <FieldWrapper
                        name={name}
                        label={label}
                        type={type}
                        required={required}
                      ></FieldWrapper>
                    );
                  })}
              </Form>
            </Formik>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>{buttonText}</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogWrapper;
