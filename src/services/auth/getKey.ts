export interface ILoggedInInfo {
  Message: string;
  Name: string;
  Role: string;
  Status: boolean;
  Username: string;
  accessToken: string;
}

export const key = () => {
  const userInfo = localStorage.getItem("user");
  let AccessToken: string | null;
  if (userInfo) {
    const user = JSON.parse(userInfo);
    AccessToken = user.accessToken;
    return AccessToken;
  } else {
    AccessToken = null;
    return AccessToken;
  }
};

export const getBrokerUserName = () => {
  const userInfo = localStorage.getItem("user");
  let brokerName: string;
  if (userInfo) {
    const user = JSON.parse(userInfo);
    brokerName = user.Username;
    return brokerName;
  } else {
    brokerName = "";
    return brokerName;
  }
};

export const getBrokerName = () => {
  const userInfo = localStorage.getItem("user");
  let brokerName: string;
  if (userInfo) {
    const user = JSON.parse(userInfo);
    brokerName = user.Name;
    return brokerName;
  } else {
    brokerName = "";
    return brokerName;
  }
};

export const getUserRole = () => {
  const userInfo = localStorage.getItem("user");
  let role: string;
  if (userInfo) {
    const user = JSON.parse(userInfo);
    role = user.Role;
    return role;
  } else {
    role = "";
    return role;
  }
};

export const getUserInfo = (): ILoggedInInfo => {
  const userInfo = localStorage.getItem("user");
  let user_info: ILoggedInInfo = {
    Message: "",
    Name: "",
    Role: "",
    Status: false,
    Username: "",
    accessToken: "",
  };
  if (userInfo) {
    const user = JSON.parse(userInfo);
    user_info = user;
    return user_info;
  } else {
    return {
      Message: "",
      Name: "",
      Role: "",
      Status: false,
      Username: "",
      accessToken: "",
    };
  }
};
