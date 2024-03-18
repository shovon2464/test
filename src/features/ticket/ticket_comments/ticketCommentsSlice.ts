import { createSlice } from "@reduxjs/toolkit";
import {
  ITicketCommentsResponse,
  retrieveAllTicketCommentsByTicketId,
  createNewTicketComment,
  addNewTicketCommentFile
} from "../../../action_creators/ticket/ticket_comments/ticket_comments";

type TicketCommentState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ITicketComments {
  ticketComments: ITicketCommentsResponse[];
  ticketComment: ITicketCommentsResponse;
  ticketCommentState: TicketCommentState;
}

const initialState: ITicketComments = {
  ticketComment: {
    Ticket_Comment_Id: "",
    Comment_Date: "",
    Ticket_Id: "",
    Comment_By: "",
    Comment: "",
    File_URL: ""
  },
  ticketComments: [],
  ticketCommentState: null,
};

const ticketCommentsSlice = createSlice({
  name: "ticketCommentsList",
  initialState: initialState,
  reducers: {
    clearTicketComments: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveAllTicketCommentsByTicketId.fulfilled, (state, action) => {
      state.ticketComments = action.payload;
      state.ticketCommentState = "SUCCESS";
    });
    builder.addCase(retrieveAllTicketCommentsByTicketId.pending, (state) => {
      state.ticketCommentState = "LOADING";
    });
    builder.addCase(retrieveAllTicketCommentsByTicketId.rejected, (state) => {
      state.ticketCommentState = "ERROR";
    });
    builder.addCase(createNewTicketComment.fulfilled, (state, action) => {
      const newTicketComment = action.payload;
      if (newTicketComment) {
        state.ticketComments = [...state.ticketComments, newTicketComment];
      }
      state.ticketCommentState = "SUCCESS";
    });
    builder.addCase(createNewTicketComment.pending, (state) => {
      state.ticketCommentState = "LOADING";
    });
    builder.addCase(createNewTicketComment.rejected, (state) => {
      state.ticketCommentState = "ERROR";
    });
    builder.addCase(addNewTicketCommentFile.fulfilled, (state, action) => {
      const newTicketCommentFile = action.payload;
      if (newTicketCommentFile) {
        state.ticketComments = [...state.ticketComments, newTicketCommentFile];
      }
      state.ticketCommentState = "SUCCESS";
    });
    builder.addCase(addNewTicketCommentFile.pending, (state) => {
      state.ticketCommentState = "LOADING";
    });
    builder.addCase(addNewTicketCommentFile.rejected, (state) => {
      state.ticketCommentState = "ERROR";
    });
  },
});

export default ticketCommentsSlice.reducer;
export const { clearTicketComments } = ticketCommentsSlice.actions;
