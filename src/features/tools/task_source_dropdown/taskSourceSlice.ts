import { createSlice } from "@reduxjs/toolkit";
import {
  ITaskSource,
  addTaskSource,
  getAllTaskSources,
  removeTaskSource,
} from "../../../action_creators/tools/task_source_dropdown/task_source";

type TaskSourceStatus = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ITaskSourceState {
  taskSources: ITaskSource[];
  taskSource: ITaskSource;
  taskSourceStatus: TaskSourceStatus;
}

const initialState: ITaskSourceState = {
  taskSource: { Task_Source_Name: "" },
  taskSources: [],
  taskSourceStatus: null,
};

const taskSourceSlice = createSlice({
  name: "taskSource",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTaskSources.fulfilled, (state, action) => {
      state.taskSources = action.payload;
      state.taskSourceStatus = "SUCCESS";
    });
    builder.addCase(getAllTaskSources.pending, (state, action) => {
      state.taskSourceStatus = "LOADING";
    });
    builder.addCase(getAllTaskSources.rejected, (state, action) => {
      state.taskSourceStatus = "ERROR";
    });
    builder.addCase(addTaskSource.fulfilled, (state, action) => {
      const newTaskSource = action.payload;
      if (newTaskSource) {
        state.taskSources = [...state.taskSources, newTaskSource];
      }
      state.taskSourceStatus = "SUCCESS";
    });
    builder.addCase(addTaskSource.pending, (state, action) => {
      state.taskSourceStatus = "LOADING";
    });
    builder.addCase(addTaskSource.rejected, (state) => {
      state.taskSourceStatus = "ERROR";
    });
    builder.addCase(removeTaskSource.fulfilled, (state, action) => {
      let index = state.taskSources.findIndex(
        ({ Task_Source_Id }) => Task_Source_Id === action.payload.Task_Source_Id
      );
      state.taskSources.splice(index, 1);
      state.taskSourceStatus = "SUCCESS";
    });
    builder.addCase(removeTaskSource.pending, (state) => {
      state.taskSourceStatus = "LOADING";
    });
    builder.addCase(removeTaskSource.rejected, (state) => {
      state.taskSourceStatus = "ERROR";
    });
  },
});

export default taskSourceSlice.reducer;
