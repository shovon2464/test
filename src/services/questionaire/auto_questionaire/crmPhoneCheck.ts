import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";


export interface PhoneCheckRequest {
    phoneNumber: string;
}

export const PhoneCheck = async (phoneCheckRequest: PhoneCheckRequest) => {
    const AccessToken = key();
    // console.log("new", phoneCheckRequest.phoneNumber);
    let query: object = {
        operationName: null,
        variables: {},
        query: `mutation{
                          ClientCheck(
                            phoneNumber:"${phoneCheckRequest.phoneNumber}",
                          )
                          {Name, PhoneNumber, Birthdate, Email
                          Policy{policy_number, policy_status, policy_expiry},
                          Result,
                          Status
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