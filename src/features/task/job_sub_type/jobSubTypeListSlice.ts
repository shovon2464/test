import { createSlice } from "@reduxjs/toolkit";
import {
  retrieveJobSubTypesByJobTypeId,
  IJobSubTypeListResponse,
} from "../../../action_creators/task/job_sub_type/job_sub_type";

type JobSubTypeState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IJobSubType {
  jobSubType: IJobSubTypeListResponse;
  jobSubTypes: IJobSubTypeListResponse[];
  JobSubTypeState: JobSubTypeState;
}

const initialState: IJobSubType = {
  jobSubType: {
    Job_Sub_Type_Id: "",
    Job_Sub_Type_Name: "",
    Job_Type_Id: "",
    Score: 0,
  },
  jobSubTypes: [],
  JobSubTypeState: null,
};

const jobSubTypeListSlice = createSlice({
  name: "jobSubTypeList",
  initialState: initialState,
  reducers: {
    clearJobSubTypes: (state) => {
      state.JobSubTypeState = null;
      state.jobSubType = {
        Job_Sub_Type_Id: "",
        Job_Sub_Type_Name: "",
        Job_Type_Id: "",
        Score: 0,
      };
      state.jobSubTypes = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      retrieveJobSubTypesByJobTypeId.fulfilled,
      (state, action) => {
        state.jobSubTypes = action.payload;
        state.JobSubTypeState = "SUCCESS";
      }
    );
    builder.addCase(retrieveJobSubTypesByJobTypeId.pending, (state, action) => {
      state.JobSubTypeState = "LOADING";
    });
    builder.addCase(
      retrieveJobSubTypesByJobTypeId.rejected,
      (state, action) => {
        state.JobSubTypeState = "ERROR";
      }
    );
  },
});
export const { clearJobSubTypes } = jobSubTypeListSlice.actions;
export default jobSubTypeListSlice.reducer;
