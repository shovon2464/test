import { IClientTagResponse } from "../../action_creators/evaluation/client_tag";
import { API_URL } from "../../app/endpoint";
import { key } from "../auth/getKey";


export const addNewClientTag = 
async (client_tag_info: IClientTagResponse) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query : `mutation {
            createClient_tag
                (data: {tag_description: "${client_tag_info.tag_description}", 
                    client_predict_value_id: "${client_tag_info.client_predict_value_id}"})
                    {
                        tag_id
                        tag_description
                        client_predict_value_id
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
}

export const getClientTagsByClientPredictValueId = 
async (client_predict_value_id: string) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query : `query {
                findAllClientTagsByClientPredictValueId
                    (client_predict_value_id: "${client_predict_value_id}")
                    {
                        tag_id
                        tag_description
                        client_predict_value_id
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
}

export const deleteClientTag = 
async (tag_id: string) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query : `mutation {
                deleteClient_tag
                    (tag_id: "${tag_id}")
                    {
                        Status
                        Message
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
}