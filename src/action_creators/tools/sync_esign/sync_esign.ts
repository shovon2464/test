import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFiles } from "../../../services/task/sync_Esign/sync_Esign";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";

export interface IFileStatusResponse {
  is_signed: string;
  task_id?: string;
}

// getAllFiles status from Esign
export const retrieveFileStatus = createAsyncThunk<
  IFileStatusResponse[],
  unknown
>("sync_esign/retrieveFileStatus", async (_, thunkAPI) => {
  try {
    const result = await getAllFiles();
    if (result.data) {
      thunkAPI.dispatch(setTaskMessage("Esign task status retrieved!"));
      const esign_list: IFileStatusResponse[] = result.data.ERPFindFileStatus;
      return esign_list;
    } else {
      const errorMsg: string = result.errors[0].message.toString();
      thunkAPI.dispatch(setTaskMessage(errorMsg));
      return thunkAPI.rejectWithValue(errorMsg);
    }
  } catch (e: any) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();
    thunkAPI.dispatch(setTaskMessage(message));
    console.log("Error", e.response.data);
    return thunkAPI.rejectWithValue(message);
  }
});
