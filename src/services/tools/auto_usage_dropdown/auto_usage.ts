import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export interface UsageTypeResponse {
  usage_id: string;
  usage_type: string;
}

export interface UsageTypeRequest {
  usage_id: string;
  usage_type: string;
}

export const getAllUsageType = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{findAllUsageType{CM_Usage_Id, UsageType}}`,
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

export const getAllUsageTypeAndUsageDetails = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
                  findAllUsageTypeAndUsageTypeDetails
                  {
                    CM_Usage_Id,
                    UsageType,
                    cm_usage_details {   
                      CM_Usage_Detail_Id,
                      UsageDetail
                    }
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

export const addUsageType = async (usage_type: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                createUsage(usage: {UsageType:"${usage_type}"})
                {CM_Usage_Id, UsageType}
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

export const deleteUsageType = async (usage_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                deleteUsage(usage_id:"${usage_id}")
                {Status, Message}
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

export const updateUsageType = async (usage_id: string, usage_type: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                updateUsage(usage_id:"${usage_id}",
                usage: { usage_type:"${usage_type}"} )
                {CM_Usage_Id, UsageType}
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
