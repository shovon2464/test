import { createSlice } from "@reduxjs/toolkit";
import {
  getTaskDaysInfo,
  IAutoDelete,
  updateTaskDays,
} from "../../../action_creators/tools/auto_delete/auto_delete";

type TaskDaysStatus = "SUCCESS" | "LOADING" | "ERROR" | null;

// export interface IAutoDeleteState {
//     info: IAutoDelete[];
//     autoDeleteStatus: TaskDaysStatus;
// };

// const initialState: IAutoDeleteState = {
//     info: [],
//     autoDeleteStatus: null,
// };

export interface IAutoDeleteState {
  infos: IAutoDelete[];
  info: IAutoDelete;
  status: TaskDaysStatus;
}

const initialState: IAutoDeleteState = {
  info: {
    alert_delete_id: "79a47e2a-e386-4a2d-aaa6-8a70cc57c12f",
    alert_days: 0,
    delete_days: 0,
    target_email: "",
    active: false,
  },
  infos: [],
  status: null,
};

const autoDeleteSlice = createSlice({
  name: "autoDelete",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTaskDaysInfo.fulfilled, (state, action) => {
      state.infos = action.payload;
      state.status = "SUCCESS";
    });
    builder.addCase(getTaskDaysInfo.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(getTaskDaysInfo.rejected, (state, action) => {
      state.status = "ERROR";
    });
    builder.addCase(updateTaskDays.fulfilled, (state, action) => {
      state.infos = action.payload;
      state.status = "SUCCESS";
    });
    builder.addCase(updateTaskDays.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(updateTaskDays.rejected, (state, action) => {
      state.status = "ERROR";
    });
  },
});

export default autoDeleteSlice.reducer;
