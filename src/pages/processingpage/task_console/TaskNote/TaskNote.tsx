import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Stack,
  IconButton
} from "@mui/material";
import { 
  OutlinedSuccessButton 
} from "../../../../style_components/buttons/styled_outlined_buttons";
import CloseIcon from '@mui/icons-material/Close';
import ITaskNoteProps from "../../../../interfaces/task/ITaskNoteProps";
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateEachTaskNewestNote } from "../../../../action_creators/task/task_list";
import { sendCRMTaskNote } from "../../../../services/questionaire/auto_questionaire/crmSendNotes";
import {
  createNewTaskNote,
  ITaskNotesRequest,
} from "../../../../action_creators/task/task_notes/task_notes";
import { getBrokerName } from "../../../../components/share_components/PdfCreator/PolicyChangePdfCreator";
import DescriptionIcon from "@mui/icons-material/Description";

export type TaskNoteOpenHandle = {
  alterOpen: () => void;
};

const TaskNote: React.ForwardRefRenderFunction<
  TaskNoteOpenHandle,
  ITaskNoteProps
> = (props, ref) => {
  const { rowValue, taskNote } = props;
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState(taskNote);
  let newTaskNote: ITaskNotesRequest;
  const dispatch = useAppDispatch();

  const taskNotesList = useAppSelector((state) => state.taskNotes.taskNotes);

  React.useImperativeHandle(ref, () => ({
    alterOpen() {
      setOpen(!open);
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    let taskInfo = rowValue;
    let taskId = taskInfo.Task_Id;
    let newNote = note.replace(/[\r\n]/g, "");
    taskInfo.Task_Newest_Note = newNote;
    let by_who = getBrokerName();
    newTaskNote = {
      By_Who: by_who,
      Description: newNote,
      Reason: newNote,
      Task_Id: taskId,
      To_Who: by_who,
    };

    if (taskInfo.Policy_Number) {
      sendCRMTaskNote({
        policyNumber: taskInfo.Policy_Number,
        Notes: newTaskNote.By_Who + ' - ' +  newNote,
      }).catch((e) => {
        console.log(e);
      });
    }
    dispatch(updateEachTaskNewestNote(taskInfo))
      .unwrap()
      .then(() => {
        dispatch(createNewTaskNote(newTaskNote))
          .unwrap()
          .then(() => {
            setOpen(false);
          })
          .catch(() => {
            window.alert("Connect problem");
          });
      })
      .catch(() => {
        window.alert("Connect problem");
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  return (
    <div>
      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle
            className="task-note-dialog"
          >
            Create A Task Note
            <IconButton
              className="dialog-close-icon-button"
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider variant="middle"></Divider>
          <DialogContent>
            <Typography variant="subtitle1" paragraph marginBottom={2}>
              <strong>Task Description: </strong>{" "}
              {rowValue ? rowValue.Task_Description : " "}
            </Typography>
            <Stack>
              <List>
                {taskNotesList.length > 0 &&
                  taskNotesList.map((eachTaskNote) => {
                    const byWho = "Author: " + eachTaskNote.By_Who;
                    return (
                      <ListItem key={eachTaskNote.Note_Id}>
                        <ListItemAvatar>
                          <DescriptionIcon color="primary" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={eachTaskNote.Description}
                          secondary={byWho}
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </Stack>

            <TextField
              label="Create A Note"
              variant="outlined"
              color="primary"
              multiline
              required
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions className="create-task-note-button-container">
            <OutlinedSuccessButton
              className="create-task-note-button"
              onClick={handleCreate}
            >
              Create
            </OutlinedSuccessButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default React.forwardRef(TaskNote);
