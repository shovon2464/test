import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";
import {
  addNewNoteToEachTask,
  getEachTaskNotesByTaskId,
} from "../../../services/task/note/note";

export interface ITaskNotesRequest {
  Description: string;
  Reason: string;
  By_Who: string;
  To_Who: string;
  Task_Id: string;
  Note_Type_Id?: string | null | undefined | unknown;
}

export interface ITaskNotesResponse extends ITaskNotesRequest {
  Note_Id: string;
  Create_Date: Date | string;
}

export const retrieveTaskNotesByTaskId = createAsyncThunk<
  ITaskNotesResponse[],
  string
>("taskNotes/getTaskNotesByTaskId", async (task_id, thunkAPI) => {
  try {
    const response = await getEachTaskNotesByTaskId(task_id);
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("Task Notes Retrieved!"));
      const task_notes: ITaskNotesResponse[] =
        response.data.findAllNotesByTaskID;
      return task_notes;
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

export const createNewTaskNote = createAsyncThunk<
  ITaskNotesResponse,
  ITaskNotesRequest
>("taskNotes/addTaskNote", async (note_info: ITaskNotesRequest, thunkAPI) => {
  try {
    const response = await addNewNoteToEachTask(note_info);
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("New Task Note Created!"));
      const newTaskNote: ITaskNotesResponse = response.data.createNote.Note;
      return newTaskNote;
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
