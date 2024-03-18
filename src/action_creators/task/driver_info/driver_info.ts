import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";
import { getDriverInfoByVehicleId } from "../../../services/task/driver_info/driver_info";

export interface IDriverInfoResponse {
  CM_Driver_Info_Id?: string;
  Name?: string;
  Gender?: string;
  Address?: string;
  DateOfBirth?: Date | string;
  LicenseNumber?: string;
  LicenseYear?: number;
  IsRemoved?: boolean;
}

export const retrieveDriversInfoByVehicleId = createAsyncThunk<
  IDriverInfoResponse[],
  string
>("driverInfo/getDriverInfoByVehicleId", async (vehicle_id, thunkAPI) => {
  try {
    const response = await getDriverInfoByVehicleId(vehicle_id);
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("Driver Info Retrieved!"));
      const driver_info: IDriverInfoResponse[] =
        response.data.findDriversInfoByVehicleId;
      return driver_info;
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
