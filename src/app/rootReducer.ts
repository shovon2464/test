import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import authMessageReducer from "../features/auth/authMsgSlice";
import autoUsageReducer from "../features/tools/auto_usage_dropdown/autoUsageSlice";
import dropdownTypeMsgReducer from "../features/tools/dropdownTypeMsgSlice";
import autoUsageAndDetailTypeReducer from "../features/tools/auto_usage_dropdown/autoUsageAndDetailTypeSlice";
import taskMessageReducer from "../features/task/taskMsgSlice";
import ticketMessageReducer from "../features/ticket/ticketMsgSlice";
import quoteMessageReducer from "../features/quote/quoteMsgSlice";
import quoteListReducer from "../features/quote/quote_list/quoteListSlice";
import taskListReducer from "../features/task/task_list/taskListSlice";
import roleManagementSlice from "../features/tools/role_management/roleManagementSlice";
import taskListJobTypeSubTypeReducer from "../features/task/task_list_job_type_sub_type/taskListJobTypeSubTypeSlice";
import userListReducer from "../features/task/user_list/userListSlice";
import roleListReducer from "../features/tools/role_management/roleManagementSlice";
import seniorUsersListReducer from "../features/task/user_list/seniorUsersListSlice";
import userListWithActiveValueReducer from "../features/tools/user_management/userManagementSlice";
import autoCoverageReducer from "../features/tools/auto_coverage_dropdown/autoCoverageSlice";
import autoPayOffModeTypeAndSubTypeReducer from "../features/tools/auto_payoffmode_dropdown/autoPayOffModeSlice";
import autoStatusReducer from "../features/tools/auto_status_dropdown/autoStatusSlice";
import taskJobTypeAndSubTypeReducer from "../features/tools/task_job_type_dropdown/taskJobTypeSlice";
import taskPriorityReducer from "../features/tools/task_priority_dropdown/taskPrioritySlice";
import roleReducer from "../features/tools/role_management/roleManagementSlice";
import taskFilesReducer from "../features/task/task_files/taskFilesSlice";
import eachVehicleInfoReducer from "../features/task/vehicle_info/vehicleInfoSlice";
import jobTypeListReducer from "../features/task/job_type/jobTypeListSlice";
import jobSubTypeListReducer from "../features/task/job_sub_type/jobSubTypeListSlice";
import taskSourceReducer from "../features/tools/task_source_dropdown/taskSourceSlice";
import taskNotesReducer from "../features/task/task_notes/taskNotesSlice";
import driverInfoReducer from "../features/task/driver_info/driverInfoSlice";
import performanceReportMessageReducer from "../features/performance_report/performanceReportMsgSlice";
import performanceReportListReducer from "../features/performance_report/performanceReportListSlice";
import quotePdfCoordinatesReducer from "../features/tools/quote_pdf_coordinates/quotePdfCoordinateSlice";
import eachHomeInfoReducer from "../features/task/home_info/homeInfoSlice";
import ticketReducer from "../features/ticket/ticket/ticketSlice";
import ticketCommentReducer from "../features/ticket/ticket_comments/ticketCommentsSlice";
import autoDeleteSlice from "../features/tools/auto_delete_dropdown/autoDeleteSlice";
import allQuoteSlice from "../features/quote/allQuoteSlice";
import taskHistorySlice from "../features/task/task_list/taskHistorySlice";
import userResetPasswordSlice from "../features/tools/user_management/userResetPasswordSlice";
import syncEsignSlice from "../features/task/sync_esign/syncEsignSlice";
import coming_callsSlice from "../features/evaluation/coming_calls/coming_callsSlice";
import client_predict_valueSlice from "../features/evaluation/client_predict_value/client_predict_valueSlice";
import client_tagSlice from "../features/evaluation/client_tag/client_tagSlice";
import thirdPartyConnectionSlice from "../features/tools/third_party_connection/thirdPartyConnectionSlice";
import CRMCallSLice from "../features/evaluation/coming_calls/crm_coming_calls";

export default combineReducers({
  counter: counterReducer,
  auth: authReducer,
  authMsg: authMessageReducer,
  autoUsage: autoUsageReducer,
  autoUsageAndDetailType: autoUsageAndDetailTypeReducer,
  autoCoverage: autoCoverageReducer,
  autoPayOffModeTypeAndSubType: autoPayOffModeTypeAndSubTypeReducer,
  autoStatus: autoStatusReducer,
  dropdownTypeMsg: dropdownTypeMsgReducer,
  taskMsg: taskMessageReducer,
  ticketMsg: ticketMessageReducer,
  quoteMsg: quoteMessageReducer,
  performanceReportMsg: performanceReportMessageReducer,
  quoteList: quoteListReducer,
  taskList: taskListReducer,
  ticketList: ticketReducer,
  ticketCommentsList: ticketCommentReducer,
  taskJobTypeAndSubType: taskJobTypeAndSubTypeReducer,
  taskListJobTypeSubType: taskListJobTypeSubTypeReducer,
  taskPriority: taskPriorityReducer,
  role: roleReducer,
  roleManagement: roleManagementSlice,
  autoDelete: autoDeleteSlice,
  taskFiles: taskFilesReducer,
  userList: userListReducer,
  roleList: roleListReducer,
  userListWithActiveValue: userListWithActiveValueReducer,
  seniorUsersList: seniorUsersListReducer,
  eachVehicleInfo: eachVehicleInfoReducer,
  jobTypeList: jobTypeListReducer,
  jobSubTypeList: jobSubTypeListReducer,
  taskSource: taskSourceReducer,
  taskNotes: taskNotesReducer,
  driversInfo: driverInfoReducer,
  performanceReportList: performanceReportListReducer,
  quotePdfCoordinates: quotePdfCoordinatesReducer,
  eachHomeInfo: eachHomeInfoReducer,
  allQuote: allQuoteSlice,
  taskHistory: taskHistorySlice,
  resetPassword: userResetPasswordSlice,
  syncEsign: syncEsignSlice,
  coming_call: coming_callsSlice,
  client_predict_value: client_predict_valueSlice,
  client_tag: client_tagSlice,
  thirdPartyConnection: thirdPartyConnectionSlice,
  CRMCalls: CRMCallSLice,
});
