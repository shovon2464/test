import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { IDeleteStatus } from "../../../interfaces/dropdown_type/IDeleteStatus";
import {
  getAllRoleManagement,
  createRole,
  deleteRole,
  getRolesByUserId,
} from "../../../services/tools/role_management/role_management";

export interface IRoleManagement {
  role_id?: string;
  name: string;
}

export interface IUserRoleManagement {
  user_id: string;
  role_id: string;
  name: string;
}

export interface IDeleteRole extends IDeleteStatus {
  role_id: string;
}

// export interface IRolesOfUser {
//   name: string;
// }

export const getAllRoles = createAsyncThunk<IRoleManagement[], unknown>(
  "role_management/getRoles",
  async (_, thunkAPI) => {
    try {
      const response = await getAllRoleManagement();
      if (response.data) {
        const allRoles: IRoleManagement[] = response.data.findAllRoles;
        thunkAPI.dispatch(setDropdownTypeMessage("Retrieved all roles."));
        return allRoles;
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
      //console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addRole = createAsyncThunk<IRoleManagement, string>(
  "role_management/addRole",
  async (role_name, thunkAPI) => {
    try {
      const response = await createRole(role_name);
      if (response.data) {
        const roleResponse: IRoleManagement = response.data.add_role;
        thunkAPI.dispatch(setDropdownTypeMessage("Added New Task Priority"));
        return roleResponse;
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

export const removeRole = createAsyncThunk<IDeleteRole, string>(
  "role_management/deleteRole",
  async (role_id: string, thunkAPI) => {
    try {
      const response = await deleteRole(role_id);
      if (response.data.delete_role.Status) {
        thunkAPI.dispatch(setDropdownTypeMessage("Deleted Role"));
        const deleteRole: IDeleteRole = {
          role_id: role_id,
          Status: response.data.delete_role.Status,
          Message: response.data.delete_role.Message,
        };

        return deleteRole;
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

export const getRolesOfUser = createAsyncThunk<IRoleManagement[], string>(
  "role_management/getUserRoles",
  async (user_id: string, thunkAPI) => {
    try {
      const response = await getRolesByUserId(user_id);
      if (response.data) {
        const rolesByUserId: IRoleManagement[] =
          response.data.findAllRolesByUserId;
        thunkAPI.dispatch(setDropdownTypeMessage("Retrieved roles."));
        return rolesByUserId;
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
      //console.log("Error", e.response.errors);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
