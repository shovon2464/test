import { createSlice } from "@reduxjs/toolkit";

export interface IPerformanceReportMessage {
  message: string | null;
}

const initialState: IPerformanceReportMessage = {
  message: "",
};

const performanceReportMsgSlice = createSlice({
  name: "performanceReportMessage",
  initialState,
  reducers: {
    setPerformanceReportMessage: (state, action) => {
      return { message: action.payload };
    },
    clearPerformanceReportMessage: () => {
      return { message: null };
    },
  },
});

const { reducer, actions } = performanceReportMsgSlice;

export const { setPerformanceReportMessage, clearPerformanceReportMessage } =
  actions;
export default reducer;
