import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";


export interface VINCheckRequest {
    policyNumber: string;
}

export const getAllVINCheck = async (vinCheckRequest: VINCheckRequest) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `mutation{
                          VINCheck(
                            policyNumber:"${vinCheckRequest.policyNumber}",
                          )
                          {
                              policy, Car{make,VIN}, Result, Status
                              }
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