import { createSlice } from "@reduxjs/toolkit";

export interface IAuthMessage {
  message: string | null;
}

const initialState: IAuthMessage = {
  message: "",
};

const authMsgSlice = createSlice({
  name: "authMessage",
  initialState,
  reducers: {
    setAuthMessage: (state, action) => {
      return { message: action.payload };
    },
    clearAuthMessage: () => {
      return { message: null };
    },
  },
});

const { reducer, actions } = authMsgSlice;

export const { setAuthMessage, clearAuthMessage } = actions;
export default reducer;
