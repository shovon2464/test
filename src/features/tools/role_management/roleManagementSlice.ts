import { createSlice } from "@reduxjs/toolkit";
import {
  addRole,
  getAllRoles,
  IRoleManagement,
  removeRole,
  getRolesOfUser,
} from "../../../action_creators/tools/role_management_dropdown/role_management";

type RoleStatus = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IRoleState {
  roles: IRoleManagement[]; //all roles in DB
  userRole: IRoleManagement[]; //current user's roles
  role: IRoleManagement;
  roleStatus: RoleStatus;
}

const initialState: IRoleState = {
  role: { name: "" },
  userRole: [],
  roles: [],
  roleStatus: null,
};

const roleManagementSlice = createSlice({
  name: "roleList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRoles.fulfilled, (state, action) => {
      state.roleStatus = "SUCCESS";
      state.roles = action.payload;
    });
    builder.addCase(getAllRoles.pending, (state, action) => {
      state.roleStatus = "LOADING";
    });
    builder.addCase(getAllRoles.rejected, (state, action) => {
      state.roleStatus = "ERROR";
    });
    builder.addCase(addRole.fulfilled, (state, action) => {
      const newRole = action.payload;
      console.log(newRole);
      if (newRole) {
        state.roles = [...state.roles, newRole];
      }
      state.roleStatus = "SUCCESS";
    });
    builder.addCase(addRole.pending, (state, action) => {
      state.roleStatus = "LOADING";
    });
    builder.addCase(addRole.rejected, (state) => {
      state.roleStatus = "ERROR";
    });
    builder.addCase(removeRole.fulfilled, (state, action) => {
      let index = state.roles.findIndex(
        ({ role_id }) => role_id === action.payload.role_id
      );
      state.roles.splice(index, 1);
      state.roleStatus = "SUCCESS";
    });
    builder.addCase(removeRole.pending, (state) => {
      state.roleStatus = "LOADING";
    });
    builder.addCase(removeRole.rejected, (state) => {
      state.roleStatus = "ERROR";
    });
    builder.addCase(getRolesOfUser.fulfilled, (state, action) => {
      state.roleStatus = "SUCCESS";
      state.userRole = action.payload;
    });
    builder.addCase(getRolesOfUser.pending, (state) => {
      state.roleStatus = "LOADING";
    });
    builder.addCase(getRolesOfUser.rejected, (state) => {
      state.roleStatus = "LOADING";
    });
  },
});

export default roleManagementSlice.reducer;
