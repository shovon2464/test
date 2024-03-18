import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import store from "store";
import {
  ITaskFilesResponse,
  retrieveTaskFilesByTaskId,
} from "../../../action_creators/task/task_files/task_files";

type TaskFilesState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ITaskFiles {
  taskFiles: ITaskFilesResponse[];
  taskFile: ITaskFilesResponse;
  taskFilesState: TaskFilesState;
}

const initialState: ITaskFiles = {
  taskFile: {
    Task_File_Id: "",
    Task_File_Name: "",
    Upload_By: "",
    File_Path: "",
    Task_File_Job_Type_Name: "",
    Task_Id: "",
    Task_File_Type_Id: "",
  },
  taskFiles: [],
  taskFilesState: null,
};

export const taskFilesSlice = createSlice({
  name: "taskFiles",
  initialState: initialState,
  reducers: {
    clearTaskFiles: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveTaskFilesByTaskId.fulfilled, (state, action) => {
      state.taskFiles = action.payload;
      state.taskFilesState = "SUCCESS";
    });
    builder.addCase(retrieveTaskFilesByTaskId.pending, (state, action) => {
      state.taskFilesState = "LOADING";
    });
    builder.addCase(retrieveTaskFilesByTaskId.rejected, (state, action) => {
      state.taskFilesState = "ERROR";
    });
  },
});

export default taskFilesSlice.reducer;
export const { clearTaskFiles } = taskFilesSlice.actions;
