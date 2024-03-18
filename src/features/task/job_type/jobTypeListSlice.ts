import { createSlice } from "@reduxjs/toolkit";
import { retrieveJobTypesList } from "../../../action_creators/task/job_type/job_type";
import { JobTypeResponse } from "../../../services/questionaire/auto_questionaire/jobType";

type JobTypeListState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IJobTypeList {
  jobTypes: JobTypeResponse[];
  jobType: JobTypeResponse;
  JobTypeListState: JobTypeListState;
}

const initialState: IJobTypeList = {
  jobType: { Job_Type_Id: "", Job_Type_Name: "" },
  jobTypes: [],
  JobTypeListState: null,
};

const jobTypeListSlice = createSlice({
  name: "jobTypeList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveJobTypesList.fulfilled, (state, action) => {
      state.jobTypes = action.payload;
      state.JobTypeListState = "SUCCESS";
    });
    builder.addCase(retrieveJobTypesList.pending, (state, action) => {
      state.JobTypeListState = "LOADING";
    });
    builder.addCase(retrieveJobTypesList.rejected, (state, action) => {
      state.JobTypeListState = "ERROR";
    });
  },
});

export default jobTypeListSlice.reducer;
