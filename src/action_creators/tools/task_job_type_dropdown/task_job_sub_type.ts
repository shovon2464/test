import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";
import {
  createJobSubType,
  deleteEachJobSubType,
} from "../../../services/tools/task_job_type_dropdown/task_jobSubType";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { ITaskJobSubType } from "./task_job_type";

export interface IDeleteTaskJobSubType extends IDeleteStatus {
  Job_Type_Id: string;
  Job_Sub_Type_Id: string;
}

export interface IDeleteTaskJobSubTypeRequest {
  Job_Type_Id: string;
  Job_Sub_Type_Id: string;
}

export const addTaskJobSubType = createAsyncThunk<
  ITaskJobSubType,
  ITaskJobSubType
>("task_jobSubType/addTaskJobSubType", async (task_job_sub_type, thunkAPI) => {
  try {
    const response = await createJobSubType(task_job_sub_type);

    if (response.data) {
      const taskJobSubTypeResponse: ITaskJobSubType =
        response.data.createJobSubType.Job_Sub_Type;
      thunkAPI.dispatch(setDropdownTypeMessage("Added New Task Job Sub Type"));
      return taskJobSubTypeResponse;
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
});

export const removeTaskJobSubType = createAsyncThunk<
  IDeleteTaskJobSubType,
  IDeleteTaskJobSubTypeRequest
>(
  "task_jobSubType/deleteJobSubType",
  async (job_sub_type_request, thunkAPI) => {
    try {
      const response = await deleteEachJobSubType(
        job_sub_type_request.Job_Sub_Type_Id
      );
      if (response.data.deleteJobSubType.Status) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted Task Job Sub Type"));
        const deleteJobSubType: IDeleteTaskJobSubType = {
          Job_Type_Id: job_sub_type_request.Job_Type_Id,
          Job_Sub_Type_Id: job_sub_type_request.Job_Sub_Type_Id,
          Status: response.data.deleteJobSubType.Status,
          Message: response.data.deleteJobSubType.Message,
        };
        return deleteJobSubType;
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
