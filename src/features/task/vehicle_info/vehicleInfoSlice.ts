import { createSlice } from "@reduxjs/toolkit";
import {
  IVehicleInfoResponse,
  retrieveVehicleInfoByVehicleId,
} from "../../../action_creators/task/vehicle_info/vehicle_info";

type autoState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IEachAutoInfo {
  auto: IVehicleInfoResponse;
  autoState: autoState;
  message: string;
  isRetrieved: boolean;
}

const initialState: IEachAutoInfo = {
  auto: { CM_Vehicle_Info_Id: "", VIN: "" },
  autoState: null,
  message: "",
  isRetrieved: false,
};

const vehicleInfoSlice = createSlice({
  name: "vehicleInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      retrieveVehicleInfoByVehicleId.fulfilled,
      (state, action) => {
        state.auto = action.payload;
        state.autoState = "SUCCESS";
        state.isRetrieved = true;
        state.message = "Vehicle Info Found";
      }
    );
    builder.addCase(retrieveVehicleInfoByVehicleId.pending, (state, action) => {
      state.autoState = "LOADING";
      state.isRetrieved = false;
      state.message = "Loading Vehicle Info Data";
    });
    builder.addCase(
      retrieveVehicleInfoByVehicleId.rejected,
      (state, action) => {
        state.autoState = "ERROR";
        state.isRetrieved = false;
        state.message = "Failed to Fetch Vehicle Data";
      }
    );
  },
});

export default vehicleInfoSlice.reducer;
