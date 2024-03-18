import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTaskMessage } from "../../../features/task/taskMsgSlice";
import {
  createNewHomeInfo,
  getHomeInfoByHomeInfoId,
} from "../../../services/questionaire/home_questionnaire/home_info";

export interface IHomeInfoRequest {
  Address: string | null;
  Built_Year: number | null;
  HW_Tank_Year: number | null;
  Roofing_Year: number | null;
  Size: string | null;
  Bathrooms: string | null;
  Is_Basement_Completed: boolean | null;
  Claims: boolean | null;
  Num_Mortgages: number | null;
  Comment: string | null;
}

export interface IHomeInfoResponse extends IHomeInfoRequest {
  CM_Home_Info_Id: string;
}

export const retrieveHomeInfoByHomeId = createAsyncThunk<
  IHomeInfoResponse,
  string
>("homeInfo/getHomeInfoByHomeId", async (home_id, thunkAPI) => {
  try {
    const response = await getHomeInfoByHomeInfoId(home_id);
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("Home Info Retrieved!"));
      const home_info: IHomeInfoResponse =
        response.data.findHomeInfoByHomeInfoId;
      return home_info;
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
