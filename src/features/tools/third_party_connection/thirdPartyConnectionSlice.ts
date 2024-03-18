import { createSlice } from "@reduxjs/toolkit";
import {
  retrieveAllThirdPartyConnections,
  IThirdPartyConnection,
} from "../../../action_creators/tools/third_party_connnection/third_party_connection";

type thirdPartyConnectionStatus = "SUCCESS" | "LOADING" | "ERROR" | null;

export interface IThirdPartyConnectionState {
  thirdPartyConnections: IThirdPartyConnection[];
  thirdPartyConnection: IThirdPartyConnection;
  status: thirdPartyConnectionStatus;
}

const initialState: IThirdPartyConnectionState = {
  thirdPartyConnection: {
    ThirdPartyConnection_Id: "",
    url: "",
    username: "",
    password: "",
    third_party_name: "",
  },
  thirdPartyConnections: [],
  status: null,
};

const thirdPartyConnectionSlice = createSlice({
  name: "thirdPartyConnection",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      retrieveAllThirdPartyConnections.fulfilled,
      (state, action) => {
        state.thirdPartyConnections = action.payload;
        state.status = "SUCCESS";
      }
    );
    builder.addCase(
      retrieveAllThirdPartyConnections.pending,
      (state, action) => {
        state.status = "LOADING";
      }
    );
    builder.addCase(
      retrieveAllThirdPartyConnections.rejected,
      (state, action) => {
        state.status = "ERROR";
      }
    );
  },
});

export default thirdPartyConnectionSlice.reducer;
