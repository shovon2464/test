import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
import { IAutoPayOffTypeDetail } from "../../../action_creators/tools/auto_payoffmode_dropdown/auto_payoffmode";

export const createPayOffTypeDetail = async (
  pay_off_type_detail: IAutoPayOffTypeDetail
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                createPayOffTypeDetail( payofftypedetail: {
                    PayOffTypeSubDetail:"${pay_off_type_detail.PayOffTypeSubDetail}",
                    fk_pay_off_type_id:"${pay_off_type_detail.fk_pay_off_type_id}"})
                {PayOffTypeDetail_Id, PayOffTypeSubDetail}}`,
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

export const deleteEachPayOffTypeDetail = async (
  pay_off_type_detail_id: string
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            deletePayOffTypeDetail(
                payofftype_detail_id:"${pay_off_type_detail_id}",)     
            {Status, Message}}`,
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
