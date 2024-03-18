import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser } from "../../action_creators/auth/register";
import { loginUser } from "../../action_creators/auth/login";
import { logout } from "../../action_creators/auth/logout";
import { UserResponse } from "../../action_creators/auth/login";

export interface IAuthState {
  user: UserResponse;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isRegistered: boolean;
  errorMsg: any;
}

const initialState: IAuthState = {
  user: {
    token: "",
    message: "",
    role: "",
    status: false,
    name: "",
    username: "",
  },
  isFetching: false,
  isSuccess: false,
  isError: false,
  isRegistered: false,
  errorMsg: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.isRegistered = false;
      state.errorMsg = "";
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.isFetching = false;
        state.isRegistered = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.isRegistered = false;
        state.errorMsg = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMsg = "Username or password is incorrect";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.isFetching = false;
        state.user = {
          token: "",
          message: "",
          role: "",
          status: false,
          name: "",
          username: "",
        };
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
