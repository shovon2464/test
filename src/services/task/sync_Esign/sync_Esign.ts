import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export const getAllFiles = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variable: {},
    query: `mutation{
        ERPFindFileStatus{
            task_id, is_signed
        }
    }`,
  };
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());
//   console.log(result);
  return result;
};
