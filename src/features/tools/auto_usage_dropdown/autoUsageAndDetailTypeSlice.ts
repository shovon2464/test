import { createSlice } from "@reduxjs/toolkit";
import {
  getAutoUsagesAndDetails,
  IAutoUsageTypeAndDetailsResponse,
} from "../../../action_creators/tools/auto_usage_dropdown/auto_usage";
import {
  addUsageAndDetailType,
  deleteUsageAndDetailType,
} from "../../../action_creators/tools/auto_usage_dropdown/auto_usage_and_detail";

type AutoUsageAndDetailTypeState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IAutoUsageAndDetailType {
  autoUsageAndDetailTypes: IAutoUsageTypeAndDetailsResponse[];
  autoUsageAndDetailType: IAutoUsageTypeAndDetailsResponse;
  autoUsageAndDetailTypeState: AutoUsageAndDetailTypeState;
  message: string;
}

const initialState: IAutoUsageAndDetailType = {
  autoUsageAndDetailType: {},
  autoUsageAndDetailTypes: [],
  autoUsageAndDetailTypeState: null,
  message: "",
};

const autoUsageAndDetailTypeSlice = createSlice({
  name: "autoUsageAndDetail",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAutoUsagesAndDetails.fulfilled, (state, action) => {
      state.autoUsageAndDetailTypeState = "SUCCESS";
      state.autoUsageAndDetailTypes = action.payload;
      state.message = "retrieved usage and detail types";
    });
    builder.addCase(getAutoUsagesAndDetails.pending, (state, action) => {
      state.autoUsageAndDetailTypeState = "LOADING";
      state.message = "loading usage and detail types";
    });
    builder.addCase(getAutoUsagesAndDetails.rejected, (state, action) => {
      state.autoUsageAndDetailTypeState = "ERROR";
      state.message = action.error.message || "";
    });
    builder.addCase(addUsageAndDetailType.fulfilled, (state, action) => {
      state.autoUsageAndDetailTypeState = "SUCCESS";
      state.message = "added usage detail type ";
      state.autoUsageAndDetailTypes.forEach((type) => {
        if (type.usage_id === action.payload.fk_usage_id) {
          type.cm_usage_details?.push(action.payload);
        }
      });
    });
    builder.addCase(addUsageAndDetailType.rejected, (state, action) => {
      state.autoUsageAndDetailTypeState = "ERROR";
      state.message = action.error.message || "";
    });
  },
});

export default autoUsageAndDetailTypeSlice.reducer;
