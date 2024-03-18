import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";


export interface AutoPolicyCheckRequest {
    policyNumber: string;
}

export const getAutoPolicyCheck = async (autoPolicyCheckRequest: AutoPolicyCheckRequest) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `mutation{
                          AutoPolicyCheck(
                            policyNumber:"${autoPolicyCheckRequest.policyNumber}",
                          )
                          {PolicyNumber,
                          StartEffectiveDate,
                          EndEffectiveDate,
                          Name,
                          PhoneNumber,
                          Birthdate, 
                          Result,
                          Status}
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