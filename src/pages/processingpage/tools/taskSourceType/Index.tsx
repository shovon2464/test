import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import EventBus from "../../../../app/EventBus";
import {
  getAllTaskSources,
  removeTaskSource,
} from "../../../../action_creators/tools/task_source_dropdown/task_source";
import {
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskSource from "./AddTaskSource";

const Index: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskSourceList = useAppSelector(
    (state) => state.taskSource.taskSources
  );
  const taskSourceStatus = useAppSelector(
    (state) => state.taskSource.taskSourceStatus
  );

  useEffect(() => {
    dispatch(getAllTaskSources({}));
    if (taskSourceStatus === "ERROR") {
      EventBus.dispatch("logout", undefined);
    }
  }, []);
  return (
    <div>
      <Typography variant="h5">Task Priority Management</Typography>
      <AddTaskSource />
      <Stack spacing={2}>
        <List>
          {taskSourceList.length > 0 &&
            taskSourceList.map((eachTaskSource) => {
              return (
                <ListItem
                  key={eachTaskSource.Task_Source_Id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="error"
                      onClick={() => {
                        const id = eachTaskSource.Task_Source_Id;
                        if (id) {
                          dispatch(removeTaskSource(id));
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <ReorderIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText primary={eachTaskSource.Task_Source_Name} />
                </ListItem>
              );
            })}
        </List>
      </Stack>
    </div>
  );
};

export default Index;
