import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../features/evaluation/msgSlice";
import {
  getAllComingCallsByPredictValuesEqualToZero,
  getAllComingCallsByPredictValuesFromFiftyToAHundred,
  getAllComingCallsByPredictValuesFromOneToFifty,
  getAllComingCallsByPredictValuesGreatherThanAHundredFifty,
  getAllComingCallsByPredictValuesLessThanZero,
  getAllComingCallsList,
  getCRMComingCalls,
  getComingCallsByPhoneNumber,
} from "../../services/evaluation/coming_calls";

export interface IComingCallsListResponse {
  call_id: string;
  phone_number: string;
  date: Date;
  duration: string;
  phone_id?: string;
  phone_list?: IPhoneList;
  client?: IClientPredictValue;
}

export interface IPhoneList {
  phone_id?: string;
  phone_number?: string;
  client_predict_value_id?: string;
  client_predict_value?: IClientPredictValue;
}

export interface IClientPredictValue {
  client_predict_value_id?: string;
  client_name?: string;
  predict_value?: number;
  client_tag?: [IClientTag];
}

export interface IClientTag {
  tag_id?: string;
  tag_description?: string;
  client_predict_value_id?: string;
}

export interface IComingCallList extends IClientPredictValue {
  phone_number: string;
  client_name: string;
  predict_value: number;
  date: Date;
  duration: string;
  id: string;
}

export interface ICRMComingCall {
  name: string;
  phone_number: string;
  datetime: string;
  duration: string;
  recordingURL: string;
}

export interface ICRMComingCallWithPredictVal {
  name: string;
  predict_value: number;
  phone_number: string;
  datetime: string;
  duration: string;
  recordingURL: string;
}

export const retrieveComingCallsList = createAsyncThunk<
  IComingCallsListResponse[],
  unknown
>("comingCalls/getComingCallsList", async (_, thunkAPI) => {
  try {
    const comingcalls = await getAllComingCallsList();
    if (comingcalls.data) {
      thunkAPI.dispatch(setMessage("Coming calls list retrieved."));
      const coming_calls_list: IComingCallsListResponse[] =
        comingcalls.data.findAllComingCallsWithClienInfos;
      return coming_calls_list;
    } else {
      const errorMsg: string = comingcalls.error[0].message.toString();
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
});

export const retrieveComingCallsByPhoneNumber = createAsyncThunk<
  IComingCallsListResponse[],
  string
>("comingCalls/getComingCallsByPhoneNumber", async (phone_number, thunkAPI) => {
  try {
    const response = await getComingCallsByPhoneNumber(phone_number);
    if (response.data) {
      thunkAPI.dispatch(setMessage("Coming Calls retrieved."));
      const coming_calls_found_by_number: IComingCallsListResponse[] =
        response.data.findComingCallsByPhoneNumber;
      return coming_calls_found_by_number;
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
});

export const retrieveComingCallsByPredictValuesLessThanZero = createAsyncThunk<
  IComingCallsListResponse[],
  unknown
>(
  "comingCalls/getAllComingCallsByPredictValuesLessThanZero",
  async (_, thunkAPI) => {
    try {
      const comingcalls = await getAllComingCallsByPredictValuesLessThanZero();
      if (comingcalls.data) {
        thunkAPI.dispatch(setMessage("Coming calls list retrieved."));
        const coming_calls_list: IComingCallsListResponse[] =
          comingcalls.data.findAllComingCallsByPredictValuesLessThanZero;
        return coming_calls_list;
      } else {
        const errorMsg: string = comingcalls.error[0].message.toString();
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

export const retrieveComingCallsByPredictValuesEqualToZero = createAsyncThunk<
  IComingCallsListResponse[],
  unknown
>(
  "comingCalls/getAllComingCallsByPredictValuesEqualToZero",
  async (_, thunkAPI) => {
    try {
      const comingcalls = await getAllComingCallsByPredictValuesEqualToZero();
      if (comingcalls.data) {
        thunkAPI.dispatch(setMessage("Coming calls list retrieved."));
        const coming_calls_list: IComingCallsListResponse[] =
          comingcalls.data.findAllComingCallsByPredictValuesEqualToZero;
        return coming_calls_list;
      } else {
        const errorMsg: string = comingcalls.error[0].message.toString();
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

export const retrieveComingCallsByPredictValuesFromOneToFifty =
  createAsyncThunk<IComingCallsListResponse[], unknown>(
    "comingCalls/getAllComingCallsByPredictValuesFromOneToFifty",
    async (_, thunkAPI) => {
      try {
        const comingcalls =
          await getAllComingCallsByPredictValuesFromOneToFifty();
        if (comingcalls.data) {
          thunkAPI.dispatch(setMessage("Coming calls list retrieved."));
          const coming_calls_list: IComingCallsListResponse[] =
            comingcalls.data.findAllComingCallsByPredictValuesFromOneToFifty;
          return coming_calls_list;
        } else {
          const errorMsg: string = comingcalls.error[0].message.toString();
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

export const retrieveComingCallsByPredictValuesFromFiftyToAHundred =
  createAsyncThunk<IComingCallsListResponse[], unknown>(
    "comingCalls/getAllComingCallsByPredictValuesFromFiftyToAHundred",
    async (_, thunkAPI) => {
      try {
        const comingcalls =
          await getAllComingCallsByPredictValuesFromFiftyToAHundred();
        if (comingcalls.data) {
          thunkAPI.dispatch(setMessage("Coming calls list retrieved."));
          const coming_calls_list: IComingCallsListResponse[] =
            comingcalls.data
              .findAllComingCallsByPredictValuesFromFiftyToAHundred;
          return coming_calls_list;
        } else {
          const errorMsg: string = comingcalls.error[0].message.toString();
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

export const retrieveComingCallsByPredictValuesGreatherThanAHundredFifty =
  createAsyncThunk<IComingCallsListResponse[], unknown>(
    "comingCalls/getAllComingCallsByPredictValuesGreatherThanAHundredFifty",
    async (_, thunkAPI) => {
      try {
        const comingcalls =
          await getAllComingCallsByPredictValuesGreatherThanAHundredFifty();
        if (comingcalls.data) {
          thunkAPI.dispatch(setMessage("Coming calls list retrieved."));
          const coming_calls_list: IComingCallsListResponse[] =
            comingcalls.data
              .findAllComingCallsByPredictValuesGreatherThanAHundredFifty;
          return coming_calls_list;
        } else {
          const errorMsg: string = comingcalls.error[0].message.toString();
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

export const retrieveCRMComingCalls = createAsyncThunk<
  ICRMComingCall[],
  unknown
>("comingCalls/getCRMComingCalls", async (_, thunkAPI) => {
  try {
    const CRMComingCalls = await getCRMComingCalls();
    if (CRMComingCalls.data) {
      thunkAPI.dispatch(setMessage("Coming call list retrieved from CRM."));
      const crm_coming_call_list: ICRMComingCall[] =
        CRMComingCalls.data.findComingCalls;
      return crm_coming_call_list;
    } else {
      const errorMsg: string = CRMComingCalls.error[0].message.toString();
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
});
