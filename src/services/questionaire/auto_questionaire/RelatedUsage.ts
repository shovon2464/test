import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";


export interface RelatedUsageRequest {
    CM_Usage_Id: string;
}

export const getRelatedUsage = async (relatedUsageRequest:RelatedUsageRequest) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `query {
                          findUsageTypeDetailsByUsageTypeId(CM_Usage_Id:"${relatedUsageRequest.CM_Usage_Id}")
                          {
                            CM_Usage_Id
                            UsageType
                            cm_usage_details{
                              CM_Usage_Detail_Id
                              UsageDetail
                              fk_usage_id
                            }
                          }
                        }
                        `,
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