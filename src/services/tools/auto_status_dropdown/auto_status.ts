import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export const getAllAutoStatus = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{findAllVehicleStatus  
            {CM_Vehicle_Status_Id, CM_Vehicle_Status_Description}}`,
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

export const createAutoStatus = async (auto_status_des: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                createNewVehicleStatus(
                    vehicle_status:{
                        CM_Vehicle_Status_Description:"${auto_status_des}"
                    })
                {CM_Vehicle_Status_Id, CM_Vehicle_Status_Description}}`,
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

export const deleteAutoStatus = async (auto_status_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                deleteVehicleStatus(
                    vehicle_status_id:"${auto_status_id}"
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
