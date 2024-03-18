import { createSlice } from "@reduxjs/toolkit";
import {
  IUserListResponse,
  retrieveUsersList,
} from "../../../action_creators/task/user/user_list";

type UserListState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IUserList {
  users: IUserListResponse[];
  user: IUserListResponse;
  userState: UserListState;
}

const initialState: IUserList = {
  user: { name: "", user_id: "", username: "" },
  users: [],
  userState: null,
};

const userListSlice = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveUsersList.fulfilled, (state, action) => {
      state.users = action.payload;
      state.userState = "SUCCESS";
    });
    builder.addCase(retrieveUsersList.pending, (state, action) => {
      state.userState = "LOADING";
    });
    builder.addCase(retrieveUsersList.rejected, (state, action) => {
      state.userState = "ERROR";
    });
  },
});

export default userListSlice.reducer;
