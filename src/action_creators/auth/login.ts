import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthMessage } from "../../features/auth/authMsgSlice";
import { login } from "../../services/auth/login";

export interface UserResponse {
  token: string;
  role: string;
  message: string;
  status: boolean;
  name: string;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const loginUser = createAsyncThunk<UserResponse, LoginRequest>(
  "auth/loginUser",
  async (loginRequest: LoginRequest, thunkAPI) => {
    try {
      const data = await login(loginRequest);
      if (typeof data === "undefined") {
        throw new Error(data);
      }
      return data;
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setAuthMessage(message));
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
