import { createSlice } from "@reduxjs/toolkit";

export interface ITicketMessage {
  message: string | null;
}

const initialState: ITicketMessage = {
  message: "",
};

const ticketMsgSlice = createSlice({
  name: "ticketMessage",
  initialState,
  reducers: {
    setTicketMessage: (state, action) => {
      return { message: action.payload };
    },
    clearTicketMessage: () => {
      return { message: null };
    },
  },
});

const { reducer, actions } = ticketMsgSlice;

export const { setTicketMessage, clearTicketMessage } = actions;
export default reducer;