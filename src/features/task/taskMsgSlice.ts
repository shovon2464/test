import { createSlice } from "@reduxjs/toolkit";

export interface ITaskMessage {
  message: string | null;
}

const initialState: ITaskMessage = {
  message: "",
};

const taskMsgSlice = createSlice({
  name: "taskMessage",
  initialState,
  reducers: {
    setTaskMessage: (state, action) => {
      return { message: action.payload };
    },
    clearTaskMessage: () => {
      return { message: null };
    },
  },
});

const { reducer, actions } = taskMsgSlice;

export const { setTaskMessage, clearTaskMessage } = actions;
export default reducer;
