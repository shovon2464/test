import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";
import { BooleanSchema } from "yup";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";
import {
  getAllUsersListWithActiveValue,
  updateUserActive,
  deleteUser,
  updateUserRole,
  updateUserPassword,
} from "../../../services/tools/user_management/user_management";
import {
  IRoleManagement,
  IUserRoleManagement,
} from "../role_management_dropdown/role_management";

export interface IUserListWithActiveValueResponse {
  user_id?: string;
  name?: string;
  username?: string;
  active: boolean;
  senior: boolean;
  roles?: IRoleManagement[];
}

export interface IDeleteUser extends IDeleteStatus {
  User_Id: string;
}

export interface IUserResetPassword {
  user_id: string;
  password: string;
}

//retrieve all userlist
export const retrieveUsersListWithActiveValue = createAsyncThunk<
  IUserListWithActiveValueResponse[],
  unknown
>(
  "userListWithActiveValue/getUsersListWithActiveValue",
  async (_, thunkAPI) => {
    try {
      const users = await getAllUsersListWithActiveValue();
      if (users.data) {
        thunkAPI.dispatch(
          setTaskMessage("User List With Active Value Retrieved!")
        );
        const user_list: IUserListWithActiveValueResponse[] =
          users.data.findAllUsersWithActiveValue;
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

export const updateUserActiveValue = createAsyncThunk<
  IUserListWithActiveValueResponse,
  IUserListWithActiveValueResponse
>("userListWithActiveValue/updateUserActiveValue", async (data, thunkAPI) => {
  try {
    const response = await updateUserActive(data);
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("User Active Updated!"));
      const userActiveUpdated: IUserListWithActiveValueResponse =
        response.data.update_user;
      return userActiveUpdated;
    } else {
      const errorMsg: string = response.errors[0].message.toString();
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
});

export const updateUserRoleResult = createAsyncThunk<
  IUserListWithActiveValueResponse,
  IUserRoleManagement
>("userListWithActiveValue/updateUserRole", async (data, thunkAPI) => {
  try {
    const response = await updateUserRole(data);
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("User Roles Updated!"));
      const userActiveUpdated: IUserListWithActiveValueResponse =
        response.data.update_user_role;
      return userActiveUpdated;
    } else {
      const errorMsg: string = response.errors[0].message.toString();
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
});

export const resetUserPassword = createAsyncThunk<
  IUserResetPassword,
  IUserResetPassword
>("userResetPassword/resetPassword", async (data, thunkAPI) => {
  try {
    const response = await updateUserPassword(data);
    console.log(response);
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("User password reset successfully!"));
      const userPasswordReseted: IUserResetPassword = response.data.update_user;
      return userPasswordReseted;
    } else {
      const errorMsg: string = response.error[0].message.toString();
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
});

export const removeUser = createAsyncThunk<IDeleteUser, string>(
  "task_source/deleteUser",
  async (user_id: string, thunkAPI) => {
    try {
      const response = await deleteUser(user_id);
      if (response.data.delete_user.Status) {
        thunkAPI.dispatch(setDropdownTypeMessage("User Deleted!"));
        const deleteUser: IDeleteUser = {
          User_Id: user_id,
          Status: response.data.delete_user.Status,
          Message: response.data.delete_user.Message,
        };
        return deleteUser;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
        thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.errors ||
        e.toString();
      thunkAPI.dispatch(setDropdownTypeMessage(message));
      console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
