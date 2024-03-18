import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../../app/hooks";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

type props = {
  open: boolean;
  close: () => void;
};

const TaskHistoryDialog: React.FC<props> = (props) => {
  const taskHistories = useAppSelector((state) => state.taskHistory.histories);
  const { open, close } = props;

  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        fullWidth
        className="task-history-dialog"
      >
        <DialogTitle className="task-history-dialog">
          Task History
          <IconButton onClick={close} className="dialog-close-icon-button">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="fullWidth"></Divider>
        <DialogContent>
          {taskHistories.map((task, index) => {
            return (
              <ListItem>
                <ListItemText key="task.Title">
                  <Typography>
                    Title: &nbsp; &nbsp;
                    <Link href={task.Link as string}>{task.Title}</Link>
                    <Link href={task.Pdf_Link as string}>
                      <Button hidden={task.Pdf_Link ? false : true}>
                        <DownloadIcon />
                      </Button>
                    </Link>
                  </Typography>

                  <Typography>Date: {task.Date}</Typography>
                  <br />
                </ListItemText>
              </ListItem>
            );
          })}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskHistoryDialog;
