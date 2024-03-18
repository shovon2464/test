import { createSlice } from "@reduxjs/toolkit";

export interface IQuoteMessage {
  message: string | null;
}

const initialState: IQuoteMessage = {
  message: "",
};

const quoteMsgSlice = createSlice({
  name: "quoteMessage",
  initialState,
  reducers: {
    setQuoteMessage: (state, action) => {
      return { message: action.payload };
    },
    clearQuoteMessage: () => {
      return { message: null };
    },
  },
});

const { reducer, actions } = quoteMsgSlice;

export const { setQuoteMessage, clearQuoteMessage } = actions;
export default reducer;
