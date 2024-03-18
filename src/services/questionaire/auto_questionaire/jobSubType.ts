import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export interface JobSubTypeResponse {
  Job_Sub_Type_Id: string;
  Job_Sub_Type_Name: string;
  Job_Type_Id: string;
}

export interface JobSubTypeRequest {
  // Job_Sub_Type_Id: string;
  // Job_Sub_Type_Name: string;
  Job_Type_Id: string;
}

export const getAllJobSubType = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
                      findAllJobSubType{Job_Sub_Type_Id,Job_Sub_Type_Name, Score}
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

export const getRelatedJobSubType = async (
  jobSubTypeRequest: JobSubTypeRequest
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
                      findJobSubTypeByJobTypeId (Job_Type_Id:"${jobSubTypeRequest.Job_Type_Id}")
                      {
                        Job_Type_Id
                        Job_Type_Name
                        job_sub_types {
                          Job_Sub_Type_Id
                          Job_Sub_Type_Name
                          Score
                          Job_Type_Id
                        }
                        Message
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
