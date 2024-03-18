import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { key } from "../../../../services/auth/getKey";
import { useNavigate, Navigate, Link } from "react-router-dom";
import {
  getTaskJobTypesAndSubTypes,
  removeTaskJobType,
} from "../../../../action_creators/tools/task_job_type_dropdown/task_job_type";
import { removeTaskJobSubType } from "../../../../action_creators/tools/task_job_type_dropdown/task_job_sub_type";
import EventBus from "../../../../app/EventBus";
import {
  CardHeader,
  Card,
  Typography,
  IconButton,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskJobType from "./AddTaskJobType";
import AddTaskJobSubType from "./AddTaskJobSubType";
import { IDeleteTaskJobSubTypeRequest } from "../../../../action_creators/tools/task_job_type_dropdown/task_job_sub_type";

const TaskJobType: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskJobTypeList = useAppSelector(
    (state) => state.taskJobTypeAndSubType.taskJobTypes
  );
  const jobTypeStatus = useAppSelector(
    (state) => state.taskJobTypeAndSubType.taskJobTypeAndSubTypeStatus
  );
  const user = key();
  let history = useNavigate();
  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      dispatch(getTaskJobTypesAndSubTypes({}));
      if (jobTypeStatus === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, []);

  return (
    <div>
      <Typography variant="h5">Task Job Type Management</Typography>
      <AddTaskJobType />
      {taskJobTypeList.length > 0 &&
        taskJobTypeList.map((eachTaskJobType) => {
          return (
            <Card
              variant="elevation"
              key={eachTaskJobType.Job_Type_Id}
              style={{
                width: "18rem",
                margin: "30px",
                display: "inline-table",
              }}
            >
              <CardHeader
                key={eachTaskJobType.Job_Type_Id}
                title={eachTaskJobType.Job_Type_Name}
                action={
                  <div>
                    <AddTaskJobSubType
                      job_type_Id={eachTaskJobType.Job_Type_Id}
                    />
                    <div style={{ display: "table-cell" }}>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => {
                          const id = eachTaskJobType.Job_Type_Id;
                          if (id) {
                            dispatch(removeTaskJobType(id));
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                }
              ></CardHeader>
              {eachTaskJobType.job_sub_types && (
                <CardContent>
                  <List>
                    {eachTaskJobType.job_sub_types.length > 0 &&
                      eachTaskJobType.job_sub_types.map((value) => {
                        return (
                          <ListItem>
                            <ListItemText
                              key={value.Job_Sub_Type_Id}
                              primary={value.Job_Sub_Type_Name}
                              secondary={value.Score}
                            />
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={() => {
                                let deleteRequest: IDeleteTaskJobSubTypeRequest =
                                  {
                                    Job_Type_Id: value.Job_Type_Id ?? "",
                                    Job_Sub_Type_Id:
                                      value.Job_Sub_Type_Id ?? "",
                                  };

                                if (deleteRequest) {
                                  dispatch(removeTaskJobSubType(deleteRequest));
                                }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItem>
                        );
                      })}
                  </List>
                </CardContent>
              )}
            </Card>
          );
        })}
    </div>
  );
};

export default TaskJobType;
