import { createSlice } from "@reduxjs/toolkit";
import {
  IUserListWithActiveValueResponse,
  retrieveUsersListWithActiveValue,
  updateUserActiveValue,
  removeUser,
  updateUserRoleResult,
} from "../../../action_creators/tools/user_management/user_management";

type UserListStatus = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IUserListWithActiveValue {
  userswithativevalue: IUserListWithActiveValueResponse[];
  userwithativevalue: IUserListWithActiveValueResponse;
  userwithativevalueStatus: UserListStatus;
}

const initialState: IUserListWithActiveValue = {
  userwithativevalue: {
    name: "",
    user_id: "",
    username: "",
    active: false,
    senior: false,
    roles: [],
  },
  userswithativevalue: [],
  userwithativevalueStatus: null,
};

const userListWithActiveValueSlice = createSlice({
  name: "userListWithActiveValue",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      retrieveUsersListWithActiveValue.fulfilled,
      (state, action) => {
        state.userswithativevalue = action.payload;
        state.userwithativevalueStatus = "SUCCESS";
      }
    );
    builder.addCase(
      retrieveUsersListWithActiveValue.pending,
      (state, action) => {
        state.userwithativevalueStatus = "LOADING";
      }
    );
    builder.addCase(
      retrieveUsersListWithActiveValue.rejected,
      (state, action) => {
        state.userwithativevalueStatus = "ERROR";
      }
    );
    builder.addCase(updateUserActiveValue.fulfilled, (state, action) => {
      const index = state.userswithativevalue.findIndex(
        (userwithativevalue) =>
          userwithativevalue.user_id === action.payload.user_id
      );
      state.userswithativevalue[index].active = action.payload.active;
      state.userswithativevalue[index].senior = action.payload.senior;
    });
    builder.addCase(updateUserActiveValue.pending, (state, action) => {
      state.userwithativevalueStatus = "LOADING";
    });
    builder.addCase(updateUserActiveValue.rejected, (state, action) => {
      state.userwithativevalueStatus = "ERROR";
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      let index = state.userswithativevalue.findIndex(
        ({ user_id }) => user_id === action.payload.User_Id
      );
      state.userswithativevalue.splice(index, 1);
      state.userwithativevalueStatus = "SUCCESS";
    });
    builder.addCase(removeUser.pending, (state) => {
      state.userwithativevalueStatus = "LOADING";
    });
    builder.addCase(removeUser.rejected, (state) => {
      state.userwithativevalueStatus = "ERROR";
    });

    builder.addCase(updateUserRoleResult.fulfilled, (state, action) => {

      const userIndex = state.userswithativevalue.findIndex(
        (eachUser) => eachUser.user_id === action.payload.user_id
      );

      let newRoles = action.payload.roles;

      state.userswithativevalue[userIndex].roles = newRoles;
    });
    builder.addCase(updateUserRoleResult.pending, (state, action) => {
      state.userwithativevalueStatus = "LOADING";
    });
    builder.addCase(updateUserRoleResult.rejected, (state, action) => {
      state.userwithativevalueStatus = "ERROR";
    });
  },
});

export default userListWithActiveValueSlice.reducer;
