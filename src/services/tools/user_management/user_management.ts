import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
import {
  IUserListWithActiveValueResponse,
  IUserResetPassword,
} from "../../../action_creators/tools/user_management/user_management";
import { IUserRoleManagement } from "../../../action_creators/tools/role_management_dropdown/role_management";

export const getAllUsersListWithActiveValue = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{findAllUsersWithActiveValue{user_id, name, username, active, senior, roles {role_id, name}}}`, //find all users, instead of active users.
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

export const updateUserActive = async (
  data: IUserListWithActiveValueResponse
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
      update_user (user_id: "${data.user_id}", data: {active: ${data.active}, senior: ${data.senior}})
                    {
                        user_id
                        name
                        username
                        active
                        senior
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

export const updateUserPassword = async (data: IUserResetPassword) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
      update_user (user_id: "${data.user_id}", data: {password: "${data.password}"})
      {
        user_id
      }}`,
  };
  console.log("query", query);
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

export const updateUserRole = async (data: IUserRoleManagement) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
      update_user_role (user_id: "${data.user_id}", role_id: "${data.role_id}", name: "${data.name}")
                    {
                        user_id
                        name
                        username
                        active
                        senior
                        roles {role_id, name}
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

  console.log(result);

  return result;
};

export const deleteUser = async (user_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                delete_user (user_id: "${user_id}")
                    {
                        Status
                        Message
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
