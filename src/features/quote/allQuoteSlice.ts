import { createSlice } from "@reduxjs/toolkit";
import {
  IQuickQuoteResponse,
  removeQuote,
  retrieveAllQuotes,
} from "../../action_creators/quote/quote_list";

type AllQuoteState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IAllQuoteList {
  allQuotes: IQuickQuoteResponse[];
  allQuote: IQuickQuoteResponse;
  allQuoteState: AllQuoteState;
}

const initialState: IAllQuoteList = {
  allQuote: {
    FullName: "",
    Email: "",
    PhoneNumber: "",
    Address1: "", //address
    Address2: "", //postal code
    PostalCode: "",
    SubmitDate: "",
    QuoteDetail: "",
    Type: 0,
    Viewed: 0,
  },
  allQuotes: [],
  allQuoteState: null,
};

const allQuoteSlice = createSlice({
  name: "allQuote",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveAllQuotes.fulfilled, (state, action) => {
      state.allQuotes = action.payload;
      state.allQuoteState = "SUCCESS";
    });
    builder.addCase(retrieveAllQuotes.pending, (state, action) => {
      state.allQuoteState = "LOADING";
    });
    builder.addCase(retrieveAllQuotes.rejected, (state, action) => {
      state.allQuoteState = "ERROR";
    });
    // builder.addCase(removeQuote.fulfilled, (state, action) => {
    //   let index = state.allQuotes.findIndex(
    //     ({ FullName }) => FullName === action.payload.FullName
    //   );
    //   state.allQuotes.splice(index, 1);
    //   state.allQuoteState = "SUCCESS";
    // });
    // builder.addCase(removeQuote.pending, (state) => {
    //   state.allQuoteState = "LOADING";
    // });
    // builder.addCase(removeQuote.rejected, (state) => {
    //   state.allQuoteState = "ERROR";
    // });
  },
});

export default allQuoteSlice.reducer;
