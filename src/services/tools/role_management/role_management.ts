import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export const getAllRoleManagement = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{findAllRoles{role_id, name}}`,
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

export const createRole = async (roleName: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            add_role(
                data: 
                {
                    name: "${roleName}"
                })
            {role_id, name}}`,
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

export const deleteRole = async (role_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            delete_role(
                role_id:"${role_id}"
            )
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

export const getRolesByUserId = async (user_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
      findAllRolesByUserId(
        user_id: "${user_id}"
      )
      {role_id, name}
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
}