import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";
import { getVehicleInfoByVehicleId } from "../../../services/task/vehicle_info/vehicle_info";

export interface IVehicleInfoResponse {
  CM_Vehicle_Info_Id: string;
  VIN: string;
  Model?: string;
  Year?: number;
  IsUsed?: boolean;
  IfParkingReason?: string;
  PayOffMode_Id?: string;
  PayOffType?: string;
  PayOffType_Id?: string;
  PayOffTypeDetail?: string;
  PayOffTypeDetail_Id?: string;
  PayOffTypeSubDetail?: string;
  CM_Vehicle_Coverage_Id?: string;
  CoverageType?: string;
  CoverageDetails?: string;
  CM_Usage_Id?: string;
  UsageType?: string;
  CM_Usage_Detail_Id?: string;
  UsageDetail?: string;
  StartEffectiveDate?: Date | string;
  EndEffectiveDate?: Date | string;
  fk_vehicle_status_id?: string;
  CM_Vehicle_Status_Description?: string;
}

export const retrieveVehicleInfoByVehicleId = createAsyncThunk<
  IVehicleInfoResponse,
  string
>("vehicleInfo/getVehicleInfoByVehicleId", async (vehicle_id, thunkAPI) => {
  try {
    const response = await getVehicleInfoByVehicleId(vehicle_id);
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("Vehicle Info Retrieved!"));
      const auto_info: IVehicleInfoResponse =
        response.data.findAutoInfoDetailById;
      return auto_info;
    } else {
      const errorMsg: string = response.errors[0].message.toString();
      thunkAPI.dispatch(setTaskMessage(errorMsg));
      return thunkAPI.rejectWithValue(errorMsg);
    }
  } catch (e: any) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.response.errors ||
      e.toString();
    thunkAPI.dispatch(setTaskMessage(message));
    console.log("Error", e.response.errors);
    return thunkAPI.rejectWithValue(message);
  }
});
