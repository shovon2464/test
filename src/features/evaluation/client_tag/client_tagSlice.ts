import { createSlice } from "@reduxjs/toolkit";
import { IClientTagResponse, addClientTag, removeaClientTag, retrieveClientTagsByClientPredictValueId } from "../../../action_creators/evaluation/client_tag";

type clientTagState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IClientTagInfos {
    clientTag: IClientTagResponse;
    clientTags: IClientTagResponse[];
    clientTagStatus: clientTagState;
}

const initialState: IClientTagInfos = {
    clientTag: {tag_id: "", tag_description: "", client_predict_value_id: ""},
    clientTags: [],
    clientTagStatus: null,
}

const ClientTagsSlice = createSlice({
    name: "clientTag",
    initialState: initialState,
    reducers: {
        resetClientTag: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(addClientTag.fulfilled, (state, action) => {
            const newClientTag = action.payload;
            if (newClientTag) {
                state.clientTags = [...state.clientTags, newClientTag];
            }
            state.clientTagStatus = "SUCCESS";
        });
        builder.addCase(addClientTag.pending, (state, action) => {
            state.clientTagStatus = "LOADING";
        });
        builder.addCase(addClientTag.rejected, (state, action) => {
            state.clientTagStatus = "ERROR";
        });
        builder.addCase(retrieveClientTagsByClientPredictValueId.fulfilled, (state, action) => {
            state.clientTags = action.payload;
            state.clientTagStatus = "SUCCESS";
        });
        builder.addCase(retrieveClientTagsByClientPredictValueId.pending, (state, action) => {
            state.clientTagStatus = "LOADING";
        });
        builder.addCase(retrieveClientTagsByClientPredictValueId.rejected, (state, action) => {
            state.clientTagStatus = "ERROR";
        });
        builder.addCase(removeaClientTag.fulfilled, (state, action) => {
            let index = state.clientTags.findIndex(
                ({ tag_id }) => tag_id === action.payload
            );
            state.clientTags.splice(index, 1);
            state.clientTagStatus = "SUCCESS";
            });
            builder.addCase(removeaClientTag.pending, (state) => {
            state.clientTagStatus = "LOADING";
            });
            builder.addCase(removeaClientTag.rejected, (state) => {
            state.clientTagStatus = "ERROR";
            });
    },
});

export const { resetClientTag } = ClientTagsSlice.actions;
export default ClientTagsSlice.reducer;