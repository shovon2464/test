import { API_URL } from "../../app/endpoint";

export interface UserResponse {
  token: string;
  role: string;
  message: string;
  status: boolean;
  name: string;
  username: string;
}
/*type UserAuthInfo = {
  accessToken: string;
  Role: string;
  Message: string;
  status: string;
}; */
export interface LoginRequest {
  username: string;
  password: string;
}

export const login = async (loginRequest: LoginRequest) => {
  let login_query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                login(username:"${loginRequest.username}", password:"${loginRequest.password}")
                {accessToken, Role, Message, Status, Name, Username}
              }`,
  };
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login_query),
  })
    .then((res) => res.json())
    .then(({ data, errors }) => {
      if (data) {
        const accessToken = data.login.accessToken;
        const loginStatus = data.login.Status;
        const loginMessage = data.login.Message;
        const name = data.login.Name;
        const userName = data.login.Username;
        if (loginStatus && accessToken && accessToken !== "None") {
          localStorage.setItem("user", JSON.stringify(data.login));
          const userResponse: UserResponse = {
            token: accessToken,
            role: data.login.Role,
            message: loginMessage,
            status: loginStatus,
            name: name,
            username: userName,
          };
          return userResponse;
        }
        throw new Error(`${loginMessage}`);
      } else {
        throw new Error(`${errors[0].message}`);
      }
    });

  return result;
};
