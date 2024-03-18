import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTaskPriority,
  deleteTaskPriority,
  getAllTaskPriority,
} from "../../../services/tools/task_priority_dropdown/task_priority";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";

export interface ITaskPriority {
  Priority_Id?: string;
  Priority_Description: string;
}

export interface IDeleteTaskPriority extends IDeleteStatus {
  Priority_Id: string;
}

export const getAllTaskPriorities = createAsyncThunk<ITaskPriority[], unknown>(
  "task_priority/getTaskPriorities",
  async (_, thunkAPI) => {
    try {
      const response = await getAllTaskPriority();
      if (response.data) {
        const allTaskPriorities: ITaskPriority[] =
          response.data.findAllPriority;
        thunkAPI.dispatch(
          setDropdownTypeMessage("Retrieved All Task Priorities")
        );
        return allTaskPriorities;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setDropdownTypeMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addTaskPriority = createAsyncThunk<ITaskPriority, string>(
  "task_priority/addTaskPriority",
  async (task_priority_des, thunkAPI) => {
    try {
      const response = await createTaskPriority(task_priority_des);

      if (response.data) {
        const taskPriorityResponse: ITaskPriority =
          response.data.createPriority;
        thunkAPI.dispatch(setDropdownTypeMessage("Added New Task Priority"));
        return taskPriorityResponse;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
        //throw new Error(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setDropdownTypeMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeTaskPriority = createAsyncThunk<IDeleteTaskPriority, string>(
  "task_priority/deleteTaskPriority",
  async (task_priority_id: string, thunkAPI) => {
    try {
      const response = await deleteTaskPriority(task_priority_id);
      if (response.data.deletePriority.Status) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted Task Priority"));
        const deleteTaskPriority: IDeleteTaskPriority = {
          Priority_Id: task_priority_id,
          Status: response.data.deletePriority.Status,
          Message: response.data.deletePriority.Message,
        };
        return deleteTaskPriority;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setDropdownTypeMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
