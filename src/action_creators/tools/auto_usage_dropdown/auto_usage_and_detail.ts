import {
  addUsageDetail,
  deleteUsageDetail,
  updateUsageDetail,
} from "../../../services/tools/auto_usage_dropdown/auto_usageDetail";
import { IAutoUsageDetails } from "./auto_usage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { UsageDetailRequest } from "../../../services/tools/auto_usage_dropdown/auto_usageDetail";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";

interface IDeleteAutoUsageDetail {
  deleteUsageDetailTypeId?: string;
  deleteStatus: IDeleteStatus;
}

export const addUsageAndDetailType = createAsyncThunk<
  IAutoUsageDetails,
  UsageDetailRequest
>(
  "auto_usageDetail/addAutoUsageDetail",
  async (usageDetailRequest, thunkAPI) => {
    try {
      const response = await addUsageDetail(usageDetailRequest);

      if (response.data) {
        const usageTypeAndDetailResponse: IAutoUsageDetails = {
          CM_Usage_Detail_Id:
            response.data.createUsageDetail.CM_Usage_Detail_Id,
          UsageDetail: response.data.createUsageDetail.UsageDetail,
          fk_usage_id: usageDetailRequest.usage_id,
        };
        thunkAPI.dispatch(
          setDropdownTypeMessage("Added New Usage Detail Type")
        );
        return usageTypeAndDetailResponse;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
        //throw new Error(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setDropdownTypeMessage(message));
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const deleteUsageAndDetailType = createAsyncThunk<
  IDeleteAutoUsageDetail,
  string
>(
  "auto_usageDetail/deleteAutoUsageDetail",
  async (usage_detail_id, thunkAPI) => {
    try {
      const response = await deleteUsageDetail(usage_detail_id);
      if (response.data) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted Usage Type"));
        const deleteStatusResponse = response.data
          .deleteUsageDetail as IDeleteStatus;
        const deleteAutoUsageDetail: IDeleteAutoUsageDetail = {
          deleteStatus: deleteStatusResponse,
          deleteUsageDetailTypeId: usage_detail_id,
        };
        return deleteAutoUsageDetail;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setDropdownTypeMessage(message));
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
