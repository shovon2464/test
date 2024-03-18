import { createSlice } from "@reduxjs/toolkit";
import {
  IAutoPayOffModeResponse,
  IAutoPayOffType,
  IAutoPayOffTypeDetail,
  addAutoPayOffMode,
  getAutoPayOffModeTypeAndTypeDetail,
  removeAutoPayOffMode,
} from "../../../action_creators/tools/auto_payoffmode_dropdown/auto_payoffmode";

import {
  addAutoPayOffType,
  removeAutoPayOffType,
} from "../../../action_creators/tools/auto_payoffmode_dropdown/auto_payofftype";

import {
  addAutoPayOffTypeDetail,
  removeAutoPayOffTypeDetail,
} from "../../../action_creators/tools/auto_payoffmode_dropdown/auto_payofftypedetail";

type AutoPayOffModeTypeAndTypeDetailStatus =
  | "SUCCESS"
  | "LOADING"
  | "ERROR"
  | null;

export interface IAutoPayOffModeTypeAndTypeDetail {
  autoPayOffModes: IAutoPayOffModeResponse[];
  autoPayOffMode: IAutoPayOffModeResponse;
  autoPayOffModeTypeDetailStatus: AutoPayOffModeTypeAndTypeDetailStatus;
}

const initialState: IAutoPayOffModeTypeAndTypeDetail = {
  autoPayOffModes: [],
  autoPayOffMode: { PayOffType: "", cm_payofftypes: [{}] },
  autoPayOffModeTypeDetailStatus: null,
};

const autoPayOffModeTypeAndTypeDetailSlice = createSlice({
  name: "autoPayOffMode",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAutoPayOffModeTypeAndTypeDetail.fulfilled,
      (state, action) => {
        state.autoPayOffModeTypeDetailStatus = "SUCCESS";
        state.autoPayOffModes = action.payload;
      }
    );
    builder.addCase(
      getAutoPayOffModeTypeAndTypeDetail.pending,
      (state, action) => {
        state.autoPayOffModeTypeDetailStatus = "LOADING";
      }
    );
    builder.addCase(
      getAutoPayOffModeTypeAndTypeDetail.rejected,
      (state, action) => {
        state.autoPayOffModeTypeDetailStatus = "ERROR";
      }
    );
    builder.addCase(addAutoPayOffMode.fulfilled, (state, action) => {
      const newAutoPayOffMode = action.payload;
      if (newAutoPayOffMode) {
        state.autoPayOffModes = [...state.autoPayOffModes, newAutoPayOffMode];
      }
      state.autoPayOffModeTypeDetailStatus = "SUCCESS";
    });
    builder.addCase(addAutoPayOffMode.pending, (state, action) => {
      state.autoPayOffModeTypeDetailStatus = "LOADING";
    });
    builder.addCase(addAutoPayOffMode.rejected, (state) => {
      state.autoPayOffModeTypeDetailStatus = "ERROR";
    });
    builder.addCase(removeAutoPayOffMode.fulfilled, (state, action) => {
      let index = state.autoPayOffModes.findIndex(
        ({ PayOffMode_Id }) => PayOffMode_Id === action.payload.PayOffMode_Id
      );
      state.autoPayOffModes.splice(index, 1);
      state.autoPayOffModeTypeDetailStatus = "SUCCESS";
    });
    builder.addCase(removeAutoPayOffMode.pending, (state) => {
      state.autoPayOffModeTypeDetailStatus = "LOADING";
    });
    builder.addCase(removeAutoPayOffMode.rejected, (state) => {
      state.autoPayOffModeTypeDetailStatus = "ERROR";
    });
    builder.addCase(addAutoPayOffType.fulfilled, (state, action) => {
      let index = state.autoPayOffModes.findIndex(
        ({ PayOffMode_Id }) =>
          PayOffMode_Id === action.payload.fk_pay_off_mode_id
      );
      let payOffTypes = state.autoPayOffModes[index].cm_payofftypes;
      if (payOffTypes) {
        payOffTypes.push(action.payload);
        state.autoPayOffModes[index].cm_payofftypes = payOffTypes;
      } else {
        payOffTypes = [action.payload];
        state.autoPayOffModes[index].cm_payofftypes = payOffTypes;
      }
    });
    builder.addCase(addAutoPayOffType.pending, (state) => {
      state.autoPayOffModeTypeDetailStatus = "LOADING";
    });
    builder.addCase(addAutoPayOffType.rejected, (state) => {
      state.autoPayOffModeTypeDetailStatus = "ERROR";
    });
    builder.addCase(removeAutoPayOffType.fulfilled, (state, action) => {
      let index = state.autoPayOffModes.findIndex(
        ({ PayOffMode_Id }) => PayOffMode_Id === action.payload.PayOffMode_Id
      );
      let subIndex = state.autoPayOffModes[index].cm_payofftypes?.findIndex(
        ({ PayOffType_Id }) => PayOffType_Id === action.payload.PayOffType_Id
      );
      if (typeof subIndex === "number") {
        state.autoPayOffModes[index].cm_payofftypes?.splice(subIndex, 1);
      }
      state.autoPayOffModeTypeDetailStatus = "SUCCESS";
    });
    builder.addCase(removeAutoPayOffType.pending, (state) => {
      state.autoPayOffModeTypeDetailStatus = "LOADING";
    });
    builder.addCase(removeAutoPayOffType.rejected, (state) => {
      state.autoPayOffModeTypeDetailStatus = "ERROR";
    });
    builder.addCase(addAutoPayOffTypeDetail.fulfilled, (state, action) => {
      let index = state.autoPayOffModes.findIndex(
        ({ PayOffMode_Id }) => PayOffMode_Id === action.payload.PayOffMode_Id
      );
      let subIndex = state.autoPayOffModes[index].cm_payofftypes?.findIndex(
        ({ PayOffType_Id }) =>
          PayOffType_Id === action.payload.fk_pay_off_type_id
      );
      let payofftypes = state.autoPayOffModes[index].cm_payofftypes;
      let payOffTypeSubDetail: [IAutoPayOffTypeDetail] | undefined;
      if (subIndex && payofftypes) {
        payOffTypeSubDetail = payofftypes[subIndex].cm_payofftypedetail;
      }
      if (payOffTypeSubDetail && subIndex) {
        payOffTypeSubDetail.push(action.payload);
        state.autoPayOffModes[index].cm_payofftypes[
          subIndex
        ].cm_payofftypedetail = payOffTypeSubDetail;
      } else {
        payOffTypeSubDetail = [action.payload];
        state.autoPayOffModes[index].cm_payofftypes[
          subIndex
        ].cm_payofftypedetail = payOffTypeSubDetail;
      }
    });
    builder.addCase(addAutoPayOffTypeDetail.pending, (state, action) => {
      state.autoPayOffModeTypeDetailStatus = "LOADING";
    });
    builder.addCase(addAutoPayOffTypeDetail.rejected, (state, action) => {
      state.autoPayOffModeTypeDetailStatus = "ERROR";
    });
    builder.addCase(removeAutoPayOffTypeDetail.fulfilled, (state, action) => {
      let index = state.autoPayOffModes.findIndex(
        ({ PayOffMode_Id }) => PayOffMode_Id === action.payload.PayOffMode_Id
      );
      let subIndex = state.autoPayOffModes[index].cm_payofftypes.findIndex(
        ({ PayOffType_Id }) => PayOffType_Id === action.payload.PayOffType_Id
      );
      let subSubIndex = state.autoPayOffModes[index].cm_payofftypes[
        subIndex
      ].cm_payofftypedetail?.findIndex(
        ({ PayOffTypeDetail_Id }) =>
          PayOffTypeDetail_Id === action.payload.PayOffTypeDetail_Id
      );
      if (typeof subSubIndex === "number") {
        state.autoPayOffModes[index].cm_payofftypes[
          subIndex
        ].cm_payofftypedetail?.splice(subSubIndex, 1);
      }
      state.autoPayOffModeTypeDetailStatus = "SUCCESS";
    });
    builder.addCase(removeAutoPayOffTypeDetail.pending, (state) => {
      state.autoPayOffModeTypeDetailStatus = "LOADING";
    });
    builder.addCase(removeAutoPayOffTypeDetail.rejected, (state) => {
      state.autoPayOffModeTypeDetailStatus = "ERROR";
    });
  },
});

export default autoPayOffModeTypeAndTypeDetailSlice.reducer;
