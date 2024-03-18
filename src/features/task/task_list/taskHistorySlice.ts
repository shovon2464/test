import { createSlice } from "@reduxjs/toolkit";
import {
  retrieveTaskHistory,
  ITaskHistoryResponse,
  ITaskHistory,
} from "../../../action_creators/task/task_list";

type TaskHistoryState = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface ITaskHistoryList {
  histories: ITaskHistory[];
  history: ITaskHistory;
  taskHistoryState: TaskHistoryState;
}

const initialState: ITaskHistoryList = {
  histories: [],
  history: {
    Title: "",
    Link: "",
    Pdf_Link: "",
    Date: new Date,
  },
  taskHistoryState: null,
};

const taskHistorySlice = createSlice({
    name: "taskHistory",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(retrieveTaskHistory.fulfilled, (state, action) => {
            state.histories = action.payload.TaskHistories;
            state.taskHistoryState = "SUCCESS";
        });
        builder.addCase(retrieveTaskHistory.pending, (state, action) => {
            state.taskHistoryState = "LOADING";
        });
        builder.addCase(retrieveTaskHistory.rejected, (state, action) => {
            state.taskHistoryState = "ERROR";
        });
    }
})

export default taskHistorySlice.reducer;