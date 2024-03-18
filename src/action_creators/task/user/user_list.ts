import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";
import { getAllUsersList, getAllSeniorUsersList } from "../../../services/task/user/user";

export interface IUserListResponse {
  user_id: string;
  name: string;
  username: string;
}

export interface ISeniorUserListResponse {
  user_id: string;
  name: string;
  username: string;
  active: boolean;
  senior: boolean;
}

export const retrieveUsersList = createAsyncThunk<IUserListResponse[], unknown>(
  "userList/getUserList",
  async (_, thunkAPI) => {
    try {
      const users = await getAllUsersList();
      if (users.data) {
        thunkAPI.dispatch(setTaskMessage("User List Retrieved!"));
        const user_list: IUserListResponse[] = users.data.findAllUsers;
        return user_list;
      } else {
        const errorMsg: string = users.errors[0].message.toString();
        thunkAPI.dispatch(setTaskMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setTaskMessage(message));
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const retrieveSeniorUsersList = createAsyncThunk<ISeniorUserListResponse[], unknown>(
  "seniorUsersList/getSeniorUsersList",
  async (_, thunkAPI) => {
    try {
      const seniorUsers = await getAllSeniorUsersList();
      if (seniorUsers.data) {
        thunkAPI.dispatch(setTaskMessage("Senior User List Retrieved!"));
        const senior_users_list: ISeniorUserListResponse[] = 
          seniorUsers.data.findAllUsersWithSeniorValue;
        return senior_users_list;
      } else {
        const errorMsg: string = seniorUsers.errors[0].message.toString();
        thunkAPI.dispatch(setTaskMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setTaskMessage(message));
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);