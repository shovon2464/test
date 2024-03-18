import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
import { IAutoPayOffType } from "../../../action_creators/tools/auto_payoffmode_dropdown/auto_payoffmode";

export const createPayOffType = async (pay_off_type: IAutoPayOffType) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            createPayOffType( payofftype: {
                PayOffTypeDetail: "${pay_off_type.PayOffTypeDetail}",
                fk_pay_off_mode_id:"${pay_off_type.fk_pay_off_mode_id}"})      
            {PayOffType_Id, PayOffTypeDetail}}`,
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

export const deleteEachPayOffType = async (pay_off_type_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            deletePayOffType(
                payofftype_id:"${pay_off_type_id}")       
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
