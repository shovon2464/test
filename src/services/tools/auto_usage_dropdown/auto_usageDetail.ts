import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export interface UsageDetailRequest {
  usage_detail_id?: string;
  usage_detail?: string;
  usage_id?: string;
}

export const addUsageDetail = async (
  usageDetailRequest: UsageDetailRequest
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{ createUsageDetail(
      usage_detail:{ 
      UsageDetail:"${usageDetailRequest.usage_detail}",
      fk_usage_id:"${usageDetailRequest.usage_id}" })
      {CM_Usage_Detail_Id, UsageDetail}}`,
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

export const deleteUsageDetail = async (usage_detail_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{ deleteUsageDetail(
            usage_detail_id:"${usage_detail_id}")
            {Status, Message}}`,
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

export const updateUsageDetail = async (
  usageDetailRequest: UsageDetailRequest
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{ updateUsageDetail(
            usage_detail_id:"${usageDetailRequest.usage_detail_id}"
            usage_detail:"${usageDetailRequest.usage_detail}")
            {CM_Usage_Detail_Id, UsageDetail}}`,
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
