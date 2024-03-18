import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";


export interface PayOffRequest {
    PayOffMode_Id: string;
}

export const getRelatedPayOffInfo = async (payOffRequest:PayOffRequest) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `query{
                      findPayOffTypeAndDetailByPayOffModeId(PayOffMode_Id:"${payOffRequest.PayOffMode_Id}")
                      {
                        PayOffMode_Id
                        PayOffType
                        cm_payofftypes{
                          PayOffType_Id
                          PayOffTypeDetail
                          fk_pay_off_mode_id
                          cm_payofftypedetail{
                            PayOffTypeDetail_Id
                            PayOffTypeSubDetail
                            fk_pay_off_type_id
                          }
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
};