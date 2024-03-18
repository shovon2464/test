import { createSlice } from "@reduxjs/toolkit";
import {
  ISeniorUserListResponse,
  retrieveSeniorUsersList,
} from "../../../action_creators/task/user/user_list";

type SeniorUserListState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ISeniorUserList {
  seniorUsers: ISeniorUserListResponse[];
  seniorUser: ISeniorUserListResponse;
  seniorUserState: SeniorUserListState;
}

const initialState: ISeniorUserList = {
  seniorUser: { name: "", user_id: "", username: "", active: false, senior: false },
  seniorUsers: [],
  seniorUserState: null,
};

const seniorUsersListSlice = createSlice({
  name: "seniorUsersList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveSeniorUsersList.fulfilled, (state, action) => {
      state.seniorUsers = action.payload;
      state.seniorUserState = "SUCCESS";
    });
    builder.addCase(retrieveSeniorUsersList.pending, (state, action) => {
      state.seniorUserState = "LOADING";
    });
    builder.addCase(retrieveSeniorUsersList.rejected, (state, action) => {
      state.seniorUserState = "ERROR";
    });
  },
});

export default seniorUsersListSlice.reducer;
