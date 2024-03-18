import { API_URL } from "../../app/endpoint";
import { key } from "../auth/getKey";
import { IQuoteToTaskRequest } from "../../action_creators/quote/changeQuoteToTask";

export const getAllQuotesList = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
                findAllQuotesInfo {
                    FullName
                    PhoneNumber
                    Email
                    Address1
                    Address2
                    PostalCode
                    SubmitDate
                    QuoteDetail 
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

// quick quote from JSON
export const getAllQuotes = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
      findAllQuotes {
        Quote_Id
        FullName
        PhoneNumber
        Email
        Address1
        Address2
        PostalCode
        SubmitDate
        QuoteDetail 
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

// quick quote
export const deleteQuote = async (FullName: string, SubmitDate: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
      deleteQuotesFromDB(
        FullName:"${FullName}",
        SubmitDate:"${SubmitDate}"
      )
      { Status, Message}
    }`,
  };

  // console.log(query);
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());
  console.log(result);
  return result;
};

export const changeQuoteToTask = async (taskReq: IQuoteToTaskRequest) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
              createTask(
                  task:{
                Task_Description:"${taskReq.Task_Description}",
                Policy_Number:"",
                Assign_Date:"${taskReq.Assign_Date}",
                Create_By:"${taskReq.Create_By}",
                Assign_By:"${taskReq.Assign_By}",
                Assign_To:"${taskReq.Assign_To}",
                QC_By:"${taskReq.QC_By}" ,
                Job_Type_Id:"${taskReq.Job_Type_Id}",
                Job_Sub_Type_Id:"${taskReq.Job_Sub_Type_Id}",
                Task_Source_Id: "12995f1e-4369-4339-bf90-4f2d5126d746",
                Priority_Id: "04309c60-3049-4c4b-83e2-7dc5556f38fb",
                CRM_Client_Name: "${taskReq.CRM_Client_Name}",
                CRM_Client_Phone:"${taskReq.CRM_Client_Phone}",
                CRM_Client_Email:"${taskReq.CRM_Client_Email}",
                Task_Status: "INPROGRESS",
                Task_Quote_Details: "${taskReq.Task_Quote_Details}",
                Address1:"${taskReq.Address1}",
                Address2:"${taskReq.Address2}",
                PostalCode:"${taskReq.PostalCode}",
                }
              )
              {Task{Task_Id,Task_Description,Create_Date, Assign_Date,Close_Date, FollowUp_Date, QC_Date,Expire_Date,Create_By,Assign_By,Assign_To,QC_By,Job_Type_Id,Job_Sub_Type_Id, Task_Source_Id, Priority_Id,Policy_Number, Task_Status, Address1, Address2, PostalCode},
                  Status, Message}
            }`,
  };
  // console.log(query);
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());
  console.log(result);

  return result;
};

export const getQuotes = async (webOrQuick: number) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
      findQuotes(webOrQuick: ${webOrQuick})
      {
        FullName
        PhoneNumber
        Email
        Address1
        Address2
        PostalCode
        SubmitDate
        QuoteDetail
        Type
        Viewed
      }
    }
    `,
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

export const setViewed = async (FullName: string, SubmitDate: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
      setViewed(
        FullName: "${FullName}"
        SubmitDate: "${SubmitDate}"
        Viewed: 1
      )
      {
        Viewed
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

export const areAllQuotesViewed = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
      areAllQuotesViewed
      { 
        Result 
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

// fetch web quote and save into back-end database
export const fetchAndInsertWebQuote = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
              insertWebQuote {
                Status
                Message
              }
            }`,
  };

  // console.log(query);
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());
  // console.log(result);
  return result;
};
