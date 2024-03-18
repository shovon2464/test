import { createSlice } from "@reduxjs/toolkit";
import {
  ITaskListJobTypeSubTypeResponse, 
  updateOnlineQuoteJobType, 
} from "../../../action_creators/task/task_list";

type TaskListJobTypeSubTypeState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ITaskListJobTypeSubType {
  tasksListJobTypeSubType: ITaskListJobTypeSubTypeResponse[];
  taskListJobTypeSubType: ITaskListJobTypeSubTypeResponse;
  taskListJobTypeSubTypeState: TaskListJobTypeSubTypeState;
}

const initialState: ITaskListJobTypeSubType = {
  taskListJobTypeSubType: {
    Task_Id: "",
    Job_Type_Id: "",
    Job_Sub_Type_Id: ""
  },
  tasksListJobTypeSubType: [],
  taskListJobTypeSubTypeState: null,
};

const taskListJobTypeSubTypeSlice = createSlice({
  name: "taskListJobTypeSubType",
  initialState: initialState,
  reducers: {
    clearTaskListJobTypeSubType: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(updateOnlineQuoteJobType.fulfilled, (state, action) => {
      state.taskListJobTypeSubType = action.payload;
      state.taskListJobTypeSubTypeState = "SUCCESS";
    });
    builder.addCase(updateOnlineQuoteJobType.pending, (state) => {
      state.taskListJobTypeSubTypeState = "LOADING";
    });
    builder.addCase(updateOnlineQuoteJobType.rejected, (state) => {
      state.taskListJobTypeSubTypeState = "ERROR";
    });
  },
});

export const { clearTaskListJobTypeSubType } = taskListJobTypeSubTypeSlice.actions;
export default taskListJobTypeSubTypeSlice.reducer;
