import { createSlice } from "@reduxjs/toolkit";
import {
  IDriverInfoResponse,
  retrieveDriversInfoByVehicleId,
} from "../../../action_creators/task/driver_info/driver_info";

type driverState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IDriverInfoList {
  driver: IDriverInfoResponse;
  drivers: IDriverInfoResponse[];
  driverStatus: driverState;
}

const initialState: IDriverInfoList = {
  driver: {},
  drivers: [],
  driverStatus: null,
};

const driverInfoSlice = createSlice({
  name: "driverInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      retrieveDriversInfoByVehicleId.fulfilled,
      (state, action) => {
        state.drivers = action.payload;
        state.driverStatus = "SUCCESS";
      }
    );
    builder.addCase(retrieveDriversInfoByVehicleId.pending, (state, action) => {
      state.driverStatus = "LOADING";
    });
    builder.addCase(
      retrieveDriversInfoByVehicleId.rejected,
      (state, action) => {
        state.driverStatus = "ERROR";
      }
    );
  },
});

export default driverInfoSlice.reducer;
