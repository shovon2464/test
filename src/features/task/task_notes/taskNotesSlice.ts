import { createSlice } from "@reduxjs/toolkit";
import {
  ITaskNotesResponse,
  createNewTaskNote,
  retrieveTaskNotesByTaskId,
} from "../../../action_creators/task/task_notes/task_notes";

type TaskNotesState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ITaskNotesList {
  taskNotes: ITaskNotesResponse[];
  taskNote: ITaskNotesResponse;
  taskNoteState: TaskNotesState;
}

const initialState: ITaskNotesList = {
  taskNote: {
    Note_Id: "",
    Description: "",
    Reason: "",
    By_Who: "",
    To_Who: "",
    Create_Date: "",
    Task_Id: "",
  },
  taskNotes: [],
  taskNoteState: null,
};

const taskNotesSlice = createSlice({
  name: "taskNotes",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveTaskNotesByTaskId.fulfilled, (state, action) => {
      state.taskNotes = action.payload;
      state.taskNoteState = "SUCCESS";
    });
    builder.addCase(retrieveTaskNotesByTaskId.pending, (state) => {
      state.taskNoteState = "LOADING";
    });
    builder.addCase(retrieveTaskNotesByTaskId.rejected, (state) => {
      state.taskNoteState = "ERROR";
    });
    builder.addCase(createNewTaskNote.fulfilled, (state, action) => {
      const newTaskNote = action.payload;
      if (newTaskNote) {
        state.taskNotes = [...state.taskNotes, newTaskNote];
      }
      state.taskNoteState = "SUCCESS";
    });
    builder.addCase(createNewTaskNote.pending, (state) => {
      state.taskNoteState = "LOADING";
    });
    builder.addCase(createNewTaskNote.rejected, (state) => {
      state.taskNoteState = "ERROR";
    });
  },
});

export default taskNotesSlice.reducer;
