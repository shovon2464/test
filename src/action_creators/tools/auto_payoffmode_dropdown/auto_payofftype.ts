import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";
import {
  createPayOffType,
  deleteEachPayOffType,
} from "../../../services/tools/auto_payoffmode_dropdown/auto_payofftype";
import { IAutoPayOffType } from "./auto_payoffmode";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";

export interface IDeleteAutoPayOffType extends IDeleteStatus {
  PayOffType_Id: string;
  PayOffMode_Id: string;
}

export interface IDeleteAutoPayOffTypeRequest {
  PayOffType_Id: string;
  PayOffMode_Id: string;
}

export const addAutoPayOffType = createAsyncThunk<
  IAutoPayOffType,
  IAutoPayOffType
>("auto_payOffType/addAutoPayOffType", async (auto_pay_off_type, thunkAPI) => {
  try {
    const response = await createPayOffType(auto_pay_off_type);

    if (response.data) {
      const autoPayOffTypeResponse: IAutoPayOffType = {
        PayOffType_Id: response.data.createPayOffType.PayOffType_Id,
        PayOffTypeDetail: response.data.createPayOffType.PayOffTypeDetail,
        fk_pay_off_mode_id: auto_pay_off_type.fk_pay_off_mode_id,
        cm_payofftypedetail: [{}],
      };

      thunkAPI.dispatch(setDropdownTypeMessage("Added New Auto Pay Off Mode"));
      return autoPayOffTypeResponse;
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

export const removeAutoPayOffType = createAsyncThunk<
  IDeleteAutoPayOffType,
  IDeleteAutoPayOffTypeRequest
>(
  "auto_payOffType/deleteAutoPayOffType",
  async (pay_off_type_request, thunkAPI) => {
    try {
      const response = await deleteEachPayOffType(
        pay_off_type_request.PayOffType_Id
      );
      if (response.data.deletePayOffType.Status) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted Auto Pay Off Type"));
        const deleteAutoPayOffType: IDeleteAutoPayOffType = {
          PayOffMode_Id: pay_off_type_request.PayOffMode_Id,
          PayOffType_Id: pay_off_type_request.PayOffType_Id,
          Status: response.data.deletePayOffType.Status,
          Message: response.data.deletePayOffType.Message,
        };
        return deleteAutoPayOffType;
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
