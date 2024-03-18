import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTaskDays,
  getAutoDeleteInfo,
  updateTaskDaysInfo,
} from "../../../services/tools/auto_delete/auto_delete";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { setAuthMessage } from "../../../features/auth/authMsgSlice";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";
import { IAutoDeleteState } from "../../../features/tools/auto_delete_dropdown/autoDeleteSlice";

export interface IAutoDelete {
  alert_delete_id: string;
  alert_days: number;
  delete_days: number;
  target_email: string;
  active: boolean;
}

export const getTaskDaysInfo = createAsyncThunk<IAutoDelete[], unknown>(
  "auto_delete/getTaskDaysInfo",
  async (_, thunkAPI) => {
    try {
      const response = await getAutoDeleteInfo();
      if (response.data) {
        const allTaskInfo: IAutoDelete[] = response.data.findAutoDeleteInfo;
        thunkAPI.dispatch(setDropdownTypeMessage("Info retrieved."));
        return allTaskInfo;
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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTaskDays = createAsyncThunk<IAutoDelete[], IAutoDelete[]>(
  "auto_delete/updateTaskDays",
  async (info: IAutoDelete[], thunkAPI) => {
    try {
      const response = await updateTaskDaysInfo(info[0]);
      if (response.data) {
        thunkAPI.dispatch(setTaskMessage("Update successfully."));
        const taskDaysUpdated: IAutoDelete[] = response.data.update_days;
        return taskDaysUpdated;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setTaskMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setTaskMessage(message));
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
