import { createSlice } from "@reduxjs/toolkit";
import {
  ITaskJobTypeAndSubTypeResponse,
  addTaskJobType,
  getTaskJobTypesAndSubTypes,
  removeTaskJobType,
  ITaskJobSubType,
} from "../../../action_creators/tools/task_job_type_dropdown/task_job_type";

import {
  addTaskJobSubType,
  removeTaskJobSubType,
} from "../../../action_creators/tools/task_job_type_dropdown/task_job_sub_type";

type TaskJobTypeAndSubTypeStatus = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ITaskJobTypeAndSubType {
  taskJobTypes: ITaskJobTypeAndSubTypeResponse[];
  taskJobType: ITaskJobTypeAndSubTypeResponse;
  taskJobTypeAndSubTypeStatus: TaskJobTypeAndSubTypeStatus;
}

const initialState: ITaskJobTypeAndSubType = {
  taskJobTypes: [],
  taskJobType: {},
  taskJobTypeAndSubTypeStatus: null,
};

const taskJobTypeAndSubTypeSlice = createSlice({
  name: "taskJobType",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTaskJobTypesAndSubTypes.fulfilled, (state, action) => {
      state.taskJobTypeAndSubTypeStatus = "SUCCESS";
      state.taskJobTypes = action.payload;
    });
    builder.addCase(getTaskJobTypesAndSubTypes.pending, (state, action) => {
      state.taskJobTypeAndSubTypeStatus = "LOADING";
    });
    builder.addCase(getTaskJobTypesAndSubTypes.rejected, (state, action) => {
      state.taskJobTypeAndSubTypeStatus = "ERROR";
    });
    builder.addCase(addTaskJobType.fulfilled, (state, action) => {
      const newTaskJobType = action.payload;
      if (newTaskJobType) {
        state.taskJobTypes = [...state.taskJobTypes, newTaskJobType];
      }
      state.taskJobTypeAndSubTypeStatus = "SUCCESS";
    });
    builder.addCase(addTaskJobType.pending, (state, action) => {
      state.taskJobTypeAndSubTypeStatus = "LOADING";
    });
    builder.addCase(addTaskJobType.rejected, (state) => {
      state.taskJobTypeAndSubTypeStatus = "ERROR";
    });
    builder.addCase(removeTaskJobType.fulfilled, (state, action) => {
      let index = state.taskJobTypes.findIndex(
        ({ Job_Type_Id }) => Job_Type_Id === action.payload.Job_Type_Id
      );
      state.taskJobTypes.splice(index, 1);
      state.taskJobTypeAndSubTypeStatus = "SUCCESS";
    });
    builder.addCase(removeTaskJobType.pending, (state) => {
      state.taskJobTypeAndSubTypeStatus = "LOADING";
    });
    builder.addCase(removeTaskJobType.rejected, (state) => {
      state.taskJobTypeAndSubTypeStatus = "ERROR";
    });
    builder.addCase(addTaskJobSubType.fulfilled, (state, action) => {
      let index = state.taskJobTypes.findIndex(
        ({ Job_Type_Id }) => Job_Type_Id === action.payload.Job_Type_Id
      );
      let eachTaskJobSubType = state.taskJobTypes[index].job_sub_types;
      if (eachTaskJobSubType) {
        eachTaskJobSubType.push(action.payload);
        state.taskJobTypes[index].job_sub_types = eachTaskJobSubType;
      } else {
        eachTaskJobSubType = [action.payload];
        state.taskJobTypes[index].job_sub_types = eachTaskJobSubType;
      }
    });
    builder.addCase(addTaskJobSubType.pending, (state) => {
      state.taskJobTypeAndSubTypeStatus = "LOADING";
    });
    builder.addCase(addTaskJobSubType.rejected, (state) => {
      state.taskJobTypeAndSubTypeStatus = "ERROR";
    });
    builder.addCase(removeTaskJobSubType.fulfilled, (state, action) => {
      let index = state.taskJobTypes.findIndex(
        ({ Job_Type_Id }) => Job_Type_Id === action.payload.Job_Type_Id
      );
      let subIndex = state.taskJobTypes[index].job_sub_types?.findIndex(
        ({ Job_Sub_Type_Id }) =>
          Job_Sub_Type_Id === action.payload.Job_Sub_Type_Id
      );
      if (typeof subIndex === "number") {
        state.taskJobTypes[index].job_sub_types?.splice(subIndex, 1);
      }
      state.taskJobTypeAndSubTypeStatus = "SUCCESS";
    });
    builder.addCase(removeTaskJobSubType.pending, (state) => {
      state.taskJobTypeAndSubTypeStatus = "LOADING";
    });
    builder.addCase(removeTaskJobSubType.rejected, (state) => {
      state.taskJobTypeAndSubTypeStatus = "ERROR";
    });
  },
});

export default taskJobTypeAndSubTypeSlice.reducer;
