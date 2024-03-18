import { API_URL } from "../../app/endpoint";
import { key } from "../auth/getKey";

export const getClientInfoByPhoneNumber = async (phone_number: string) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query : `query {
                    findClientNameByPhoneNumber(phone_number: "${phone_number}")
                    {
                        client_predict_value_id
                        client_name
                        predict_value
                        client_tag {
                            tag_id
                            tag_description
                            client_predict_value_id
                        }
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

export const getClientInfoByClientPredictValueId = 
async (client_predict_value_id: string) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query : `query {
                findClientNameByClientPredictValueId
                (client_predict_value_id: "${client_predict_value_id}")
                    {
                        client_predict_value_id
                        client_name
                        predict_value
                        client_tag {
                            tag_id
                            tag_description
                            client_predict_value_id
                        }
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