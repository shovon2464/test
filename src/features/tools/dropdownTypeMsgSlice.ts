import { createSlice } from "@reduxjs/toolkit";

export interface IDropdownTypeMessage {
  message: string | null;
}

const initialState: IDropdownTypeMessage = {
  message: "",
};

const dropdownTypeMsgSlice = createSlice({
  name: "dropdownTypeMessage",
  initialState,
  reducers: {
    setDropdownTypeMessage: (state, action) => {
      return { message: action.payload };
    },
    clearDropdownTypeMessage: () => {
      return { message: null };
    },
  },
});

const { reducer, actions } = dropdownTypeMsgSlice;

export const { setDropdownTypeMessage, clearDropdownTypeMessage } = actions;
export default reducer;
