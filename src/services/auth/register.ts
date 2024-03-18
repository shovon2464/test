import { API_URL } from "../../app/endpoint";

export interface RegisterResponse {
  user_id: string;
  name: string;
  username: string;
  active: boolean;
}

export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
}

export const register = async (registerRequest: RegisterRequest) => {
  let register_query: object = {
    operationName: null,
    variables: {},
    query: `mutation { add_user(data:{
                  name:"${registerRequest.name}", 
                  username:"${registerRequest.username}",
                  password:"${registerRequest.password}",
                })
                {user_id, name, username, active}
              }`,
  };
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(register_query),
  }).then((res) => res.json());

  return result;
};
