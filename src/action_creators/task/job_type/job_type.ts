import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";
import {
  JobTypeResponse,
  getAllJobType,
} from "../../../services/questionaire/auto_questionaire/jobType";

export const retrieveJobTypesList = createAsyncThunk<
  JobTypeResponse[],
  unknown
>("jobTypeList/getJobTypesList", async (_, thunkAPI) => {
  try {
    const response = await getAllJobType();
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("Job Type List Retrieved!"));
      const job_type_list: JobTypeResponse[] = response.data.findAllJobType;
      return job_type_list;
    } else {
      const errorMsg: string = response.errors[0].message.toString();
      thunkAPI.dispatch(setTaskMessage(errorMsg));
      return thunkAPI.rejectWithValue(errorMsg);
    }
  } catch (e: any) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.response.errors ||
      e.toString();
    thunkAPI.dispatch(setTaskMessage(message));
    console.log("Error", e.response.errors);
    return thunkAPI.rejectWithValue(message);
  }
});
