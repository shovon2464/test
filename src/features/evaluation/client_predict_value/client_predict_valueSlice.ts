import { createSlice } from "@reduxjs/toolkit";
import { IClientPredictValueResponse, retrieveClientInfoByClientPredictValueId, retrieveClientInfoByPhoneNumber } from "../../../action_creators/evaluation/client_predict_value";

type clientState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IClientInfos {
    client: IClientPredictValueResponse;
    clients: IClientPredictValueResponse[];
    clientStatus: clientState;
}

const initialState: IClientInfos = {
    client: {client_name: "", predict_value: 0, client_predict_value_id: "", client_tag: [{}]},
    clients: [],
    clientStatus: null,
}

const ClientInfosSlice = createSlice({
    name: "clientPredicValue",
    initialState: initialState,
    reducers: {
        resetClient: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(retrieveClientInfoByPhoneNumber.fulfilled, (state, action) => {
            state.clients = action.payload;
            state.clientStatus = "SUCCESS";
        });
        builder.addCase(retrieveClientInfoByPhoneNumber.pending, (state, action) => {
            state.clientStatus = "LOADING";
        });
        builder.addCase(retrieveClientInfoByPhoneNumber.rejected, (state, action) => {
            state.clientStatus = "ERROR";
            state.clients = [];
        });
        builder.addCase(retrieveClientInfoByClientPredictValueId.fulfilled, (state, action) => {
            state.clients = action.payload;
            state.clientStatus = "SUCCESS";
        });
        builder.addCase(retrieveClientInfoByClientPredictValueId.pending, (state, action) => {
            state.clientStatus = "LOADING";
        });
        builder.addCase(retrieveClientInfoByClientPredictValueId.rejected, (state, action) => {
            state.clientStatus = "ERROR";
        });
    },
});

export const { resetClient } = ClientInfosSlice.actions;
export default ClientInfosSlice.reducer;