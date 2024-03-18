import { createSlice } from "@reduxjs/toolkit";
import {
  ITaskPriority,
  addTaskPriority,
  getAllTaskPriorities,
  removeTaskPriority,
} from "../../../action_creators/tools/task_priority_dropdown/task_priority";

type TaskPriorityStatus = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ITaskPriorityState {
  taskPriorities: ITaskPriority[];
  taskPriority: ITaskPriority;
  taskPriorityStatus: TaskPriorityStatus;
}

const initialState: ITaskPriorityState = {
  taskPriority: { Priority_Description: "" },
  taskPriorities: [],
  taskPriorityStatus: null,
};

const taskPrioritySlice = createSlice({
  name: "taskPriority",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTaskPriorities.fulfilled, (state, action) => {
      state.taskPriorityStatus = "SUCCESS";
      state.taskPriorities = action.payload;
    });
    builder.addCase(getAllTaskPriorities.pending, (state, action) => {
      state.taskPriorityStatus = "LOADING";
    });
    builder.addCase(getAllTaskPriorities.rejected, (state, action) => {
      state.taskPriorityStatus = "ERROR";
    });
    builder.addCase(addTaskPriority.fulfilled, (state, action) => {
      const newTaskPriority = action.payload;
      if (newTaskPriority) {
        state.taskPriorities = [...state.taskPriorities, newTaskPriority];
      }
      state.taskPriorityStatus = "SUCCESS";
    });
    builder.addCase(addTaskPriority.pending, (state, action) => {
      state.taskPriorityStatus = "LOADING";
    });
    builder.addCase(addTaskPriority.rejected, (state) => {
      state.taskPriorityStatus = "ERROR";
    });
    builder.addCase(removeTaskPriority.fulfilled, (state, action) => {
      let index = state.taskPriorities.findIndex(
        ({ Priority_Id }) => Priority_Id === action.payload.Priority_Id
      );
      state.taskPriorities.splice(index, 1);
      state.taskPriorityStatus = "SUCCESS";
    });
    builder.addCase(removeTaskPriority.pending, (state) => {
      state.taskPriorityStatus = "LOADING";
    });
    builder.addCase(removeTaskPriority.rejected, (state) => {
      state.taskPriorityStatus = "ERROR";
    });
  },
});

export default taskPrioritySlice.reducer;
