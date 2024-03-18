import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPayOffMode,
  deleteEachPayOffMode,
  getAllPayOffModePayOffTypeAndPayOffTypeDetail,
} from "../../../services/tools/auto_payoffmode_dropdown/auto_payoffmode";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";

export interface IDeleteAutoPayOffMode extends IDeleteStatus {
  PayOffMode_Id: string;
}

export interface IAutoPayOffModeResponse {
  PayOffMode_Id?: string;
  PayOffType: string;
  cm_payofftypes: [IAutoPayOffType];
}

export interface IAutoPayOffType {
  PayOffType_Id?: string;
  PayOffTypeDetail?: string;
  fk_pay_off_mode_id?: string;
  cm_payofftypedetail?: [IAutoPayOffTypeDetail];
}

export interface IAutoPayOffTypeDetail {
  PayOffTypeDetail_Id?: string;
  PayOffTypeSubDetail?: string;
  fk_pay_off_type_id?: string;
}

export const getAutoPayOffModeTypeAndTypeDetail = createAsyncThunk<
  IAutoPayOffModeResponse[],
  unknown
>("auto_payOffMode/getAutoPayOffModeTypeAndDetail", async (_, thunkAPI) => {
  try {
    const response = await getAllPayOffModePayOffTypeAndPayOffTypeDetail();
    if (response.data) {
      const allPayOffModeTypeAndDetail: IAutoPayOffModeResponse[] =
        response.data.findAllPayOffModePayOffTypePayOffTypeDetail;
      thunkAPI.dispatch(
        setDropdownTypeMessage(
          "Retrieved all PayOffMode, PayOffType, and PayOffTypeDetail"
        )
      );
      return allPayOffModeTypeAndDetail;
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
});

export const addAutoPayOffMode = createAsyncThunk<
  IAutoPayOffModeResponse,
  string
>(
  "auto_payOffMode/addAutoPayOffMode",
  async (auto_pay_off_mode_name, thunkAPI) => {
    try {
      const response = await createPayOffMode(auto_pay_off_mode_name);

      if (response.data) {
        const autoPayOffModeResponse: IAutoPayOffModeResponse =
          response.data.createPayOffMode;
        thunkAPI.dispatch(
          setDropdownTypeMessage("Added New Auto Pay Off Mode")
        );
        return autoPayOffModeResponse;
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

export const removeAutoPayOffMode = createAsyncThunk<
  IDeleteAutoPayOffMode,
  string
>(
  "auto_payOffMode/deleteAutoPayOffMode",
  async (pay_off_mode_id: string, thunkAPI) => {
    try {
      const response = await deleteEachPayOffMode(pay_off_mode_id);
      if (response.data.deletePayOffMode.Status) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted Auto Pay Off Mode"));
        const deleteAutoPayOffMode: IDeleteAutoPayOffMode = {
          PayOffMode_Id: pay_off_mode_id,
          Status: response.data.deletePayOffMode.Status,
          Message: response.data.deletePayOffMode.Message,
        };
        return deleteAutoPayOffMode;
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
