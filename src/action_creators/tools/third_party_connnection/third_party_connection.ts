import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllThirdPartyConnections } from "../../../services/tools/third_party_connection/third_party_connection";
import { setDropdownTypeMessage } from "../../../features/tools/dropdownTypeMsgSlice";
import { setAuthMessage } from "../../../features/auth/authMsgSlice";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";
import { IAutoDeleteState } from "../../../features/tools/auto_delete_dropdown/autoDeleteSlice";

export interface IThirdPartyConnection {
  ThirdPartyConnection_Id: string;
  url: string;
  username: string;
  password: string;
  third_party_name: string;
}
export const retrieveAllThirdPartyConnections = createAsyncThunk<
  IThirdPartyConnection[],
  unknown
>("third_party_connection/getAllThirdPartyConnections", async (_, thunkAPI) => {
  try {
    const response = await getAllThirdPartyConnections();
    if (response.data) {
      thunkAPI.dispatch(
        setDropdownTypeMessage("All Third Party Connections Retrieved!")
      );
      const third_party_connection_list: IThirdPartyConnection[] =
        response.data.findAllThirdPartyConnections;
      return third_party_connection_list;
    } else {
      const errorMsg: string = response.errors[0].message.toString();
      thunkAPI.dispatch(setDropdownTypeMessage(errorMsg));
      return thunkAPI.rejectWithValue(errorMsg);
    }
  } catch (e: any) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.response.errors ||
      e.toString();
    thunkAPI.dispatch(setDropdownTypeMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});
