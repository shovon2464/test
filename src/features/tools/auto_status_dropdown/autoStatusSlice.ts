import { createSlice } from "@reduxjs/toolkit";
import {
  IAutoStatus,
  addAutoStatus,
  getAllAutoStatuses,
  removeAutoStatus,
} from "../../../action_creators/tools/auto_status_dropdown/auto_status";

type AutoStatusState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IAutoStatusState {
  autoStatus: IAutoStatus;
  autoStatuses: IAutoStatus[];
  autoStatusState: AutoStatusState;
}

const initialState: IAutoStatusState = {
  autoStatus: { CM_Vehicle_Status_Description: "" },
  autoStatuses: [],
  autoStatusState: null,
};

const autoStatusSlice = createSlice({
  name: "autoStatus",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAutoStatuses.fulfilled, (state, action) => {
      state.autoStatusState = "SUCCESS";
      state.autoStatuses = action.payload;
    });
    builder.addCase(getAllAutoStatuses.pending, (state, action) => {
      state.autoStatusState = "LOADING";
    });
    builder.addCase(getAllAutoStatuses.rejected, (state, action) => {
      state.autoStatusState = "ERROR";
    });
    builder.addCase(addAutoStatus.fulfilled, (state, action) => {
      const newAutoStatus = action.payload;
      if (newAutoStatus) {
        state.autoStatuses = [...state.autoStatuses, newAutoStatus];
      }
      state.autoStatusState = "SUCCESS";
    });
    builder.addCase(addAutoStatus.pending, (state, action) => {
      state.autoStatusState = "LOADING";
    });
    builder.addCase(addAutoStatus.rejected, (state) => {
      state.autoStatusState = "ERROR";
    });
    builder.addCase(removeAutoStatus.fulfilled, (state, action) => {
      let index = state.autoStatuses.findIndex(
        ({ CM_Vehicle_Status_Id }) =>
          CM_Vehicle_Status_Id === action.payload.CM_Vehicle_Status_Id
      );
      state.autoStatuses.splice(index, 1);
      state.autoStatusState = "SUCCESS";
    });
    builder.addCase(removeAutoStatus.pending, (state) => {
      state.autoStatusState = "LOADING";
    });
    builder.addCase(removeAutoStatus.rejected, (state) => {
      state.autoStatusState = "ERROR";
    });
  },
});

export default autoStatusSlice.reducer;
