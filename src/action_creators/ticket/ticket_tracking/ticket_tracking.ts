import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTicketMessage } from "../../../features/ticket/ticketMsgSlice";
import {
  getAllTickets,
  getAllTicketsByUserID,
  addNewTicket,
  deleteTicket
} from "../../../services/ticket/ticket/ticket";

export interface ITicketTrackingsRequest {
  Ticket_Id: string;
  Comment_By: string;
}

export interface ITicketTrackingsResponse extends ITicketTrackingsRequest {
  Ticket_Tracking_Id: string;
}