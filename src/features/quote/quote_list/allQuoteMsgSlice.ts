import { createSlice } from "@reduxjs/toolkit";

export interface IAllQuoteMessage {
  message: string | null;
}

const initialState: IAllQuoteMessage = {
  message: "",
};

const allQuoteMsgSlice = createSlice({
  name: "allQuoteMessage",
  initialState,
  reducers: {
    setAllQuoteMessage: (state, action) => {
      return { message: action.payload };
    },
    clearAllQuoteMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = allQuoteMsgSlice;
export const { setAllQuoteMessage, clearAllQuoteMessage } = actions;
export default reducer;
