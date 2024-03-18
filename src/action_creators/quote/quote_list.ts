import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  areAllQuotesViewed,
  deleteQuote,
  getAllQuotes,
  getAllQuotesList,
  getQuotes,
  setViewed,
  fetchAndInsertWebQuote
} from "../../services/quote/quote";
import { setQuoteMessage } from "../../features/quote/quoteMsgSlice";
import { setAllQuoteMessage } from "../../features/quote/quote_list/allQuoteMsgSlice";
import { IDeleteStatus } from "../../interfaces/dropdown_type/IDeleteStatus";
import { setDropdownTypeMessage } from "../../features/tools/dropdownTypeMsgSlice";
import { number } from "yup";
import { useDispatch } from "react-redux";

export interface IQuoteListResponse {
  FullName: string;
  PhoneNumber: string;
  Email: string;
  Address1: string;
  Address2: string;
  PostalCode: string;
  SubmitDate: string;
  QuoteDetail: string;
  Type: number;
  Viewed: number;
  QuoteId?: string;
}

export interface IQuickQuoteResponse {
  FullName: string;
  Email: string;
  PhoneNumber: string;
  Address1: string;
  Address2: string;
  PostalCode: string;
  SubmitDate: string;
  QuoteDetail: string;
  Type: number;
  Viewed: number;
}

export interface IDeleteQuote extends IDeleteStatus {
  Type: number;
  FullName: string;
  SubmitDate: string;
}

export interface IDeleteInfo {
  Type: number;
  FullName: string;
  SubmitDate: string;
}

export interface ISetViewed {
  Type: number;
  Viewed: number;
  FullName: string;
  SubmitDate: string;
}

export interface WebQuoteResponse {
  Status: boolean;
  Message: string;
}

export const retrieveQuotesList = createAsyncThunk<
  IQuoteListResponse[],
  unknown
>("quoteList/getQuoteList", async (_, thunkAPI) => {
  try {
    const response = await getAllQuotesList();
    if (response.data) {
      thunkAPI.dispatch(setQuoteMessage("Quote List Retrieved!"));
      const quote_list: IQuoteListResponse[] = response.data.findAllQuotesInfo;
      return quote_list;
    } else {
      const errorMsg: string = response.errors[0].message.toString();
      thunkAPI.dispatch(setQuoteMessage(errorMsg));
      return thunkAPI.rejectWithValue(errorMsg);
    }
  } catch (e: any) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.response.errors ||
      e.toString();
    thunkAPI.dispatch(setQuoteMessage(message));
    console.log("Error", e.response.errors);
    return thunkAPI.rejectWithValue(message);
  }
});

export const removeQuote = createAsyncThunk<IDeleteQuote, IDeleteInfo>(
  "quoteList/deleteQuote",
  async (info: IDeleteInfo, thunkAPI) => {
    try {
      const response = await deleteQuote(info.FullName, info.SubmitDate);
      // console.log(response);

      if (response.data.deleteQuotesFromDB.Status) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted quote"));
        const deleteQuote: IDeleteQuote = {
          Type: info.Type,
          FullName: info.FullName,
          SubmitDate: info.SubmitDate,
          Status: response.data.deleteQuotesFromDB.Status,
          Message: response.data.deleteQuotesFromDB.Message,
        };
        
        return deleteQuote;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setDropdownTypeMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const retrieveAllQuotes = createAsyncThunk<IQuickQuoteResponse[], unknown>(
  "quote/getAllQuotes",
  async (_, thunkAPI) => {
    try {
      const response = await getAllQuotes();
      if (response.data) {
        thunkAPI.dispatch(setAllQuoteMessage("All quotes retrieved!"));
        const all_quote: IQuickQuoteResponse[] = response.data.findAllQuotes;
        return all_quote;
      } else {
        const errorMsg: string = response.error[0].message.toString();
        thunkAPI.dispatch(setAllQuoteMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setQuoteMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const retrieveQuotes = createAsyncThunk<IQuoteListResponse[], number>(
  "quote/getQuotes",
  async (webOrQuick: number, thunkAPI) => {
    try {
      const response = await getQuotes(webOrQuick);
      if (response.data) {
        thunkAPI.dispatch(setAllQuoteMessage("All quotes retrieved!"));
        const allQuotes: IQuoteListResponse[] = response.data.findQuotes;
        return allQuotes;
      } else {
        const errorMsg: string = response.error[0].message.toString();
        thunkAPI.dispatch(setAllQuoteMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setQuoteMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateViewed = createAsyncThunk<ISetViewed, ISetViewed>(
  "quoteList/setViewed",
  async (info: ISetViewed, thunkAPI) => {
    try {
      const response = await setViewed(info.FullName, info.SubmitDate);
      // console.log("response here", response);
      if (response.data.setViewed) {
        thunkAPI.dispatch(setDropdownTypeMessage("Set as read."));
        const setViewed: ISetViewed = {
          Type: info.Type,
          Viewed: info.Viewed,
          FullName: info.FullName,
          SubmitDate: info.SubmitDate,
        };
        // console.log("setviewed", setViewed);
        return setViewed;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.response.errors ||
      e.toString();
    thunkAPI.dispatch(setDropdownTypeMessage(message));
    console.log("Error", e.response.errors);
    return thunkAPI.rejectWithValue(message);
    }
  }
)

export const areAllViewed = createAsyncThunk<boolean, unknown>(
  "quoteList/areAllViewed",
  async(_, thunkAPI) => {
    try {
      const response = await areAllQuotesViewed();
      if (response.data.areAllQuotesViewed) {
        thunkAPI.dispatch(setDropdownTypeMessage("Set as read."));
        let ans: boolean;
        ans = response.data.areAllQuotesViewed.Result;
        return ans;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.response.errors ||
      e.toString();
    thunkAPI.dispatch(setDropdownTypeMessage(message));
    console.log("Error", e.response.errors);
    return thunkAPI.rejectWithValue(message);
    }
  }
)

export const fetchAndSaveWebQuotesListIntoDB = createAsyncThunk<
  WebQuoteResponse,
  unknown
>("quoteList/insertWebQuote", async (_, thunkAPI) => {
  try {
    const response = await fetchAndInsertWebQuote();
    if (response.data) {
      thunkAPI.dispatch(setQuoteMessage("Web Quote List Fetched And Saved On Database!"));
      const web_quote_response: WebQuoteResponse = response.data.insertWebQuote;
      return web_quote_response;
    } else {
      const errorMsg: string = response.errors[0].message.toString();
      thunkAPI.dispatch(setQuoteMessage(errorMsg));
      return thunkAPI.rejectWithValue(errorMsg);
    }
  } catch (e: any) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.response.errors ||
      e.toString();
    thunkAPI.dispatch(setQuoteMessage(message));
    console.log("Error", e.response.errors);
    return thunkAPI.rejectWithValue(message);
  }
});