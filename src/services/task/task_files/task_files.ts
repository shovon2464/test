import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export const getTaskFilesByTaskId = async (task_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `{
                findTaskFilesByTaskId(Task_Id:"${task_id}")
                {
                  Task_File_Id
                  Task_File_Name
                  Upload_By
                  File_Path
                  Task_File_Job_Type_Name
                  Task_Id
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
