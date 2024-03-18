import { createSlice } from "@reduxjs/toolkit";
import { 
    IComingCallsListResponse, 
    retrieveComingCallsList, 
    retrieveComingCallsByPhoneNumber, 
    retrieveComingCallsByPredictValuesLessThanZero, 
    retrieveComingCallsByPredictValuesEqualToZero, 
    retrieveComingCallsByPredictValuesFromOneToFifty,
    retrieveComingCallsByPredictValuesFromFiftyToAHundred,  
    retrieveComingCallsByPredictValuesGreatherThanAHundredFifty
} 
from "../../../action_creators/evaluation/coming_calls_list";

type ComingCallsListState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IComingCalls {
    comingCalls: IComingCallsListResponse[];
    comingCall: IComingCallsListResponse;
    comingCallState: ComingCallsListState;
}

const initialState: IComingCalls = {
    comingCalls: [],
    comingCall: { call_id: "", phone_number: "", date: new Date('2022-01-01 01:01:01'), 
    duration: "", phone_id: "", phone_list: {} },
    comingCallState: null,
}

const comingCallsSlice = createSlice({
    name: "comingCalls",
    initialState: initialState,
    reducers: {
        resetComingCalls: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(retrieveComingCallsList.fulfilled, (state, action) => {
            state.comingCalls = action.payload;
            state.comingCallState = "SUCCESS";
        });
        builder.addCase(retrieveComingCallsList.pending, (state, action) => {
            state.comingCallState = "LOADING";
        });
        builder.addCase(retrieveComingCallsList.rejected, (state, action) => {
            state.comingCallState = "ERROR";
        });

        builder.addCase(retrieveComingCallsByPhoneNumber.fulfilled, (state, action) => {
            state.comingCalls = action.payload;
            state.comingCallState = "SUCCESS";
        });
        builder.addCase(retrieveComingCallsByPhoneNumber.pending, (state, action) => {
            state.comingCallState = "LOADING";
        });
        builder.addCase(retrieveComingCallsByPhoneNumber.rejected, (state, action) => {
            state.comingCallState = "ERROR";
        });

        builder.addCase(retrieveComingCallsByPredictValuesLessThanZero.fulfilled, 
            (state, action) => {
            state.comingCalls = action.payload;
            state.comingCallState = "SUCCESS";
        });
        builder.addCase(retrieveComingCallsByPredictValuesLessThanZero.pending, 
            (state, action) => {
            state.comingCallState = "LOADING";
        });
        builder.addCase(retrieveComingCallsByPredictValuesLessThanZero.rejected, 
            (state, action) => {
            state.comingCallState = "ERROR";
        });

        builder.addCase(retrieveComingCallsByPredictValuesEqualToZero.fulfilled, 
            (state, action) => {
            state.comingCalls = action.payload;
            state.comingCallState = "SUCCESS";
        });
        builder.addCase(retrieveComingCallsByPredictValuesEqualToZero.pending, 
            (state, action) => {
            state.comingCallState = "LOADING";
        });
        builder.addCase(retrieveComingCallsByPredictValuesEqualToZero.rejected, 
            (state, action) => {
            state.comingCallState = "ERROR";
        });

        builder.addCase(retrieveComingCallsByPredictValuesFromOneToFifty.fulfilled, 
            (state, action) => {
            state.comingCalls = action.payload;
            state.comingCallState = "SUCCESS";
        });
        builder.addCase(retrieveComingCallsByPredictValuesFromOneToFifty.pending, 
            (state, action) => {
            state.comingCallState = "LOADING";
        });
        builder.addCase(retrieveComingCallsByPredictValuesFromOneToFifty.rejected, 
            (state, action) => {
            state.comingCallState = "ERROR";
        });

        builder.addCase(retrieveComingCallsByPredictValuesFromFiftyToAHundred.fulfilled, 
            (state, action) => {
            state.comingCalls = action.payload;
            state.comingCallState = "SUCCESS";
        });
        builder.addCase(retrieveComingCallsByPredictValuesFromFiftyToAHundred.pending, 
            (state, action) => {
            state.comingCallState = "LOADING";
        });
        builder.addCase(retrieveComingCallsByPredictValuesFromFiftyToAHundred.rejected, 
            (state, action) => {
            state.comingCallState = "ERROR";
        });

        builder.addCase(retrieveComingCallsByPredictValuesGreatherThanAHundredFifty.fulfilled, 
            (state, action) => {
            state.comingCalls = action.payload;
            state.comingCallState = "SUCCESS";
        });
        builder.addCase(retrieveComingCallsByPredictValuesGreatherThanAHundredFifty.pending, 
            (state, action) => {
            state.comingCallState = "LOADING";
        });
        builder.addCase(retrieveComingCallsByPredictValuesGreatherThanAHundredFifty.rejected, 
            (state, action) => {
            state.comingCallState = "ERROR";
        });
    },
});

export const { resetComingCalls } = comingCallsSlice.actions;
export default comingCallsSlice.reducer;