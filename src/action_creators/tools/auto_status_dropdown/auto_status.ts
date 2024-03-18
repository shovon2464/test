import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAutoStatus,
  deleteAutoStatus,
  getAllAutoStatus,
} from "../../../services/tools/auto_status_dropdown/auto_status";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";

export interface IAutoStatus {
  CM_Vehicle_Status_Id?: string;
  CM_Vehicle_Status_Description: string;
}

export interface IDeleteAutoStatus extends IDeleteStatus {
  CM_Vehicle_Status_Id: string;
}

export const getAllAutoStatuses = createAsyncThunk<IAutoStatus[], unknown>(
  "auto_status/getAutoStatuses",
  async (_, thunkAPI) => {
    try {
      const response = await getAllAutoStatus();
      if (response.data) {
        const allAutoStatuses: IAutoStatus[] =
          response.data.findAllVehicleStatus;
        thunkAPI.dispatch(
          setDropdownTypeMessage("Retrieved All Auto Statuses")
        );
        return allAutoStatuses;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setDropdownTypeMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addAutoStatus = createAsyncThunk<IAutoStatus, string>(
  "auto_status/addAutoStatus",
  async (autoStatusDes, thunkAPI) => {
    try {
      const response = await createAutoStatus(autoStatusDes);

      if (response.data) {
        const autoStatusResponse: IAutoStatus =
          response.data.createNewVehicleStatus;
        thunkAPI.dispatch(setDropdownTypeMessage("Added New Auto Status"));
        return autoStatusResponse;
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
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setDropdownTypeMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeAutoStatus = createAsyncThunk<IDeleteAutoStatus, string>(
  "auto_status/deleteAutoStatus",
  async (auto_status_id: string, thunkAPI) => {
    try {
      const response = await deleteAutoStatus(auto_status_id);
      if (response.data.deleteVehicleStatus.Status) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted Auto Status"));
        const deleteAutoStatus: IDeleteAutoStatus = {
          CM_Vehicle_Status_Id: auto_status_id,
          Status: response.data.deleteVehicleStatus.Status,
          Message: response.data.deleteVehicleStatus.Message,
        };
        return deleteAutoStatus;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setDropdownTypeMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
