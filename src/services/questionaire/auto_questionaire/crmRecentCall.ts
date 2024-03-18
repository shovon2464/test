import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export const getRecentCalls = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
          FindRecentCalls {
              RecentCall {
                  name
                  phone
                  datetime
                  description
              }
              Result
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