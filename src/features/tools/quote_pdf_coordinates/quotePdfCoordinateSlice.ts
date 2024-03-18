import { createSlice } from "@reduxjs/toolkit";
import {
  IQuotePdfCoordinatesResponse,
  createNewQuotePdfCoordinates,
  deleteQuotePdfCoordinates,
  retrieveEachQuotePdfCoordinates,
  retrieveQuotesPdfCoordinatesList,
} from "../../../action_creators/tools/quote_pdf_coordinates/quote_pdf_coordinates";

type QuotePdfStatus = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IQuotePdf {
  quotePdfCoordinates: IQuotePdfCoordinatesResponse[];
  quotePdfCoordinate: IQuotePdfCoordinatesResponse;
  quotePdfStatus: QuotePdfStatus;
  message: string;
  pdfPageCoordinates: string[];
  pdfPageMsg: string;
}

const initialState: IQuotePdf = {
  quotePdfCoordinates: [],
  quotePdfCoordinate: {} as IQuotePdfCoordinatesResponse,
  quotePdfStatus: null,
  pdfPageCoordinates: [],
  message: "",
  pdfPageMsg: "",
};

const quotePdfCoordinateSlice = createSlice({
  name: "quotePdfInfoList",
  initialState: initialState,
  reducers: {
    addPdfPageCoordinate: (state, { payload, type }) => {
      if (payload && typeof payload === "string") {
        state.pdfPageCoordinates = [...state.pdfPageCoordinates, payload];
        state.pdfPageMsg = "A New Coordinate Added";
      } else {
        state.pdfPageMsg = "Coordinate cannot be empty";
      }
    },
    removePdfPageCoordinate: (state, { payload, type }) => {
      let index = parseInt(payload);
      state.pdfPageCoordinates.slice(index, 1);
      state.pdfPageMsg = "A Coordinate Successfully Deleted!";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      retrieveQuotesPdfCoordinatesList.fulfilled,
      (state, action) => {
        state.quotePdfCoordinates = action.payload;
        state.quotePdfStatus = "SUCCESS";
        state.message = "Quote PDF List retrieved!";
      }
    );
    builder.addCase(retrieveQuotesPdfCoordinatesList.pending, (state) => {
      state.quotePdfStatus = "LOADING";
      state.message = "List is loading!";
    });
    builder.addCase(retrieveQuotesPdfCoordinatesList.rejected, (state) => {
      state.quotePdfStatus = "ERROR";
      state.message = "Data Fetch Failed";
    });

    builder.addCase(
      retrieveEachQuotePdfCoordinates.fulfilled,
      (state, action) => {
        state.quotePdfCoordinate = action.payload;
        state.quotePdfStatus = "SUCCESS";
        state.message = "A Quote PDF retrieved!";
      }
    );
    builder.addCase(retrieveEachQuotePdfCoordinates.pending, (state) => {
      state.quotePdfStatus = "LOADING";
      state.message = "This quote pdf is loading!";
    });
    builder.addCase(retrieveEachQuotePdfCoordinates.rejected, (state) => {
      state.quotePdfStatus = "ERROR";
      state.message = "Data Fetch Failed";
    });
    builder.addCase(createNewQuotePdfCoordinates.fulfilled, (state, action) => {
      const newQuotePdfInfo = action.payload;
      if (newQuotePdfInfo) {
        state.quotePdfCoordinates = [
          ...state.quotePdfCoordinates,
          action.payload,
        ];
        state.message = "New Quote Pdf Info Created";
        state.quotePdfStatus = "SUCCESS";
      } else {
        state.message = "New Quote Pdf Info is empty";
        state.quotePdfStatus = "ERROR";
      }
    });
    builder.addCase(createNewQuotePdfCoordinates.pending, (state) => {
      state.message = "Creating new quote pdf info";
      state.quotePdfStatus = "LOADING";
    });
    builder.addCase(createNewQuotePdfCoordinates.rejected, (state) => {
      state.message = "Data Fetch Failed";
      state.quotePdfStatus = "ERROR";
    });
    builder.addCase(deleteQuotePdfCoordinates.fulfilled, (state, action) => {
      let index = state.quotePdfCoordinates.findIndex(
        ({ QuotePDF_Id }) => QuotePDF_Id === action.payload.deleteQuotePdfId
      );
      state.quotePdfCoordinates.splice(index, 1);
      state.quotePdfStatus = "SUCCESS";
      state.message = "Quote Pdf Info Deleted";
    });
    builder.addCase(deleteQuotePdfCoordinates.pending, (state) => {
      state.quotePdfStatus = "LOADING";
      state.message = "Quote Pdf Info is deleting";
    });
    builder.addCase(deleteQuotePdfCoordinates.rejected, (state) => {
      state.quotePdfStatus = "ERROR";
      state.message = "Delete Failed";
    });
  },
});

export const { addPdfPageCoordinate, removePdfPageCoordinate } =
  quotePdfCoordinateSlice.actions;
export default quotePdfCoordinateSlice.reducer;
