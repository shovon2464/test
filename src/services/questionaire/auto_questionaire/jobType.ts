import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export interface JobTypeResponse {
    Job_Type_Id: string;
    Job_Type_Name: string;
}


export interface JobTypeRequest {
    Job_Type_Id: string;
    Job_Type_Name: string;
}

export const getAllJobType = async () => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `query{
                      findAllJobType
                      {Job_Type_Id,Job_Type_Name}
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