import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAnUserPerformanceRecord,
  findAllPerformanceRecords,
  findPerformanceRecordsByUserId,
} from "../../services/performance_report/performance_report";
import { setPerformanceReportMessage } from "../../features/performance_report/performanceReportMsgSlice";

export interface IUserPerformanceRequest {
  Phone_Number?: string;
  Cost_Time: number;
  Job_Close_Date: Date | string;
  Job_Type?: string;
  Job_Sub_Type?: string;
  user_id: string;
  UserName?: string;
}

export interface IUserPerformanceResponse extends IUserPerformanceRequest {
  User_Performance_Id: string;
}

export const createAPerformanceRecord = createAsyncThunk<
  IUserPerformanceResponse,
  IUserPerformanceRequest
>(
  "performanceRecords/addPerformanceRecord",
  async (performanceReq: IUserPerformanceRequest, thunkAPI) => {
    try {
      const response = await createAnUserPerformanceRecord(performanceReq);

      if (response.data) {
        const performanceRes: IUserPerformanceResponse =
          response.data.createUserPerformanceRecord;
        thunkAPI.dispatch(
          setPerformanceReportMessage("An user performance record created")
        );
        return performanceRes;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setPerformanceReportMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setPerformanceReportMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const retrieveAllPerformanceRecords = createAsyncThunk<
  IUserPerformanceResponse[],
  unknown
>("performanceRecords/getPerformanceRecordsList", async (_, thunkAPI) => {
  try {
    const response = await findAllPerformanceRecords();
    if (response.data) {
      const PerformanceRecords: IUserPerformanceResponse[] =
        response.data.findAllPerformanceRecords;
      thunkAPI.dispatch(
        setPerformanceReportMessage("Retrieved all performance records")
      );
      return PerformanceRecords;
    } else {
      const errorMsg: string = response.errors[0].message.toString();
      thunkAPI.dispatch(setPerformanceReportMessage(errorMsg));
      return thunkAPI.rejectWithValue(errorMsg);
    }
  } catch (e: any) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.response.errors ||
      e.toString();
    thunkAPI.dispatch(setPerformanceReportMessage(message));
    console.log("Error", e.response.errors);
    return thunkAPI.rejectWithValue(message);
  }
});

export const retrieveAllPerformanceRecordsByUserId = createAsyncThunk<
  IUserPerformanceResponse[],
  string
>(
  "performanceRecords/getPerformanceRecordsListByUserId",
  async (userId: string, thunkAPI) => {
    try {
      const response = await findPerformanceRecordsByUserId(userId);
      if (response.data) {
        const PerformanceRecords: IUserPerformanceResponse[] =
          response.data.findAllPerformanceRecordsByUserId;
        thunkAPI.dispatch(
          setPerformanceReportMessage("Retrieved an user's performance records")
        );
        return PerformanceRecords;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setPerformanceReportMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setPerformanceReportMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
