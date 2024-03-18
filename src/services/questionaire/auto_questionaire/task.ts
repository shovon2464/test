import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export interface TaskRequest {
  Task_Description: string;
  Job_Type_Id: string;
  Job_Sub_Type_Id: string;
  // Task_Source_Id: string;
  Priority_Id: string;
  Assign_Date: Date;
  CM_Vehicle_Info_Id: string;
  CM_Home_Info_Id?: string;
  Assign_To: string;
  Policy_Number: string;
  CRM_Client_Name: string;
  CRM_Client_Phone: string;
  CRM_Client_Email: string;
  // Task_Status:string;
}

export const addTask = async (taskRequest: TaskRequest) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                      createTask(
                          task:{
                                 Task_Description:"${taskRequest.Task_Description}",
                                 Assign_Date: "${taskRequest.Assign_Date}",
                                 Job_Type_Id:"${taskRequest.Job_Type_Id}",
                                 Job_Sub_Type_Id:"${taskRequest.Job_Sub_Type_Id}",
                                 Task_Source_Id: "12995f1e-4369-4339-bf90-4f2d5126d746",
                                 Priority_Id: "${taskRequest.Priority_Id}",
                                 Assign_To:"${taskRequest.Assign_To}",
                                 Task_Status:"INPROGRESS",
                                 CM_Vehicle_Info_Id:"${taskRequest.CM_Vehicle_Info_Id}",
                                 Policy_Number:"${taskRequest.Policy_Number}",
                                 CRM_Client_Name:"${taskRequest.CRM_Client_Name}",
                                 CRM_Client_Phone:"${taskRequest.CRM_Client_Phone}",
                                 CRM_Client_Email:"${taskRequest.CRM_Client_Email}",
                                 
                                }
                      )
                      {Task{Task_Id,Task_Description,Create_Date,Assign_Date, Create_By,Job_Type_Id,Job_Sub_Type_Id, Task_Source_Id, Priority_Id, Task_Status},
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

export const addTaskWithHomeInfoId = async (taskRequest: TaskRequest) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                      createTask(
                          task:{
                                 Task_Description:"${taskRequest.Task_Description}",
                                 Assign_Date: "${taskRequest.Assign_Date}",
                                 Job_Type_Id:"${taskRequest.Job_Type_Id}",
                                 Job_Sub_Type_Id:"${taskRequest.Job_Sub_Type_Id}",
                                 Task_Source_Id: "12995f1e-4369-4339-bf90-4f2d5126d746",
                                 Priority_Id: "${taskRequest.Priority_Id}",
                                 Assign_To:"${taskRequest.Assign_To}",
                                 Task_Status:"INPROGRESS",
                                 CM_Home_Info_Id:"${taskRequest.CM_Home_Info_Id}",
                                 Policy_Number:"${taskRequest.Policy_Number}",
                                 CRM_Client_Name:"${taskRequest.CRM_Client_Name}",
                                 CRM_Client_Phone:"${taskRequest.CRM_Client_Phone}",
                                 CRM_Client_Email:"${taskRequest.CRM_Client_Email}",
                                 
                                }
                      )
                      {Task{Task_Id,Task_Description,Create_Date,Assign_Date, Create_By,Job_Type_Id,Job_Sub_Type_Id, Task_Source_Id, Priority_Id, Task_Status},
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

export const addTask1 = async (taskRequest: {
  Task_Status: string;
  Task_Description: string;
  Assign_Date: Date;
  Assign_To: string;
  Priority_Id: string;
  Job_Type_Id: string;
  Job_Sub_Type_Id: string;
  Policy_Number: string;
  CRM_Client_Name: string;
  CRM_Client_Phone: string;
  CRM_Client_Email: string;
}) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                      createTask(
                          task:{
                                 Task_Description:"${taskRequest.Task_Description}",
                                 Assign_Date: "${taskRequest.Assign_Date}",
                                 Job_Type_Id:"${taskRequest.Job_Type_Id}",
                                 Job_Sub_Type_Id:"${taskRequest.Job_Sub_Type_Id}",
                                 Task_Source_Id: "12995f1e-4369-4339-bf90-4f2d5126d746",
                                 Priority_Id: "${taskRequest.Priority_Id}",
                                 Assign_To:"${taskRequest.Assign_To}",
                                 Task_Status:"INPROGRESS",
                                 Policy_Number:"${taskRequest.Policy_Number}",
                                 CRM_Client_Name:"${taskRequest.CRM_Client_Name}",
                                 CRM_Client_Phone:"${taskRequest.CRM_Client_Phone}",
                                 CRM_Client_Email:"${taskRequest.CRM_Client_Email}",
                                }
                      )
                      {Task{Task_Id,Task_Description,Create_Date,Assign_Date, Create_By,Job_Type_Id,Job_Sub_Type_Id, Task_Source_Id, Priority_Id, Task_Status},
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
