import React from "react";
import { IClientContactProps } from "../../../../interfaces/task/IClientContactInfo";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  Alert,
  Button,
  IconButton,
  Link,
  Snackbar,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { CRM_Name_Search_URL } from "../../../../app/endpoint";
// import TaskHelloSignButton from "../TaskAction/TaskHelloSignButton";
// import {
//   findHelloSignId,
//   checkIsComplete,
//   findOneHelloSign,
// } from "../../../../services/task/hellosign/hellosign";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { retrieveClientInfoByPhoneNumber } from "../../../../action_creators/evaluation/client_predict_value";
import { retrieveClientTagsByClientPredictValueId } from "../../../../action_creators/evaluation/client_tag";
import { ContainedErrorButton } from "../../../../style_components/buttons/styled_contained_buttons";
import { sendReminder } from "../../../../services/questionaire/auto_questionaire/erpFileUpload";
import { receiveMessageOnPort } from "worker_threads";

const ClientContact: React.FC<IClientContactProps> = (props) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [isHelloSignComplete, setIsHelloSignComplete] = React.useState(false);
  const [sendingHelloSignSuccess, setSendingHelloSignSuccess] =
    React.useState("");
  const [predictVal, setPredictVal] = React.useState("");
  const [predictNum, setPredictNum] = React.useState(0);
  const [tags, setTags] = React.useState("");
  const [hideHelloSignBtn, setHideHelloSignBtn] = React.useState(true);

  const predicts = useAppSelector(
    (state) => state.client_predict_value.clients
  );

  const handleClickOpen = async () => {
    if (client_phone !== undefined) {
      let formated_phone =
        client_phone.substring(0, 3) +
        "-" +
        client_phone.substring(3, 6) +
        "-" +
        client_phone.substring(6, 11);
      dispatch(retrieveClientInfoByPhoneNumber(formated_phone as string));
    }
    // const hellosign_id = JSON.stringify(
    //   (await findHelloSignId(props.Task_Id!)).data.findHelloSignId.Message
    // ).replace(/"/g, "");
    // if (
    //   hellosign_id !== "Task Doesn't Have HelloSign" &&
    //   hellosign_id !== "null"
    // ) {
    //   setIsHelloSignComplete(true);
    //   const signatureRequestId = JSON.stringify(
    //     (await findOneHelloSign(hellosign_id)).data.findOneHelloSign
    //       .Signature_Request_Id
    //   ).replace(/"/g, "");
    //   const IsComplete = Boolean(
    //     JSON.stringify(
    //       (await checkIsComplete(signatureRequestId)).data
    //         .checkHelloSignIsComplete.Message
    //     ).replace(/"/g, "")
    //   );
    //   if (IsComplete) {
    //     setSendingHelloSignSuccess("Client has already signed HelloSign");
    //   } else {
    //     setSendingHelloSignSuccess(
    //       "HelloSign has sent to client, waiting for client to sign"
    //     );
    //   }
    // }
    setOpen(true);
    if (
      Job_Type_Name === "Auto" ||
      (Job_Type_Name === "Property" &&
        Job_Sub_Type_Name === "Change Property") ||
      (Job_Type_Name === "General" && Job_Sub_Type_Name === "Cancellation")
    ) {
      setHideHelloSignBtn(false);
    }
  };

  const handleClose = () => {
    setSnackBarOpen(false);
    setOpen(false);
  };
  function iconStyle() {
    switch (iconColor) {
      case "success":
        return "success";
      case "error":
        return "error";
      default:
        return "inherit";
    }
  }

  function tooltip() {
    switch (iconColor) {
      case "success":
        return "All documents are signed.";
      case "error":
        return "Waiting for client to sign";
      default:
        return "No action required.";
    }
  }

  function resendBtn() {
    switch (iconColor) {
      case "success":
        return true;
      case "error":
        return false;
      default:
        return true;
    }
  }

  const {
    client_name,
    client_email,
    client_phone,
    iconColor,
    Task_Description,
    Assign_To,
    Priority_Id,
    Job_Type_Name,
    Job_Sub_Type_Name,
    Policy_Number,
    Task_Id,
  } = props;

  React.useEffect(() => {
    getPredictValue();
  }, [predicts]);

  const getPredictValue = () => {
    if (predicts.length > 0) {
      const num = predicts[0].predict_value;
      getClientTags();
      if (num < 0) {
        setPredictNum(num);
        setPredictVal("Negative");
      } else if (num === 0) {
        setPredictNum(num);
        setPredictVal("Leads");
      } else if (num < 50 && num > 0) {
        setPredictNum(num);
        setPredictVal("Low");
      } else if (num < 150 && num > 50) {
        setPredictNum(num);
        setPredictVal("Medium");
      } else {
        setPredictNum(num);
        setPredictVal("High");
      }
    } else {
      setPredictVal("N/A");
    }
  };

  const getClientTags = () => {
    const tags = predicts[0].client_tag;
    var tag = "";
    tags?.forEach((element) => {
      tag += element.tag_description;
      tag += " ";
    });
    setTags(tag);
  };

  const [snackbarOpen, setSnackBarOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  const resendOnclick = () => {
      sendReminder(Task_Id as string);
      setSnackMsg("Reminder sent.");
      setIsSuccess(true);
      handleClose();
      setSnackBarOpen(true);
    
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={isSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>

      <Tooltip title={tooltip()}>
        <IconButton
          aria-label="contact"
          color={iconStyle()}
          onClick={handleClickOpen}
        >
          <AccountBoxIcon className="account-box-icon" />
        </IconButton>
      </Tooltip>

      <Link
        href="#"
        underline="hover"
        onClick={() => {
          window.open(CRM_Name_Search_URL + client_name);
        }}
      >
        {client_name}
      </Link>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle className="client-contact-info-dialog">
          Client Contact Info
          <IconButton
            className="dialog-close-icon-button"
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="fullWidth"></Divider>
        <DialogContent>
          <Typography variant="body1" component="div">
            Client Name: {client_name}
          </Typography>
          <Typography variant="body1" component="div">
            Client Phone: {client_phone}
          </Typography>
          <Typography variant="body1" component="div">
            Client Email: {client_email}
          </Typography>
          <Typography variant="body1" component="div">
            Predict Value: {predictNum}
          </Typography>
          <Typography variant="body1" component="div">
            Predict Rating: {predictVal}
          </Typography>
          <Typography variant="body1" component="div">
            Tags: {tags}
          </Typography>
          <Typography variant="body1" component="div">
            job type Name: {Job_Type_Name}
          </Typography>
          <ContainedErrorButton
            sx={{ margin: "3rem 0 -1rem 0" }}
            disabled={resendBtn()}
            onClick={resendOnclick}
          >
            Resend
          </ContainedErrorButton>
          <Typography variant="body1" component="div">
            <p>{sendingHelloSignSuccess}</p>
            {/* <div className="hellosign-btn">
              <TaskHelloSignButton
                CRM_Client_Name={client_name!}
                CRM_Client_Phone={client_phone!}
                CRM_Client_Email={client_email!}
                Policy_Number={Policy_Number!}
                Job_Sub_Type_Id={Job_Sub_Type_Name!}
                Job_Type_Id={Job_Type_Name!}
                Priority_Id={Priority_Id!}
                Assign_To={Assign_To!}
                Task_Description={Task_Description!}
                Task_Id={Task_Id!}
                HideHelloSignBtn={hideHelloSignBtn}
                DisableHelloSignBtn={isHelloSignComplete}
              />
            </div> */}
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientContact;
