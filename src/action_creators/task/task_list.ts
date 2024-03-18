import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllTasksList,
  updateEachTask,
  deleteEachTask,
  updateJobTypeNSubType,
  getAllTaskHistory,
} from "../../services/task/task";
import { setTaskMessage } from "../../features/task/taskMsgSlice";
export interface ITaskListResponse {
  Task_Id: string;
  Task_Description: string;
  Create_Date: Date | string;
  Assign_Date?: Date | string;
  Close_Date?: Date | string;
  FollowUp_Date?: Date | string;
  QC_Date?: Date | string;
  Expire_Date?: Date | string;
  Create_By: string;
  Assign_By: string;
  Assign_To: string;
  QC_By?: string;
  Job_Type_Name: string;
  Job_Sub_Type_Name: string;
  CRM_Client_Name?: string;
  CRM_Client_Phone?: string;
  CRM_Client_Email?: string;
  Priority_Id?: string;
  Priority_Description?: string;
  Policy_Number?: string;
  Task_Newest_Note?: string;
  Task_Status?: string;
  CM_Vehicle_Info_Id?: string;
  CM_Home_Info_Id?: string;
  Task_Files?: string;
  Task_Quote_Details?: string;
  Address1?: string;
  Address2?: string;
  PostalCode?: string;
  HelloSign_Id?: string;
}

export interface ITaskListJobTypeSubTypeResponse {
  Task_Id: string;
  Job_Type_Id: string;
  Job_Sub_Type_Id: string;
  Policy_Number?: string;
}

export interface ITaskHistory {
  Title: String;
  Link: String;
  Pdf_Link?: String;
  Date: Date;
}

export interface ITaskHistoryResponse {
  TaskHistories: [ITaskHistory];
  Result: boolean;
  Status: number;
}

export const retrieveTasksList = createAsyncThunk<ITaskListResponse[], unknown>(
  "taskList/getTaskList",
  async (_, thunkAPI) => {
    try {
      const response = await getAllTasksList();
      if (response.data) {
        thunkAPI.dispatch(setTaskMessage("Task List Retrieved!"));
        const task_list: ITaskListResponse[] =
          response.data.findAllTaskTablesInfo;
        return task_list;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
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
  }
);

export const updateEachTaskAssignTo = createAsyncThunk<
  ITaskListResponse,
  ITaskListResponse
>(
  "taskList/updateTaskAssignTo",
  async (task_info: ITaskListResponse, thunkAPI) => {
    try {
      const response = await updateEachTask(task_info);
      if (response.data) {
        thunkAPI.dispatch(setTaskMessage("Task Assign To Updated!"));
        const eachTask: ITaskListResponse = response.data.updateTask.Task;
        return eachTask;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
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
  }
);

export const updateEachTaskNewestNote = createAsyncThunk<
  ITaskListResponse,
  ITaskListResponse
>(
  "taskList/updateTaskNewestNote",
  async (task_info: ITaskListResponse, thunkAPI) => {
    try {
      const response = await updateEachTask(task_info);
      if (response.data) {
        thunkAPI.dispatch(setTaskMessage("Task Newest Note Updated!"));
        const eachTask: ITaskListResponse = response.data.updateTask.Task;
        return eachTask;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
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
  }
);

export const updateEachTaskStatus = createAsyncThunk<
  ITaskListResponse,
  ITaskListResponse
>(
  "taskList/updateTaskStatus",
  async (task_info: ITaskListResponse, thunkAPI) => {
    try {
      const response = await updateEachTask(task_info);
      if (response.data) {
        thunkAPI.dispatch(setTaskMessage("Task Status Updated!"));
        const eachTask: ITaskListResponse = response.data.updateTask.Task;
        return eachTask;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
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
  }
);

export const updateOnlineQuoteJobType = createAsyncThunk<
  ITaskListJobTypeSubTypeResponse,
  ITaskListJobTypeSubTypeResponse
>(
  "taskListJobTypeSubType/updateOnlineQuoteJobType",
  async (task_info: ITaskListJobTypeSubTypeResponse, thunkAPI) => {
    try {
      const response = await updateJobTypeNSubType(task_info);
      console.log(response);
      if (response.data) {
        thunkAPI.dispatch(
          setTaskMessage("Task Job Type and Job Sub Type Updated!")
        );
        const eachTask: ITaskListJobTypeSubTypeResponse =
          response.data.updateTask.Task;
        return eachTask;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
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
  }
);

export const deleteTask = createAsyncThunk<string, string>(
  "taskList/deleteEachTask",
  async (task_id: string, thunkAPI) => {
    try {
      const response = await deleteEachTask(task_id);
      if (response.data.deleteTaskAndTaskRelatedRecords.Status) {
        thunkAPI.dispatch(setTaskMessage("Task Deleted!"));
        return task_id;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
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
  }
);

//get policy task history when clicked on "Get details".
export const retrieveTaskHistory = createAsyncThunk<
  ITaskHistoryResponse,
  unknown
>("taskList/getTaskHistory", async (_, thunkAPI) => {
  try {
    const response = await getAllTaskHistory();
    if (response.data) {
      thunkAPI.dispatch(setTaskMessage("Task history retrieved!"));
      const task_history: ITaskHistoryResponse =
        response.data.findAllTaskHistory;
      // console.log(task_history);
      return task_history;
    } else {
      const errorMsg: string = response.errors[0].message.toString();
      thunkAPI.dispatch(setTaskMessage(errorMsg));
      return thunkAPI.rejectWithValue(errorMsg);
    }
  } catch (e: any) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();
    thunkAPI.dispatch(setTaskMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateTaskPolicyNumber = createAsyncThunk<
  ITaskListResponse,
  ITaskListResponse
>(
  "taskList/updateTaskPolicyNumber",
  async (task_info: ITaskListResponse, thunkAPI) => {
    try {
      const response = await updateEachTask(task_info);
      if (response.data) {
        thunkAPI.dispatch(setTaskMessage("Policy Number To Updated!"));
        const eachTask: ITaskListResponse = response.data.updateTask.Task;
        return eachTask;
      } else {
        const errorMsg: string = response.errors[0].message.toString();
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
  }
);
