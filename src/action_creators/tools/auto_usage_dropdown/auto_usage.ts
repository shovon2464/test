import {
  UsageTypeResponse,
  UsageTypeRequest,
} from "../../../services/tools/auto_usage_dropdown/auto_usage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addUsageType,
  deleteUsageType,
  getAllUsageType,
  updateUsageType,
  getAllUsageTypeAndUsageDetails,
} from "../../../services/tools/auto_usage_dropdown/auto_usage";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";

interface IDeleteAutoUsage {
  deleteUsageTypeId: string;
  deleteStatus: IDeleteStatus;
}

export interface IAutoUsageTypeAndDetailsResponse {
  usage_id?: string;
  usage_type?: string;
  cm_usage_details?: [IAutoUsageDetails];
}
export interface IAutoUsageDetails {
  CM_Usage_Detail_Id?: string;
  UsageDetail?: string;
  fk_usage_id?: string;
}

export const addAutoUsage = createAsyncThunk<
  IAutoUsageTypeAndDetailsResponse,
  string
>("auto_usage/addAutoUsage", async (usage_type, thunkAPI) => {
  try {
    const response = await addUsageType(usage_type);
    if (response.data) {
      const usageTypeResponse: IAutoUsageTypeAndDetailsResponse = {
        usage_id: response.data.createUsage.CM_Usage_Id,
        usage_type: response.data.createUsage.UsageType,
      };
      thunkAPI.dispatch(setDropdownTypeMessage("Added New Usage Type"));
      return usageTypeResponse;
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
});

export const getAutoUsages = createAsyncThunk<UsageTypeResponse[], undefined>(
  "auto_usage/getAutoUsages",
  async (_, thunkAPI) => {
    try {
      const response = await getAllUsageType();
      if (response.data) {
        thunkAPI.dispatch(setDropdownTypeMessage("Got Usage Type List"));
        const value = response.data.findAllUsageType;
        let usageType: UsageTypeResponse[] = [];
        if (value instanceof Array) {
          value.map((eachType) => {
            let type: UsageTypeResponse = { usage_id: "", usage_type: "" };
            type.usage_id = eachType.CM_Usage_Id;
            type.usage_type = eachType.UsageType;
            usageType.push(type);
          });
          return usageType;
        } else {
          throw new Error("Opp, something went wrong");
        }
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

export const getAutoUsagesAndDetails = createAsyncThunk<
  IAutoUsageTypeAndDetailsResponse[],
  undefined
>("auto_usage/getAutoUsagesAndDetails", async (_, thunkAPI) => {
  try {
    const response = await getAllUsageTypeAndUsageDetails();
    if (response.data) {
      thunkAPI.dispatch(setDropdownTypeMessage("Got Usage Type List"));
      const value = response.data.findAllUsageTypeAndUsageTypeDetails;
      let usageType: IAutoUsageTypeAndDetailsResponse[] = [];
      if (value instanceof Array) {
        value.map((eachType) => {
          let type: IAutoUsageTypeAndDetailsResponse = {};
          type.usage_id = eachType.CM_Usage_Id;
          type.usage_type = eachType.UsageType;
          type.cm_usage_details = eachType.cm_usage_details;
          usageType.push(type);
        });
        return usageType;
      } else {
        throw new Error("Opp, something went wrong");
      }
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
});

export const deleteAutoUsage = createAsyncThunk<IDeleteAutoUsage, string>(
  "auto_usage/deleteAutoUsage",
  async (auto_usage_id: string, thunkAPI) => {
    try {
      const response = await deleteUsageType(auto_usage_id);
      if (response.data) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted Usage Type"));
        const deleteStatusResponse = response.data.deleteUsage as IDeleteStatus;
        const deleteAutoUsage: IDeleteAutoUsage = {
          deleteStatus: deleteStatusResponse,
          deleteUsageTypeId: auto_usage_id,
        };
        return deleteAutoUsage;
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

export const updateAutoUsage = createAsyncThunk<
  IAutoUsageTypeAndDetailsResponse,
  UsageTypeRequest
>(
  "auto_usage/updateAutoUsage",
  async (usageTypeRequest: UsageTypeRequest, thunkAPI) => {
    try {
      const response = await updateUsageType(
        usageTypeRequest.usage_id,
        usageTypeRequest.usage_type
      );
      if (response.data) {
        thunkAPI.dispatch(setDropdownTypeMessage("Updated Usage Type"));
        return response.data as IAutoUsageTypeAndDetailsResponse;
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
