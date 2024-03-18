import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";


export interface TaskNoteRequest {
    policyNumber: string;
    Notes: string;
}

export const sendCRMTaskNote = async (taskNoteRequest: TaskNoteRequest) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `mutation{
                          sendTaskNote(
                            policyNumber:"${taskNoteRequest.policyNumber}",
                            Notes:"${taskNoteRequest.Notes}"
                          )
                          {Result, Status}
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