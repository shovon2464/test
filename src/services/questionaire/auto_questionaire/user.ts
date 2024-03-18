import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export interface UserResponse {
    user_id: string;
    name: string;
    username: string;
}

export interface UserRequest {
   user_id: string;
   name: string;
   username: string;
}

export const getAllUser = async () => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `query{
                      findAllUsers{user_id,name, username}
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