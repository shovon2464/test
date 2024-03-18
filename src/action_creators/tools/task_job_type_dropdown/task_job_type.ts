import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";
import {
  createJobType,
  deleteEachJobType,
  getAllJobTypeAndJobSubType,
} from "../../../services/tools/task_job_type_dropdown/task_jobType";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";

export interface ITaskJobSubType {
  Job_Sub_Type_Id?: string;
  Job_Sub_Type_Name: string;
  Score: number;
  Job_Type_Id: string;
}

export interface ITaskJobTypeAndSubTypeResponse {
  Job_Type_Id?: string;
  Job_Type_Name?: string;
  job_sub_types?: ITaskJobSubType[];
}

export interface IDeleteTaskJobType extends IDeleteStatus {
  Job_Type_Id: string;
}

export const getTaskJobTypesAndSubTypes = createAsyncThunk<
  ITaskJobTypeAndSubTypeResponse[],
  unknown
>("task_jobType/getTaskJobTypesAndSubTypes", async (_, thunkAPI) => {
  try {
    const response = await getAllJobTypeAndJobSubType();
    if (response.data) {
      const allJobTypeAndSubType: ITaskJobTypeAndSubTypeResponse[] =
        response.data.findAllJobTypeAndJobSubType;
      thunkAPI.dispatch(
        setDropdownTypeMessage("Retrieved All Task Job Type And Sub Type")
      );
      return allJobTypeAndSubType;
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
});

export const addTaskJobType = createAsyncThunk<
  ITaskJobTypeAndSubTypeResponse,
  string
>("task_jobType/addTaskJobType", async (task_job_type_name, thunkAPI) => {
  try {
    const response = await createJobType(task_job_type_name);

    if (response.data) {
      const taskJobTypeResponse: ITaskJobTypeAndSubTypeResponse =
        response.data.createJobType;
      thunkAPI.dispatch(setDropdownTypeMessage("Added New Task Job Type"));
      return taskJobTypeResponse;
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

export const removeTaskJobType = createAsyncThunk<IDeleteTaskJobType, string>(
  "task_jobType/deleteJobType",
  async (job_type_id: string, thunkAPI) => {
    try {
      const response = await deleteEachJobType(job_type_id);
      if (response.data.deleteJobType.Status) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted Task Job Type"));
        const deleteJobType: IDeleteTaskJobType = {
          Job_Type_Id: job_type_id,
          Status: response.data.deleteJobType.Status,
          Message: response.data.deleteJobType.Message,
        };
        return deleteJobType;
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
