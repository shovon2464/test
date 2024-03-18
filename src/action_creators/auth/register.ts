import { createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "../../services/auth/register";
import { setAuthMessage } from "../../features/auth/authMsgSlice";
import { object } from "yup/lib/locale";

export interface RegisterResponse {
  user_id: string;
  name: string;
  username: string;
  active: boolean;
}

export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
}

export const registerUser = createAsyncThunk<RegisterResponse, RegisterRequest>(
  "auth/registerUser",
  async (registerRequest: RegisterRequest, thunkAPI) => {
    try {
      const response = await register(registerRequest);
      if (response.data) {
        const registerResponse: RegisterResponse = {
          user_id: response.data.add_user.user_id,
          name: response.data.add_user.name,
          username: response.data.add_user.username,
          active: response.data.add_user.active,
        };
        thunkAPI.dispatch(setAuthMessage("signup successfully"));
        return registerResponse;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setAuthMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
        //throw new Error(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setAuthMessage(message));
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
