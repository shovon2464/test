import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";
import {
  JobSubTypeRequest,
  getRelatedJobSubType,
} from "../../../services/questionaire/auto_questionaire/jobSubType";

export interface IJobSubTypeListResponse {
  Job_Sub_Type_Id: string;
  Job_Sub_Type_Name: string;
  Score: number;
  Job_Type_Id: string;
}

export const retrieveJobSubTypesByJobTypeId = createAsyncThunk<
  IJobSubTypeListResponse[],
  JobSubTypeRequest
>("jobSubTypeList/getJobSubTypeList", async (req, thunkAPI) => {
  try {
    const response = await getRelatedJobSubType(req);
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("Job Sub Type Retrieved!"));
      const job_sub_types: IJobSubTypeListResponse[] =
        response.data.findJobSubTypeByJobTypeId.job_sub_types;
      return job_sub_types;
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
