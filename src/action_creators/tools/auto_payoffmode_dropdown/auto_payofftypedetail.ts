import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";
import {
  createPayOffTypeDetail,
  deleteEachPayOffTypeDetail,
} from "../../../services/tools/auto_payoffmode_dropdown/auto_payofftypedetail";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { IAutoPayOffTypeDetail } from "./auto_payoffmode";

export interface IAutoPayOffTypeDetailResponse extends IAutoPayOffTypeDetail {
  PayOffMode_Id: string;
}

export interface IAutoPayOffTypeDetailWithPayOffModeId {
  PayOffMode_Id: string;
  PayOffTypeDetail: IAutoPayOffTypeDetail;
}

export interface IDeleteAutoPayOffTypeDetail extends IDeleteStatus {
  PayOffMode_Id: string;
  PayOffType_Id: string;
  PayOffTypeDetail_Id: string;
}

export interface IDeleteAutoPayOffTypeDetailRequest {
  PayOffMode_Id: string;
  PayOffType_Id: string;
  PayOffTypeDetail_Id: string;
}

export const addAutoPayOffTypeDetail = createAsyncThunk<
  IAutoPayOffTypeDetailResponse,
  IAutoPayOffTypeDetailWithPayOffModeId
>(
  "auto_payOffTypeDetail/addAutoPayOffTypeDetail",
  async (auto_pay_off_type_detail, thunkAPI) => {
    try {
      const response = await createPayOffTypeDetail(
        auto_pay_off_type_detail.PayOffTypeDetail
      );

      if (response.data) {
        const autoPayOffTypeDetailResponse: IAutoPayOffTypeDetailResponse = {
          PayOffMode_Id: auto_pay_off_type_detail.PayOffMode_Id,
          PayOffTypeDetail_Id:
            response.data.createPayOffTypeDetail.PayOffTypeDetail_Id,
          PayOffTypeSubDetail:
            response.data.createPayOffTypeDetail.PayOffTypeSubDetail,
          fk_pay_off_type_id:
            auto_pay_off_type_detail.PayOffTypeDetail.fk_pay_off_type_id,
        };

        thunkAPI.dispatch(
          setDropdownTypeMessage("Added New Auto Pay Off Type Detail")
        );
        return autoPayOffTypeDetailResponse;
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

export const removeAutoPayOffTypeDetail = createAsyncThunk<
  IDeleteAutoPayOffTypeDetail,
  IDeleteAutoPayOffTypeDetailRequest
>(
  "auto_payOffTypeDetail/deleteAutoPayOffTypeDetail",
  async (pay_off_type_detail_request, thunkAPI) => {
    try {
      const response = await deleteEachPayOffTypeDetail(
        pay_off_type_detail_request.PayOffTypeDetail_Id
      );
      if (response.data.deletePayOffTypeDetail.Status) {
        thunkAPI.dispatch(
          setDropdownTypeMessage("Deleted Auto Pay Off Type Detail")
        );
        const deleteAutoPayOffTypeDetail: IDeleteAutoPayOffTypeDetail = {
          PayOffMode_Id: pay_off_type_detail_request.PayOffMode_Id,
          PayOffType_Id: pay_off_type_detail_request.PayOffType_Id,
          PayOffTypeDetail_Id: pay_off_type_detail_request.PayOffTypeDetail_Id,
          Status: response.data.deletePayOffTypeDetail.Status,
          Message: response.data.deletePayOffTypeDetail.Message,
        };
        return deleteAutoPayOffTypeDetail;
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
