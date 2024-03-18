import { key } from "../../auth/getKey";
import { API_URL } from "../../../app/endpoint";
import { IThirdPartyConnection } from "../../../action_creators/tools/third_party_connnection/third_party_connection";

export const getAllThirdPartyConnections = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
        findAllThirdPartyConnections{
          ThirdPartyConnection_Id,
          url,
          username,
          password,
          third_party_name
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
