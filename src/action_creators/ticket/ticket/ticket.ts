import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTicketMessage } from "../../../features/ticket/ticketMsgSlice";
import {
  getAllTickets,
  getAllTicketsByUserID,
  addNewTicket,
  deleteTicket
} from "../../../services/ticket/ticket/ticket";

export interface ITicketsRequest {
  Create_By: string;
  Title: string;
  Description: string;
}

export interface ITicketsResponse extends ITicketsRequest {
  Ticket_Id: string;
  Date: Date | string;
}

export const retrieveAllTickets = createAsyncThunk<ITicketsResponse[], unknown>(
  "ticketList/getTickets",
  async (_, thunkAPI) => {
    try {
      const response = await getAllTickets();
      if (response.data) {
        thunkAPI.dispatch(setTicketMessage("All Tickets Retrieved!"));
        const tickets: ITicketsResponse[] =
          response.data.findAllTickets;
        return tickets;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setTicketMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setTicketMessage(message));
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const retrieveAllTicketsByUserId = createAsyncThunk<
  ITicketsResponse[],
  string
>("ticketList/getTicketsByUserId", async (name, thunkAPI) => {
  try {
    const response = await getAllTicketsByUserID(name);
    if (response.data) {
      thunkAPI.dispatch(setTicketMessage("Tickets Retrieved!"));
      const tickets: ITicketsResponse[] =
        response.data.findAllTicketsByUserID;
      return tickets;
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

export const createNewTicket = createAsyncThunk<
  ITicketsResponse,
  ITicketsRequest
>("ticketList/addTicket", async (ticket_info: ITicketsRequest, thunkAPI) => {
  try {
    const response = await addNewTicket(ticket_info);
    if (response.data) {
      thunkAPI.dispatch(setTicketMessage("New Ticket Created!"));
      const newTicket: ITicketsResponse = response.data.createTicket.Ticket;
      return newTicket;
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

export const closeTicketAndRelatedRecords = createAsyncThunk<string, string>(
  "ticketList/deleteTicketAndRelatedRecords",
  async (ticket_id: string, thunkAPI) => {
    try {
      const response = await deleteTicket(ticket_id);
      if (response.data.deleteTicketAndTicketRelatedRecords.Status) {
        thunkAPI.dispatch(setTicketMessage("Ticket Deleted!"));
        return ticket_id;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setTicketMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setTicketMessage(message));
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);