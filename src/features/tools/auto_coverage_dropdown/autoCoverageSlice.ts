import { createSlice } from "@reduxjs/toolkit";
import {
  IAutoCoverage,
  addAutoCoverage,
  getAllAutoCoverages,
  removeAutoCoverage,
} from "../../../action_creators/tools/auto_coverage_dropdown/auto_coverage";

type AutoCoverageStatus = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IAutoCoverageState {
  autoCoverages: IAutoCoverage[];
  autoCoverage: IAutoCoverage;
  autoCoverageStatus: AutoCoverageStatus;
}

const initialState: IAutoCoverageState = {
  autoCoverage: { CoverageType: "" },
  autoCoverages: [],
  autoCoverageStatus: null,
};

const autoCoverageSlice = createSlice({
  name: "autoCoverage",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAutoCoverages.fulfilled, (state, action) => {
      state.autoCoverageStatus = "SUCCESS";
      state.autoCoverages = action.payload;
    });
    builder.addCase(getAllAutoCoverages.pending, (state, action) => {
      state.autoCoverageStatus = "LOADING";
    });
    builder.addCase(getAllAutoCoverages.rejected, (state, action) => {
      state.autoCoverageStatus = "ERROR";
    });
    builder.addCase(addAutoCoverage.fulfilled, (state, action) => {
      const newAutoCoverage = action.payload;
      if (newAutoCoverage) {
        state.autoCoverages = [...state.autoCoverages, newAutoCoverage];
      }
      state.autoCoverageStatus = "SUCCESS";
    });
    builder.addCase(addAutoCoverage.pending, (state, action) => {
      state.autoCoverageStatus = "LOADING";
    });
    builder.addCase(addAutoCoverage.rejected, (state) => {
      state.autoCoverageStatus = "ERROR";
    });
    builder.addCase(removeAutoCoverage.fulfilled, (state, action) => {
      let index = state.autoCoverages.findIndex(
        ({ CM_Vehicle_Coverage_Id }) =>
          CM_Vehicle_Coverage_Id === action.payload.CM_Vehicle_Coverage_Id
      );
      state.autoCoverages.splice(index, 1);
      state.autoCoverageStatus = "SUCCESS";
    });
    builder.addCase(removeAutoCoverage.pending, (state) => {
      state.autoCoverageStatus = "LOADING";
    });
    builder.addCase(removeAutoCoverage.rejected, (state) => {
      state.autoCoverageStatus = "ERROR";
    });
  },
});

export default autoCoverageSlice.reducer;
