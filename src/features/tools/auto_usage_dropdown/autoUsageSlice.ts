import { createSlice } from "@reduxjs/toolkit";
import { IAutoUsageTypeAndDetailsResponse } from "../../../action_creators/tools/auto_usage_dropdown/auto_usage";
import {
  addAutoUsage,
  deleteAutoUsage,
  updateAutoUsage,
  getAutoUsagesAndDetails,
} from "../../../action_creators/tools/auto_usage_dropdown/auto_usage";
import {
  addUsageAndDetailType,
  deleteUsageAndDetailType,
} from "../../../action_creators/tools/auto_usage_dropdown/auto_usage_and_detail";

type AutoUsageState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IAutoUsage {
  autoUsageTypes: IAutoUsageTypeAndDetailsResponse[];
  autoUsageType: IAutoUsageTypeAndDetailsResponse;
  autoUsageState: AutoUsageState;
  deleteStatus: boolean;
  message: string;
}

const initialState: IAutoUsage = {
  autoUsageTypes: [],
  autoUsageType: {} as IAutoUsageTypeAndDetailsResponse,
  autoUsageState: null,
  deleteStatus: false,
  message: "",
};

const autoUsageSlice = createSlice({
  name: "autoUsage",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAutoUsagesAndDetails.fulfilled, (state, action) => {
      state.autoUsageState = "SUCCESS";
      state.message = "Got Usage and Detail Type List";
      state.autoUsageTypes = action.payload;
    });
    builder.addCase(getAutoUsagesAndDetails.pending, (state, action) => {
      state.autoUsageState = "LOADING";
      state.message = "Loading Usage Type List";
    });
    builder.addCase(getAutoUsagesAndDetails.rejected, (state, action) => {
      state.autoUsageState = "ERROR";
      state.message = action.error.message || "";
    });
    builder.addCase(addAutoUsage.fulfilled, (state, action) => {
      const usageType = action.payload;
      if (usageType) {
        state.autoUsageTypes = [...state.autoUsageTypes, usageType];
      }
      state.autoUsageState = "SUCCESS";
      state.message = "New Usage Type Added";
    });
    builder.addCase(addAutoUsage.pending, (state) => {
      state.autoUsageState = "LOADING";
      state.message = "Adding Usage Type";
    });
    builder.addCase(addAutoUsage.rejected, (state, action) => {
      state.autoUsageState = "ERROR";
      state.message = action.error.message || "";
    });
    builder.addCase(deleteAutoUsage.fulfilled, (state, action) => {
      let index = state.autoUsageTypes.findIndex(
        ({ usage_id }) => usage_id === action.payload.deleteUsageTypeId
      );
      state.autoUsageTypes.splice(index, 1);
      state.autoUsageState = "SUCCESS";
      state.message = "Usage Type Deleted";
    });
    builder.addCase(deleteAutoUsage.pending, (state) => {
      state.autoUsageState = "LOADING";
      state.message = "Removing Usage Type";
    });
    builder.addCase(deleteAutoUsage.rejected, (state, action) => {
      state.autoUsageState = "ERROR";
      state.message = action.error.message || "";
    });
    builder.addCase(updateAutoUsage.fulfilled, (state, action) => {
      const index = state.autoUsageTypes.findIndex(
        (usage) => usage.usage_id === action.payload.usage_id
      );
      state.autoUsageTypes[index] = {
        ...state.autoUsageTypes[index],
        ...action.payload,
      };
    });
    builder.addCase(updateAutoUsage.pending, (state, action) => {
      state.autoUsageState = "LOADING";
      state.message = "Updating Usage Type";
    });
    builder.addCase(updateAutoUsage.rejected, (state, action) => {
      state.autoUsageState = "ERROR";
      state.message = action.error.message || "";
    });
    builder.addCase(addUsageAndDetailType.fulfilled, (state, action) => {
      state.autoUsageState = "SUCCESS";
      state.message = "added usage detail type ";
      const index = state.autoUsageTypes.findIndex(
        (usage) => usage.usage_id === action.payload.fk_usage_id
      );
      let eachUsageDetailType = state.autoUsageTypes[index].cm_usage_details;
      if (eachUsageDetailType) {
        eachUsageDetailType.push(action.payload);
        state.autoUsageTypes[index].cm_usage_details = eachUsageDetailType;
      } else {
        eachUsageDetailType = [action.payload];
        state.autoUsageTypes[index].cm_usage_details = eachUsageDetailType;
      }
    });
    builder.addCase(addUsageAndDetailType.pending, (state) => {
      state.autoUsageState = "LOADING";
      state.message = "Adding Usage Detail Type";
    });
    builder.addCase(addUsageAndDetailType.rejected, (state, action) => {
      state.autoUsageState = "ERROR";
      state.message = action.error.message || "";
    });
    builder.addCase(deleteUsageAndDetailType.fulfilled, (state, action) => {
      let prevAutoUsageTypes = state.autoUsageTypes;
      for (let i = 0; i < prevAutoUsageTypes.length; i++) {
        let usage_details = prevAutoUsageTypes[i].cm_usage_details;
        if (usage_details && usage_details.length > 0) {
          for (let count = 0; count < usage_details.length; count++) {
            let eachUsageDetailId = usage_details[count].CM_Usage_Detail_Id;
            if (eachUsageDetailId !== undefined) {
              if (
                eachUsageDetailId === action.payload.deleteUsageDetailTypeId
              ) {
                let newI = i;
                let newCount = count;
                state.autoUsageTypes[newI].cm_usage_details?.splice(
                  newCount,
                  1
                );
                break;
              }
            }
          }
        }
      }

      state.autoUsageState = "SUCCESS";
      state.message = "Deleted Usage Detail Type";
    });
    builder.addCase(deleteUsageAndDetailType.pending, (state) => {
      state.autoUsageState = "LOADING";
      state.message = "Removing Usage DetailType";
    });
    builder.addCase(deleteUsageAndDetailType.rejected, (state, action) => {
      state.autoUsageState = "ERROR";
      state.message = action.error.message || "";
    });
  },
});

export default autoUsageSlice.reducer;
