import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";


export const getAllUsageDetail = async () => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `query{
                        findAllUsageDetail
                      {CM_Usage_Detail_Id, UsageDetail}
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