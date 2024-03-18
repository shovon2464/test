import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
import { ITaskListResponse } from "../../../action_creators/task/task_list";
import { ITaskNotesRequest } from "../../../action_creators/task/task_notes/task_notes";

export const updateNewestNoteForEachTask = async (
  taskInfo: ITaskListResponse
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            updateTask(
            Task_Id: "${taskInfo.Task_Id}",
                task : {
                Task_Newest_Note: "${taskInfo.Task_Newest_Note}"          
                }
            )
            {
              Task{Task_Description, 
                Create_Date, 
                Assign_Date, 
                Close_Date, 
                FollowUp_Date, 
                QC_Date,Expire_Date,
                Create_By,
                Assign_By,
                Assign_To,QC_By,
                Policy_Number,
                Task_Newest_Note,
                CRM_Client_Name,
                CRM_Client_Phone,
                CRM_Client_Email}                           
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

export const getEachTaskNotesByTaskId = async (task_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
             findAllNotesByTaskID(Task_Id: "${task_id}")
             {
               Note_Id,
               Create_Date,
               Description, 
               Reason, 
               By_Who, 
               To_Who, 
               Task_Id, 
               Note_Type_Id
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

export const getLastNotesByTaskId = async (task_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{

             findLastNotesByTaskID(Task_Id: "${task_id}")
             {
               Note_Id,
               Create_Date,
               Description, 
               Reason, 
               Task_Id, 

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


export const addNewNoteToEachTask = async (
  task_note_info: ITaskNotesRequest
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                createNote(
                    data:{
                  Description:"${task_note_info.Description}", 
                  Reason: "${task_note_info.Reason}", 
                  By_Who:"${task_note_info.By_Who}", 
                  To_Who:"${task_note_info.To_Who}", 
                  Task_Id:"${task_note_info.Task_Id}", 
                  }
                )
                {Note{Note_Id,Create_Date,Description, Reason, By_Who, To_Who, Task_Id, Note_Type_Id},
                Status, Message}}`,
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
