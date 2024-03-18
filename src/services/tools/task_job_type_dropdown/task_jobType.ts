import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export const getAllJobTypeAndJobSubType = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
                    findAllJobTypeAndJobSubType{
                        Job_Type_Id
                        Job_Type_Name
                        job_sub_types {
                        Job_Sub_Type_Id
                        Job_Sub_Type_Name
                        Score
                        Job_Type_Id
                        }
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

export const createJobType = async (job_type_name: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
  createJobType(
      data:{Job_Type_Name:"${job_type_name}"})
      {Job_Type_Id, Job_Type_Name}}`,
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

export const deleteEachJobType = async (job_type_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            deleteJobType(
            Job_Type_Id:"${job_type_id}",
            )
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
