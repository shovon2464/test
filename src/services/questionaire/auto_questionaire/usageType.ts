import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export interface UsageTypeResponse {
    CM_Usage_Id: string;
    UsageType: string;
}

export interface UsageTypeRequest {
    CM_Usage_Id: string;
    UsageType: string;
}

export const getAllUsageType = async () => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `query{
                        findAllUsageType
                      {CM_Usage_Id, UsageType}
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