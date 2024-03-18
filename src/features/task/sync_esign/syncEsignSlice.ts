import { createSlice } from "@reduxjs/toolkit";
import {
  IFileStatusResponse,
  retrieveFileStatus,
} from "../../../action_creators/tools/sync_esign/sync_esign";

type EsignStatus = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IEsignDocStatus {
  docsSignState: IFileStatusResponse[];
  docSignState: IFileStatusResponse;
  docSignStateStatus: EsignStatus;
  connection: boolean;
}

const initialState: IEsignDocStatus = {
  docsSignState: [],
  docSignState: {
    task_id: "",
    is_signed: "",
  },
  docSignStateStatus: null,
  connection: false,
};
const EsignStatusSlice = createSlice({
  name: "EsignDocsStatus",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveFileStatus.fulfilled, (state, action) => {
      state.docsSignState = action.payload;
      state.docSignStateStatus = "SUCCESS";
      state.connection = true;
    });
    builder.addCase(retrieveFileStatus.pending, (state, action) => {
      state.docSignStateStatus = "LOADING";
    });
    builder.addCase(retrieveFileStatus.rejected, (state, action) => {
      state.docSignStateStatus = "ERROR";
      state.connection = false;
    });
  },
});

export default EsignStatusSlice.reducer;
