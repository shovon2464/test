import { createSlice } from "@reduxjs/toolkit";
import {
  retrieveTasksList,
  ITaskListResponse,
  updateEachTaskAssignTo,
  updateEachTaskNewestNote,
  deleteTask,
  updateEachTaskStatus,
  updateTaskPolicyNumber,
} from "../../../action_creators/task/task_list";

type TaskListState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ITaskList {
  tasks: ITaskListResponse[];
  task: ITaskListResponse;
  taskState: TaskListState;
}

const initialState: ITaskList = {
  task: {
    Task_Id: "",
    Assign_By: "",
    Assign_To: "",
    Create_By: "",
    Create_Date: "",
    Job_Sub_Type_Name: "",
    Job_Type_Name: "",
    Task_Description: "",
    Task_Status: "",
    CM_Vehicle_Info_Id: "",
    CM_Home_Info_Id: "",
  },
  tasks: [],
  taskState: null,
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveTasksList.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.taskState = "SUCCESS";
    });
    builder.addCase(retrieveTasksList.pending, (state, action) => {
      state.taskState = "LOADING";
    });
    builder.addCase(retrieveTasksList.rejected, (state, action) => {
      state.taskState = "ERROR";
    });
    builder.addCase(updateEachTaskAssignTo.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.Task_Id === action.payload.Task_Id
      );
      state.tasks[index].Assign_To = action.payload.Assign_To;
    });
    builder.addCase(updateEachTaskAssignTo.pending, (state) => {
      state.taskState = "LOADING";
    });
    builder.addCase(updateEachTaskAssignTo.rejected, (state) => {
      state.taskState = "ERROR";
    });
    builder.addCase(updateEachTaskNewestNote.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.Task_Id === action.payload.Task_Id
      );
      state.tasks[index].Task_Newest_Note = action.payload.Task_Newest_Note;
    });
    builder.addCase(updateEachTaskNewestNote.pending, (state) => {
      state.taskState = "LOADING";
    });
    builder.addCase(updateEachTaskNewestNote.rejected, (state) => {
      state.taskState = "ERROR";
    });
    builder.addCase(updateEachTaskStatus.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.Task_Id === action.payload.Task_Id
      );
      state.tasks[index].Task_Status = action.payload.Task_Status;
    });
    builder.addCase(updateEachTaskStatus.pending, (state) => {
      state.taskState = "LOADING";
    });
    builder.addCase(updateEachTaskStatus.rejected, (state) => {
      state.taskState = "ERROR";
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      let index = state.tasks.findIndex(
        ({ Task_Id }) => Task_Id === action.payload
      );
      state.tasks.splice(index, 1);
      state.taskState = "SUCCESS";
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.taskState = "LOADING";
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.taskState = "ERROR";
    });
    builder.addCase(updateTaskPolicyNumber.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.Task_Id === action.payload.Task_Id
      );
      state.tasks[index].Policy_Number = action.payload.Policy_Number;
      state.taskState = "LOADING";
    });
    builder.addCase(updateTaskPolicyNumber.pending, (state, action) => {
      state.taskState = "LOADING";
    });
    builder.addCase(updateTaskPolicyNumber.rejected, (state, action) => {
      state.taskState = "ERROR";
    });
  },
});

export default taskListSlice.reducer;
