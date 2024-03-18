import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
import { ITaskJobSubType } from "../../../action_creators/tools/task_job_type_dropdown/task_job_type";

export const createJobSubType = async (task_job_sub_type: ITaskJobSubType) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                createJobSubType(
                    data:{
                            Job_Sub_Type_Name:"${task_job_sub_type.Job_Sub_Type_Name}"
                            Score: ${task_job_sub_type.Score},
                            Job_Type_Id:"${task_job_sub_type.Job_Type_Id}"})                    
           {Job_Sub_Type{Job_Sub_Type_Id, Job_Sub_Type_Name,Score, Job_Type_Id},Status, Message}}`,
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

export const deleteEachJobSubType = async (job_sub_type_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            deleteJobSubType(
            Job_Sub_Type_Id:"${job_sub_type_id}",
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
