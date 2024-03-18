import { API_URL } from "../../app/endpoint";
import { key } from "../auth/getKey";
import {
  ITaskListResponse,
  ITaskListJobTypeSubTypeResponse,
} from "../../action_creators/task/task_list";

export const getAllTasksList = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
                findAllTaskTablesInfo {
                    Task_Id
                    Task_Description
                    Create_Date
                    Assign_Date
                    Close_Date
                    FollowUp_Date
                    QC_Date
                    Expire_Date
                    Create_By
                    Assign_By
                    Assign_To
                    QC_By
                    Job_Type_Name
                    Job_Sub_Type_Name
                    CRM_Client_Name
                    CRM_Client_Phone
                    CRM_Client_Email
                    Priority_Id
                    Priority_Description
                    Policy_Number
                    Task_Newest_Note
                    Task_Status
                    CM_Vehicle_Info_Id
                    CM_Home_Info_Id
                    Task_Files
                    Task_Quote_Details
                    Address1
                    Address2
                    PostalCode
                }
             }`,
  };
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());

  return result;
};

export const updateEachTask = async (taskInfo: ITaskListResponse) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
                updateTask (
                    Task_Id: "${taskInfo.Task_Id}",
                    task: {
                    Task_Description: "${taskInfo.Task_Description}",
                    Assign_Date: "${taskInfo.Assign_Date}",
                    Close_Date: "${taskInfo.Close_Date}",
                    FollowUp_Date: "${taskInfo.FollowUp_Date}",
                    QC_Date: "${taskInfo.QC_Date}",
                    Expire_Date: "${taskInfo.Expire_Date}",
                    Create_By: "${taskInfo.Create_By}",
                    Assign_By: "${taskInfo.Assign_By}",
                    Assign_To: "${taskInfo.Assign_To}",
                    QC_By: "${taskInfo.QC_By}",
                    CRM_Client_Name: "${taskInfo.CRM_Client_Name}",
                    CRM_Client_Phone: "${taskInfo.CRM_Client_Phone}",
                    CRM_Client_Email: "${taskInfo.CRM_Client_Email}",
                    Policy_Number: "${taskInfo.Policy_Number}",
                    Task_Newest_Note: "${taskInfo.Task_Newest_Note}",
                    Task_Status: "${taskInfo.Task_Status}",
                  }
                )
                {Task{Task_Id,Task_Description,Create_Date, Assign_Date,Close_Date, FollowUp_Date, QC_Date,Expire_Date,Create_By,Assign_By,Assign_To,QC_By,Task_Source_Id,Priority_Id,Job_Type_Id,Job_Sub_Type_Id, Policy_Number, Task_Newest_Note, Task_Status},
                 Status, Message}
             }`,
  };
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());

  return result;
};

export const deleteEachTask = async (task_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
                deleteTaskAndTaskRelatedRecords(Task_Id:"${task_id}")
                {
                  Message
                  Status
                }}`,
  };
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());

  return result;
};

export const updateJobTypeNSubType = async (
  taskInfo: ITaskListJobTypeSubTypeResponse
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
                updateTask (
                    Task_Id: "${taskInfo.Task_Id}",
                    task: {
                      Job_Type_Id: "${taskInfo.Job_Type_Id}",
                      Job_Sub_Type_Id: "${taskInfo.Job_Sub_Type_Id}",
                      Policy_Number: "${taskInfo.Policy_Number}",
                  }
                )
                {Task{Task_Id,Task_Description,Create_Date, Assign_Date,Close_Date, FollowUp_Date, QC_Date,Expire_Date,Create_By,Assign_By,Assign_To,QC_By,Task_Source_Id,Priority_Id,Job_Type_Id,Job_Sub_Type_Id, Policy_Number, Task_Newest_Note, Task_Status},
                 Status, Message}
             }`,
  };
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());

  return result;
};

//get policy task history when clicked on "Get details" button to add new task.
export const getAllTaskHistory = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
        findAllTaskHistory 
        {
          TaskHistories {
            Title
            Link
            Pdf_Link
            Date
          }
          Result
          Status
        }
      }`,
  };
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());
  return result;
};
