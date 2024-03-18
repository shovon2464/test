import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";
import {
  createNewQuotePdfInfo,
  getAQuotePdfInfoById,
  getAllQuotePdfInfo,
  removeQuotePdfInfoById,
} from "../../../services/tools/quote_pdf_coordinates/quote_pdf_coordinates";
import { setQuoteMessage } from "../../../features/quote/quoteMsgSlice";

interface IDeleteQuotePdfInfo {
  deleteQuotePdfId: string;
  deleteStatus: IDeleteStatus;
}

export interface IQuotePdfCoordinatesRequest {
  QuotePDF_Name: string;
  QuotePDF_Store_Path: string;
  Company_From: string;
  PDF_Coordinates: string;
}

export interface IQuotePdfCoordinatesResponse
  extends IQuotePdfCoordinatesRequest {
  QuotePDF_Id: string;
}

export const retrieveQuotesPdfCoordinatesList = createAsyncThunk<
  IQuotePdfCoordinatesResponse[],
  unknown
>("quotePdfInfoList/getQuotePdfInfo", async (_, thunkAPI) => {
  try {
    const response = await getAllQuotePdfInfo();
    if (response.data) {
      thunkAPI.dispatch(
        setQuoteMessage("Quote Pdf Coordinates List Retrieved!")
      );
      const quote_pdf_coordinates: IQuotePdfCoordinatesResponse[] =
        response.data.findAllQuotePdfCoordinates;
      return quote_pdf_coordinates;
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

export const retrieveEachQuotePdfCoordinates = createAsyncThunk<
  IQuotePdfCoordinatesResponse,
  string
>(
  "quotePdfInfoList/getEachQuotePdfInfo",
  async (quote_pdf_Id: string, thunkAPI) => {
    try {
      const response = await getAQuotePdfInfoById(quote_pdf_Id);
      if (response.data) {
        thunkAPI.dispatch(
          setQuoteMessage("A Quote Pdf Coordinates Retrieved!")
        );
        const quote_pdf_coordinates: IQuotePdfCoordinatesResponse =
          response.data.findQuotePdfCoordinateById;
        return quote_pdf_coordinates;
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
  }
);

export const createNewQuotePdfCoordinates = createAsyncThunk<
  IQuotePdfCoordinatesResponse,
  IQuotePdfCoordinatesRequest
>(
  "quotePdfInfoList/addQuotePdfInfo",
  async (quote_pdf_info: IQuotePdfCoordinatesRequest, thunkAPI) => {
    try {
      const response = await createNewQuotePdfInfo(quote_pdf_info);
      if (response.data) {
        thunkAPI.dispatch(setQuoteMessage("A Quote Pdf Coordinates Created!"));
        const quote_pdf_coordinates: IQuotePdfCoordinatesResponse =
          response.data.createNewQuotePdfCoordinates;
        return quote_pdf_coordinates;
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
  }
);

export const deleteQuotePdfCoordinates = createAsyncThunk<
  IDeleteQuotePdfInfo,
  string
>(
  "quotePdfInfoList/deleteQuotePdfInfo",
  async (quote_pdf_id: string, thunkAPI) => {
    try {
      const response = await removeQuotePdfInfoById(quote_pdf_id);
      if (response.data.deleteQuotePdfCoordinates.Status) {
        thunkAPI.dispatch(
          setQuoteMessage("This Quote Pdf Coordinates Removed!")
        );
        const deleteQuotePdfCoordinates: IDeleteQuotePdfInfo = {
          deleteQuotePdfId: quote_pdf_id,
          deleteStatus: {
            Status: response.data.deleteQuotePdfCoordinates.Status,
            Message: response.data.deleteQuotePdfCoordinates.Message,
          },
        };
        return deleteQuotePdfCoordinates;
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
  }
);
