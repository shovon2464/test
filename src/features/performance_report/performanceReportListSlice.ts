import { createSlice } from "@reduxjs/toolkit";
import {
  IUserPerformanceResponse,
  createAPerformanceRecord,
  retrieveAllPerformanceRecords,
  retrieveAllPerformanceRecordsByUserId,
} from "../../action_creators/performance_report/user_performance";

type PerformanceReportListState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IPerformanceState {
  performanceRecord: IUserPerformanceResponse;
  performanceRecords: IUserPerformanceResponse[];
  eachUserPerformanceRecords: IUserPerformanceResponse[];
  performanceRecordStatus: PerformanceReportListState;
}

const initialState: IPerformanceState = {
  performanceRecord: {
    Cost_Time: 0,
    Job_Close_Date: "",
    User_Performance_Id: "",
    user_id: "",
  },
  performanceRecords: [],
  eachUserPerformanceRecords: [],
  performanceRecordStatus: null,
};

const performanceReportListSlice = createSlice({
  name: "performanceRecords",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      retrieveAllPerformanceRecords.fulfilled,
      (state, action) => {
        state.performanceRecords = action.payload;
        state.performanceRecordStatus = "SUCCESS";
      }
    );
    builder.addCase(retrieveAllPerformanceRecords.pending, (state) => {
      state.performanceRecordStatus = "LOADING";
    });
    builder.addCase(retrieveAllPerformanceRecords.rejected, (state) => {
      state.performanceRecordStatus = "ERROR";
    });
    builder.addCase(
      retrieveAllPerformanceRecordsByUserId.fulfilled,
      (state, action) => {
        state.eachUserPerformanceRecords = action.payload;
        state.performanceRecordStatus = "SUCCESS";
      }
    );
    builder.addCase(
      retrieveAllPerformanceRecordsByUserId.pending,
      (state, action) => {
        state.performanceRecordStatus = "LOADING";
      }
    );
    builder.addCase(
      retrieveAllPerformanceRecordsByUserId.rejected,
      (state, action) => {
        state.performanceRecordStatus = "ERROR";
      }
    );
    builder.addCase(createAPerformanceRecord.fulfilled, (state, action) => {
      state.performanceRecord = action.payload;
      state.performanceRecordStatus = "SUCCESS";
    });
    builder.addCase(createAPerformanceRecord.pending, (state) => {
      state.performanceRecordStatus = "LOADING";
    });
    builder.addCase(createAPerformanceRecord.rejected, (state, action) => {
      state.performanceRecordStatus = "ERROR";
    });
  },
});

export default performanceReportListSlice.reducer;
