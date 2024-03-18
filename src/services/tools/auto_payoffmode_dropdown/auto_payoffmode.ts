import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export const getAllPayOffModePayOffTypeAndPayOffTypeDetail = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
            findAllPayOffModePayOffTypePayOffTypeDetail{
                PayOffMode_Id,
                PayOffType,
                cm_payofftypes {
                PayOffType_Id
                PayOffTypeDetail
                fk_pay_off_mode_id
                cm_payofftypedetail {
                PayOffTypeDetail_Id
                PayOffTypeSubDetail
                fk_pay_off_type_id
                }}, }}`,
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

export const createPayOffMode = async (pay_off_type: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            createPayOffMode( payoffmode:{
                PayOffType:"${pay_off_type}"}
            )
            {PayOffMode_Id,PayOffType}}`,
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

export const deleteEachPayOffMode = async (pay_off_mode_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            deletePayOffMode(
                payoffmode_id:"${pay_off_mode_id}"
            )
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
