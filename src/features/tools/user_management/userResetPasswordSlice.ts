import { createSlice } from "@reduxjs/toolkit";
import {
  IUserResetPassword,
  resetUserPassword,
} from "../../../action_creators/tools/user_management/user_management";

type ResetPasswordStatus = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IResetPassword {
  userResetPassword: IUserResetPassword;
  resetPasswordStatus: ResetPasswordStatus;
}

const initialState: IResetPassword = {
  userResetPassword: {
    user_id: "",
    password: "",
  },
  resetPasswordStatus: null,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetUserPassword.fulfilled, (state, action) => {
      state.userResetPassword = action.payload;
      state.resetPasswordStatus = "SUCCESS";
    });
    builder.addCase(resetUserPassword.pending, (state, action) => {
      state.resetPasswordStatus = "LOADING";
    });
    builder.addCase(resetUserPassword.rejected, (state, action) => {
      state.resetPasswordStatus = "ERROR";
    });
  },
});

export default resetPasswordSlice.reducer;
