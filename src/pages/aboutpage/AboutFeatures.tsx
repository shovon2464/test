import { Button, Paper, Dialog } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import { AboutTaskConsole } from "../../style_components/aboutpage/abouttaskconsole";
import "../../style_components/aboutpage/aboutpage_style.css";
import TaskIcon from "@mui/icons-material/Task";
import DescriptionIcon from "@mui/icons-material/Description";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import HandymanIcon from "@mui/icons-material/Handyman";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import YouTube from "react-youtube";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import ReactPlayer from "react-player";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const AboutWelcome: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const taskConsolePopup = <YouTube videoId="2g811Eo7K8U"></YouTube>;

  return (
    <Grid container rowSpacing={20}>
      <Grid item lg={6} md={12}>
        <div className="AboutText">
          <div className="AboutTextheader">
            <TaskIcon fontSize="large" /> Task Console
          </div>
          <div className="AboutTextOffHeader">
            Manage your daily tasks with ease
          </div>
          <div className="AboutTextContent">
            The task console is where you can create new tasks, assign tasks to
            team members, set due dates, and track progress. You can also view
            tasks by priority, due date, or status, giving you a clear overview
            of what needs to be done and when.
            <div className="AboutTextContentMedia">
              <Button variant="outlined" onClick={handleClickOpen}>
                <PlayCircleRoundedIcon /> Watch tutorial
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  Task Console Tutorial Video
                </DialogTitle>
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}>
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}>
                    Task Console Tutorial Video
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=-0-mDa54DK0`}
                      width="800px"
                      height="450px"
                      controls
                    />
                  </DialogContent>
                </BootstrapDialog>
              </Dialog>
            </div>
          </div>
        </div>
      </Grid>

      <Grid item lg={6} md={12}>
        <AboutTaskConsole />
      </Grid>

      <Grid item lg={6} md={12} order={{ lg: 3, md: 4, sm: 4, xs: 4 }}>
        <AboutTaskConsole />
      </Grid>

      <Grid item lg={6} md={12} order={{ lg: 4, md: 3, sm: 3, xs: 3 }}>
        <div className="AboutText">
          <div className="AboutTextheader">
            <DescriptionIcon fontSize="large" /> File Console
          </div>
          <div className="AboutTextOffHeader">
            Collaborative work on important documents
          </div>
          <div className="AboutTextContent">
            The task console is where you can upload and manage client files.
            The AI-dirven deep-learning machine system can read digital client
            files and immediately separate them. This cutting-edge technology
            saves brokers valuable time and resources by automating tedious and
            time-consuming tasks.
            <div className="AboutTextContentMedia"></div>
          </div>
        </div>
      </Grid>

      <Grid item lg={6} md={12} order={{ lg: 5, md: 5, sm: 5, xs: 5 }}>
        <div className="AboutText">
          <div className="AboutTextheader">
            <RequestPageIcon fontSize="large" /> Quote Console
          </div>
          <div className="AboutTextOffHeader">
            Online quotes for easy and efficient quoting
          </div>
          <div className="AboutTextContent">
            The task console is where you can generate and manage online quotes
            for you clients. This feature is designed to save you time and
            increase convenience, allowing you to focus on what you do best.
            <div className="AboutTextContentMedia"></div>
          </div>
        </div>
      </Grid>

      <Grid
        className="aboutimage"
        item
        lg={6}
        md={12}
        order={{ lg: 6, md: 6, sm: 6, xs: 6 }}>
        <AboutTaskConsole />
      </Grid>

      <Grid
        className="aboutimage"
        item
        lg={6}
        md={12}
        order={{ lg: 7, md: 8, sm: 8, xs: 8 }}>
        <AboutTaskConsole />
      </Grid>

      <Grid item lg={6} md={12} order={{ lg: 8, md: 7, sm: 7, xs: 7 }}>
        <div className="AboutText">
          <div className="AboutTextheader">
            <HandymanIcon fontSize="large" /> Tools
          </div>
          <div className="AboutTextOffHeader">
            Increases convenience and ease of use
          </div>
          <div className="AboutTextContent">
            BrokerAID also includes several tools to help management team better
            manage their team works. These tools are designed to increase
            efficiency and productivity, making it easier for the management
            team to get the work done.
            <div className="AboutTextContentMedia"></div>
          </div>
        </div>
      </Grid>

      <Grid item lg={6} md={12} order={{ lg: 9, md: 9, sm: 9, xs: 9 }}>
        <div className="AboutText">
          <div className="AboutTextheader">
            <SignalCellularAltIcon fontSize="large" /> Performance Report
          </div>
          <div className="AboutTextOffHeader">
            Enhances quality control and accuracy
          </div>
          <div className="AboutTextContent">
            The Performance Report provides an overview of your performance over
            time. You can view metrice such as the number of tasks completed,
            quotes generated, and revenue earned.
            <div className="AboutTextContentMedia"></div>
          </div>
        </div>
      </Grid>

      <Grid
        className="aboutimage"
        item
        lg={6}
        md={12}
        order={{ lg: 10, md: 10, sm: 10, xs: 10 }}>
        <AboutTaskConsole />
      </Grid>

      <Grid
        className="aboutimage"
        item
        lg={6}
        md={12}
        order={{ lg: 11, md: 11, sm: 11, xs: 11 }}>
        <AboutTaskConsole />
      </Grid>

      <Grid item lg={6} md={12} order={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
        <div className="AboutText">
          <div className="AboutTextheader">
            <DriveFileRenameOutlineIcon fontSize="large" /> E-Sign
          </div>
          <div className="AboutTextOffHeader">
            Capabilities for efficient signing and documentation
          </div>
          <div className="AboutTextContent">
            The E-sign Page allows you to sign documents electronically. You can
            upload documents, add signature fields, and send documents to others
            for signature . The E-sign capabilities enable you to sign documents
            electronically, saving time and reducing the need for physical
            signatures.
            <div className="AboutTextContentMedia"></div>
          </div>
        </div>
      </Grid>

      <Grid item lg={6} md={12} order={{ lg: 13, md: 14, sm: 14, xs: 14 }}>
        <div className="AboutText">
          <div className="AboutTextheader">
            <QuestionAnswerIcon fontSize="large" /> Online Chat
          </div>
          <div className="AboutTextOffHeader">
            Improve collaboration with colleagues
          </div>
          <div className="AboutTextContent">
            The online chat function allows you to communicate with colleagues
            in real-time, improving collaboration and reducing miscommunication.
            You cna share files, ask questions, and get answers quickly and
            efficiently, without having to switch between different
            communication channels.
            <div className="AboutTextContentMedia"></div>
          </div>
        </div>
      </Grid>

      <Grid
        className="aboutimage"
        item
        lg={6}
        md={12}
        order={{ lg: 14, md: 13, sm: 13, xs: 13 }}>
        <AboutTaskConsole />
      </Grid>
    </Grid>
  );
};

export default AboutWelcome;
