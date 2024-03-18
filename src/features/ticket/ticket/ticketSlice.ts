import { createSlice } from "@reduxjs/toolkit";
import {
  ITicketsResponse,
  retrieveAllTickets,
  retrieveAllTicketsByUserId,
  createNewTicket,
  closeTicketAndRelatedRecords
} from "../../../action_creators/ticket/ticket/ticket";

type TicketState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ITickets {
  tickets: ITicketsResponse[];
  ticket: ITicketsResponse;
  ticketState: TicketState;
}

const initialState: ITickets = {
  ticket: {
    Ticket_Id: "",
    Create_By: "",
    Date: "",
    Title: "",
    Description: ""
  },
  tickets: [],
  ticketState: null,
};

const ticketSlice = createSlice({
  name: "ticketList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveAllTickets.fulfilled, (state, action) => {
      state.tickets = action.payload;
      state.ticketState = "SUCCESS";
    });
    builder.addCase(retrieveAllTickets.pending, (state) => {
      state.ticketState = "LOADING";
    });
    builder.addCase(retrieveAllTickets.rejected, (state) => {
      state.ticketState = "ERROR";
    });
    builder.addCase(retrieveAllTicketsByUserId.fulfilled, (state, action) => {
      state.tickets = action.payload;
      state.ticketState = "SUCCESS";
    });
    builder.addCase(retrieveAllTicketsByUserId.pending, (state) => {
      state.ticketState = "LOADING";
    });
    builder.addCase(retrieveAllTicketsByUserId.rejected, (state) => {
      state.ticketState = "ERROR";
    });
    builder.addCase(createNewTicket.fulfilled, (state, action) => {
      const newTicket = action.payload;
      if (newTicket) {
        state.tickets = [...state.tickets, newTicket];
      }
      state.ticketState = "SUCCESS";
    });
    builder.addCase(createNewTicket.pending, (state) => {
      state.ticketState = "LOADING";
    });
    builder.addCase(createNewTicket.rejected, (state) => {
      state.ticketState = "ERROR";
    });
    builder.addCase(closeTicketAndRelatedRecords.fulfilled, (state, action) => {
      let index = state.tickets.findIndex(
        ({ Ticket_Id }) => Ticket_Id === action.payload
      );
      state.tickets.splice(index, 1);
      state.ticketState = "SUCCESS";
    });
    builder.addCase(closeTicketAndRelatedRecords.pending, (state) => {
      state.ticketState = "LOADING";
    });
    builder.addCase(closeTicketAndRelatedRecords.rejected, (state) => {
      state.ticketState = "ERROR";
    });
  },
});

export default ticketSlice.reducer;
