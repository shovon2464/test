import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTicketMessage } from "../../../features/ticket/ticketMsgSlice";
import {
  getAllTicketCommentsByTicketID,
  addNewTicketComment,
  uploadNewTicketCommentFile
} from "../../../services/ticket/ticket_comments/ticket_comments";

export interface ITicketCommentsRequest {
  Comment?: string;
  Ticket_Id: string;
  Comment_By: string;
  File_URL?: string;
}

export interface ITicketCommentsResponse extends ITicketCommentsRequest {
  Ticket_Comment_Id: string;
  Comment_Date: Date | string;
}

export const retrieveAllTicketCommentsByTicketId = createAsyncThunk<
  ITicketCommentsResponse[],
  ITicketCommentsRequest
>("ticketCommentsList/getTicketCommentsByTicketId",
  async (data: ITicketCommentsRequest, thunkAPI) => {
    try {
      const response =
        await getAllTicketCommentsByTicketID(data.Ticket_Id, data.Comment_By);
      if (response.data) {
        thunkAPI.dispatch(setTicketMessage("Ticket Comments Retrieved!"));
        const ticketComments: ITicketCommentsResponse[] =
          response.data.findAllTicketCommentsByTicketID;
        return ticketComments;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setTicketMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setTicketMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  });

export const createNewTicketComment = createAsyncThunk<
  ITicketCommentsResponse,
  ITicketCommentsRequest
>("ticketCommentsList/addTicketComment",
  async (data: ITicketCommentsRequest, thunkAPI) => {
    try {
      const response = await addNewTicketComment(data);
      if (response.data) {
        thunkAPI.dispatch(setTicketMessage("New Ticket Comment Created!"));
        const newTicketComment: ITicketCommentsResponse =
          response.data.createTicketComment.Ticket_Comments;
        return newTicketComment;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setTicketMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setTicketMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  });

export const addNewTicketCommentFile = createAsyncThunk<
  ITicketCommentsResponse,
  ITicketCommentsRequest
>("ticketCommentsList/uploadTicketCommentFile",
  async (data: ITicketCommentsRequest, thunkAPI) => {
    try {
      const response = await uploadNewTicketCommentFile(data);
      if (response.data) {
        thunkAPI.dispatch(setTicketMessage("New Ticket Comment File Uploaded!"));
        const newTicketCommentFile: ITicketCommentsResponse =
          response.data.uploadTicketCommentFile.Ticket_Comments;
        return newTicketCommentFile;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setTicketMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setTicketMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  });