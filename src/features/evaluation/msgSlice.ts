import { createSlice } from "@reduxjs/toolkit";

export interface IMessage {
  message: string | null;
}

const initialState: IMessage = {
  message: "",
};

const taskMsgSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: null };
    },
  },
});

const { reducer, actions } = taskMsgSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
