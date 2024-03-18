export interface IRegisterRequest {
  name: string;
  username: string;
  password: string;
  confirm_password: string;
}

export interface IRegisterResponse {
  user_id: string;
  name: string;
  username: string;
}
