import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";
import {
  createTaskSource,
  deleteTaskSource,
  getAllTaskSource,
} from "../../../services/tools/task_source_dropdown/task_source";

export interface ITaskSource {
  Task_Source_Id?: string;
  Task_Source_Name: string;
}

export interface IDeleteTaskSource extends IDeleteStatus {
  Task_Source_Id: string;
}

export const getAllTaskSources = createAsyncThunk<ITaskSource[], unknown>(
  "task_source/getTaskSources",
  async (_, thunkAPI) => {
    try {
      const response = await getAllTaskSource();
      if (response.data) {
        const allTaskSources: ITaskSource[] = response.data.findAllTaskSources;
        thunkAPI.dispatch(setDropdownTypeMessage("Retrieved All Task Sources"));
        return allTaskSources;
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

export const addTaskSource = createAsyncThunk<ITaskSource, string>(
  "task_source/addTaskSource",
  async (task_source_name, thunkAPI) => {
    try {
      const response = await createTaskSource(task_source_name);

      if (response.data) {
        const taskSource: ITaskSource = response.data.createNewTaskSource;
        thunkAPI.dispatch(setDropdownTypeMessage("Added New Task Source"));
        return taskSource;
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

export const removeTaskSource = createAsyncThunk<IDeleteTaskSource, string>(
  "task_source/deleteTaskSource",
  async (task_source_id: string, thunkAPI) => {
    try {
      const response = await deleteTaskSource(task_source_id);
      if (response.data.deleteTaskSource.Status) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted Task Source"));
        const deleteTaskSource: IDeleteTaskSource = {
          Task_Source_Id: task_source_id,
          Status: response.data.deleteTaskSource.Status,
          Message: response.data.deleteTaskSource.Message,
        };
        return deleteTaskSource;
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
