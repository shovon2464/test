import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";
import { getTaskFilesByTaskId } from "../../../services/task/task_files/task_files";

export interface ITaskFilesResponse {
  Task_File_Id: string;
  Task_File_Name: string;
  Upload_By: string;
  File_Path: string;
  Task_File_Job_Type_Name: string;
  Task_Id: string;
  Task_File_Type_Id: string;
}

export const retrieveTaskFilesByTaskId = createAsyncThunk<
  ITaskFilesResponse[],
  string
>("taskFiles/getTaskFilesByTaskId", async (task_id, thunkAPI) => {
  try {
    const response = await getTaskFilesByTaskId(task_id);
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("Task Files Retrieved!"));
      const task_files: ITaskFilesResponse[] =
        response.data.findTaskFilesByTaskId;
      return task_files;
    } else {
      const errorMsg: string = response.errors[0].message.toString();
      thunkAPI.dispatch(setTaskMessage(errorMsg));
      return thunkAPI.rejectWithValue(errorMsg);
    }
  } catch (e: any) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.response.errors ||
      e.toString();
    thunkAPI.dispatch(setTaskMessage(message));
    console.log("Error", e.response.errors);
    return thunkAPI.rejectWithValue(message);
  }
});
