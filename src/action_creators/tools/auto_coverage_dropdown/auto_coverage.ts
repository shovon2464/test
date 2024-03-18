import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAutoCoverage,
  deleteAutoCoverage,
  getAllAutoCoverage,
} from "../../../services/tools/auto_coverage_dropdown/auto_coverage";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";

export interface IAutoCoverage {
  CM_Vehicle_Coverage_Id?: string;
  CoverageType: string;
  CoverageDetails?: string;
}

export interface IDeleteAutoCoverage extends IDeleteStatus {
  CM_Vehicle_Coverage_Id: string;
}

export const getAllAutoCoverages = createAsyncThunk<IAutoCoverage[], unknown>(
  "auto_coverage/getAutoCoverages",
  async (_, thunkAPI) => {
    try {
      const response = await getAllAutoCoverage();
      if (response.data) {
        const allAutoCoverages: IAutoCoverage[] =
          response.data.findAllVehicleCoverage;
        thunkAPI.dispatch(
          setDropdownTypeMessage("Retrieved All Auto Coverages")
        );
        return allAutoCoverages;
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

export const addAutoCoverage = createAsyncThunk<IAutoCoverage, IAutoCoverage>(
  "auto_coverage/addAutoCoverage",
  async (autoCoverageRequest, thunkAPI) => {
    try {
      const response = await createAutoCoverage(autoCoverageRequest);

      if (response.data) {
        const autoCoverageResponse: IAutoCoverage =
          response.data.createVehicleCoverage;
        thunkAPI.dispatch(setDropdownTypeMessage("Added New Auto Coverage"));
        return autoCoverageResponse;
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

export const removeAutoCoverage = createAsyncThunk<IDeleteAutoCoverage, string>(
  "auto_coverage/deleteAutoCoverage",
  async (auto_coverage_id: string, thunkAPI) => {
    try {
      const response = await deleteAutoCoverage(auto_coverage_id);
      if (response.data.deleteVehicleCoverage.Status) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted Auto Coverage"));
        const deleteAutoCoverage: IDeleteAutoCoverage = {
          CM_Vehicle_Coverage_Id: auto_coverage_id,
          Status: response.data.deleteVehicleCoverage.Status,
          Message: response.data.deleteVehicleCoverage.Message,
        };
        return deleteAutoCoverage;
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
