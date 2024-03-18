import { API_URL } from "../../app/endpoint";
import { key } from "../auth/getKey";
import { IUserPerformanceRequest } from "../../action_creators/performance_report/user_performance";

export const createAnUserPerformanceRecord = async (
  req: IUserPerformanceRequest
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
                createUserPerformanceRecord(user_performance:{
                    Phone_Number:"${req.Phone_Number}"
                    Cost_Time:${req.Cost_Time}
                    Job_Close_Date:"${req.Job_Close_Date}"
                    Job_Type:"${req.Job_Type}"
                    Job_Sub_Type:"${req.Job_Sub_Type}"
                    user_id:"${req.user_id}"
                    UserName:"${req.UserName}"
                    
                })
                {
                    User_Performance_Id
                    Phone_Number
                    Cost_Time
                    Job_Close_Date
                    Job_Type
                    Job_Sub_Type
                    UserName
                    user_id
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

export const findAllPerformanceRecords = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
            findAllPerformanceRecords{
                User_Performance_Id
                Phone_Number
                Cost_Time
                Job_Close_Date
                Job_Type
                Job_Sub_Type
                UserName
                user_id
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

export const findPerformanceRecordsByUserId = async (userId: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
            findAllPerformanceRecordsByUserId(user_id:"${userId}"){
                User_Performance_Id
                Phone_Number
                Cost_Time
                Job_Close_Date
                Job_Type
                Job_Sub_Type
                UserName
                user_id
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
