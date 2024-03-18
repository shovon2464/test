import { createSlice } from "@reduxjs/toolkit";
import {
  ICRMComingCall,
  retrieveCRMComingCalls,
} from "../../../action_creators/evaluation/coming_calls_list";

type comingCallState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ICRMCalls {
  CRMCalls: ICRMComingCall[];
  CRMCall: ICRMComingCall;
  CRMCallState: comingCallState;
}

const initialState: ICRMCalls = {
  CRMCalls: [],
  CRMCall: {
    name: "",
    phone_number: "",
    datetime: "",
    duration: "",
    recordingURL: "",
  },
  CRMCallState: null,
};

const CRMCallsSlice = createSlice({
  name: "CRMCalls",
  initialState: initialState,
  reducers: {
    resetCRMCalls: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveCRMComingCalls.fulfilled, (state, action) => {
      state.CRMCalls = action.payload;
      state.CRMCallState = "SUCCESS";
    });
    builder.addCase(retrieveCRMComingCalls.pending, (state, action) => {
      state.CRMCallState = "LOADING";
    });
    builder.addCase(retrieveCRMComingCalls.rejected, (state, action) => {
      state.CRMCallState = "ERROR";
    });
  },
});

export const {resetCRMCalls} = CRMCallsSlice.actions;
export default CRMCallsSlice.reducer;
