import { createSlice } from "@reduxjs/toolkit";
import {
  IHomeInfoResponse,
  retrieveHomeInfoByHomeId,
} from "../../../action_creators/questionnaire/home_info/home_info";

type homeState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IEachHomeInfo {
  home: IHomeInfoResponse;
  homeState: homeState;
  message: string;
}

const initialState: IEachHomeInfo = {
  home: {
    CM_Home_Info_Id: "",
    Address: null,
    Bathrooms: null,
    Built_Year: null,
    Claims: null,
    Comment: null,
    HW_Tank_Year: null,
    Is_Basement_Completed: null,
    Num_Mortgages: null,
    Roofing_Year: null,
    Size: null,
  },
  homeState: null,
  message: "",
};

const homeInfoSlice = createSlice({
  name: "homeInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveHomeInfoByHomeId.fulfilled, (state, action) => {
      state.home = action.payload;
      state.homeState = "SUCCESS";
      state.message = "Home Info Found";
    });
    builder.addCase(retrieveHomeInfoByHomeId.pending, (state, action) => {
      state.homeState = "LOADING";
      state.message = "Loading Home Info Data";
    });
    builder.addCase(retrieveHomeInfoByHomeId.rejected, (state, action) => {
      state.homeState = "ERROR";
      state.message = "Failed to Fetch Home Info Data";
    });
  },
});

export default homeInfoSlice.reducer;
