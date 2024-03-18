import { createAsyncThunk } from "@reduxjs/toolkit";

import { setMessage } from "../../features/evaluation/msgSlice";
import { getClientInfoByClientPredictValueId, getClientInfoByPhoneNumber } from "../../services/evaluation/client_predict_value";

export interface IClientPredictValueResponse {
    client_predict_value_id: string;
    client_name: string;
    predict_value: number;
    client_tag?: [IClientTag];
}

export interface IClientTag {
    tag_id?: string;
    tag_description?: string;
    client_predict_value_id?: string;
}

export const retrieveClientInfoByPhoneNumber = createAsyncThunk<IClientPredictValueResponse [],
    string>(
    "clientPredicValue/getClientInfoByPhoneNumber",
    async (phone_number, thunkAPI) => {
        try {
            const response = await getClientInfoByPhoneNumber(phone_number);
            // console.log(response);
            if(response.data) {
                thunkAPI.dispatch(setMessage("Client Info retrieved."));
                const client_found_by_phone_number: IClientPredictValueResponse [] = 
                response.data.findClientNameByPhoneNumber;
                return client_found_by_phone_number;
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

export const retrieveClientInfoByClientPredictValueId = 
createAsyncThunk<IClientPredictValueResponse [], string>(
    "clientPredicValue/getClientInfoByClientPredictValueId",
    async (client_predict_value_id, thunkAPI) => {
        try {
            const response = 
            await getClientInfoByClientPredictValueId(client_predict_value_id);
            if(response.data) {
                thunkAPI.dispatch(setMessage("Client Info retrieved."));
                const client_found_by_client_predict_value_id: IClientPredictValueResponse [] = 
                response.data.findClientNameByClientPredictValueId;
                return client_found_by_client_predict_value_id;
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