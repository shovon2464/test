import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export interface PriorityResponse {
    Priority_Id: string;
    Priority_Description: string;
}


export interface PriorityRequest {
    Priority_Id: string;
    Priority_Description: string;
}

export const getAllPriority = async () => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `query{
                      findAllPriority{Priority_Id,Priority_Description}
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