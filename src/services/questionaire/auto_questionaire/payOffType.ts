import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export interface PayOffTypeDetailResponse {
    // PayOffType_Id: string;
    // PayOffTypeDetail: string;
}

export interface PayOffTypeDetailRequest {
    // PayOffType_Id: string;
    // PayOffTypeDetail: string;
    fk_pay_off_mode_id:string;
}

export const getAllPayOffTypeDetail = async () => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `query{
                        findAllPayOffType
                      {PayOffType_Id, PayOffTypeDetail}
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

//=======================================================================


export const getRelatedPayOffTypeDetail = async (payOffTypeDetailRequest:PayOffTypeDetailRequest) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `mutation{
                          getPayOffTypeDetailForPayOffModeId(
                            fk_pay_off_mode_id:"${payOffTypeDetailRequest.fk_pay_off_mode_id}",
                          )
                          {findRelatedPayOffTypeDetail{PayOffType_Id,PayOffTypeDetail,fk_pay_off_mode_id}}
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