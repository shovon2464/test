import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export interface PayOffTypeResponse {
    PayOffMode_Id: string;
    PayOffType: string;
}

export interface PayOffTypeRequest {
    PayOffMode_Id: string;
    PayOffType: string;
}

export const getAllPayOffType = async () => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `query{
                         findAllPayOffMode
                         {PayOffMode_Id,PayOffType}
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