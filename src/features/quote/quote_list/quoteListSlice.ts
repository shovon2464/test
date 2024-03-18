import { createSlice } from "@reduxjs/toolkit";
import {
  retrieveQuotesList,
  IQuoteListResponse,
  retrieveQuotes,
  removeQuote,
  updateViewed,
  areAllViewed,
  fetchAndSaveWebQuotesListIntoDB
} from "../../../action_creators/quote/quote_list";

type QuoteListState = "SUCCESS" | "LOADING" | "ERROR" | null;
export interface IQuoteList {
  // quotes: IQuoteListResponse[];
  quickQuotes: IQuoteListResponse[];
  webQuotes: IQuoteListResponse[];
  quote: IQuoteListResponse;
  areAllQuotesViewed: boolean;
  areWebQuotesFetchAndSaved: boolean;
  quoteState: QuoteListState;
}

const initialState: IQuoteList = {
  quote: {
    Address1: "",
    Address2: "",
    Email: "",
    FullName: "",
    PhoneNumber: "",
    PostalCode: "",
    SubmitDate: "",
    QuoteDetail: "",
    Type: 0,
    Viewed: 0,
    QuoteId: ""
  },
  // quotes: [],
  quickQuotes: [],
  webQuotes: [],
  areAllQuotesViewed: true,
  areWebQuotesFetchAndSaved: true,
  quoteState: null,
};

const quoteListSlice = createSlice({
  name: "quoteList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveQuotes.fulfilled, (state, action) => {
      // console.log(action.meta);
      if (action.meta.arg === 0) {
        state.webQuotes = action.payload;
      } else {
        state.quickQuotes = action.payload;
      }
      state.quoteState = "SUCCESS";
    });
    builder.addCase(retrieveQuotes.pending, (state, action) => {
      state.quoteState = "LOADING";
    });
    builder.addCase(retrieveQuotes.rejected, (state, action) => {
      state.quoteState = "ERROR";
    });


    builder.addCase(removeQuote.fulfilled, (state, action) => {
      if (action.payload.Type === 0) {
        
        let index = state.webQuotes.findIndex(
          (webQuotes) => 
          webQuotes.FullName === action.payload.FullName &&
          webQuotes.SubmitDate === action.payload.SubmitDate
        );
        state.webQuotes.splice(index, 1);
      } else {
        let index = state.quickQuotes.findIndex(
          (quickQuotes) => 
          quickQuotes.FullName === action.payload.FullName &&
          quickQuotes.SubmitDate === action.payload.SubmitDate
        );
        state.quickQuotes.splice(index, 1);
      }
      state.quoteState = "SUCCESS";
    });
    builder.addCase(removeQuote.pending, (state, action) => {
      state.quoteState = "LOADING";
    });
    builder.addCase(removeQuote.rejected, (state, action) => {
      state.quoteState = "ERROR";
    })
    

    builder.addCase(updateViewed.fulfilled, (state, action) => {

      if (action.payload.Type === 0) {
        let index = state.webQuotes.findIndex(
          (webQuotes) =>
          webQuotes.FullName === action.payload.FullName &&
          webQuotes.SubmitDate === action.payload.SubmitDate
        );
        state.webQuotes[index].Viewed = action.payload.Viewed;
        // console.log("web", state.webQuotes);
      } else {
        let index = state.quickQuotes.findIndex(
          (quickQuotes) => 
          quickQuotes.FullName === action.payload.FullName &&
          quickQuotes.SubmitDate === action.payload.SubmitDate
        );
        state.quickQuotes[index].Viewed = action.payload.Viewed;
        state.quickQuotes.forEach(quote => {
          console.log(quote.Viewed);
        })
      }
      state.quoteState = "SUCCESS";
    });
    builder.addCase(updateViewed.pending, (state, action) => {
      state.quoteState = "LOADING";
    });
    builder.addCase(updateViewed.rejected, (state, action) => {
      state.quoteState = "ERROR";
    });
    builder.addCase(areAllViewed.fulfilled, (state, action) => {
      state.areAllQuotesViewed = action.payload;
      state.quoteState = "SUCCESS";
    });
    builder.addCase(areAllViewed.pending, (state, action) => {
      state.quoteState = "LOADING";
    });
    builder.addCase(areAllViewed.rejected, (state, action) => {
      state.quoteState = "ERROR";
    });
    builder.addCase(fetchAndSaveWebQuotesListIntoDB.fulfilled, (state, action) => {
      state.areWebQuotesFetchAndSaved = action.payload.Status;
      state.quoteState = "SUCCESS";
    });
    builder.addCase(fetchAndSaveWebQuotesListIntoDB.pending, (state, action) => {
      state.quoteState = "LOADING";
    });
    builder.addCase(fetchAndSaveWebQuotesListIntoDB.rejected, (state, action) => {
      state.quoteState = "ERROR";
    });
  },
});

export default quoteListSlice.reducer;
