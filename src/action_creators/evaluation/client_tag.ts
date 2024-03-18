import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewClientTag, deleteClientTag, getClientTagsByClientPredictValueId } from "../../services/evaluation/client_tag";
import { setMessage } from "../../features/evaluation/msgSlice";


export interface IClientTagResponse {
    tag_id?: string;
    tag_description: string;
    client_predict_value_id: string;
}

export const addClientTag = createAsyncThunk<
IClientTagResponse,
IClientTagResponse
>(
    "clientTag/addNewClientTag",
    async (client_tag_info: IClientTagResponse, thunkAPI) => {
    try {
            const response = await addNewClientTag(client_tag_info);
            if (response.data) {
                thunkAPI.dispatch(setMessage("Client Tag added."));
                const clientTagAdded: IClientTagResponse = 
                response.data.createClient_tag;
                return clientTagAdded;
            } else {
                const errorMsg: string = response.error[0].message.toString();
                thunkAPI.dispatch(setMessage(errorMsg));
                return thunkAPI.rejectWithValue(errorMsg);
            }
        } catch (e: any) {
        const message =
            (e.response && e.response.data && e.response.data.message) ||
            e.message ||
            e.toString();
        thunkAPI.dispatch(setMessage(message));
        console.log("Error", e.response.data);
        return thunkAPI.rejectWithValue(message);
        }
    }
);

export const retrieveClientTagsByClientPredictValueId = createAsyncThunk<
IClientTagResponse [],
string
>(
    "clientTag/getClientTagsByClientPredictValueId",
    async (client_predict_value_id, thunkAPI) => {
        try {
            const response = 
            await getClientTagsByClientPredictValueId(client_predict_value_id);
            if(response.data) {
                thunkAPI.dispatch(setMessage("Client Tags retrieved."));
                const client_tag_found_by_client_id: IClientTagResponse [] = 
                response.data.findAllClientTagsByClientPredictValueId;
                return client_tag_found_by_client_id;
            } else {
                const errorMsg: string = response.error[0].message.toString();
                thunkAPI.dispatch(setMessage(errorMsg));
                return thunkAPI.rejectWithValue(errorMsg);
            }
        } catch (e: any) {
            const message = 
            (e.response && e.response.data && e.response.data.message) ||
            e.message ||
            e.toString();
            thunkAPI.dispatch(setMessage(message));
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const removeaClientTag = createAsyncThunk<string, string>(
    "clientTag/deleteClientTag",
    async (tag_id: string, thunkAPI) => {
    try {
            const response = await deleteClientTag(tag_id);
            if (response.data.deleteClientTag.Status) {
                thunkAPI.dispatch(setMessage("Client Tag deleted."));
                return tag_id;
            } else {
                const errorMsg: string = response.error[0].message.toString();
                thunkAPI.dispatch(setMessage(errorMsg));
                return thunkAPI.rejectWithValue(errorMsg);
            }
        } catch (e: any) {
        const message =
            (e.response && e.response.data && e.response.data.message) ||
            e.message ||
            e.toString();
        thunkAPI.dispatch(setMessage(message));
        console.log("Error", e.response.data);
        return thunkAPI.rejectWithValue(message);
        }
    }
);